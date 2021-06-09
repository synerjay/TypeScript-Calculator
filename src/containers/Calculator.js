import React, { useEffect, useState } from 'react';
import Display from '../components/Display';
import Keys from '../components/Keys';

function Calculator() {
  // Basic Logic of Calculator
  // firstOperand + operator + secondOperator

  // Display Value State
  const [displayValue, setDisplayValue] = useState('0');
  const [firstOperand, setfirstOperand] = useState(null);
  const [waitingSecondOp, setWaitingSecondOp] = useState(false);
  const [operator, setOperator] = useState(null);
  const [formula, setFormula] = useState([]); // set to an empty array
  const [equalPressed, setEqualPressed] = useState(false);
  // const [result, setResult] = useState(null);

  useEffect(() => {
    // console.log(displayValue);
    // console.log(formula.join(' '));
    console.log(waitingSecondOp);
    console.log(equalPressed);
  }, [formula, waitingSecondOp, equalPressed]);

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
      const value = displayValue + digit;
      setDisplayValue(value);
    }
  };

  const inputDecimal = (dot) => {
    if (waitingSecondOp) {
      setDisplayValue('0.');
      setWaitingSecondOp(false);
      return;
    }

    if (!displayValue.includes(dot)) {
      setDisplayValue(displayValue + dot);
    }
  };

  const handleOperator = (nextOperator) => {
    if (operator && waitingSecondOp) {
      if (nextOperator === '-' && !equalPressed) {
        setDisplayValue('-');
        return;
      } else {
        setFormula(formula.slice(-1));
        setOperator(nextOperator);
        return;
      }
    }

    let inputValue = parseFloat(displayValue);

    if (firstOperand === null && !isNaN(inputValue)) {
      setfirstOperand(inputValue);
    } else if (operator && !waitingSecondOp) {
      const result = calculate(firstOperand, inputValue, operator);
      setDisplayValue(`${parseFloat(result.toFixed(7))}`);
      setfirstOperand(result);
      if (nextOperator === '=') {
        setFormula((valueArray) => [...valueArray, '=']);
        setFormula((valueArray) => [...valueArray, result]);
      }
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
    setFormula([]);
    setEqualPressed(false);
  };

  return (
    <div className='Calculator'>
      <Display
        displayValue={displayValue}
        history={formula.join(' ').replace(/\*/g, '×').replace(/-/g, '‑')}
      />
      <Keys
        handleOperator={handleOperator}
        resetCalculator={resetCalculator}
        inputDigit={inputDigit}
        inputDecimal={inputDecimal}
        setFormula={setFormula}
        setEqualPressed={setEqualPressed}
      />
    </div>
  );
}

export default Calculator;
