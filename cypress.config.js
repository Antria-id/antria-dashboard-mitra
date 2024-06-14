const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: 'uwqbrs',
  component: {
    devServer: {
      framework: "create-react-app",
      bundler: "webpack",
    },
  },
});
