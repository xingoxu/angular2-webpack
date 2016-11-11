var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var helpers = require('./helpers');
var path = require('path');
var projectRoot = path.resolve(__dirname, '../');

var entries = helpers.getEntries('./src/pages/**/*.ts');
var entry = {
  'polyfills': './src/polyfills.ts',
  'vendor': './src/vendor.ts',
  // 'app': './src/main.ts'
};
(function () {
  'use strict';
  for(let key in entry){
    entries[key] = entry[key];
  }
})()

var baseConfig = {
  entry: entries,

  resolve: {
    extensions: ['', '.ts', '.js']
  },

  module: {
    loaders: [{
        test: /\.js$/,
        loader: 'babel',
        include: projectRoot,
        exclude: /node_modules/
      },
      {
        test: /\.ts$/,
        loaders: ['awesome-typescript-loader', 'angular2-template-loader']
      },
      {
        test: /\.html$/,
        loader: 'html'
      },
      {
        test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
        loader: 'file?name=assets/[name].[hash].[ext]'
      },
      {
        test: /\.css$/,
        exclude: helpers.root('src'),
        loader: ExtractTextPlugin.extract('style', 'css?sourceMap')
      },
      {
        test: /\.css$/,
        include: helpers.root('src'),
        loader: 'raw'
      }
    ]
  },

  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: ['vendor', 'polyfills']
    }),

    // new HtmlWebpackPlugin({
    //   template: 'src/index.html'
    // })
  ]
};

var pages = helpers.getEntries('./src/pages/**/*.html');
for (var page in pages) {
  // 配置生成的html文件，定义路径等
  var conf = {
      filename: page + '.html',
      template: pages[page], //模板路径
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
          // more options:
          // https://github.com/kangax/html-minifier#options-quick-reference
      },
      // excludeChunks 允许跳过某些chunks, 而chunks告诉插件要引用entry里面的哪几个入口
      // 如何更好的理解这块呢？举个例子：比如本demo中包含两个模块（index和about），最好的当然是各个模块引入自己所需的js，
      // 而不是每个页面都引入所有的js，你可以把下面这个excludeChunks去掉，然后npm run build，然后看编译出来的index.html和about.html就知道了
      // filter：将数据过滤，然后返回符合要求的数据，Object.keys是获取JSON对象中的每个key
      excludeChunks: Object.keys(pages).filter((item) => {
        return (item != page);
      }),
      chunksSortMode: 'dependency'
    };
    // 需要生成几个html文件，就配置几个HtmlWebpackPlugin对象
  baseConfig.plugins.push(new HtmlWebpackPlugin(conf));
}

module.exports = baseConfig;
