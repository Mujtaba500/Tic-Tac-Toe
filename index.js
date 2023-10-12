let cells = Array.from(document.querySelectorAll('.cell'))
let player = 'X'
cells.forEach((cell) => {
    cell.addEventListener('click', displayController)
})

function displayController(e) {
    let cellId = e.target.id;
    let id = cellId[9]
    let row = cellId.slice(0,4)
    let cell = document.getElementById(`${cellId}`);
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
    board.boardUpdate(row, id, player)
    if(player === 'X'){
        player = 'O'
    } else if(player === 'O'){
        player = 'X'
    }
    document.querySelector('#heading').innerHTML = `<h2 id="heading">Player ${player}'s turn</h2>`
}


const gameBoard = () => {
    let boardRow1 = ['', '', ''];
    let boardRow2 = ['', '', ''];
    let boardRow3 = ['', '', ''];
    const boardUpdate = (row, id, player) => {
      if(row == 'row1'){
         boardRow1[id] = player;
         console.log(boardRow1);
      } else if(row === 'row2'){
        boardRow2[id] = player;
        console.log(boardRow2);
      } else if(row == 'row3'){
        boardRow3[id] = player;
        console.log(boardRow3);
      }
    }
    return {boardUpdate}
}

const board = gameBoard()
