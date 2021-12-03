class PluginB {
    apply(compiler) {
        // 注册同步钩子，传入回调函数
        compiler.hooks.done.tap('PluginB', () => {
            console.log('PluginB')
        })
    }
}

module.exports = PluginB