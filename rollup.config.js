import babel from 'rollup-plugin-babel';
import { terser } from 'rollup-plugin-terser';
import doc from 'rollup-plugin-vuedoc';
import cp from 'rollup-plugin-copy';
import del from 'rollup-plugin-delete';
import glob from 'fast-glob';
import pascalcase from 'pascalcase';
import vue from 'rollup-plugin-vue';
import resolve from '@rollup/plugin-node-resolve';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';

async function rollup() {
  // Copy targets
  const mainTarget = { src: 'dist/vue-gl.js', dest: 'docs/js' };
  const componentTarget = { src: 'dist/components', dest: 'docs' };
  const venderTarget = {
    src: [
      require.resolve('vue/dist/vue'),
      require.resolve('vue/dist/vue.min'),
      require.resolve('three'),
      require.resolve('three/build/three.min'),
      require.resolve('three/examples/fonts/helvetiker_regular.typeface.json'),
    ],
    dest: 'docs/js/vendor',
  };
  const targets = [mainTarget, componentTarget, venderTarget];

  // Convert from a basename to a PascalCase component name
  function componentName(name) { return pascalcase(/([^/.]+)(\.[^./]+)?$/.exec(name)[1]); }
  // Get component category from module ID
  function componentCategory(id) { return pascalcase(/([^/]+)\/[^/]+$/.exec(id)[1]); }

  return [{
    input: 'src/index.js',
    external: ['three'],
    output: {
      file: 'dist/vue-gl.js', format: 'umd', globals: { three: 'THREE' }, name: 'VueGL',
    },
    plugins: [
      babel(),
      terser(),
      doc({
        test: /\/vgl-.+\.js$/,
        prefix: 'components',
        intro: ({ id }) => `---
          \ngrand_parent: API / Components
          \nparent: ${componentCategory(id)}
          \nnav_order: ${componentName(id)}
          \n---`,
        outro: ({ id }) => {
          try {
            const exPath = `docs/_examples${/((\/[^/.]+){2})(\.[^/.]+)?$/.exec(id)[1]}.vue`;
            const exCode = readFileSync(exPath, 'utf8');
            const exComponent = `${/([^/.]+)(\.[^./]+)?$/.exec(id)[1]}-example`;
            return `## Example
              \n<div class="code-example"><div class="max-width-1-2">
                <${exComponent} class="aspect-1618-1000"></${exComponent}>
              \n</div></div>\n\`\`\`vue\n{% raw %}${exCode}{% endraw %}\n\`\`\``;
          } catch (e) {
            return '';
          }
        },
        index: (dir) => (dir === 'components' ? `---
          \nhas_children: true
          \nnav_order: C
          \n---
          \n# API / Components` : `---
          \nparent: API / Components
          \nhas_children: true
          \nnav_order: ${pascalcase(/[^/]+$/.exec(dir)[0])}
          \n---
          \n# ${pascalcase(/[^/]+$/.exec(dir)[0])}`),
        replace: { test: /^#\s+(\S*)/, replacement: (_, title) => `# ${pascalcase(title)}` },
      }),
      cp({ targets, hook: 'writeBundle' }),
    ],
  }, {
    input: 'src/index.js',
    external: ['three'],
    output: { file: 'dist/vue-gl.esm.js', format: 'es' },
    plugins: [
      babel(),
      terser(),
      del({ targets: 'dist/components' }),
    ],
  }, ...(await glob('examples/**/*.js', { objectMode: true })).map(({ path, name }) => ({
    input: path,
    external: (id, parent) => {
      if (!id.length) return false;
      const externalDirectory = dirname(require.resolve('three'));
      if (/^[./]/.test(id)) return dirname(join(dirname(parent), id)) === externalDirectory;
      return dirname(require.resolve(id)) === externalDirectory;
    },
    output: {
      file: `dist/${path}`,
      format: 'umd',
      globals: { [require.resolve('three/build/three.module')]: 'THREE', three: 'THREE' },
      name: `VueGL.${componentName(name)}`,
    },
    plugins: [
      babel(),
      resolve(),
      terser({ mangle: { reserved: ['ObjectManipulator'] } }),
      doc({
        test: /(^|\/)examples(\/[^/]+)*\/vgl-[^/]+$/,
        intro: ({ id }) => `---
          \ngrand_parent: API / Example Components
          \nparent: Example ${componentCategory(id)}
          \nnav_order: ${componentName(id)}
          \n---`,
        outro: ({ id }) => {
          try {
            const exPath = `docs/_examples-ex${/((\/[^/.]+){2})(\.[^/.]+)?$/.exec(id)[1]}.vue`;
            const exCode = readFileSync(exPath, 'utf8');
            const exComponent = `${/([^/.]+)(\.[^./]+)?$/.exec(id)[1]}-example`;
            const jsPath = `/js/examples${/((\/[^/.]+){2})(\.[^/.]+)?$/.exec(id)[0]}`;
            return `## Example
              \n<script src="${jsPath}"></script>
              \n<div class="code-example"><div class="max-width-1-2">
                <${exComponent} class="aspect-1618-1000"></${exComponent}>
              \n</div></div>\n\`\`\`vue\n{% raw %}${exCode}{% endraw %}\n\`\`\``;
          } catch (e) {
            return '';
          }
        },
        index: () => `---
          \nparent: API / Example Components
          \nhas_children: true
          \nnav_order: ${componentCategory(path)}
          \n---
          \n# Example ${componentCategory(path)}`,
        replace: { test: /^#\s+(\S*)/, replacement: (_, title) => `# ${pascalcase(title)}` },
      }),
      cp({ targets: [{ src: 'dist/examples', dest: ['docs/js', 'docs'] }], hook: 'writeBundle' }),
    ],
  })), {
    input: 'docs/_examples/index.js',
    output: { file: 'docs/js/examples.js', format: 'iife' },
    plugins: [
      vue(),
      babel({ extensions: ['.js', '.jsx', '.es6', '.es', '.mjs', '.vue'] }),
      resolve(),
      terser(),
      del({
        targets: ['dist/examples/**/*.md', 'docs/js/examples/**/*.md', 'docs/examples/**/*.js'],
      }),
    ],
  }, {
    input: 'docs/_examples-ex/index.js',
    output: { file: 'docs/js/examples-ex.js', format: 'iife' },
    plugins: [
      vue(),
      babel({ extensions: ['.js', '.jsx', '.es6', '.es', '.mjs', '.vue'] }),
      resolve(),
      terser(),
    ],
  }];
}

export default rollup();
