import React from 'react'
import './Hello.css'

export default class Hello extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            count: 0
        }
        // 修改this指向的第二种方式，bind
        // this.addHandler = this.addHandler.bind(this)
    }
    render() {
        return (
            <div>
                <h1>{this.state.count}</h1>
                <button onClick={this.addHandler}>点击+1</button>
                {/* 第三种改变this指向 */}
                {/* <button onClick={(e) => {this.addHandler(e)}}>点击+1</button> */}
            </div>
        )
    }
    // 修改this指向的第一种方式，箭头函数
    addHandler = () => {
        // this.setState这种更新状态是异步操作
        // this.setState({
        //     count: this.state.count + 1
        // })

        // 若想同步获取更新后的数据，向其中传入两个参数
        this.setState((prevState, prevProps) => {
            console.log(prevState);
            console.log(prevProps);
            return {
                count: prevState.count + 1
            }
        },() => {
            console.log(this.state.count);
        })
    }

    // 第二种bind
    // addHandler() {
    //     this.setState({
    //         count: this.state.count + 1
    //     })
    // }

    // 第三种，箭头函数嵌套，此方式还可拿到事件对象
    // addHandler(e) {
    //     console.log(e);
    //     this.setState({
    //         count: this.state.count + 1
    //     })
    // }
}