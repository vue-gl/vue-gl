module.exports = (config) => {
    const options = {
        reporters: ["progress", "coverage"],
        frameworks: ["mocha"],
        files: [
            {pattern: require.resolve("chai/chai"), watched: false},
            {pattern: require.resolve("vue/dist/vue"), watched: false},
            {pattern: require.resolve("js-polyfills/typedarray.js"), watched: false},
            {pattern: require.resolve("three"), watched: false},
            {pattern: "test/index.js", watched: false},
            {pattern: "test/**/*.spec.js"},
            {pattern: require.resolve("three/examples/fonts/helvetiker_regular.typeface.json"), included: false, watched: false},
            {pattern: require.resolve("three/examples/fonts/helvetiker_bold.typeface.json"), included: false, watched: false},
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
        options.reporters= ["saucelabs", "coverage", "junit", "dots"];
        options.junitReporter = {outputDir: "junit"};
        options.coverageReporter = {type: "lcovonly", dir: "coverage"};
        options.browserNoActivityTimeout = 30000;
        options.browserDisconnectTolerance = 2;
        options.sauceLabs = {
            testName: "VueGL unit test",
            recordScreenshots: false,
            public: "public restricted"
        };
        options.customLaunchers = {
            "Chrome 26 on Windows 7": {
                base: "SauceLabs",
                platform: "Windows 7",
                browserName: "chrome",
                version: "26"
            },
            "Chrome (latest) on Windows 7": {
                base: "SauceLabs",
                platform: "Windows 7",
                browserName: "chrome",
                version: "latest"
            },
            "Internet Explorer 9 on Windows 7": {
                base: "SauceLabs",
                platform: "Windows 7",
                browserName: "internet explorer",
                version: "9"
            },
            "Internet Explorer (latest) on Windows 7": {
                base: "SauceLabs",
                platform: "Windows 7",
                browserName: "internet explorer",
                version: "latest"
            },
            "Firefox 4 on Windows 7": {
                base: "SauceLabs",
                platform: "Windows 7",
                browserName: "firefox",
                version: "4"
            },
            "Firefox (latest) on Windows 7": {
                base: "SauceLabs",
                platform: "Windows 7",
                browserName: "firefox",
                version: "latest"
            },
            "Edge 13 on Windows 10": {
                base: "SauceLabs",
                platform: "Windows 10",
                browserName: "MicrosoftEdge",
                version: "13"
            },
            "Edge (latest) on Windows 10": {
                base: "SauceLabs",
                platform: "Windows 10",
                browserName: "MicrosoftEdge",
                version: "latest"
            },
            "Chrome 26 on Windows 10": {
                base: "SauceLabs",
                platform: "Windows 10",
                browserName: "chrome",
                version: "26"
            },
            "Chrome (latest) on Windows 10": {
                base: "SauceLabs",
                platform: "Windows 10",
                browserName: "chrome",
                version: "latest"
            },
            "Firefox 4 on Windows 10": {
                base: "SauceLabs",
                platform: "Windows 10",
                browserName: "firefox",
                version: "4"
            },
            "Firefox (latest) on Windows 10": {
                base: "SauceLabs",
                platform: "Windows 10",
                browserName: "firefox",
                version: "latest"
            },
            "Internet Explorer (latest) on Windows 10": {
                base: "SauceLabs",
                platform: "Windows 10",
                browserName: "internet explorer",
                version: "latest"
            },
            "Safari (latest) on Mac OS X Sierra": {
                base: "SauceLabs",
                platform: "macOS 10.12",
                browserName: "safari",
                version: "latest"
            },
            "Chrome (latest) on Mac OS X Sierra": {
                base: "SauceLabs",
                platform: "macOS 10.12",
                browserName: "chrome",
                version: "latest"
            },
            "Chrome 27 on Mac OS X Sierra": {
                base: "SauceLabs",
                platform: "macOS 10.12",
                browserName: "chrome",
                version: "27"
            },
            "Firefox (latest) on Mac OS X Sierra": {
                base: "SauceLabs",
                platform: "macOS 10.12",
                browserName: "firefox",
                version: "latest"
            },
            "Firefox 4 on Mac OS X Sierra": {
                base: "SauceLabs",
                platform: "macOS 10.12",
                browserName: "firefox",
                version: "4"
            },
            "Safari 9 on Mac OS X El Capitan": {
                base: "SauceLabs",
                platform: "OS X 10.11",
                browserName: "safari",
                version: "9"
            },
            "Safari 8 on Mac OS X Yosemite": {
                base: "SauceLabs",
                platform: "OS X 10.10",
                browserName: "safari",
                version: "8"
            },
            "Safari 7 on Mac OS X Mavericks": {
                base: "SauceLabs",
                platform: "OS X 10.9",
                browserName: "safari",
                version: "7"
            }
        };
        options.browsers = Object.keys(options.customLaunchers);
        options.singleRun = true;
        options.concurrency = 4;
    }
    
    config.set(options);
};
