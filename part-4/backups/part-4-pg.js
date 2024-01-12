//  let boardSize = 5;

// function createBoard(test) {
//     const board = [];
//     for(let i = 0; i < boardSize; i++) {
//       board.push(Array(boardSize).fill(test))
//     }
//     return board;
//   }

// const playerBoard = createBoard(false);
// const compBoard = createBoard(true);

// function modifyBoard(board, num1, num2) {
//   board[num1][num2] = true;
// }

// modifyBoard(playerBoard, 0, 0);

// console.log(playerBoard);
// console.log(compBoard);



  // Generate random attack(location)
  // add attack to compPastAttacks; 
  // if hit -> display to user they've been hit -> create function to hit +1 to either row or col from previous attack
  // until ship has sunk 
  // if miss -> display to user computer missed -> and bring up User's turn  

  let compPastAttacks = [[1,1], [1,2], [1,3], [2,1], [2,2], [2,3]]
  let playerShipsRemain = 3
  const boardSize = 10;
  let playerTurn = false;

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

const compShips = JSON.parse(JSON.stringify(ships));
const playerShips = JSON.parse(JSON.stringify(ships));


const compShipNames = Object.keys(compShips);
console.log(compShipNames);

console.log(compShips.destroyer.name);
console.log(playerShips.destroyer.name);

  function createBoard() {
    const board = [];
    for(let i = 0; i < boardSize; i++) {
      board.push(Array(boardSize).fill(false))
    }
    return board;
  }

  function placeShips(board) {
    for (let i = 0; i < compShipNames.length; i++) {
        let row, col, direction;
        let length = compShips[compShipNames[i]].length;
        console.log(length);

        // console.log(`Placing ship: ${compShipNames[i]}, Length: ${length}`);

        do {
            direction = Math.floor(Math.random() * 2);
            row = Math.floor(Math.random() * boardSize);
            col = Math.floor(Math.random() * boardSize);
            // console.log(`Trying position: Row ${row}, Col ${col}, Direction ${direction}`);
        } while (!isValidPlacement(board, row, col, length, direction));

        for (let j = 0; j < length; j++) {
            if (direction === 0) {
                board[row][col + j] = true;
                compShips[compShipNames[i]].position.push([row, col + j]);
            } else {
                board[row + j][col] = true;
                compShips[compShipNames[i]].position.push([row + j, col]);
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
}

 
  function displayShips(board) {
    console.log(board.map(row => row.map(cell => cell ? 'S' : "_").join(' ')).join("\n"));
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
  // let compPastAttacks = [[1,1], [1,2], [1,3], [2,1], [2,2], [2,3]]
  
  function compAttack(board) {
  
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


/* 
- turn cells to X if hit
- check what ship was hit 
- increase hits by 1 
- if last hig 0> display sunk ship 
- } else { run seek n destroy function ( create this );
*/

/* if hit display message and run function to seek n destory ship
- create variable that will store data of previous attacks after initial hit also a toggle that
will switch depending on attack type (first or continuing)
*/

  const compBoard = createBoard();
  console.log(compBoard)
  placeShips(compBoard)
  // compAttack(compBoard);
  // displayShips(compBoard);
  
  

  
  
  