Function.prototype.fakeBind = function (context) {
    if (typeof this !== 'function') {
        return
    }
    // 检测是否为严格模式
    const isStrict = (function () {
        return this === undefined
    }())
    const args = [].slice.call(arguments, 1);
    const fn = Symbol('fn');
    if (!isStrict) {
        const type = typeof context
        switch (type) {
            case 'object':
                break;
            case 'string':
                context = String(context);
                break;
            case 'number':
                context = Number(context);
                break;
            case 'boolean':
                context = Boolean(context);
        }
    }
    if (Object.prototype.toString.call(context) === '[object Null]' || typeof context === 'undefined') {
        return () => this(...args)
    }
    context[fn] = this;
    return function () {
        const result = context[fn](...args);
        delete context[fn];
        return result
    }
}
var obj = {
    color: 'black',
    a: 1,
    b: 2,
    logColor,
    add
};
var color = 'red';

function logColor() {
    console.log(this.color);
}

var a = 3,
    b = 4;

function add(a, b) {
    console.log(this.a + this.b);
    console.log(a + b);
}

add.bind(null, [5, 6])()
add.bind(obj, [5, 6])()

console.log('-------------------------------------');

add.fakeBind(null, [5, 6])()
add.fakeBind(obj, [5, 6])()