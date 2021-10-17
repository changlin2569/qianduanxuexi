const promise1 = new Promise((resolve, reject) => {
    resolve(1)
})

const promise2 = Promise.resolve(2)

const promise3 = new Promise((resolve, reject) => {
    reject(3)
})

Promise.allSettled([promise1, promise2, promise3]).then(result => {
    console.log(result)
})

MyPromiseAllSettled([promise1, promise2, promise3]).then(result => {
    console.log(result)
})

MyPromiseAllSettled([]).then(result => {
    console.log(result)
})


function MyPromiseAllSettled(params) {
    if (!params) {
        return
    }
    return new Promise((resolve, reject) => {
        const paramsArr = Array.from(params)
        paramsArr.length || resolve([])
        const result = []
        let j = 0
        const len = paramsArr.length
        for (let i = 0; i < len; i++) {
            Promise.resolve(paramsArr[i]).then(data => {
                result.push({
                    status: 'fulfilled',
                    value: data
                })
                j++
            }).catch(reason => {
                result.push({
                    status: 'rejected',
                    reason: reason,
                })
                j++
            }).finally(() => {
                if (j === len) {
                    resolve(result)
                }
            })
        }
    })
}

function MyPromiseAllSettled(params) {
    params = Array.from(params)
    return new Promise((resolve, reject) => {
        const arr = []
        for (let i = 0, len = params.length; i < len; i++) {
            Promise.resolve(params[i]).then(data => {
                arr.push({
                    status: 'fulfilled',
                    value: data
                }) === len && resolve(arr)
            }, reason => {
                arr.push({
                    status: 'rejected',
                    reason: reason,
                }) === len && resolve(arr)
            })
        }
        resolve(arr)
    })
}