var number1 = "";
var number2 = "";
var operator = "";

var isDot = false;
var equaled = false;

let digits = document.querySelector(".digits")
let operators = document.querySelector(".operators")
let clear = document.querySelector(".clear")
let del = document.querySelector(".del")
let equals = document.querySelector(".equals")
let mainText = document.querySelector(".mainText")
let subText = document.querySelector(".subText")

digits.addEventListener('click', (event) => {
    if (event.target.tagName !== 'BUTTON') {
        return;
    }

    if (equaled && operator === "") {
        clearAll();
        equaled = false;
    }

    if (event.target.textContent === "." && isDot) {
        return
    }

    if (event.target.textContent === ".") {
        isDot = true;
    }

    if (operator === "") {
        mainText.textContent += event.target.textContent;
        number1 += event.target.textContent;
        return;
    }

    if (number2 === "") {
        mainText.textContent += event.target.textContent;
        number2 += event.target.textContent;
        

        subText.textContent = operate(operator, number1, number2)
        return;
    }

    number2 += event.target.textContent;
    mainText.textContent += event.target.textContent;

    subText.textContent = operate(operator, number1, number2)
})

operators.addEventListener('click', (event) => {
    if (event.target.tagName !== 'BUTTON') {
        return;
    }

    if (event.target.textContent == "=") {
        return;
    }

    mainText.textContent += event.target.textContent;

    if (operator === ""){
        operator = event.target.textContent;
        isDot = false;
        
        return
    }

    let output = operate(operator, number1, number2);
    number1 = output;
    number2 = "";
    isDot = false;
    operator = event.target.textContent;
})

clear.addEventListener('click', (event) => {
    if (event.target.tagName !== 'BUTTON') {
        return;
    }

    clearAll();
})

del.addEventListener('click', (event) => {
    if (event.target.tagName !== 'BUTTON') {
        return;
    }


    if (number2 === "" && number1 !== "" && operator === "") {
        number1 = number1.substring(0, number1.length - 1);
        mainText.textContent = mainText.textContent.substring(0, mainText.textContent.length - 1);
       
        return;
    }

    if (number2 !== ""){
        mainText.textContent = mainText.textContent.substring(0, mainText.textContent.length - 1);

        number2 = number2.substring(0, number2.length - 1);
        if (number2 === "") {
            subText.textContent = "";
        } else {
            subText.textContent = operate(operator, number1, number2);
        }
    }
})

clearAll = () => {
    mainText.textContent = "";
    subText.textContent = "";
    clearVals();
}

clearVals = () => {
    operator = "";
    number1 = "";
    number2 = "";
    isDot = false;
}

equals.addEventListener('click', (event) => {
    if (event.target.tagName !== 'BUTTON') {
        return;
    }

    let output = operate(operator, number1, number2)
    clearVals();
    mainText.textContent = output;
    number1 = output
    equaled = true;

    subText.textContent = ""
})


let add = (num1, num2) => {
    return num1 + num2;
}

let subtract = (num1, num2) => {
    return num1 - num2;
}

let multiply = (num1, num2) => {
    return num1 * num2;
}

let divide = (num1, num2) => {
    if (num1 === 0 || num2 === 0){
        return 0;
    }
    return Math.round((num1 / num2)*100)/100;
}

let operate = (operator, num1, num2) => {
    num1 = Number(num1)
    num2 = Number(num2)

    if (operator === "+") {
        return add(num1, num2)
    } else if (operator === "-") {
        return subtract(num1, num2)
    } else if (operator === "*") {
        return multiply(num1, num2)
    } else if (operator === "/") {
        return divide(num1, num2)
    }
}

