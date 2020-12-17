class Stack {
    constructor() {
        this.item = [];
    }
    // 添加元素到栈顶
    push(...args) {
        this.item.push(...args);
    }
    // 移除栈顶元素，停驶返回被移除的元素
    pop() {
       return this.item.pop();
    }
    // 返回栈顶的元素，不对栈做任何修改
    peek() {
        return this.item[0];
    }
    // 检测栈中是都为空
    isEmpty() {
        return this.item.length == 0;
    }
    // 移除栈里的所有元素
    clear() {
        this.item = [];
    }
    // 返回栈里的元素个数
    size() {
        return this.item.length;
    }
}

let newArr = new Stack();

newArr.push(1,2,3,4);
// let a = newArr.pop();
// console.log(a);
console.log(newArr.isEmpty());
console.log(newArr.peek());
console.log(newArr.item);