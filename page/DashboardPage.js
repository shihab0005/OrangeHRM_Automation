// import BasePage from "./basePage";
const { BasePage } = require("./basePage");
const { adminItem,pimItem } = require("../pageLocator/DashboardPageLocator");

class DashboardPage extends BasePage {
  constructor(page) {
    super(page);
  }

  navigateToAdminPage = async () => {
    await this.waitAndClick(adminItem);
  };
  
  navigateToPimPage = async () => {
    await this.waitAndClick(pimItem);
  };
}
module.exports = { DashboardPage };
