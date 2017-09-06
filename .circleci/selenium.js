const webdriver = require("selenium-webdriver");
const driver = new webdriver.Builder().forBrowser("chrome").build();

driver.get("http://localhost:8080/test/");
driver.wait(webdriver.until.titleMatches(/: Complete$/), 20).then(() => {
    driver.executeScript(`return document.querySelectorAll(".test.fail")`).then((elms) => {
        driver.executeScript("return document.documentElement.outerHTML").then((html) => {
            require("fs").writeFileSync("test-result.html", html);
            driver.quit();
            process.exit(elms.length);
        });
    });
}).catch((err) => {
    console.error(err);
    process.exit(1);
});
