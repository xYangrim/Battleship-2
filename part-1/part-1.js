const rs = require('readline-sync');

const boardSize = 3;
let board = [];
let shipsRemaining = 2;
let pastAttacks = [];

function createBoard() {
  for(let i = 0; i < boardSize; i++) {
    board.push(Array(boardSize).fill(false))
  }
}

function placeShips() {
  for(let i = 0; i < shipsRemaining; i++) {
    let row, col;
    do {
      row = Math.floor(Math.random() * boardSize);
      col = Math.floor(Math.random() * boardSize);
    } while(board[row][col]);

    board[row][col] = true; 
  }
}

function parseUserInput(input) {
  const regex = /^([A-Za-z])(\d+)$/;
  const match = input.match(regex);

  if(match) {
    const col = match[1].toUpperCase().charCodeAt(0) - 'A'.charCodeAt(0);
    const row = parseInt(match[2]) - 1;

    if(row >= 0 && row < boardSize && col >= 0 && col < boardSize) {
      return [row, col];
    }
  }
  return [-1, -1];
}

function strikeTurn() {
  while(shipsRemaining > 0) {
    const strikeInput = rs.question('Enter a location to strike ie, "A2" -> ').toUpperCase();
    const [col, row] = parseUserInput(strikeInput);

    if(pastAttacks.includes(strikeInput)) {
      console.log("You have already picked this location. Miss!");
    }

    if(row === -1 || col === -1 ) {
        console.log('Invalid input. please enter valid location (I.E -> "A2" or "B5")');
        continue;
      }
    if(board[row][col] && !pastAttacks.includes(strikeInput)) {
      console.log("You hit!");
      shipsRemaining -= 1;
      console.log(`Hit! You have sunk a battleship. ${shipsRemaining} ship remaining.`);
    } else if(board[row][col] && pastAttacks.includes(strikeInput)) {
        continue;
    } else if (!board[row][col] && !pastAttacks.includes(strikeInput)){
      console.log("You missed");
    }
      
    pastAttacks.push(strikeInput);
  }
}

function endOfGame() {
  while (true) {
    const restartGame = rs.question('You have destroyed all battleships. Would you like to play again? Y/N > ');

    if (restartGame.toUpperCase() === 'Y') {
      shipsRemaining = 2;
    } else if (restartGame.toUpperCase() === 'N') {
      process.exit();
    } else {
      console.log("Invalid input. Please enter 'Y' or 'N'.");
    }
  }
}


function displayBoard() {
  console.log(board.map(row => row.map(cell => (cell ? 'S' : '_')).join(' ')).join('\n'));
}

function playGame() {
  const startGame = rs.keyInPause('Press any key to start... ');
  console.log("Game is starting!");


 
  createBoard();
  placeShips();
  displayBoard();
  strikeTurn();
  endOfGame();

}

playGame();
