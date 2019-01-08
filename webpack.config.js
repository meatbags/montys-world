var path = require('path');
var webpack = require('webpack');
var MiniCssExtractPlugin = require("mini-css-extract-plugin");
var appName = 'monty';
var pathJS = './js/app.js';
var pathSCSS = './style/main.js';
var pathOutput = 'build';
var MinifyPlugin = require("babel-minify-webpack-plugin");

module.exports = [
{
  entry: {'app.min': pathJS},
  output: {
    library: appName,
    libraryTarget: 'var',
    path: path.resolve(__dirname, pathOutput),
    filename: '[name].js'
  },
  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      use: {
        loader: "babel-loader"
      }
    }]
  },
  resolve: {
    extensions: ['*', '.js']
  },
  plugins: [
    new MinifyPlugin({}, {comments: false})
  ],
  stats: {colors: true, warnings: false}
}, {
  entry: {'style.webpack': pathSCSS},
  output: {
    path: path.resolve(__dirname, pathOutput),
    filename: '[name].js'
  },
  module: {
    rules: [{
      test: /\.scss$/,
      use: [
        MiniCssExtractPlugin.loader, {
          loader: 'css-loader',
          options: {importLoaders: 2, sourceMap: true}
        }, {
          loader: 'sass-loader',
          options: {sourceMap: true}
        }
      ]
    }]
  },
  plugins: [new MiniCssExtractPlugin({filename: "./style.css", allChunks: true})]
}];
