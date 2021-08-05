const HtmlWebpackPlugin = require('html-webpack-plugin')
var path = require('path')
let webpack = require('webpack')
//npx是npm5.2之后提供的，会检测node_modules有没有webpack
//如果没有会尝试下载
// webpack打包之后是一个自执行函数
module.exports = {
    mode: 'development', //生产环境production和开发环境development设置
    entry: './src/index.js',
    output: {
        //输出文件名
        filename: '[name].js',
        //path输出路径
        path: path.join(__dirname, './dist')
    },
    // loader配置
    module: {
        rules: [
            // 详细loader配置
            {
                // test: /{js|jsx}$/,
                test: /\.js$/,
                use: [{
                    loader: 'babel-loader', options: {
                        presets: ['@babel/preset-env', '@babel/preset-react']
                    }
                }]
            },
            {
                test: /\.(jpg|png|gif)$/,
                // 下载url-loader file-loader
                loader: 'url-loader',
                options: {
                    // 图片大小小于8kb，就会被base64处理
                    // 优点：减少请求数量
                    // 缺点：图片体积会更大
                    limit: 8 * 1024,
                    esModule: false
                }
                
            },
            //因为url-loader默认是使用es6模块化解析，而html-loader引入图片是commonjs
            //解析问题会出现[object, module]
            //关闭es6模块化解析，试用commonjs
            {
                test: /\.html$/,
                //处理html文件内部得img图片
                loader: 'html-loader'
            },
            { test: /\.css$/, use: ['style-loader', 'css-loader'] },
            // {
            //     test: /\.css$/,
            //     use: [
            //         //use中数组执行是从右到左
            //         //创建style标签，将js中的样式资源插入进行，添加到head中生效
            //         { loader: 'style-loader',options: {
            //             modules: true
            //         } },
            //         //将css文件变成commonjs模块加载js中，里面内容是样式字符串
            //         {
            //             loader: 'css-loader',
            //             options: {
            //                 modules: true
            //             }
            //         },
            //     ]
            // }
        ]//规则
    },

    //插件，可以用于执行范围更广的任务，打包优化，资源管理，注入环境变量
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './index.html'),
            filename: 'index.html'
        }),
        new webpack.DllReferencePlugin({//引用动态链接库
            manifest: path.resolve(__dirname, 'dist', 'mainfest.json')
        })
    ]
}