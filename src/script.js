const calculator = {
  displayValue: '0',
  firstOperand: null,
  waitingForSecondOperand: false,
  operator: null
};

function inputDigit(digit) {
  const { displayValue, waitingForSecondOperand } = calculator;
  if (waitingForSecondOperand === true) {
    calculator.displayValue = displayValue === '-' ? displayValue + digit : digit;
    calculator.waitingForSecondOperand = false;
  } else if (displayValue === '0') {
  calculator.displayValue = digit;  
  } else {
    calculator.displayValue = displayValue + digit;
  }
  console.log(calculator);
}

function inputDecimal(dot) {
  
  if (calculator.waitingForSecondOperand === true) {
    calculator.displayValue = '0.'
    calculator.waitingForSecondOperand = false;
    return
  }
  
  if (!calculator.displayValue.includes(dot)) {
    calculator.displayValue += dot;
  }
}

function handleOperator(nextOperator) {
  const { firstOperand, displayValue, operator } = calculator;
 
  
 if (operator && calculator.waitingForSecondOperand) {
    if(nextOperator !== '-') {
        if (displayValue === '-') {
            calculator.displayValue = '0';
            calculator.operator = nextOperator;
            return;
        } else {
           calculator.operator = nextOperator;
           return;
      }
    } else if (nextOperator === '-'){
      calculator.displayValue = '-';
      return;
    } 
  }  
 
   let inputValue = parseFloat(displayValue);
  if(firstOperand === null && !isNaN(inputValue)){
    calculator.firstOperand = inputValue;
  } else if (operator) {
    const result = calculate(firstOperand, inputValue, operator);
    
 calculator.displayValue = `${parseFloat(result.toFixed(7))}`;
 calculator.firstOperand = result;
  }
  
  calculator.waitingForSecondOperand = true;
  calculator.operator = nextOperator;
  console.log(calculator);
  
}

function calculate(firstOperand, secondOperand, operator) {
  if (operator === '+') {
    return firstOperand + secondOperand;
  } else if (operator === '-') {
    return firstOperand - secondOperand;
  } else if (operator === '*') {
    return firstOperand * secondOperand;
  } else if (operator === '/') {
    return firstOperand / secondOperand;
  }
  
  return secondOperand;
}

function resetCalculator() {
  calculator.displayValue = '0';
  calculator.firstOperand = null;
  calculator.waitingForSecondOperand = false;
  calculator.operator = null;
  console.log(calculator);
}

function updateDisplay() {
  const display = document.querySelector('.calculator-screen');
  display.value = calculator.displayValue;
}

updateDisplay();

const keys = document.querySelector('.calculator-keys');
keys.addEventListener('click', event => {
  const { target } = event;
  const { value } = target;
  if (!target.matches('button')) {
    return;
  }
  
  switch (value) {
    case '+':
    case '-':
    case '*':
    case '/':
    case '=':
      handleOperator(value);
      break;
    case '.':
      inputDecimal(value);
      break;
    case 'all-clear':
      resetCalculator();
      break;
    default:
      if (Number.isInteger(parseFloat(value))) {
        inputDigit(value);
      }
  }
                                     
  updateDisplay();
});