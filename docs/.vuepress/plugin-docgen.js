const { parse } = require('vue-docgen-api');
const fs = require('fs');
const path = require('path');
const glob = require('fast-glob');

module.exports = ({ componentDir, outputPath }) => ({
  name: '@vuepress/plugin-docgen',
  additionalPages: async () => Promise.all(await Promise.all(
    (!Array.isArray(componentDir) ? [componentDir] : componentDir)
      .map(async (cwd) => (await glob(['**/vgl-*.js'], { cwd })).map(async (file) => {
        const doc = await parse(path.resolve(cwd, file));
        const exampleFile = file.replace(/\.js$/, '-example.vue');
        const examplePath = path.resolve(cwd, exampleFile);
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
        const {
          displayName, description, props, slots,
        } = doc;
        let propsBlock = '';
        if (props) {
          propsBlock = props.map(({
            name, type, defaultValue, description: propDescription, values,
          }) => `
- \`${name}\` : ${values ? values.join(' | ') : type.name}  
${propDescription}  
${defaultValue ? `Defaults to ${defaultValue}` : ''}
          `.trim()).join('\n');
          propsBlock = `## Props\n${propsBlock}`;
        }
        let slotsBlock = '';
        if (slots) {
          slotsBlock = slots.map(({ name, description: slotDescription }) => `
- \`${name}\`  
${slotDescription}
          `.trim()).join('\n');
          slotsBlock = `## Slots\n${slotsBlock}`;
        }
        const content = `
# &lt;${displayName}&gt;
${description}

${exampleBlock}

${propsBlock}

${slotsBlock}
        `.trim();
        const outputDir = typeof outputPath === 'string' || outputPath instanceof String
          ? outputPath
          : outputPath[cwd];
        return { path: path.join('/', outputDir, file.replace(/\.js$/, '.html')), content };
      })),
  ).then((array) => array.flat())),
});
