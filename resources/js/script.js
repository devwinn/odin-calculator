const numbers = document.getElementsByClassName('number');
const operators = document.getElementsByClassName('operator');
const reset = document.getElementById('reset');


let values = [];
let op;
let num1;
let num2;

reset.addEventListener('click', clear)

for (let i = 0; i < numbers.length; i++) {
    numbers[i].addEventListener('click', getValue);
}

for (let i = 0; i < operators.length; i++) {
    operators[i].addEventListener('click', getOperator);
}

function getValue(e) {
    values.push(parseInt(e.target.dataset.value));


    console.log(values);
}

function getOperator(e) {
    if (e.target.dataset.value === '=') {
        console.log("test op")
    }
    op = e.target.dataset.value;
    console.log(op);
}

function getNumber(numArray) {
    numString = "";
    for (let i = 0; i < numArray.length; i++) {
        numString += numArray[i];
    }
    return parseFloat(numString);
}

function clear() {
    values = [];
    op = undefined;
    console.log(values);
    console.log(op);
}

function evaluate(firstNum, secondNum, op) {
    let final;
    if (op === "+") {
        final = firstNum + secondNum;
    } else if (op === "-") {
        final = firstNum - secondNum;
    } else if (op === "*") {
        final = firstNum * secondNum;
    } else {
        final = firstNum / secondNum;
    }

    return final;
}