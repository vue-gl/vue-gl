const webdriver = require("selenium-webdriver");
const driver = new webdriver.Builder().withCapabilities(webdriver.Capabilities.firefox()).build();

driver.get("file://" + __dirname + "/test/index.html");
driver.findElement(webdriver.By.id("mocha-stats"));
const result = driver.executeScript(`
    const passedTests = document.querySelectorAll(".test.pass");
    const failedTests = document.querySelectorAll(".test.fail");
    return {
        passed: passedTests.length
        failed: failedTests.length
    };
`);

driver.quit();

console.log(result.passed + " test(s) passed.");

if (result.failed) {
    console.log(result.failed + " test(s) failed.");
    process.exit(1);
}
process.exit(0)
