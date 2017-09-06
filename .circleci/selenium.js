const webdriver = require("selenium-webdriver");
const driver = new webdriver.Builder().forBrowser("chrome").build();

driver.get("http://localhost:8080/test/");
driver.wait(webdriver.until.titleMatches(/: Complete$/), 20).then(exit).catch(exit);

function exit() {
    driver.manage().logs().get(webdriver.logging.Type.BROWSER).then((entries) => {
        entries.forEach((entry) => {
            console.log('[%s] %s', entry.level.name, entry.message);
        });
    });
    require("fs").writeFileSync("result.html", driver.executeScript("return document.documentElement.outerHTML"));
    driver.takeScreenshot().then((data) => {
        require("fs").writeFileSync("screenshot.png", data, "base64");
        driver.quit();
    });
}
