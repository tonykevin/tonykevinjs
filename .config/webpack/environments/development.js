const ErrorOverlayPlugin = require('error-overlay-webpack-plugin')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const { HotModuleReplacementPlugin } = require('webpack')

const { app, examples, favicon, homepage } = require('../../paths')

module.exports = {
  mode: 'development',
  context: examples,
  entry: './',
  resolve: {
    alias: {
      '@app': app
    }
  },
  module: {
    rules: [{
      test: /\.js$/,
      use: 'babel-loader',
      exclude: /node_modules/
    }]
  },
  devServer: {
    contentBase: false,
    host: process.env.HOST || '0.0.0.0',
    port: process.env.PORT || 3000,
    quiet: true
  },
  plugins: [
    new ErrorOverlayPlugin(),
    new FriendlyErrorsWebpackPlugin(),
    new HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      favicon,
      template: homepage
    })
  ]
}
