import * as THREE from 'three'
import $ from 'jquery'
import * as bootstrap from 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

import Graphics from './game-graphics.js'
import Loader from './loader.js'
import Input from './input.js'
import Menu from './menu.js'
import Gameplay from './gameplay.js'
import Inventory from './inventory.js'

export default class Game {
  constructor() {
    this.generalLoading = false
    this.graphicsLoading = false
    this.inputsLoading = false
    this.mapLoading = false
    this.animating = false
    this.play = true

    // ---
    this.loadedTextures = {}
    this.config = {}
    this.$loading = {}
    this.$menu = {}
    this.$game = {}
    this.$inventory = {}
    this.currentState = 'menu'

    this.moveSpeed = 0.07,
    this.currentGravity = -0.05,
    this.gravityValue = 0.05,

    // ---
    this.boundingBoxes = []


    this.renderInterval = 20

    // HELP 
    this.ghostMode = false
    this.lightsOn = true
    this.boxHelp = false

    this.init()
  }

  async init() {
    this.mapVariableReset()
    console.log(this.map)
    
    await this.buildHtmlElements()

    this.loader = new Loader(this)
    this.graphics = new Graphics(this)
    this.menu = new Menu(this)
    this.inventory = new Inventory(this)
    this.gameplay = new Gameplay(this)
    this.input = new Input(this)

    // Ha új betöltés lenne, init akkor már nem tölti be amit nem kell
    if (!this.generalLoading) await this.loader.generalLoader(true)
    if (!this.graphicsLoading) await this.graphics.init()
    if (!this.inputsLoading) await this.input.gameControls()
    
    this.raycaster = new THREE.Raycaster()
    this.mouse = new THREE.Vector2()

    // const ambient = new THREE.AmbientLight(0xcccccc, 0.4); // szín, erősség
    // this.scene.add(ambient);

    this.loop()
  }

  mapVariableReset() {
    return this.map = {
      data: {},
      structure: {},
      actions: [],
      objects: [],
      lights: [],
      player: {
        x: 0,
        y: 0,
        z: 0,
        fYaw: 0,
        fXaw: 0,
      }
    }
  }

  showHideOptions(windowName) {
    const elements = {
        $loading: this.$loading,
        $menu: this.$menu,
        $game: this.$game,
        $inventory: this.$inventory,
    };

    const windows = {'loading': this.$loading, 'menu': this.$menu, 'game': this.$game, 'inventory': this.$inventory}

    for(const [name, window] of Object.entries(windows)) {      
      if (name == windowName) window.show(); else window.hide();
      if (name == windowName) console.log(name + ' == ' + windowName); // !
    }
  }

  async buildHtmlElements() {
    $('body').html('')
    this.$loading = $(`<div id="loading-container" class="bg-black text-white">
        <dic class="full-size d-flex justify-content-center align-items-center">
          Loading...
        </div>
      </div>`)
    this.$menu = $(`
      <div id="menu-container">
      <div class="full-size bg-dark d-flex justify-content-center align-items-center">
        <div class="delta-time-menu text-white"></div>
          <button class="btn btn-primary rounded-0" data-bs-toggle="modal" data-bs-target="#myModal">
            Join the menu
          </button>
          <div class="modal fade" id="myModal" tabindex="-1">
            <div class="modal-dialog modal-dialog-centered">
              <div class="modal-content bg-light">
                <div class="modal-header">
                  <h5 class="modal-title text-uppercase text-center w-100">The forgotten cottage</h5>
                  <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body text-center">
                  <div id="filelist-container" class="w-100 mb-3" style="display: grid; grid-template-columns:repeat(3, 1fr);gap:5px;"></div>
                  <input id="file-input" type="text" name="filename" value="maniac">
                  <div class="my-2">
                      <input type="checkbox" id="lights-button" checked>
                      <span class="text-black"> All Lights ON</span>
                  </div>
                  <div class="mb-2">
                      <input type="checkbox" id="gravity-button" checked>
                      <span class="text-black"> Gravity</span>
                  </div>
                  <div class="mb-2">
                      <input type="checkbox" id="ghost-button">
                      <span class="text-black"> Ghost mode</span>
                  </div>
                  <button id="closeBtn" class="btn btn-dark">Belépés</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>`)
    this.$game = $(`
      <div id="game-container">
        <canvas id="game-canvas"><canvas>
      </div>
      <div class="delta-time-game text-white"></div>`)

    this.$inventory = $(`<div id="inventory-container" class="bg-success">Inventory</div>`)

    // this.$loading.hide();
    this.$menu.hide();  
    // this.$game.hide();
    this.$inventory.hide();

    $("body").append( this.$loading,  this.$menu,  this.$game,  this.$inventory)
  }

  deepCopy(data, allVisible) { 
    if (Array.isArray(data)) {
      return data.map(item => this.deepCopy(item, allVisible));
    }
    if (data !== null && typeof data == 'object') {
      let copy = {};
      for (let key in data) {
        if (data.hasOwnProperty(key)) {
          copy[key] = (key == 'visible' && allVisible == true) ? 1 : this.deepCopy(data[key], allVisible);
        }
      }
      return copy;
    }
    return data;
  }

  async loop(timestamp = 0) {
    requestAnimationFrame((timestamp) => this.loop(timestamp))
  
    if (!this.lastRenderTime) this.lastRenderTime = timestamp
    const delta = timestamp - this.lastRenderTime

    // FISST MAP LOADING
    if (this.currentState == 'game' && !this.mapLoading) {
      console.log('MAPLOADED + ANIMATED START')
      this.mapLoading = true
      await this.loader.mapLoader()
    }

    switch (this.currentState) {
      case 'menu':
        this.menu.update(delta)
        break
      case 'game':
        if (delta >= this.renderInterval) {
          await this.gameplay.update(delta)
          this.lastRenderTime = timestamp
        }
        break
      case 'inventory':
        this.inventory.update(delta)
        break
    }  
  }
}

const game = new Game()