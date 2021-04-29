# React_Webpack
---
## Webpack에 이해
Webpack은 Module bundler이다.

**Module**: 모듈이란 우리가 프로젝트에서 사용하는 기본적인 파일 단위라 생각해도된다.
**Bundler**: 우리가 프로젝트를 진행하면서 나눠놓은 모듈들을 하나의 `.js`파일로 묶어준다.

## 왜 bundler를 사용해야하나?
여러가지 이유가 있겠지만 SPA구동의 치명적인 문제가 가장 큰 이유이다. 

### SPA
Single Page Application이라는 웹페이지 제작방식의 일종은 기존의 여러개의 각각의 페이지를 생성해서 사용자에게 보여주던 Multiple Page Appication하고는 다른 방식이다. 
SPA는 하나의 페이지에서 모든 HTML요소와 Javascript를 전부 받아온뒤 사용자가 요청한 페이지에 맞춰서 새롭게 페이지를 구성해서 마치 새로운 페이지로 이동하는것처럼 효과를 보여준다. 
문제는 이때 MPA는 해당 페이지에 필요한 작은양의 Module js만 받아와서 실행하기에 큰 무리가 없었지만 SPA는 페이지 전역에 걸처서 모든 js를 불러오기 때문에 여러 문제가 발생한다. 

- 하나의 html 페이지에서 script되기 때문에 변수의 중복이 발생할수있다.
- 여러 javascript가 script되기 때문에 관리하기가 너무 힘들어진다.
- 여러개의 script를 요청한다는것은 그만큼 여러번의 http요청이 이뤄지는것이기 때문에 리소스 낭비를 심하게 한다.

## Webpack을 이용한 React 초기 개발환경 구성
### npm init
```
npm init 
```
자신이 개발하고자 하는 디렉토리로 가서 `npm init`을 이용해 초기 `package`상태를 정의하여준다.

### React 설치

```
npm i --save react react-dom
```
`react`와 `react-dom`을 `npm` 명령어를 이용하여 설치하여준다. `--save`명령어는 모듈을 설치한뒤 자등올 `package`를 저장하는 명령어이다. 

### babel 설치
`babel`은 상위버전의 Javascript문법을 일반적으로 문제없이 구동되는 하위버전으로 변경하여 컴파일 시켜주는 모듈이다. 
babel이 React에서 사용하는 이유는 React는 기본적으로 ES6문법을 위주로 작성될 계획이기 때문이다.
```
npm i --save -dev @babel/core babel-loader @babel/preset-react @babel/preset-env 
```
이후 root 디렉토리에서 `.babelrc`라는 파일을 생성하여준뒤
```
// .babelrc
{
    "presets": [
        "@babel/env",
        "@babel/react"
    ]
}
```
라고 작성하여준뒤 저장해준다.

- **@babel/core**: babel의 핵심기능을 가지고 있는 모듈 
- **babel-loader**: babel이 Webpack에서 사용할수 있도록 해주는 모듈 
- **@babel/preset-react**: babel이 React의 기본문법인 JSX문법도 이해하고 컴파일 하게 도와주는 모듈 
- **@babel/preset-env**: babel이 es6외 문법도 가능하도록 설정 
- **--dev**: npm의 설치방식중 하나로 모듈이 deploy된 이후에 사용이 필요없다면 개발자 모듈에 넣어서 deploy시 사용을 안하도록 설정되어 있는 모듈 그룹

### Webpack 설치
```
npm i --save-dev webpack webpack-dev-server webpack-cli html-webpack-plugin html-loader
```
- **webpack**: 웹팩의 핵심기능모듈
- **webpack-dev-server**: 웹팩의 가상 라이브모듈
- **webpack-cli**: 웹팩 build 스크립트 명령모듈
- **html-webpack-plugin**: 웹팩 컴파일후 사용할 html파일 생성 플러그인

### webpack.config.js파일 생성
프로젝트 root 디렉토리에서 `webpack.config.js`파일을 생성하여준다.
```javascript
//webpack.config.js
const path = require('path')                                    
const HtmlWebpackPlugin = require('html-webpack-plugin') 

module.exports = {                                    
  entry: './src/index.js',                            
  output: {                                           
    path: path.join(__dirname, '/dist'),           
    filename: 'index_bundle.js'
  },
  module: {                                           
    rules: [
      {
        test: /\.js$/,                       
        exclude: /node_module/,   
        use:{
          loader: 'babel-loader'				
        }
      },
      {
        test: /\.html$/,
        use: ["html-loader"]
      }
    ]},
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html'               
    })
  ]
}
```
- **entry**: webpack의 bundling 시작점이다. 이 시작접으로부터 이어진 module을 탐색하고 이어나가기 시작한다.
- **outer**: bundling이 완료된 js파일을 deploy할 방식을 정하는것이다. `path`는 bundling한 js를 생성할 디렉토리이며 `filename`은 생성할 js의 이름을 정할수있다.
- **module과 loader**: webpack의 장점인 loader는 각 모듈의 확장자에 맞게 새로운 확장자로 bundling을 진행할수있다.
### src 디렉토리 생성 및 index.js 생성
``` 
mkdir src public
```
`public`과 `src`디렉토리를 생성하여준뒤, src안에 `index.js`를 생성하여준다.
```javascript
// index.js

import React from 'react';
import ReactDOM from "react-dom";
import App from "./App"
ReactDOM.render (<App /> , document.getElementById("root"));
```
`index.js`와 연결될 `App.js`도 src 안에서 생성하여준다.
```javascript
import React from 'react';

export default () => {
  return (
    <div>Hello, React Webpack</div>
  )
}
```
### 실행될 html 파일 생성
`public` 디렉토리로 이동하여 `index.html`을 생성하여준다.
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Hello, React Webpack title</title>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>
```

### package 안 script명령어 입력
`package.json`안에서 `script`부분에 새로운 명령어를 추가하여준다.
```
"scripts": {
    "start":"webpack-dev-server --mode development --open --hot", 
    "build":"webpack --mode production"
},
```
이후 `npm start`를 사용하면 프로젝트가 정상적으로 실행되는게 보일것이다.

## Error: Cannot find module 'webpack-cli/bin/config-yargs'
만약 위와같은 에러가 발생한다면 원인은 webpack-cli 버전문제이다. `webpack-dev-server`를 `webpack-cli`가 지원을 안해주기 떄문에 발생하는 문제라고 한다.
쉬운 해결 방법은 `Webpack-cli`를 `webpack-dev-server`버전과 맞춰주면된다. 현재 상위 버전의 dev-server가 없으므로 cli를 다운그레이드 하여주겠다.
```
npm uninstall -d webpack-cli
npm i --save-dev webpack-cli@3.3.12
```

### webpack 5. block
webpack 5.버전에서 3. 버전의 cli설치를 막고있다. 사실 다운그레이드가 좋은 행동은 아니지만 핫로딩이라는 좋은 기능을 사용하기 위해선 잠시나마 낮은 버전을 강제로 사용해보자
```
npm i --save-dev webpack-cli@3.3.12 --force
```

### dev-server 실행
```
npm start
```
