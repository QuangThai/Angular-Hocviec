const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");

module.exports = {
  entry: "./src/main.ts",
  resolve: {
    extensions: [".ts", ".js"]
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: ["ts-loader", "angular2-template-loader"]
      },
      {
        test: /\.(html|css)$/,
        use: "raw-loader"
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({ template: "./src/index.html" }),
    new webpack.DefinePlugin({
      config: JSON.stringify({
        apiUrl: "http://localhost:1165"
      })
    })
  ],
  devServer: {
    historyApiFallback: true
  }
};
