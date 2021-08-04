import React, { Component } from 'react'
import './ToBody.css'

export default class ToBody extends Component {
    constructor(props) {
        super(props)
        this.state = {
            finishList: []
        }
    }
    finishHandle = (e) => {
        const { tagName, value, checked } = e.target
        if (tagName !== 'INPUT') {
            return
        }
        this.props.updateList(value, checked)
    }
    render() {
        return (
            <div className="container">
                <p>正在进行：</p>
                <ul className="list-group" onClick={this.finishHandle}>
                    {this.props.list.map((item, index) => {
                        if (!item.finished) {
                            return (
                                <li key={index}>
                                    <input className="toggle" type="checkbox" value={item.val} defaultChecked={item.finished}></input>
                                    <span>{item.val}</span>
                                    <button>删除</button>
                                </li>)
                        }
                        return false
                    })}
                </ul>
                <p>已经完成：</p>
                <ul className="list-group" onClick={this.finishHandle}>
                    {this.props.list.map((item, index) => {
                        if (item.finished) {
                            return (
                                <li key={index}>
                                    <input className="toggle" type="checkbox" value={item.val} defaultChecked={item.finished}></input>
                                    <span>{item.val}</span>
                                    <button>删除</button>
                                </li>)
                        }
                        return false
                    })}
                </ul>
            </div>
        )
    }
}
