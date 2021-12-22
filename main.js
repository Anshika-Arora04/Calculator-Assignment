let previousOperandElement = document.querySelector(".previousOperand");
let currentOperandElement = document.querySelector(".currentOperand");
let numberElement = document.querySelectorAll(".number");
let operationElement = document.querySelectorAll(".operation");
let plusMinusElement = document.querySelector(".plusMinus");
let squareElement = document.querySelector(".square");
let equalElement = document.querySelector(".equal");
let rootElement = document.querySelector(".root");
let fractionElement = document.querySelector(".fraction");
let allClearElement = document.querySelector(".all-clear");
let deleteElement = document.querySelector(".delete");
let clearLastItem = document.querySelector(".last-entity-clear");
let HistoryElement = document.querySelector(".history-container");
let memoryAddElement = document.querySelector(".memory-add");
let memorySubtractElement = document.querySelector(".memory-deduct");
let memoryStoreElement = document.querySelector(".memory-store");



let currentNumber = '';
let previousNumber = '';
let result = null;
let lastOperation = '';
let haveDecimal = false;
let historyData = [];
let expressionData = '';
let resultData = '';
let memoryData = '';

numberElement.forEach((number) => {
    number.addEventListener('click', (e) => {
        if (e.target.innerText === '.' && !haveDecimal) {
            haveDecimal = true;
        }
        else if (e.target.innerText === '.' && haveDecimal) {
            return;
        }
        currentNumber += e.target.innerText;
        currentOperandElement.innerText = currentNumber;
        console.log();
    });
});

equalElement.addEventListener('click', () => {
    if (!previousNumber || !currentNumber) return;
    haveDecimal = false;
    mathOperation();
    clearVariable();
    currentOperandElement.innerText = result;
    currentNumber = result;
    expressionData = previousOperandElement.innerText;
    resultData = result;
    previousNumber = '';
    historyData.push({ "expression": expressionData, "result": resultData });
    showLog();
    resultData = "";
    expressionData = "";
});

deleteElement.addEventListener('click', () => {
    if (currentNumber.length <= 1) {
        currentOperandElement.innerText = '0';
        currentNumber = 0;
        return;
    }
    currentNumber = currentNumber.slice(0, -1);
    currentOperandElement.innerText = currentNumber;

});

plusMinusElement.addEventListener('click', () => {
    if (currentNumber === '-0') {
        currentNumber = '0';
        return;
    } else if (currentNumber >= 0) {
        currentNumber = currentNumber * (-1);
        currentOperandElement.innerText = currentNumber;
    } else if (currentNumber < 0) {
        currentNumber = currentNumber * (-1);
        currentOperandElement.innerText = currentNumber;
    }
});

squareElement.addEventListener('click', () => {
    previousOperandElement.innerText = 'sqr(' + currentNumber + ')';
    currentNumber = currentNumber * currentNumber;
    currentOperandElement.innerText = currentNumber;
});

rootElement.addEventListener('click', () => {
    previousOperandElement.innerText = '√ (' + currentNumber + ')';
    currentNumber = Math.sqrt(currentNumber);
    currentOperandElement.innerText = currentNumber;

});

fractionElement.addEventListener('click', () => {
    previousOperandElement.innerText = '1 / (' + currentNumber + ')';
    currentNumber = 1 / currentNumber;
    currentOperandElement.innerText = currentNumber;

});

operationElement.forEach((operation) => {
    operation.addEventListener('click', (e) => {
        if (!currentNumber) return;
        haveDecimal = false;

        const operationName = e.target.innerText;
        if (currentNumber && previousNumber && lastOperation) {
            previousNumber = previousNumber.slice(0, -1);
            if (lastOperation != null) {
                lastOperation = currentNumber;
            }
            mathOperation();
        }
        else {
            result = parseFloat(currentNumber);
        }
        clearVariable(operationName);
        lastOperation = operationName;
        console.log(result);
    });
});

function clearVariable(name = '') {
    previousNumber += currentNumber + ' ' + name + ' ';
    previousOperandElement.innerText = previousNumber;
    currentOperandElement.innerText = '';
    currentNumber = '';
}

function mathOperation() {
    if (lastOperation === 'x') {
        result = parseFloat(result) * parseFloat(currentNumber);
    }
    else if (lastOperation === '+') {
        result = parseFloat(result) + parseFloat(currentNumber);
        // result = result.toFixed(2);
    }
    else if (lastOperation === '−') {
        result = parseFloat(result) - parseFloat(currentNumber);
    }
    else if (lastOperation === '÷') {
        result = parseFloat(result) / parseFloat(currentNumber);
    }
    else if (lastOperation === '%') {
        result = parseFloat(result) % parseFloat(currentNumber);
    }
}
allClearElement.addEventListener('click', () => {
    previousOperandElement.innerText = '';
    currentOperandElement.innerText = 0;
    currentNumber = '';
    previousNumber = '';
    result = '';
});

clearLastItem.addEventListener('click', () => {
    currentOperandElement.innerText = 0;
    currentNumber = '';
});

window.addEventListener('keydown', (e) => {
    if (
        e.key === '0' ||
        e.key === '1' ||
        e.key === '2' ||
        e.key === '3' ||
        e.key === '4' ||
        e.key === '5' ||
        e.key === '6' ||
        e.key === '7' ||
        e.key === '8' ||
        e.key === '9' ||
        e.key === '.'
    ) {
        clickButtonElement(e.key);
    } else if (
        e.key === '+' ||
        e.key === '-' ||
        e.key === '%'
    ) {
        clickOperation(e.key);
    }
    else if (e.key === "*") {
        clickOperation('x');
    }
    else if (e.key === "/") {
        clickOperation('÷');
    }
    else if (e.key === 'Enter' || e.key === "=") {
        clickEqual();
    }
});

function clickButtonElement(key) {
    numberElement.forEach(button => {
        if (button.innerText === key) {
            button.click();
        }
    });
}
function clickOperation(key) {
    operationElement.forEach(operation => {
        if (operation.innerText === key) {
            operation.click();
        }
    });
}
function clickEqual() {
    equalElement.click();
}
function showLog() {
    var log = document.getElementById("history");
    var string = "";
    for (var key in historyData) {
        string += "" + historyData[key]["expression"] + " = <br>" + historyData[key]["result"] + "<br><br>";
    }
    log.innerHTML = string;
    // if (string != "") {
    //     // "<h5>There is no history yet.</h5";
    //     log.innerHTML = "There is no history yet.";
    // }
    // else {
    //     log.innerHTML = string;
    // }
}

function resetHistory() {
    historyData = [];
    //var log = document.getElementById("history");
    //log.innerText = " ";
    showLog();
}

function clearMemory() {
    memoryData = '';
    var log = document.getElementById("history");
    log.innerText =  memoryData;
}

memoryStoreElement.addEventListener('click', () => {
    var log = document.getElementById("history");
    memoryData = currentNumber;
    log.innerText = memoryData;
});
memoryAddElement.addEventListener('click', () => {
    var log = document.getElementById("history");
    log.innerText =  parseInt(currentNumber) + parseInt(memoryData);
    memoryData = parseInt(log.innerText);
})

memorySubtractElement.addEventListener('click', () => {
    var log = document.getElementById("history");
    log.innerText = parseInt(memoryData) - parseInt(currentNumber);
    memoryData = parseInt(log.innerText);
})
function showMemory() {
    var log = document.getElementById("history");
    log.innerText = memoryData;
}