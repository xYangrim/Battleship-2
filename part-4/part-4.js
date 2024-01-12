const rs = require('readline-sync');
const _ = require('lodash');
const { createBoard, createBoardSize } = require('./createBoards');
const { displayBoard, displayBoard2 } = require('./displayBoards');
const { placeShips } = require('./placeShips');
const { strikeTurn } = require('./playerAttack');


let playerShipsRemaining = 5;
let compShipsRemaining = 5;
let compPastAttacks = [];
let isGameOver = false;
let winnner = "";
let playerTurn = true;

function compTurn(board) { 
  while(playerTurn === false) {
    let row, col;

    row = Math.floor(Math.random() * boardSize);
    col = Math.floor(Math.random() * boardSize);

    if(!validCompAttks(row, col)) {
      console.log(`attack not in history`);
      // Change cell to 'X' 
      // Set up computer ships object 
      // increment hits to ship object hits value
      // Display hit/board to user 
    
    } else {
      console.log('already attacked here');
    }
    console.log(`row = ${row}, col = ${col}`)
    playerTurn = true;
  }
}

function validCompAttks(row, col) {
  return compPastAttacks.some(pos => pos[0] === row && pos[1] === col);

} 


function endOfGame() {
  while (true) {
    if(winner === "player") {
      rs.question('You have destroyed all battleships. Would you like to play again? Y/N > ');
    }

    if(winner === 'comp') {
      rs.question('YOU LOST. Would you like to play again? Y/N > ');
    }

    if (restartGame.toUpperCase() === 'Y') {
       board = [];
       shipsRemaining = 4;
       pastAttacks = []
      break;
    } else if (restartGame.toUpperCase() === 'N') {
      process.exit();
    } else {
      console.log("Invalid input. Please enter 'Y' or 'N'.");
    }
  }
}



function playGame() {
    rs.keyInPause('Press any key to start... ');
    console.log("Game is starting!");

    boardSize = createBoardSize();

    const playerBoard = createBoard(boardSize);
    const compBoard = createBoard(boardSize);
    placeShips(playerBoard, boardSize);
    placeShips(compBoard, boardSize);
    console.log('this is player board')
    displayBoard2(playerBoard);
    console.log('this is comp board')
    displayBoard2(compBoard);
    displayBoard(playerBoard);

    while(isGameOver === false) {
      playerTurn = strikeTurn(compBoard, playerTurn, compShipsRemaining);
      compTurn(playerBoard)
    }
    endOfGame();
  }

playGame();
