// console.log(Math.random() * 3);
// console.log(Math.floor((Math.random() * 3)))

// const input = "^%#$^"
// const regex = /^([A-Za-z])(\d+)$/; // Regex to match input like 'A2'
// const match = input.match(regex);

// console.log(match)

// let pastAttacks = [];

// function parseUserInput(input) {
//     const regex = /^([A-Za-z])(\d+)$/; // Regex to match input like 'A2'
//     const match = input.match(regex);
    // console.log(match)
  
//     if (match) {
//       pastAttacks.push(input);
//       const col = match[1].toUpperCase().charCodeAt(0) - 'A'.charCodeAt(0);
//       const row = parseInt(match[2]) - 1;
  
//     if (row >= 0 && col >= 0) {
//         console.log(`row is : ${row} | col is ${col}`)
//         return [row, col];
//       }
//     }
  
//     return [-1, -1]; // Invalid input
//   }

//   console.log(parseUserInput("B6"));
//   console.log(pastAttacks);
//   console.log(pastAttacks.includes("B6"));


// let shipsRemaining = 5;
// const test = shipsRemaining += 1;

// console.log(--shipsRemaining);

// for (let i = 3; i > 0; i--) {
//     setTimeout(() => {
//       console.log(`${i}`);
//     }, 2000 * (3 - i));
//   };  


// let str = "a2".toUpperCase();

// console.log(str);


// function printGrid(rows, columns) {
//     // Print column headers (numbers)
//     let header = '  ';
//     for (let col = 1; col <= columns; col++) {
//       header += col + ' ';
//     }
//     console.log(header);
  
//     // Print rows with letters and grid content
//     for (let row = 0; row < rows; row++) {
//       let rowString = String.fromCharCode('A'.charCodeAt(0) + row) + ' '; // Convert ASCII to letter
//       for (let col = 1; col <= columns; col++) {
//         // Add your grid content logic here
//         // For simplicity, this example just prints the row and column indices
//         rowString += row + ',' + col + ' ';
//       }
//       console.log(rowString);
//     }
//   }
  
//   // Example usage: print a 5x5 grid
//   printGrid(5, 5);
  


// function displayBoard() {
//     console.log(board.map((row) => '|' + row.map((cell) => (cell === 0 ? "  |" : "    ")).join('')).join('\n'));
//   }
  
//   // Example usage: Assume a 3x3 board filled with zeros
//   const board = [
//     [0, 0, 0],
//     [0, 0, 0],
//     [0, 0, 0]
//   ];
  
//   displayBoard();

// function displayBoard() {
//     const numRows = board.length;
//     const rowSeparator = '-'.repeat(board[0].length * 3.5);
  
//     console.log(
//       rowSeparator + '\n' +
//       board.map((row) => '|' + row.map((cell) => (cell === 0 ? "  |" : "    ")).join('')).join('\n' + rowSeparator + '\n') +
//       '\n' + rowSeparator
//     );
//   }
  
  // Example usage: Assume a 3x3 board filled with zeros
//   const board = [
//     [0, 0, 0],
//     [0, 0, 0],
//     [0, 0, 0]
//   ];
  
//   displayBoard();
  
  
  //     1  2  3
  //    ----------
  //  A |  |  |  |
  //    ----------
  //  B |  |  |  |
  //    ----------
  //  C |  |  |  |
  //   ----------

// function displayBoard() {
//     const numRows = board.length;
//     const numCols = board[0].length;
  
//     // Display column headers (numbers)
//     const colHeaders = '   ' + Array.from({ length: numCols }, (_, col) => col + 1).join('  ');
  
//     // Display the board
//     const boardDisplay = board.map((row, index) => {
//       const rowLabel = String.fromCharCode('A'.charCodeAt(0) + index);
//       const rowData = '|' + row.map((cell) => (cell === 0 ? '  |' : '   |')).join('');
//       return `   ${rowLabel} ${rowData}\n     ${'-'.repeat(numCols * 4 - 1)}`;
//     }).join('\n');
  
//     console.log(colHeaders);
//     console.log(boardDisplay);
//   }
  
//   // Example usage: Assume a 3x3 board filled with zeros
//   const board = [
//     [0, 0, 0],
//     [0, 0, 0],
//     [0, 0, 0]
//   ];
  
//   displayBoard();
  
  
// function displayBoard() {
//     const numRows = board.length;
//     const numCols = board[0].length;
  
//     // Display column headers (numbers)
//     const colHeaders = '      ' + Array.from({ length: numCols }, (_, col) => col + 1).join('  ');
  
//     // Display the board
//     const boardDisplay = board.map((row, index) => {
//       const rowLabel = String.fromCharCode('A'.charCodeAt(0) + index);
//       const rowData = '|' + row.map((cell) => (cell === 0 ? '  |' : '    |')).join('');
//       return `   ${rowLabel} ${rowData}\n     ${'-'.repeat(numCols * 4 - 1)}`;
//     }).join('\n');
  
//     console.log(colHeaders);
//     console.log(boardDisplay);
//   }
  
//   // Example usage: Assume a 3x3 board filled with zeros
//   const board = [
//     [0, 0, 0],
//     [0, 0, 0],
//     [0, 0, 0]
//   ];
  
//   displayBoard();
  

// const boardSize = 3;  // You can change this value based on the size you want

// // Initialize an empty board
// const board = [];
// for (let i = 0; i < boardSize; i++) {
//     board.push(Array(boardSize).fill(' '));
// }

// // Function to display the board
// function displayBoard() {
//     // Display column headers
//     let headerRow = '   ';
//     for (let col = 1; col <= boardSize; col++) {
//         headerRow += `${col}  `;
//     }
//     console.log(headerRow);

//     // Display board rows with row headers
//     for (let row = 0; row < boardSize; row++) {
//         let rowStr = ` ${String.fromCharCode(65 + row)} |`;
//         for (let col = 0; col < boardSize; col++) {
//             rowStr += ` ${board[row][col]} |`;
//         }
//         console.log(rowStr);
//     }

//     // Display horizontal line
//     let horizontalLine = '   ';
//     for (let col = 0; col < boardSize; col++) {
//         horizontalLine += '---';
//     }
//     console.log(horizontalLine);
// }

// // Example usage
// displayBoard();

/////////////////////



// for (let row = 0; row < board.length; row++) {
//   let rowStr = ` ${String.fromCharCode(65 + row)} |`;
//   for (let col = 0; col < board[row].length; col++) {
//     // console.log(`display board board[row][col] = ${board[row][col]}`)
//     let mark = rowStr += ` ${board[row][col]}  |`; 
//     if(board[row][col] === 'X' || board[row][col] === 'O') {
//         mark; 
//     } else {
//         rowStr += `   |`;
//     }
//     }
//   }


// const [destroyer, submarine, cruiser, battleship, carrier] = [2, 3, 3, 4, 5];
// let board = [[false, false, false], [true, true, false], [false, false, false]]
// let destoryer = [board[1][0], board[1][1]];

// console.log(board);
// console.log(destoryer)

// console.log(board[1].includes(board[1][0]));



const shipNames = [destroyer, submarine, cruiser, battleship, carrier] = [2, 3, 3, 4, 5];
const shipLengths = shipNames; 


shipNames[1] = [[0][0]];

shipNames[1].push([[1][2]]);
console.log(shipNames[1]);