import React, { useEffect } from 'react';
import Child from './child';
import Increase from './increase';
export default () => {
  console.log('App Component');

  useEffect(() => {
    console.log('App Did Mount!!');
  }, []);
  return (
    <>
      <div>안녕! 나는 컴포넌트야!</div> 
      <Child />
      <Increase />
    </>
  )
}