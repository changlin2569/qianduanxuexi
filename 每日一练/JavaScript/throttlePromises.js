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

throttlePromises(promises).then(data => console.log(data))