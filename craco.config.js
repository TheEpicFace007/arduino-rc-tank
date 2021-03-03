const ClosurePlugin = require("closure-webpack-plugin");

module.exports = {
  optimization: {
    minimizer: [
      new ClosurePlugin({
        platform: ["java"],
        mode: "AGGRESSIVE_BUNDLE"
      })
    ]
  }
}