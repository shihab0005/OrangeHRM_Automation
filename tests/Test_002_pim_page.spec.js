/* Scenario 1: Verify Admin Page with CURD Operation and all required field and valid, invalid credentials and messages. 


Scenario Description: 
User Navigate To the Login page and Login with valid and invalid Credentials.Valid user Navigate to the Admin
page add new user ,search user,select user, update and also delete user with varification message.


Test cases:
1.	User Login  with valid Credentials and navigate to Admin page.
2.	Go to User Management Section and  Add New User with details and verify Successfully added or not.
3.  Search User From  System Users using User Details and verify Searching result.
4.	Find User From  System Users using Only Username and verify Error message.
5.	Select All user from table.
6.	Update a user info from user table and verify tost message.
7.	If Total user up to 10 then delete all odd user from 1 to 10 and verify delete toast message.
*/

import { chromium, test } from "@playwright/test";
// import { test } from "../fixture/basePage";

import { POManager } from "../page/POManager";

test.describe("Test_002 Admin Section Automation", () => {
  let page;
  let context;
  let browser;
  let loginPage;
  let dashboardPage;
  let pimPage;

  test.beforeEach(async ({}) => {
    browser = await chromium.launch();
    context = await browser.newContext();
    page = await context.newPage();

    const poManager = new POManager(page);
    loginPage = poManager.getLoginPage();
    dashboardPage = poManager.getDashboardPage();
    pimPage = poManager.getPimPage();

    await loginPage.openApp();
    await loginPage.LoginWithCredential();
    await dashboardPage.navigateToPimPage();
  });

  test.afterEach(async () => {
    await browser.close();
  });

  test("Add New Employee with Valid Info", async () => {
    await pimPage.clickAddNewEmployeeBtn();
    await pimPage.verifySuccessfullyNavigateToAddEmployeePage();
    await pimPage.uploadeImageFromImageFile();
    await pimPage.fillFirstNameFieldValue();
    // await pimPage.fillMiddleNameFieldValue();
    await pimPage.fillLastNameFieldValue();
    await pimPage.fillEmpIdFieldValue();

    await pimPage.clickSaveButtonToSaveNewEmployee();
    await pimPage.verifySuccessfullySaveUser();
    await pimPage.awaitForTimeOut();
  });
});
