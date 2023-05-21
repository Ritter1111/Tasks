let intervalId = null;
let gameOver = false;
let counter = 0;
let checked = false;
let soundOff = false;

const logo = document.createElement('p');
logo.innerText = 'Minesweeper';
logo.className = 'logo';
document.body.append(logo);

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

function counterClicks(cell) {
  if (!cell.classList.contains('clicked')) {
    if (!cell.classList.contains('flag')) {
      counter += 1;
    }
  }
}

let countBomb = 0;
function counterBombs(cell) {
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

  const time = document.createElement('span');
  time.className = 'seconds';
  time.innerText = 'Time: 0:00';

  const board = document.createElement('table');
  board.className = 'board';
  board.innerHTML = '';
  container.append(gameBoard);
  gameBoard.append(header, board);
  header.append(clickName, time, resetGame);
  document.body.append(container);
};

function renderBoardGame(rows, bombs) {
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

  minesCount.addEventListener('change', (event) => {
    if (event.target.value < 10) {
      event.target.value = 10;
    } else if (event.target.value > 99) {
      event.target.value = 99;
    }
  });

  const countFlags = document.createElement('span');
  countFlags.className = 'count-bombs';
  countFlags.innerText = `🏴: ${bombs}`;

  const soundButton = document.createElement('button');
  soundButton.className = 'sound-toggle';
  soundButton.innerText = '🔊';

  soundButton.addEventListener('click', () => {
    soundOff = !soundOff;
    if (soundButton.innerHTML === '🔊') {
      soundButton.innerHTML = '🔇';
    } else {
      soundButton.innerHTML = '🔊';
    }
  });

  function toggleSound(name) {
    // const soundToggle = document.querySelector('.sound-toggle');
    if (!soundOff) {
      name.play();
    } else {
      name.pause();
    }
  }

  const countMines = document.createElement('span');
  countMines.className = 'count-mines';
  countMines.innerText = `💣: ${bombs}`;

  const board = document.querySelector('.board');
  board.addEventListener('click', () => {
    if (!gameOver) {
      timer();
    }
  });

  const game = document.querySelector('.container-buttons');

  const updateGameButton = document.createElement('button');
  updateGameButton.className = 'update-mines';
  updateGameButton.innerText = 'Update';

  countBomb = bombs;
  containerMine.append(nameMine, minesCount, updateGameButton, countFlags, countMines, soundButton);
  game.append(containerMine);

  const resetGame = () => {
    const bombMessage = document.querySelector('.bomb-message');
    if (bombMessage) bombMessage.remove();
    if (minesCount) minesCount.remove();
    if (updateGameButton) updateGameButton.remove();
    renderNewBoard(rows, bombs);
    resetPopup();
    gameOver = false;
    const soundBtn = document.querySelector('.sound-toggle');
    if (soundOff) {
      soundOff = true;
      soundBtn.innerHTML = '🔇';
    } else {
      soundBtn.innerHTML = '🔊';
    }
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
  const audioClick = new Audio('assets/click.mp3');

  audio.preload = 'auto';
  audio.className = 'audio';
  audioWin.preload = 'auto';
  audioGameOver.preload = 'auto';
  audioClick.preload = 'auto';

  const count = rows;
  board.innerHTML = '';

  for (let i = 0; i < count; i++) {
    currentrRow = board.insertRow(i);
    for (let j = 0; j < count; j++) {
      currentCell = currentrRow.insertCell(j);

      currentCell.addEventListener('contextmenu', (event) => {
        event.preventDefault();
        if (
          !gameOver
          || !currentCell.classList.contains('clicked')
          || !currentCell.classList.contains('opened')
        ) {
          counterBombs(event.target);
          const clickedFlag = document.querySelector('.count-bombs');
          clickedFlag.textContent = `🏴: ${countBomb}`;
          event.target.classList.toggle('flag');
          toggleSound(audio);
        }
      });

      currentCell.addEventListener('click', (event) => {
        if (!gameOver
          || !currentCell.classList.contains('clicked')
          || !currentCell.classList.contains('opened')
          || !currentCell.classList.contains('flag')
        ) {
          counterClicks(event.target);
          toggleSound(audioClick);

          if (!gameOver) {
            const clickedCell = document.querySelector('.clicks');
            clickedCell.textContent = `Steps: ${counter}`;
          }
        }
      });
    }
  }
  const cells = [...board.querySelectorAll('td')];
  let cellsCount = cells.length;

  const mines = [];
  let firstClick = true;

  function placeMines(row, column) {
    mines.length = 0;

    while (mines.length < bombs) {
      const randomIndex = Math.floor(Math.random() * cellsCount);
      const clickedIndex = row * count + column;
      const isMine = mines.includes(randomIndex);
      if (randomIndex !== clickedIndex && !isMine) {
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
      const openCell = document.querySelectorAll('.board td');
      openCell.forEach((item) => {
        if (isBomb(item.parentNode.rowIndex, item.cellIndex)) {
          item.classList.add('clicked');
          item.classList.add('opened');
          item.classList.add('bomb');
          item.classList.remove('flag');
          item.innerHTML = '💣';
        }
      });
      toggleSound(audioGameOver);
      cell.classList.add('bomb');
      cell.innerHTML = '💣';
      resetTimer();
      gameOver = true;

      windowPopup('You Lost!!! Try again');

      const popupWindow = document.querySelector('.popap-game-result');
      popupWindow.classList.add('active');
      if (cell.classList.contains('bomb')) {
        if (cell.classList.contains('flag')) {
          cell.classList.remove('flag');
        }
      }
      return;
    }

    cellsCount--;
    if (cellsCount <= bombs) {
      resetTimer();
      const time = document.querySelector('.seconds').innerText;
      const clicks = document.querySelector('.clicks').innerHTML;
      toggleSound(audioWin);
      gameOver = true;

      windowPopup(`Hooray! You found all mines in ${time} seconds and ${clicks} moves!`);
      const popupWindow = document.querySelector('.popap-game-result');
      popupWindow.classList.add('active');
      const bom = 'You Won!';
      saveGameResult(time, clicks, bom);
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
}

function saveGameResult(time, clicks, bombs) {
  const savedGame = JSON.parse(localStorage.getItem('Your result')) || [];
  savedGame.push({ time, clicks, bombs });
  if (savedGame.length > 10) {
    savedGame.shift();
  }
  localStorage.setItem('Your result', JSON.stringify(savedGame));
  updateGameHistory();
}

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
  resetPopup();
  resetTimer();

  renderBoardGame(row, column);
  renderColorThemeBtn();

  const gameBoard = document.querySelector('.checkbox');
  gameBoard.checked = checked;
  gameBoard.classList.add('checked');
  const gameBoardColor = document.querySelector('.game-board');
  if (checked) {
    gameBoardColor.classList.add('change');
  } else {
    gameBoardColor.classList.remove('change');
  }
  const soundBtn = document.querySelector('.sound-toggle');
  if (soundOff) {
    soundOff = true;
    soundBtn.innerHTML = '🔇';
  } else {
    soundBtn.innerHTML = '🔊';
  }
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
      resultElem.innerText = `Your result: ${res.time}, ${res.clicks}, ${res.bombs}`;
      gameResult.appendChild(resultElem);
    });
  }
}

let gameResult = null;

function historyGame() {
  const containerButtons = document.querySelector('.container-buttons');
  const gameStatus = document.createElement('span');
  gameStatus.className = 'status';
  gameStatus.innerHTML = 'Results';
  updateGameHistory();
  gameStatus.addEventListener('click', () => {
    if (!gameResult) {
      renderResultsTable();

      document.body.appendChild(gameResult);
    } else {
      gameResult.remove();
      gameResult = null;
    }
  });
  containerButtons.append(gameStatus);
}

function renderResultsTable() {
  const results = JSON.parse(localStorage.getItem('Your result')) || [];
  const table = document.createElement('table');
  table.className = 'results-table';

  const thead = document.createElement('thead');
  const headerRow = document.createElement('tr');
  const timeHeader = document.createElement('th');
  timeHeader.innerText = 'Time';
  const clicksHeader = document.createElement('th');
  clicksHeader.innerText = 'Clicks';
  const bombsHeader = document.createElement('th');
  bombsHeader.innerText = 'Message';

  headerRow.append(timeHeader, clicksHeader, bombsHeader);
  thead.append(headerRow);
  table.append(thead);

  const tbody = document.createElement('tbody');
  results.forEach((result) => {
    const row = document.createElement('tr');
    const timeCell = document.createElement('td');
    timeCell.innerText = result.time;
    timeCell.className = 'table-row';
    const clicksCell = document.createElement('td');
    clicksCell.innerText = result.clicks;
    clicksCell.className = 'table-row';
    const bombsCell = document.createElement('td');
    bombsCell.innerText = result.bombs;
    bombsCell.className = 'table-row';

    row.append(timeCell, clicksCell, bombsCell);
    tbody.append(row);
  });

  table.append(tbody);

  gameResult = document.createElement('div');
  gameResult.className = 'history-game';
  gameResult.append(table);
}

function windowPopup(message) {
  const popup = document.createElement('div');

  popup.className = 'popap-game-result';
  popup.id = 'popap-game-result';

  const popapWindow = document.createElement('div');
  popapWindow.className = 'popap-window';

  const contentPopap = document.createElement('div');
  contentPopap.className = 'content-popap';
  contentPopap.innerText = message;

  const closeButton = document.createElement('button');
  closeButton.className = 'close-popap';
  const closeImage = document.createElement('img');
  closeImage.src = 'assets/close.svg';
  closeImage.alt = '';

  closeButton.addEventListener('click', () => {
    popup.classList.remove('active');
  });

  contentPopap.appendChild(closeButton);
  closeButton.appendChild(closeImage);
  popapWindow.appendChild(contentPopap);
  popup.appendChild(popapWindow);
  document.body.append(popup);
}

function resetPopup() {
  const popupWindow = document.querySelector('.popap-game-result');
  if (popupWindow) {
    popupWindow.classList.remove('active');
    popupWindow.remove();
  }
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

window.onclick = function (event) {
  if (!event.target.matches('.menu')) {
    const myDropdown = document.getElementById('my-dropdown');
    if (myDropdown.classList.contains('show')) {
      myDropdown.classList.remove('show');
    }
  }
};

document.addEventListener('DOMContentLoaded', () => {
  rendeModeBtns();
  historyGame();
  renderNewBoard(10, 10);
});
