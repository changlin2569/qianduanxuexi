class Quene {
    constructor() {
        this.count = 0;
        this.lowestCount = 0;
        this.items = {};
    }
    // 向队列尾部添加新的项
    enquene(element) {
        this.items[this.count] = element;
        this.count++;
    }
    // 移除队列的第一项，返回被移除的元素
    dequene() {
        if (this.isEmpty()) {
            return;
        }
        let x = this.items[this.lowestCount];
        delete this.items[this.lowestCount];
        this.lowestCount++;
        return x;
    }
    // 返回队列中的第一个元素
    peek() {
        if (this.isEmpty()) {
            return null;
        }
        return this.items[this.lowestCount];
    }
    // 检验队列是否为空
    isEmpty() {
        return this.count == this.lowestCount;
    }
    // 返回队列中的元素个数
    size() {
        return this.count - this.lowestCount;
    }
    // 创建tostring方法
    toString() {
        let str = '';
        for (var i = this.lowestCount; i < this.count; i++) {
            str += `,${this.items[i]}`;
        }
        return str.substring(1);
    }
}

let quene = new Quene();
console.log(quene.isEmpty());
quene.enquene('jack');
quene.enquene('make');
console.log(quene.toString());
quene.enquene('jenny');
console.log(quene.toString());
console.log(quene.isEmpty());
quene.dequene();
quene.dequene();
console.log(quene.toString());