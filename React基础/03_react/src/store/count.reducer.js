function count(state = 0, action) {
    if (action.type === 'add') {
        return state + 1;
    } else if (action.type === 'sub') {
        return state - 1;
    } else {
        return state;
    }
}

export const mapStateToProps = state => {
    return {
        num: state
    }
}

// 异步操作使用thunk中间件
const asyncAdd = () => {
    return dispatch => {
        setTimeout(() => {
            dispatch({
                type: 'add'
            })
        }, 1000)
    }
}

export const mapDispatchToProps = dispatch => {
    return {
        addHandle: () => {
            dispatch({
                type: 'add'
            })
        },
        subHandle: () => {
            dispatch({
                type: 'sub'
            })
        },
        // 异步操作
        // asyncAdd: () => {
        //     dispatch(() => {
        //         setTimeout(() => {
        //             dispatch({
        //                 type: 'add'
        //             })
        //         }, 1000)
        //     })
        // }
        asyncAdd: () => {
            dispatch(asyncAdd())
        }
    }
}

export default count