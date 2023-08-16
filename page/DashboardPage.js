// import BasePage from "./basePage";
const { BasePage } = require("./basePage");
const { adminItem } = require("../pageLocator/DashboardPageLocator");

class DashboardPage extends BasePage {
  constructor(page) {
    super(page);
  }

  navigateToAdminPage = async () => {
    await this.waitAndClick(adminItem);
  };
}
module.exports = { DashboardPage };
