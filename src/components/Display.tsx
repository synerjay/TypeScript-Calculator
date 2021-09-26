import React, { Fragment } from 'react';

interface DisplayProps {
  displayValue: string;
  history: string;
}

function Display({ displayValue, history }: DisplayProps) {
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
