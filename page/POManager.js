const { default: AdminPage } = require("./AdminPage");
const { default: LoginPage } = require("./LoginPage");

class POManager {
    constructor(page) {
      this.page = page;
      this.loginPage = new LoginPage(this.page);
      this.adminPage = new AdminPage(this.page);
     
    }
  
    getLoginPage() {
      return this.loginPage;
    }
    getDashboardPage() {
      return this.adminPage;
    }
    
  }
  module.exports = { POManager };
  