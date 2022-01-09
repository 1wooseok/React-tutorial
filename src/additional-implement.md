# 추가 기능 구현


## 1. 이동 기록 목록에서 특정 형식(행, 열)으로 각 이동의 위치를 표시해주세요.

Go To 버튼에 이동할 좌표를 추가했다. ex) 'Go To # 2 ( 1, 2 )'

먼저 Square를 눌렀을때, 어떤 위치의 square인지를 저장할 곳이 필요하다.

현재 handleClick함수가 square의 click을 처리하고 있으므로, 누른 square의 (행, 열)을 state에 저장해서 기억한다.

또한 모든 배열마다 새롭게 클릭된 값이 다르므로, history내부의 모든 배열이 각각 클릭된(행, 열)을 기억해야하므로, history 배열 내부에 metrics를 추가한다.

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
  // ... 생략 ... //
  const moves = history.map((step, move) => {
    const desc = move ?
    // 화면에 (행, 열) 표시. 
    `Go To # ${move} ( ${history[move].metrics.col}, ${history[move].metrics.row} )`:
    `Game Start !`;
  // ... 생략 ... //  
  })
}
```
