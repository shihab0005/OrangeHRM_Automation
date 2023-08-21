const { Given, When, Then, setDefaultTimeout } = require("@cucumber/cucumber");
setDefaultTimeout(20 * 1000);

let loginPage;
Given("navigate to the login page", async function () {
  loginPage = this.poManager.getLoginPage();
  await loginPage.openApp();
});

Given("Check Ui element of Login Page", async function () {
  await loginPage.verifyAllUiElementOfLoginPage();
});

When(
  "Enter with Valid Username {string} and Password {string}",
  async function (username, password) {
    await loginPage.LoginWithCredentialValue(username, password);
  }
);

Then("Successfully login and navigate to Dashboard page", async function () {
  await loginPage.verifySuccessfullyLoginDashboard();
});

//login with invalid

Given("navigate to the web page", async function () {
  loginPage = this.poManager.getLoginPage();
  await loginPage.openApp();
});

Given("verify Ui element of Login Page", async function () {
  await loginPage.verifyAllUiElementOfLoginPage();
});

When(
  "Enter with Invalid Username {string} and Password {string}",
  async function (username, password) {
    await loginPage.LoginWithCredentialValue(username, password);
  }
);

Then("verify Error message with invalid credintials", async function () {
  await loginPage.verifyInvalidCredentialMessage();
});
