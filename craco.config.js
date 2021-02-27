const ClosurePlugin = require("closure-webpack-plugin");

module.exports = {
  optimization: {
    minimizer: [
      new ClosurePlugin({
        platform: "JAVA",
        mode: "AGGRESSIVE_BUNDLE"
      })
    ]
  }
}