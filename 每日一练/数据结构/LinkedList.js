class Node {
    constructor(element) {
        this.node = element;
        this.next = null;
    }
}

class LinkedList {
    constructor () {
        this.head = null;
        this.count = 0;
    }
    // 向链表尾部添加一个新的元素
    push(element) {
        let node = new Node(element);
        this.count++;
        if (this.isEmpty()) {
            this.head = node;
        } else {
            let current = this.head;
            while (current.next != null) {
                current = current.next;
            }
            current.next = node;
        }
    }
    
}