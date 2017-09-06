const webdriver = require("selenium-webdriver");
const driver = new webdriver.Builder().forBrowser("chrome").build();

driver.get("http://localhost:8080/test/index.html");
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
