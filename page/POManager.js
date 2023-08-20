const { LoginPage } = require("../page/LoginPage");
const { DashboardPage } = require("../page/DashboardPage");
const { AdminPage } = require("../page/AdminPage");
const { PimPage } = require("./PimPage");

class POManager {
  constructor(page) {
    this.page = page;
    this.loginPage = new LoginPage(this.page);
    this.dashboardPage = new DashboardPage(this.page);
    this.adminPage = new AdminPage(this.page);
    this.pimPage = new PimPage(this.page);
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
  getPimPage() {
    return this.pimPage;
  }
}
module.exports = { POManager };
