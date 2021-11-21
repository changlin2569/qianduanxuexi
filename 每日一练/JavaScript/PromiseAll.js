const promise1 = new Promise((resolve, reject) => {
    setTimeout(resolve, 1000, 1);
})
const promise2 = new Promise((resolve, reject) => {
    setTimeout(resolve, 2000, 2)
})

// Promise.all([promise1, promise2]).then((res) => console.log(res));

function PromiseAll(arr) {
    if (!Array.isArray(arr)) {
        return
    }
    return new Promise((resolve, reject) => {
        const result = []
        let temp = 0
        for (let i = 0, len = arr.length; i < len; i++) {
            Promise.resolve(arr[i]).then(res => {
                result.push(res)
                if (++temp === len) {
                    resolve(result)
                }
            }).catch(err => {
                reject(err)
            })
        }
        resolve(arr)
    })
}

function all(promises) {
    promises = Array.from(promises)
    return new Promise((resolve, reject) => {
        promises.length || resolve(promises)
        const res = []
        for (let i = 0, j = len = promises.length; i < len; i++) {
            Promise.resolve(promises[i]).then(data => {
                res[i] = data
                if (!--j) {
                    resolve(res)
                }
                // --j || resolve(res)
            }, err => {
                reject(err)
            })
        }
    })
}

async function all(promises) {
    const res = []

    for (const promise of promises) {
        // await 跳出函数执行，直到promise决议成功，再从微任务队列中取出恢复执行
        res.push(await promise)
        console.log(11)
    }

    return res
}

all([1, 2, new Promise((resolve, reject) => {
    setTimeout(resolve, 1000, 3)
}), 4]).then(data => {
    console.log(data);
})

function all(promises) {
    promises = Array.from(promises)
    return promises.reduce((prev, promise) => {
        return prev.then(results => Promise.resolve(promise).then(data => [...results, data]))
    }, Promise.resolve([]))
}

// PromiseAll([1]).then((res) => console.log(res));
// all([Promise.resolve(4), Promise.resolve(4), Promise.resolve(4), Promise.resolve(4)]).then((res) => console.log(res));

all([1, 2, new Promise((resolve, reject) => {
    setTimeout(resolve, 1000, 3);
}), 4]).then((res) => console.log(res), err => console.log(err));