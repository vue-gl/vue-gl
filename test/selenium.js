const webdriver = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const options = new chrome.Options();
options.addArguments("--disable-web-security");
const driver = new webdriver.Builder().withCapabilities(options.toCapabilities()).build();

driver.get("file:///" + __dirname + "/index.html");
driver.wait(webdriver.until.titleMatches(/: Complete$/), 5000).then(exit).catch(exit);

function exit() {
    driver.manage().logs().get(webdriver.logging.Type.BROWSER).then((entries) => {
        entries.forEach((entry) => {
            console.log('[%s] %s', entry.level.name, entry.message);
        });
    });
    driver.takeScreenshot().then((data) => {
        require("fs").writeFileSync("screenshot.png", data, "base64");
        driver.quit();
    });
}
