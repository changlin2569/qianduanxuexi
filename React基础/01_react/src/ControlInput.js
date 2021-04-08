import React, { Component } from 'react'

export default class ControlInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            arr: []
        }
    }
    render() {
        return (
            <div>
                <input value={this.state.value} onChange={this.changeHandle}></input>
                <button onClick={this.clickHandler}>点击创建</button>
                <ul>
                    {
                        this.state.arr && this.state.arr.map((item, index) => {
                            return <li key={index}>{item}</li>
                        })
                    }
                </ul>
            </div>
        )
    }
    changeHandle = (e) => {
        // console.log(e.target.value);
        // 输入框如果第一个字符串无法消除，是因为此方法是异步，所以导致第一个无法消除
        if (e.target.value.trim()) {
            this.setState({
                value: e.target.value
            })
        }
    }
    clickHandler = () => {
        if (this.state.value.trim()) {
            let newArr = [...this.state.arr];
            newArr.push(this.state.value)
            this.setState({
                arr: newArr
            })
            this.setState({
                value: ''
            })
        }
    }
}
