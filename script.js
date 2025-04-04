//your JS code here. If required.
let player1 = '';
let player2 = '';
let currentPlayer = '';
let turn = 'X';
let gameActive = true;

const submitBtn = document.getElementById('submit');
const gameArea = document.querySelector('.game-area');
const messageDiv = document.querySelector('.message');
const cells = document.querySelectorAll('.cell');

submitBtn.addEventListener('click', () => {
  const name1 = document.getElementById('player-1').value.trim();
  const name2 = document.getElementById('player-2').value.trim();

  if (name1 && name2) {
    player1 = name1;
    player2 = name2;
    currentPlayer = player1;
    gameArea.style.display = 'block';
    document.querySelector('.input-area').style.display = 'none';
    updateMessage();
  }
});

function updateMessage() {
  messageDiv.textContent = `${currentPlayer}, you're up`;
}

function checkWinner() {
  const winPatterns = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7]
  ];

  return winPatterns.some(pattern => {
    const [a, b, c] = pattern.map(id => document.getElementById(id).textContent);
    return a && a === b && b === c;
  });
}

cells.forEach(cell => {
  cell.addEventListener('click', () => {
    if (!gameActive || cell.textContent !== '') return;

    cell.textContent = turn;

    if (checkWinner()) {
      messageDiv.textContent = `${currentPlayer}, congratulations you won!`;
      gameActive = false;
      return;
    }

    // Switch turn
    turn = turn === 'X' ? 'O' : 'X';
    currentPlayer = currentPlayer === player1 ? player2 : player1;
    updateMessage();
  });
});

