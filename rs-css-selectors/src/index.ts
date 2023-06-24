import './index.html'
import Game from './scripts/game'
import './style.scss'

export const game = new Game()

window.onload = () => {
  game.initGame()
}
