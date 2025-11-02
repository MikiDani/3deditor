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
    this.game.heandScene = new THREE.Scene()

    // console.log(this.checkGPU())
    if (this.checkGPU()) {
      // HIGH
      console.log('High')
      this.scX = window.innerWidth / 2
      this.scY = window.innerHeight / 2
      this.far = 10
    } else {
      // LOW
      console.log('Low')
      this.scX = window.innerWidth / 7
      this.scY = window.innerHeight / 7
      this.far = 5
    }

    this.game.renderer.setSize(this.scX, this.scY, false)
    this.game.renderer.setPixelRatio(1)

    this.game.camera = new THREE.PerspectiveCamera(60, this.scX / this.scY, 0.1, this.far)
    this.game.listener = new THREE.AudioListener()
    this.game.camera.add(this.game.listener)

    this.game.pitchObject = new THREE.Object3D()
    this.game.pitchObject.add(this.game.camera)

    this.game.player = new THREE.Object3D()
    this.game.player.position.set(0, 0, 0)
    this.game.player.add(this.game.pitchObject)
    this.game.scene.add(this.game.player)

    //---
    this.game.graphicsLoading = true
  }

  checkGPU() {
    try {
      const gl = this.game.renderer.getContext()
      if (!gl) return false

      const debugInfo = gl.getExtension('WEBGL_debug_renderer_info')
      let vendor = ''
      let renderer = ''

      if (debugInfo) {
        vendor = gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL) || ''
        renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) || ''
      } else {
        vendor = gl.getParameter(gl.VENDOR) || ''
        renderer = gl.getParameter(gl.RENDERER) || ''
      }

      const fullInfo = (vendor + ' ' + renderer).toLowerCase()
      
      // console.log('GPU info:', vendor, renderer) //?? GRAPHICS CARD INFO

      // ha a stringben gyanús szavak vannak, akkor CPU fallback
      const blacklist = ['swiftshader', 'software', 'llvmpipe', 'mesa', 'angle (google', 'soft']
      const isSoftware = blacklist.some(word => fullInfo.includes(word))

      return !isSoftware
    } catch (e) {
      console.warn('GPU check failed:', e)
      return false
    }
  }
}