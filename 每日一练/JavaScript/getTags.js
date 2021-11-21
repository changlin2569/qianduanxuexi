function getTags(tree) {
    if (!tree) {
        return []
    }
    const list = new Set()
    const queue = [].concat(tree)
    while (queue.length) {
        let len = queue.length
        while (len) {
            const node = queue.shift()
            list.add(node.tagName.toLowerCase())
            queue.push(...node.children)
            len--
        }
    }
    return [...list]
}