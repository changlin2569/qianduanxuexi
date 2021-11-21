const reverseLinkedList = (list) => {
    if (!list || !list.next) return list

    let newHead = reverseLinkedList(list.next)

    list.next.next = list

    // 如果不设置为 null，可能会产生环路（双向链表）
    list.next = null

    return newHead
}