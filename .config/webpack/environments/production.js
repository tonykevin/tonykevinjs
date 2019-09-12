const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const {
  app,
  examples,
  favicon,
  homepage,
  images,
  postcssConfig,
  styles
} = require('../../paths')

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
        MiniCssExtractPlugin.loader,
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
      test: /\.(png|jpg|gif|svg)$/,
      use: [
        {
          loader: 'file-loader',
          options: {
            name: '[name].[hash:16].[ext]',
            outputPath: 'img/'
          }
        }
      ]
    }]
  },
  optimization: {
    minimizer: [
      new OptimizeCSSAssetsPlugin(),
      new UglifyJsPlugin({
        cache: true,
        parallel: true
      })
    ],
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'initial'
        }
      }
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      favicon,
      template: homepage
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash].css'
    })
  ]
}
