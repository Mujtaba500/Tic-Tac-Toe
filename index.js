let cells = Array.from(document.querySelectorAll('.cell'))
let player = 'X'
let gameEnd = false


const displayController = (e) => {
    if(gameEnd === true){
        return;
    }
    let cellId = e.target.id;
    let id = cellId[9]
    let row = cellId.slice(0,4);
    board.boardUpdate(row, id, player)
    let cell = document.getElementById(`${cellId}`);
    let heading = document.querySelector('#heading');
    if(cell.innerHTML !== ''){
        return;
    }
    cell.innerHTML = `
    <div>
     <p id= '${cellId}'>
       ${player}
      </p>
    </div>
       `;

    if(player === 'X'){
        player = 'O'
    } else if(player === 'O'){
        player = 'X'
    }
    heading.innerHTML = `<h2 id="heading">Player ${player}'s turn</h2>`
    let winner = board.checkForWin()
    if(winner === 'X' || winner === 'O'){
        heading.innerHTML = `<h2 id="heading">Player ${winner} has won!`;
        gameEnd = true
    } else if(winner === 'noone'){
        heading.innerHTML = '<h2 id="heading">Its a Tie!</h2>';
        gameEnd = true;
    }

}


cells.forEach((cell) => {
    cell.addEventListener('click', displayController)
})

const gameBoard = () => {
    let boardRow1 = ['', '', ''];
    let boardRow2 = ['', '', ''];
    let boardRow3 = ['', '', ''];
    let RowsArr = [
        boardRow1,
        boardRow2,
        boardRow3
    ] 
    const boardUpdate = (row, id, player) => {
      if(row == 'row1'){
         boardRow1[id] = player;
      } else if(row === 'row2'){
        boardRow2[id] = player;
      } else if(row == 'row3'){
        boardRow3[id] = player;
      }
    }
    const checkForWin = () => {
        // Check rows for win
        let winner = ''
        let result = ''
        let rowUnderCheck = []
         for(let i = 0; i < RowsArr.length ; i++){
            if(result === 'XXX' || result === 'OOO'){
                winner = rowUnderCheck[0];
                break;
             }
             result = '';
             rowUnderCheck = RowsArr[i]
             for(let k = 0; k < rowUnderCheck.length; k++){
                  if (rowUnderCheck[k] !== ''){
                     result += rowUnderCheck[k]
                  }
                  if(result === 'XXX' || result === 'OOO'){
                    winner = rowUnderCheck[0];
                    break;
                 }
             }
         }

         //Check columns for win
         for(let i = 0; i < RowsArr.length; i++){
            if(result === 'XXX' || result === 'OOO'){
                winner = result.slice(0,1);
                break;
             }
            result = ''
            for(let k = 0; k < RowsArr.length; k++){
                if(RowsArr[k][i] !== ''){
                      result += RowsArr[k][i];
                }
                if(result === 'XXX' || result === 'OOO'){
                    winner = RowsArr[k][i] ;
                    break;
                 }
            }
         }

         //check diagnol
         result = ''
         for(let i = 0; i < 3; i++){
           if(RowsArr[i][i] !== ''){
            result += RowsArr[i][i]
           } 
           if(result === 'XXX' || result === 'OOO'){
            winner = RowsArr[i][i] ;
         }
         }

         // check anti-diagnol
         result = ''
         let k = 2
         for(let i = 0; i < 3; i++){
            if(RowsArr[i][k] !== ''){
                result += RowsArr[i][k]
               } 
               if(result === 'XXX' || result === 'OOO'){
                winner = RowsArr[i][k] ;

             }
             k--
         }

         //check if its a tie
         let arraysPassed = 0
         let pass = false
         for(let i = 0; i < RowsArr.length; i++){
            for(let k = 0; k < 3; k++){
                if(RowsArr[i][k] === ''){
                     pass = true;
                    break;
                }
            }
            if(pass === true){
                break;
           }
            arraysPassed++ ;
         }
         if(arraysPassed === 3){
            winner = 'noone'
         }

         return winner
    }
    return {boardUpdate, checkForWin}
}

const board = gameBoard()