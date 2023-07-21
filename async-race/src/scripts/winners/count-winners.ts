import { getWinnersCount } from "../api"

let length: number = 0

export async function updataCountWinners() {
  const result = await getWinnersCount(1, 4, 'id', 'order');
  length = result;

  const countWinners = document.querySelector('.count-winners');
  if (countWinners) {
    countWinners.textContent = `${length}`;
  }
}

export const getCountWinners = async (): Promise<number> => {
  const result = await getWinnersCount(1, 4, 'id', 'order');
  length = result;
  return length
}

console.log(getCountWinners());

export default 
updataCountWinners()