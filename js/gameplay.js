import $ from 'jquery'

export default class Gameplay {
  constructor(game) {
    this.game = game
    this.counter = 0
  }

  async update(deltaTime) {
    this.counter++

    if (this.counter>5) {
      $(".delta-time-game").html(deltaTime.toFixed(1))
      this.counter = 0
    }

    await this.game.input.updateCamera();
    await this.game.renderer.render(this.game.scene, this.game.camera)
  }
}
