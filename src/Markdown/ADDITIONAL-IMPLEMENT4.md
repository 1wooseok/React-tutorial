# 4. 오름차순이나 내림차순으로 이동을 정렬하도록 토글 버튼을 추가해주세요.

먼저 토글 버튼을 추가하고,

버튼이 눌렸을때 이동 버튼들을 역순으로 다시 그려야한다.

다시 그리기 위해서는 render 함수가 다시 호출 되어야 하고,

render함수가 다시 호출되기 위해서는 state변경이 감지 되어야 한다.

따라서 state에 새로운 속성을 추가하고, 토글 버튼을 누르면 state를 업데이트 시키는 코드를 작성하겠다.

```jsx
render() {
  return (
    // ... 생략 ... //
    <div className="game-info">
      <div>{status}</div>
      // 토글 버튼 추가
      <button onClick={() => this.toggleOrder()}>{order}</button>
      <ol>{moves}</ol>
    </div>
  );
}
```
```jsx
this.state = {
  // ... 생략 ... //
  // 새로운 속성 추가
  b_asending : true
}
```
```jsx
// state를 변경하는 함수 추가
toggleOrder() {
  this.setState(
    {
      b_asending : !this.state.b_asending,
    }
  )
}
```

```jsx
render() {
  // ... 생략 ... //
  
  // state에 따라 history배열이 반전됨.
  const new_history = (this.state.b_asending ? history : history.reverse())
  // 버튼에 표시할 문구 생성.
  const order = this.state.b_asending ? '역순' : '원래대로';
  // 변경한 history로 반복해서 버튼을 그림.
  const moves = new_history.map((step, move) => {
    // ... 생략 ... //  
}
```

<br>
<br>

나는 history배열 전체를 뒤집어서 구현했는데,

구글에서 찾아보니 moves배열을 만든 뒤 state를 확인해 뒤집는 방법도 있었다.
```jsx
render() {
  // ... 생략 ... //
  const order = this.state.b_asending ? '역순' : '원래대로';
  const moves = history.map((step, move) => {
    // ... 생략 ... //
  })
  // 상태가 바뀌면 만들어둔 moves배열을 뒤집음.
  if(!this.state.b_asending) {
    moves.reverse();
  }
  // ... 생략 ... //
}

```
<img width="290" alt="스크린샷 2022-01-09 오후 2 58 41" src="https://user-images.githubusercontent.com/74036731/148671125-43387eb3-f745-49db-885d-14e4fea5a6c9.png">
<img width="282" alt="스크린샷 2022-01-09 오후 2 58 47" src="https://user-images.githubusercontent.com/74036731/148671126-31d0c099-fe3c-48e6-af16-89eb8a1f5360.png">

