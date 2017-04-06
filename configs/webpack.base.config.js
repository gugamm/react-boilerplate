const webpack           = require('webpack');
const path              = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractPlugin     = require('extract-text-webpack-plugin');

const htmlConfig        = require('./user/html');
const vendors           = require('./user/vendors');

const config = {
  entry : {
    bundle : './src/index.jsx',
    vendor : vendors
  },
  output : {
    path : path.join(__dirname, '..', 'dist'),
    filename : '[name].[chunkhash].js'
  },
  module : {
    rules : [
      {
        test : /\.jsx?$/,
        exclude : [/node_modules/, /\.spec\.js$/],
        use : [
          'babel-loader',
          {
            loader : 'eslint-loader',
            options : {
              configFile : './configs/src-lint.js'
            }
          }
        ]
      },
      {
        test : /\.css$/,
        use  : ExtractPlugin.extract({
          use : 'css-loader',
          fallback : 'style-loader'
        })
      }
    ]
  },
  resolve : {
    extensions : ['.js', '.jsx']
  },
  plugins : [
    new HtmlWebpackPlugin({
      title : htmlConfig.title,
      filename : htmlConfig.filename,
      template : './src/template.ejs'
    }),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'manifest']
    }),
    new ExtractPlugin("[name].[contenthash].css")
  ]
};

module.exports = config;
