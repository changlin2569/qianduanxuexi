class Set {
    constructor() {
        this.items = {};
    }
    has(value) {
        let flag = false;
        for(let key in this.items) {
            if (key == value) {
                flag = true;
                break;
            }
        }
        return flag;
    }
    add(value) {
        if (this.has(value)) {
            return;
        }
        this.items[value] = value;
        return this.items;
    }
    delete(value) {
        if (!this.has(value)) {
            return false;
        }
        for (let key in this.items) {
            if (key == value) {
                delete this.items[key];
                break;
            }
        }
        return true;
    }
    clear() {
        this.items = {};
    }
    size() {
        let arr = this.items.keys();
        return arr.length;
    }
}

let set = new Set();
set.add(1);
set.add(2);
set.add(3);
// set.add(3);
console.log(set);
console.log(set.delete(3));
console.log(set);
console.log(set.has(1));