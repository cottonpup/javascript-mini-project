/*
 User can see a display showing the current number entered or the result of the last operation. ✅
 User can see an entry pad containing buttons for the digits 0-9, operations - '+', '-', '/', and '=', a 'C' button (for clear), and an 'AC' button (for clear all).
 User can enter numbers as sequences up to 8 digits long by clicking on digits in the entry pad. Entry of any digits more than 8 will be ignored.
 User can click on an operation button to display the result of that operation on:
    the result of the preceding operation and the last number entered OR
    the last two numbers entered OR
    the last number entered
 User can click the 'C' button to clear the last number or the last operation. If the users last entry was an operation the display will be updated to the value that preceded it.
 User can click the 'AC' button to clear all internal work areas and to set the display to 0.
 User can see 'ERR' displayed if any operation would exceed the 8 digit maximum.
 User can click a '+/-' button to change the sign of the number that is currently displayed.
 User can see a decimal point ('.') button on the entry pad to that allows floating point numbers up to 3 places to be entered and operations to be carried out to the maximum number of decimal places entered for any one number.
*/

// function Calculator() {

// }
// Calculator.prototype.clearAllHistory = function () {
//     this.inputHistory = [];
//     this.updateInputDisplay();
//     this.outputDisplay('0');
// }

// const instance1 = new Calculator(null, null);
// instance1.inputDisplay;

// const yG = new Name('영경', 'Renato');
// const renato = new Name('Renato', '영경');
// yG.species; // undefined
// renato.species; // undefined
// Name.species; // 'human'

// class Name {
//     static species = 'human';
//     constructor(name, baby) {
//         this.name = name;
//         this.lover = baby;
//     }
// }

// const yG = new Name('영경', 'Renato');

// // spread (for arrays only)
// let arr = ['영경', 'Renato'];
// const yG1 = new Name(arr[0], arr[1]);
// const yG2 = new Name(...arr);

// // join (for arrays only) between the elements
// arr = ['영경', 'Renato', 345, 'Berry'];
// const result1 = arr.join(' ');
// const result2 = arr[0] + ' ' + arr[1] + ' ' + arr[2] + ' ' + arr[3];

// // pop (for arrays only)
// const element1 = arr.pop(); // 'Berry'
// const element2 = arr.pop(); // 345

class Calculator {
    constructor(input, output) {
        this.inputDisplay = input;
        this.outputDisplay = output;
        this.inputHistory = [];
    }

    clearAllHistory() {
        this.inputHistory = [];
        this.updateInputDisplay();
        this.updateOutputDisplay('0');
    }

    backspace() {
        switch (this.getLastInputType()) {
            case 'number':
                if (this.getLastInputValue().length > 1) {
                    this.editLastInput(this.getLastInputValue().slice(0, -1), 'number');
                } else {
                    this.deleteLastInput();
                }
                break;
            case 'operator':
                this.deleteLastInput();
                break;
            default:
                return;
        }
    }

    changePercentToDecimal() {
        if (this.getLastInputType() === 'number') {
            this.editLastInput(this.getLastInputValue() / 100, 'number');
        }
    }

    insertNumber(value) {
        if (this.getLastInputType() === 'number') {
            this.appendToLastInput(value);
        } else if (this.getLastInputType() === 'operator' || this.getLastInputType() === null) {
            this.addNewInput(value, 'number');
        }
    }

    insertOperation(value) {
        switch (this.getLastInputType()) {
            case 'number':
                this.addNewInput(value, 'operator');
                break;
            case 'operator':
                this.editLastInput(value, 'operator');
                break;
            case 'equals':
                let output = this.getOutputValue();
                this.clearAllHistory();
                this.addNewInput(output, 'number');
                this.addNewInput(value, 'operator');
                break;
            default:
                return;
        }
    }

    negateNumber() {
        if (this.getLastInputType() === 'number') {
            this.editLastInput(parseFloat(this.getLastInputValue()) * -1, 'number');
        }
    }

    insertDecimalPoint() {
        if (this.getLastInputType() === 'number' && !this.getLastInputValue().includes('.')) {
            this.appendToLastInput('.');
        } else if (this.getLastInputType() === 'operator' || this.getLastInputType() === null) {
            this.addNewInput('0.', 'number');
        }
    }

    generateResult() {
        if (this.getLastInputType() === 'number') {
            const self = this;
            const simplifyExpression = function (currentExpression, operator) {
                if (currentExpression.indexOf(operator) === -1) {
                    return currentExpression;
                } else {
                    let operatorIdx = currentExpression.indexOf(operator);
                    let leftOperandIdx = operatorIdx - 1;
                    let rightOperandIdx = operatorIdx + 1;

                    let partialSolution = self.performOperation(...currentExpression.slice(leftOperandIdx, rightOperandIdx + 1));

                    currentExpression.splice(leftOperandIdx, 3, partialSolution.toString());

                    return simplifyExpression(currentExpression, operator);
                }
            };
            let result = ['x', '÷', '-', '+'].reduce(simplifyExpression, this.getAllInputValues());
            this.addNewInput('=', 'equals');
            this.updateOutputDisplay(result.toString());
        }
    }

    // helper function
    getLastInputType() {
        return this.inputHistory.length === 0 ? null : this.inputHistory[this.inputHistory.length - 1].type;
    }

    getLastInputValue() {
        return this.inputHistory.length === 0 ? null : this.inputHistory[this.inputHistory.length - 1].value;
    }

    getAllInputValues() {
        return this.inputHistory.map((entry) => entry.value);
    }

    getOutputValue() {
        return this.outputDisplay.value.replace(/,/g, '');
    }

    addNewInput(value, type) {
        this.inputHistory.push({ type: type, value: value.toString() });
        this.updateInputDisplay();
    }

    appendToLastInput(value) {
        this.inputHistory[this.inputHistory.length - 1].value += value.toString();
        this.updateInputDisplay();
    }

    editLastInput(value, type) {
        this.inputHistory.pop();
        this.addNewInput(value, type);
    }

    deleteLastInput() {
        this.inputHistory.pop();
        this.updateInputDisplay();
    }

    updateInputDisplay() {
        this.inputDisplay.value = this.getAllInputValues().join(' ');
    }

    updateOutputDisplay(value) {
        this.outputDisplay.value = Number(value).toLocaleString();
    }

    performOperation(leftOperand, operation, rightOperand) {
        leftOperand = parseFloat(leftOperand);
        rightOperand = parseFloat(rightOperand);

        if (Number.isNaN(leftOperand) || Number.isNaN(rightOperand)) {
            return;
        }

        switch (operation) {
            case 'x':
                return leftOperand * rightOperand;
            case '÷':
                return leftOperand / rightOperand;
            case '-':
                return leftOperand - rightOperand;
            case '+':
                return leftOperand + rightOperand;
            default:
                return;
        }
    }
}

const inputDisplay = document.querySelector('#history');
const outputDisplay = document.querySelector('#result');

const allClearButton = document.querySelector('[data-all-clear]');
const backspaceButton = document.querySelector('[data-backspace]');
const percentButton = document.querySelector('[data-percent]');
const operatorButtons = document.querySelectorAll('[data-operator]');
const numberButtons = document.querySelectorAll('[data-number]');
const negationButton = document.querySelector('[data-negation]');
const decimalButton = document.querySelector('[data-decimal]');
const equalsButton = document.querySelector('[data-equals]');

const calculator = new Calculator(inputDisplay, outputDisplay);

allClearButton.addEventListener('click', () => {
    calculator.clearAllHistory();
});

backspaceButton.addEventListener('click', () => {
    calculator.backspace();
});

percentButton.addEventListener('click', () => {
    calculator.changePercentToDecimal();
});

operatorButtons.forEach((button) => {
    button.addEventListener('click', (event) => {
        // Destructuring assignment
        let { target } = event;
        calculator.insertOperation(target.dataset.operator);
    });
});

numberButtons.forEach((button) => {
    button.addEventListener('click', (event) => {
        // Destructuring assignment
        let { target } = event;
        calculator.insertNumber(target.dataset.number);
    });
});

negationButton.addEventListener('click', () => {
    calculator.negateNumber();
});

decimalButton.addEventListener('click', () => {
    calculator.insertDecimalPoint();
});

equalsButton.addEventListener('click', () => {
    calculator.generateResult();
});
