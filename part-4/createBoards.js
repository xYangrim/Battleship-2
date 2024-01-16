const rs = require('readline-sync');

function createBoardSize() {
    while(true) {
      let boardSizeInput = rs.question('Input board size (I.E -> "6" for a 6x6 board) => ');
      if(boardSizeInput > 5 && boardSizeInput < 15) {
        let boardSize = parseInt(boardSizeInput);
        return boardSize;
      } else {
        console.log('Invalid input. Board size must be at least 6 and no greater than 15');
      }
    }
  }
  
  function createBoard() {
      const board = [];
  
      for(let i = 0; i < boardSize; i++) {
      board.push(Array(boardSize).fill(false))
    } 
    return board;
  }

  module.exports = {createBoard, createBoardSize}