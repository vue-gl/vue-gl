const webdriver = require("selenium-webdriver");
const driver = new webdriver.Builder().withCapabilities(webdriver.Capabilities.chrome()).build();

driver.get("file:///" + __dirname + "/index.html");
driver.wait(webdriver.until.titleMatches(/: Complete$/), 5000).then(() => {
    driver.takeScreenshot().then((data) => {
        require("fs").writeFileSync("screenshot.png", data, "base64");
        driver.quit();
    });
}).catch(() => {
    driver.takeScreenshot().then((data) => {
        require("fs").writeFileSync("screenshot.png", data, "base64");
        driver.quit();
    });
    driver.quit();
});

driver.manage().logs().get(webdriver.logging.Type.BROWSER).then((entries) => {
    entries.forEach((entry) => {
        console.log('[%s] %s', entry.level.name, entry.message);
    });
});
