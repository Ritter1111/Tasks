import { getWinnersCount } from "../api"

let length: number = 0

export async function updataCountWinners() {
  const result = await getWinnersCount(1, 10, 'id', 'order');
  
  length = result;

  const countWinners = document.querySelector('.count-winners') as HTMLElement;
  
  if (countWinners) {
    countWinners.textContent = `${length}`;
  }
}

export const getCountWinners = async (): Promise<number> => {
  const result = await getWinnersCount(1, 10, 'id', 'order');
  length = result;
  return length
}

export default updataCountWinners
