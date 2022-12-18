const ClosurePlugin = require("closure-webpack-plugin");

module.exports = {
  webpack: {
    optimization: {
      minimizer: [
      ]
    },
    output: {
      splitChunks: false
    }
  }
};