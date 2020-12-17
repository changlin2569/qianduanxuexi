class Stack {
    constructor () {
        this.count = 0;
        this.items = {};
    }
    // 向栈中插入元素
    push (item) {
        this.items[this.count] = item;
        this.count++;
    }
    // 移除栈顶的元素,返回被移除的元素
    pop () {
        if (this.isEmpty()) {
            return `栈为空`;
        }
        let flag = this.items[this.count];
        this.count--;
        delete this.items[this.count];
        return flag;
    }
    // 返回栈顶的元素
    peek() {
        if (this.isEmpty()) {
            return `栈为空`;
        }
        return this.items[0];
    }
    // 检查栈中有无元素
    isEmpty() {
        return this.count == 0;
    }
    // 移除栈里的所有元素
    clear() {
        this.count = 0;
        this.items = {};
    }
    // 返回栈里的数目
    size() {
        return this.count;
    }
}

let stack = new Stack();
stack.push(5);
stack.push(8);
stack.pop();
console.log(stack);
