import React from 'react';
import ReactDOM from 'react-dom';
// import App from './App';
import ChangeCount from './ChangeCount'
import store from './store/index';
import { Provider } from 'react-redux'

function render() {
  ReactDOM.render(
    <Provider store={store}>
      <ChangeCount />
    </Provider>,
    document.getElementById('root')
  );
}

render()
// 订阅  监听  每当store数据变化时通知render
store.subscribe(render)