const rs = require('readline-sync');
const _ = require('lodash');
const allShips = require('./ships');
const { createBoard, createBoardSize } = require('./createBoards');
const { displayBoard, displayBoard2 } = require('./displayBoards');
const { placeShips } = require('./placeShips');


let playerShipsRemaining = 5;
let compShipsRemaining = 5;
let pastAttacks = [];
let compPastAttacks = [];
let playerTurn = true;
let isGameOver = false;
let winnner = "";


const ships = _.cloneDeep(allShips);
const compShips = _.cloneDeep(allShips);

const compShipNames = Object.keys(compShips);
const shipNames = Object.keys(ships);



function strikeTurn(board) {
  while(playerTurn === true) {
    const strikeInput = rs.question('Enter a location to strike ie, "A2" -> ').toUpperCase();
    const [col, row] = parseUserInput(strikeInput);

    if(strikeInput === "H4X") {
        displayBoard2(board);
    } 

    if(pastAttacks.includes(strikeInput)) {
        displayBoard(board);
        console.log("You have already picked this location. Miss!");
    }

    if(row === -1 || col === -1 ) {
        console.log('Invalid input. please enter valid location (I.E -> "A2" or "B5")');
        continue;
      }

    if(board[row][col] && !pastAttacks.includes(strikeInput)) {
      board[row][col] = 'X';
      displayBoard(board);
      console.log(`Hit!`);
      updateHits(row, col);
      strikeTurn(board);
    } else if(board[row][col] && pastAttacks.includes(strikeInput)) {
        continue;
    } else if (!board[row][col] && !pastAttacks.includes(strikeInput)){
        board[row][col] = `O`;
        displayBoard(board);
        console.log("You missed");
        playerTurn = false;
    }    
    pastAttacks.push(strikeInput);
  }
}


function updateHits(row, col) {
    for (const shipName in ships) {
        if (ships.hasOwnProperty(shipName)) {
            // const ship = {...ships[shipName]};
            if (ships[shipName].position.some(pos => pos[0] === row && pos[1] === col)) {
            ships[shipName].hits += 1;
                if (ships[shipName].hits === ships[shipName].length) {
                    --compShipsRemaining;
                    console.log(`You sunk the ${ships[shipName].name}, ${compShipsRemaining} Ships Remaining!`);
                    delete ships[shipName];
                    if(compShipsRemaining === 0) {
                      winner = "player";
                      endOfGame();
                    }
                }
                break;
            }
        }
    }
}

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
    // placeShips(compBoard);
    console.log('this is player board')
    displayBoard2(playerBoard);
    console.log('this is comp board')
    // displayBoard2(compBoard);
    displayBoard(playerBoard);

    while(isGameOver === false) {
      strikeTurn(compBoard);
      compTurn(playerBoard)
    }
    endOfGame();
  }

playGame();
