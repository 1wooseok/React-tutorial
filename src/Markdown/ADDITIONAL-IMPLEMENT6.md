# 6. 승자가 없는 경우 무승부라는 메시지를 표시해주세요.

무승부가 나는 경우는 

모든 사각형이 채워졌는데 winner가 없는 경우밖에 없다.

따라서 winner를 확인하는 부분에 모든 사각형이 채워졌는지 확인하는 코드를 작성하겠다.

모든 사각형이 채워졌는지 확인하는 방법은, 

현재 게임 진행 상태인 "stepNumber"가 9이면 모든 사각형이 채워진 것이다.

```jsx
render() {
  // ... 생략 ... //
  let status;
  
  if(winner) {
    status = `Winner is : ${winner}`;
  } else if(this.state.stepNumber === 9) { // winner가 없고, 모든 사각형이 채워진 경우
    status = 'DRAW';
  } else {
    status = `Next Player is : ${(this.state.xIsNext ? "X" : "O")}`;
  }
  // ... 생략 ... //
}
```
