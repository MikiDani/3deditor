import $ from 'jquery'

export default class Menu {
    constructor(game) {
      this.game = game
      this.options = {
        hints: false,         // Shows what objects should be used for the given "action"
        darkContrast: 0.004   // Minimum dark contrast options
      }
      this.init()
    }

    async init() {
        // console.log('Init MENU...')
    }

    update(deltaTime) {
      if (!this.game.$menu.is(':visible')) {
        this.game.showHideOptions('menu')
      }

      this.render(deltaTime)
    }

    render(deltaTime) {
      $(".delta-time-menu").html(deltaTime.toFixed(0))
      // console.log(this.game.currentState)
    }
}