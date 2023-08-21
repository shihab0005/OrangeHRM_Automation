const { expect } = require("@playwright/test");
const fs = require("fs");
// import BasePage from "./basePage";
const { BasePage } = require("./basePage");
// let x = Math.floor(Math.random() * 100 + 1);
const userName = "shihabkhan12";

const searchUserName = userName;
const updateUserName = userName + "up";

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
  confirmDeleteFromTableBtn,
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
    await this.waitAndFill(searchUsernameField, searchUserName);
  };

  clickSearchBtn = async () => {
    await this.waitAndClick(searchBtn);
  };
  verifySearchingResult = async () => {
    // await this.isElementVisible(tableRowLoc, testData.notVisibleText);
    await this.verifyElementText(tableUsernameCol, searchUserName);
    await this.verifyElementText(tableUserroleCol, testData.userRole);
  };

  verifyErrorMessage = async () => {
    await this.isElementVisible(toastDiv, testData.notVisibleText);
    await this.verifyElementText(saveSuccessMsg, testData.info);
    console.log("User Not Found");
  };

  /*----------------------------------------------------------------
   ----------------------------------------------------------- Delet and Update User From table ------------
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

  verifyAfterSuccessfullyDeleteRecord = async () => {
    await this.isElementVisible(toastDiv, testData.notVisibleText);
    await this.verifyElementText(saveSuccessMsg, testData.success);
  };

  waitForTimeOut = async () => {
    await this.wait(5000);
  };
}
module.exports = { AdminPage };
