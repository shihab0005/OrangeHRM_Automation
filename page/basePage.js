const { expect } = require("@playwright/test");

class BasePage {
  constructor(page) {
    this.page = page;
  }

  async open(url) {
    await this.page.goto(url);
  }

  async getTitle() {
    return await this.page.title();
  }

  async getUrl() {
    return this.page.url();
  }

  async wait() {
    return this.page.waitForTimeout(10000);
  }
  async push() {
    await this.page.push();
  }

  async waitForPageLoad() {
    return await this.page.waitForLoadState("networkidle");
  }

  async waitAndClick(selector) {
    return await this.page.click(selector);
  }

  async waitAndHardClick(selector) {
    return await this.page.$eval(selector, (element) => element.click());
  }

  async waitAndFill(selector, text) {
    await this.page.fill(selector, text);
  }
  async delayAndFill(selector, text) {
    const ele = this.page.locator(selector);
    // await ele?.clear();
    await ele?.type(text, { delay: 200 });
  }

  async keyPress(selector, key) {
    this.page.press(selector, key);
  }

  async takeScreenShot() {
    return expect(await this.page.screenshot()).toMatchSnapshot(
      "MyScreenShot.png"
    );
  }

  async verifyElementText(selector, text) {
    await this.page.locator(selector).waitFor();
    const textValue = await this.page.textContent(selector);
    return expect(textValue.trim()).toBe(text);
  }

  async verifyElementContainsText(selector, text) {
    await this.page.locator(selector).waitFor();
    return await expect(this.page.locator(selector)).toContainText(text);
  }

  async verifyJSElementValue(selector, text) {
    await this.page.waitForSelector(selector);
    const textValue = await this.page.$eval(
      selector,
      (element) => element.value
    );
    return expect(textValue.trim()).toBe(text);
  }

  async selectValueFromDropdown(selector, text) {
    await this.page.waitForSelector(selector);
    const dropdown = await this.page.locator(selector);
    return await dropdown.selectOption({ value: text });
  }

  async verifyElementAttribute(selector, attribute, value) {
    await this.page.waitForSelector(selector);
    const textValue = await this.page.getAttribute(selector, attribute);
    return expect(textValue.trim()).toBe(value);
  }

  async getFirstElementFromTheList(selector) {
    const rows = this.page.locator(selector);
    const count = await rows.count();
    for (let i = 0; i < count; ++i) {
      const firstItem = await rows.nth(0).textContent();
      return firstItem;
    }
  }

  async selectOptionFromDropdownSelector(selectAllOption, optionText) {
    const total = await this.page.locator(selectAllOption).count();
    console.log("total Option : " + total);
    await expect(this.page.locator(selectAllOption)).toHaveCount(total);

    for (let i = 1; i < total; i++) {
      const option = await this.page
        .locator(selectAllOption)
        .nth(i)
        .locator("span")
        .textContent();
      console.log(option);
      if (option == optionText) {
        await this.page.locator(selectAllOption).nth(i).click();
        break;
      }
    }
  }
  async selectEmployeeFromDropdownSelector(selectAllOption) {
    const total = await this.page.locator(selectAllOption).count();
    console.log("total Option : " + total);
    await expect(this.page.locator(selectAllOption)).toHaveCount(total);

    for (let i = 0; i < total; i++) {
      const option = await this.page
        .locator(selectAllOption)
        .nth(i)
        .locator("span")
        .textContent();
      console.log(option);

      await this.page.locator(selectAllOption).nth(i).click();
      break;
    }
  }

  async selectSingleRowFromTable(selector, textUser) {
    await this.page.locator(selector).nth(1).waitFor();
    const len = await this.page.locator(selector).count();
    console.log("Users :" + len);
    for (let i = 1; i < len; i++) {
      const userName = await this.page
        .locator(selector)
        .nth(i)
        .locator("//div[2]/div")
        .textContent();
      console.log(userName, textUser);
      if (userName.includes(textUser)) {
        console.log("Match");
        await this.page
          .locator(selector)
          .nth(i)
          .locator("//div//button[2]")
          .click();
        break;
      }
    }
  }

  async getLastElementFromTheList(selector) {
    const rows = this.page.locator(selector);
    const count = await rows.count();
    for (let i = 0; i < count; ++i) {
      const lastItem = await rows.nth(5).textContent();
      return lastItem;
    }
  }

  async clickAllElements(selector) {
    await this.page.locator(selector).nth(1).waitFor();
    const rows = this.page.locator(selector);
    const len = await rows.count();
    console.log(len);
    for (let i = 0; i < len; ++i) {
      await rows.nth(i).click();
    }
  }
  async selectElementWithCondition(selector) {
    await this.page.locator(selector).nth(1).waitFor();
    const rows = this.page.locator(selector);
    const len = await rows.count();
    console.log(len);
    if (len > 10) {
      for (let i = 0; i < len; ++i) {
        if (i % 2 == 1) {
          await rows.nth(i).click();
        }
      }
    } else {
      console.log("Total user is less than 10");
    }
  }

  async isElementVisible(selector, errorMessage) {
    await this.page.waitForSelector(selector);
    const element = this.page.locator(selector);
    try {
      const isVisible = await element.isVisible();
      expect(isVisible).toBeTruthy();
    } catch (error) {
      throw new Error(`${errorMessage}`);
    }
  }

  async isElementNotVisible(selector) {
    const element = this.page.locator(selector);
    return expect(element).toBeHidden();
  }

  async isElementEnabled(selector, errorMessage) {
    await this.page.waitForSelector(selector);
    const element = this.page.locator(selector);
    try {
      const isEnabled = await element.isEnabled();
      expect(isEnabled).toBeTruthy();
    } catch (error) {
      throw new Error(`${errorMessage}`);
    }
  }

  async isElementChecked(selector, errorMessage) {
    await this.page.waitForSelector(selector);
    const element = this.page.locator(selector);
    try {
      const isChecked = await element.isChecked();
      expect(isChecked).toBeTruthy();
    } catch (error) {
      throw new Error(`${errorMessage}`);
    }
  }
}

module.exports = { BasePage };
