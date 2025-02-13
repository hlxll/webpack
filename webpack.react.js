let path = require('path')
let webpack = require('webpack')
let MiniCssExtractPlugin = require('mini-css-extract-plugin')
module.exports = {
    mode: 'development',
    entry: {
        react: ['react', 'react-dom']
    },
    output: {
        filename: '__dll__[name].js',
        path: path.resolve(__dirname, 'dist'),
        library: '__dll__[name]'
    },
    plugins: [
        new webpack.DllPlugin({
            name: '_dll_[name]',
            path: path.resolve(__dirname, 'dist', 'mainfest.json')
        }),
        new MiniCssExtractPlugin(),
    ]
}