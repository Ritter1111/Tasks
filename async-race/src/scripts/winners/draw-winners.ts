import { DataWinner } from "../types/types";
import { createSVGImage } from "../ui";

export function navToWinnersPage(winn: HTMLElement) {
  const winnersButton = <HTMLElement>document.querySelector('.winners');
  const main = <HTMLElement>document.querySelector('.main');
  winnersButton.addEventListener('click', () => {
    winn.style.display = 'block'
    main.style.display = 'none'
  });
}

export function navToGarage(winn: HTMLElement) {
  const garageButton = <HTMLElement>document.querySelector('.garage');
  const main = <HTMLElement>document.querySelector('.main');
  garageButton.addEventListener('click', () => {
    main.style.display = 'block'
    winn.style.display = 'none'
  });
}

export const contentWinners = (winner: DataWinner, color: string, name: string) => `
<td>${winner.id}</td>
<td>${createSVGImage(color)}</td>
<td>${name}</td>
<td>${winner.wins}</td>
<td>${winner.time}</td>
`

export const winnersPage = () => {
  const winnersContent = `  <div class="winners-page">
   <h3 class="garage-name">Winners (<span class="count-winners"></span>)</h3>
   <h4 class="number-page">Page #1</h4>
   <table>
   <thead>
     <tr>
       <th>Number</th>
       <th>Car</th>
       <th>Name</th>
       <th>Wins</th>
       <th>Best Time (seconds)</th>
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

 if(winPage) {
   winPage.style.display = 'none'
   navToWinnersPage(winPage)
   navToGarage(winPage)
 }
 };

 export default winnersPage