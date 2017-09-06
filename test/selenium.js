const webdriver = require("selenium-webdriver");
const driver = new webdriver.Builder().withCapabilities(webdriver.Capabilities.chrome()).build();

driver.get("file:///" + __dirname + "/index.html");
driver.wait(webdriver.until.titleMatches(/: Completed$/)).then(() => {
    driver.takeScreenshot().then((data) => {
        require("fs").writeFileSync("screenshot.png", data, "base64");
        driver.quit();
    });
});
