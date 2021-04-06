import React from 'react'
import './Hello.css'

class MyBtn extends React.Component {
    render() {
        return <button>{this.props.title}</button>
    }
}

class Hello extends React.Component {
    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props)
        this.user = {
            avatar: './favicon.ico',
            name: 'cl',
            content: 'hello world',
            date: new Date().toLocaleString(),
        }
    }
    render() {
        return (<div>
            <h1>Hello {this.props.name}</h1>
            <MyBtn title="提交" />
            <MyBtn title="删除" />
            <MyBtn title="修改" />
            <Comment user={this.user} add={this.add}></Comment>
        </div>)
    }
    add(val) {
        console.log(val)
    }
}

class Comment extends React.Component {
    render() {
        return (<div className="comment">
            {/* <UserInfo avatar={this.props.user.avatar} name={this.props.user.name}></UserInfo> */}
            <UserInfo {...this.props.user}></UserInfo>
            <div className="comment-content">{this.props.user.content}</div>
            <div className="comment-date">{this.props.user.date}</div>
            <button onClick={this.clickHandler}>子组件传父组件</button>
        </div>)
    }
    clickHandler = () => {
        this.props.add('我是子组件')
    }
}

class UserInfo extends React.Component {
    render() {
        return (<div className="userInfo">
            <Avatar avatar={this.props.avatar}></Avatar>
            <div className="comment-name">{this.props.name}</div>
        </div>)
    }
}

class Avatar extends React.PureComponent {
    render() {
        return (
            <img src={this.props.avatar} alt="" />
        )
    }
}

export default Hello