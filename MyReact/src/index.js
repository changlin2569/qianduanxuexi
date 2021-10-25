import MyReact from "./js/MyReact";


// function Counter() {
//     const [state, setState] = MyReact.useState(1)
//     return (
//         <h1 onClick={() => setState(c => c + 1)}>
//             Count: {state}
//         </h1>
//     )
// }
// const element = <Counter />
// const container = document.getElementById("root")
// MyReact.render(element, container)




/** @jsx MyReact.createElement */
function App(props) {
    return <h1 onClick={() => console.log("hello")}>Hello {props.name}</h1>
}
const element = <App name="React" />
const container = document.getElementById("root")
MyReact.render(element, container)


// /** @jsx MyReact.createElement */
// const container = document.querySelector('#root')
// const updateValue = e => {
//     rerender(e.target.value)
// }
// const rerender = value => {
//     const element = (
//         <div>
//             <input onInput={updateValue} value={value} />
//             <h2>Hello {value}</h2>
//         </div>
//     )
//     MyReact.render(element, container)
// }

// rerender('React')



// const ele = (<div title="foo">
//     <span>hello react</span>
//     <button value="react">react</button>
// </div>)



// const ele = MyReact.createElement('div',
//     { title: 'foo' },
//     MyReact.createElement('span', null, 'hello react'),
//     MyReact.createElement('button', { value: 'react' })
// )

// console.log(container);
// console.log(ele);
// MyReact.render(ele, container)