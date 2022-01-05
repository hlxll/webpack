const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const OptimizeCssAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin")
const workboxWebpackPlugin = require("workbox-webpack-plugin")
const AddAssetHtmlWebpackPlugin = require("add-asset-html-webpack-plugin")
var path = require("path");
let webpack = require("webpack");
const {
  resolve
} = require("path");
//dll将一些包不打进去最终的包，但是和externals不同，会单独打包到另外一个包里面
//外部包比如jquery不想打包进最终的包内，想使用CDN等

//多进程打包(下载therad-loader)

//eslint不认识window，navigator等，需要加  "env": { "browser": true}支持浏览器端变量

// serve -s dist可以将dist文件启动服务器

//PWA让程序可以离线访问，使用cache
//workbox-webpack-plugin

//npx是npm5.2之后提供的，会检测node_modules有没有webpack
//如果没有会尝试下载
/**
 * 缓存从两个方向入手
 * babel缓存：代码中js代码最多，使用babel对js缓存
 * 文件资源缓存：？？？？
 *  hash：每次构建会生成一个唯一的hash值
 * 问题：因为js和css同事使用一个hash值，如果重新打包会导致所有缓存失效
 * chunkhash：根据chunk生成hash，如果打包来源同一个chunk，那么hash就一样
 * 
 * contenthash： 根据文件的内容生成hash值，不同文件hash值一定不一样
 */
/**
 * tree shaking优化
 * 优化引入但是没有使用的库
 * 使用es6模块化，使用production环境
 * 
 */
/**
 * HMR：hot module replacement 热模块替换 / 模块热替换
 * 作用：一个模块发生变化，只会重新打包这一个模块（而不是打包所有模块）极大提升构建速度
 * 
 * 样式文件，可以使用HMR功能，因为style-loader实现了
 * js文件：默认不适用HMR功能
 * html文件：默认不能使用HMR功能，同时会导致问题：html文件不能热更新
 * 解决：修改entry入口，将html文件引入
 */
/**
 * 代码分割
 * 1：设置多个入口，就会有多个文件输出，代码就分开了
 * 输出的文件名加[name]就会入口什么文件名输出就什么文件名，多个输出就能区分
 * 2：
 */

//设置nodejs环境变量,因为插件使用package里面数据
process.env.NODE_ENV = 'development';

// webpack打包之后是一个自执行函数
module.exports = {
  //生产环境下，js会自动压缩
  mode: "development", //生产环境production和开发环境development设置
  entry: {
    indexJs: "./src/index.js",
    indexHtml: "./src/index.html",
  },
  output: {
    //输出文件名
    //使用hash输出，第一次强缓存，如果包有错误,还取用缓存就没用了，但是使用hash值，第二次打的包名字不一样
    //就会使用新打包的缓存
    filename: "[name].[hash:10].js",
    //path输出路径
    path: path.join(__dirname, "./dist"),
  },
  // loader配置:下载，使用
  module: {
    rules: [
      /***
       * 语法检查，为了代码书写规范一样，使用eslint-loader eslint
       * 注意：只检查用户自己写的源代码
       * */
      {
        test: /\.js$/,
        exclude: /node_modules/, //忽略检查该文件
        loader: 'eslint-loader',
        //检查规则,在package添加eslintConfig配置，安装eslint-config-airbnb-base eslint-plugin-import
        options: {
          //自动修复eslint得错误
          fix: true
        }
      },
      {
        //以下loader只会执行一个，如果不加oneOf，会执行全部loader
        //注意：不能有两个loader执行同一种文件
        oneOf: [
          // 详细loader配置
          {
            // test: /{js|jsx}$/,
            //兼容性处理js
            test: /\.js$/,
            exclude: /node_modules/,
            use: [
              //开启多进程打包
              //进程开启是有时间得，进程通信也有开销
              {
                loader: 'thread-loader',
                options: {
                  Workers: 2 //进程2个
                }
              },
              {
                loader: "babel-loader",
                options: {
                  //预设：指示babel做怎么样的兼容性处理
                  presets: ["@babel/preset-env", "@babel/preset-react",
                    //指定babel兼容的浏览器，如果版本太老，有些语法根本没有兼容的，就会使用corejs内相同功能的方法
                    {
                      target: 'chrome',
                      "corejs": '3'
                    }
                  ],

                  //开启babel缓存，第二次构建时，会读取之前得缓存
                  cacheDirectory: true
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
            test: /\.css$/,
            use: [
              MiniCssExtractPlugin.loader,
              "css-loader",
              // css兼容性处理，postcss-loader  postcss-preset-env
              //帮postcss找到package.json中browerslist里面得配置，通过配置加载指定的css兼容性样式
              //使用loader默认配置
              {
                loader: 'postcss-loader',
                options: {
                  postcssOptions: {
                    plugins: [
                      [require('postcss-preset-env')()],
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
        ]
      }

    ], //规则
  },
  //插件，可以用于执行范围更广的任务，打包优化，资源管理，注入环境变量（下载，引入，使用）
  plugins: [
    //webpack之前清空打包文件
    new CleanWebpackPlugin(),
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
      filename: 'css/built.[contenthash:10].css'
    }),

    //压缩css文件,直接调用插件就行
    new OptimizeCssAssetsWebpackPlugin(),
    new workboxWebpackPlugin.GenerateSW({
      /**
       * 帮助serviceworker快速启动
       * 删除旧的serviceworker
       * 生成一个serviceworker配置文件
       */
      clientsClaim: true,
      skipWaiting: true
    }),
    //告诉webpack哪些包不参与打包，同时使用时候的名称也会改变
    new webpack.DllReferencePlugin({
      manifest: resolve(__dirname, 'dll/manifest.json')
    }),
    //将某个文件打包输出去，并在html中自动引入该资源
    new AddAssetHtmlWebpackPlugin({
      filepath: path.resolve(__dirname, 'dll/jquery.js')
    })
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
  optimization: {
    //单入口可以将node_modules中代码单独打包一个chunk最终输出
    //分析多chunk文件，有相同文件会合并
    splitChunks: {
      chunks: 'all'
    }
  },
  devtool: 'source-map',
  // externals: {???
  //   //忽略jquery包
  //   jquery: 'jQuery'
  // }
};

/**
 * source-map: 一种提供源代码到构建后代码映射技术（如果你构建代码出错，通过映射可以追踪源代码错误）
 *  加devtool: 'source-map'文件就可以,会生成后缀map的文件
 * [inline-|hidden-|eval-][nosources-][cheap-[module-]]source-map
 * inline-source-map： 内联，在js文件中添加map部分的文件，将原来.map文件加入
 */