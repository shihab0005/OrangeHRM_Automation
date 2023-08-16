const { expect } = require("@playwright/test");
// const BasePage = require("./basePage");
const fs = require("fs");
// import BasePage from "./basePage.js";
const { BasePage } = require("./basePage");
const {
  userNameField,
  passwordField,
  loginButton,
  requirdErrorMessage,
  InvalidCredentialsDiv,
  orangeHRMLogo,
  linkedinLogo,
  facebookLogo,
  twitterLogo,
  youtubeLogo,
  orangeHrmVersion,
  dashboardText,
} = require("../pageLocator/LoginPageLocator.js");

const testData = JSON.parse(fs.readFileSync(`./data/users.json`, `utf-8`));

class LoginPage extends BasePage {
  constructor(page) {
    super(page);
  }

  openApp = async () => {
    await this.open(testData.url);
  };

  verifyPageURL = async () => {
    await expect(this.page).toHaveURL(testData.url);
  };

  verifyPageTitle = async () => {
    await expect(this.page).toHaveTitle(testData.SiteTitle);
  };

  verifyAllUiElementOfLoginPage = async () => {
    await this.isElementVisible(linkedinLogo, testData.notVisibleText);
    await this.isElementVisible(facebookLogo, testData.notVisibleText);
    await this.isElementVisible(twitterLogo, testData.notVisibleText);
    await this.isElementVisible(youtubeLogo, testData.notVisibleText);
    await this.isElementVisible(orangeHrmVersion, testData.notVisibleText);
  };

  userNameFieldValue = async () => {
    await this.waitAndFill(userNameField, testData.UserName);
  };

  passwordFieldValue = async () => {
    await this.waitAndFill(passwordField, testData.Password);
  };

  clickLoginBtn = async () => {
    await this.waitAndClick(loginButton);
  };

  async LoginWithCredential() {
    await this.waitAndFill(userNameField, testData.UserName);
    await this.waitAndFill(passwordField, testData.Password);
    await this.waitAndClick(loginButton);
  }
  async LoginWithCredentialValue(UserName, Password) {
    await this.waitAndFill(userNameField, UserName);
    await this.waitAndFill(passwordField, Password);
    await this.waitAndClick(loginButton);
  }
  verifySuccessfullyLoginDashboard = async () => {
    await this.isElementVisible(orangeHRMLogo, testData.notVisibleText);
    await this.isElementVisible(dashboardText, testData.notVisibleText);
    await this.verifyElementText(dashboardText, testData.Dashboard);
  };
  LoginWithInvalidCredential = async () => {
    await this.waitAndFill(userNameField, testData.IUserName);
    await this.waitAndFill(passwordField, testData.IPassword);
    await this.waitAndClick(loginButton);
  };

  verifyInvalidCredentialMessage = async () => {
    await this.isElementVisible(InvalidCredentialsDiv, testData.notVisibleText);
  };

  verifyInvalidFieldMessage = async () => {
    await this.isElementVisible(requirdErrorMessage, testData.notVisibleText);
    expect(requirdErrorMessage).toContain(testData.Required);
  };
}
module.exports = { LoginPage };
