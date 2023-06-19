// import App from './scripts/app'
import './index.html'
import burgerView from './scripts/burger'
import './style.scss'

// window.onload = () => {
//   const app = new App()

//   app.start()
// }

window.onload = () => {
  const burger = new burgerView()

  burger.init()
}
