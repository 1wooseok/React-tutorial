import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'

function Square(props) {
    return (
      <button
        className={props.className}
        onClick={props.onClick}
      >
        {props.value}
      </button>
    );
  }
  
  class Board extends React.Component {
    renderSquare(i) {
      return (
        <Square
          key={i}
          value={this.props.squares[i]}
          onClick={() => this.props.onClick(i)}
          className={(this.props.winner && (this.props.winner.position.indexOf(i) !== -1)) ? ["highlight", "square"].join(' ') : "square"}
        />
      );
    }
  
    render() {
      let squares = [];
      for(let i=0; i<3; i++) {
        let board = [];
        for(let j=0; j<3; j++) {
          board.push(this.renderSquare(3*i+j))
        }
        squares.push(<div key={i} className="board-row">{board}</div>);
      }
      return (
        <div>{squares}</div>
      );
    }
  }
  
  class Game extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        history : [
          {
            squares : Array(9).fill(null),
            metrics : {
              col : null,
              row : null,
            }
          },
        ],
        xIsNext : true,
        stepNumber : 0,
        highlight : false,
        b_asending : true,
        position : null
      }
    }

    handleClick(i) {
      const history = this.state.history.slice(0, this.state.stepNumber + 1);
      const current = history[history.length - 1];
      const squares = current.squares.slice();
      const winner = calculateWinner(squares);

      if(winner) {
        const position = winner.position;
        this.setState({
          position : position,
        })
        return
      }
      if(squares[i]) return;
    
      squares[i] = (this.state.xIsNext ? "X" : "O");

      const metrics =  {
        col : Math.floor(i/3 + 1),
        row : (i%3) + 1
      }

      this.setState(
        {
          history : history.concat([
            {
              squares : squares,
              metrics : metrics
            },
          ]),      
          xIsNext : !this.state.xIsNext,
          stepNumber : history.length
        }
      )
    }

    jumpTo(step) {
      this.setState(
        {
          stepNumber : step,
          xIsNext : (step%2) === 0,
          highlight : true,
        }
      )
    }

    toggleOrder() {
      this.setState(
        {
          b_asending : !this.state.b_asending,
        }
      )
    }

    render() {
      const history = this.state.history.slice(0, this.state.stepNumber + 1);
      const current = history[this.state.stepNumber];
      const squares = current.squares.slice();
      const winner = calculateWinner(squares);

      let status;
      if(winner) {
        status = `Winner is : ${winner.winner}`;
      } else if(this.state.stepNumber === 9) {
        status = 'DRAW';
      } else {
        status = `Next Player is : ${(this.state.xIsNext ? "X" : "O")}`;
      }

      const new_history = (this.state.b_asending ? history : history.reverse())

      const order = this.state.b_asending ? '역순' : '원래대로';
      const moves = new_history.map((step, move) => {
        const desc = move ?
        `Go To # ${move} ( ${history[move].metrics.col}, ${history[move].metrics.row} )`:
        `Game Start !`;
        return (
          <li key={move}>
            <button
              onClick={() => this.jumpTo(move)}
              className={(move === (history.length - 1) && this.state.highlight) ? "highlight" : ''}
            >
            {desc}
            </button>
          </li>
        );
      })

      return (
        <div className="game">
          <div className="game-board">
            <Board
              onClick={(i) => this.handleClick(i)}
              squares={squares}
              winner={winner}
            />
          </div>
          <div className="game-info">
            <div>{status}</div>
            <button onClick={() => this.toggleOrder()}>{order}</button>
            <ol>{moves}</ol>
          </div>
        </div>
      );
    }
  }
  
  // ========================================
  
  ReactDOM.render(
    <Game />,
    document.getElementById('root')
  );
  
  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return { winner : squares[a] , position : [a, b, c] };
      }
    }
    return null;
  }