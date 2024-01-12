const { ships } = require('./ships.js');
const rs  = require('readline-sync');
const { displayBoard } = require('./displayBoards.js');

let pastAttacks = [];


function strikeTurn(board, playerTurn, compShipsRemaining) {
    while(playerTurn === true) {
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
        updateHits(row, col, compShipsRemaining);
        strikeTurn(board);
      } else if(board[row][col] && pastAttacks.includes(strikeInput)) {
          continue;
      } else if (!board[row][col] && !pastAttacks.includes(strikeInput)){
          board[row][col] = `O`;
          displayBoard(board);
          console.log("You missed");
          playerTurn = false;
      }    
      pastAttacks.push(strikeInput);

      return playerTurn;
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
  
  
  function updateHits(row, col, compShipsRemaining) {
      for (const shipName in ships) {
          if (ships.hasOwnProperty(shipName)) {
              // const ship = {...ships[shipName]};
              if (ships[shipName].position.some(pos => pos[0] === row && pos[1] === col)) {
              ships[shipName].hits += 1;
                  if (ships[shipName].hits === ships[shipName].length) {
                      compShipsRemaining = compShipsRemaining -1;
                      console.log(`You sunk the ${ships[shipName].name}, ${compShipsRemaining} Ships Remaining!`);
                      delete ships[shipName];
                      if(compShipsRemaining === 0) {
                        winner = "player";
                        endOfGame();
                      }
                  }
                  break;
              }
          }
      }
  }


  module.exports = { strikeTurn };