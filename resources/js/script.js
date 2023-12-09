const displayText = document.getElementById('display-text');
const numbers = document.getElementsByClassName('number');
const operators = document.getElementsByClassName('operator');
const reset = document.getElementById('reset');


let values = [];

let operator;
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
    values.push(parseFloat(e.target.dataset.value));
    displayNum();

    console.log(values);
}


// fix equals case so calc can continue after operator called
// will need to update num1 and num 2 values in this case

//need to fix bug for case 3 where if operator is pressed twice num2 is NAN or not correct
function getOperator(e) {

    console.log(`operator clicked ${operator}`)
    if (e.target.dataset.value === '=') {
        if (operator === undefined) {
            console.log("operator undefined")
        } else {
            console.log("case 1");
            num2 = getNumber(values);
            console.log(num2);
            values = [operate(num1, num2, operator)];
            console.log(values);
            displayNum();
        }

        console.log("test =(equals) operator")
    } else if (num2 === undefined) {
        operator = e.target.dataset.value;
        num1 = getNumber(values);
        console.log(`num1 = ${num1} ${operator}`)
        console.log("case 2");
        num2 = 0;
        values = [];
    } else {
        console.log("case 3");
        console.log(`operator ${operator}`)
        num2 = getNumber(values);
        console.log(`num1 = ${num1} | num2 = ${num2} `);
        values = [operate(num1, num2, operator)];

        displayNum();
        num1 = values[0]
        num2 = 0;
        values = [];
        console.log(`num1 ${num1} | num2 ${num2} | values ${values}`)
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
    operator = undefined;
    num1 = 0;
    num2 = 0;
    displayText.innerHTML = 0;
}

function operate(firstNum, secondNum, operator) {
    let final;
    if (operator === "+") {
        final = firstNum + secondNum;
    } else if (operator === "-") {
        final = firstNum - secondNum;
    } else if (operator === "x") {
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