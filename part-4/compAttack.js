const { endOfGame } = require('./endOfGame');

let playerShipsRemaining = 5
let compPastAttacks = [];
let isPlayer = true;

      // Change cell to 'X' 
      // Set up computer ships object 

      // increment hits to ship object hits value
      // Display hit/board to user 

function resetCompPastAttacks() {
  compPastAttacks = [];
  playerShipsRemaining = 5;

}



function checkPastAttacks(row, col, compPastAttacks) {
  return  isInPastAttacks = compPastAttacks.some(pos => pos[0] === row && pos[1] === col);
  }

function compTurn(playerBoard, playerShips, gameCallback) { 
  let playerTurn = false;


  let row, col;

    while(playerTurn === false) {
      let isInPastAttacks = false;

      do {
        row = Math.floor(Math.random() * boardSize);
        col = Math.floor(Math.random() * boardSize);
        isInPastAttacks = checkPastAttacks(row, col, compPastAttacks);
      } while(isInPastAttacks);


      let compAttk = [row, col];

      if(isInPastAttacks) {
        console.log('this should not be running');
      }

      if(playerBoard[row][col] && !isInPastAttacks) {
        playerBoard[row][col] = "X";
        console.log(`You've been HIT!`);
        updateHits(row, col, playerShips, gameCallback);
      }

      if(!playerBoard[row][col] && !isInPastAttacks) {
        console.log(`Computer Missed, your turn `)
        playerBoard[row][col] = "O"; 
        playerTurn = true;

      }
      compPastAttacks.push(compAttk);
    }
  }




  function updateHits(row, col, ships, gameCallback) {
    for (const shipName in ships) {
        if (ships.hasOwnProperty(shipName)) {
            if (ships[shipName].position.some(pos => pos[0] === row && pos[1] === col)) {
            ships[shipName].hits += 1;
                if (ships[shipName].hits === ships[shipName].length) {
                  playerShipsRemaining--;
                    console.log(`Computer has Sunk your ${ships[shipName].name}, ${playerShipsRemaining} Ships Remaining!`);
                    delete ships[shipName];
                    if(playerShipsRemaining === 0) {
                      let winner = false;
                      endOfGame(winner)
                      gameCallback();
                      return;
                    }
                }
                break;
            }
        }
    }
}

  module.exports = { compTurn, resetCompPastAttacks };