/*--------------------------------------------------------------
                         ----------------------  Add New  user Form (Locators)  ------------
-------------------------------------------------------------*/
module.exports.userManagementLoc = "//span[text()='User Management ']";
module.exports.userOptionLoc = "//li/ul[@role='menu']/li/a";
module.exports.addUserBtn = "//div[@class='orangehrm-header-container']/button";
module.exports.userRoleSelector = "(//div[@class='oxd-select-wrapper'])[1]";
module.exports.optionsForAllSelector = "//div[@role='listbox']/div";
module.exports.employeeNameSelector =
  "//input[@placeholder='Type for hints...']";
module.exports.statusSelector = "(//div[@class='oxd-select-wrapper'])[2]";
module.exports.userNameField =
  "(//input[@class='oxd-input oxd-input--active'])[2]";
module.exports.passwordField =
  "(//div[@class='oxd-input-group oxd-input-field-bottom-space']/div/input)[2]";
module.exports.cPasswordField =
  "(//div[@class='oxd-input-group oxd-input-field-bottom-space']/div/input)[3]";
module.exports.saveBtn = "//div[@class='oxd-form-actions']//button[2]";
module.exports.saveSuccessMsg =
  "//*[@id='oxd-toaster_1']/div/div[1]/div[2]/p[1]";
module.exports.toastDiv = "#oxd-toaster_1";

/*--------------------------------------------------------------
                         ----------------------Searching user Form (Locators)------------
-------------------------------------------------------------*/
module.exports.searchUsernameField =
  "(//div[@class='oxd-input-group oxd-input-field-bottom-space']//input)[1]";
module.exports.searchBtn = "//div[@class='oxd-form-actions']/button[2]";
module.exports.tableRowLoc = "//div[@class='oxd-table-card']/div";
module.exports.tableUsernameCol =
  "//div[@class='oxd-table-card']/div/div[2]/div";
module.exports.tableUserroleCol = "//div[@class='oxd-table-card']/div/div[3]";

/*--------------------------------------------------------------
                         ---------------------- table data (Locators) ------------
-------------------------------------------------------------*/
module.exports.tableCheckboxCol =
  "//div[@class='oxd-table-card']/div/div[1]/div";
module.exports.userDeleteFromTableBtn =
  "//button[@class='oxd-button oxd-button--medium oxd-button--label-danger orangehrm-horizontal-margin']";
module.exports.confirmDeleteFromTableBtn =
  "//div[@class='orangehrm-modal-footer']/button[2]";
