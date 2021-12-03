class PluginA {
    apply(compiler) {
        // 注册同步钩子，传入回调函数
        compiler.hooks.run.tap('PluginA', () => {
            console.log('PluginA')
        })
    }
}

module.exports = PluginA