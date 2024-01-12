const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const boardSize = 10;
const ships = [
  { length: 2, name: 'Two-unit ship' },
  { length: 3, name: 'Three-unit ship' },
  { length: 3, name: 'Three-unit ship' },
  { length: 4, name: 'Four-unit ship' },
  { length: 5, name: 'Five-unit ship' }
];

let board = [];

// Function to build the grid
function buildGrid(size) {
  board = [];
  for (let i = 0; i < size; i++) {
    board.push(Array(size).fill(' '));
  }
}

// Function to display the board
function displayBoard() {
  let headerRow = '   ';
  for (let col = 1; col <= board.length; col++) {
    headerRow += `  ${col} `;
  }
  console.log(headerRow + '\n' + '    ' + '-'.repeat(board.length * 4));

  for (let row = 0; row < board.length; row++) {
    let rowStr = ` ${String.fromCharCode(65 + row)} |`;
    for (let col = 0; col < board[row].length; col++) {
      rowStr += ` ${board[row][col]} |`;
    }
    console.log(rowStr + '\n' + '    ' + '-'.repeat(board.length * 4));
  }

  let horizontalLine = '   ';
  for (let col = 0; col < board.length; col++) {
    horizontalLine += '---';
  }
  console.log(horizontalLine);
}

// Function to place ships on the board
function placeShips() {
  for (let ship of ships) {
    let row, col, direction;
    do {
      direction = Math.floor(Math.random() * 2); // 0 for horizontal, 1 for vertical
      row = Math.floor(Math.random() * (board.length - ship.length + 1));
      col = Math.floor(Math.random() * (board.length - ship.length + 1));
    } while (!isValidPlacement(row, col, ship.length, direction));

    for (let i = 0; i < ship.length; i++) {
      if (direction === 0) {
        board[row][col + i] = 'O';
      } else {
        board[row + i][col] = 'O';
      }
    }
  }
}

// Function to check if ship placement is valid
function isValidPlacement(startRow, startCol, length, direction) {
  for (let i = 0; i < length; i++) {
    if (direction === 0 && board[startRow][startCol + i] !== ' ') {
      return false;  // Check horizontally
    } else if (direction === 1 && board[startRow + i][startCol] !== ' ') {
      return false;  // Check vertically
    }
  }
  return true;
}

// Initialize the game
buildGrid(boardSize);
placeShips();
displayBoard();

// Function to take a turn
function takeTurn() {
  rl.question('Enter your target (e.g., A3): ', (answer) => {
    const targetCol = answer.charCodeAt(0) - 65;
    const targetRow = parseInt(answer.slice(1)) - 1;

    if (board[targetRow][targetCol] === 'O') {
      console.log('Hit!');
      board[targetRow][targetCol] = 'X';
    } else if (board[targetRow][targetCol] === 'X' || board[targetRow][targetCol] === 'M') {
      console.log('You already fired at this location. Try again.');
    } else {
      console.log('Miss!');
      board[targetRow][targetCol] = 'M';
    }

    displayBoard();
    checkWin();
    takeTurn();
  });
}

// Function to check if all ships are destroyed
function checkWin() {
  for (let row = 0; row < board.length; row++) {
    for (let col = 0; col < board[row].length; col++) {
      if (board[row][col] === 'O') {
        return;
      }
    }
  }
  console.log('Congratulations! You sunk all the ships. You win!');
  rl.close();
}

// Start the game
takeTurn();
