/**
 *
 *
 * @param {*} modulePath 模块绝对路径
 * @param {*} extensions 扩展名数组
 * @param {*} originModulePath 原始引入模块路径
 * @param {*} moduleContext 模块上下文(当前模块所在目录)
 */
const fs = require('fs')

function tryExtensions(
    modulePath,
    extensions,
    originModulePath,
    moduleContext
) {
    extensions.unshift('')
    for (const extension of extensions) {
        if (fs.existsSync(modulePath + extension)) {
            return modulePath + extension
        }
    }
    // 为匹配到对应文件
    throw new Error(
        `no module Error: can't resolve ${originModulePath} in ${moduleContext}`
    );
}

module.exports = tryExtensions