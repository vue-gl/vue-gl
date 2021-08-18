const { parse } = require('vue-docgen-api');
const { fs, path, globby } = require('@vuepress/shared-utils');

function group(files) {
  return files.map((file) => file.split('/')).reduce((prev, [first, ...rest]) => {
    if (!rest.length) prev.push(first);
    else {
      const g = prev.find((arr) => Array.isArray(arr) && arr[0] === first);
      if (g) g[1].push(rest.join('/'));
      else prev.push([first, [rest.join('/')]]);
    }
    return prev;
  }, []).map((item) => Array.isArray(item) ? [item[0], group(item[1])] : item);
}

function sidebarGroup(fileGroups, basePath) {
  return fileGroups.map((file) => {
    if (!Array.isArray(file)) return path.join(basePath, file);
    const groupPath = path.join(basePath, file[0]);
    return {
      title: file[0],
      // path: groupPath,
      children: sidebarGroup(file[1], groupPath),
    };
  });
}

module.exports = {
  title: 'VueGL',
  description: 'Vue.js components rendering 3D graphics reactively via three.js',
  locales: {
    '/': { lang: 'en-US' },
  },
  markdown: {
    lineNumbers: true,
  },
  themeConfig: {
    sidebar: [{
      title: 'Guide',
      children: [
        '/guide/getting-started',
        '/guide/installation',
        '/guide/interactive-drawing',
        '/guide/namespaces',
        '/guide/supporting-old-browsers',
      ],
    }, {
      title: 'Components',
      children: sidebarGroup(
        group(globby.sync(['**/vgl-*.js'], { cwd: 'src' }).map((file) => file.slice(0, -3))),
        '/components',
      ),
    }],
  },
  plugins: [
    ['@vuepress/register-components', { componentsDir: 'src' }],
    [({ componentDir, outputPath }, ctx) => ({
      name: '@vuepress/plugin-docgen',
      additionalPages: async () => Promise.all(
        (await globby(['**/vgl-*.js'], { cwd: componentDir })).map(async (file) => {
          const doc = await parse(path.resolve(componentDir, file));
          const exampleFile = file.replace(/\.js$/, '-example.vue');
          const examplePath = path.resolve(componentDir, exampleFile);
          let exampleBlock = '';
          if (fs.existsSync(examplePath)) {
            const exampleCode = fs.readFileSync(examplePath);
            const exampleComponent = exampleFile.replace(/\/|\\/g, '-').slice(0, -4);
            exampleBlock = `
## Example Usage
<ClientOnly><${exampleComponent} /></ClientOnly>
\`\`\`vue
${exampleCode}
\`\`\`
            `.trim();
          }
          const { displayName, description, props, slots } = doc;
          let propsBlock = '';
          if (props) {
            propsBlock = props.map(({ name, type, defaultValue, description }) => `
- \`${name}\` : ${type.name}  
  ${description}
            `.trim()).join('\n');
            propsBlock = '## Props\n' + propsBlock;
          }
          let slotsBlock = '';
          if (slots) {
            slotsBlock = slots.map(({ name, description, bindings }) => `
- \`${name}\`  
  ${description}
            `.trim()).join('\n');
            slotsBlock = '## Slots\n' + slotsBlock;
          }
          const content = `
# &lt;${displayName}&gt;
${description}

${exampleBlock}

${propsBlock}

${slotsBlock}
          `.trim();
          return { path: path.join('/', outputPath, file.replace(/\.js$/, '.html')), content };
        }),
      ),
    }), { componentDir: 'src', outputPath: 'components' }],
  ],
  configureWebpack: {
    resolve: {
      alias: {
        'vue-gl$': path.resolve('src/index.js'),
        'vue-gl/dist/examples': path.resolve('examples'),
      },
    },
  },
};
