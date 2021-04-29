import React, { useState } from 'react';

export default () => {
  const [ number, increaseNumber ] = useState(1);

  const increase = () => {
    increaseNumber(number + 1);
  }
  
  return (
    <button onClick={() => increase()}>{number}</button >
  )
}