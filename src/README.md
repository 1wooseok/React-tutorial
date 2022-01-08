# Tutorial을 통해 학습한 내용

## Component

 \- React는 'Component'라는 custom 및 재사용이 가능한 코드 파편을 이용해 UI를 구성한다.

<br>

## JSX

 \- javascript를 확장한 JSX라는 특별한 문법을 사용한다.

 \- content에 {} (중괄호)로 감싸  js 표현식을 사용할 수 있다.

ex)

```react
<div>{ JS Expression }</div>
```

<br>

## render()

\- 모든 컴포넌트는 'render()'라는 함수를 갖는다.

<br>

## State

\- 무언가를 "기억하기" 위해 component는 state사용. (컴포넌트의 데이터를 저장하는 공간)

\- 생성자에 "this.state"를 설정하는 것으로 state를 가질 수 있음.

<b> \* 주의 : JS class에서 하위 class의 생성자를 정의할때 항상 'super'를 호출해야함.</b>

  ( 모든 React component는 생성자를 정의할때 super(props)호출 구문부터 작성 )

ex) 

```react
class Square extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // key : value
    }
  }
}
```
<br>

## setState()
\- React는 state의 변화를 감지하여, 변경된 state가 사용된 모든 컴포넌트를 다시 렌더링함.
\- (즉 render함수가 다시 호출됨)

<br>

## Props

\- 부모 ->자식 컴포넌트로 전달되는 객체.

<br>

## Controlled Component

\- 부모컴포넌트의 state를 변경하는 함수를 자식컴포넌트에 전달했을때,

\- 이 컴포넌트를 'Cotrolled Component'라고 부른다.

ex)

```react
// Parent Component
class Parent extends React.component {
  constructor(props) {
    super(props);
    this.state = {
      bool : true
    }
  }
  
  opposite() {
    this.setState(
      { bool : !this.state.bool }
    )
  }
  render() {
    return (
      <Child onClick={this.plus}/>
    )
  }
}

// Child Component ( controlled component )
class Child extends React.componenet {
  render() {
    return (
      // prpos로 부모의 onClick함수를 받아, button클릭시 부모의 상태를 변경.
      <button onClick={() => this.props.onClick()}>Click Here</button>
    )
  }
}
```

<br>

## Immutability

\- Componenet의 상태를 변경할때, 값을 직접 변경하는 대신

\* "data의 사본을 만들어 변경"하는것은 React에서 매우 중요.

<br>

### 장점 1. 

\- 복잡한 특징들을 단순하게 만듦.

\- 직접적인 데이터 변경을 피하는 것은 이전 버전을 기억하고 나중에 재사용할 수 있게 만듦.

<br>

### 장점 2.

\- 변화를 감지함

\- 변화를 감지하기 위해 복제가 가능한 객체를 이전 사본과 비교하고 전체 객체 트리를 돌아야 함.

\- 불변 객체에서 변화를 감지하는 것은 상당히 쉬움. 참조하고 있는 불변 객체가 이전 객체와 다르다면 객체는 변한 것.

<br>

### 장점 3.

\- React에서 다시 렌더링하는 시기를 결정함.

\- 가장 큰 장점은 React에서 순수 컴포넌트를 만드는 데 도움을 준다는 것.

\- 불변 데이터는 변경이 이루어졌는지 쉽게 판단할 수 있으며, 이를 바탕으로 컴포넌트가 다시 렌더링할지를 결정.



ex)

```react
class Board extends React.Componenet {
  constructor(props) {
    super(props);
    this.state = {
      squares : Array(9).fill(null),
    }
  }
  
  handleClick() {
    // 사본 생성
    const squares = this.state.squares.slice();
    squares[i] = 'X';
    // setState로 변경
    this.setState(
      { squares : squares }
    )
  }
  
  render() {
    return (
      <div>
        <button onClick={this.handleClick}></button>
      </div>
    )
  }
}
```





## Key

\- list를 렌더링 할때, list-item에 "key" prop을 지정하여 각 아이템과 다른 아이템을 구분.

\- 동적인 list를 만들때, 적절한 key를 할당하는 것이 좋음.

( key는 특별하고 미리 지정된 prop )

ex)

```react
<li key={user.id}>{user.taskCount} tasks left</li>
```

