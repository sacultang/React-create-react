# Getting Started with Create React App

```bash
$ npx create-react-app [Project]
```

npx 이용해 그냥 설치시 아래 에러 코드가 뜨면서 설치가 되지 않는다

@latest를 붙여서 설치해주면 된다

```bash
You are running `create-react-app` 4.0.3, which is behind the latest release (5.0.1).

We no longer support global installation of Create React App.

Please remove any global installs with one of the following commands:
- npm uninstall -g create-react-app
- yarn global remove create-react-appcd
```

```bash
$ npx create-react-app@latest [Project]
```

## ESlint

### 일반적인 프로젝트에서

ESlint 라이브러리 설치

```bash
$ npm i eslint -D
```

ESlint 초기화
.eslintrc.js 파일이 생성된다

```bash
$ npx eslint --init
```

.eslintrc.js

```js
// 다양한 옵션들 설정 가능
module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: 'eslint:recommended',
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    // 룰을 추가해 줄 수있다
    semi: ['error', 'always'],
  },
}
```

<!-- more -->

### create-react-app으로 만든 리액트 프로젝트 안에서는 package.json 안에 eslintConfig가 있다

- 따로 설치할 필요가 없다
- 추천되는 리액트앱의 설정을 상속 받는다

```json
"eslintConfig": {
    "extends": [
      "react-app",
      "react-app/jest"
    ],
    "rules": { // 룰을 추가 해 줄 수 있다
      "semi": "off"
    }
  },
```

## Husky

Git hooks made easy
husky는 git hook을 손쉽게 제어하도록 도와주는 매니저 이다.  
git을 쓰다가 특정 이벤트(커밋할 때, 푸시할 때 등등)가 벌어졌을 때,  
그 순간에 갈고리를 걸어서 특정 스크립트가 실행되도록 도와주는게 git hook이다.

- 허스키 모듈 설치전에 git init 해야한다

```bash
$ git init
```

```bash
$ npm i husky -D
```

- husky의 git hook 활성화
  - .husky 폴더가 생성된다.

```bash
$ npx husky install
-> husky - Git hooks installed
```

- eslint나 prettier로 커밋전에 점검을 해 볼수 있다

### lint-staged

husky 와 Eslint, prettier를 연결해서 사용하면 git commit 을 하기전에 Eslint와 prettier로 staged된 파일들을 점검 할 수 있다.

- prepare
  - prepare 스크립트를 추가해 놓으면 다른곳에서 package.json 으로 모듈을 설치할 때 자동으로 husky가 적용된다

```json
package.json
"scripts":{
  "prepare":"husky install"
}
```

- lint-staged 설치

```bash
$ npm i lint-staged -D
```

```bash
// 커밋을 하기 직전에 lint-staged가 실행 된다

$ npx husky add .husky/pre-commit "npx lint-staged"
```

- lint-staged 설정 추가
  package.json에 추가해준다

```json
"lint-staged" :{
  // 모든 폴더에서 js 확장 자를 가진 파일을
  "**/*.js": [
    "eslint --fix", // 실행문을 적는다
    "git add"
  ]
}
```

git add 후 커밋을 하면 eslint 규칙을 체크해 준다, 그리고 prettier 룰에 맞게 수정해준다
![](https://sacultang.github.io/images/lint-01.png)  
![](https://sacultang.github.io/images/lint-02.png)  
![](https://sacultang.github.io/images/lint-03.png)  
쌍따옴표가 홑따옴표로 수정 되었다

## React-router-dom

1. 브라우저에서 최초에 root 경로로 요청을하면,
2. React Web App을 내려준다
3. 내려받은 App 에서 다른 페이지로 이동하는 동작을 수행하면,
4. 새로운 경로에 맞는 컴포넌트를 보여준다

```bash
$ npm i react-router-dom
```

- cra에 기본 내장된 패키지가 아님
- react-router-dom은 facebook의 공식 패키지가 아니다

### 특정 경로에서 보여줄 컴포넌트 준비

- '/' => Home 컴포넌트
- '/profile' => Profile 컴포넌트
- '/about' => About 컴포넌트

```js
import { BrowserRouter, Route } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Profile from './pages/Profile'
import About from './pages/About'

function App() {
  return (
    <BrowserRouter>
      <Route path='/' component={Home}></Route>
      <Route path='/profile' component={Profile}></Route>
      <Route path='/about' component={About}></Route>
    </BrowserRouter>
  )
}

export default App
```

about 페이지에 들어가도 home 컴포넌트가 같이 렌더 된다

![](https://sacultang.github.io/images/router02.png)

about path에 '/'가 포함되어 있기 때문에 루트경로인 Home도 출력되는 것<br>
path가 완전히 같을경우에만 해당 페이지가 보이도록 exact를 Route에 추가 해준다

```js
function App() {
  return (
    <BrowserRouter>
      <Route path='/' exact component={Home}></Route>
      // exact를 추가 해준다
      <Route path='/profile' component={Profile}></Route>
      <Route path='/about' component={About}></Route>
    </BrowserRouter>
  )
}
```

![](https://sacultang.github.io/images/route03.png)

이제 home이 같이 출력 되지 않는다

만약 경로가 '/profile'의 하위라면 (ex: '/profile/name') profile의 route에 exact를 추가 해주면 된다

### Dynamic 라우팅 (1)

Routes의 경로에 특정 값을 넣어 해당 페이지로 이동할 수 있게 하는 것을 말한다.

```js
function App() {
  return (
    <BrowserRouter>
      <Route path='/' exact component={Home}></Route>
      <Route path='/profile' exact component={Profile}></Route>
      <Route path='/profile/:id' component={Profile}></Route>
      <Route path='/about' component={About}></Route>
    </BrowserRouter>
  )
}
```

path 주소 뒤에 :[값의 이름] 으로 붙여 주면 된다  
이름은 아무렇게 적어도 상관없지만 알기 쉽게 쓰는게 좋겠다  
id 값을 받아와서 id값에 해당하는 페이지로 이동할 수 있다

```js
export default function Profile(props) {
  console.log(props)
  const id = props.match.params.id
  console.log(id, typeof id)
  return (
    <div>
      <h2>Profile 페이지 입니다.</h2>
      {id && <p>id 는 {id} 입니다</p>}
    </div>
  )
}
```

/profile/1 주소로 접속 해본다

- 컴포넌트에서 데이터가 들어올때는 props로 받아온다 console로 props를 찍었을 시
  ![](https://sacultang.github.io/images/route05.png)

```
url에 :id로 지정했던 key와 주소로 접속할때 사용한 값인 1이 params의 값으로 들어가 있다
```

### Dynamic 라우팅 (2)

```
http://localhost:3000/about?name=mark
```

- 주소 뒤에 ?로 시작해서 뒤에 붙는것은 쿼리 스트링이다
- 쿼리가 있어도 페이지는 about이며 없어도 about이다.
- 쿼리가 붙는다고 해서 profile처럼 추가적으로 라우트 처리를 할 필요가 없다

```js
export default function About(props) {
  console.log(props)

  return (
    <div>
      <h2>About 페이지 입니다.</h2>
      {query.name && <p>name은 {query.name}입니다.</p>}
    </div>
  )
}
```

![](https://sacultang.github.io/images/query/qs01.png)  
라우트처리 한 것과는 다르게 key.value 형식으로 된 것은 보이지 않는다  
search에 있는 "?name=mark"를 key.value 형식으로 처리 해줄 필요가 있다

### URLSearchParams

브라우저에 내장 되어 있는 객체이다

> https://developer.mozilla.org/ko/docs/Web/API/URLSearchParams

```js
export default function About(props) {
  const searchParams = props.location.search
  console.log(searchParams)
  const obj = new URLSearchParams(searchParams)
  console.log(obj)
  return (
    <div>
      <h2>About 페이지 입니다.</h2>
    </div>
  )
}
```

- console.log(searchParams) -> 문자열로 ?name=mark 가 콘솔에 찍힌다
- console.log(obj) -> 아무것도 보이지 않는다 추가적으로 처리를 해줘야 한다
  ![](https://sacultang.github.io/images/query/qs02.png)

```js
export default function About(props) {
  const searchParams = props.location.search
  console.log(searchParams)
  const obj = new URLSearchParams(searchParams)
  console.log(obj.get('name'))
  const objName = obj.get('name')
  return (
    <div>
      <h2>About 페이지 입니다.</h2>
      {objName && <p>name은 {objName}입니다</p>}
    </div>
  )
}
```

![](https://sacultang.github.io/images/query/qs03.png)<br>
문자열 mark가 찍힌다 <br>
![](https://sacultang.github.io/images/query/qs04.png)<br>
쿼리로 받아온걸 출력 할 수 있다<br>

- URLSearchParams 의 단점
  - URLSearchParams 의 메서드를 다 기억하고 사용해야 한다.
  - 브라우저 객체이기 때문에 브라우저에 따라서 지원하지 않는 경우도 있다

### query-string

URLSearchParams의 단점인 바로 키로 꺼내 사용 할 수 있도록 해준다

```bash
$ npm i query-string
```

```js
// query-string을 import 해준다
import queryString from 'query-string'

export default function About(props) {
  const searchParams = props.location.search
  const query = queryString.parse(searchParams)
  // searchParams 문자열을 파싱 해준다

  return (
    <div>
      <h2>About 페이지 입니다.</h2>
      {query.name && <p>name은 {query.name}입니다.</p>}
    </div>
  )
}
```

![](https://sacultang.github.io/images/query/qs05.png)
{name:mark} 처럼 객체형식으로 잘 나온다

> console.log(query)를 해보면 이상한 에러가 잔뜩 뜬다..
> 검색해봐도 무슨 말인지 잘 모르겠다

## Switch 와 NotFound

여러 route 중 순서대로 먼저 맞는 하나만 보여준다

- exact를 뺄 수 있는 로직을 만들 수 있다
- 가장 마지막에 어디 path에도 맞지 않으면 보여지는 컴포넌트를 설정해서, "Not Found"페이지를 만들 수 있다

```js
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Profile from './pages/Profile'
import About from './pages/About'
import NotFound from './pages/NotFound'

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/profile/:id' component={Profile}></Route>
        <Route path='/profile' component={Profile}></Route>
        <Route path='/about' component={About}></Route>
        <Route path='/' exact component={Home}></Route>
        {/* Not Found */}
        <Route component={NotFound}></Route>
      </Switch>
    </BrowserRouter>
  )
}
export default App
```

- Path의 순서를 조정해준다

  - 루트경로인 '/'은 모든 경로에 포함되어 있기 때문이다
  - 루트경로인 '/'은 exact 여야 한다
  - profile과 profile/:id 는 porfile이 겹치는 범주이기 때문에 exact를 쓰지 않고 표현할려면 순서를 조정해야 한다

- NotFound 페이지는 path를 지정하지 않고 컴포넌트를 지정해준다

```js
export default function NotFound() {
  return <div> 페이지를 찾을 수 없습니다 </div>
}
```

![](https://sacultang.github.io/images/switch/notfound.png)  
없는 주소일 경우 notfound 컴포넌트를 출력한다
