class fakeVue {
    constructor(options) {
        this.$el = options.el;
        this.$data = options.data;
        this.$options = options;
        // 判断传入的el是否有值
        if (this.$el) {
            // 劫持监听所有属性 observer
            // 解析执行  compile
            new Compile(this.$el, this);
        }
    }
}

// 指令解析器 
class Compile {
    constructor(el, vm) {
        this.el = this.isElementNode(el) ? el : document.querySelector(el);
        const fEl = this.creatFragment(this.el);
        console.log(this.compile(fEl));
        // this.el.appendChild(fEl);
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
        console.log(node.attributes);
    }
    // 解析文本节点
    compileText(text) {

    }
}