function add() {
    const args = Array.prototype.slice.call(arguments, 0);
    
    function foo() {
        args.push(...arguments);
        return foo;
    }

    foo.toString = function() {
        return args.reduce((prev, item) => prev += item, 0);
    }
    return foo
}


const add1 = add(1)(2)(3)
console.log(add1)

const add2 = add(1)(2)(3, 4)
console.log(add2);