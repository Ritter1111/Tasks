
`In the game, mines are scattered throughout a board, which is divided into cells. Cells have three states: unopened, opened and flagged. An unopened cell is blank and clickable, while an opened cell is exposed. Flagged cells are unopened cells marked by the player to indicate a potential mine location; some implementations make flagged cells inoperable to reduce the risk of uncovering a suspected mine. A player selects a cell to open it. If a player opens a mined cell, the game ends in a loss. Otherwise, the opened cell displays either a number, indicating the number of mines diagonally and/or adjacent to it, or a blank tile (or "0"), and all adjacent non-mined cells will automatically be opened. Players can also flag a cell, visualized by a flag being put on the location, to denote that they believe a mine to be in that place.`

![image](https://github.com/rolling-scopes-school/ritter1111-JSFE2023Q1/assets/86166867/93e2c7a5-7790-4c43-bbb3-de0d85887eb1)
Deploy: [link](https://rolling-scopes-school.github.io/ritter1111-JSFE2023Q1/minesweeper/)
Done 22.05.2023 / deadline 23.05.2023
Score: 170 / 180
  - [x] layout, design, responsive UI: +10
  - [x] at the beginning state of the game, the frame has size 10x10 and is filled with unopened cells. Should be 10 mines on field by default: +10
  - [x] when user click on cells - it should be opened and marked as one of the following state: empty cell, cell with number, or cell with mine: +10
  - [x]  the game should end when the player reveals all cells that do not contain mines (win) or clicks on mine (lose) and related message is displayed at the end of the game: +10
  - [x]  mines are placed after the first move, so that user cannot lose on the first move. +20
  - [x] user can mark “mined” cells using flags so as not to accidentally open them displaying the number of mines remaining and displaying number of used flags: +10
  - [x] the game should use color coding (using numbers and colors) to indicate the number of mines surrounding a revealed cell: +10
  - [x] the game can be restarted without reloading the page: +10
  - [x] game duration and number of clicks are displayed: +15
  - [x] when user opens a square that does not touch any mines, it will be empty and the adjacent squares will automatically open in all directions until reaching squares that contain numbers: +15
  - [x] sound accompaniment (on/off) when clicking on cell and at the end of the game: +10
  - [x] implement ability to change the size(easy - 10x10, medium - 15x15, hard - 25x25) and number of mines for each size of the field (from 10 to 99): +20
  - [x]  implemented saving the latest 10 results using LocalStorage: +10
  - [ ] implemented saving the state of the game: +10
  - [x] option to choose different themes for the game board (dark/light themes): +10

##### https://rolling-scopes-school.github.io/ritter1111-JSFE2023Q1/shelter/main/
##### https://rolling-scopes-school.github.io/ritter1111-JSFE2023Q1/minesweeper
