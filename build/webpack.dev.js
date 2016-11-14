var webpackMerge = require('webpack-merge');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var commonConfig = require('./webpack.common.js');
var helpers = require('./helpers');

module.exports = webpackMerge(commonConfig, {
  devtool: 'cheap-module-eval-source-map',

  output: {
    path: helpers.root('dist'),
    publicPath: 'http://localhost:8080/',
    filename: helpers.assetsPath('js/[name].js'),
    chunkFilename: helpers.assetsPath('js/[id].chunk.js'),
    // filename: '[name].js',
    // chunkFilename: '[id].chunk.js'
  },

  plugins: [
    new ExtractTextPlugin(helpers.assetsPath('css/[name].css')),
    // new ExtractTextPlugin('[name].css')
  ],

  devServer: {
    historyApiFallback: true,
    stats: 'minimal'
  }
});
