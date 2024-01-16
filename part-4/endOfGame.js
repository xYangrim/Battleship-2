const rs = require('readline-sync');
isGameOver = false;



function endOfGame(winner) {
    let restartGame;


    while (true) {
      if(winner === true) {
        restartGame = rs.question('You have destroyed all battleships. Would you like to play again? Y/N > ');
      }
  
      if(winner === false) {
        restartGame = rs.question('YOU LOST. Would you like to play again? Y/N > ');
      }
  
      if (restartGame.toUpperCase() === 'Y') {
        console.log(`should restart game`);
        isGameOver = true;
        break;

      } else if (restartGame.toUpperCase() === 'N') {
        console.log('GG');
        process.exit();
      } else {
        console.log("Invalid input. Please enter 'Y' or 'N'.");
      }
    }
  }

module.exports = { endOfGame, isGameOver };