import { expect } from "@playwright/test";
import BasePage from "./basePage";
import fs from "fs";

import {
  loginPageLogo,
  loginText,
  userNameField,
  passwordField,
  loginButton,
  requirdErrorMessage,
  forgetPassword,
  InvalidCredentialsDiv,
  orangeHRMLogo,
  InvalidCredentialsMessage,
  emptyFieldRequireMsg,
  linkedinLogo,
  facebookLogo,
  twitterLogo,
  youtubeLogo,
  orangeHrmVersion,
  dashboardText,
} from "../pageObjects/LoginPageLocator.js";
const testData = JSON.parse(fs.readFileSync(`./data/users.json`, `utf-8`));

export default class LoginPage extends BasePage {
  constructor(page) {
    super(page);
  }

  openApp = async () => {
    await this.open(testData.url);
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
  verifySuccessfullyLoginDashboard = async () => {
    await this.isElementVisible(orangeHRMLogo, testData.notVisibleText);
    await this.isElementVisible(dashboardText, testData.notVisibleText);
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
