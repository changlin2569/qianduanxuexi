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
            const i = prev.lastIndexOf(arr[index])
            prev = prev.slice(0, i + 1) + ((+prev[i + 1] || 1) + 1)
        } else {
            prev += item
        }
        return prev
    }, '')
}

// console.log(compress('aaabbaaa'));

function deduplicate(arr) {
    // your code here
    if (!Array.isArray(arr)) {
        return arr
    }
    return arr.reduce((prev, item) => {
        return prev.includes(item) ? prev : [...prev, item]
    }, [])
}


// 编程题：实现一个拼手气分红包的方法，传入总金额及人数，返回每个人分得的金额数组（单位为分）

// 每个人至少要有1分钱

// 总金额不能超过或不到

function redBox(money, n) {
    const res = Array(n).fill(1)
    let count = money
    money -= n
    let i = 0
    while (money && i < n) {
        const amount = Math.random() * money
        // console.log(amount)
        res[i] = res[i] + amount
        money -= amount
        i++
    }
    console.log(res)
    const Idx = Math.floor(Math.random() * (n + 1))
    const total = res.reduce((total, amount) => total + amount)
    res[Idx] = count - total + res[Idx]
    return res
}

// redBox(10, 4)


// fn([['a', 'b'], ['n', 'm'], ['0', '1']]) => ['an0', 'am0', 'an1', 'am1', 'bn0', 'bm0', 'bn1', 'bm0']

function rank(arr) {
    if (!Array.isArray(arr)) {
        return
    }
    const res = []
    const dfs = (path = [], cur = 0) => {
        if (path.length === arr.length) {
            res.push(path.join(''))
            return
        }
        for (let i = 0; i < arr[cur].length; i++) {
            path.push(arr[cur][i])
            dfs(path, cur + 1)
            path.pop()
        }
    }
    dfs()
    console.log(res)
    return res
}

// rank([['a', 'b'], ['n', 'm'], ['0', '1']])


// 给数组中的字符串编号，f(['ab', 'c', 'd', 'ab', 'c']) => ['ab1', 'c1', 'd', 'ab2', 'c2']

function f(arr) {
    if (!Array.isArray(arr)) {
        return
    }
    const map = new Map()
    return arr.reduce((prev, item) => {
        if (map.has(item)) {
            map.set(item, map.get(item) + 1)
            prev = [...prev, item + map.get(item)]
        } else {
            map.set(item, 1)
            prev = [...prev, item + 1]
        }
        return prev
    }, [])
}

// console.log(f(['ab', 'c', 'd', 'ab', 'c']))

function createCounter() {
    // your code here
    const counter = {}
    let val = 0
    Reflect.defineProperty(counter, 'count', {
        enumerable: true,
        // writable: false,
        configurable: true,
        get() {
            return val++
        }
    })
    return counter
}

// console.log(createCounter().count)


function useFetch(url) {
    let [response, serResponse] = useState(null)
    let [loading, setLoading] = useState(true)
    let [error, setError] = useState(false)
    let [get, serGet] = useState({})
    let [post, setPost] = useState({})

    useEffect(async () => {
        const newUrl = Object.entries(get).reduce((prev, [key, val]) => {
            if (prev.includes('?')) {
                prev = prev + `&${key}=${val}`
            } else {
                prev = prev + '?' + `${key}=${val}`
            }
            return prev
        }, url)
        try {
            let res = await fetch(newUrl)
            res = await res.json()
            serResponse(res)
            setLoading(false)
        } catch (err) {
            setError(true)
            throw err
        }
    }, [get])

    useEffect(async () => {
        try {
            let res = await fetch(url, {
                method: 'POST',
                ...post
            })
            res = await res.json()
            serResponse(res)
            setLoading(false)
        } catch (err) {
            setError(true)
            throw err
        }
    }, [post])

    return {
        response,
        loading,
        error,
        post: setPost,
        get: serGet
    }
}

const repeatFunc = repeat(console.log, 4, 1000);

function repeat(cb, count, delay) {
    return function _repeat(args) {
        if (!count--) {
            return
        }
        setTimeout((args) => {
            // Reflect.apply(cb, null, args)
            cb.call(null, args)
            _repeat(args)
        }, delay, args)
    }
}

// repeatFunc("helloworld")


// 多层数组反转（ [1, [2, [3, [4, [5, 'null']]]]] => [5, [4, [3, [2, [1, 'null']]]]]）；

function reverseArr(arr) {
    if (!Array.isArray(arr)) {
        return
    }
    ;[arr[0], arr[1]] = [arr[1], arr[0]]
    for (let i = 1; i < arr.length; i++) {
        Array.isArray(arr[i - 1]) && reverseArr(arr[i])
    }
    return arr
}

// console.log(reverseArr([1, [2, [3, [4, [5, 'null']]]]]))


// 调整数组使奇数在前偶数在后，保证顺序，不使用额外空间

const isOdd = (num) => {
    return !!(num & 1)
}

function moveArr(arr) {
    if (!Array.isArray(arr)) {
        return
    }
    for (let i = j = 0; i < arr.length; i++) {
        if (isOdd(arr[i])) {
            ;[arr[i], arr[j]] = [arr[j], arr[i]]
            j++
        }
    }
    console.log(arr)
    return arr
}

// moveArr([1, 2, 3, 4, 5, 6, 7, 8])

// fill(n, v) => [v,...,v]//输出n个v,v可以是任何类型

function fill(n, v) {
    if (n === 0) {
        return []
    }
    return [v, ...fill(n - 1, v)]
}

// console.log(fill(4, 1))