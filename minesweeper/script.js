/* eslint-disable no-loop-func */
/* eslint-disable no-param-reassign */
/* eslint-disable no-plusplus */
/* eslint-disable no-undef */
// const timer = () => {
//   let seconds = 0;
//   const time = document.querySelector('.seconds');
//   setInterval(() => {
//     seconds++;
//     const minutes = Math.floor(seconds / 60);
//     const formattedSeconds = seconds % 60 < 10 ? `0${seconds % 60}` : seconds % 60;
//     time.innerText = `${minutes}:${formattedSeconds}`;
//   }, 1000);
// };
let gameOver = false;

const createBoard = () => {
  const container = document.createElement('div');
  container.className = 'container';
  const gameBoard = document.createElement('div');
  gameBoard.className = 'game-board';
  const header = document.createElement('div');
  header.className = 'header';
  const clicks = document.createElement('span');
  clicks.className = 'clicks';
  clicks.innerText = '0:0';
  const flag = document.createElement('button');
  flag.className = 'flag';
  flag.innerText = '🚩';
  const time = document.createElement('span');
  time.className = 'seconds';
  time.innerText = '0:00';
  const board = document.createElement('table');
  board.className = 'board';
  board.innerHTML = '';
  //   board.addEventListener('click', timer);

  container.append(gameBoard);
  gameBoard.append(header, board);
  header.append(clicks, flag, time);
  document.body.append(container);
};

const renderBoardGame = (count, bombs) => {
  const board = document.querySelector('.board');
  const audio = new Audio('minesweeper/assets/sound.mp3');
  board.innerHTML = '';
  for (let i = 0; i < count; i++) {
    currentrRow = board.insertRow(i);
    for (let j = 0; j < count; j++) {
      currentCell = currentrRow.insertCell(j);
      currentCell.addEventListener('click', () => {
        if (!gameOver) {
          audio.play();
        }
      });
    }
  }
  const cells = [...board.querySelectorAll('td')];
  //   console.log(cells);
  const mines = [...Array((count) * (count)).keys()]
    .sort(() => Math.random() - 0.5)
    .slice(0, bombs);
  //   console.log(mines);

  function isValid(row, column) {
    return row >= 0 && row < count && column >= 0 && column < count;
  }

  function isBomb(row, column) {
    if (!isValid(row, column)) return false;
    const index = row * count + column;
    // console.log(index);
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
    if (!isValid(row, column)) return;
    const audio2 = new Audio('minesweeper/assets/game-over.mp3');
    const index = row * count + column;
    const cell = cells[index];

    if (cell.classList.contains('opened')) return;
    cell.classList.add('opened');
    // if (cell.classList.contains('clicked')) return;
    if (isBomb(row, column)) {
      gameOver = true;
      cell.classList.add('bomb');
      cell.innerHTML = '💣';
      if (cell.classList.contains('bomb')) {
        const bombMessage = document.createElement('h1');
        bombMessage.className = 'bomb-message';
        bombMessage.innerText = 'You Lost!!! Try again';
        document.body.append(bombMessage);
        audio2.play();
      }
      alert('You lost');
    }
    const numbers = getCount(row, column);
    cell.innerHTML = numbers;
    cell.classList.add('clicked');
    if (numbers === 0) {
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
      //   console.log(index);
      openBoard(row, column);
    }
  });
};

const resetGame = (count, bombs) => {
  gameOver = false;
  document.querySelector('.clicks').innerText = '0:0';
  document.querySelector('.seconds').innerText = '0:00';
  renderBoardGame(count, bombs);
};

const switchDifficulty = () => {
  const butnEasy = document.createElement('button');
  butnEasy.className = 'butn-easy';
  butnEasy.innerText = 'Easy';
  const butnMedium = document.createElement('button');
  butnMedium.className = 'butn-easy';
  butnMedium.innerText = 'Medium';
  const butnHard = document.createElement('button');
  butnHard.className = 'butn-easy';
  butnHard.innerText = 'Hard';
  butnEasy.addEventListener('click', () => resetGame(10, 10));
  butnMedium.addEventListener('click', () => resetGame(15, 15));
  butnHard.addEventListener('click', () => resetGame(25, 25));
  document.body.append(butnEasy, butnMedium, butnHard);
};

document.addEventListener('DOMContentLoaded', () => {
  switchDifficulty();
  createBoard();
  renderBoardGame(10, 10);
});
