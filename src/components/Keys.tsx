import React from 'react';

interface KeysProps {
  handleOperator(a: string): void;
  resetCalculator(): void;
  inputDigit(a: string): void;
  inputDecimal(a: string): void;
  setFormula: React.Dispatch<React.SetStateAction<string[]>>;
  setEqualPressed: React.Dispatch<React.SetStateAction<boolean>>;
}

function Keys({
  handleOperator,
  resetCalculator,
  inputDigit,
  inputDecimal,
  setFormula,
  setEqualPressed,
}: KeysProps) {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const value = (e.target as HTMLButtonElement).value; // needs to be explicitly tell TS about the kind of HTML button is present

    switch (value) {
      case '+':
      case '-':
      case '*':
      case '/':
      case '=':
        handleOperator(value);
        if (value !== '=') {
          setFormula((valueArray) => [...valueArray, value]);
        } else {
          setEqualPressed(true);
        }
        break;
      case '.':
        inputDecimal(value);
        setFormula((valueArray) => [...valueArray, value]);
        break;
      case 'all-clear':
        resetCalculator();
        break;
      default:
        if (Number.isInteger(parseFloat(value))) {
          inputDigit(value.toString());
          setFormula((valueArray) => [...valueArray, value]);
        }
    }
  };

  return (
    <div className='Keys'>
      <button
        onClick={handleClick}
        type='button'
        className='operator'
        value='+'
        id='add'
      >
        +
      </button>
      <button
        onClick={handleClick}
        type='button'
        className='operator'
        value='-'
        id='subtract'
      >
        -
      </button>
      <button
        onClick={handleClick}
        type='button'
        className='operator'
        value='*'
        id='multiply'
      >
        &times;
      </button>
      <button
        onClick={handleClick}
        type='button'
        className='operator'
        value='/'
        id='divide'
      >
        &divide;
      </button>

      <button
        onClick={(e) => handleClick(e)}
        type='button'
        value='7'
        id='seven'
      >
        7
      </button>
      <button onClick={handleClick} type='button' value='8' id='eight'>
        8
      </button>
      <button onClick={handleClick} type='button' value='9' id='nine'>
        9
      </button>

      <button onClick={handleClick} type='button' value='4' id='four'>
        4
      </button>
      <button onClick={handleClick} type='button' value='5' id='five'>
        5
      </button>
      <button onClick={handleClick} type='button' value='6' id='six'>
        6
      </button>

      <button onClick={handleClick} type='button' value='1' id='one'>
        1
      </button>
      <button onClick={handleClick} type='button' value='2' id='two'>
        2
      </button>
      <button onClick={handleClick} type='button' value='3' id='three'>
        3
      </button>

      <button onClick={handleClick} type='button' value='0' id='zero'>
        0
      </button>
      <button
        onClick={handleClick}
        type='button'
        className='decimal function'
        value='.'
        id='decimal'
      >
        .
      </button>
      <button
        onClick={handleClick}
        type='button'
        className='all-clear function'
        value='all-clear'
        id='clear'
      >
        AC
      </button>

      <button
        onClick={handleClick}
        type='button'
        className='equal-sign operator'
        value='='
        id='equals'
      >
        =
      </button>
    </div>
  );
}

export default Keys;
