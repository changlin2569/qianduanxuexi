function myInstanceOf(obj, target) {
    // 注意 js 对构造函数或者类进行 typeof 返回的是 function
    if (typeof obj !== 'object' || typeof target !== 'function' || !obj || !target) {
        return false
    }
    const prototype = target.prototype
    let objPrototype = Object.getPrototypeOf(obj)
    while (objPrototype) {
        if (objPrototype === prototype) {
            return true
        }
        objPrototype = Object.getPrototypeOf(objPrototype)
    }
    return false
}


console.log(myInstanceOf(new String('111'), Object));