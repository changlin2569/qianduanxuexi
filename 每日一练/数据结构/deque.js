class Deque {
    constructor() {
        this.count = 0;
        this.lowestCount = 0;
        this.items = {};
    }
    // 在双端队列前端添加新元素
    addFront(element) {
        if (this.isEmpty()) {
            this.items[this.count] = element;
            this.count++;
        } else if (this.lowestCount > 0) {
            this.lowestCount--;
            this.items[this.lowestCount] = element;
        } else {
            for (var i = this.count; i >= 0; i--) {
                this.items[i] = this.items[i - 1];
            }
            this.items[this.lowestCount] = element;
            this.count++;
        }
    }
    // 双端队列后端添加元素
    addBack(element) {
        this.items[this.count] = element;
        this.count++;
    }
    // 移除第一个元素，返回被移除的元素
    removeFront() {
        if (this.isEmpty()) {
            return '双端队列为空';
        } else {
            let x = this.items[this.lowestCount];
            delete this.items[this.lowestCount];
            this.lowestCount++;
            return x;
        }
    }
    // 移除最后一个元素，返回被移除的元素
    removeBack() {
        if (this.isEmpty()) {
            return '双端队列为空';
        } else {
            let y = this.items[this.count - 1];
            delete this.items[this.count - 1];
            this.count--;
            return y;
        }
    }
    // 返回双端队列第一个元素
    peekFront() {
        return this.items[this.lowestCount];
    }
    // 返回双端队列最后一个元素
    peekBack() {
        return this.items[this.count - 1];
    }
    // 检验队列是否为空
    isEmpty() {
        return this.count == this.lowestCount;
    }
    // 清空队列
    clear() {
        this.count = 0;
        this.lowestCount = 0;
        this.items = {};
    }
    // tostring方法
    toString() {
        if (this.isEmpty()) {
            return '';
        } else {
            let str = '';
            for (var i = this.lowestCount;i < this.count;i++) {
                str += `,${this.items[i]}`
            }
            return str.substring(1);
        }
    }
}

let deque = new Deque();
console.log(deque.isEmpty());
deque.addBack('john');
deque.addBack('jack');
console.log(deque.toString());
deque.addBack('danny');
console.log(deque.toString());
console.log(deque.isEmpty());
deque.removeFront();
console.log(deque.toString());
deque.removeBack();
console.log(deque.toString());
deque.addFront('john');
console.log(deque.toString());