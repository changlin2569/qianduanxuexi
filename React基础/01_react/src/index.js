// 项目的入口文件
import React from 'react';
import ReactDOM from 'react-dom';
import ControlInput from './ControlInput.js';
import Form from './Form.js';
import Hello from './Hello.js';
import LifeCycle from './LifeCycle'
import NotControlInput from './NotControlInput.js';

// let person = {
//     name: 'cl',
//     age: 18
// };
// let el = <h1>Hello {person.name}</h1>;

// function create(person) {
//     return <h1>Hello {person.name}</h1>
// }

// let arr = [1, 2, 3, 4];
// let ul = <ul>
//     {arr.map((item, index) => {
//         return <li key={index}>{item}</li>;
//     })}
// </ul>;
// ReactDOM.render(ul, document.querySelector('#root'));

// 函数式组件
function Welcome(props) {
    return <h1>Welcome {props.name}</h1>
}

// ReactDOM.render(<Welcome name="cl" />, document.querySelector('#root'));

// 类声明
// class Hello extends React.Component {
//     constructor(props) {
//         super(props)
//     }
//     render() {
//         return <h1>Hello {this.props.name}</h1>
//     }
// }

// ReactDOM.render(<Hello name="cl" />, document.querySelector('#root'));
// ReactDOM.render(<LifeCycle />, document.querySelector('#root'));
// ReactDOM.render(<ControlInput />, document.querySelector('#root'));
// ReactDOM.render(<NotControlInput />, document.querySelector('#root'));
ReactDOM.render(<Form />, document.querySelector('#root'));