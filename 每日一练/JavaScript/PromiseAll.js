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
PromiseAll([1]).then((res) => console.log(res));