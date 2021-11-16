Function.prototype.myBind = function (_this) {
    if (typeof this !== 'function') {
        return false
    }
    const args = [].slice.call(arguments, 1)
    const bindFunc = function () { }
    const oldFunc = this
    const toBind = function () {
        bindFunc.prototype = this instanceof bindFunc ? new bindFunc() : bindFunc.prototype
        return oldFunc.apply(this instanceof bindFunc ?
            this : _this, args)
    }
    if (this.prototype) {
        bindFunc.prototype = this.prototype
    }
    return toBind
}

const obj = {
}

function foo(name) {
    this.name = name
}

const baz = foo.bind(obj, '111')

console.log(new baz);
console.log(obj);

const obj1 = {}

const bar = foo.myBind(obj1, '222')
console.log(new bar);
console.log(obj1);