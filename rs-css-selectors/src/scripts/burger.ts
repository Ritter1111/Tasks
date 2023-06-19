export default class burgerView {
  public burger: HTMLElement | null
  public menu: HTMLElement | null

  constructor() {
    this.burger = document.querySelector('.burger')
    this.menu = document.querySelector('.nav-menu')
  }

  public init(): void {
    this.burger?.addEventListener('click', () => {
      this.menu?.classList.toggle('open')
    })
  }
}
