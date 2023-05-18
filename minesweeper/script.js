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
      time.innerText = `Time: ${minutes}:${formattedSeconds}`;
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
  const clickedCell = document.querySelector('.board tr td');
  if (!clickedCell.classList.contains('clicked')) {
    counter += 1;
  }
}

let countBomb = 0;
function counterBombs(cell) {
  // const clickedCell = document.querySelector('.board tr td');
  if (!cell.classList.contains('clicked')) {
    if (cell.classList.contains('flag')) {
      countBomb += 1;
    } else {
      countBomb -= 1;
    }
  }
}

const createBoard = () => {
  const container = document.createElement('div');
  container.className = 'container';

  const gameBoard = document.createElement('div');
  gameBoard.className = 'game-board';

  const header = document.createElement('div');
  header.className = 'header';

  const clickName = document.createElement('span');
  clickName.innerText = 'Steps: ';
  clickName.className = 'clicks';
  const clicks = document.createElement('span');
  clicks.className = 'clicks';
  clicks.innerText = '0';
  clickName.append(clicks);

  const resetGame = document.createElement('button');
  resetGame.className = 'reset-game';
  resetGame.innerText = '↺';

  const timeName = document.createElement('span');
  timeName.innerText = 'Time: ';
  timeName.className = 'seconds';

  const time = document.createElement('span');
  time.className = 'seconds';
  time.innerText = '00:00';
  timeName.append(time);

  const board = document.createElement('table');
  board.className = 'board';
  board.innerHTML = '';
  container.append(gameBoard);
  gameBoard.append(header, board);
  header.append(clickName, timeName, resetGame);
  document.body.append(container);
};

// function countBomb() {
//   const containerButtons = document.querySelector('.container-buttons');
//   const countBombs = document.createElement('span');
//   countBombs.className = 'count-bombs';
//   countBombs.innerText = 'Mines: ';
//   containerButtons.append(countBombs);
// }

const renderBoardGame = (rows, bombs) => {
  const containerMine = document.createElement('div');
  containerMine.className = 'container-mines';

  const nameMine = document.createElement('span');
  nameMine.innerText = 'Mines: ';
  nameMine.className = 'mines-name';

  const minesCount = document.createElement('input');
  minesCount.type = 'number';
  minesCount.id = 'mina';
  minesCount.className = 'mine-count-input';
  minesCount.min = 10;
  minesCount.max = 99;
  minesCount.value = bombs;
  minesCount.placeholder = 'mines';

  const countFlags = document.createElement('span');
  countFlags.className = 'count-bombs';
  countFlags.innerText = `Flags: ${bombs}`;

  const board = document.querySelector('.board');
  board.addEventListener('click', () => {
    if (!gameOver) { timer(); }
  });

  const game = document.querySelector('.container-buttons');

  const updateGameButton = document.createElement('button');
  updateGameButton.className = 'update-mines';
  updateGameButton.innerText = 'Update';

  countBomb = bombs;
  containerMine.append(nameMine, minesCount, updateGameButton, countFlags);
  game.append(containerMine);

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

      currentCell.addEventListener('contextmenu', (event) => {
        event.preventDefault();
        if (!gameOver || !currentCell.classList.contains('clicked') || !currentCell.classList.contains('opened')) {
          counterBombs(event.target);
          const clickedFlag = document.querySelector('.count-bombs');
          clickedFlag.textContent = `Flags: ${countBomb}`;
          event.target.classList.toggle('flag');
          audio.play();
        }
      });

      currentCell.addEventListener('click', () => {
        if (!gameOver || !currentCell.classList.contains('clicked') || !currentCell.classList.contains('opened')) {
          counterClicks();
          const clickedCell = document.querySelector('.clicks');
          clickedCell.textContent = `Steps: ${counter}`;
        }
      });
    }
  }
  const cells = [...board.querySelectorAll('td')];
  let cellsCount = cells.length;

  // const mines = [...Array((count) * (count)).keys()]
  //   .sort(() => Math.random() - 0.5)
  //   .slice(0, bombs);

  const mines = [];
  let firstClick = true;

  function placeMines(row, column) {
    mines.length = 0;

    while (mines.length < bombs) {
      const randomIndex = Math.floor(Math.random() * cellsCount);

      const clickedIndex = row * count + column;
      if (randomIndex !== clickedIndex) {
        mines.push(randomIndex);
      }
    }
  }

  function isValid(row, column) {
    return row >= 0 && row < count && column >= 0 && column < count;
  }

  function isBomb(row, column) {
    if (!isValid(row, column)) return false;
    const index = row * count + column;
    return mines.includes(index);
  }

  function handleFirstClick(row, column) {
    placeMines(row, column);
    firstClick = false;
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
    if (firstClick) {
      handleFirstClick(row, column);
    }
    const index = row * count + column;
    const cell = cells[index];
    if (!isValid(row, column)) return;

    if (cell.classList.contains('opened')) return;
    if (cell.classList.contains('flag')) {
      if (cell.classList.contains('clicked')) {
        cell.classList.remove('clicked');
      }
      return;
    }

    if (isBomb(row, column)) {
      audioGameOver.play();
      gameOver = true;
      cell.classList.add('bomb');
      cell.innerHTML = '💣';
      resetTimer();
      if (cell.classList.contains('bomb')) {
        if (cell.classList.contains('flag')) {
          cell.classList.remove('flag');
        }
        const bombMessage = document.createElement('h1');
        bombMessage.className = 'bomb-message';
        bombMessage.innerText = 'You Lost!!! Try again';
        const gamesButtons = document.querySelector('body');
        gamesButtons.append(bombMessage);
        const bom = 'You Lost!!! Try again';
        const time = document.querySelector('.seconds').innerHTML;
        saveGameResult(time, bom);
      }
      return;
    //   alert('You lost');
    }

    cellsCount--;
    if (cellsCount <= bombs) {
      resetTimer();
      const time = document.querySelector('.seconds').innerHTML;
      const clicks = document.querySelector('.clicks').innerHTML;
      audioWin.play();
      const bombMessage = document.createElement('h1');
      bombMessage.className = 'bomb-message';
      bombMessage.innerText = `Hooray! You found all mines in ${time} seconds and ${clicks} moves!" or "Game over. Try again`;
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
      cell.classList.add('opened');
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

// function saveState() {
//   const time = document.querySelector('.seconds').innerHTML;
//   const minesInput = document.querySelector('.mine-count-input');
//   const data = { time, minesInput };
//   localStorage.setItem('saveGame', JSON.stringify(data));
// }

function saveGameResult(time, bombs) {
  const savedGame = JSON.parse(localStorage.getItem('Your result')) || [];
  savedGame.push({ time, bombs });
  if (savedGame.length > 10) {
    savedGame.shift();
  }
  localStorage.setItem('Your result', JSON.stringify(savedGame));
  updateGameHistory();
}
let checked = false;
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
  const minesName = document.querySelector('.container-mines');
  const mi = document.querySelector('.history-game');

  if (minesInput) minesInput.remove();
  if (updateMines) updateMines.remove();
  if (bombMessage) bombMessage.remove();
  if (minesName) minesName.remove();
  if (mi) mi.remove();

  gameOver = false;
  createBoard();
  renderBoardGame(row, column);
  renderColorThemeBtn();

  const gameBoard = document.querySelector('.checkbox');
  gameBoard.checked = checked; // Восстановление значения checked
  gameBoard.classList.add('checked');
}

function renderColorThemeBtn() {
  const changeTheme = document.createElement('input');
  const label = document.createElement('label');
  const dropdownContent = document.querySelector('.header');

  changeTheme.className = 'checkbox';
  changeTheme.id = 'checkbox';
  changeTheme.type = 'checkbox';
  changeTheme.checked = checked;

  label.setAttribute('for', 'checkbox');
  label.className = 'toggle-label';
  label.innerHTML = '<span class="toggle"></span>';

  changeTheme.addEventListener('click', () => {
    const game = document.querySelector('.game-board');
    document.body.classList.toggle('dark-theme');
    game.classList.toggle('change');
    checked = changeTheme.checked;
  });

  dropdownContent.appendChild(changeTheme);
  dropdownContent.appendChild(label);
}

function updateGameHistory() {
  const results = JSON.parse(localStorage.getItem('Your result')) || [];
  const gameResult = document.querySelector('.history-game');

  if (gameResult) {
    gameResult.innerHTML = '';

    results.forEach((res) => {
      const resultElem = document.createElement('p');
      resultElem.innerText = `Your result: ${res.time}, ${res.bombs}`;
      gameResult.appendChild(resultElem);
    });
  }
}

let gameResult = null;

function historyGame() {
  const containerButtons = document.querySelector('.container-buttons');
  const gameStatus = document.createElement('span');
  gameStatus.className = 'status';
  gameStatus.innerHTML = 'History';
  const results = JSON.parse(localStorage.getItem('Your result')) || [];
  updateGameHistory();
  gameStatus.addEventListener('click', () => {
    if (results.length > 0) {
      if (!gameResult) {
        gameResult = document.createElement('span');
        gameResult.className = 'history-game';

        results.forEach((res) => {
          const resultElem = document.createElement('p');
          resultElem.innerText = `You result : ${res.time},  ${res.bombs} `;
          gameResult.append(resultElem);
        });

        document.body.appendChild(gameResult);
      } else {
        gameResult.remove();
        gameResult = null;
      }
    }
  });
  containerButtons.append(gameStatus);
}

const logo = document.createElement('h1');
logo.innerText = 'Minesweeper';
logo.className = 'logo';
document.body.append(logo);

function rendeModeBtns() {
  const header = document.createElement('div');
  header.className = 'container-buttons';

  const butnEasy = document.createElement('button');
  butnEasy.className = 'butn-easy';
  butnEasy.innerText = 'Easy';

  const butnMedium = document.createElement('button');
  butnMedium.className = 'butn-easy';
  butnMedium.innerText = 'Medium';

  const optionsContainer = document.createElement('div');
  optionsContainer.className = 'dropdown';

  const optionsMenu = document.createElement('span');
  optionsMenu.className = 'menu';
  optionsMenu.id = 'menu';
  optionsMenu.innerHTML = '⚙️';

  const dropdownContent = document.createElement('div');
  dropdownContent.className = 'dropdown-content';
  dropdownContent.id = 'my-dropdown';

  const butnHard = document.createElement('button');
  butnHard.className = 'butn-easy';
  butnHard.innerText = 'Hard';

  optionsMenu.addEventListener('click', () => {
    document.getElementById('my-dropdown').classList.toggle('show');
  });

  butnEasy.addEventListener('click', () => renderNewBoard(10, 10));
  butnMedium.addEventListener('click', () => renderNewBoard(15, 70));
  butnHard.addEventListener('click', () => renderNewBoard(25, 99));
  dropdownContent.append(butnEasy, butnMedium, butnHard);
  optionsContainer.append(optionsMenu, dropdownContent);
  header.append(optionsContainer);
  document.body.append(header);
}

window.onclick = function (e) {
  if (!e.target.matches('.menu')) {
    const myDropdown = document.getElementById('my-dropdown');
    if (myDropdown.classList.contains('show')) {
      myDropdown.classList.remove('show');
    }
  }
};

document.addEventListener('DOMContentLoaded', () => {
  rendeModeBtns();
  historyGame();
  // countBomb();
  renderNewBoard(10, 10);
});
