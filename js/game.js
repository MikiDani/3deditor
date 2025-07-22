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
    this.loadingError = false
    this.generalLoading = false
    this.graphicsLoading = false
    this.inputsLoading = false
    this.mapLoading = false
    this.animating = false
    this.play = true

    this.gravity
    this.lightsOn
    this.ghostMode

    this.loadedTextures = {}
    this.loadedLights = []
    this.loadedMeshs = []

    this.config = {}
    this.$loading = {}
    this.$menu = {}
    this.$game = {}
    this.$inventory = {}
    this.currentState = 'menu'

    this.moveSpeed = 0.03,
    this.currentGravity = -0.05,
    this.gravityValue = 0.05,

    this.playerObjects = []

    // ---
    this.boundingBoxes = []
    this.playerBoundingBox = new THREE.Vector3(0.3, 1, 0.3)

    this.renderInterval = 20

    // HELP 
    this.ghostMode = false
    this.lightsOn = true

    this.boxHelp = false

    this.init()
  }

  async init() {
    this.mapVariableReset() // console.log(this.map)

    await this.buildHtmlElements()

    this.loader = new Loader(this)
    this.graphics = new Graphics(this)
    this.menu = new Menu(this)
    this.inventory = new Inventory(this)
    this.gameplay = new Gameplay(this)
    this.input = new Input(this)
    
    // Ha új betöltés lenne, init akkor már nem tölti be amit nem kell
    if (!this.generalLoading) await this.loader.generalLoader(false);
    if (this.loadingError) { this.loadingErrorAction(); return; }

    if (!this.graphicsLoading) await this.graphics.init(); if (this.loadingError) return;
    if (this.loadingError) { this.loadingErrorAction(); return; }

    if (!this.inputsLoading) await this.input.gameControls(); if (this.loadingError) return;

    this.raycaster = new THREE.Raycaster()
    this.mouse = new THREE.Vector2()

    this.loop()
  }

  mapVariableReset() {
    return this.map = {
      data: {},
      structure: {},
      actions: [],
      actionelements: [],
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

  findMeshById(data, meshId) {
    if (!Array.isArray(data)) return null;

    for (let mesh of data) {
      if (!mesh || typeof mesh !== "object") continue;
  
      if (mesh.id == meshId) {
        return mesh;
      }
      // find child
      if (mesh.child && mesh.child.length > 0) {
        let found = this.findMeshById(mesh.child, meshId);
        if (found) {
          return found;
        }
      }
    }
    return null;
  }

  showHideOptions(windowName) {
    const windows = {'loading': this.$loading, 'menu': this.$menu, 'game': this.$game, 'inventory': this.$inventory}

    for(const [name, window] of Object.entries(windows)) {      
      if (name == windowName) window.show(); else window.hide();
    }
  }

  async buildHtmlElements() {
    $('body').html('')
    this.$loading = $(`<div id="loading-container" class="bg-black text-white">
        <dic id="loading-text" class="full-size d-flex justify-content-center align-items-center">
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
          <div class="modal" id="myModal" tabindex="-1">
            <div class="modal-dialog modal-dialog-centered">
              <div class="modal-content bg-light">
                <div class="modal-header">
                  <h5 class="modal-title text-uppercase text-center w-100">The forgotten cottage</h5>
                  <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body text-center">
                  <div id="filelist-container" class="w-100 mb-3" style="display: grid; grid-template-columns:repeat(3, 1fr);gap:5px;"></div>
                  <input id="file-input" type="text" name="filename" value="maniac" data-ext="mtuc">
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
        <canvas id="game-canvas"></canvas>
      </div>
      <div class="delta-time-game text-white"></div>`)

    this.$inventory = $(`
    <div id="inventory-container" class="bg-success">
      <h4>Inventory</h4>
      <div class="delta-time-inventory text-white"></div>
      <div class="inventory-list text-white fw-bold"></div>
    </div>`)

    // this.$loading.hide();
    this.$menu.hide();
    // this.$game.hide();
    this.$inventory.hide();

    $("body").append( this.$loading,  this.$menu,  this.$game,  this.$inventory)

    this.gravity = $("#gravity-button").is(":checked")
    this.lightsOn = $("#lights-button").is(":checked") 
    this.ghostMode = $("#ghost-button").is(":checked")
  }

  async loop(timestamp = 0) {
    requestAnimationFrame((timestamp) => this.loop(timestamp))
  
    if (!this.lastRenderTime) this.lastRenderTime = timestamp
    const delta = timestamp - this.lastRenderTime

    // FIRST LOAD OF MAP | MAPLOADED + ANIMATED START
    if (this.currentState == 'game' && !this.mapLoading) {
      try {
        this.mapLoading = true
        await this.loader.mapLoader(false)
        // console.log(this.loadedMeshs)
      } catch(e) {
        this.loadingErrorAction(); return;
      }
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

  loadingErrorAction() {    
    $("#loading-text").html('Load error!')
    this.showHideOptions('loading')
  }

  checkPlayerObject(objects = []) {    
    for (const objId of objects) {
      if (!this.playerObjects.includes(objId)) return false;
    }
    return true;
  }

  removeObjectOfMap(threeObject) {
    // DELETE SCENE
    this.scene.remove(threeObject)
  
    // DELETE ACTIONELEMENTS
    this.map.actionelements = this.map.actionelements.filter(
      ([group, _]) => group !== threeObject
    )
  
    // DELETE BOUNDINGBOXES
    threeObject.children.forEach(child => {
      if (child.geometry?.boundingBox) {
        const box = child.geometry.boundingBox.clone()
        box.min.add(child.position); box.max.add(child.position);
        this.boundingBoxes = this.boundingBoxes.filter(existingBox =>
          !existingBox.equals(box)
        )
      }
    })
  }

  removeBoundingBoxOfMap(threeObject) {    
    // DELETE BOUNDINGBOXES
    threeObject.children.forEach(child => {
      if (child.geometry?.boundingBox) {
        const box = child.geometry.boundingBox.clone()
        box.min.add(child.position); box.max.add(child.position);
        this.boundingBoxes = this.boundingBoxes.filter(existingBox =>
          !existingBox.equals(box)
        )
      }
    })
  }
}

const game = new Game()