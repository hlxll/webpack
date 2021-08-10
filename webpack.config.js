const HtmlWebpackPlugin = require("html-webpack-plugin");
var path = require("path");
let webpack = require("webpack");
//npx是npm5.2之后提供的，会检测node_modules有没有webpack
//如果没有会尝试下载
// webpack打包之后是一个自执行函数
module.exports = {
  mode: "development", //生产环境production和开发环境development设置
  entry: "./src/index.js",
  output: {
    //输出文件名
    filename: "[name].js",
    //path输出路径
    path: path.join(__dirname, "./dist"),
  },
  // loader配置:下载，使用
  module: {
    rules: [
      // 详细loader配置
      // {
      //   // test: /{js|jsx}$/,
      //   test: /\.js$/,
      //   use: [
      //     {
      //       loader: "babel-loader",
      //       options: {
      //         presets: ["@babel/preset-env", "@babel/preset-react"],
      //       },
      //     },
      //   ],
      // },

      //图片加载失败，打包后引入的是无法打开的图片    ？   ？   ？   ？   ？
      {
        test: /\.(jpg|png|gif)$/,
        // 下载url-loader file-loader
        loader: "url-loader",
        options: {
          // 图片大小小于8kb，就会被base64处理
          // 优点：减少请求数量
          // 缺点：图片体积会更大
          limit: 8 * 1024,
          esModule: false,
        },
      },
      //因为url-loader默认是使用es6模块化解析，而html-loader引入图片是commonjs
      //解析问题会出现[object, module]
      //关闭es6模块化解析，试用commonjs
      {
        test: /\.html$/,
        //处理html文件内部得img图片
        loader: "html-loader",
      },
      { test: /\.css$/, use: ["style-loader", "css-loader"] },
      //打包其他资源，除了html，js，css以外的
      //加载未显示出来   ？   ？   ？   ？   ？   ？
      {
        exclude: /\.(css|js|html)$/,
        loader: "file-loader",
        options: {
          name: "[hash:10].[ext]",
        },
      },
    ], //规则
  },

  //插件，可以用于执行范围更广的任务，打包优化，资源管理，注入环境变量（下载，引入，使用）
  plugins: [
    //功能：默认会创建一个空的HTML，自动引入打包输出的所有资源
    new HtmlWebpackPlugin({
      template: path.resolve("./src/index.html"),
      filename: "index.html",
    }),
    // new webpack.DllReferencePlugin({
    //   //引用动态链接库
    //   manifest: path.resolve(__dirname, "dist", "mainfest.json"),
    // }),
  ],
  //开发服务器 devServer：用来自动打开浏览器，自动刷新浏览器，自动编译
  //特点，只会在内存中编译打包，不会有任何输出
  //启动指令：webpack-dev-server，安装失败，先安装这个包再使用npx webpack-dev-server启动
  devServer: {
    contentBase: path.resolve(__dirname, "dist"),
    compress: true,
    port: 3000,
  },
};
