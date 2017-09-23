module.exports = (config) => {
    const options = {
        reporters: ["coverage-istanbul", "junit"],
        frameworks: ["mocha"],
        files: [
            {pattern: require.resolve("chai/chai"), watched: false},
            {pattern: require.resolve("vue/dist/vue"), watched: false},
            {pattern: require.resolve("three"), watched: false},
            {pattern: "test/**/*.spec.js", watched: false}
        ],
        preprocessors: {
            "test/**/*.spec.js": ["rollup"]
        },
        rollupPreprocessor: {
            format: "iife",
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
        coverageIstanbulReporter: {
            reports: ["html"],
            dir: require("path").resolve("coverage/%browser%")
        },
        junitReporter: {
            outputDir: "junit"
        }
    };
    
    if (process.env.CI) {
        options.reporters.push("saucelabs");
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
            "Opera 11 on Windows 7": {
                base: "SauceLabs",
                platform: "Windows 7",
                browserName: "Opera",
                version: "11"
            },
            "Opera (latest) on Windows 7": {
                base: "SauceLabs",
                platform: "Windows 7",
                browserName: "Opera",
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
            }
        };
        options.browsers = Object.keys(options.customLaunchers);
        options.singleRun = true;
        options.concurrency = 3;
    }
    
    config.set(options);
};
