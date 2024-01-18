const rs = require('readline-sync');
const { parseUserInput } = require('./parseUserInput');
const { displayBoard, displayBoard2 } = require('./displayBoards');
const { compTurn } = require('./compAttack');
const { endOfGame } = require('./endOfGame');


let compShipsRemaining = 5;
let pastAttacks = [];

function resetPlayerAttacks() {
    pastAttacks = [];
    compShipsRemaining = 5;
}

function playerTurn(board, playerBoard, ships, gameCallback) {


    let isMyTurn = true;

    while(isMyTurn === true) {
      const strikeInput = rs.question('Enter a location to strike ie, "A2" -> ').toUpperCase();
      const [col, row] = parseUserInput(strikeInput);
  
      if(strikeInput === "H4X") {
        displayBoard2(board);
      } 

      if(strikeInput === "COMP") {
        displayBoard2(playerBoard);
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
        updateHits(row, col, ships, gameCallback);
      } else if(board[row][col] && pastAttacks.includes(strikeInput)) {
          continue;
      } else if (!board[row][col] && !pastAttacks.includes(strikeInput)){
          board[row][col] = `O`;
          displayBoard(board);
          console.log("You missed");
          isMyTurn = false;
      }    
      pastAttacks.push(strikeInput);
    }
  }
  
  
  function updateHits(row, col, ships, gameCallback) {
      for (const shipName in ships) {
          if (ships.hasOwnProperty(shipName)) {
              // const ship = {...ships[shipName]};
              if (ships[shipName].position.some(pos => pos[0] === row && pos[1] === col)) {
              ships[shipName].hits += 1;
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

  module.exports = { playerTurn, resetPlayerAttacks};
  