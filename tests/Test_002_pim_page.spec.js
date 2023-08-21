/* Scenario 1: Add new employee with valid user details. 


Scenario Description: 
User Navigate To the Login page and Login with valid and invalid Credentials.Valid user Navigate to the Pim
page add new employee with verification message.


Test cases:
1.	User Login  with valid Credentials .
2.	navigate to Pim page and add new employee with valid user details.
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
    // await pimPage.awaitForTimeOut();
  });
});
