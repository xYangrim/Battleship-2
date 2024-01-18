const rs = require('readline-sync');
const _ = require('lodash');
const { createBoard, createBoardSize } = require('./createBoards');
const { displayBoard, displayBoard2 } = require('./displayBoards');
const { placeShips } = require('./placeShips');
const { playerTurn, resetPlayerAttacks } = require('./playerAttack');
const { compTurn, resetCompPastAttacks } = require('./compAttack');
const { allShips } = require('./ships.js');



function playGame() {

  let playerShips = _.cloneDeep(allShips);
  let compShips = _.cloneDeep(allShips);
 
  let compShipNames = Object.keys(compShips);
  let playerShipNames = Object.keys(playerShips);
 

  rs.keyInPause('Press any key to start... ');
  console.log("Game is starting!");


  boardSize = createBoardSize();

  const playerBoard = createBoard(boardSize);
  const compBoard = createBoard(boardSize);

  placeShips(playerBoard, boardSize, playerShips, playerShipNames);
  placeShips(compBoard, boardSize, compShips, compShipNames);

  displayBoard(compBoard);

  function gameCallback() {
    resetPlayerAttacks();
    resetCompPastAttacks();
    playGame();
  }


  while(true) {
    playerTurn(compBoard, playerBoard, compShips, gameCallback);
    compTurn(playerBoard, playerShips, gameCallback);
  }

}

playGame();


