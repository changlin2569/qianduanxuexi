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
    const { type, props } = fiber
    // 根据 type 值创建节点，需特殊处理文本值情况
    const dom = type === 'TEXT_ELEMENT' ? document.createTextNode('') : document.createElement(type)
    // 添加 props 中的其他属性值
    updateDOM(dom, {}, props)
    // Object.keys(props)
    //     .filter(prop => prop !== 'children')
    //     .forEach(prop => {
    //         dom[prop] = props[prop];
    //     })
    // 返回创建好的DOM节点
    return dom
}

// 下一个任务单元
let nextUnitOfWork = null
// DOM修改记录
let wipRoot = null
// 上次提交到 DOM 节点的 fiber树
let currentRoot = null
// 需要一个数组来保存需要移除的旧节点
let deletions = null

export function render(element, container) {
    wipRoot = {
        dom: container,
        props: {
            children: [element],
        },
        // 对于旧 fiber 节点的引用
        alternate: currentRoot,
    }
    deletions = []
    nextUnitOfWork = wipRoot
    // requestIdleCallback(workLoop)
}

// 是否为节点属性
// const isProperty = key => key !== 'children'
const isEvent = key => key.startsWith('on')
const isProperty = key => key !== 'children' && !isEvent(key)
// 新的节点属性
const isNew = (prevProps, nextProps) => key => prevProps[key] !== nextProps[key]
// 旧的节点属性
const isGone = (prevProps, nextProps) => key => !(key in nextProps)

export function updateDOM(dom, prevProps, nextProps) {
    // 对于事件属性，专门做处理
    Object.keys(prevProps)
        .filter(isEvent)
        .filter(key => {
            return isGone(prevProps, nextProps)(key) || isNew(prevProps, nextProps)(key)
        }).forEach(key => {
            const eventName = key.toLowerCase().substring(2)
            dom.removeEventListener(eventName, prevProps[key])
        })

    // 移除旧的节点属性
    Object.keys(prevProps)
        .filter(isProperty)
        .filter(isGone(prevProps, nextProps))
        .forEach(oldKey => dom[oldKey] = '')

    // 添加新的节点属性
    Object.keys(nextProps)
        .filter(isProperty)
        .filter(isNew(prevProps, nextProps))
        .forEach(newKey => dom[newKey] = nextProps[newKey])

    // 添加新事件
    Object.keys(nextProps)
        .filter(isEvent)
        .filter(isNew(prevProps, nextProps))
        .forEach(key => {
            const eventName = key.toLowerCase().substring(2)
            dom.addEventListener(eventName, nextProps[key])
        })
}

export function commitRoot() {
    deletions.forEach(commitWork)
    commitWork(wipRoot.child)
    currentRoot = wipRoot
    wipRoot = null
}

export function commitWork(fiber) {
    if (!fiber) {
        return
    }
    const parentDom = fiber.parent.dom
    if (fiber.effectTag === 'PLACEMENT' && fiber.dom !== null) {
        parentDom.appendChild(fiber.dom)
    } else if (fiber.effectTag === 'UPDATE' && fiber.dom !== null) {
        updateDOM(fiber.dom, fiber.alternate.props, fiber.props)
    } else if (fiber.effectTag === 'DELETION') {
        parentDom.removeChild(fiber.dom)
    }
    // parentDom.appendChild(fiber.dom)
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
    // 完成workInProgressRoot的所有任务,将变更提交到 DOM上
    if (!nextUnitOfWork && wipRoot) {
        commitRoot()
    }
    requestIdleCallback(workLoop)
}

requestIdleCallback(workLoop)

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
    reconcileChildren(fiber, children)

    // 返回下一个任务单元 (fiber)
    if (fiber.child) {
        return fiber.child
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

export function reconcileChildren(wipFiber, children) {
    let index = 0
    let oldFiber = wipFiber.alternate && wipFiber.alternate.child
    let prevSibling = null
    while (index < children.length || oldFiber) {
        const child = children[index]
        let newFiber = null
        const sameType = oldFiber && child && child.type === oldFiber.type

        // 新老节点 type 相同 复用 修改属性
        if (sameType) {
            newFiber = {
                type: oldFiber.type,
                props: child.props,
                parent: oldFiber.parent,
                alternate: oldFiber,
                dom: oldFiber.dom,
                effectTag: 'UPDATE'
            }
        }
        // 新老节点type不同 创建新节点
        if (child && !sameType) {
            newFiber = {
                type: child.type,
                props: child.props,
                parent: wipFiber,
                dom: null,
                alternate: null,
                effectTag: 'PLACEMENT'
            }
        }
        // 老节点存在且type不同 移除旧节点
        if (oldFiber && !sameType) {
            oldFiber.effectTag = 'DELETION'
            deletions.push(oldFiber)
        }
        // const newFiber = {
        //     type: child.type,
        //     parent: wipFiber,
        //     props: child.props,
        //     dom: null,
        // }
        // 判断是否是第一个 fiber 来设置父 fiber 的child
        if (!index) {
            wipFiber.child = newFiber
        } else {
            prevSibling.sibling = newFiber
        }

        prevSibling = newFiber
        index++
    }
}

export default {
    createElement,
    render,
}