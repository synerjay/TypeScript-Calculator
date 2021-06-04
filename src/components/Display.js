import React, { Fragment } from 'react';

function Display({ displayValue }) {
  return (
    <Fragment>
      <input
        type='text'
        className='calculator-screen'
        value={displayValue}
        id='display'
        disabled
      />
    </Fragment>
  );
}

export default Display;
