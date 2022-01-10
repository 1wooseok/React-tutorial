# 5. 승자가 정해지면 승부의 원인이 된 세 개의 사각형을 강조해 주세요.

승부의 원인이 되는 사각형의 번호는

"calculateWinner" 함수 에서 계산된다.

현재 calculateWinner함수는 winner만 return 하고 있기 때문에

승부의 원인이 되는 사각형 index까지 return 하도록 코드를 수정하겠다.
```jsx
// ... 생략 ... //
return { winner : squares[a] , position : [a, b, c] }; // position : 승부의 원인이 된 사각형 index를 담은 배열
// ... 생략 ... //
```

승부가 결정 되면 화면을 다시 rendering 해야하기 때문에

state를 추가하고, 승부가 결정될때 state를 변경하여 다시 rendering 하겠다.

```jsx
this.state = {
  // ... 생략 ... //
  position : null
}
```

승부는 handleClick 함수에서 결정된다.

승부가 결정된다면, setState를 호출해 state를 변경하고

더이상 클릭할 수 없도록 return해 함수를 종료하겠다.

```jsx
// ... 생략 ... //
const winner = calculateWinner(squares);
if(winner) {
  const position = winner.position;
  this.setState({
    position : position,
  })
  return
}
// ... 생략 ... //
```

state가 변경 되었으므로 이제 무언가 다시 rendering되는 상황이 되었다.

목표는 Square 컴포넌트의 style을 변경하는 것이므로, 

변경할 index를 담고있는 position배열을 Square컴포넌트 까지 쭉 전달해주겠다.

\* 이때 Square 컴포넌트에는 직접 position을 전달하는 대신, Board컴포넌트에서 className을 지정해 전달하겠다.

Square 컴포넌트에는 전달받은 position과 비교할 사각형의 번호(i)를 갖고있지 않기때문에

Board에서 비교후, 결과인 className 전달하겠다.

```jsx
class Game extends React.Component {
  render() {
    // ... 생략 ... //
    const winner = calculateWinner(squares);
    <Board
      onClick={(i) => this.handleClick(i)}
      squares={squares}
      // prpos로 winner 전달 ( winner.position으로 접근 )
      winner={winner}
    />
    // ... 생략 ... //
  }
}

class Board extends React.Component {
  // ... 생략 ... //
  <Square
    key={i}
    value={this.props.squares[i]}
    onClick={() => this.props.onClick(i)}
    // props로 받은 winner로 className 지정
    className={(this.props.winner && (this.props.winner.position.indexOf(i) !== -1)) ? ["highlight", "square"].join(' ') : "square"}
  />
  // ... 생략 ... //


function Square(props) {
  return (
    <button
      className={props.className}
      onClick={props.onClick} // props로 전달받은 className에 따라 스타일 변경
    > 
      {props.value}
    </button>
  );
}
  
```

```css
/* ./index.css */
 .highlight {
    color : #60d9f5;
  }
```

Game에서 props로 winner를 전달하고

Board에서 i가 position에 존재하는지 확인해서 className을 props로 전달해

Square에서 className를 추가해 미리 지정해둔 스타일로 변경한다.

<img width="290" alt="스크린샷 2022-01-09 오후 7 18 51" src="https://user-images.githubusercontent.com/74036731/148678171-3c67a555-764f-421b-8263-b6b373bbf6e3.png">

<br>
<br>

코드를 보면 Game컴포넌트에서 Board 컴포넌트로 props를 전달할때 position이 아닌 

render함수 내부에 정의된 winner객체를 전달하고 있다.

Game Component에서 this.state.position을 넘겨주게되면

게임이 끝나고 클릭을 한번 더해야 스타일이 변경된다.

왜 그런지는 아직 찾지 못했다..
