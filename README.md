# React Liftcycle
---
이 프로젝트는 상위 Template `react-webpack`을 이용해 제작하였다.

---
## Lifecycle
Lifecycle이라는 단어는 리액트에서 만든 추상적인 단어이다.
LC(LifeCycle)은 쉽게 풀어 설명하자면 컴포넌트들이 어떻게 화면에 올라가고 올라간 컴포넌트들이 어떤식으로 화면에서 구동하는지를 설명해주는 단어이다.

먼저 LC를 이해하려면 기본적으로 몇가지 단어의 정의를 이해해야한다.

### Component
Component는 하나의 구성품이다. 이 구성품은 화면 전체를 총괄해줄수도 어떤 작은 일부분의 기능으로만 보여질수도 있다.

```javascript
import React from 'react';


export default () => {
  return (
    <div>안녕! 나는 컴포넌트야!</div> 
  )
}
```
이렇게 작성하면 화면에는 `안녕! 나는 컴포넌트야!` 라는 문구만 보여지게된다. 여기에 문구를 더 추가할수있을까?

```javascript
import React from 'react';


export default () => {
  return (
    <div>안녕! 나는 컴포넌트야!</div> 
  )
}

function Child () {
  return (
    <div>나는 또 다른 컴포넌트!</div>
  )
}
```

이렇게 해봐도 또다른 컴포넌트는 보여지지않는다. 이때 우리는 컴포넌트를 하위로 보내어 이어줘야한다.

```javascript
import React from 'react';


export default () => {
  return (
    <>
      <div>안녕! 나는 컴포넌트야!</div> 
      <Child />
    </>
  )
}

function Child () {
  return (
    <div>나는 또 다른 컴포넌트!</div>
  )
}
```

이렇게 설정된 컴포넌트는 이제 `App`이 부모 컴포넌트 `Child`이 자식 컴포넌트가 되는것이다.

자식 컴포넌트는 부모 컴포넌트의 일부 또는 전체를 담당해서 화면을 꾸며주는 역할을 수행한다.

```javascript
import React from 'react';
import Child from './child';
 
export default () => {
  return (
    <>
      <div>안녕! 나는 컴포넌트야!</div> 
      <Child />
    </>
  )
}
```
이렇게 모듈화 하여 사용도 가능하다.

### Mount
Mount는 단순하게 설명하자면 컴포넌트가 화면에 출력을 요청받을때 행동이다. 현재 화면을 담당하고 있는 index.js가 사용자가 React페이지에 접근을 시도하면 가지고 있던 `App`컴포넌트를 `index.html`로 보내어 화면에 출력을 시도한다. 이것이 Mount의 과정 한가지다. 이때 연결된 자식컴포넌트들도 차례대로 Mount가 시도된다.

```javascript
import React from 'react';
 
export default () => {
  console.log('App Component');
  return (
    <>
      <div>안녕! 나는 컴포넌트야!</div> 
      <Child />
    </>
  )
}

function Child () {
  console.log('Child Component');
  return (
    <div>나는 또 다른 컴포넌트!</div>
  )
}
```
콘솔로 이와같이 찍어보면 `App Component`, `Child Component`라고 찍히는걸 볼수있다.

### State
State는 컴포넌트가 가지고 있는 변수이다. 이때 우리는 의문이 들것이다. 이미 javascript는 변수를 생성하여 보관할수있다. 심지어 리액트에서도 변수는 사용할수있다.

```javascript
import React from 'react';

export default () => {
  const number = 1;
  return (
    <div>{number}</div>
  )
}
```

그럼 왜 우린 힘들게 State를 만들어서 사용해야할까?

#### 변수가 변하지 않는다!
밑에 컴포넌트는 버튼을 누를때마다 `number`을 증가시키는 컴포넌트이다.
```
import React from 'react';

export default () => {
  let number = 1;

  const increase = () => {
    number += 1;
    console.log(number);
  }
  return (
    <button onClick={() => increase()}>{number}</button >
  )
}
```
그런데 실제로 증가되지는 않는다. 그럼에도 콘솔에는 순차적으로 증가하고있는 변화가 보인다. 

이처럼 우리가 컴포넌트안에서 선언한 변수들은 직접적인 화면 렌더에 영향을 주지않는다. 그럼 어떻게해야 바꿀수있을까? 이때 우리는 사용할수 있는게 `useState`기능이다.

```javascript
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
```

## 그래서 LifeCycle은?
컴포넌트 밑에 그림과 같이 작동을 한다.
