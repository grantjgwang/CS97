import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true,
      numStep: 0,
      firstMove: null, 
      centerOccupy: null,
      endGame: false
    };
  }

  handleClick(i) {
    const squares = this.state.squares.slice();
    const currentPlayer = this.state.xIsNext ? 'X' : 'O';
  
    if (this.state.numStep<6) {
      if (calculateWinner(squares) || squares[i]) {
        return;
      }
      squares[i] = currentPlayer;
      this.setState({
        squares: squares,
        xIsNext: !this.state.xIsNext,
        numStep: this.state.numStep+1,
        centerOccupy: (i===4? currentPlayer: this.state.centerOccupy)
      });
    } else {
      if (calculateWinner(squares) || 
      (squares[i]!==currentPlayer && this.state.firstMove==null) || 
      (squares[i] && this.state.firstMove!=null) ||
        validPick(squares, i)) {
        return;
      } else {
        if(squares[i]===currentPlayer && this.state.firstMove==null) {
          squares[i] = null;
          this.setState({
          squares: squares,
          xIsNext: this.state.xIsNext,
          numStep: this.state.numStep+1,
          firstMove: i,
          centerOccupy: (i===4? null: this.state.centerOccupy)
          });
        } else if (vaildMove(this.state.firstMove, i)) {
          squares[i] = currentPlayer;
          if (this.state.centerOccupy===currentPlayer && !calculateWinner(squares)) {
            this.setState({
            squares: squares,
            xIsNext: !this.state.xIsNext,
            numStep: this.state.numStep+1,
            firstMove: null,
            centerOccupy: (i===4? currentPlayer: this.state.centerOccupy),
            endGame: true
            });
            return;
          }
          this.setState({
          squares: squares,
          xIsNext: !this.state.xIsNext,
          numStep: this.state.numStep+1,
          firstMove: null,
          centerOccupy: (i===4? currentPlayer: this.state.centerOccupy)
          });
        } else {
          return;
        }
      }
    }
  }

  renderSquare(i) {
    return (
      <Square
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
      />
    );
  }

  render() {
    const winner = calculateWinner(this.state.squares);
    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else if (this.state.endGame) {
      status = 'Loser: ' + this.state.centerOccupy;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div>
        <div className="status">{status}</div>
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
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
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
      return squares[a];
    }
  }
  return null;
}

function vaildMove(currentMove, nextMove) {
  if (currentMove===0 && (nextMove===1 || nextMove===3 || nextMove===4)) {
    return true;
  } else if (currentMove===1 && (nextMove===0 || nextMove===2 || nextMove===3 || nextMove===4 || nextMove===5)) {
    return true;
  } else if (currentMove===2 && (nextMove===1 || nextMove===5 || nextMove===5)) {
    return true;
  } else if (currentMove===3 && (nextMove===0 || nextMove===1 || nextMove===4 || nextMove===6 || nextMove===7)) {
    return true;
  } else if (currentMove===5 && (nextMove===1 || nextMove===2 || nextMove===4 || nextMove===7 || nextMove===8)) {
    return true;
  } else if (currentMove===6 && (nextMove===3 || nextMove===4 || nextMove===7)) {
    return true;
  } else if (currentMove===7 && (nextMove===3 || nextMove===4 || nextMove===5 || nextMove===6 || nextMove===8)) {
    return true;
  } else if (currentMove===8 && (nextMove===4 || nextMove===5 || nextMove===7)) {
    return true;
  } else if (currentMove===4) {
    return true;
  }
    return false;
}

function validPick(squares, pick) {
  if(pick===0 && squares[1]!==null && squares[3]!==null && squares[4]!==null) {
    return true;
  } else if (pick===1 && squares[0]!==null && squares[2]!==null && squares[3]!==null && squares[4]!==null && squares[5]!==null) {
    return true;
  } else if (pick===2 && squares[0]!==null && squares[2]!==null && squares[3]!==null && squares[4]!==null && squares[5]!==null) {
    return true;
  } else if (pick===3 && squares[0]!==null && squares[1]!==null && squares[3]!==null && squares[4]!==null && squares[6]!==null && squares[7]!==null) {
    return true;
  } else if (pick===4 && squares[0]!==null && squares[1]!==null && squares[2]!==null && squares[3]!==null && squares[5]!==null && squares[6]!==null && squares[7]!==null &&  squares[8]!==null) {
    return true;
  } else if (pick===5 && squares[1]!==null && squares[2]!==null && squares[4]!==null && squares[7]!==null && squares[8]!==null) {
    return true;
  } else if (pick===6 && squares[3]!==null && squares[4]!==null && squares[7]!==null) {
    return true;
  } else if (pick===7 && squares[3]!==null && squares[4]!==null && squares[5]!==null && squares[6]!==null && squares[8]!==null) {
    return true;
  } else if (pick===8 && squares[4]!==null && squares[5]!==null && squares[7]!==null) {
    return true;
  } else {
    return false;
  }
}
