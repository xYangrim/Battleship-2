
let compPastAttacks = [];

      // Change cell to 'X' 
      // Set up computer ships object 

      // increment hits to ship object hits value
      // Display hit/board to user 

function resetCompPastAttacks() {
  compPastAttacks = [];
}


function checkPastAttacks(row, col, compPastAttacks) {
  return  isInPastAttacks = compPastAttacks.some(pos => pos[0] === row && pos[1] === col);
  }

function compTurn(board, playerShips, playerShipNames, gameCallback) { 
  let playerTurn = false;


  let row, col;

    while(playerTurn === false) {
      let isInPastAttacks = false;

      do {
        row = Math.floor(Math.random() * boardSize);
        col = Math.floor(Math.random() * boardSize);
        isInPastAttacks = checkPastAttacks(row, col, compPastAttacks);
        console.log(`Generated position: row = ${row}, col = ${col}, isInPastAttacks = ${isInPastAttacks}`)
      } while(isInPastAttacks);


      let compAttk = [row, col];
  
      console.log(`starting compAttk is = ${compAttk}`);

      if(isInPastAttacks) {
        console.log('this should not be running')
      }

      if(board[row][col] && !isInPastAttacks) {
        console.log(`Computer Attack is: row = ${row}, col = ${col} and HIT!`)
        console.log(`checking isInPastAttacks = ${isInPastAttacks}`);

      }
      compPastAttacks.push(compAttk);
      console.log('testing')
      playerTurn = true;
    }

    console.log(`Computer past attacks are = ${JSON.stringify(compPastAttacks)}`)
  }




  function updateHits(row, col, ships, compShipsRemaining, gameCallback) {
    for (const shipName in ships) {
        if (ships.hasOwnProperty(shipName)) {
            // const ship = {...ships[shipName]};
            if (ships[shipName].position.some(pos => pos[0] === row && pos[1] === col)) {
            ships[shipName].hits += 1;
            console.log(`hits += 1 - is working hits = ${ships[shipName].hits} &  ships.length = ${ships[shipName].length} `);
                if (ships[shipName].hits === ships[shipName].length) {
                    compShipsRemaining--;
                    console.log(`You sunk the ${ships[shipName].name}, ${compShipsRemaining} Ships Remaining!`);
                    delete ships[shipName];
                    if(compShipsRemaining === 0) {
                      let winner = true;
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