import { test as fixture } from "@playwright/test";
import LoginPage from "../page/LoginPage";
import AdminPage from "../page/AdminPage";

const test = fixture.extend({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  adminPage: async ({ page }, use) => {
    await use(new AdminPage(page));
  },
});
export default test;
