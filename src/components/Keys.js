import React from 'react';

function Keys() {
  return (
    <div className='Keys'>
      <button type='button' className='operator' value='+' id='add'>
        +
      </button>
      <button type='button' className='operator' value='-' id='subtract'>
        -
      </button>
      <button type='button' className='operator' value='*' id='multiply'>
        &times;
      </button>
      <button type='button' className='operator' value='/' id='divide'>
        &divide;
      </button>

      <button type='button' value='7' id='seven'>
        7
      </button>
      <button type='button' value='8' id='eight'>
        8
      </button>
      <button type='button' value='9' id='nine'>
        9
      </button>

      <button type='button' value='4' id='four'>
        4
      </button>
      <button type='button' value='5' id='five'>
        5
      </button>
      <button type='button' value='6' id='six'>
        6
      </button>

      <button type='button' value='1' id='one'>
        1
      </button>
      <button type='button' value='2' id='two'>
        2
      </button>
      <button type='button' value='3' id='three'>
        3
      </button>

      <button type='button' value='0' id='zero'>
        0
      </button>
      <button type='button' className='decimal function' value='.' id='decimal'>
        .
      </button>
      <button
        type='button'
        className='all-clear function'
        value='all-clear'
        id='clear'
      >
        AC
      </button>

      <button
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
