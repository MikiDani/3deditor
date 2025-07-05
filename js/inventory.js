import $ from 'jquery'

export default class Inventory {
    constructor(game) {
      this.game = game
      this.init()
    }

    init() {
    }

    update(deltaTime) {
      // console.log('UPDATE')
      $(".delta-time-inventory").html(deltaTime.toFixed(1))

      // console.log(this.game.config.objectsdata)
      
      $(".inventory-list").html(this.game.config.objectsdata.map(obj => obj.name + ', '))
    }

    render() {
      console.log('RENDER')
    }
  }