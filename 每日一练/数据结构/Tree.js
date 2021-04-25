class Node {
    constructor(key) {
        this.key = key;
        this.left = null;
        this.right = null;
    }
}

class BinarySearchTree {
    constructor() {
        this.root = null;
    }

    insert(key) {
        if (!this.root) {
            this.root = new Node(key);
            return
        }
        this.insertNode(key, this.root);
    }

    insertNode(key, node) {
        if (node.key >= key) {
            if (!node.left) {
                node.left = new Node(key);
            } else {
                this.insertNode(key, node.left);
            }
        } else {
            if (!node.right) {
                node.right = new Node(key);
            } else {
                this.insertNode(key, node.right);
            }
        }
    }

    search(key) {
        if (!this.root) {
            return false
        }
        return this.searchNode(key, this.root);
    }

    searchNode(key, node) {
        if (!node) {
            return false
        }
        if (node.key === key) {
            return true;
        } else if (node.key > key) {
            return this.searchNode(key, node.left);
        } else {
            return this.searchNode(key, node.right);
        }
    }

    min() {
        if (!this.root) {
            return
        }
        return this.minNode(this.root);
    }

    minNode(node) {
        if (!node.left) {
            return node.key;
        }
        return this.minNode(node.left);
    }

    max() {
        if (!this.root) {
            return
        }
        return this.maxNode(this.root);
    }

    maxNode(node) {
        if (!node.right) {
            return node.key;
        }
        return this.maxNode(node.right);
    }

    // 中序遍历
    inOrderTraverse(callback) {
        this.inOrderTraverseNode(this.root, callback);
    }

    inOrderTraverseNode(node, callback) {
        if (node) {
            this.inOrderTraverseNode(node.left, callback);
            callback(node.key);
            this.inOrderTraverseNode(node.right, callback);
        }
    }

    // 先序遍历
    preOrderTraverse(callback) {
        this.preOrderTraverseNode(this.root, callback);
    }

    preOrderTraverseNode(node, callback) {
        if (node) {
            callback(node.key);
            this.preOrderTraverseNode(node.left, callback);
            this.preOrderTraverseNode(node.right, callback);
        }
    }

    // 后序遍历
    postOrderTraverse(callback) {
        this.postOrderTraverseNode(this.root, callback)
    }

    postOrderTraverseNode(node, callback) {
        if (node) {
            this.postOrderTraverseNode(node.left, callback);
            this.postOrderTraverseNode(node.right, callback);
            callback(node.key);
        }
    }
}

const tree = new BinarySearchTree();
tree.insert(11);
tree.insert(7);
tree.insert(15);
tree.insert(5);
tree.insert(13);
tree.insert(20);
// console.log(tree.search(5));
// console.log(tree.min());
// console.log(tree.max());
// tree.inOrderTraverse(console.log)
// tree.preOrderTraverse(console.log)
tree.postOrderTraverse(console.log)