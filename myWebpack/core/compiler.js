const path = require('path')
const { SyncHook } = require('tapable')
const { toUnixPath } = require('./utils')
const fs = require('fs')

class Compiler {
    constructor(options) {
        this.options = options

        // 相对路径和路径 context参数
        this.rootPath = this.options.context || toUnixPath(process.cwd())

        // plugin hooks
        this.hooks = {
            // 开始编译时的hooks
            run: new SyncHook(),
            // 输出文件之前调用
            emit: new SyncHook(),
            // 全部编译完成时执行
            done: new SyncHook()
        }

        // 保存所有入口模块对象
        this.entries = new Set()
        // 保存所有依赖模块对象
        this.modules = new Set()
        // 保存所有代码块对象
        this.chunks = new Set()
        // 保存本次产出的文件对象
        this.assets = new Set()
        // 保存本次编译所有产出的文件名
        this.files = new Set()
    }

    // 启动编译，接收传入的 callback
    run(callback) {
        // 执行编译时 hooks
        this.hooks.run.call()
        // 获取入口配置对象
        const entry = this.getEntry()

        // 编译入口文件
        this.buildEntryMoudle(entry)
    }

    buildEntryMoudle(entry) {
        Object.keys(entry).forEach(entryName => {
            const entryPath = entry[entryName]
            const entryObj = this.buildMoudle(entryName, entryPath)
            this.entries.add(entryObj)
        })
    }

    buildMoudle(entryName, entryPath) {
        // 读取文件源代码
        const originSourceCode = (this.originSourceCode = fs.readFileSync(entryPath, 'utf8'))
        // moduleCode 为修改后的代码
        this.moduleCode = originSourceCode

        this.handleLoader(entryPath)
        return {}
    }

    // 匹配 loader 进行处理
    handleLoader(entryPath) {
        const matchLoaders = []

        // 获取所有传入的 loader 规则
        const rules = this.options.module.rules
        rules.forEach(loader => {
            const testRule = loader.test
            if (testRule.test(entryPath)) {
                if (loader.loader) {
                    matchLoaders.push(loader.loader)
                } else {
                    matchLoaders.push(...loader.use)
                }
            }
        })

        // 倒序执行 loader 传入源码
        // for (let i = matchLoaders.length - 1; i >= 0; i--) {
        //     // requuier 引入对应的 loader
        //     const loaderFn = require(matchLoaders[i])

        //     // 通过 loader 同步处理我们每一次转译的 moduleCode
        //     this.moduleCode = loaderFn(this.moduleCode)
        // }

        matchLoaders.reduceRight((prev, loaderPath) => {
            const loaderFn = require(loaderPath)

            return loaderFn(prev)
        }, this.moduleCode)
    }

    // 获取入口文件路径
    getEntry() {
        let entry = Object.create(null)
        const { entry: optionsEntry } = this.options

        if (typeof optionsEntry === 'string') {
            entry.main = optionsEntry
        } else {
            entry = optionsEntry
        }

        // 将 entry变为绝对路径
        Object.keys(entry).forEach(key => {
            const val = entry[key]
            if (!path.isAbsolute(val)) {
                // 转化为绝对路径
                entry[key] = toUnixPath(this.rootPath, val)
            }
        })
        return entry
    }
}

module.exports = Compiler