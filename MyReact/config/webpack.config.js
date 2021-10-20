const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
    // 模式
    mode: 'development',
    // 入口文件
    entry: path.resolve(__dirname, '../src/index.js'),
    // 输出配置
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, '../dist')
    },
    // 插件
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './../src/index.html'),
        }),
        new CleanWebpackPlugin()
    ],
    devServer: {
        static: { // static: ['assets']
            directory: path.resolve(__dirname, './../dist')
        },
        port: 8080,
        // publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.js?$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader'
                    }
                ]
            }
        ]
    }
}