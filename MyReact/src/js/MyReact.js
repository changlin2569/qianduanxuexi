export function createElement(type, props, ...children) {
    return {
        type,
        props: {
            ...props,
            // children数组中可能有基本类型值
            children: children.map(item =>
                typeof item === 'object' ? item : creatTextElement(item)
            )
        }
    }
}

export function creatTextElement(text) {
    return {
        type: 'TEXT_ELEMENT',
        props: {
            nodeValue: text,
            children: []
        }
    }
}

// export function render(element, container) {
//     const { type, props, props: { children } } = element
//     // 根据 type 值创建节点，需特殊处理文本值情况
//     const node = type === 'TEXT_ELEMENT' ? document.createTextNode('') : document.createElement(type)
//     // 添加 props 中的其他属性值
//     Object.keys(props)
//         .filter(prop => prop !== 'children')
//         .forEach(prop => {
//             node[prop] = props[prop];
//         })

//     // 递归处理所有 children
//     children.forEach(child => {
//         render(child, node)
//     })

//     // 将创建好的节点插入容器中
//     container.appendChild(node)
// }

// 利用feiber创建DOM节点
export function createDOM(fiber) {
    const { type, props, props: { children } } = fiber
    // 根据 type 值创建节点，需特殊处理文本值情况
    const dom = type === 'TEXT_ELEMENT' ? document.createTextNode('') : document.createElement(type)
    // 添加 props 中的其他属性值
    Object.keys(props)
        .filter(prop => prop !== 'children')
        .forEach(prop => {
            dom[prop] = props[prop];
        })
    // 返回创建好的DOM节点
    return dom
}

// 下一个任务单元
let nextUnitOfWork = null
// DOM修改记录
let wipRoot = null

export function render(element, container) {
    wipRoot = {
        dom: container,
        props: {
            children: [element],
        }
    }
    nextUnitOfWork = wipRoot
}

export function commitRoot() {
    commitWork(wipRoot)
    wipRoot = null
}

export function commitWork(fiber) {
    if (!fiber) {
        return
    }
    const parentDom = fiber.parent
    parentDom.appendChild(fiber.dom)
    commitWork(fiber.child)
    commitWork(fiber.sibling)
}

export function workLoop(deadline) {
    // 检测是否超时
    let shouldYield = false
    // 下一个任务单元为真且没有超时就循环执行
    while (nextUnitOfWork && !shouldYield) {
        nextUnitOfWork = preformUnitOfWork(nextUnitOfWork)
        // 判断是否还有时间执行耗时任务
        shouldYield = deadline.timeRemaining() < 1
    }
    // 完成workInProgressRoot的所有任务,将变更提交到DOM上
    if (!nextUnitOfWork && wipRoot) {
        commitRoot()
    }
    requestIdleCallback(workLoop)
}

export function preformUnitOfWork(fiber) {
    // 把 element 添加到 DOM 上
    // 为该 fiber 节点的子节点新建 fiber
    // 返回下一个任务单元

    // 把 element 添加到 DOM 上
    if (!fiber.dom) {
        fiber.dom = createDOM(fiber)
    }
    // 浏览器可能会阻断添加节点的过程, 用户看到未完成的UI, 将其抽出
    // if (fiber.parent) {
    //     fiber.parent.dom.appendChild(fiber.dom)
    // }

    // 为每个子节点创建对应的 fiber 节点
    const children = fiber.props.children
    let index = 0
    let prevSibling = null
    while (index < children.length) {
        const child = children[index]

        const newFiber = {
            type: child.type,
            parent: fiber,
            props: child.props,
            dom: null,
        }
        // 判断是否是第一个 fiber 来设置父 fiber 的child
        if (!index) {
            fiber.child = newFiber
        } else {
            prevSibling.sibling = newFiber
        }

        prevSibling = newFiber
        index++
    }

    // 返回下一个任务单元 (fiber)
    if (fiber.children) {
        return fiber.children
    } else {
        let nextFiber = fiber
        while (nextFiber) {
            if (nextFiber.sibling) {
                return nextFiber.sibling
            }
            nextFiber = nextFiber.parent
        }
    }
}

export default {
    createElement,
    render,
}