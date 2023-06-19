// import App from './scripts/app'
import './index.html'
import burgerView from './scripts/burger'
import Game from './scripts/game'
import './style.scss'
// import { renderLevels } from './scripts/renderLevel'

// window.onload = () => {
//   const app = new App()

//   app.start()
// }

window.onload = () => {
  const burger = new burgerView()
  const game = new Game()

  burger.init()
  game.initGame()
}
