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
        // if (this.status === FULFILLED) {
        //     onFulfilled(this.value)
        // } else if (this.status === REJECTED) {
        //     onRejected(this.reason)
        // } else if (this.status === PENDING) {
        //     this.onFulfilled || this.onFulfilledCallback.push(onFulfilled)
        //     this.onRejected || this.onRejectedCallback.push(onRejected)
        // }
        const promise2 = new myPromise((resolve, reject) => {
            if (this.status === FULFILLED) {
              // 获取成功回调函数的执行结果
              const x = onFulfilled(this.value);
              resolvePromise(x, resolve, reject);
            } else if (this.status === REJECTED) {
              onRejected(this.reason);
            } else if (this.status === PENDING) {
              this.onFulfilledCallbacks.push(onFulfilled);
              this.onRejectedCallbacks.push(onRejected);
            }
          }) 
          
          return promise2;
    }
}

function resolvePromise(x, resolve, reject) {
    // 判断x是不是 MyPromise 实例对象
    if(x instanceof myPromise) {
      x.then(resolve, reject)
    } else{
      // 普通值
      resolve(x)
    }
  }

module.exports = myPromise;