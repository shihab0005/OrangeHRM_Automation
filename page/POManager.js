const { LoginPage } = require("../page/LoginPage");
const { DashboardPage } = require("../page/DashboardPage");
const { AdminPage } = require("../page/AdminPage");

class POManager {
  constructor(page) {
    this.page = page;
    this.loginPage = new LoginPage(this.page);
    this.dashboardPage = new DashboardPage(this.page);
    this.adminPage = new AdminPage(this.page);
  }

  getLoginPage() {
    return this.loginPage;
  }
  getDashboardPage() {
    return this.dashboardPage;
  }
  getAdminPage() {
    return this.adminPage;
  }
}
module.exports = { POManager };
