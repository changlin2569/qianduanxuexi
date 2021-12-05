const promise1 = () => new Promise((resolve, reject) => {
    console.log(1)
    resolve(1)
})

const promise2 = () => new Promise((resolve, reject) => {
    setTimeout((i) => {
        console.log(i)
        resolve(i)
    }, 2000, 2)
})

const promise3 = () => new Promise((resolve, reject) => {
    setTimeout((i) => {
        console.log(i)
        resolve(i)
    }, 3000, 3)
})

const promiseList = [promise1, promise2, promise3]

promiseChain(promiseList).then(data => {
    console.log('执行完毕', data)
})

async function promiseChain(promiseList) {
    const res = []
    for (const promiseFunc of promiseList) {
        const result = await promiseFunc()
        res.push(result)
    }

    return res
}

function promiseChain(promiseList) {
    return new Promise((res, rej) => {
        const data = []
        let item = promiseList[0]()
        for (let i = 1; i < promiseList.length; i++) {
            item = item.then(e => {
                data.push(e)
                return promiseList[i]()
            })
        }
        item.then((e) => {
            data.push(e)
            res(data)
        })
    })
}