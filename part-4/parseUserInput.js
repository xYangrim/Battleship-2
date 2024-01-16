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
  

module.exports = {parseUserInput};