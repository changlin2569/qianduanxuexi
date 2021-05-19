const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

class myPromise {
    status = PENDING;

    value = null;

    reason = null;

    onFulfilledCallback = [];

    onRejectedCallback = [];

    constructor(executor) {
        executor(this.resolve, this.reject);
    }

    resolve = value => {
        if (this.status === PENDING) {
            this.status = FULFILLED;
            this.value = value;
            // this.onFulfilledCallback && this.onFulfilledCallback(value);
            while (this.onFulfilledCallback.length) {
                this.onFulfilledCallback.shift()(value);
            }
        }
    }

    reject = reason => {
        if (this.status === PENDING) {
            this.status = REJECTED;
            this.reason = reason;
            // this.onRejectedCallback && this.onRejectedCallback(reason);
            while (this.onRejectedCallback.length) {
                this.onRejectedCallback.shift()(value);
            }
        }
    }

    then = (onFulfilled, onRejected) => {
        if (this.status === FULFILLED) {
            return onFulfilled(this.value)
        } else if (this.status === REJECTED) {
            return onRejected(this.reason)
        } else {
            this.onFulfilled || this.onFulfilledCallback.push(onFulfilled)
            this.onRejected || this.onRejectedCallback.push(onRejected)
        }
    }
}

module.exports = myPromise;