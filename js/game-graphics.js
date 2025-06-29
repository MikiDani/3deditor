import * as THREE from 'three';

export default class Graphics {
  constructor(game) {
    this.game = game
    this.init()
  }

  async init() {
    const canvas = document.getElementById('game-canvas')
    this.game.canvas = canvas
    this.game.renderer = new THREE.WebGLRenderer({ canvas })
    this.game.scene = new THREE.Scene()

    const scX = window.innerWidth / 2
    const scY = window.innerHeight / 2

    this.game.renderer.setSize(scX, scY, false)
    this.game.renderer.setPixelRatio(1)

    this.game.camera = new THREE.PerspectiveCamera(60, scX / scY, 0.1, 10)
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