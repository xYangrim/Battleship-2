function placeShips(board, boardSize, ships, shipNames) {
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

  
  module.exports = { placeShips, isValidPlacement };