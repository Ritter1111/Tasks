import './index.html'
import burgerView from './scripts/burgerView'
import Game from './scripts/game'
import './style.scss'
// import hljs from 'highlight.js/lib/core'
// import xml from 'highlight.js/lib/languages/xml'

export const game = new Game()
// hljs.registerLanguage('xml', xml)

window.onload = () => {
  const burger = new burgerView()

  burger.init()
  game.initGame()
}
