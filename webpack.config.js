const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const OptimizeCssAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin")
var path = require("path");
let webpack = require("webpack");
//npx是npm5.2之后提供的，会检测node_modules有没有webpack
//如果没有会尝试下载

/**
 * HMR：hot module replacement 热模块替换 / 模块热替换
 * 作用：一个模块发生变化，只会重新打包这一个模块（而不是打包所有模块）极大提升构建速度
 * 
 * 样式文件，可以使用HMR功能，因为style-loader实现了
 * js文件：默认不适用HMR功能
 * html文件：默认不能使用HMR功能，同时会导致问题：html文件不能热更新
 * 解决：修改entry入口，将html文件引入
*/
//设置nodejs环境变量,因为插件使用package里面数据
process.env.NODE_ENV = 'development';

// webpack打包之后是一个自执行函数
module.exports = {
  //生产环境下，js会自动压缩
  mode: "development", //生产环境production和开发环境development设置
  entry: ["./src/index.js", "./src/index.html"],
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
      /***
       * 语法检查，为了代码书写规范一样，使用eslint-loader eslint
       * 注意：只检查用户自己写的源代码
       * */
      {
        test: /\.js$/,
        exclude: /node_modules/,//忽略检查该文件
        loader: 'eslint-loader',
        //检查规则,在package添加eslintConfig配置，安装eslint-config-airbnb-base eslint-plugin-import
        options: {
          //自动修复eslint得错误
          fix: true,
          //开启babel缓存，第二次构建时，会读取之前得缓存
          cacheDirectory: true
        }
      },
      {
        // test: /{js|jsx}$/,
        //兼容性处理js
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              //预设：指示babel做怎么样的兼容性处理
              presets: ["@babel/preset-env", "@babel/preset-react"],
            },
          },
        ],
      },
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
      //style-loader创建style标签，将样式放入，
      //miniCssExtractPlugin这个loader取代style-loader，提取css中得文件到js中。
      //css-loader将css文件整合到js中
      { 
        test: /\.css$/, use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          // css兼容性处理，postcss-loader  postcss-preset-env
          //帮postcss找到package.json中browerslist里面得配置，通过配置加载指定的css兼容性样式
          //使用loader默认配置
          {
            loader:'postcss-loader',
            options:{
              postcssOptions: {
                plugins: [
                  [ require('postcss-preset-env')() ],
                ]
              }
            }
          }
        ] 
      },
      //打包其他资源，除了html，js，css以外的
      //加载未显示出来   ？   ？   ？   ？   ？   ？
      {
        exclude: /\.(css|js|html|jpg|png|gif)$/,
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
      //压缩html
      minify: {
        //移除空格
        collapseWhitespace: true,
        //移除注释
        removeComments: true
      }
    }),
    // new webpack.DllReferencePlugin({
    //   //引用动态链接库
    //   manifest: path.resolve(__dirname, "dist", "mainfest.json"),
    // }),

    // mini-css-extract-plugin插件提取css成单独文件
    new MiniCssExtractPlugin({
        //给文件重命名
      filename: 'css/built.css'
    }),

    //压缩css文件,直接调用插件就行
    new OptimizeCssAssetsWebpackPlugin()
  ],
  //开发服务器 devServer：用来自动打开浏览器，自动刷新浏览器，自动编译
  //特点，只会在内存中编译打包，不会有任何输出
  //启动指令：webpack-dev-server，安装失败，先安装这个包再使用npx webpack server启动
  devServer: {
    contentBase: path.resolve(__dirname, "dist"),
    compress: true,
    port: 3000,
    open: true,
    //开启HRM功能
    //当修改了webapack，一定要重启
    hot: true
  },
  devtool: 'source-map'
};

/**
 * source-map: 一种提供源代码到构建后代码映射技术（如果你构建代码出错，通过映射可以追踪源代码错误）
 *  加devtool: 'source-map'文件就可以,会生成后缀map的文件
 * [inline-|hidden-|eval-][nosources-][cheap-[module-]]source-map
 * inline-source-map： 内联，在js文件中添加map部分的文件，将原来.map文件加入
*/
