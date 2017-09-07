const fs = require("fs");
const webdriver = require("selenium-webdriver");
const driver = new webdriver.Builder().forBrowser("chrome").build();

driver.get("http://localhost:8080/test/");
driver.wait(webdriver.until.titleMatches(/: Complete$/), 10000).then(() => {
    driver.executeScript("return document.documentElement.outerHTML").then((html) => {
        fs.writeFile("test-result.html", html, (err) => {
            if (err) throw err;
            driver.findElements(webdriver.By.css(".test")).then((tests) => {
                driver.findElements(webdriver.By.css(".test.pass:not(.pending)")).then((passedTests) => {
                    driver.findElements(webdriver.By.css(".test.fail")).then((failedTests) => {
                        driver.findElements(webdriver.By.css(".test.pending")).then((pendingTests) => {
                            if (!tests.length) throw "No tests are evaluated.";
                            console.log(`${passedTests.length} of ${tests.length} test${passedTests.length === 1 ? " is": "s are"} passed.`);
                            console.log(`${failedTests.length} of ${tests.length} test${failedTests.length === 1 ? " is": "s are"} failed.`);
                            console.log(`${pendingTests.length} of ${tests.length} test${pendingTests.length === 1 ? " is": "s are"} pended.`);
                            const exitCode = failedTests.length ? 1: 0;
                            driver.quit();
                            process.exit(exitCode);
                        });
                    });
                });
            });
        });
    });
}).catch((err) => {
    console.error(err);
    driver.quit();
    process.exit(1);
});
