import React, { Component } from 'react'
// import store from './store'
import { connect } from 'react-redux'
import { mapStateToProps, mapDispatchToProps } from './store/count.reducer'


class ChangeCount extends Component {
    // addHandle = () => {
    //     store.dispatch({
    //         type: 'add'
    //     })
    // }
    // subHandle = () => {
    //     store.dispatch({
    //         type: 'sub'
    //     })
    // }
    render() {
        return (
            <div>
                <h3>{this.props.num}</h3>
                <button onClick={this.props.addHandle}>+1</button>
                <button onClick={this.props.subHandle}>-1</button>
                <button onClick={this.props.asyncAdd}>异步+1</button>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChangeCount)