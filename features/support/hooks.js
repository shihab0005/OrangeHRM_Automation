const {
  Before,
  After,
  BeforeStep,
  AfterStep,
  Status,
} = require("@cucumber/cucumber");

const playwright = require("@playwright/test");
const { POManager } = require("../../page/POManager");
let browser;
let context;
Before(async function () {
  browser = await playwright.chromium.launch({
    headless: false,
  });
  context = await browser.newContext();
  this.page = await context.newPage();

  this.poManager = new POManager(this.page);
});

After(async function () {
  await browser.close();
});

BeforeStep(function () {
  console.log("Step will Start");
});

AfterStep(async function ({ result }) {
  if (result.status === Status.FAILED) {
    await this.page.screenshot({ path: "features/Screenshot/scr1.png" });
  }
});
