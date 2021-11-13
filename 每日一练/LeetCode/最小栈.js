class MinStack {
    constructor() {
        this.stack = []
        this.min_stack = []
    }

    push(val) {
        this.stack.push(val)
        this.min_stack.push(Math.min(this.min_stack[this.min_stack.length - 1] ?? Infinity, val))
    }

    pop() {
        if (this.stack.length) {
            this.stack.pop()
            this.min_stack.pop()
        }
    }

    min() {
        this.min_stack[this.min_stack.length - 1]
    }
}