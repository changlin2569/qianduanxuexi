const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const htmlPlugin = new HtmlWebpackPlugin({
    template: './src/index.html',
    filename: 'index.html',
});
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
    // 编译模式
    mode: 'development', // development production

    entry: path.join(__dirname, './src/index.js'),
    output: {
        path: path.join(__dirname, './dist'),
        filename: 'bundle.js',
    },
    plugins: [htmlPlugin, new VueLoaderPlugin()],
    module: {
        rules: [{
                test: /\.css$/,
                use: ['style-loader', 'css-loader', 'postcss-loader']
            },
            {
                test: /\.less$/,
                use: ['style-loader', 'css-loader', 'less-loader']
            },
            {
                test: /\.jpg|png|gif|bmp|ttf|eot|svg|woff|woff2$/,
                use: 'url-loader?limit=16440'
            },
            {
                test: /\.js$/,
                use: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
        ]
    }
}