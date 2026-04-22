import * as React from 'react'
import * as ReactBootstrap from 'react-bootstrap'
import { useState } from 'react';

const { Badge, Button, Card } = ReactBootstrap

function Square({ value, onSquareClick }) {
  return (
    <button 
      className="square"
      onClick={onSquareClick}
    >
      {value}
    </button>
  );
}

export default function Board() {
  const [xIsNext, setXIsNext] = useState(true);
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [selectedSquare, setSelectedSquare] = useState(null);

  function handleClick(i) {
    if (calculateWinner(squares)) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      const xIndices = squares
        .map((square, index) => square === 'X' ? index : null)
        .filter(index => index !== null);
      const xCount = xIndices.length;
      if (xCount < 3 && !squares[i]) {
        nextSquares[i] = "X";
      }
      else if (xCount === 3){
        if (selectedSquare === null) {
          if (squares[i] === 'X') {
            setSelectedSquare(i)
          }
          return
        }

        if (squares[i] !== null || !isAdjacent(selectedSquare, i)) {
          setSelectedSquare(null)
          return
        }
        nextSquares[selectedSquare] = null;
        nextSquares[i] = 'X';
        if (squares[4] === 'X' && selectedSquare !== 4 && calculateWinner(nextSquares) !== 'X') {
          setSelectedSquare(null)
          return
        }

        setSelectedSquare(null)
      }
      else {
        return;
      }
    } else {
      const yIndices = squares
        .map((square, index) => square === 'O' ? index : null)
        .filter(index => index !== null);
      const yCount = yIndices.length;
      if (yCount < 3 && !squares[i]) {
        nextSquares[i] = "O";
      }
      else if (yCount === 3){
        if (selectedSquare === null) {
          if (squares[i] === 'O') {
            setSelectedSquare(i)
          }
          return
        }

        if (squares[i] !== null || !isAdjacent(selectedSquare, i)) {
          setSelectedSquare(null)
          return
        }
        nextSquares[selectedSquare] = null;
        nextSquares[i] = 'O';
        if (squares[4] === 'O' && selectedSquare !== 4 && calculateWinner(nextSquares) !== 'O') {
          setSelectedSquare(null)
          return
        }

        setSelectedSquare(null)
      }
      else {
        return;
      }
    }
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  return (
    <>
    <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}

function isAdjacent(i_1, i_2) {
  const x_1 = Math.floor(i_1 / 3)
  const y_1 = i_1 % 3

  const x_2 = Math.floor(i_2 / 3)
  const y_2 = i_2 % 3

  return Math.abs(x_1 - x_2) <= 1 && Math.abs(y_1 - y_2) <= 1
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

