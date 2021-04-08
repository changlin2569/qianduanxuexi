import React, { Component } from 'react'

export default class NotControlInput extends Component {
    constructor(props) {
        super(props)
        this.state = {
            value: ''
        }
    }
    render() {
        return (
            <div>
                <input onChange={this.changeHandle} ref="inputRef"></input>
                <h1>{this.state.value}</h1>
            </div>
        )
    }
    changeHandle = () => {
        // console.log(this.refs.inputRef.value);
        let value = this.refs.inputRef.value;
        // if (value.trim()) {
            this.setState({
                value
            })
            // console.log(this.state.value);
        // }
    }
}
