const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "jeq6sy",
  pageLoadTimeout: 120000,
  component: {
    devServer: {
      framework: "create-react-app",
      bundler: "webpack",
    },
  },

  e2e: {
    setupNodeEvents(on, config) {},
    baseUrl: "http://localhost:3000",
  },
});
