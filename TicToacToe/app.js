const cells = document.querySelectorAll('.cell');
const turn = document.querySelector('.turn');
const resetBtn = document.querySelector('.reset');

const win = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]
let currtPlayer = 'X';
let running = false;
let options = ['', '', '', '', '', '', '', '', ''];

initGame();
function initGame() {
    cells.forEach(cell => cell.addEventListener('click', cellClick));
    resetBtn.addEventListener('click', resetGame);
    turn.textContent = `${currtPlayer}'s turn`;
    running = true;
}

function cellClick() {
    console.log('cell click')
    const cellIndex = this.getAttribute('data-id')
    if(options[cellIndex] != '' || !running) return;
    updateCell(this, cellIndex);
    checkWin();
}

function updateCell(cell, index) {
    options[index] = currtPlayer
    cell.textContent = currtPlayer
}

function changePlayer() {
    currtPlayer = (currtPlayer == 'X') ? 'O' : 'X';
    turn.textContent = `${currtPlayer}'s turn`;
}

function checkWin() {
    let roundWon =  false;
    for(let i = 0; i < win.length; i++){
        const condition = win[i]
        const cellA = options[condition[0]]
        const cellB = options[condition[1]]
        const cellC = options[condition[2]]

        if(cellA == '' || cellB == '' || cellC == '') continue;
        if(cellA == cellB && cellB == cellC) {
            roundWon = true;
            break
        }
    }
    if(roundWon){
        turn.textContent = `${currtPlayer}'s wins!`;
        running = false;
    } else if(!options.includes('')){
        turn.textContent = `Draw!`;
        running = false;
    } else {
        changePlayer(); 
    }
}

function resetGame() {
    currtPlayer = 'X';
    options = ['', '', '', '', '', '', '', '', ''];
    turn.textContent = `${currtPlayer}'s turn`;
    cells.forEach(cell => cell.textContent = '');
    running = true;
}