Function.prototype.fakeCall = function (context) {
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
        return this(...args)
    }
    context[fn] = this;
    const result = context[fn](...args)
    delete context[fn]
    return result
}


Function.prototype.mycall = function (thisArg, ...args) {
    if (typeof this !== 'function') {
        throw Error('need funtion')
    }
    const id = Symbol('id')
    if (typeof thisArg !== 'object' && thisArg) {
        thisArg = Object(thisArg)
    } else {
        thisArg = thisArg || window
    }
    thisArg[id] = this
    const res = thisArg[id](...args)
    delete thisArg[id]
    return res
}

var obj = {
    color: 'black'
};
var color = 'red';

function logColor() {
    console.log(this.color);
}

logColor.call(null);

logColor.fakeCall();