/**
 * @Author: changlin
 * @Date: 2021-10-17 15:56:56
 * @name: 
 * @msg: 
 * @param {Array<Promise>} promises
 * @return {Promise}
 */
function any(promises) {
    promises = Array.from(promises)
    return new Promise((resolve, reject) => {
        const arr = []
        promises.length || reject([])
        for (let i = 0, len = promises.length; i < len; i++) {
            Promise.resolve(promises[i]).then(data => {
                resolve(data)
            }, res => {
                arr.push(res) === len && reject(arr)
            })
        }
    })
}

any([])