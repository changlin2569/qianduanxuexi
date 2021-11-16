function promisify(func) {
    // your code here
    return function (...args) {
        return new Promise((resolve, reject) => {
            args.push((err, data) => {
                err && reject(err)
                resolve(data)
            })
            Reflect.apply(func, this, args)
        })
    }
}