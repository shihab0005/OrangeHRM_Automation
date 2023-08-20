const { BasePage } = require("../page/basePage");
const { expect } = require("@playwright/test");
const fs = require("fs");
const {
  addUserBtn,
  addEmployeeText,
  firstNameInputField,
  middleNameInputField,
  lastNameInputField,
  imageInputField,
  saveBtn,
  toastDiv,
  saveSuccessMsg,
  empIdField,
} = require("../pageLocator/PimPageLocator");
let x = Math.floor(Math.random() * 10000 + 1);
let empId = x + "";
const testData = JSON.parse(fs.readFileSync(`./data/users.json`, `utf-8`));
class PimPage extends BasePage {
  constructor(page) {
    super(page);
  }

  clickAddNewEmployeeBtn = async () => {
    await this.waitAndClick(addUserBtn);
  };
  verifySuccessfullyNavigateToAddEmployeePage = async () => {
    await this.isElementVisible(addEmployeeText, testData.notVisibleText);
    await this.verifyElementText(addEmployeeText, testData.addEmployeeText);
  };

  uploadeImageFromImageFile = async () => {
    await this.fileUploade(imageInputField, testData.imageFile);
  };
  fillFirstNameFieldValue = async () => {
    await this.waitAndFill(firstNameInputField, testData.fname);
  };
  fillMiddleNameFieldValue = async () => {
    await this.waitAndFill(middleNameInputField, testData.mname);
  };
  fillLastNameFieldValue = async () => {
    await this.waitAndFill(lastNameInputField, testData.lname);
  };
  fillEmpIdFieldValue = async () => {
    await this.waitAndFill(empIdField, empId);
  };

  clickSaveButtonToSaveNewEmployee = async () => {
    await this.waitAndClick(saveBtn);
  };
  verifySuccessfullySaveUser = async () => {
    await this.isElementVisible(toastDiv, testData.notVisibleText);
    await this.verifyElementText(saveSuccessMsg, testData.success);
  };
  awaitForTimeOut = async () => {
    await this.wait();
  };
}
module.exports = { PimPage };
