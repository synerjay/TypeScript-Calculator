import React, { useState } from 'react';
import Display from '../components/Display';
import Keys from '../components/Keys';

function Calculator() {
  // Display Value State
  const [displayValue, setDisplayValue] = useState('0');
  const [firstOperand, setfirstOperand] = useState(null);
  const [waitingSecondOp, setWaitingSecondOp] = useState(false);
  const [operator, setOperator] = useState(null);
  const [history, setHistory] = useState([]); // set to an empty array

  // <------ Operator Functions ------>

  const inputDigit = (digit) => {
    if (waitingSecondOp) {
      displayValue === '-'
        ? setDisplayValue(displayValue + digit)
        : setDisplayValue(digit);
      setWaitingSecondOp(false);
    } else if (displayValue === '0') {
      setDisplayValue(digit);
    } else {
      setDisplayValue(displayValue + digit);
    }
  };

  const inputDecimal = (dot) => {
    if (waitingSecondOp) {
      setDisplayValue('0.');
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
          setDisplayValue('0');
          setOperator(nextOperator);
          return;
        } else {
          setOperator(nextOperator);
          return;
        }
      } else if (nextOperator === '-') {
        setDisplayValue('-');
        return;
      }
    }

    let inputValue = parseFloat(displayValue);
    if (firstOperand === null && !isNaN(inputValue)) {
      setfirstOperand(inputValue);
    } else if (operator) {
      const result = calculate(firstOperand, inputValue, operator);
      setDisplayValue(`${parseFloat(result.toFixed(7))}`);
      setfirstOperand(result);
    }
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
