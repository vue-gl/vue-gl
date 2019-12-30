import path from 'path';
import fs from 'fs';
import vuedoc from '@vuedoc/md'; // eslint-disable-line import/no-extraneous-dependencies
import glob from 'glob'; // eslint-disable-line import/no-extraneous-dependencies

function resolver(resolve, reject) {
  return (err, result) => {
    if (err) {
      reject(err);
    } else {
      resolve(result);
    }
  };
}

function globAsync(...args) {
  return new Promise((resolve, reject) => glob(...args, resolver(resolve, reject)));
}

function mkdir(...args) {
  return new Promise((resolve, reject) => fs.mkdir(...args, resolver(resolve, reject)));
}

function writeFile(...args) {
  return new Promise((resolve, reject) => fs.writeFile(...args, resolver(resolve, reject)));
}

function readFile(...args) {
  return new Promise((resolve, reject) => fs.readFile(...args, resolver(resolve, reject)));
}

function appendFile(...args) {
  return new Promise((resolve, reject) => fs.appendFile(...args, resolver(resolve, reject)));
}

async function prependFile(filePath, content) {
  const data = await readFile(filePath);
  await writeFile(filePath, content + data);
}

async function replaceFileContent(filePath, oldString, newString) {
  const data = await readFile(filePath, 'utf-8');
  await writeFile(filePath, data.replace(oldString, newString));
}

async function md({ filename, output }) {
  const outputDir = path.dirname(output);
  try {
    await mkdir(outputDir, { recursive: true });
  } catch (e) {
    if (e.syscall !== 'mkdir' || e.code !== 'EEXIST' || e.path !== outputDir) throw e;
  }
  await vuedoc.md({ filename, stream: fs.createWriteStream(output) });
}

function map(arr, callback) {
  return Promise.all(arr.map(callback));
}

function groupByDirname(filenames) {
  return filenames.reduce((prev, curr) => {
    const dirname = path.dirname(curr);
    const group = prev.find(([dir]) => dir === dirname);
    const basename = path.basename(curr);
    if (group) {
      group[1].push(basename);
    } else {
      prev.push([dirname, [basename]]);
    }
    return prev;
  }, []);
}

function toPascalCase(input) {
  return input.replace(/(?:^|-)(.)/g, (match, cap) => cap.toUpperCase());
}

function introContent({ groupName, navOrder }) {
  return `---
parent: ${groupName}
grand_parent: API / Components
nav_order: ${navOrder}
---
`;
}

async function outroContent({ dest, examplePath, exampleComponent }) {
  try {
    const exampleCode = await readFile(path.resolve(dest, '..', examplePath), 'utf8');
    return `
## Example

<div class="code-example">
  <div class="max-width-1-2">
    <${exampleComponent} class="aspect-1618-1000"></${exampleComponent}>
  </div>
</div>
\`\`\`vue
{% raw %}${exampleCode}{% endraw %}
\`\`\`

`;
  } catch (e) {
    return '';
  }
}

function groupIndexContent({ groupName, navOrder }) {
  return `---
parent: API / Components
has_children: true
nav_order: ${navOrder}
---

# ${groupName}
`;
}

function rootIndexContent() {
  return `---
has_children: true
nav_order: 3
---

# API / Components
`;
}

function getRelativePath(src, ext) {
  return new RegExp(`([^/]+/[^/]+)\\.${ext}$`).exec(src)[1];
}

function getExamplePath(src, ext) {
  return `_examples/${getRelativePath(src, ext)}.vue`;
}

export default function generateComponentDocuments({ dest, src }) {
  return {
    name: 'generate-component-documents',
    async writeBundle() {
      const sourceFilenames = await globAsync(path.resolve(src, '*/vgl-*.js'));
      const outputFilenames = await map(sourceFilenames, async (filename) => {
        const output = path.resolve(dest, `${getRelativePath(filename, 'js')}.md`);
        await md({ filename, output });
        return output;
      });
      const groups = groupByDirname(outputFilenames);
      await map(groups, async ([dirname, basenames], i) => {
        const groupName = toPascalCase(path.basename(dirname));
        await writeFile(path.resolve(dirname, 'index.md'), groupIndexContent({ groupName, navOrder: i }));
        await map(basenames, async (basename, j) => {
          const filePath = path.resolve(dirname, basename);
          await replaceFileContent(filePath, /^#\s+\S+\s*$/m, `# ${toPascalCase(path.basename(basename, '.md'))}\n`);
          await prependFile(filePath, introContent({ groupName, navOrder: j }));
          const examplePath = getExamplePath(filePath, 'md');
          await appendFile(filePath, await outroContent({ dest, examplePath, exampleComponent: `${path.basename(basename, '.md')}-example` }));
        });
      });
      await writeFile(path.resolve(dest, 'index.md'), rootIndexContent());
    },
  };
}
