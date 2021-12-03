/**
 *
 * 统一路径分隔符 主要是为了后续生成模块ID方便
 * @param {*} path
 * @returns
 */

function toUnixPath(path) {
    return path.replace(/\\/g, '/')
}

module.exports = {
    toUnixPath
}