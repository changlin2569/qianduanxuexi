// 引入webpack
const webpack = require('./webpack.js')
// 引入配置文件
const config = require('../example/webpack.config.js')

const compiler = webpack(config)

compiler.run((err, status) => {
    if (err) {
        console.log(err)
    }
})

