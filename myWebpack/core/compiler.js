const path = require('path')
const { SyncHook } = require('tapable')
const { toUnixPath } = require('./utils')
const fs = require('fs')
const parser = require('@babel/parser')
const { default: traverse } = require('@babel/traverse')
const { default: generator } = require('@babel/generator')
const t = require('@babel/types')
const tryExtensions = require('./utils/tryExtensions.js')
const getSourceCode = require('./utils/getSourceCode.js')

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
        this.assets = new Map()
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
        // 导出文件，将每个 chunk 转化为单独的文件加入到输出列表 assets 中
        this.exportFile(callback)
    }

    buildEntryMoudle(entry) {
        Object.keys(entry).forEach(entryName => {
            const entryPath = entry[entryName]
            const entryObj = this.buildMoudle(entryName, entryPath)
            this.entries.add(entryObj)
            // 根据当前入口文件和模块的相互依赖关系, 组装成为一个个包含当前入口所有依赖模块的 chunk
            this.buildUpChunk(entryName, entryObj)
        })
        // console.log(this.chunks, 'chunks')
    }

    buildMoudle(moduleName, modulePath) {
        // 读取文件源代码
        const originSourceCode = (this.originSourceCode = fs.readFileSync(modulePath, 'utf8'))
        // moduleCode 为修改后的代码
        this.moduleCode = originSourceCode
        // 调用 loader 进行处理
        this.handleLoader(modulePath)
        // 调用 webpack 进行模块编译 获得最终的 module 对象
        const module = this.handleWebpackCompiler(moduleName, modulePath)
        // 返回module
        return module
    }

    // 匹配 loader 进行处理
    handleLoader(modulePath) {
        const matchLoaders = []

        // 获取所有传入的 loader 规则
        const rules = this.options.module.rules
        rules.forEach(loader => {
            const testRule = loader.test
            if (testRule.test(modulePath)) {
                if (loader.loader) {
                    matchLoaders.push(loader.loader)
                } else {
                    matchLoaders.push(...loader.use)
                }
            }
        })

        // 倒序执行 loader 传入源码
        for (let i = matchLoaders.length - 1; i >= 0; i--) {
            // requuier 引入对应的 loader
            const loaderFn = require(matchLoaders[i])

            // 通过 loader 同步处理我们每一次转译的 moduleCode
            this.moduleCode = loaderFn(this.moduleCode)
        }

        // matchLoaders.reduceRight((prev, loaderPath) => {
        //     const loaderFn = require(loaderPath)

        //     return loaderFn(prev)
        // }, this.moduleCode)
    }

    // 调用 webpack 进行模块编译
    handleWebpackCompiler(moduleName, modulePath) {
        // 将当前模块相对于项目启动的根目录计算出相对路径作为模块 ID
        const moduleID = `./${toUnixPath(path.relative(this.rootPath, modulePath))}`
        // 创建模块对象、
        const module = {
            id: moduleID,
            // 该模块所依赖模块的绝对路径地址
            dependencies: new Set(),
            // 该模块所属入口文件
            name: [moduleName]
        }
        const ast = parser.parse(this.moduleCode, {
            sourceType: 'module'
        })
        // DFS 遍历抽象语法树
        traverse(ast, {
            // 当遇到 require 语句时
            CallExpression: ({ node }) => {
                if (node.callee.name === 'require') {
                    // 获得源代码中引入模块相对路径
                    const requirePath = node.arguments[0].value
                    // 寻找模块绝对路径: 当前模块路径 + require 对应的相对路径
                    const moduleDirName = path.dirname(modulePath)
                    // console.log(requirePath, moduleDirName);
                    const absolutePath = tryExtensions(
                        path.posix.join(moduleDirName, requirePath),
                        this.options.resolve.extensions,
                        requirePath,
                        moduleDirName
                    )
                    // 生成moduleID 针对于相对路径模块ID 添加进入新的依赖模块路径
                    const moduleID = `./${toUnixPath(path.relative(this.rootPath, absolutePath))}`
                    // 通过 Babel 修改源代码中的 require 变为 __webpack_require__ 的语句
                    node.callee = t.identifier('__webpack_require__')
                    // 修改源代码中 require 语句引入的模块 全部修改为相对于相对于根路径来处理
                    node.arguments = [t.stringLiteral(moduleID)]
                    // 转化为 ids 数组, 容易处理
                    const alreadyModules = Array.from(this.modules).map(item => item.id)
                    if (!alreadyModules.includes(moduleID)) {
                        // 为当前模块添加 require 语句造成的依赖(内容为相对于根路径的模块 ID)
                        module.dependencies.add(moduleID)
                    } else {
                        // 模块如果已经存在, 就不再进行编译, 只是更新模块依赖的入口
                        Array.from(this.modules)
                            .filter(({ id }) => id === moduleID)
                            .forEach(({ name }) => name.push(moduleName))
                    }
                }
            }
        })
        // 结束后根据 AST 生成新的代码
        const { code } = generator(ast)
        // 为当前模块挂在新的生成代码
        module._source = code
        // 递归处理依赖的依赖 DFS
        module.dependencies.forEach(dependency => {
            const depMoudle = this.buildMoudle(moduleName, dependency)
            // 将编译后的依赖模块对象加入到 modules 对象中去
            this.modules.add(depMoudle)
        })
        return module
    }

    // 根据入口文件和依赖模块组装 chunks
    buildUpChunk(entryName, entryObj) {
        const chunk = {
            // 每个入口文件作为一个 chunk
            name: entryName,
            // entry 编译后的对象
            entryModule: entryObj,
            // 寻找与当前 entry 有关的 module
            modules: Array.from(this.modules).filter(({ name }) => name.includes(entryName)),
        }
        // 添加 chunk 到 this.chunks 中去
        this.chunks.add(chunk)
    }

    // 将 chunk 输出到文件列表中
    exportFile(callback) {
        const output = this.options.output
        // 根据 chunk 生成 assets 内容
        this.chunks.forEach(chunk => {
            // 替换文件名
            const parseFileName = output.filename.replace('[name]', chunk.name)
            // assets 中 { 'main.js': '生成的代码字符串' }
            this.assets.set(parseFileName, 11111)
        })
        // 调用输出文件时的 hooks (plugin)
        this.hooks.emit.call()
        // 判断目录是否存在，存在直接写入文件，不存在先创建文件夹
        if (!fs.existsSync(output.path)) {
            fs.mkdirSync(output.path)
        }
        // 获取 files 中保存的文件名
        this.files = Array.from(this.assets.keys())
        // 将 assets 中的内容生成打包文件， 写入文件系统
        Array.from(this.assets.keys()).forEach(fileName => {
            console.log(fileName);
            const filePath = path.join(output.path, fileName)
            console.log(filePath);
            fs.writeFileSync(filePath, this.assets.get(fileName))
        })
        // 结束之后出发钩子函数
        this.hooks.done.call()
        callback(null, {
            toJson: () => {
                return {
                    entries: this.entries,
                    modules: this.modules,
                    files: this.files,
                    chunks: this.chunks,
                    assets: this.assets
                }
            }
        })
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