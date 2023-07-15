import { expect } from "@playwright/test";

export default class LoginPage {
  constructor(page) {
    this.page = page;
  }

  usernameFieldLocator = () => this.page.locator("//input[@name='username']");
  passwordFieldLocator = () => this.page.locator("//input[@name='password']");
  loginBtnLocator = () => this.page.locator("button[type='submit']");
  logoLocator = () => this.page.locator("//img[@alt='company-branding']");

  userNameFieldValue = async (username) => {
    const usernameEle = this.usernameFieldLocator();
    await usernameEle?.fill(username);
  };

  passwordFieldValue = async (password) => {
    const passwordEle = this.passwordFieldLocator();
    await passwordEle?.fill(password);
  };

  clickLoginBtn = async () => {
    const loginEle = this.loginBtnLocator();
    await loginEle?.click();
  };

  LoginWithCredential = async (username, password) => {
    await this.userNameFieldValue(username);
    await this.passwordFieldValue(password);
    await this.clickLoginBtn();
  };

  InvalidCredentialMessage = async (visibalWorn, visibalAlert) => {
    await expect(visibalAlert).toBeVisible();
    console.log(await visibalWorn?.textContent());
  };

  PageUrlVerify = async (url) => {
    expect(this.page.url()).toBe(url);
    const logo = this.logoLocator();
  };
}
