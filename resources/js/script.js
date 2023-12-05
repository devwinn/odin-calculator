const displayText = document.getElementById('display-text');
const numbers = document.getElementsByClassName('number');
const operators = document.getElementsByClassName('operator');
const reset = document.getElementById('reset');


let values = [];
let op;
let num1 = 0;
let num2 = 0;

reset.addEventListener('click', clear)

for (let i = 0; i < numbers.length; i++) {
    numbers[i].addEventListener('click', getValue);
}

for (let i = 0; i < operators.length; i++) {
    operators[i].addEventListener('click', getOperator);
}

function getValue(e) {
    values.push(parseFloat(e.target.dataset.value));
    displayNum();

    console.log(values);
}

function getOperator(e) {
    if (e.target.dataset.value === '=') {
        num2 = getNumber(values);
        console.log(num2);
        values = [operate(num1, num2, op)];
        console.log(values);
        displayNum();
        console.log("test = op")
    } else {
        op = e.target.dataset.value;
        num1 = getNumber(values);
        console.log(`num1 = ${num1} ${op}`)
        console.log(op);
        values = [];
    }


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
    displayText.innerHTML = 0;
}

function operate(firstNum, secondNum, op) {
    let final;
    if (op === "+") {
        final = firstNum + secondNum;
    } else if (op === "-") {
        final = firstNum - secondNum;
    } else if (op === "x") {
        final = firstNum * secondNum;
    } else {
        if (num1 === 0 || num2 === 0) {
            clear();
            displayText.innerHTML = "err";
        } else {
            final = firstNum / secondNum;
        }
    }

    return final;
}

function displayNum() {
    display = getNumber(values);
    displayText.innerHTML = `${display}`;
}