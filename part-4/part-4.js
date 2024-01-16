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
  let compShipsRemaining = 5;
 

  rs.keyInPause('Press any key to start... ');
  console.log("Game is starting!");


  boardSize = createBoardSize();

  const playerBoard = createBoard(boardSize);
  const compBoard = createBoard(boardSize);

  placeShips(playerBoard, boardSize, playerShips, playerShipNames);
  placeShips(compBoard, boardSize, compShips, compShipNames);

  console.log('this is player board')
  displayBoard2(playerBoard);

  console.log('this is comp board')
  displayBoard2(compBoard);

  displayBoard(playerBoard);

  function gameCallback() {
    resetPlayerAttacks();
    resetCompPastAttacks();
    playGame();
  }


  while(true) {
    playerTurn(compBoard, playerBoard, compShips, compShipsRemaining, gameCallback);
    compTurn(playerBoard, playerShips, playerShipNames, gameCallback);
  }

}

playGame();


