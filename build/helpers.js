var path = require('path');
var _root = path.resolve(__dirname, '..');
function root(args) {
  args = Array.prototype.slice.call(arguments, 0);
  return path.join.apply(path, [_root].concat(args));
}
exports.root = root;

var config = require('../config');
exports.assetsPath = function (_path) {
  var assetsSubDirectory = process.env.NODE_ENV === 'production'
    ? config.build.assetsSubDirectory
    : config.dev.assetsSubDirectory
  return path.posix.join(assetsSubDirectory, _path);
};

var glob = require('glob');
exports.getEntries = function(globPath) {
  var entries = {};
    /**
     * 读取src目录,并进行路径裁剪
     */
  glob.sync(globPath).forEach(function(entry) {
    /**
     * path.basename 提取出用 ‘/' 隔开的path的最后一部分，除第一个参数外其余是需要过滤的字符串
     * path.extname 获取文件后缀
     */
    var basename = path.basename(entry, path.extname(entry), 'router.js'); // 过滤router.js
      // ***************begin***************
      // 当然， 你也可以加上模块名称, 即输出如下： { module/main: './src/module/index/main.js', module/test: './src/module/test/test.js' }
      // 最终编译输出的文件也在module目录下， 访问路径需要时 localhost:3000/module/index.html
      // slice 从已有的数组中返回选定的元素, -3 倒序选择，即选择最后三个
      // var tmp = entry.split('/').splice(-3)
      // var pathname = tmp.splice(0, 1) + '/' + basename; // splice(0, 1)取tmp数组中第一个元素
      // console.log(pathname)
      // entries[pathname] = entry
      // ***************end***************
    entries[basename] = entry;
  });
  // console.log(entries);
  // 获取的主入口如下： { main: './src/module/index/main.js', test: './src/module/test/test.js' }
  return entries;
};
