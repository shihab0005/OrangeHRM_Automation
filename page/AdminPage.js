const { expect } = require("@playwright/test");
const fs = require("fs");
// import BasePage from "./basePage";
const { BasePage } = require("./basePage");
let x = Math.floor(Math.random() * 1000 + 1);
const userName = "shihab1" + x;
const tUserName = userName;
const searchUserName = userName;
const updateUserName = userName + "update";

const {
  userManagementLoc,
  userOptionLoc,
  addUserBtn,
  userRoleSelector,
  optionsForAllSelector,
  employeeNameSelector,
  statusSelector,
  userNameField,
  passwordField,
  cPasswordField,
  saveBtn,
  saveSuccessMsg,
  toastDiv,
  searchUsernameField,
  searchBtn,
  tableRowLoc,
  tableUsernameCol,
  tableUserroleCol,
  tableCheckboxCol,
  userDeleteFromTableBtn,
  confirmDeleteFromTableBtn
} = require("../pageLocator/AdminPageLocator.js");

const testData = JSON.parse(fs.readFileSync(`./data/users.json`, `utf-8`));

class AdminPage extends BasePage {
  constructor(page) {
    super(page);
  }

  /*-----------------------------------------------------------------
  ---------------------------------------------------------------  Add New User  -------------
  ------------------------------------------------------------------*/
  selectUserOptionFromDropdown = async () => {
    await this.waitAndClick(userManagementLoc);
    await this.waitAndClick(userOptionLoc);
  };

  clcikAddNewUserBtn = async () => {
    await this.waitAndClick(addUserBtn);
  };
  selectOptionFromUserRoleSelector = async () => {
    await this.waitAndClick(userRoleSelector);
    await this.selectOptionFromDropdownSelector(
      optionsForAllSelector,
      testData.userRole
    );
  };

  selectOptionFromEmployeeNameSelector = async () => {
    await this.delayAndFill(employeeNameSelector, testData.empNameType);
    await this.selectEmployeeFromDropdownSelector(optionsForAllSelector);
  };

  selectOptionFromStatusSelector = async () => {
    await this.waitAndClick(statusSelector);
    await this.selectOptionFromDropdownSelector(
      optionsForAllSelector,
      testData.status
    );
  };

  userNameFieldValue = async () => {
    await this.waitAndFill(userNameField, userName);
  };
  passwordFieldValue = async () => {
    await this.waitAndFill(passwordField, testData.pass);
  };

  cPasswordFieldValue = async () => {
    await this.waitAndFill(cPasswordField, testData.pass);
  };

  clickSaveBtn = async () => {
    await this.waitAndClick(saveBtn);
  };

  verifySuccessfullySaveUser = async () => {
    await this.isElementVisible(toastDiv, testData.notVisibleText);
    await this.verifyElementText(saveSuccessMsg, testData.success);
  };

  /*-------------------------------------------------------------------------
  --------------------------------------------------------------- Search System Users -----
  ----------------------------------------------------------------------------*/

  searchUsernameFieldValue = async () => {
    await this.waitAndFill(searchUsernameField, tUserName);
  };

  clickSearchBtn = async () => {
    await this.waitAndClick(searchBtn);
  };
  verifySearchingResult = async () => {
    await this.isElementVisible(tableRowLoc, testData.notVisibleText);
    await this.verifyElementText(tableUsernameCol, tUserName);
    await this.verifyElementText(tableUserroleCol, testData.userRole);
  };

  // verifyErrorMessage = async () => {
  //   await this.isElementVisible(toastDiv, testData.notVisibleText);
  //   await this.verifyElementText(saveSuccessMsg, testData.info);
  //   console.log("User Not Found");
  // };

  /*----------------------------------------------------------------
  ----------------------------------------------------------- Delet User From table ------------------
  ------------------------------------------------------------------*/

  selectAllUserFromTable = async () => {
    await this.clickAllElements(tableCheckboxCol);
  };

  findSingleUserFromTable = async () => {
    await this.selectSingleRowFromTable(tableRowLoc, searchUserName);
  };

  updateUserNameFieldValue = async () => {
    await this.waitAndFill(userNameField, updateUserName);
  };

  updateOptionFromStatusSelector = async () => {
    await this.waitAndClick(statusSelector);
    await this.selectOptionFromDropdownSelector(
      optionsForAllSelector,
      testData.status1
    );
  };

  clickUpdateSaveBtn = async () => {
    await this.waitAndClick(saveBtn);
  };

  verifyUpdateUserSuccessfully = async () => {
    await this.isElementVisible(toastDiv, testData.notVisibleText);
    await this.verifyElementText(saveSuccessMsg, testData.success);
  };

  selectAllOddUserFromTable = async () => {
    await this.selectElementWithCondition(tableCheckboxCol);
  };
  clickUserDeleteFromTableBtn = async () => {
    await this.waitAndClick(userDeleteFromTableBtn);
  };
  clickConfirmUserDeleteFromTableBtn = async () => {
    await this.waitAndClick(confirmDeleteFromTableBtn);
  };

  verifyAfterSuccessfullyDeleteRecord=async()=>{
    await this.isElementVisible(toastDiv, testData.notVisibleText);
    await this.verifyElementText(saveSuccessMsg, testData.success);
  }

  waitForTimeOut = async () => {
    await this.wait();
  };

  /*---------------------------------------------------------------------
  -------------------------------------------------  Delete Selected Value From Table Start  ----------
  -----------------------------------------------------------------------*/

  tableDataLoc = () => this.page.locator("//div[@role='rowgroup']/div");

  tableDeletBtn = () =>
    this.page.locator(
      // "//*[@id='app']/div[1]/div[2]/div[2]/div/div[2]/div[2]/div/div/button"
      "//button[@class='oxd-button oxd-button--medium oxd-button--label-danger orangehrm-horizontal-margin']"
    );
  tableConfirmDeleteBtn = () =>
    this.page.locator("//div[@class='orangehrm-modal-footer']/button[2]");

  async deleteSelectedValueFromTable() {
    await this.tableDataLoc().nth(1).waitFor();
    const len = await this.tableDataLoc().count();
    console.log("Users :" + len);
    for (let i = 1; i < 6; i++) {
      if (i % 2 == 0) {
        await this.tableDataLoc().nth(i).locator("//div//span").click();
      }
    }
    await this.tableDeletBtn()?.click();
    await this.tableConfirmDeleteBtn()?.click();
    const SuccessToast = await this.page
      .locator("//*[@id='oxd-toaster_1']/div/div[1]/div[2]/p[2]")
      .textContent();
    if (SuccessToast == "Successfully Deleted") {
      console.log("Successfully Deleted Users Record");
    }
  }

  /*--------------------------------------------------------------
--------Delete Selected Value From Table end------------------------
----------------------------------------------------------------*/
}
module.exports = { AdminPage };
