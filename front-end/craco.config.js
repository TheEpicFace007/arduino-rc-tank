const ClosurePlugin = require("closure-webpack-plugin");

module.exports = {
  webpack: {
    optimization: {
      minimizer: [
        // https://webpack.js.org/plugins/closure-webpack-plugin/
        new ClosurePlugin(
          { mode: "AGGRESSIVE_BUNDLE", platform: "java", childCompilations: true },
          {
            create_source_map: true,
          })
      ]
    },
    output: {
      splitChunks: false
    }
  }
};