# 추가 기능 구현


## 1. 이동 기록 목록에서 특정 형식(행, 열)으로 각 이동의 위치를 표시해주세요.

ex) 'Go To # 2 ( 1, 2 )'

먼저 Square를 click했을떄, 어떤 위치의 square를 click했는지 기억해야 한다.

click한 square의 (행, 열)을 state에 저장해서 기억한다.

이때 모든 square마다 클릭된 (행, 열)을 기억해야하므로,

history배열 내부 객체에 (행, 열)을 기록할 state를 추가한다.

```jsx
this.state = {
  history : [
    {
      squares : Array(9).fill(null),
      // state에 (행, 열) 데이터 추가.
      metrics : {
        col : null,
        row : null,
      }
    },
  ],
  xIsNext : true,
  stepNumber : 0,
}
```

이제 클릭 했을때 setState로 metrics를 변경해주고, render에서 (행, 열)을 화면에 표시해주기만 하면 된다.

현재 square의 click event 처리는 handleClick 함수가 담당하므로,

handleClick 함수에서 metrics를 업데이트 하는 코드를 작성한다.
```jsx
// click했을때 i를 이용해 (행, 열) 계산 
const metrics =  {
  col : Math.floor(i/3 + 1),
  row : (i%3) + 1
}

this.setState(
  {
    history : history.concat([
      {
        squares : squares,
        // metrics 업데이트 
        metrics : metrics
      },
    ]),      
    xIsNext : !this.state.xIsNext,
    stepNumber : history.length
  }
)
```
```jsx
render() {
  const history = this.state.history.slice(0, this.state.stepNumber + 1);
  // ... code ... //
  const moves = history.map((step, move) => {
    const desc = move ?
    // 화면에 (행, 열) 표시. 
    `Go To # ${move} ( ${history[move].metrics.col}, ${history[move].metrics.row} )`:
    `Game Start !`;
  // ... code ... //  
  })
}
```

<img width="293" alt="스크린샷 2022-01-09 오전 11 03 50" src="https://user-images.githubusercontent.com/74036731/148666365-07219c90-0dcf-4d9b-bdd2-fb2c443e7b8c.png">
