const webdriver = require("selenium-webdriver");
const driver = new webdriver.Builder().withCapabilities(webdriver.Capabilities.chrome()).build();

driver.get("file:///" + __dirname + "/index.html");
driver.wait(() => driver.executeScript(`return document.readyState === "complete";`));
const result = driver.executeScript(`
    const passedTests = document.querySelectorAll(".test.pass");
    const failedTests = document.querySelectorAll(".test.fail");
    return {
        passed: passedTests.length
        failed: failedTests.length
    };
`);
console.log(result.passed + " test(s) passed.");
console.log(result.failed + " test(s) failed.");
driver.takeScreenshot().then((data) => {
    require("fs").writeFileSync("screenshot.png", data, "base64");
    driver.quit();
});
