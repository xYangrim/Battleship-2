const rs = require('readline-sync');

let boardSize = 0;
let board = [];
let shipsRemaining = 1;
let pastAttacks = [];


function createBoardSize() {
  const boardSizeInput = rs.question('Input board size (I.E -> "5" for a 5x5 board) => ');
  if(boardSizeInput > 0 && boardSizeInput < 50) {
    boardSize = parseInt(boardSizeInput);
  } else {
    console.log('Invalid input. Board size must be at least 5 and no greater than 10')
  }
}

function createBoard() {
  for(let i = 0; i < boardSize; i++) {
    board.push(Array(boardSize).fill(false))
  }
}

function displayBoard() {
  console.log(board.map(row => row.map(cell => (cell ? 'S' : '_')).join(' ')).join('\n'));
}


function placeShips() {
    const shipLengths = [2, 3, 3, 4, 5];  
    for (let length of shipLengths) {
      let row, col, direction;
      do {
        direction = Math.floor(Math.random() * 2);
        row = Math.floor(Math.random() * boardSize);
        col = Math.floor(Math.random() * boardSize);
      } while (!isValidPlacement(row, col, length, direction));
  
      for (let i = 0; i < length; i++) {
        if (direction === 0) {
          board[row][col + i] = true;
        } else {
          board[row + i][col] = true;
        }
      }
    }
  }
  
  function isValidPlacement(startRow, startCol, length, direction) {
    if (
      (direction === 0 && startCol + length > boardSize) ||
      (direction === 1 && startRow + length > boardSize)
    ) {
      return false;
    }
  
    for (let i = 0; i < length; i++) {
      if (direction === 0 && board[startRow][startCol + i]) {
        return false; 
      } else if (direction === 1 && board[startRow + i][startCol]) {
        return false; 
      }
    }
  
    return true;
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
       board = [];
       shipsRemaining = 2;
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
  while(shipsRemaining != 0) {
    const startGame = rs.keyInPause('Press any key to start... ');
    console.log("Game is starting!");
    createBoardSize();
    createBoard();
    placeShips();
    displayBoard();
    strikeTurn();
    endOfGame();
  }
}
playGame();
