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
  // const [result, setResult] = useState(null);

  useEffect(() => {
    // console.log(displayValue);
    console.log(formula);
    console.log(waitingSecondOp);
  }, [formula, waitingSecondOp]);

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
      if (nextOperator !== '-') {
        setFormula(formula.slice(-1));
        setOperator(nextOperator);
        return;
      } else if (nextOperator === '-') {
        setDisplayValue('-');
        setFormula((valueArray) => [...valueArray, '-']);
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
  };

  return (
    <div className='Calculator'>
      <Display displayValue={displayValue} />
      <Keys
        handleOperator={handleOperator}
        resetCalculator={resetCalculator}
        inputDigit={inputDigit}
        inputDecimal={inputDecimal}
        setFormula={setFormula}
      />
    </div>
  );
}

export default Calculator;
