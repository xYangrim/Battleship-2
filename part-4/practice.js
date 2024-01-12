const rs = require('readline-sync');
let boardSize = 0;

// function createBoardSize() {
//     boardSize = rs.question('Input board size (I.E -> "5" for a 5x5 board) =>  ', 
//     {limit: 10, limitMessage: 'Invalid input. Board size must be at least 5 and no greater than 10'});

//     return parseInt(boardSize, 10);
//   }


//   function createBoard() {
//     const board = [];
//     console.log(typeof(boardSize));

//     for(let i = 0; i < boardSize; i++) {
//     board.push(Array(boardSize).fill(false))
//   } 
//   return board;
// }

function createBoardSize() {
  const boardSize = rs.question('Input board size (I.E -> "5" for a 5x5 board) =>  ', 
      { min:5, max: 10, limitMessage: 'Invalid input. Board size must be at least 5 and no greater than 10' });

  return parseInt(boardSize, 10);
}

function createBoard() {
  const size = createBoardSize();
  const board = [];

  for (let i = 0; i < size; i++) {
      board.push(Array(size).fill(false));
  }

  return board;
}


function displayBoard2(board) {
  // edit code to show not sure an 'S' on missed locations
  console.log(board.map(row => row.map(cell => (cell  ? 'S' : '_')).join(' ')).join('\n'));
}

// createBoardSize();
let playerBoard = createBoard();
displayBoard2(playerBoard);