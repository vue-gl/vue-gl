module.exports = (config) => {
    const options = {
        reporters: ["progress", "coverage"],
        frameworks: ["mocha"],
        files: [
            {pattern: require.resolve("chai/chai"), watched: false},
            {pattern: require.resolve("vue/dist/vue"), watched: false},
            "https://cdn.polyfill.io/v2/polyfill.min.js?features=requestAnimationFrame",
            {pattern: require.resolve("js-polyfills/typedarray.js"), watched: false},
            {pattern: require.resolve("three"), watched: false},
            {pattern: "test/index.js", watched: false},
            {pattern: "test/**/*.spec.js"},
            {pattern: "test/helvetiker_regular.typeface.json", included: false, watched: false},
            {pattern: "test/helvetiker_bold.typeface.json", included: false, watched: false},
            {pattern: "test/sample_texture.png", included: false, watched: false}
        ],
        preprocessors: {
            "test/index.js": ["rollup"],
            "test/**/*.spec.js": ["babel"]
        },
        rollupPreprocessor: {
            format: "iife",
            name: "VueGL",
            external: "three",
            globals: {
                three: "THREE"
            },
            plugins: [
                require("rollup-plugin-istanbul")({include: "src/**"}),
                require("rollup-plugin-babel")()
            ],
            sourcemap: "inline"
        },
        coverageReporter: {
            type: "text-summary",
        }
    };
    
    if (process.env.CI) {
        options.junitReporter = {outputDir: "junit"};
        options.coverageReporter = {type: "lcovonly", dir: "coverage"};
        options.reporters= ["coverage", "junit", "dots"];
        options.browserNoActivityTimeout = 30000;
        if (process.env.CIRCLE_BRANCH === "master") {
            options.concurrency = 4;
            options.reporters.push("saucelabs");
            options.sauceLabs = {
                testName: "VueGL unit test",
                recordScreenshots: false,
                public: "public restricted"
            };
            options.customLaunchers = require("./karma.browsers").saucelabs;
        } else {
            options.concurrency = 1;
            options.reporters.push("BrowserStack");
            options.browserStack = {
                startTunnel: true,
                "browserstack.video": false
            };
            options.customLaunchers = require("./karma.browsers").browserStack;
        }
        options.browsers = Object.keys(options.customLaunchers);
        options.singleRun = true;
    }
    
    config.set(options);
};
