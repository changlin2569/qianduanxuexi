function curry(fn, len = fn.length) {
    function _curry(...args) {
        return function(...params) {
            args = [...params, ...args];
            if (args.length >= len) {
                return fn.apply(this, args);
            } else {
                return _curry.call(null, ...args);
            }
        }
    }
    return _curry()
}

function curry(fn, len = fn.length, ...args) {
    return function (...params) {
        args = [...params, ...args];
        if (args.length >= len) {
            return fn.apply(null, args);
        } else {
            return curry(fn, len, ...args);
        }
    }
}

function add(x, y, z) {
    return x + y + z;
}

add = curry(add);
console.log(add(1)(2, 3));

// ------------------------------------------------------------------------------------

// 参数不定长
function _curry(fn) {
    let args = [];
    foo = function (...params) {
        args = [...args, ...params]
        return foo
    }

    foo.toString = function () {
        return fn.apply(null, args)
    }

    return foo;
}

function _add() {
    return [...arguments].reduce((prev, item) =>  prev += item)
}

bar = _curry(_add)

console.log(bar(1)(2)(3));

