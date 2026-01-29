const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://qauto.forstudy.space/",
    env: {
      USER_EMAIL: "alex.qauto1+test@gmail.com",
      USER_PASSWORD: "Qwerty321!",
    },
    setupNodeEvents(on, config) {
      require("cypress-mochawesome-reporter/plugin")(on);
      return config;
    },
  },
  reporter: "cypress-mochawesome-reporter",
  reporterOptions: {
    reportFilename: "qauto-report",
    overwrite: true,
    html: true,
    json: true,
  },
});
