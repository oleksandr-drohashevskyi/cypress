const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://qauto2.forstudy.space/",
    env: {
      USER_EMAIL: "alex.qauto2+test@gmail.com",
      USER_PASSWORD: "Qwerty321!",
    },
    setupNodeEvents(on, config) {
      require("cypress-mochawesome-reporter/plugin")(on);
      return config;
    },
  },
  reporter: "cypress-mochawesome-reporter",
  reporterOptions: {
    reportFilename: "qauto2-report",
    overwrite: true,
    html: true,
    json: true,
  },
});
