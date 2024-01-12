const ships = {
    destroyer: {
        name: "destroyer",
        length: 2,
        position: [[1, 2], [1, 3]]
    },
    submarine: {
        name: "submarine",
        length: 3,
        position: []
    },
    cruiser: {
        name: "cruiser",
        length: 3,
        position: []
    },
    battleship: {
        name: "battleship",
        length: 4,
        position: []
    },
    carrier: {
        name: "carrier",
        length: 5,
        position: []
    }
};

const shipNames = Object.keys(ships);


function placeShips() {
    for(let i = 0; i < shipNames.length; i++) {
        let row, col, direction;
        let length = ships[shipNames[i]].length;

        do {
            direction = Math.floor(Math.random() * 2);
            row = Math.floor(Math.random() * boardSize);
            col = Math.floor(Math.random() * boardSize);
        } while(!isValidPlacement(row, col, length, direction ));

        for (let j = 0; j < length; j++) {
            if (direction === 0) {
              board[row][col + j] = true;
              ships[shipNames[i]].position.push([row, col + j]);
            } else {
              board[row + j][col] = true;
              ships[shipNames[i]].position.push([row, col + j]);
            }
        }
    } 
}


// const test = ships[shipNames[0]].position.includes([1, 2]);

// console.log(test);

// let arr1 = [[1,4], [1,3], [1, 2]]

// const testArr = [1,2];

// // const testResult = arr1.includes(testArr);
// // const testResult = arr1.some(subArr => subArr[0] === testArr[0] && subArr[1] === testArr[1]);

// const testResult = arr1.some(subArr => {
//     if (subArr[0] === testArr[0] && subArr[1] === testArr[1]) {
//         console.log(subArr)
//         return true;
//     } else {
//         console.log(subArr)
//     }
// })

// console.log(testResult);

// if(board[row][col] && !pastAttacks.includes(strikeInput)) {
//     board[row][col] = 'X';
//     displayBoard();
//     console.log(`Hit!`);
//   } else if(board[row][col] && pastAttacks.includes(strikeInput)) {
//       continue;
//   } else if (!board[row][col] && !pastAttacks.includes(strikeInput)){
//       board[row][col] = `O`;
//       displayBoard();
//     console.log("You missed");
//   }


//   function testStrike(row, col) {
//     for(let i = 0; i < ships.ShipNames.length; i++) {

//     } 
//   }


  function handleAttackResult(row, col, board, pastAttacks) {
    const strikeInput = `${String.fromCharCode(65 + row)}${col + 1}`;

    if (board[row][col] && !pastAttacks.includes(strikeInput)) {
        board[row][col] = 'X';
        displayBoard();
        console.log(`Hit!`);
        updateHits(strikeInput);
    } else if (board[row][col] && pastAttacks.includes(strikeInput)) {
        continue;  // Assuming this is inside a loop, and you want to skip already attacked positions
    } else if (!board[row][col] && !pastAttacks.includes(strikeInput)) {
        board[row][col] = `O`;
        displayBoard();
        console.log("You missed");
    }
}

// const testResult = arr1.some(subArr => subArr[0] === testArr[0] && subArr[1] === testArr[1]);

function updateHits(row, col) {
    for (const shipName in ships) {
        if (ships.hasOwnProperty(shipName)) {
            const ship = ships[shipName];
            if (ship.position.some(pos => pos[0] === row && pos[1] === col)) {
                ship.hits += 1;
                if (ship.hits === ship.length) {
                    console.log(`You sunk the ${ship.name}!`);
                    removeSunkShips();
                }
                break; // No need to check other ships once we found the one that was hit
            }
        }
    }
}


// // Example of how to use the functions
// handleAttackResult(1, 2, board, pastAttacks);
