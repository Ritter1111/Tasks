/* eslint-disable no-plusplus */
/* eslint-disable no-undef */
const timer = () => {
  let seconds = 0;
  const time = document.querySelector('.seconds');
  setInterval(() => {
    seconds++;
    const minutes = Math.floor(seconds / 60);
    const formattedSeconds = seconds % 60 < 10 ? `0${seconds % 60}` : seconds % 60;
    time.innerText = `${minutes}:${formattedSeconds}`;
  }, 1000);
};

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
  board.addEventListener('click', timer);

  container.append(gameBoard);
  gameBoard.append(header, board);
  header.append(clicks, flag, time);
  document.body.append(container);
};

const createTable = (count) => {
  const board = document.querySelector('.board');
  board.innerHTML = '';
  for (let i = 0; i < count; i++) {
    currentrRow = board.insertRow(i);
    for (let j = 0; j < count; j++) {
      currentCell = currentrRow.insertCell(j);
    }
  }
};

const switchBoard = () => {
  const butnEasy = document.createElement('button');
  butnEasy.className = 'butn-easy';
  butnEasy.innerText = 'Easy';
  const butnMedium = document.createElement('button');
  butnMedium.className = 'butn-easy';
  butnMedium.innerText = 'Medium';
  const butnHard = document.createElement('button');
  butnHard.className = 'butn-easy';
  butnHard.innerText = 'Hard';
  butnEasy.addEventListener('click', () => createTable(10));
  butnMedium.addEventListener('click', () => createTable(15));
  butnHard.addEventListener('click', () => createTable(25));
  document.body.append(butnEasy, butnMedium, butnHard);
};

document.addEventListener('DOMContentLoaded', () => {
  createBoard();
  createTable(10);
  switchBoard();
});
