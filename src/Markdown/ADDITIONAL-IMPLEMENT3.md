# 3. 사각형들을 만들 때 하드코딩 대신에 두 개의 반복문을 사용하도록 Board를 다시 작성해주세요.

기존에 Board component의 render함수는 하드코딩으로 게임 보드를 그렸다.
```jsx
render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
```

반복문과 React element를 사용해 다시 작성 할 수 있다.

> <b>*React Element</b><br><br>
> DOM el과 달리 React el는 일반 객체이며(plain object),<br>
> React DOM은 React el와 일치하도록 DOM을 업데이트한다.

```jsx
render() {
  let squares = [];
  for(let i=0; i<3; i++) {
    let board = [];
    for(let j=0; j<3; j++) {
      board.push(this.renderSquare(3*i+j))
    }
    squares.push(<div className="board-row">{board}</div>);
  }
  return (
    <div>{squares}</div>
  );
}
```
내부 for문 에서 반복해서 js표현식을 board배열에 추가하고,

외부 for문 에서 반복해서 \<div> React el을 추가한 sqares배열을

return문에서 squares를 div안에 포함하고 DOM에 렌더링 한다.

( 링크를 확인하면 쉽게 이해할 수 있다. https://ko.reactjs.org/docs/lists-and-keys.html#rendering-multiple-components )

<br>

이렇게 코드를 변경하면

작동은 되지만 경고문이 나온다.

<img width="448" alt="스크린샷 2022-01-09 오후 1 48 06" src="https://user-images.githubusercontent.com/74036731/148669898-302cd916-0aae-40d3-bf01-8c4a803ef1d8.png">

<br>

\<li> 처럼 반복해서 나오는 el은 고유하게 식별할 수 있는 "key" prop이 필요하다는 말.

( 링크를 확인하면 쉽게 이해할 수 있다. https://ko.reactjs.org/docs/lists-and-keys.html#keys )

<br>

Square 컴포넌트가 각각 고유한 식별자를 갖도록 key를 추가해야 한다.

사각형 9개가 있으니까, 위에서 넘겨준 3 * i + j 를 key로 사용하겠다.

```jsx
renderSquare(i) {
  return (
    <Square
      // key추가
      key={i}
      value={this.props.squares[i]}
      onClick={() => this.props.onClick(i)}
    />
  );
}
```
\<div className="Board-row"></div> 또한 반복되기 때문에 적절한 "key"를 추가해 주면 경고가 사라진다.
```jsx
squares.push(<div key={i} className="board-row">{board}</div>);
```


