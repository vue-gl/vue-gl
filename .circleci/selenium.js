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
                            const colorRed = "\u001b[31m";
                            const colorGreen = "\u001b[32m";
                            const colorCyan = "\u001b[36m";
                            const colorReset = "\u001b[0m";
                            let passed = passedTests.length.toString(10);
                            let failed = failedTests.length.toString(10);
                            let pending = pendingTests.length.toString(10);
                            const digits = tests.length.toString(10).length;
                            passed = " ".repeat(digits - passed.length) + passed;
                            failed = " ".repeat(digits - failed.length) + failed;
                            pending = " ".repeat(digits - pending.length) + pending;
                            console.log(`${colorGreen}${passed} of ${tests.length} test${passedTests.length === 1 ? " is": "s are"} passed.${colorReset}`);
                            console.log(`${colorRed}${failed} of ${tests.length} test${failedTests.length === 1 ? " is": "s are"} failed.${colorReset}`);
                            console.log(`${colorCyan}${pending} of ${tests.length} test${pendingTests.length === 1 ? " is": "s are"} pended.${colorReset}`);
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
