import React, { useState } from 'react';
import Display from '../components/Display';
import Keys from '../components/Keys';

function Calculator() {
  // Display Value State
  const [displayValue, setDisplayValue] = useState('0');

  // First Operand State
  const [firstOperand, setfirstOperand] = useState(null);

  // Waiting for Second Operand State

  const [waitingSecondOp, setWaitingSecondOp] = useState(false);

  // Operator State

  const [operator, setOperator] = useState(null);

  // <------ Operator Functions ------>

  const inputDigit = (digit) => {
    if (waitingSecondOp) {
      // calculator.displayValue = displayValue === '-' ? displayValue + digit : digit;
      setDisplayValue(displayValue === '-' ? displayValue + digit : digit);
      // calculator.waitingForSecondOperand = false;
      setWaitingSecondOp(false);
    } else if (displayValue === '0') {
      // calculator.displayValue = digit;
      setDisplayValue(digit);
    } else {
      // calculator.displayValue = displayValue + digit;
      setDisplayValue(displayValue + digit);
    }
  };

  const inputDecimal = (dot) => {
    if (waitingSecondOp) {
      // calculator.displayValue = '0.'
      setDisplayValue('0.');
      // calculator.waitingForSecondOperand = false;
      setWaitingSecondOp(false);
      return;
    }

    if (!displayValue.includes(dot)) {
      setDisplayValue((displayValue += dot));
    }
  };

  const handleOperator = (nextOperator) => {
    if (operator && waitingSecondOp) {
      if (nextOperator !== '-') {
        if (displayValue === '-') {
          // calculator.displayValue = '0';
          setDisplayValue('0');
          // calculator.operator = nextOperator;
          setOperator(nextOperator);
          return;
        } else {
          setOperator(nextOperator);
          return;
        }
      } else if (nextOperator === '-') {
        // calculator.displayValue = '-';
        setOperator('-');
        return;
      }
    }

    let inputValue = parseFloat(displayValue);
    if (firstOperand === null && !isNaN(inputValue)) {
      // calculator.firstOperand = inputValue;
      setfirstOperand(inputValue);
    } else if (operator) {
      const result = calculate(firstOperand, inputValue, operator);

      // calculator.displayValue = `${parseFloat(result.toFixed(7))}`;
      setDisplayValue(`${parseFloat(result.toFixed(7))}`);
      // calculator.firstOperand = result;
      setfirstOperand(result);
    }

    // calculator.waitingForSecondOperand = true;
    // calculator.operator = nextOperator;
    setWaitingSecondOp(true);
    setOperator(nextOperator);
  };

  // Calculate Function

  const calculate = (firstOperand, secondOperand, operator) => {
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
  };

  // Reset Calculator

  const resetCalculator = () => {
    setDisplayValue('0');
    setfirstOperand(null);
    setWaitingSecondOp(false);
    setOperator(null);
  };

  return (
    <div className='Calculator'>
      <Display displayValue={displayValue} />
      <Keys
        handleOperator={handleOperator}
        resetCalculator={resetCalculator}
        inputDigit={inputDigit}
        inputDecimal={inputDecimal}
      />
    </div>
  );
}

export default Calculator;
