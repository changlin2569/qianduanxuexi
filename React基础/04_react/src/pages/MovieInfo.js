import React, { Component } from 'react'

export default class MovieInfo extends Component {
    render() {
        const { match: { params: { name } } } = this.props
        return (
            <div>
                这是{name}详情
                <button onClick={() => this.props.history.goBack()}>返回上一级</button>
                <button onClick={() => { console.log(this.props.history.push('/')) }}>返回首页</button>
            </div>
        )
    }
}
