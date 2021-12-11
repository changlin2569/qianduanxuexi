const data = [1, 2, 3, 0, 0, 0, 5, 2, 0, 1, 0, 0, 2];
//去除三个及以上相邻的0
//返回结果：[1,2,3,5,2,0,1,0,0,2]

function test(arr) {
    if (!Array.isArray(arr)) {
        return
    }
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === 0) {
            let j = i + 1
            let count = 1
            while (arr[j++] === 0) {
                count++
            }
            count >= 3 && arr.splice(i, count)
        }
    }
    console.log(arr)
    return arr
}

// test(data)


// Example 1
mergeDeepList([{ id: 1 }, { id: 3, pid: 1 }, { id: 4 }])
//=> [{id:1, children: [{id:3}]}, {id:4}]

// Example 2
mergeDeepList([{ id: 3, pid: 1 }, { id: 4, pid: 3 }, { id: 1 }])
//=>[{id:1, chidren: [{id:3, children: [{id:4}]}]}]

// 1. Node => {id, pid}  只关心id和pid即可， pid代表父节点id
// 2. 顺序不定， 但pid一定有对应的id节点存在
// 3. O(n) 时间复杂度解决

function mergeDeepList(arr) {
    if (!Array.isArray(arr)) {
        return
    }
    const map = new Map()
    const res = []
    for (const node of arr) {
        const { id, pid } = node
        if (map.has(pid)) {
            const item = map.get(pid)
            item.children ??= []
            item.children.push(node)
        } else {
            res.push(node)
        }
        map.set(id, node)
    }
    map.clear()
    return res.reduceRight((prev, cur) => {
        const { id, pid } = cur
        if (map.has(pid)) {
            const item = map.get(pid)
            item.children ??= []
            item.children.push(item)
        } else {
            prev.push(cur)
        }
        map.set(id, cur)
        return prev
    }, [])
}


function throttlePromises(funcs, max) {
    return new Promise((resolve, reject) => {
        const res = []
        let count = Math.ceil(funcs.length / max)
        let current = Promise.all(funcs.splice(0, max).map(func => func()))
        while (count--) {
            current = current.then(data => {
                res.push(...data)
                return Promise.all(funcs.splice(0, max).map(func => func()))
            })
        }
        current.then(() => resolve(res))
            .catch(err => reject(err))
    })
}


const promises = Array(15).fill(() => Promise.resolve(1))

// throttlePromises(promises).then(data => console.log(data))


function toBase(m, n) {
    if (n < 2 || n > 9) {
        return m
    }
    return m.toString(n)
}

// toBase(100, 2) // 1100100

// toBase(10, 3) // 101

// m是一个10进制的数
// n是一个2 - 9的整数



function findTwo(arr) {
    // your code here
    const map = new Map()
    const res = []
    for (let i = 0; i < arr.length; i++) {
        const item = arr[i]
        console.log(map);
        if (map.has(item)) {
            res.push(map.get(item), i)
            return res
        }
        map.set(-item, i)
    }
    return null
}

// console.log(findTwo([1, 2, 3, -1]))


// trans('get-element-by-id'); // 'getElementById'


function trans(str) {
    if (!str.trim()) {
        return
    }
    let res = ''
    const strArr = str.split('-')
    res += strArr[0]
    for (let i = 1; i < strArr.length; i++) {
        const [l, ...r] = strArr[i]
        res = res + l.toUpperCase() + r.join('')
    }
    console.log(res)
    return res
}


function calc(n) {
    const res = []
    let i = 2
    let count = n
    while (i <= n) {
        while (!(count % i)) {
            res.push(i)
            count = count / i
        }
        i++
    }
    return res
}
// console.log(calc(2))
// // [2]
// console.log(calc(8))
// // [2, 2, 2]
// console.log(calc(24))
// // [2, 2, 2, 3]
// console.log(calc(30))
// // [2, 3, 5]


// 实现一个栈，要求是：只能存放Number、可以push，pop，实现 maxN(n) 方法，n =1 返回第一个最大值 n =2 返回第二最大值， n = N 返回第N个 最大值，并且maxN时间复杂度为O(1)



// 实现一个get(0).add(1).sub(2).mul(3)， 返回 -3

function get(val) {
    return {
        val,
        add: function (val) {
            this.val += val
            return this
        },
        sub: function (val) {
            this.val -= val
            return this
        },
        mul: function (val) {
            this.val *= val
            return this
        }
    }
}

// console.log(get(0).add(1).sub(2).mul(3))


// console.log(removeSubsets([
//     [1],
//     [1, 2, 3],
//     [1, 2],
//     [2, 4],
//     [5],
//     [4]
// ]))  // [[1,2,3], [2, 4], [5]

// console.log(add(2, 3, 4).sumOf())
// console.log(add(2)(3, 4).sumOf())
// add(2)(3)(4).sumOf()
// add(2, 3)(4).sumOf()

function add(...args) {
    function _add(...params) {
        args.push(...params)
        return _add
    }

    _add.sumOf = function () {
        return args.reduce((total, item) => total + item)
    }

    return _add
}

function binaryAdd(num1, num2) {
    // TODO
    let res = ''
    let [i, j] = [num1.length - 1, num2.length - 1]
    let temp = 0
    while (i >= 0 || j >= 0) {
        let item1 = num1.charAt(i--) ?? 0
        let item2 = num2.charAt(j--) ?? 0
        let cur = +item1 + +item2 + temp
        if (cur > 1) {
            cur = 0
            temp = 1
        } else {
            temp = 0
        }
        res = cur + res
    }
    return temp === 1 ? temp + res : res
}
//Example
// console.log(binaryAdd('1010', '111')); // '10001'

function a() {
    if (a.temp === 1) {
        a.temp = 2
    } else if (a.temp === 2) {
        a.temp = 1
    } else {
        a.temp = 1
    }
    console.log(a.temp)
}

// a()
// a()
// a()
// a()


Function.prototype.myBind = function (context, ...args) {
    const fn = this
    args = args ? args : []
    return function newFn(...newFnArgs) {
        if (this instanceof newFn) {
            return new fn(...args, ...newFnArgs)
        }
        return fn.apply(context, [...args, ...newFnArgs])
    }
}

function compress(str) {
    // your code here
    if (!str) {
        return str
    }
    return [...str].reduce((prev, item, index, arr = [...str]) => {
        if (arr[index] === arr[index - 1]) {
            // prev[index] = (+prev[index] || 1) + 1
            const i = prev.indexOf(arr[index])
            prev = prev.slice(0, i + 1) + ((+prev[i + 1] || 1) + 1)
        } else {
            prev += item
        }
        return prev
    }, '')
}

console.log(compress('aaabba'));