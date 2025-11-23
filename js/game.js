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

import Sound from './sound.js'

export default class Game {
  constructor() {
    this.loadingError = false
    this.generalLoading = false
    this.graphicsLoading = false
    this.inputsLoading = false
    this.soundsLoading = false

    this.mapLoading = false

    this.filename = 'maniac'
    this.ext = 'mtuc'

    this.animating = false
    this.play = true

    this.timers = {
      timeouts: [],
      intervals: []
    }

    this.music
    this.gravity
    this.lightsOn
    this.ghostMode

    // --- memory datas
    this.config = {}
    this.loadedTextures = {}
    this.loadedSounds = []
    this.objectsList = []
    this.beingsList = []
    this.heandsList = []

    // --- map datas
    this.loadedLights = []
    this.loadedBeings = []
    this.loadedObjects = []
    this.loadedHeands = []
    this.loadedMeshs = []
    this.activePlayedSounds = []
    
    // inventory datas
    this.playerObjectsDefault = [7,0,1,2,3]
    // this.playerObjects = [4,5,6,7,0,1,2,3,3,4,5,6,7,0,1,2,3]
    this.playerObjects = this.playerObjectsDefault

    this.playerProtectedObjects = [7]

    this.$loading = {}
    this.$menu = {}
    this.$game = {}
    this.$inventory = {}
    this.currentState = 'menu'

    this.moveSpeed = 0.015,
    this.currentGravity = -0.05,
    this.gravityValue = 0.05,

    this.stepHeight = 0.2


    this.mouseMaxPitchDefault = 80
    this.mouseMinPitchDefault = -80

    this.playerMouse = {
      mode: null,    // use, view,
      selectedObject: null,
      selectedHeand: '',
      mouseMaxPitch: 80,
      mouseMinPitch: -60,
    }

    this.autoMovePlayerData = {
      mode: null,
      weapon: null,
    }

    // ---
    this.boundingBoxes = []
    this.playerBoundingBox = new THREE.Vector3(0.4, 1, 0.4)

    this.renderInterval = 20  // 20

    // HELP 
    this.ghostMode = false
    this.lightsOn = true

    this.boxHelp = false

    this.init()
  }

  async init() {
    this.map = this.mapVariableReset()

    await this.buildHtmlElements()

    this.loader = new Loader(this)
    this.graphics = new Graphics(this)
    this.menu = new Menu(this)
    this.inventory = new Inventory(this)
    this.gameplay = new Gameplay(this)
    this.input = new Input(this)
    this.sound = new Sound(this)

    // FIRST MOUSE MODE
    this.playerMouse.mode = 'use'
    this.input.removeAllCursorClass()
    $('html').addClass('cursor-use')

    $('#mouseorkey-selector').addClass('click-selector-pic')

    // Ha új betöltés lenne, init akkor már nem tölti be amit nem kell
    if (!this.generalLoading) await this.loader.generalLoader(false); //logOn
    if (this.loadingError) {
      $("#loading-text").addClass('text-error').html('Load error!')
      return;
    }

    if (!this.graphicsLoading) await this.graphics.init();
    if (!this.inputsLoading) await this.input.gameControls();

    // LOAD SAVE GAMES LIST
    await this.loader.loadSavedgamesList()

    // LOADING SUCCESS
    $("#loading-text").addClass('text-green').html('Load success!')

    this.raycaster = new THREE.Raycaster()
    this.mouse = new THREE.Vector2()

    this.loop()
  }

  async loop(timestamp = 0) {
    // FIRST LOAD OF MAP | MAPLOADED + ANIMATED START
    if (this.currentState == 'game' && !this.mapLoading) {
      // console.log('--- RELOAD MAP ---')

      this.$loading.show()
      await this.loader.mapLoader(this.filename, this.ext) // LOADING MAP

      if (!this.inventory.firstLoadedAllObjects) await this.inventory.firstLoadAllObjects(); // LOADING INVENTORY
      this.$loading.hide()

      // PLAY MUSIC
      this.music = $("#music-button").prop("checked")
     if (this.music) this.sound.play(16, {volume: 0.2, loop: true})
    }

    // REAL LOOP
    requestAnimationFrame((timestamp) => this.loop(timestamp))
    if (!this.lastRenderTime) this.lastRenderTime = timestamp
    const delta = timestamp - this.lastRenderTime

    switch (this.currentState) {
      case 'menu':
        this.menu.update(delta)
        break
      case 'game':
        if (delta >= this.renderInterval) {

          if (this.mapLoading) await this.gameplay.update(delta)
          this.lastRenderTime = timestamp
        }
        break
      case 'inventory':
        this.inventory.update(delta)
        break
    }
  }

  mapVariableReset() {
    this.map = null
    this.map = {
      map_filename: '',
      map_ext: '',
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
        fXaw: 0
      }
    }
    return this.map;
  }

  deepCopy(data, allVisible = false) {
    if (Array.isArray(data)) {
      return data.map(item => this.deepCopy(item, allVisible));
    }
    if (data !== null && typeof data == 'object') {
      if (Array.isArray(data)) {
        return data.map(item => this.deepCopy(item, allVisible))
      }
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

  addConsoleRow(text, element, uppercase = false, color) {
    color = color ? 'text-ok' : 'text-error'
    $("#loading-console").append(`<${element} class="${color}">${uppercase ? text.toUpperCase() : text}</${element}>`).scrollTop($("#loading-console")[0].scrollHeight)
  }

  async buildHtmlElements() {
    await document.fonts.ready
    $('body').html('')
    this.$loading = $(`<div id="loading-container" class="text-white">
        <div class="full-size d-flex flex-column justify-content-center align-items-center">
          <div id="console-container" class="d-flex flex-column justify-content-center align-items-center bg-dark w-50">
            <div id="loading-text">Loading...</div>
            <div id="loading-console"></div>
            <div id="console-reset">RESET</div>
            </div>
          </div>
      </div>`)
    this.$menu = $(`
      <div id="menu-container">
        <div class="full-size d-flex justify-content-center align-items-center">
          <div class="delta-time-menu text-white"></div>
          <button class="btn btn-primary rounded-0" data-bs-toggle="modal" data-bs-target="#topLayer">
            Join the menu
          </button>
          <div class="modal" id="topLayer" tabindex="-1">
            <div class="modal-dialog modal-dialog-centered modal-xl">
              <div class="modal-content bg-light">
                <div class="modal-header">
                  <h5 class="modal-title text-uppercase text-center w-100">The forgotten cottage</h5>
                  <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body text-center row">
                  <div id="filelist-container" class="w-50 mb-3" style="display: grid; grid-template-columns:repeat(3, 1fr);gap:5px;"></div>
                  
                  <div id="load-save-container" class="w-50 mb-3" style="display: grid; grid-template-columns:repeat(3, 1fr);gap:5px;">
                    <div class="w-100 bg-pink d-flex flex-column justify-content-center align-items-center">
                      <button id="savegame-button" class="btn btn-sm btn-danger mb-3">Save</button>
                      <button id="loadgame-button" class="btn btn-sm btn-success mb-3">Load</button>
                      <div id="savegame-message" class="text-center w-100">message</div>
                    </div>
                    <div id="savegame-list" class="d-flex flex-column justify-content-start align-items-center"></div>
                  </div>

                  <div class="text-center">
                    <input id="file-input" type="text" class="w-50" name="filename" value="maniac" data-ext="mtuc">
                  </div>
                  <div class="my-2">
                      <input type="checkbox" id="music-button">
                      <span class="text-black"> Music ON</span>
                  </div>
                  <br>
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
      <div id="game-container" style="display:none;">
        <canvas id="game-canvas"></canvas>
        <div id="cursor-text-box" style="display:none;"></div>
        <div id="text-box-container">
          <div id="text-box" style="display:none;">
            <button id="text-box-close-button"></button>
            <div id="text-box-text"></div>
          </div>
        </div>
        <div id="use-selector"></div>
        <div id="look-selector"></div>
        <div id="mouseorkey-selector" class="mouseorkey-preload"></div>
      </div>
      <div class="delta-time-game text-white"></div>`)

    this.$inventory = $(`
      <div id="inventory-container">
        <div id="inventory-logo"></div>
        <canvas id="inventory-3d-canvas"></canvas>
        <div id="object-text-container">
          Nisi similique perferendis et, recusandae suscipit molestiae eos fuga iste hic, temporibus est vero soluta quo voluptates blanditiis ab. Eius, qui? Harum ea similique enim illum odio saepe nobis repudiandae! Nisi similique perferendis et.
        </div>
        <div id="inventory-item-text-container">
          <div class="item-text-container"></div>
          <div class="item-text-container"></div>
          <div class="item-text-container"></div>
          <div class="item-text-container"></div>
          <div class="item-text-container"></div>
          <div class="item-text-container"></div>
          <div class="item-text-container"></div>
        </div>
        <div id="arrow-up"></div>
        <div id="arrow-down"></div>
        <div id="inventory-selected-item-container">
          <div id="object-use" data-mode="use" class="item-selected-text-container">USE OBJECT</div>
          <div id="object-eat" data-mode="eat" class="item-selected-text-container">EAT or DRINK OBJECT</div>
          <div id="object-read" data-mode="read" class="item-selected-text-container">READ CONTENT</div>
        </div>

        <div id="note-container" style="display:none;">
          <div id="note-background">
            <div id="note-content">
              <span class="note-title"></span><br><br>
              <span class="note-text"></span>
            </div>
            <div id="note-arrow-left"></div>
            <div id="note-arrow-right"></div>
            <button class="note-close-button"></button>
          </div>
        </div>

        <div id="book-container" style="display:none;">
          <div id="book-background">
            <div id="book-content-1">
              <span class="book-title-1"></span><br><br>
              <span class="book-text-1"></span>
            </div>
            <div id="book-content-2">
              <span class="book-title-2"></span><br><br>
              <span class="book-text-2"></span>
            </div>
            <div id="book-arrow-left"></div>
            <div id="book-arrow-right"></div>
            <button class="book-close-button"></button>
          </div>
        </div>

        <div class="delta-time-inventory text-white"></div>
      </div>`);

    // this.$loading.hide();
    // this.$menu.hide();
    // this.$game.hide();
    this.$inventory.hide();

    $("body").append( this.$loading,  this.$menu,  this.$game,  this.$inventory)

    this.gravity = $("#gravity-button").prop("checked")
    this.lightsOn = $("#lights-button").prop("checked") 
    this.ghostMode = $("#ghost-button").prop("checked")
  }

  checkPlayerObject(objects = []) {
    if (this.playerObjects) {
      for (const objId of objects) {
        if (!this.playerObjects.includes(objId)) return false;
      }
      return true;
    }
    return false;
  }

  removeObjectOfMap(scene, threeObject) {
    if (threeObject._boundingBox) {
      this.boundingBoxes = this.boundingBoxes.filter(box => box !== threeObject._boundingBox)
      threeObject._boundingBox = null
    }

    if (threeObject.container && threeObject.container._boundingBox) {
      this.boundingBoxes = this.boundingBoxes.filter(box => box !== threeObject.container._boundingBox)
      threeObject.container._boundingBox = null
    }
  
    threeObject.traverse(obj => {
      if (obj.geometry && obj.geometry.boundingBox) {
        const childBox = obj.geometry.boundingBox.clone()
  
        const pos = new THREE.Vector3()
        obj.getWorldPosition(pos)
  
        childBox.min.add(pos)
        childBox.max.add(pos)
  
        this.boundingBoxes = this.boundingBoxes.filter(box => !box.equals(childBox))
      }
    })

    scene.remove(threeObject)
  
    this.map.actionelements = this.map.actionelements.filter(
      ([group, _]) => group !== threeObject
    )

    if (this.boxHelp && scene.children.length > 0) {
      scene.children = scene.children.filter(obj => {
        return !(obj.type === 'LineSegments' && obj.material.color?.getHex() === 0xffff00)
      })
    }
  
    for (const [id, meshGroup] of Object.entries(this.loadedMeshs)) {
      if (meshGroup === threeObject) {
        delete this.loadedMeshs[id]
        break
      }
    }
  
    threeObject.traverse(obj => {
      if (obj.geometry) obj.geometry.dispose()
      if (obj.material) {
        if (Array.isArray(obj.material)) {
          obj.material.forEach(m => m.dispose())
        } else {
          obj.material.dispose()
        }
      }
    })
  }

  deleteAllObjectInScene(scene) {
    // TO COLLECT ALL MESH
    if (scene.background) scene.background.dispose();
    if (scene.environment) scene.environment.dispose();
    scene.background = null; scene.environment = null;

    const toRemove = []
    scene.traverse(obj => {
      if (obj.isMesh || obj.isGroup || obj.isLight || obj.isAudio || obj.isCamera ||
          obj.isSprite || obj.isLine || obj.isPoints || obj.isHelper || obj.isBone || // isLine a helper
          obj.isSkeletonHelper || obj.isAxesHelper || obj.isGridHelper) toRemove.push(obj);
    })
    // DELETE
    for (const obj of toRemove) {
      this.removeObjectOfMap(scene, obj)
    }
  }

removeBoundingBoxOfMap(mesh) {
  if (mesh._boundingBox) {
    this.boundingBoxes = this.boundingBoxes.filter(box => box !== mesh._boundingBox)
    mesh._boundingBox = null
  }

  if (mesh.container && mesh.container._boundingBox) {
    this.boundingBoxes = this.boundingBoxes.filter(box => box !== mesh.container._boundingBox)
    mesh.container._boundingBox = null
  }

  this.boundingBoxes = this.boundingBoxes.filter(box => {
    const testBox = new THREE.Box3().setFromObject(mesh)
    return !box.equals(testBox)
  })

  mesh.traverse(obj => {
    if (obj.geometry && obj.geometry.boundingBox) {
      const childBox = obj.geometry.boundingBox.clone()
      const pos = new THREE.Vector3()
      obj.getWorldPosition(pos)
      childBox.min.add(pos)
      childBox.max.add(pos)

      this.boundingBoxes = this.boundingBoxes.filter(box => !box.equals(childBox))
      }
    })
  }

  refreshBoundingBoxOfMap(mesh) {
    const updatedBox = new THREE.Box3().setFromObject(mesh.container)
    const index = this.boundingBoxes.findIndex(box => box === mesh._boundingBox)
    if (index !== -1) this.boundingBoxes[index] = updatedBox;
    else this.boundingBoxes.push(updatedBox);
    mesh._boundingBox = updatedBox
  }

  refreshBoundingBoxOfMapContainer(mesh) {
    if (!mesh.container) return
  
    const updatedBox = new THREE.Box3().setFromObject(mesh.container)
  
    // előző box kiszedése
    if (mesh._boundingBox) {
      this.boundingBoxes = this.boundingBoxes.filter(box => box !== mesh._boundingBox)
    }
  
    // új box berakása
    this.boundingBoxes.push(updatedBox)
  
    // mentés
    mesh._boundingBox = updatedBox
  }

  forceClearAllTimers() {
    let highestTimeoutId = setTimeout(() => {}, 0)
    let highestIntervalId = setInterval(() => {}, 0)
    for (let i = 0; i <= highestTimeoutId; i++) clearTimeout(i);
    for (let i = 0; i <= highestIntervalId; i++) clearInterval(i);
    // RESTART MOUSE CHECK INTERVAL
    this.input.checkLookingInterval()
  }
}

const game = new Game()