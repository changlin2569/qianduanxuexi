import MyReact from "./js/MyReact";

/** @jsx MyReact.createElement */
const ele = (<div title="foo">
    <span>hello react</span>
    <button value="react">react</button>
</div>)

// const ele = MyReact.createElement('div',
//     { title: 'foo' },
//     MyReact.createElement('span', null, 'hello react'),
//     MyReact.createElement('button', { value: 'react' })
// )

const container = document.querySelector('#root')
console.log(container);

console.log(ele);

MyReact.render(ele, container)