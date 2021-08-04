import React, { Component } from 'react'
import './ToHeader.css';

export default class ToHeader extends Component {
    // constructor(props) {
    //     super(props)
    //     this.state = {
    //         val: ''
    //     }
    // }
    handleDown = (e) => {
        const keyCode = e.keyCode
        const val = e.target.value
        if (keyCode === 13 && val.trim().length) {
            this.props.addItem(val)
            e.target.value = ''
        }
    }
    render() {
        return (
            <div className="header">
                <span>MyTodoList：</span>
                <input type="text" onKeyDown={this.handleDown}></input>
            </div>
        )
    }
}
