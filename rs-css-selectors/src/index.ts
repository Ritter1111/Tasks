import './index.html'
import burgerView from './scripts/burgerView'
import Game from './scripts/game'
import './style.scss'

export const game = new Game()

window.onload = () => {
  const burger = new burgerView()

  burger.init()
  game.initGame()
}
