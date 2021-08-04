import React, { Component } from 'react'
import WrappedHorizontalLoginForm from './AntdForm'
import MyForm from './MyForm'

export default class App extends Component {
  render() {
    return (
      <div>
        <WrappedHorizontalLoginForm></WrappedHorizontalLoginForm>
        <MyForm></MyForm>
      </div>
    )
  }
}
