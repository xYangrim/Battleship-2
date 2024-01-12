const boardSize = 5; // Adjust the board size as needed
let board = [];
let shipsRemaining = 2;

// Function to initialize the game board
function initializeBoard() {
  for (let i = 0; i < boardSize; i++) {
    board.push(Array(boardSize).fill(false));
  }
}

// Function to place ships randomly on the board
function placeShips() {
  for (let i = 0; i < shipsRemaining; i++) {
    const row = Math.floor(Math.random() * boardSize);
    const col = Math.floor(Math.random() * boardSize);
    board[row][col] = true;
  }
}

// Function to display the game board
function displayBoard() {
  console.log(board.map(row => row.map(cell => (cell ? 'S' : '_')).join(' ')).join('\n'));
}

// Function to check if a ship is present at the specified location
function isShipAtLocation(row, col) {
  return board[row][col];
}

// Function to play the game
function playGame() {
  console.log('Press any key to start the game.');

  // Wait for a key press (simulated here with a timeout)
  setTimeout(() => {
    console.clear();
    initializeBoard();
    placeShips();
    displayBoard();

    while (shipsRemaining > 0) {
      const userInput = prompt('Enter a location to strike (e.g., A2): ');
      const [row, col] = parseUserInput(userInput);

      if (row === -1 || col === -1) {
        console.log('Invalid input. Please enter a valid location.');
        continue;
      }

      if (board[row][col]) {
        console.log('Hit! You have sunk a battleship. Ships remaining:', --shipsRemaining);
      } else {
        console.log('You have missed!');
      }

      board[row][col] = 'X'; // Mark the guessed location
      displayBoard();
    }

    const playAgain = prompt('You have destroyed all battleships. Would you like to play again? (Y/N): ');

    if (playAgain.toUpperCase() === 'Y') {
      shipsRemaining = 2;
    } else {
      console.log('Game Over. Thanks for playing!');
      process.exit();
    }
  }, 1000);
}

// Function to parse user input and convert it into row and column indices
function parseUserInput(input) {
  const regex = /^([A-Za-z])(\d+)$/; // Regex to match input like 'A2'
  const match = input.match(regex);

  if (match) {
    const col = match[1].toUpperCase().charCodeAt(0) - 'A'.charCodeAt(0);
    const row = parseInt(match[2]) - 1;

    if (row >= 0 && row < boardSize && col >= 0 && col < boardSize) {
      return [row, col];
    }
  }

  return [-1, -1]; // Invalid input
}

// Start the game
playGame();

