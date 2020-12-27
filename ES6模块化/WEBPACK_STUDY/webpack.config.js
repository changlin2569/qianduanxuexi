const path = require('path');

module.exports = {
    // 编译模式
    mode: 'development',  // development production

    entry: path.join(__dirname, './src/index.js'),
    output: {
        path: path.join(__dirname, './dist'),
        filename: 'bundle.js',
    }
}