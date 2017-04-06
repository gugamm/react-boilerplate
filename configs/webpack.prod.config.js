const baseConfig = require('./webpack.base.config');
const merge      = require('webpack-merge');
const webpack    = require('webpack');

const prodConfig = {
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
      }
    ]
  },
  plugins : [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new webpack.optimize.UglifyJsPlugin({
      mangle : true,
      comments : false
    })
  ]
};

module.exports = merge(baseConfig, prodConfig);
