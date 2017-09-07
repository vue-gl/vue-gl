const fs = require("fs");
const webdriver = require("selenium-webdriver");
const driver = new webdriver.Builder().forBrowser("chrome").build();

driver.get("http://localhost:8080/test/");
driver.wait(webdriver.until.titleMatches(/: Complete$/), 10000).then(() => {
    driver.executeScript("return document.documentElement.outerHTML").then((html) => {
        fs.writeFile("test-result.html", html, (err) => {
            if (err) throw err;
            const tests = driver.findElements(webdriver.By.css(".test"));
            const passedTests = driver.findElements(webdriver.By.css(".test.pass:not(.pending)"));
            const failedTests = driver.findElements(webdriver.By.css(".test.fail"));
            const pendingTests = driver.findElements(webdriver.By.css(".test.pending)"));
            if (!tests.length) throw "No tests are evaluated.";
            console.log(`${passedTests.length} of ${tests.length} test${passedTests.length === 1 ? " is": "s are"} passed.`);
            console.log(`${failedTests.length} of ${tests.length} test${failedTests.length === 1 ? " is": "s are"} failed.`);
            console.log(`${pendingTests.length} of ${tests.length} test${pendingTests.length === 1 ? " is": "s are"} pended.`);
            driver.quit();
            process.exit(failedTests.length ? 1: 0);
        });
    });
}).catch((err) => {
    console.error(err);
    driver.quit();
    process.exit(1);
});
