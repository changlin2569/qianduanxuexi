import React from 'react'

class Test extends React.Component {
    componentWillReceiveProps(newProps) {
        console.log("8：父组件更新，props改变：", newProps);
    }

    render() {
        return (<h2>{this.props.count}</h2>)
    }
}

export default class LifeCycle extends React.Component {
    static defaultProps = {
        name: 'cl',
        age: 18
    }

    constructor(props) {
        console.log("1：执行构造函数阶段");
        super(props)
        this.state = {
            count: 0
        }
    }

    componentWillMount() {
        console.log("2：组件准备挂载阶段");
    }

    componentDidMount() {
        // 后端获取数据，更新视图
        console.log("4：组件挂载完成");
    }

    shouldComponentUpdate(nextProps, nextState) {
        // 这个事件主要用做性能优化
        console.log("5：当状态变化时是否更新组件事件");
        // 显示的返回true或false判断是否更新
        if (nextState.count % 2 === 0) {
            return true;
        } else {
            return false;
        }
    }

    componentWillUpdate() {
        console.log("6：组件将要更新");
    }

    componentDidUpdate() {
        // console.log(arguments);
        console.log("7：组件更新完成");
    }

    componentWillUnmount() {
        console.log("9：组件卸载完成");
    }
    
    render() {
        console.log("3：将虚拟DOM转化为真实DOM");
        return (<div>
            <h1>当前count值：{this.state.count}</h1>
            <button onClick={this.clickHandler}>点击+1</button>
            <Test count={this.state.count}></Test>
        </div>)
    }

    clickHandler = () => {
        this.setState((prevState, prevProps) => ({
            count: prevState.count + 1
        }))
    }
}