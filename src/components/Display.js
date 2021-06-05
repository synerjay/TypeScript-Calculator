import React, { Fragment } from 'react';

function Display({ displayValue }) {
  return (
    <Fragment>
      <input
        type='text'
        className='Display'
        value={displayValue}
        id='display'
        disabled
      />
    </Fragment>
  );
}

export default Display;
