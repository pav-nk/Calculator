
// DOM elements
const inputWindow = document.querySelector('#input-field');
const memoryWindow = document.querySelector('#memory-field');
const numberElements = document.querySelectorAll('[data-number]');
const operatorElements = document.querySelectorAll('[data-operator]');
const equallyButton = document.querySelector('#equally-button');
const clearButton = document.querySelector('#clear-button');
const deleteButton = document.querySelector('#delete-button');

const state = {
    currentNumericValue: '0',
    firstOperand: 0,
    secondOperand: 0,
    currentOperator: null,
    resultCalc: 0,
};

const sum = function (num1, num2) {
    return num1 + num2;
};

const subtract = function (num1, num2) {
    return num1 - num2;
};

const multiply = function (num1, num2) {
    return num1 * num2;
};

const divide = function (num1, num2) {
    if (num2 === 0) {
        resetCalc();
        throw new Error('Error: it is impossible to divide by zero!');
    }
    return num1 / num2;
};

const operate = (num1, num2, operator) => {
    switch (operator) {
        case '+':
            return sum(num1, num2);
        case '-':
            return subtract(num1, num2);
        case '*':
            return multiply(num1, num2);
        case '/':
            return divide(num1, num2);
        default:
            return sum(num1, num2);
    }
};

const updateInputWindow = (value) => {
    inputWindow.textContent = value;
}

const updateMemoryWindow = (value) => {
    memoryWindow.textContent = value;
}

const resetCalc = () => {
    state.firstOperand = 0;
    state.secondOperand = 0;
    state.currentNumericValue = '0';
    state.resultCalc = 0;
    updateInputWindow(state.currentNumericValue);
    updateMemoryWindow('');
}

const enterNumericValue = (event) => {
    if (state.currentNumericValue === '0') state.currentNumericValue = '';
    state.currentNumericValue += event.target.dataset.number;
    updateInputWindow(state.currentNumericValue);
}

const performOperation = (event) => {
    const operator = event.target.dataset.operator;
    state.currentOperator = operator;
    if (!state.resultCalc && !state.firstOperand) {
        state.firstOperand = Number(state.currentNumericValue);
        updateMemoryWindow(`${state.firstOperand} ${state.currentOperator}`);
        state.currentNumericValue = '';
    } else if (state.firstOperand && !state.resultCalc) {
        getResultCalculations();
    }

    if (!state.firstOperand && state.resultCalc) {
        state.firstOperand = state.resultCalc;
        state.resultCalc = 0;
        updateMemoryWindow(`${state.firstOperand} ${state.currentOperator}`);
    }
    console.log(state);
}

const resetStateValues = (result) => {
    state.resultCalc = result;
    state.firstOperand = 0;
    state.secondOperand = 0;
    state.currentNumericValue = '0';
}

const getResultCalculations = () => {
    state.secondOperand = Number(state.currentNumericValue);
    const { firstOperand, secondOperand, currentOperator } = state;
    const result = operate(firstOperand, secondOperand, currentOperator)
    updateInputWindow(result);
    updateMemoryWindow(`${firstOperand} ${currentOperator} ${secondOperand === 0 ? '' : secondOperand + ' ' + '='}`);
    resetStateValues(result);
};

const deleteCurrentValue = () => {
    resetStateValues(0);
    updateInputWindow(state.currentNumericValue);
}

const assignEventListeners = () => {
    numberElements.forEach((element) => {
        element.addEventListener('click', enterNumericValue);
    });
    operatorElements.forEach((element) => {
        element.addEventListener('click', performOperation);
    });
    clearButton.addEventListener('click', resetCalc);
    equallyButton.addEventListener('click', getResultCalculations);
    deleteButton.addEventListener('click', deleteCurrentValue);
};

const runApp = () => {
    assignEventListeners();
};

runApp();
