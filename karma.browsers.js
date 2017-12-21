"use strict";

const saucelabs = {};
const browserStack = {};

saucelabs["Chrome 26 on Windows 7"] = {
    base: "SauceLabs",
    platform: "Windows 7",
    browserName: "chrome",
    version: "26"
};
browserStack["Chrome 26 on Windows 7"] = {
    base: "BrowserStack",
    os: "Windows",
    os_version: "7",
    browser: "chrome",
    browser_version: "26"
};

saucelabs["Chrome (latest) on Windows 7"] = {
    base: "SauceLabs",
    platform: "Windows 7",
    browserName: "chrome",
    version: "latest"
};
browserStack["Chrome (latest) on Windows 7"] = {
    base: "BrowserStack",
    os: "Windows",
    os_version: "7",
    browser: "chrome",
    browser_version: "latest"
};

saucelabs["Internet Explorer 9 on Windows 7"] = {
    base: "SauceLabs",
    platform: "Windows 7",
    browserName: "internet explorer",
    version: "9"
};
browserStack["Internet Explorer 9 on Windows 7"] = {
    base: "BrowserStack",
    os: "Windows",
    os_version: "7",
    browser: "IE",
    browser_version: "9"
};

saucelabs["Internet Explorer (latest) on Windows 7"] = {
    base: "SauceLabs",
    platform: "Windows 7",
    browserName: "internet explorer",
    version: "latest"
};
browserStack["Internet Explorer (latest) on Windows 7"] = {
    base: "BrowserStack",
    os: "Windows",
    os_version: "7",
    browser: "IE",
    browser_version: "latest"
};

saucelabs["Firefox 4 on Windows 7"] = {
    base: "SauceLabs",
    platform: "Windows 7",
    browserName: "firefox",
    version: "4"
};
browserStack["Firefox 4 on Windows 7"] = {
    base: "BrowserStack",
    os: "Windows",
    os_version: "7",
    browser: "firefox",
    browser_version: "4"
};

saucelabs["Firefox (latest) on Windows 7"] = {
    base: "SauceLabs",
    platform: "Windows 7",
    browserName: "firefox",
    version: "latest"
};
browserStack["Firefox (latest) on Windows 7"] = {
    base: "BrowserStack",
    os: "Windows",
    os_version: "7",
    browser: "firefox",
    browser_version: "latest"
};

saucelabs["Edge 13 on Windows 10"] = {
    base: "SauceLabs",
    platform: "Windows 10",
    browserName: "MicrosoftEdge",
    version: "13"
};
browserStack["Edge 13 on Windows 10"] = {
    base: "BrowserStack",
    os: "Windows",
    os_version: "10",
    browser: "Edge",
    browser_version: "13"
};

saucelabs["Edge (latest) on Windows 10"] = {
    base: "SauceLabs",
    platform: "Windows 10",
    browserName: "MicrosoftEdge",
    version: "latest"
};
browserStack["Edge (latest) on Windows 10"] = {
    base: "BrowserStack",
    os: "Windows",
    os_version: "10",
    browser: "Edge",
    browser_version: "latest"
};

saucelabs["Chrome 26 on Windows 10"] = {
    base: "SauceLabs",
    platform: "Windows 10",
    browserName: "chrome",
    version: "26"
};
browserStack["Chrome 37 on Windows 10"] = {
    base: "BrowserStack",
    os: "Windows",
    os_version: "10",
    browser: "chrome",
    browser_version: "37"
};

saucelabs["Chrome (latest) on Windows 10"] = {
    base: "SauceLabs",
    platform: "Windows 10",
    browserName: "chrome",
    version: "latest"
};
browserStack["Chrome (latest) on Windows 10"] = {
    base: "BrowserStack",
    os: "Windows",
    os_version: "10",
    browser: "chrome",
    browser_version: "latest"
};

saucelabs["Firefox 4 on Windows 10"] = {
    base: "SauceLabs",
    platform: "Windows 10",
    browserName: "firefox",
    version: "4"
};
browserStack["Firefox 32 on Windows 10"] = {
    base: "BrowserStack",
    os: "Windows",
    os_version: "10",
    browser: "firefox",
    browser_version: "32"
};

saucelabs["Firefox (latest) on Windows 10"] = {
    base: "SauceLabs",
    platform: "Windows 10",
    browserName: "firefox",
    version: "latest"
};
browserStack["Firefox (latest) on Windows 10"] = {
    base: "BrowserStack",
    os: "Windows",
    os_version: "10",
    browser: "firefox",
    browser_version: "latest"
};

saucelabs["Internet Explorer (latest) on Windows 10"] = {
    base: "SauceLabs",
    platform: "Windows 10",
    browserName: "internet explorer",
    version: "latest"
};
browserStack["Internet Explorer (latest) on Windows 10"] = {
    base: "BrowserStack",
    os: "Windows",
    os_version: "10",
    browser: "IE",
    browser_version: "latest"
};

saucelabs["Safari (latest) on Mac OS X Sierra"] = {
    base: "SauceLabs",
    platform: "macOS 10.12",
    browserName: "safari",
    version: "latest"
};
browserStack["Safari (latest) on Mac OS X High Sierra"] = {
    base: "BrowserStack",
    os: "OS X",
    os_version: "High Sierra",
    browser: "safari",
    browser_version: "latest"
};

saucelabs["Chrome (latest) on Mac OS X Sierra"] = {
    base: "SauceLabs",
    platform: "macOS 10.12",
    browserName: "chrome",
    version: "latest"
};
browserStack["Chrome (latest) on Mac OS X High Sierra"] = {
    base: "BrowserStack",
    os: "OS X",
    os_version: "High Sierra",
    browser: "chrome",
    browser_version: "latest"
};

saucelabs["Chrome 27 on Mac OS X Sierra"] = {
    base: "SauceLabs",
    platform: "macOS 10.12",
    browserName: "chrome",
    version: "27"
};
browserStack["Chrome 27 on Mac OS X High Sierra"] = {
    base: "BrowserStack",
    os: "OS X",
    os_version: "High Sierra",
    browser: "chrome",
    browser_version: "27"
};

saucelabs["Firefox (latest) on Mac OS X Sierra"] = {
    base: "SauceLabs",
    platform: "macOS 10.12",
    browserName: "firefox",
    version: "latest"
};
browserStack["Firefox (latest) on Mac OS X High Sierra"] = {
    base: "BrowserStack",
    os: "OS X",
    os_version: "High Sierra",
    browser: "firefox",
    browser_version: "latest"
};

saucelabs["Firefox 4 on Mac OS X Sierra"] = {
    base: "SauceLabs",
    platform: "macOS 10.12",
    browserName: "firefox",
    version: "4"
};
browserStack["Firefox 4 on Mac OS X Snow Leopard"] = {
    base: "BrowserStack",
    os: "OS X",
    os_version: "Snow Leopard",
    browser: "firefox",
    browser_version: "4"
};

browserStack["Safari 10 on Mac OS X Sierra"] = {
    base: "BrowserStack",
    os: "OS X",
    os_version: "Sierra",
    browser: "safari",
    browser_version: "10"
};

saucelabs["Safari 9 on Mac OS X El Capitan"] = {
    base: "SauceLabs",
    platform: "OS X 10.11",
    browserName: "safari",
    version: "9"
};
browserStack["Safari 9 on Mac OS X El Capitan"] = {
    base: "BrowserStack",
    os: "OS X",
    os_version: "El Capitan",
    browser: "safari",
    browser_version: "9"
};

saucelabs["Safari 8 on Mac OS X Yosemite"] = {
    base: "SauceLabs",
    platform: "OS X 10.10",
    browserName: "safari",
    version: "8"
};
browserStack["Safari 8 on Mac OS X Yosemite"] = {
    base: "BrowserStack",
    os: "OS X",
    os_version: "Yosemite",
    browser: "safari",
    browser_version: "8"
};

saucelabs["Safari 7 on Mac OS X Mavericks"] = {
    base: "SauceLabs",
    platform: "OS X 10.9",
    browserName: "safari",
    version: "7"
};
browserStack["Safari 7 on Mac OS X Mavericks"] = {
    base: "BrowserStack",
    os: "OS X",
    os_version: "Mavericks",
    browser: "safari",
    browser_version: "7"
};

module.exports = {
    saucelabs,
    browserStack
};
