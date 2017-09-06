const webdriver = require("selenium-webdriver");
const driver = new webdriver.Builder().withCapabilities(webdriver.Capabilities.chrome()).build();

console.log("Loading...");
driver.get("file://" + __dirname + "/test/index.html");
console.log("Wait for test results...");
driver.findElement(webdriver.By.id("mocha-stats"));
driver.takeScreenshot().then((data) => {
    require("fs").writeFileSync("/screenshot.png", data, "base64");
});
const result = driver.executeScript(`
    const passedTests = document.querySelectorAll(".test.pass");
    const failedTests = document.querySelectorAll(".test.fail");
    return {
        passed: passedTests.length
        failed: failedTests.length
    };
`);

console.log("Test result :");
console.log(result.passed + " test(s) passed.");
console.log(result.failed + " test(s) failed.");

console.log("Tear down...");
driver.quit();

if (result.failed) {
    process.exit(1);
}
//process.exit(0);
