import MyReact from "./js/MyReact";



const container = document.querySelector('#root')

/** @jsx MyReact.createElement */
const updateValue = e => {
    rerender(e.target.value)
}

const rerender = value => {
    const element = (
        <div>
            <input onInput={updateValue} value={value} />
            <h2>Hello {value}</h2>
        </div>
    )
    MyReact.render(element, container)
}

rerender('React')
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