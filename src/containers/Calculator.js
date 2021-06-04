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

  return (
    <div className='Calculator'>
      <Display displayValue={displayValue} />
      <Keys />
    </div>
  );
}

export default Calculator;
