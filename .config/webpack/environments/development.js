const ErrorOverlayPlugin = require('error-overlay-webpack-plugin')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { HotModuleReplacementPlugin } = require('webpack')

const {
  app,
  examples,
  favicon,
  homepage,
  images,
  postcssConfig,
  styles
} = require('../../paths')

module.exports = {
  mode: 'development',
  context: examples,
  entry: './',
  resolve: {
    alias: {
      '@app': app,
      '@images': images,
      '@styles': styles
    }
  },
  module: {
    rules: [{
      test: /\.js$/,
      use: 'babel-loader',
      exclude: /node_modules/
    }, {
      test: /\.css$/,
      use: [
        'style-loader',
        {
          loader: 'css-loader',
          options: {
            importLoaders: 1
          }
        },
        {
          loader: 'postcss-loader',
          options: {
            config: {
              path: postcssConfig
            }
          }
        }
      ]
    }, {
      test: /\.pug$/,
      use: 'pug-loader'
    }, {
      test: /\.(png|jpg|gif|svg)$/,
      use: 'file-loader'
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
      publicPath: '/',
      template: homepage
    })
  ]
}
