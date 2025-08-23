import * as THREE from 'three';

export default class Graphics {
  constructor(game) {
    this.game = game
    this.scX
    this.scY
    this.init()
  }

  init() {
    this.game.canvas = document.getElementById('game-canvas')
    this.game.renderer = new THREE.WebGLRenderer({ canvas: this.game.canvas })
    this.game.renderer.domElement.style.imageRendering = 'pixelated'
    this.game.renderer.setPixelRatio(1)
    this.game.scene = new THREE.Scene()

    if (true) {
      // HIGH
      this.scX = window.innerWidth / 2
      this.scY = window.innerHeight / 2
      this.far = 10
    } else {
      // LOW
      this.scX = window.innerWidth / 8
      this.scY = window.innerHeight / 8
      this.far = 5
    }

    this.game.renderer.setSize(this.scX, this.scY, false)
    this.game.renderer.setPixelRatio(1)

    this.game.camera = new THREE.PerspectiveCamera(60, this.scX / this.scY, 0.1, this.far)
    this.game.scene.add(this.game.camera)

    this.game.pitchObject = new THREE.Object3D()
    this.game.pitchObject.add(this.game.camera)

    this.game.player = new THREE.Object3D()
    this.game.player.position.set(0, 0, 0)
    this.game.player.add(this.game.pitchObject)
    this.game.scene.add(this.game.player)

    //---
    this.game.graphicsLoading = true
  }

  render() {
    // this.game.renderer.render(this.game.scene, this.game.camera)
  }
}