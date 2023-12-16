const displayText = document.getElementById('display-text');
const equals = document.getElementsByClassName('equals-operator');
const numbers = document.getElementsByClassName('number');
const operators = document.getElementsByClassName('operator');
const reset = document.getElementById('reset');


let values = [];

let operator;
let num1;
let num2;


// on 'C' click, reset calc values and display -- G2G
reset.addEventListener('click', clear)

// add event listener for equals operation
equals[0].addEventListener('click', getEquals);

// add event listener to numbers -- G2G
for (let i = 0; i < numbers.length; i++) {
    numbers[i].addEventListener('click', getValue);
}

// add event listener to operators -- G2G
for (let i = 0; i < operators.length; i++) {
    operators[i].addEventListener('click', getOperator);
}

//function to reset calc backend variables and display --G2G
function clear() {
    values = [];
    operator = undefined;
    num1 = undefined;
    num2 = undefined;
    displayText.innerHTML = '';
    console.log("clear");
}

// gets value of button pressed to add to values array -- G2G
function getValue(e) {
    values.push(parseFloat(e.target.dataset.value));
    displayNum();
}

// uses values array to combine numbers used for calculation -- G2G
function getNumber(numArray) {
    numString = "";
    for (let i = 0; i < numArray.length; i++) {
        numString += numArray[i];
    }
    return parseFloat(numString);
}

// updates display using values display -- G2G ????????/
function displayNum() {
    if (operator) {

    }
    displayNum = getNumber(values);
    displayText.innerHTML = `${displayNum}`;
}


// fix equals case so calc can continue after operator called
// will need to update num1 and num 2 values in this case

// made some changes need continued updates getting closer on = after multiple operations

//need to fix bug for case 3 where if operator is pressed twice num2 is NAN or not correct
function getOperator(e) {

    //console.log(typeof operator);

    //console.log(`operator clicked ${operator}`)
    if (num2 === undefined) {
        operator = e.target.dataset.value
        num1 = getNumber(values);
        console.log(`num1 = ${num1} ${operator}`)
        console.log("case 2");
        num2 = NaN;
        values = [];
    } else {
        if (operator === '=') {
            num1 = num2;
            num2 = getNumber(values);
            operator = e.target.dataset.value;
        } else {
            console.log("case 3");
            console.log(`operator ${operator}`)

            num2 = getNumber(values);
            shiftNum(num1, num2, operator);
            operator = e.target.dataset.value
        }
    }
}

function getEquals(e) {
    console.log('running getEquals()');
    if (num2 === undefined || isNaN(num2)) {
        console.log("num2 not ready");
    } else {

        num2 = getNumber(values);
        shiftNum(num1, num2, operator);
        operator = e.target.dataset.value;
    }
}




function operate(firstNum, secondNum, op) {
    let final;

    console.log(`operate in progress... operator ${op}`)
    if (op === "+") {
        console.log("adding");
        final = firstNum + secondNum;
    } else if (op === "-") {
        console.log("subtracting")
        final = firstNum - secondNum;
    } else if (op === "x") {
        console.log("multiplying");
        final = firstNum * secondNum;
    } else {
        console.log("dividing");
        if (num1 === 0 || num2 === 0) {
            clear();
            displayText.innerHTML = "err";
        } else {
            final = firstNum / secondNum;
        }
    }

    return final;
}



function shiftNum(firstNum, secondNum, op) {
    console.log(`Before : num1 = ${num1} \n | num2 = ${num2} `);

    values = [operate(firstNum, secondNum, op)];

    displayNum();

    if (op === '=') {
        num2 = values[0]
        num1 = 0;
        values = [];
    } else {
        num1 = values[0]
        num2 = 0;
        values = [];
    }

    console.log(`After : num1 = ${num1}\n | num2 = ${num2} | \nvalues = ${values}`)

}

