/* Scenario 1: Verify user Login with all required field and valid, invalid credentials and messages. 


Scenario Description: 
User Navigate To the Login page and Login with valid and invalid Credentials and verify all error message
and Track Successfully login. 


Test cases:
1.	Navigate to Website Login Page .
2.	Verify All Element is visible in Ui.
3.  Login With Valid Credential verify all the  message.
4.	Login With invalid Credentials and verify all the error message.
5.	Login With Only valid username and verify all the error message.
6.	Login With Only valid Password and verify all the error message.
*/

// import test from "../fixture/testFixture";
import { chromium, test } from "@playwright/test";
const { POManager } = require("../page/POManager");

test.describe("001_Test Login Functionalty", () => {
  let page;
  let context;
  let browser;
  let loginPage;
  test.beforeEach(async ({}) => {
    browser = await chromium.launch();
    context = await browser.newContext();
    page = await context.newPage();
    const poManager = new POManager(page);
    loginPage = poManager.getLoginPage();
    await loginPage.openApp();
  });

  test.afterEach(async () => {
    await browser.close();
  });

  test("Verify All Element is visible in Ui", async () => {
    await loginPage.verifyAllUiElementOfLoginPage();
    await loginPage.verifyPageURL();
    await loginPage.verifyPageTitle();
    console.log("All Element Is Visible in Login page Ui");
  });

  test("Login With Valid Credential", async () => {
    await loginPage.LoginWithCredential();
    await loginPage.verifySuccessfullyLoginDashboard();
    console.log("Successfully Login In Dashboard");
  });

  test("Login With Invalid Credential", async () => {
    await loginPage.LoginWithInvalidCredential();
    await loginPage.verifyInvalidCredentialMessage();
  });

  test("Login With Only valid username", async () => {
    await loginPage.userNameFieldValue();
    await loginPage.clickLoginBtn();
    await loginPage.verifyInvalidFieldMessage();
    console.log("Password Required");
  });

  test("Login With Only valid Password", async () => {
    await loginPage.passwordFieldValue();
    await loginPage.clickLoginBtn();
    await loginPage.verifyInvalidFieldMessage();
    console.log("UserName Required");
  });
});
