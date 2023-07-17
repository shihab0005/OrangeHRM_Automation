import { test, chromium, expect } from "@playwright/test";
import LoginPage from "../page/LoginPage";
import AdminPage from "../page/AdminPage";

let x = Math.floor(Math.random() * 1000 + 1);
const username = "Admin";
const password = "admin123";
const role = "Admin";
const status_user = "Enabled";
const empName = "Dica Alexandru";
const userName = "shihab72" + x;
const searchUserName = userName;
const pass = "Shi12#$%";

test.describe("Test_002 Admin Section Automation", () => {
  let page;
  let admin;
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
    login.LoginWithCredential(username, password);
    await page.click("//span[text()='Admin']");
    admin = new AdminPage(page);
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
    await page.waitForTimeout(3000);
  });

  test("Search System Users Using User Details", async () => {
    await admin.searchUserNameFieldValue(searchUserName);
    await admin.SearchOptionFromUserRoleSelector(role);
    await admin.searchOptionFromEmployeeNameSelector(empName);
    await admin.searchOptionFromStatusSelector(status_user);
    await admin.clickSearchButton();
    await admin.searchResultFromTable(searchUserName);
    await page.waitForTimeout(5000);
    
  });

  test("Delete Selected Value From Table", async () => {
    await admin.deleteSelectedValueFromTable();
    // const users = page.locator("//div[@role='rowgroup']/div");
    // await users.first().waitFor();
    // await page.locator("//div[@role='rowgroup']/div").first().waitFor();

    // const Usersloc = page.locator("//div[@role='rowgroup']/div");
    // const len = await Usersloc.count();
    // console.log("Users :" + len);
    // for (let i = 1; i < 5; i++) {

    //   if (i % 2 == 0) {
    //     await Usersloc.nth(i).locator("//div//span").click();
    //   }
    // }
    // await page.click(
    //   "//*[@id='app']/div[1]/div[2]/div[2]/div/div[2]/div[2]/div/div/button"
    // );
    // await page.click("//*[@id='app']/div[3]/div/div/div/div[3]/button[2]");
    // const SuccessToast = await page
    //   .locator("//*[@id='oxd-toaster_1']/div/div[1]/div[2]/p[2]")
    //   .textContent();
    // if (SuccessToast == "Successfully Deleted") {
    //   console.log("Successfully Deleted Users Record");
    // }
  });

  test("Update User Information", async () => {
    await admin.updateUserInfoFromTable(searchUserName);
    // await page.waitForTimeout(3000);
  });
});
