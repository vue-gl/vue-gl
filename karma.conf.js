const rollupPluginIstanbul = require('rollup-plugin-istanbul');
const rollupPluginBabel = require('rollup-plugin-babel');
const { execSync } = require('child_process');
const { browserStack, saucelabs } = require('./karma.browsers');

module.exports = (config) => {
  const options = {
    reporters: ['progress', 'coverage'],
    frameworks: ['mocha'],
    files: [
      { pattern: require.resolve('chai/chai'), watched: false },
      { pattern: require.resolve('vue/dist/vue'), watched: false },
      { pattern: require.resolve('js-polyfills/typedarray.js'), watched: false },
      { pattern: require.resolve('three'), watched: false },
      { pattern: 'src/index.js', watched: false },
      { pattern: 'test/**/*.spec.js' },
    ],
    preprocessors: {
      'src/index.js': ['rollup'],
      'test/**/*.spec.js': ['babel'],
    },
    rollupPreprocessor: {
      output: {
        format: 'iife',
        name: 'VueGL',
        globals: {
          three: 'THREE',
        },
        sourcemap: 'inline',
        intro: execSync('babel-external-helpers -t var'),
      },
      external: 'three',
      plugins: [
        rollupPluginIstanbul({ include: 'src/**' }),
        rollupPluginBabel(),
      ],
    },
    coverageReporter: {
      type: 'text-summary',
    },
  };

  if (process.env.CI) {
    options.junitReporter = { outputDir: 'junit' };
    options.coverageReporter = { type: 'lcovonly', dir: 'coverage' };
    options.reporters = ['coverage', 'junit', 'dots'];
    options.browserNoActivityTimeout = 60000;
    options.client = { mocha: { timeout: 10000 } };
    options.browsers = [];
    if (process.env.CIRCLE_BRANCH === 'master') {
      options.concurrency = 4;
      options.reporters.push('saucelabs');
      options.sauceLabs = {
        testName: 'VueGL unit test',
        recordScreenshots: false,
        public: 'public restricted',
      };
      options.customLaunchers = saucelabs;
    } else if (process.env.BROWSER_STACK_USERNAME && process.env.BROWSER_STACK_ACCESS_KEY) {
      options.concurrency = 2;
      options.reporters.push('BrowserStack');
      options.browserStack = {
        startTunnel: true,
        video: false,
      };
      options.customLaunchers = browserStack;
    } else {
      options.browsers.push('Chrome', 'Firefox');
    }
    options.browsers.push(...Object.keys(options.customLaunchers));
    options.singleRun = true;
  }

  config.set(options);
};
