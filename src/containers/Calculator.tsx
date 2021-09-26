import React, { useEffect, useState } from 'react';
import Display from '../components/Display';
import Keys from '../components/Keys';

function Calculator() {
  // Basic Logic of Calculator
  // firstOperand + operator + secondOperator

  // Display Value State
  const [displayValue, setDisplayValue] = useState<string>('0');
  const [firstOperand, setfirstOperand] = useState<number | null>(null);
  const [waitingSecondOp, setWaitingSecondOp] = useState(false);
  const [operator, setOperator] = useState<string | null>(null);
  const [formula, setFormula] = useState<string[]>([]); // set to an empty array but typescripted to be an array of script
  const [equalPressed, setEqualPressed] = useState(false);
  // const [result, setResult] = useState(null);

  useEffect(() => {
    // console.log(displayValue);
    // console.log(formula.join(' '));
    console.log(waitingSecondOp);
    console.log(equalPressed);
  }, [formula, waitingSecondOp, equalPressed]);

  // <------ Operator Functions ------>
  // input should be string
  const inputDigit = (digit: string): void => {
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

  const inputDecimal = (dot: string): void => {
    if (waitingSecondOp) {
      setDisplayValue('0.');
      setWaitingSecondOp(false);
      return;
    }

    if (!displayValue.includes(dot)) {
      setDisplayValue(displayValue + dot);
    }
  };

  const handleOperator = (nextOperator: string) => {
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
      if (result) {
        setDisplayValue(`${parseFloat(result.toFixed(7))}`);
        setfirstOperand(result);
        if (nextOperator === '=') {
          setFormula((valueArray) => [...valueArray, '=']);
          setFormula((valueArray) => [...valueArray, result.toString()]);
        }
      }
    }
    setWaitingSecondOp(true);
    setOperator(nextOperator);
  };

  // Calculate Function

  const calculate = (
    firstOperand: number | null,
    secondOperand: number,
    operator: string
  ) => {
    if (!firstOperand) return;
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
        history={formula
          .join(' ')
          .replace(/\*/g, '×')
          .replace(/\//g, '÷')
          .replace(/-/g, '‑')}
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
