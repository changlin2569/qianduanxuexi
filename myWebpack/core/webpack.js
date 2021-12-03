const Compiler = require('./compiler.js')

function webpack(options) {
    const mergeOptions = _mergeOptions(options)

    const compiler = new Compiler(mergeOptions)

    _loadPlugins(options.plugins, compiler)

    return compiler
}

function _mergeOptions(options) {
    const shellOptions = process.argv.slice(2).reduce((prev, item) => {
        const [key, value] = item.split('=')
        return {
            ...prev,
            [key.slice(2)]: value,
        }
    }, {})

    return { ...options, ...shellOptions }
}

function _loadPlugins(plugins, compiler) {
    if (Array.isArray(plugins)) {
        plugins.forEach(plugin => {
            plugin.apply(compiler)
        })
    }
}

module.exports = webpack