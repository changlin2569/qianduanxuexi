class LazyMan {
    constructor(data) {
        this.queue = [{
            id: 0,
            data
        }]
        setTimeout(() => {
            this.init()
        }, 0)
    }

    init() {
        while (this.queue.length) {
            const item = this.queue.shift()
            if (item.id === 0) {
                console.log(item.data)
            } else {
                setTimeout(() => {
                    this.init()
                }, item.delay)
                break
            }
        }
    }

    eat(data) {
        this.queue.push({
            id: 0,
            data
        })
        return this
    }

    sleep(delay) {
        this.queue.push({
            id: 1,
            delay
        })
        return this
    }
}

function lazyMan(data) {
    return new LazyMan(data)
}

lazyMan('apple').sleep(1000).eat('aaaa').sleep(1000).eat('bbbbb').eat('cccc')