import { expect } from "@playwright/test";

export default class AdminPage {
  constructor(page) {
    this.page = page;
  }

  /*--------------------------------------Add New User (Locators)-------------------------------------*/
  userManagementLoc = () =>
    this.page.locator("//span[text()='User Management ']");
  userOptionLoc = () => this.page.locator("//li/ul[@role='menu']/li/a");
  addUserBtnLoc = () =>
    this.page.locator("//div[@class='orangehrm-header-container']/button");

  userRoleSelectLocator = () =>
    this.page.locator(
      "//*[@id='app']/div[1]/div[2]/div[2]/div/div/form/div[1]/div/div[1]/div/div[2]/div/div"
    );

  userRoleOptionsLoc = () => this.page.locator("//div[@role='listbox']/div");

  statusSelectLocator = () =>
    this.page.locator(
      "//*[@id='app']/div[1]/div[2]/div[2]/div/div/form/div[1]/div/div[3]/div/div[2]/div/div"
    );

  statusOptionLoc = () =>
    this.page.locator(
      "//*[@id='app']/div[1]/div[2]/div[2]/div/div/form/div[1]/div/div[3]/div/div[2]/div/div[2]/div"
    );

  employeeNameLoc = () =>
    this.page.locator(
      "//*[@id='app']/div[1]/div[2]/div[2]/div/div/form/div[1]/div/div[2]/div/div[2]/div/div[1]/input"
    );

  empOptionsLoc = () =>
    this.page.locator(
      "//*[@id='app']/div[1]/div[2]/div[2]/div/div/form/div[1]/div/div[2]/div/div[2]/div/div[2]/div"
    );

  usernameLoc = () =>
    this.page.locator(
      "//*[@id='app']/div[1]/div[2]/div[2]/div/div/form/div[1]/div/div[4]/div/div[2]/input"
    );

  passwordLoc = () =>
    this.page.locator(
      "//*[@id='app']/div[1]/div[2]/div[2]/div/div/form/div[2]/div/div[1]/div/div[2]/input"
    );

  confirmPasswordLoc = () =>
    this.page.locator(
      "//*[@id='app']/div[1]/div[2]/div[2]/div/div/form/div[2]/div/div[2]/div/div[2]/input"
    );

  saveBtnLoc = () => this.page.locator("//button[text()=' Save ']");
  successMessage = () =>
    this.page.locator("//*[@id='oxd-toaster_1']/div/div[1]/div[2]/p[1]");

  //*--------------------------------------Searching user Form (Locators)-------------------------------------*/

  searchUserNameFieldLoc = () =>
    this.page.locator(
      "//*[@id='app']/div[1]/div[2]/div[2]/div/div[1]/div[2]/form/div[1]/div/div[1]/div/div[2]/input"
    );

  searchUserRoleSelectBoxLoc = () =>
    this.page.locator(
      "//*[@id='app']/div[1]/div[2]/div[2]/div/div[1]/div[2]/form/div[1]/div/div[2]/div/div[2]"
    );

  searchUserRoleSelectOptionsLoc = () =>
    this.page.locator(
      "//*[@id='app']/div[1]/div[2]/div[2]/div/div[1]/div[2]/form/div[1]/div/div[2]/div/div[2]/div/div[2]/div"
    );

  searchEmployeeNameInputfieldLoc = () =>
    this.page.locator(
      "//*[@id='app']/div[1]/div[2]/div[2]/div/div[1]/div[2]/form/div[1]/div/div[3]/div/div[2]/div/div/input"
    );

  searchEmployeeNameInputfieldOptionsLoc = () =>
    this.page.locator(
      "//*[@id='app']/div[1]/div[2]/div[2]/div/div[1]/div[2]/form/div[1]/div/div[3]/div/div[2]/div/div[2]/div"
    );

  searchStatusSelectBoxLocator = () =>
    this.page.locator(
      "//*[@id='app']/div[1]/div[2]/div[2]/div/div[1]/div[2]/form/div[1]/div/div[4]/div/div[2]"
    );

  searchStatusSelectOptionsLoc = () =>
    this.page.locator(
      "//*[@id='app']/div[1]/div[2]/div[2]/div/div[1]/div[2]/form/div[1]/div/div[4]/div/div[2]/div/div[2]/div"
    );
  searchButtonLoc = () =>
    this.page.locator("//button[normalize-space()='Search']");

  /*--------------------------------------Searching Result Table (Locators)-------------------------------------*/

  userTablesLoc = () => this.page.locator("//div[@role='rowgroup']/div");

  /*----------------------------------
  -----------Searching Result Table (Functionality)--------
  -----------------------------*/
  async searchResultFromTable(searchUserName) {
    await this.userTablesLoc().first().waitFor();
    const len = await this.userTablesLoc().count();
    console.log("Users :" + len);
    for (let i = 1; i < len; i++) {
      const userName = await this.userTablesLoc()
        .nth(i)
        .locator("//div/div[2]/div")
        .textContent();
      console.log(userName);
      if (userName == searchUserName) {
        console.log("Successfully find the User");
        break;
      } else {
        console.log("There is no record found!");
      }
    }
  }

  /*------------------------------------------------------------
  ----------------------- Functionality for search form---------
  --------------------------------------------------------------*/

  async searchUserNameFieldValue(username) {
    const ele = this.searchUserNameFieldLoc();
    await ele?.fill(username);
  }

  async clickSearchUserRoleSelectBox() {
    const ele = this.searchUserRoleSelectBoxLoc();
    await ele?.click();
  }
  async clickSearchStatusSelectBox() {
    const ele = this.searchStatusSelectBoxLocator();
    await ele?.click();
  }
  async clickSearchButton() {
    const ele = this.searchButtonLoc();
    await ele?.click();
  }

  async searchEmployeeNameInputfieldValue(empName) {
    const ele = this.searchEmployeeNameInputfieldLoc();
    await ele?.type(empName, { delay: 300 });
  }

  async SearchOptionFromUserRoleSelector(role) {
    await this.clickSearchUserRoleSelectBox();
    const total = await this.searchUserRoleSelectOptionsLoc().count();
    console.log("total Option : " + total);
    await expect(this.searchUserRoleSelectOptionsLoc()).toHaveCount(total);

    for (let i = 1; i < total; i++) {
      const option = await this.searchUserRoleSelectOptionsLoc()
        .nth(i)
        .locator("span")
        .textContent();
      console.log(option);
      if (option == role) {
        await this.searchUserRoleSelectOptionsLoc().nth(i).click();
        break;
      }
    }
  }

  async searchOptionFromEmployeeNameSelector(empName) {
    await this.searchEmployeeNameInputfieldValue(empName);
    const total = await this.searchEmployeeNameInputfieldOptionsLoc().count();
    console.log("total Option : " + total);
    await expect(this.searchEmployeeNameInputfieldOptionsLoc()).toHaveCount(
      total
    );

    for (let i = 0; i < total; i++) {
      const option = await this.searchEmployeeNameInputfieldOptionsLoc()
        .nth(i)
        .locator("span")
        .textContent();
      console.log(option);
      await this.searchEmployeeNameInputfieldOptionsLoc().nth(i).click();
      break;
    }
  }

  async searchOptionFromStatusSelector(status) {
    await this.clickSearchStatusSelectBox();
    const total = await this.searchStatusSelectOptionsLoc().count();
    console.log("total Option : " + total);
    await expect(this.searchStatusSelectOptionsLoc()).toHaveCount(total);

    for (let i = 1; i < total; i++) {
      const option = await this.searchStatusSelectOptionsLoc()
        .nth(i)
        .locator("span")
        .textContent();
      console.log(option);
      if (option == status) {
        await this.searchStatusSelectOptionsLoc().nth(i).click();
        break;
      }
    }
  }

  /*--------------------------------------Functionality for Add New User--------------------------------*/

  async ClickUserManagmentOption() {
    const ele = this.userManagementLoc();
    await ele?.click();
  }

  async ClickUserOptionBtn() {
    const ele = this.userOptionLoc();
    await ele?.click();
  }

  async ClickAddUserBtn() {
    const ele = this.addUserBtnLoc();
    await ele?.click();
  }
  async ClickUserRoleSelectBox() {
    const ele = this.userRoleSelectLocator();
    await ele?.click();
  }
  async ClickStatusSelectBox() {
    const ele = this.statusSelectLocator();
    await ele?.click();
  }

  async employeeNameFieldValue(name) {
    const ele = this.employeeNameLoc();
    await ele?.type(name, { delay: 300 });
  }
  async userNameFieldValue(username) {
    const ele = this.usernameLoc();
    await ele?.fill(username);
  }
  async passwordFieldValue(password) {
    const ele = this.passwordLoc();
    await ele?.fill(password);
  }
  async confPasswordFieldValue(cpassword) {
    const ele = this.confirmPasswordLoc();
    await ele?.fill(cpassword);
  }

  async clickSaveBtn() {
    const ele = this.saveBtnLoc();
    await ele?.click();
  }

  async successfullySaveInfo() {
    const ele = this.successMessage();
    const text = await ele?.textContent();
    if (text == "Success") {
      console.log("Successfully Save Data");
    }
  }
  async SelectOptionFromUserRoleSelector(role) {
    await this.ClickUserRoleSelectBox();
    const total = await this.userRoleOptionsLoc().count();
    console.log("total Option : " + total);
    await expect(this.userRoleOptionsLoc()).toHaveCount(total);

    for (let i = 1; i < total; i++) {
      const option = await this.userRoleOptionsLoc()
        .nth(i)
        .locator("span")
        .textContent();
      console.log(option);
      if (option == role) {
        await this.userRoleOptionsLoc().nth(i).click();
        break;
      }
    }
  }

  async SelectOptionFromStatusSelector(status) {
    await this.ClickStatusSelectBox();
    const total = await this.statusOptionLoc().count();
    console.log("total Option : " + total);
    await expect(this.statusOptionLoc()).toHaveCount(total);

    for (let i = 1; i < total; i++) {
      const option = await this.statusOptionLoc()
        .nth(i)
        .locator("span")
        .textContent();
      console.log(option);
      if (option == status) {
        await this.statusOptionLoc().nth(i).click();
        break;
      }
    }
  }

  async SelectOptionFromEmployeeNameSelector(empName) {
    await this.employeeNameFieldValue(empName);
    const total = await this.empOptionsLoc().count();
    console.log("total Option : " + total);
    await expect(this.empOptionsLoc()).toHaveCount(total);

    for (let i = 0; i < total; i++) {
      const option = await this.empOptionsLoc()
        .nth(i)
        .locator("span")
        .textContent();
      console.log(option);
      await this.empOptionsLoc().nth(i).click();
      break;
    }
  }

  /*--------------------------------------------------------------
  --------Delete Selected Value From Table Start------------------
  --------------------------------------------------------------*/

  tableDataLoc = () => this.page.locator("//div[@role='rowgroup']/div");

  tableDeletBtn = () =>
    this.page.locator(
      "//*[@id='app']/div[1]/div[2]/div[2]/div/div[2]/div[2]/div/div/button"
    );
  tableConfirmDeleteBtn = () =>
    this.page.locator("//*[@id='app']/div[3]/div/div/div/div[3]/button[2]");

  async deleteSelectedValueFromTable() {
    await this.tableDataLoc().nth(1).waitFor();
    const len = await this.tableDataLoc().count();
    console.log("Users :" + len);
    for (let i = 1; i < 10; i++) {
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

  /*--------------------------------------------------------------
--------Update User Information From Table Start------------------------
----------------------------------------------------------------*/
  updateUsernameFieldLoc = () =>
    this.page.locator(
      "//*[@id='app']/div[1]/div[2]/div[2]/div/div/form/div[1]/div/div[4]/div/div[2]/input"
    );
  updateSaveBtnLoc = () =>
    this.page.locator(
      "//*[@id='app']/div[1]/div[2]/div[2]/div/div/form/div[2]/button[2]"
    );

  async updateUsernameFieldValue() {
    const ele = await this.updateUsernameFieldLoc();
    await ele?.fill("SkHan");
  }
  async clickUpdateSaveBtn() {
    const ele = await this.updateSaveBtnLoc();
    await ele?.click();
  }
  async updateUserInfoFromTable(searchUserName) {
    await this.tableDataLoc().first().waitFor();
    const len = await this.tableDataLoc().count();
    console.log("Users :" + len);
    for (let i = 1; i < len; i++) {
      const userName = await this.tableDataLoc()
        .nth(i)
        .locator("//div/div[2]/div")
        .textContent();
      console.log(userName);
      if (userName == searchUserName) {
        await this.tableDataLoc().nth(i).locator("//div//button[2]").click();
        break;
      }
    }
    this.updateUsernameFieldValue();
    this.clickUpdateSaveBtn();
    const SuccessToast = await this.page
      .locator("//*[@id='oxd-toaster_1']/div/div[1]/div[2]/p[2]")
      .textContent();
    if (SuccessToast == "Successfully Update") {
      console.log("Successfully Update Users Record");
    }
  }

  /*--------------------------------------------------------------
--------Update User Information From Table Start------------------------
----------------------------------------------------------------*/
}
