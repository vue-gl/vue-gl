const path = require('path');
const glob = require('fast-glob');
const docgen = require('./plugin-docgen');

function group(files) {
  return files.map((file) => file.split('/')).reduce((prev, [first, ...rest]) => {
    if (!rest.length) prev.push(first);
    else {
      const g = prev.find((arr) => Array.isArray(arr) && arr[0] === first);
      if (g) g[1].push(rest.join('/'));
      else prev.push([first, [rest.join('/')]]);
    }
    return prev;
  }, []).map((item) => (Array.isArray(item) ? [item[0], group(item[1])] : item));
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
  head: [
    ['link', { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    ['script', { src: 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3600741293730423', async: true, crossorigin: 'anonymous' }],
  ],
  themeConfig: {
    logo: '/assets/logo.svg',
    nav: [{
      text: 'Source on GitHub', link: 'https://github.com/vue-gl/vue-gl',
    }],
    sidebar: [{
      title: 'Guide',
      children: [
        '/guide/getting-started',
        '/guide/reactive-drawing',
        '/guide/re-using-resources',
        '/guide/technical-restrictions',
      ],
    }, {
      title: 'Components',
      children: sidebarGroup(
        group(glob.sync(['**/vgl-*.js'], { cwd: 'src' }).map((file) => file.slice(0, -3))),
        '/components',
      ),
    }, {
      title: 'Example Components',
      children: ['/example-components', ...sidebarGroup(
        group(glob.sync(['**/vgl-*.js'], { cwd: 'examples' }).map((file) => file.slice(0, -3))),
        '/example-components',
      )],
    }],
  },
  plugins: [
    ['@vuepress/register-components', { componentsDir: ['src', 'examples'] }],
    [docgen, {
      componentDir: ['src', 'examples'],
      outputPath: { src: 'components', examples: 'example-components' },
    }],
  ],
  configureWebpack: {
    resolve: {
      alias: {
        'vue-gl$': path.resolve('src/index.js'),
        'vue-gl/dist/examples': path.resolve('examples'),
      },
    },
    module: {
      rules: [{
        test: /\.obj$/i,
        use: [{ loader: 'file-loader' }],
      }],
    },
  },
};
