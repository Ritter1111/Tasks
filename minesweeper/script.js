/* eslint-disable no-loop-func */
/* eslint-disable no-param-reassign */
/* eslint-disable no-plusplus */
/* eslint-disable no-undef */
let intervalId = null;
let gameOver = false;

const timer = () => {
  let seconds = 0;
  if (!intervalId) {
    const time = document.querySelector('.seconds');
    intervalId = setInterval(() => {
      seconds++;
      const minutes = Math.floor(seconds / 60);
      const formattedSeconds = seconds % 60 < 10 ? `0${seconds % 60}` : seconds % 60;
      time.innerText = `${minutes}:${formattedSeconds}`;
    }, 1000);
  }
  return intervalId;
};

const resetTimer = () => {
  clearInterval(intervalId);
  intervalId = null;
};

let counter = 0;
function counterClicks() {
  counter += 1;
}

const createBoard = () => {
  const container = document.createElement('div');
  container.className = 'container';

  const gameBoard = document.createElement('div');
  gameBoard.className = 'game-board';

  const header = document.createElement('div');
  header.className = 'header';

  const clicks = document.createElement('span');
  clicks.className = 'clicks';
  clicks.innerText = '0';

  const resetGame = document.createElement('button');
  resetGame.className = 'reset-game';
  resetGame.innerText = 'New Game';

  const time = document.createElement('span');
  time.className = 'seconds';
  time.innerText = '00:00';

  const board = document.createElement('table');
  board.className = 'board';
  board.innerHTML = '';
  container.append(gameBoard);
  gameBoard.append(header, board);
  header.append(clicks, resetGame, time);
  document.body.append(container);
};

const renderBoardGame = (rows, bombs) => {
  const minesCount = document.createElement('input');
  minesCount.type = 'number';
  minesCount.id = 'mina';
  minesCount.className = 'mine-count-input';
  minesCount.min = 10;
  minesCount.max = 99;
  minesCount.value = bombs;
  minesCount.placeholder = 'Enter mines';

  const board = document.querySelector('.board');
  board.addEventListener('click', timer);

  const game = document.querySelector('.container-buttons');

  const updateGameButton = document.createElement('button');
  updateGameButton.className = 'update-mines';
  updateGameButton.innerText = 'Set mines';
  game.append(minesCount, updateGameButton);

  const resetGame = () => {
    const bombMessage = document.querySelector('.bomb-message');
    if (bombMessage) bombMessage.remove();
    if (minesCount) minesCount.remove();
    if (updateGameButton) updateGameButton.remove();
    renderNewBoard(rows, bombs);
    gameOver = false;
  };

  updateGameButton.addEventListener('click', () => {
    bombs = minesCount.value;
    resetGame();
  });

  const newGame = document.querySelector('.reset-game');
  newGame.addEventListener('click', resetGame);

  const audio = new Audio('assets/sound.mp3');
  const audioWin = new Audio('assets/win.mp3');
  const audioGameOver = new Audio('assets/game-over.mp3');

  audio.preload = 'auto';
  audioWin.preload = 'auto';
  audioGameOver.preload = 'auto';

  const count = rows;
  board.innerHTML = '';

  for (let i = 0; i < count; i++) {
    currentrRow = board.insertRow(i);
    for (let j = 0; j < count; j++) {
      currentCell = currentrRow.insertCell(j);
      currentCell.addEventListener('click', (event) => {
        if (!gameOver && !currentCell.classList.contains('opened')
        && event.target.classList.contains('flag')) {
          audio.play();
          event.preventDefault();
          event.target.classList.remove('flag');
        }
      });

      currentCell.addEventListener('click', () => {
        counterClicks();
        const clickedCell = document.querySelector('.clicks');
        clickedCell.textContent = counter;
      });

      currentCell.addEventListener('contextmenu', (event) => {
        event.preventDefault();
        if (!gameOver && !currentCell.classList.contains('opened')) {
          event.target.classList.toggle('flag');
          audio.play();
        }
      });
    }
  }
  const cells = [...board.querySelectorAll('td')];
  let cellsCount = cells.length;

  const mines = [...Array((count) * (count)).keys()]
    .sort(() => Math.random() - 0.5)
    .slice(0, bombs);

  function isValid(row, column) {
    return row >= 0 && row < count && column >= 0 && column < count;
  }

  function isBomb(row, column) {
    if (!isValid(row, column)) return false;
    const index = row * count + column;
    // console.log({ index });
    return mines.includes(index);
  }

  function getCount(row, column) {
    let sum = 0;
    for (let x = -1; x <= 1; x++) {
      for (let y = -1; y <= 1; y++) {
        if (isBomb(row + y, column + x)) {
          sum++;
        }
      }
    }
    return sum;
  }

  function openBoard(row, column) {
    const index = row * count + column;
    const cell = cells[index];
    if (!isValid(row, column)) return;

    if (cell.classList.contains('opened')) return;

    if (isBomb(row, column)) {
      audioGameOver.play();
      gameOver = true;
      cell.classList.add('bomb');
      cell.innerHTML = '💣';
      resetTimer();

      if (cell.classList.contains('bomb')) {
        const bombMessage = document.createElement('h1');
        bombMessage.className = 'bomb-message';
        bombMessage.innerText = 'You Lost!!! Try again';
        const gamesButtons = document.querySelector('.container-buttons');
        gamesButtons.append(bombMessage);
      }
      return;
    //   alert('You lost');
    }

    cellsCount--;
    if (cellsCount <= bombs) {
      resetTimer();
      const time = document.querySelector('.seconds').innerHTML;
      audioWin.play();
      const bombMessage = document.createElement('h1');
      bombMessage.className = 'bomb-message';
      bombMessage.innerText = `Hooray! You found all mines in ${time} seconds and N moves!" or "Game over. Try again`;
      document.body.append(bombMessage);
      gameOver = true;
    }

    const currNumberBomb = document.createElement('p');
    currNumberBomb.innerHTML = 'cellsCount';

    const numbers = getCount(row, column);
    cell.innerHTML = numbers;
    cell.classList.add('clicked');
    cell.classList.add('opened');

    const colorDigits = {
      1: 'numberGreen',
      2: 'numberBlue',
      3: 'numberRed',
      4: 'numberYellow',
      5: 'numberViolent',
      6: 'numberPink',
      7: 'numberGold',
      8: 'numberPurple',
    };

    if (numbers in colorDigits) {
      cell.classList.add(colorDigits[numbers]);
      if (cell.classList.contains('flag')) {
        cell.classList.remove('flag');
      }
    }

    if (numbers === 0) {
      cell.setAttribute('disabled', true);
      cell.innerHTML = '';
      if (cell.classList.contains('flag')) {
        cell.classList.remove('flag');
      }
      for (let x = -1; x <= 1; x++) {
        for (let y = -1; y <= 1; y++) {
          openBoard(row + y, column + x);
        }
      }
    }
  }

  board.addEventListener('click', (event) => {
    if (gameOver) {
      return;
    }

    if (event.target.tagName !== 'BUTTON') {
      const cell = event.target;

      if (cell.classList.contains('clicked')) {
        return;
      }
      cell.classList.add('clicked');
      const index = cells.indexOf(cell);
      const column = index % count;
      const row = Math.floor(index / count);
      openBoard(row, column);
    }
  });
};

function renderNewBoard(row, column) {
  const game = document.querySelector('.container');
  counter = 0;
  if (game) {
    const body = document.querySelector('body');
    body.removeChild(game);
  }
  const minesInput = document.querySelector('.mine-count-input');
  const updateMines = document.querySelector('.update-mines');
  const bombMessage = document.querySelector('.bomb-message');

  if (minesInput) minesInput.remove();
  if (updateMines) updateMines.remove();
  if (bombMessage) bombMessage.remove();

  gameOver = false;
  createBoard();
  renderBoardGame(row, column);
}

function renderColorThemeBtn() {
  const changeTheme = document.createElement('button');
  const header = document.querySelector('.container-buttons');
  changeTheme.className = 'theme';
  changeTheme.innerText = 'Theme';

  changeTheme.addEventListener('click', () => {
    const game = document.querySelector('.game-board');
    document.body.classList.toggle('dark-theme');
    game.classList.toggle('change');
  });
  header.append(changeTheme);
}

function rendeModeBtns() {
  const header = document.createElement('div');
  header.className = 'container-buttons';

  const butnEasy = document.createElement('button');
  butnEasy.className = 'butn-easy';
  butnEasy.innerText = 'Easy';

  const butnMedium = document.createElement('button');
  butnMedium.className = 'butn-easy';
  butnMedium.innerText = 'Medium';

  const butnHard = document.createElement('button');
  butnHard.className = 'butn-easy';
  butnHard.innerText = 'Hard';

  butnEasy.addEventListener('click', () => renderNewBoard(10, 10));
  butnMedium.addEventListener('click', () => renderNewBoard(15, 70));
  butnHard.addEventListener('click', () => renderNewBoard(25, 99));

  header.append(butnEasy, butnMedium, butnHard);
  document.body.append(header);
}

document.addEventListener('DOMContentLoaded', () => {
  rendeModeBtns();
  renderColorThemeBtn();
  renderNewBoard(10, 10);
});
