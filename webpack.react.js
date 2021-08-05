let path = require('path')
let webpack = require('webpack')
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
        })
    ]
}