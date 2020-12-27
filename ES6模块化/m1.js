let a = 1;
let b = 2;
let c = 3;

function test() {
    console.log(4);
};

export default {
    a,
    b,
    test,
};

export let x = 11;
export let y = 12;
export function show() {
    console.log(13);
};
