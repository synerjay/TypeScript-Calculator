import React, { Fragment } from 'react';

function Display({ displayValue, history }) {
  console.log(history);
  return (
    <Fragment>
      <input
        type='text'
        className='Formula'
        value={history}
        id='display'
        disabled
      />
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
