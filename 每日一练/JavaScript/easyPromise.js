const PENDING = 'PENDING';
const FULFILLED = 'FULLILLED';
const FAilED = 'FAILED';

class MyPromise {
    status = PENDING

    result = null

    reason = null

    constructor(cb) {
        cb(this.resolve, this.reject)
    }

    resolve = (result) => {
        if (this.status === PENDING || this.status === FULFILLED) {
            this.status = FULFILLED
            this.result = result
            // return this
        }
        this.reason = result
        // return this.reject(this.reason)
    }

    reject = (reason) => {
        if (this.status === PENDING || this.status === FAilED) {
            this.status = FAILED
            this.reason = reason
            // return this
        }
        this.result = result
        // return this.resolve(this.result)
    }

    then = (res, rej) => {
        if (this.status === FULFILLED) {
            res(this.result)
        } else if (this.status === FAilED) {
            rej(this.reason)
        }
    }
}

new MyPromise((res, rej) => {
    console.log(1);
    res(2)
}).then(data => {
    console.log(data);
})