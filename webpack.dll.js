var path = require("path");
let webpack = require("webpack");

//将jquery单独打包，将来直接引用dll中的jquery，已经打包了的
module.exports = {
    entry: {
      jquery: ['jquery']
    },
    output: {
      filename: '[name].js',
      path: path.resolve(__dirname, 'dll'),
      library: '[name]_[hash]',//打包的库向外暴露的名字
    },
    plugins: [
      //创建打包生成一个manifest.json文件--》提供和jquery映射
      new webpack.DllPlugin({
        name: '[name]_[hash]',//映射库的暴露的内容
        path: path.resolve(__dirname, 'dll/manifest.json')//输出文件路径
      })
    ],
    mode: 'production'
  }