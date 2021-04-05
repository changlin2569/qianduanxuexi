import React from 'react'

class MyBtn extends React.Component {
    render() {
        return <button>{this.props.title}</button>
    }
}

class Hello extends React.Component {
    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props)
    }
    render() {
        return (<div>
            <h1>Hello {this.props.name}</h1>
            <MyBtn title="提交" />
            <MyBtn title="删除" />
            <MyBtn title="修改" />
        </div>)
    }
}

export default Hello