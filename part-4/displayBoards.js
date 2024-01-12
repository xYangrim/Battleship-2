function displayBoard2(board) {
    // edit code to show not sure an 'S' on missed locations
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

    module.exports ={ displayBoard, displayBoard2 };