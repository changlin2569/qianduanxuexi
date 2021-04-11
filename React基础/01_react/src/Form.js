import React, { Component } from 'react'

export default class Form extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: ''
        }
    }
    render() {
        return (
            <div>
                <form onSubmit={this.submitHandle}>
                <div className="username">
                    <label htmlFor="username">用户名：</label>
                    <input id="username" value={this.state.username} onChange={this.userNameChange}></input>
                </div>
                <div className="password">
                    <label htmlFor="password">密码：</label>
                    <input id="password" type="password" value={this.state.password} onChange={this.passWordChange}></input>
                </div>
                <button type="submit">提交</button>
                </form>
            </div>
        )
    }
    userNameChange = (e) => {
        let value = e.target.value;
        if (value.trim()) {
            this.setState({
                username: value
            })
        }
    }
    passWordChange = (e) => {
        let value = e.target.value;
        if (value.trim()) {
            this.setState({
                password: value
            })
        }
    }
    submitHandle = (e) => {
        e.preventDefault();
        console.log(this.state.username + this.state.password);
    }
}
