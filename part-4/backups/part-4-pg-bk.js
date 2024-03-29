const rs = require('readline-sync');

let boardSize = 0;
let shipsRemaining = 5;
let pastAttacks = [];
let compPastAttacks = [];
let playerShipsRemain = 5;




const ships = {
    destroyer: {
        name: "destroyer",
        length: 2,
        position: [],
        hits: 0
    },
    submarine: {
        name: "submarine",
        length: 3,
        position: [],
        hits: 0
    },
    cruiser: {
        name: "cruiser",
        length: 3,
        position: [],
        hits: 0
    },
    battleship: {
        name: "battleship",
        length: 4,
        position: [],
        hits: 0
    },
    carrier: {
        name: "carrier",
        length: 5,
        position: [],
        hits: 0
    }
};


const shipNames = Object.keys(ships);



function createBoardSize() {
  while(true) {
    const boardSizeInput = rs.question('Input board size (I.E -> "5" for a 5x5 board) => ');
    if(boardSizeInput > 0 && boardSizeInput < 11) {
      boardSize = parseInt(boardSizeInput);
      break;
    } else {
      console.log('Invalid input. Board size must be at least 5 and no greater than 10');
    }
  }
}

function createBoard() {
    const board = [];

    for(let i = 0; i < boardSize; i++) {
    board.push(Array(boardSize).fill(false))
  } 
  return board;
}
function displayBoard2(board) {
  console.log(board.map(row => row.map(cell => (cell  ? 'S' : '_')).join(' ')).join('\n'));
}

function displayBoard(board) {
    let headerRow = '   ';
    for (let col = 1; col <= board.length; col++) {
      headerRow += `  ${col} `;
    }
    console.log(headerRow + '\n' + '    ' + '-'.repeat(board.length * 4));
  
    for (let row = 0; row < board.length; row++) {
      let rowStr = ` ${String.fromCharCode(65 + row)} |`;
      for (let col = 0; col < board[row].length; col++) {
        // console.log(`display board board[row][col] = ${board[row][col]}`)
        if(board[row][col] === true ||  board[row][col] === false) {
             rowStr += `   |`;
        } else if(board[row][col] === 'X') {
            rowStr += ` X |`; 
        } else if(board[row][col] === 'O') {
            rowStr += ` O |`;
        }

      }
      console.log(rowStr + '\n' + '    ' + '-'.repeat(board.length * 4));
    }

  }



  function placeShips(board) {
    for(let i = 0; i < shipNames.length; i++) {
        let row, col, direction;
        let length = ships[shipNames[i]].length;

        do {
            direction = Math.floor(Math.random() * 2);
            row = Math.floor(Math.random() * boardSize);
            col = Math.floor(Math.random() * boardSize);
        } while(!isValidPlacement(board, row, col, length, direction ));

        for (let j = 0; j < length; j++) {
            if (direction === 0) {
              board[row][col + j] = true;
              ships[shipNames[i]].position.push([row, col + j]);
            } else {
              board[row + j][col] = true;
              ships[shipNames[i]].position.push([row + j, col]);
            }
        }
    } 
}
  
  function isValidPlacement(board, startRow, startCol, length, direction) {
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

function strikeTurn(board) {
  while(shipsRemaining > 0) {
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
    } else if(board[row][col] && pastAttacks.includes(strikeInput)) {
        continue;
    } else if (!board[row][col] && !pastAttacks.includes(strikeInput)){
        board[row][col] = `O`;
        displayBoard(board);
        console.log("You missed");
    }
      
    pastAttacks.push(strikeInput);
  }
}


// function updateHits(row, col) {
//     for (const shipName in ships) {
//         if (ships.hasOwnProperty(shipName)) {
//             const ship = ships[shipName];
//             if (ship.position.some(pos => pos[0] === row && pos[1] === col)) {
//                 ship.hits += 1;
//                 if (ship.hits === ship.length) {
//                     --shipsRemaining;
//                     console.log(`You sunk the ${ship.name}, ${shipsRemaining} Ships Remaining!`);
//                     delete ship[shipName];
//                 }
//                 break;
//             }
//         }
//     }
// }

function updateHits(row, col) {
  for (const shipName in ships) {
      if (ships.hasOwnProperty(shipName)) {
          // const ship = {...ships[shipName]};
          console.log(`Before Checking attack - hits = ${ships[shipName].hits}`)
          console.log(`shipName before if Statement ${ships[shipName].name}`)
          if (ships[shipName].position.some(pos => pos[0] === row && pos[1] === col)) {
          console.log(`shipName after if Statement ${ships[shipName].name}`)
          console.log(`Before ship.hits +1: name: ${ships[shipName].name} & ship.hits =  ${ships[shipName].hits} & ship.length = ${ships[shipName].length} `)
          ships[shipName].hits += 1;
          console.log(`After ship.hits +1 -name: ${ships[shipName].name} & ship.hits =  ${ships[shipName].hits} & ship.length = ${ships[shipName].length} `)
              if (ships[shipName].hits === ships[shipName].length) {
                console.log(`if ship.hits === ship.length: ${ships[shipName].hits} length = ${ships[shipName].length}`)
                  --shipsRemaining;
                  console.log(`You sunk the ${ships[shipName].name}, ${shipsRemaining} Ships Remaining!`);
                  console.log(`before deleted ship = ${ships[shipName]}`)
                  delete ships[shipName];
                  console.log(`deleted ship = ${ships[shipName]}`)
              }
              break;
          }
      }
  }
}



function endOfGame() {
  while (true) {
    const restartGame = rs.question('You have destroyed all battleships. Would you like to play again? Y/N > ');

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
  while(shipsRemaining != 0) {
    const startGame = rs.keyInPause('Press any key to start... ');
    console.log("Game is starting!");
    createBoardSize();
    const playerBoard = createBoard();
    const compBoard = createBoard();
    placeShips(playerBoard);
    placeShips(compBoard);
    console.log('this is player board')
    displayBoard2(playerBoard);
    console.log('this is comp board')
    displayBoard2(compBoard);
    displayBoard(playerBoard);
    strikeTurn(compBoard);
    endOfGame();
  }
}

playGame();


