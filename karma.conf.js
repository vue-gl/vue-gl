const rollupPluginIstanbul = require('rollup-plugin-istanbul'); // eslint-disable-line import/no-extraneous-dependencies
const rollupPluginBabel = require('rollup-plugin-babel'); // eslint-disable-line import/no-extraneous-dependencies
const { browserStack, saucelabs } = require('./karma.browsers');

module.exports = (config) => {
  const options = {
    reporters: ['progress', 'coverage'],
    frameworks: ['mocha', 'chai', 'js-polyfills'],
    files: [
      { pattern: require.resolve('vue/dist/vue'), watched: false },
      { pattern: require.resolve('three'), watched: false },
      { pattern: 'src/index.js', watched: false },
      { pattern: 'test/**/*.spec.js' },
    ],
    jsPolyfills: ['typedarray'],
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
    options.browserNoActivityTimeout = 90000;
    options.client = { mocha: { timeout: 10000 } };
    options.browsers = [];
    if (process.env.CIRCLE_BRANCH === 'master') {
      options.concurrency = 4;
      options.reporters.push('saucelabs');
      options.sauceLabs = {
        testName: 'VueGL unit test',
        recordScreenshots: false,
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
    if (options.customLaunchers) options.browsers.push(...Object.keys(options.customLaunchers));
    options.singleRun = true;
  }

  config.set(options);
};
