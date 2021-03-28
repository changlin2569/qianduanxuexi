// 初始化视图对象
const compileUtil = {
    // 根据属性值获取data中的值
    getDataValue(attrValue, vm) {
        // 拆分例如 person.name 这样的属性值
        const data = vm.$data;
        const attrValueArr = attrValue.split('.');
        return attrValueArr.reduce((prev, item) => {
            prev = prev[item];
            return prev;
        }, data);
    },
    text(node, value, vm) {
        // let current = data;
        // valueArr.forEach(item => {
        //     current = current[item];
        //     console.log(current);
        // })
        let current;
        if (/\{\{(.+?)\}\}/.test(value)) {
            current = value.replace(/\{\{(.+?)\}\}/g, (...args) => {
                return this.getDataValue(args[1], vm);
            });
        } else {
            current = this.getDataValue(value, vm);
            // console.log(current);
            // node.innerHTML = current;
        }
        this.Updater.updateText(node, current);
    },
    html(node, value, vm) {
        const current = this.getDataValue(value, vm);
        // node.innerHTML = current;
        this.Updater.updateHtml(node, current);
    },
    model(node, value, vm) {
        const current = this.getDataValue(value, vm);
        // node.value = current;
        this.Updater.updateModel(node, current)
    },
    on(node, value, vm, eventName) {
        node.addEventListener(eventName, vm.$options.methods[value].bind(vm));
    },
    Updater: {
        updateText(node, current) {
            node.nodeValue = current;
        },
        updateHtml(node, current) {
            node.innerHTML = current;
        },
        updateModel(node, current) {
            node.value = current;
        }
    }
}

class fakeVue {
    constructor(options) {
        this.$el = options.el;
        this.$data = options.data;
        this.$options = options;
        // 判断传入的el是否有值
        if (this.$el) {
            // 劫持监听所有属性 observer
            new Observer(this.$data)
            // 解析执行  compile
            new Compile(this.$el, this);
        }
    }
}

// 指令解析器 
class Compile {
    constructor(el, vm) {
        this.el = this.isElementNode(el) ? el : document.querySelector(el);
        this.vm = vm;
        const fEl = this.creatFragment(this.el);
        // 解析文档碎片
        this.compile(fEl);
        // console.log(this.compile(fEl));
        // 将文档碎片插入到dom树中
        this.el.appendChild(fEl);
    }
    //  判断是否为元素节点
    isElementNode(node) {
        return node.nodeType === 1;
    }
    // 创建文档碎片，获取所有的子节点，避免引起数次回流重绘，优化性能
    creatFragment(el) {
        const fragment = document.createDocumentFragment();
        while (el.firstChild) {
            fragment.appendChild(el.firstChild);
        }
        return fragment;
    }
    // 指令解析
    compile(fEl) {
        Array.from(fEl.childNodes).forEach(item => {
            if (this.isElementNode(item)) {
                this.compileElement(item);
            } else {
                this.compileText(item);
            }
            if (item.childNodes && item.childNodes.length > 0) {
                this.compile(item);
            }
        })
    }
    // 解析元素节点
    compileElement(node) {
        [...node.attributes].forEach(item => {
            if (this.isDirective(item.name)) {
                // 解构属性的键值
                const { name, value } = item;
                const [, directive] = name.split('-');
                const [directiveName, eventName] = directive.split(':');
                // 调用对应的updater方法更新视图
                compileUtil[directiveName](node, value, this.vm, eventName);
                // 移除  v- 属性
                node.removeAttribute('v-' + directive)
            }
        })
    }
    // 解析文本节点
    compileText(node) {
        // console.log(node.nodeValue);
        const content = node.nodeValue;
        if (/\{\{(.+?)\}\}/.test(content)) {
            compileUtil['text'](node, content, this.vm);
        }
    }
    // 判断是否为vue属性
    isDirective(name) {
        return name.startsWith('v-');
    }
}

// 劫持监听所有属性 observer
class Observer {
    constructor(data) {
        if (Object.prototype.toString.call(data) == '[object Object]') {
            this.observer(data);
        }
    }
    observer(data) {
        Object.keys(data).forEach(key => {
            this.defineReactive(key, data[key], data);
        })
    }
    defineReactive(key, value, data) {
        if (Object.prototype.toString.call(value) === '[object Object]') {
            this.observer(value);
        }
        Object.defineProperty(data, key, {
            enumerable: true,
            configurable: true,
            get() {
                return value;
            },
            set: (newValue) => {
                // 如果为一个新对象赋值，再次劫持监听此新对象
                if (Object.prototype.toString.call(value) === '[object Object]') {
                    this.observer(newValue)
                }
                if (value !== newValue) {
                    value = newValue;
                }
            }
        });
    }
}