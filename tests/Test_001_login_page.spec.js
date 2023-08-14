// import test from "../fixture/testFixture";
import { chromium,  test } from "@playwright/test";
import { POManager } from "../page/POManager";

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

  test("Verify All Element is visible in Ui", async () => {
    await loginPage.verifyAllUiElementOfLoginPage();
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
