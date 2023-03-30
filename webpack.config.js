const path = require("path");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HTMLWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  // mode: "development",
  entry: ["@babel/polyfill", "./src/index.jsx"],
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: '[name].[contenthash].js',
  },

  devServer: {
    port: 3000,
    devMiddleware: {
      writeToDisk: true
    }
  },

  resolve: {
    extensions: ['.js', '.jsx'],
  },

  plugins: [
    new HTMLWebpackPlugin({template: "./src/index.html"}),
    new CleanWebpackPlugin(),
    new CopyPlugin({
      patterns: [
        {from: "./src/images",
        to: "./images",}
      ],
    }),
  ],

  performance: {
    hints: false
  },

  module: {
    rules: [
      {
        test: /\.(jpg|jpeg|png|svg)$/,
        use: ["file-loader"]
      },
      {  
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: { 
          loader: "babel-loader",
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {  
        test: /\.m?jsx$/,
        exclude: /node_modules/,
        use: { 
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"]
          }
        }
      }
    ]
  }
}