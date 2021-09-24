function myNew(Func, ...args) {
    // 获取构造函数的原型对象
    const prototype = Func.prototype
    // 创建一个新对象，该对象的原型链接到构造函数原型对象
    const obj = Object.create(prototype)
    // 执行构造函数，并获得返回值
    const res = Func.apply(obj, args)
    // 判断返回值的类型，如果时基本类型则返回新对象
    if (!res || typeof res !== "object") {
        return obj
    }
    return res
}

function Person(name, age) {
    this.name = name
    this.age = age
}
console.log(new Person('cl', 18));
console.log(myNew(Person, 'cl', 18));
console.log(new Person('cl', 18).__proto__ === myNew(Person, 'cl', 18).__proto__);
console.log(Object.getPrototypeOf(new Person('cl', 18)) === Object.getPrototypeOf(myNew(Person, 'cl', 18)));