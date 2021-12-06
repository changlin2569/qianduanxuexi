function multiFetch(urls, max) {
    if (!Array.isArray(urls) || urls.length === 0) {
        return null
    }
    return new Promise((resolve, reject) => {
        const res = []
        let temp = Math.floor(urls.length / max)
        let current = Promise.all(urls.slice(0, max))
        let count = 1
        while (temp !== 0) {
            current = current.then(data => {
                console.log(data);
                res.push(...data)
                return Promise.all(urls.slice(count * max, max + count * max))
            }).catch(err => {
                temp = 0
                reject(err)
            })
            temp--
        }
        current.then(() => {
            resolve(res)
        })
    })
}

multiFetch([
    new Promise((resolve, reject) => {
        setTimeout((i) => {
            resolve(i)
        }, 1000, 1)
    }),
    new Promise((resolve, reject) => {
        setTimeout((i) => {
            resolve(i)
        }, 2000, 2)
    }),
    new Promise((resolve, reject) => {
        setTimeout((i) => {
            resolve(i)
        }, 1000, 3)
    }),
    new Promise((resolve, reject) => {
        setTimeout((i) => {
            resolve(i)
        }, 2000, 4)
    }),
], 2).then((responses) => {
    console.log(responses); // [a, b, c, d]
})