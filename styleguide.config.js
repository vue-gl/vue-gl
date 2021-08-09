module.exports = {
  title: 'VueGL',
  components: 'src/**/vgl-*.js',
  ignore: ['**/private/vgl-*.js'],
  displayOrigins: true,
  copyCodeButton: true,
  jsxInComponents: false,
  usageMode: 'expand',
  ribbon: {
    url: 'https://github.com/vue-gl/vue-gl',
    text: 'View on GitHub',
  },
  template: {
    favicon: 'docs/favicon.ico',
  },
  webpackConfig: {
    module: {
      rules: [{
        test: /\.jpg$/,
        loader: 'file-loader',
      }],
    },
  },
  styles: {
    Logo: {
      logo: {
        verticalAlign: 'bottom',
        '&::before': {
          content: '""',
          background: 'url("./docs/img/logo.svg")',
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          display: 'inline-block',
          marginRight: 4,
          width: 24,
          height: 24,
          verticalAlign: 'bottom',
        },
      },
    },
  },
  tocMode: 'expand',
  pagePerSection: true,
  sections: [{
    name: 'Introduction',
    content: 'docs/index.md',
  }, {
    name: 'Guide',
    sections: [{
      name: 'What is VueGL?',
      content: 'docs/guide/what-is-vue-gl.md',
    }, {
      name: 'Getting started',
      content: 'docs/guide/getting-started.md',
    }, {
      name: 'Installation',
      content: 'docs/guide/installation.md',
    }, {
      name: 'Interactive drawing',
      content: 'docs/guide/interactive-drawing.md',
    }, {
      name: 'Namespaces',
      content: 'docs/guide/namespaces.md',
    }, {
      name: 'Supporting old browsers',
      content: 'docs/guide/supporting-old-browsers.md',
    }],
  }, {
    name: 'Components',
    content: 'docs/components.md',
    sectionDepth: 1,
    sections: [{
      name: 'Cameras',
      components: 'src/cameras/vgl-*.js',
    }, {
      name: 'Core',
      components: 'src/core/vgl-*.js',
    }, {
      name: 'Extras',
      components: 'src/extras/vgl-*.js',
    }, {
      name: 'Extras / Core',
      components: 'src/extras/core/vgl-*.js',
    }, {
      name: 'Geometries',
      components: 'src/geometries/vgl-*.js',
    }, {
      name: 'Helpers',
      components: 'src/helpers/vgl-*.js',
    }, {
      name: 'Lights',
      components: 'src/lights/vgl-*.js',
    }, {
      name: 'Materials',
      components: 'src/materials/vgl-*.js',
    }, {
      name: 'Objects',
      components: 'src/objects/vgl-*.js',
    }, {
      name: 'Renderers',
      components: 'src/renderers/vgl-*.js',
    }, {
      name: 'Scenes',
      components: 'src/scenes/vgl-*.js',
    }, {
      name: 'Textures',
      components: 'src/textures/vgl-*.js',
    }],
  }],
};
