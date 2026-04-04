import * as THREE from 'three';
import $ from 'jquery';

export default class Graphics {
  constructor(game) {
    this.game = game
    this.scX
    this.scY
    this.init()
  }

  async init() {
    this.game.canvas = document.getElementById('game-canvas')
    this.game.renderer = new THREE.WebGLRenderer({canvas: this.game.canvas})
    this.game.renderer.domElement.style.imageRendering = 'pixelated'
    this.game.renderer.setPixelRatio(1)
    this.game.renderer.setClearColor(0x000000, 1)

    this.game.scene = new THREE.Scene()
    this.game.heandScene = new THREE.Scene()

    this.reloadScreen()

    this.game.graphicsLoading = true
  }

  reloadScreen() {
    // console.log(this.checkGPU())
    if (this.checkGPU()) {
      // HIGH
      this.game.targetFPS = 60
      this.game.renderInterval = 1000 / this.game.targetFPS

      // this.scX = 1024; this.scY = 576
      this.scX = window.innerWidth / 1; this.scY = window.innerHeight / 1

      this.far = 13
    } else {
      // LOW

      // !!!
      /*
      $("#game-container").removeClass('full-size').addClass('mx-auto').addClass('small-size')
      $("#game-canvas").removeClass('full-size').addClass('mx-auto').addClass('small-size')
      */

      this.game.targetFPS = 25
      this.game.renderInterval = 1000 / this.game.targetFPS

      this.scX = window.innerWidth / 10
      this.scY = window.innerHeight / 10
      this.far = 7

      this.move = {
        push: false,
        key: '',
        speed: 0,
        add: 0.01,
        max: 0.1,
        sub: 0.98,
        cameraUp: {},
        playerRotationY: {}
      }
    }

    this.game.camera = new THREE.PerspectiveCamera(60, this.scX / this.scY, 0.1, this.far)

    this.game.renderer.setSize(this.scX, this.scY, false)
    this.game.renderer.setPixelRatio(1)

    const savePos = this.game.camera ? this.game.camera.position.clone() : null
    const saveRot = this.game.camera ? this.game.camera.rotation.clone() : null

    this.game.camera = new THREE.PerspectiveCamera(60, this.scX / this.scY, 0.1, this.far)

    savePos ? this.game.camera.position.set(savePos.x, savePos.y, savePos.z) : this.game.camera.position.set(0, 0, 0);
    if (saveRot) this.game.camera.rotation.set(saveRot.x, saveRot.y, saveRot.z);
    
    if (!this.game.listener) this.game.listener = new THREE.AudioListener();
    this.game.camera.add(this.game.listener)

    this.game.pitchObject = new THREE.Object3D()
    this.game.pitchObject.add(this.game.camera)

    const savePlayerPos = this.game.player ? this.game.player.position.clone() : null
    const savePlayerRot = this.game.player ? this.game.player.rotation.clone() : null

    this.game.player = new THREE.Object3D()

    savePlayerPos
    ? this.game.player.position.set(savePlayerPos.x, savePlayerPos.y, savePlayerPos.z)
    : this.game.player.position.set(0, 0, 0);
    if (savePlayerRot) this.game.player.rotation.set(savePlayerRot.x, savePlayerRot.y, savePlayerRot.z);

    this.game.player.add(this.game.pitchObject)
    this.game.player.updateMatrixWorld(true)

    this.game.scene.add(this.game.player)
  }

  checkGPU() {
    try {
      const gl = this.game.renderer.getContext()
      if (!gl) return false;

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