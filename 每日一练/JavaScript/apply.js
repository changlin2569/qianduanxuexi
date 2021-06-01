Function.prototype.fakeApply = function (context) {
    const args = arguments[1];
    if (typeof this !== 'function') {
        return
    } else if (args && !Array.isArray(args)) {
        return
    }
    // 检测是否为严格模式
    const isStrict = (function () {
        return this === undefined
    }())
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
        return args ? this(...args) : this();
    }
    context[fn] = this;
    const result = args ? context[fn](...args) : context[fn]();
    delete context[fn];
    return result
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

var a = 3, b = 4;
function add(a, b) {
    console.log(this.a + this.b);
    console.log(a + b);
}

add.apply(null, [5, 6])
add.apply(obj, [5, 6])

console.log('-------------------------------------');

add.fakeApply(null, [5, 6])
add.fakeApply(obj, [5, 6])