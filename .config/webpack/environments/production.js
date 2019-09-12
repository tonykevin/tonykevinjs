const HtmlWebpackPlugin = require('html-webpack-plugin')

const { app, examples, favicon, homepage } = require('../../paths')

const publicPath = '/'

module.exports = {
  mode: 'production',
  entry: examples,
  output: {
    filename: 'js/[name].[chunkhash].js',
    publicPath
  },
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
  plugins: [
    new HtmlWebpackPlugin({
      favicon,
      template: homepage
    })
  ]
}
