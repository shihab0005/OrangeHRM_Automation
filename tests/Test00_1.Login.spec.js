import { chromium, expect, test } from "@playwright/test";
import LoginPage from "../page/LoginPage";

const username = "Admin";
const password = "admin123";
const usernameIn = "Admin1";
const passwordIn = "admin12";

let url = "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login";

test.describe("001_Test Login Functionalty", () => {
  let page;
  let login;
  let context;
  let browser;

  test.beforeEach(async () => {
    browser = await chromium.launch();
    context = await browser.newContext();
    page = await context.newPage();
    await page.goto(
      "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login"
    );
    login = new LoginPage(page);
  });

  test("Login With Valid Credential", async () => {
    login.PageUrlVerify(url);
    await login.LoginWithCredential(username, password);
    await expect(page.locator("span h6")).toHaveText("Dashboard");
    console.log("Successfully Login In Dashboard");
  });

  test("Login With Invalid Credential", async () => {
    login.PageUrlVerify(url);
    await login.LoginWithCredential(usernameIn, passwordIn);
    const warnTextLocator = page.locator("//p[text()='Invalid credentials']");
    const alertWarnLocator = page.locator("//div[@role='alert']");
    await login.InvalidCredentialMessage(warnTextLocator, alertWarnLocator);
  });

  test("Login With Only valid username", async () => {
    login.PageUrlVerify(url);

    await login.userNameFieldValue(username);
    await login.clickLoginBtn();
    const warnTextLocator = page.locator("//span[text()='Required']");
    const alertWarnLocator = page.locator("//span[text()='Required']");
    await login.InvalidCredentialMessage(warnTextLocator, alertWarnLocator);
    console.log("Password Required");
  });

  test("Login With Only valid Password", async () => {
    login.PageUrlVerify(url);

    await login.passwordFieldValue(password);
    await login.clickLoginBtn();
    const warnTextLocator = page.locator("//span[text()='Required']");
    const alertWarnLocator = page.locator("//span[text()='Required']");
    await login.InvalidCredentialMessage(warnTextLocator, alertWarnLocator);
    console.log("UserName Required");
  });
});
