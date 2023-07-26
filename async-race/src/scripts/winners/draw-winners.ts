import { getCar, getWinners } from "../api";
import { DataWinner } from "../types/types";
import { createSVGImage } from "../ui";
import { updataCountWinners } from "./count-winners";

let currentSortOrder = 'asc';

export const contentWinners = (winner: DataWinner, color: string, name: string) => `
<td>${winner.id}</td>
<td>${createSVGImage(color)}</td>
<td>${name}</td>
<td>${winner.wins}</td>
<td>${winner.time}</td>
`

export const drawWinners = async (sort: string, order: string) => {
  const winners = await getWinners(1, 10, sort, order)
  const winnerTable = document.querySelector('.winner-table') as HTMLElement
  winnerTable.innerHTML = ""

  winners.forEach(async (item) => {
    const car = await getCar(item.id)
    const wrapperWinner = document.createElement('tr')
    wrapperWinner.innerHTML = contentWinners(item, car.color, car.name)
    winnerTable.append(wrapperWinner)
  })
}

export function navToWinnersPage(winn: HTMLElement) {
  const winnersButton = <HTMLElement>document.querySelector('.winners');
  const main = <HTMLElement>document.querySelector('.main');
  winnersButton.addEventListener('click', () => {
    winn.style.display = 'block'
    main.style.display = 'none'
    updataCountWinners()
    drawWinners('id', 'asc')
  });
}

export function sortWins() {
  document.addEventListener('click', async (e) => {
    const target = e.target as HTMLButtonElement;
  
    if (target.classList.contains('sort-wins')) {
      currentSortOrder = currentSortOrder === 'asc' ? 'desc' : 'asc';
      const sortOrderWins = document.querySelector('.sort-wins .sort-ord') as HTMLElement;
      sortOrderWins.textContent = currentSortOrder === 'asc' ? '⬆️' : '⬇️';

      drawWinners('wins', currentSortOrder)
    }

    if (target.classList.contains('sort-time')) {
      currentSortOrder = currentSortOrder === 'asc' ? 'desc' : 'asc';
      const sortOrderTime = document.querySelector('.sort-time .sort-ord') as HTMLElement;
      sortOrderTime.textContent = currentSortOrder === 'asc' ? '⬆️' : '⬇️';

      drawWinners('time', currentSortOrder)
    }

  })
}

export function navToGarage(winn: HTMLElement) {
  const garageButton = <HTMLElement>document.querySelector('.garage');
  const main = <HTMLElement>document.querySelector('.main');
  garageButton.addEventListener('click', () => {
    main.style.display = 'block'
    winn.style.display = 'none'
  });
}

export const winnersPage = () => {
  const winnersContent = `  <div class="winners-page">
   <h3 class="garage-name">Winners (<span class="count-winners"></span>)</h3>
   <h4 class="number-page">Page # <span class="number-page-win">1</span></h4>
   <table>
   <thead>
     <tr>
       <th>Number</th>
       <th>Car</th>
       <th>Name</th>
       <th class="sort-wins">Wins<span class="sort-ord"></span></th>
       <th class="sort-time">Best Time (seconds)<span class="sort-ord"></span></th>
     </tr>
   </thead>
   <tbody  class="winner-table">
   </tbody>
 </table>
 <div class="winners-pagination">
 <button class="btn pre-page" disabled="true">prev</button>
 <button class="btn nxt-page" disabled="true">next</button>
 </div>
 </div>
 `;
  const winnersSection = document.createElement('section');
  winnersSection.innerHTML = winnersContent
  document.body.append(winnersSection)
  const winPage = <HTMLElement>document.querySelector('.winners-page') as HTMLElement;

  if (winPage) {
    winPage.style.display = 'none'
    navToWinnersPage(winPage)
    navToGarage(winPage)
    sortWins()
  }
};

export default winnersPage