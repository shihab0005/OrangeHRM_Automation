import { chromium, test } from "@playwright/test";
// import { test } from "../fixture/basePage";
import LoginPage from "../page/LoginPage";
import AdminPage from "../page/AdminPage";

let x = Math.floor(Math.random() * 1000 + 1);
const username = "Admin";
const password = "admin123";
const role = "Admin";
const status_user = "Enabled";
const empName = "Lisa Andrews";
const userName = "shihab72" + x;
const searchUserName = userName;
const pass = "Shi12#$%";
const updateName = "SKhan" + x;

test.describe("Test_002 Admin Section Automation", () => {
  let page;
  let admin;
  let login;
  let context;
  let browser;

  test.beforeEach(async ({}) => {
    browser = await chromium.launch();
    context = await browser.newContext();
    page = await context.newPage();
    await page.goto(
      "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login"
    );
    login = new LoginPage(page);
    admin = new AdminPage(page);
    login.LoginWithCredential(username, password);
    await page.click("//span[text()='Admin']");
  });

  test.afterEach(async () => {
    await browser.close();
  });
  test("User Management Section Add New User", async () => {
    await admin.ClickUserManagmentOption();
    await admin.ClickUserOptionBtn();
    await admin.ClickAddUserBtn();
    await admin.SelectOptionFromUserRoleSelector(role);
    await admin.SelectOptionFromStatusSelector(status_user);
    await admin.SelectOptionFromEmployeeNameSelector(empName);
    await admin.userNameFieldValue(userName);
    await admin.passwordFieldValue(pass);
    await admin.confPasswordFieldValue(pass);
    await admin.clickSaveBtn();
    await admin.successfullySaveInfo();
  });

  test("Search System Users Using User Details", async () => {
    await admin.searchUserNameFieldValue(searchUserName);
    await admin.SearchOptionFromUserRoleSelector(role);
    await admin.searchOptionFromEmployeeNameSelector(empName);
    await admin.searchOptionFromStatusSelector(status_user);
    await admin.clickSearchButton();
    await admin.searchResultFromTable(searchUserName);
  });

  test("Delete Selected Value From Table", async () => {
    await admin.deleteSelectedValueFromTable();
  });

  test("Update User Information", async () => {
    await admin.updateUserInfoFromTable(searchUserName, updateName);
    // await page.waitForTimeout(3000);
  });
});
