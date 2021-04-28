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
    setNewValue(vm, attrValueArr, newValue) {
        return attrValueArr.split('.').reduce((prev, item, index) => {
            if (index === attrValueArr.split('.').length - 1) {
                prev[item] = newValue;
            }
            return prev[item];
        }, vm.$data);

    },
    getContentValue(attrValue, vm) {
        return attrValue.replace(/\{\{(.+?)\}\}/g, (...args) => {
            return this.getDataValue(args[1], vm);
        });
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
                new Watch(args[1], vm, () => {
                    this.Updater.updateText(node, this.getContentValue(value, vm));
                });
                return this.getDataValue(args[1], vm);
            });
        } else {
            current = this.getDataValue(value, vm);
            // console.log(current);
            // node.innerHTML = current;
            new Watch(value, vm, (newValue) => {
                this.Updater.updateText(node, newValue);
            });
        }
        this.Updater.updateText(node, current);
    },
    html(node, value, vm) {
        const current = this.getDataValue(value, vm);
        // node.innerHTML = current;
        new Watch(value, vm, (newValue) => {
            this.Updater.updateHtml(node, newValue);
        });
        this.Updater.updateHtml(node, current);
    },
    model(node, value, vm) {
        const current = this.getDataValue(value, vm);
        // node.value = current;
        new Watch(value, vm, (newValue) => {
            this.Updater.updateModel(node, newValue);
        });
        // 实现双向绑定
        node.addEventListener('input', (e) => {
            this.setNewValue(vm, value, e.target.value);
        })
        this.Updater.updateModel(node, current)
    },
    on(node, value, vm, eventName) {
        node.addEventListener(eventName, vm.$options.methods[value].bind(vm));
    },
    Updater: {
        updateText(node, current) {
            // console.log(node);
            node.textContent = current;
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
            // 代理 proxy 实现this.[xxx]访问this.$data[xxx]
            this.dataProxy(this.$data);
        }
    }
    dataProxy(data) {
        for (const key in data) {
            Object.defineProperty(this, key, {
                get() {
                    return data[key];
                },
                set(value) {
                    data[key] = value;
                }
            })
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
        const dep = new Dep();
        Object.defineProperty(data, key, {
            enumerable: true,
            configurable: true,
            get() {
                // 当dep中target有值时猜添加
                Dep.target && dep.addWhatch(Dep.target)
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
                dep.notify();
            }
        });
    }
}

// 订阅者
class Watch {
    constructor(attrValue, vm, callback) {
        this.attrValue = attrValue;
        this.vm = vm;
        this.callback = callback;
        this.oldValue = this.getOldValue();
        console.log(this);
    }
    getOldValue() {
        Dep.target = this;
        const oldValue = compileUtil.getDataValue(this.attrValue, this.vm);
        Dep.target = null;
        return oldValue;
    }
    getNewValue() {
        const newValue = compileUtil.getDataValue(this.attrValue, this.vm);
        return newValue;
    }
    // 更新
    update() {
        const newValue = this.getNewValue();
        if (newValue !== this.oldValue) {
            this.callback(newValue);
        }
    }
}

// 存储订阅者
class Dep {
    constructor() {
        this.whatchers = [];
    }
    addWhatch(whatcher) {
        this.whatchers.push(whatcher);
    }
    // 数据变化时通知订阅者更新
    notify() {
        console.log(this.whatchers);
        this.whatchers.forEach(item => {
            item?.update();
        })
    }
}