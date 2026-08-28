import $ from 'jquery'
import * as THREE from 'three';

export default class Inventory {
    constructor(game) {
      this.game = game
      this.inventory = {}
      this.scX
      this.scY

      this.firstLoadedAllObjects = false

      this.selectedObject = null

      this.inventoryMenu = {
        selectedObject: false,
        reloadInventory: true,
        inventoryStartIndex: 0,
        inventoryPosition: 0,
        inventoryLength: 7,
        objectSelected: false,
        objectSelectedData: null,
        selectedPosition: 0,
        selectedLength: 0,
      }

      this.readArray = {
        readType: null,
        readData: null,
        readIndex: 0,
      }

      this.init()
    }

    init() {
      this.inventory.canvas = document.getElementById('inventory-3d-canvas')
      this.inventory.renderer = new THREE.WebGLRenderer({ canvas: this.inventory.canvas })
      this.inventory.renderer.domElement.style.imageRendering = 'pixelated'
      this.inventory.renderer.setPixelRatio(1)

      this.isX = 470
      this.isY = 470

      this.inventory.renderer.setSize(this.isX, this.isY, false)

      this.inventory.scene = new THREE.Scene()

      // Kamera létrehozása
      this.inventory.camera = new THREE.PerspectiveCamera(60, this.isX / this.isY, 0.1, 5)
      this.inventory.camera.position.set(0, 0.5, 0.8)
      this.inventory.camera.rotateX(-0.5)

      const ambient = new THREE.AmbientLight('#ffffff', 1)
      this.inventory.scene.add(ambient)

      // Pitch object és hozzáadás a kamerához
      this.inventory.pitchObject = new THREE.Object3D()
      this.inventory.pitchObject.add(this.inventory.camera)

      // Hozzáadás a jelenethez
      this.inventory.scene.add(this.inventory.pitchObject)
    }

    async update(deltaTime) {
      // FIRST LOAD OBJECTS
      if (!this.firstLoadedAllObjects) await this.firstLoadAllObjects();

      // 3D OBJECT REFRESH ROTATE
      if (this.selectedObject) {
        if (deltaTime) $(".delta-time-inventory").html(deltaTime.toFixed(1))

        // ROTATE OBJECT
        if (this.game.loadedObjects[this.selectedObject.id]) {
          this.game.loadedObjects[this.selectedObject.id].rotation.y += 0.01          
          this.game.loadedObjects[this.selectedObject.id].visible = true
        }

        // RENDER SCREEN
        if (this.inventory?.renderer && this.inventory?.scene && this.inventory?.camera) {        
          this.inventory.renderer.render(this.inventory.scene, this.inventory.camera)
        }
      }

      // INVENTORY REFRESH
      if (this.inventoryMenu.reloadInventory) {
        this.inventoryMenu.reloadInventory = false

        $(".item-text-container").html('').removeClass('text-hover text-selected')

        // IF SELECTED OBJECT
        if (this.inventoryMenu.selectedObject) {
          const selectedRow = $("#inventory-selected-item-container .item-selected-text-container:visible").eq(this.game.inventory.inventoryMenu.selectedPosition)
          const mode = selectedRow.attr('data-mode')

          this.game.playerMouse.mode = mode
          this.game.playerMouse.selectedObject = this.inventoryMenu.objectSelectedData

          // WAIT
          selectedRow.removeClass('text-hover').addClass('text-selected')
          await new Promise(wait => setTimeout(wait, 10))
          selectedRow.removeClass('text-selected')

          // RESET INVENTORY SELECED
          this.inventoryMenu = {
            selectedObject: false,
            reloadInventory: true,
            inventoryStartIndex: 0,
            inventoryPosition: 0,
            inventoryLength: 7,
            objectSelected: false,
            objectSelectedData: null,
            selectedPosition: 0,
            selectedLength: 0,
          }

          this.game.loadedObjects[this.selectedObject.id].visible = false

          // CHECK IF OIL
          const selectedUseObject = this.game.playerMouse.selectedObject
          const isLampOil = mode == 'use' && selectedUseObject?.filename?.toLowerCase().includes('oil')

          if (isLampOil && this.game.playerMouse.lamp) {
            const objectIndex = this.game.playerObjects.indexOf(selectedUseObject.objId)

            if (objectIndex !== -1) this.game.playerObjects.splice(objectIndex, 1)

            this.game.oilModifyScreen(100)

            this.game.sound.play(34, {volume: 1, loop: false})

            this.game.playerMouse.mode = 'use'
            this.game.playerMouse.selectedObject = null

            $("#cursor-text-box").hide().html('')
          }

          this.selectedObject = await this.getInventorySelecteObjectData(this.game.playerObjects[0])

          if (mode == 'read') {
            let readDetails = this.game.playerMouse.selectedObject.read.split('_')

            let readData = this.game.config.textdata.find(read => read.id == this.game.playerMouse.selectedObject.read)
            if (readData) {
              this.readArray = {
                readType: readDetails[0],
                readData: readData,
                readIndex: 0,
              }

              // CSS BOOK AND NOTE ARROWS
              if (readDetails[0] == 'note') this.loadNotePage();
              if (readDetails[0] == 'letter') this.loadLetterPage();
              if (readDetails[0] == 'photo') this.loadPhotoPage();
              if (readDetails[0] == 'book') this.loadBookPage();
            }
            return;
          }

          // PLAYER EAT
          if (mode == 'eat') {
            const consumeObject = this.game.playerMouse.selectedObject
            if (!consumeObject) return

            // DELETE OBJECT OF INVENTORY
            const objectIndex = this.game.playerObjects.indexOf(consumeObject.objId)
            if (objectIndex !== -1) {
              this.game.playerObjects.splice(objectIndex, 1)
            }
            // REFRESH 3D OBJECTS
            this.selectedObject = await this.getInventorySelecteObjectData(this.game.playerObjects[0])

            setTimeout(() => {
              const soundNumber = consumeObject.eattype == '0' ? this.game.gameplay.getArrayRandomId([205, 206]) : 207

              this.game.sound.play(soundNumber, {volume: 1, loop: false})
              this.game.energyModifyScreen(consumeObject.eat)
            }, 250)

            this.game.playerMouse.mode = 'use'
            this.game.playerMouse.selectedObject = null
            $("#cursor-text-box").hide().html('')
          }

          // BACK GAME
          this.game.play = true
          this.game.currentState = 'game'
          this.game.showHideOptions('game')

          this.game.input.getActualCursor()

          // SHOW OBJECT NAME
          if (mode == 'use' && this.game.playerMouse.selectedObject) {
            this.game.input.setGetCursor()
            $("#cursor-text-box").html(this.game.playerMouse.selectedObject.name).show()
            this.game.input.checkMousePositionOptions(this.game.input.lastEventMouse)
          }

          return;
        }

        let listElements = this.game.playerObjects.slice(this.inventoryMenu.inventoryStartIndex, this.inventoryMenu.inventoryStartIndex + this.inventoryMenu.inventoryLength)

        for (let i = 0; i < listElements.length; i++) {
          let objId = listElements[i]
          let objectData = await this.getInventorySelecteObjectData(objId)
          if (objectData == null) return;

          objectData.objId = objId // ADD this.game.loadedObjects ID

          objectData.name = objectData.name[0].toUpperCase() + objectData.name.slice(1)

          let element = $("#inventory-item-text-container .item-text-container"); element.eq(i).html(objectData.name);
          if (i == this.inventoryMenu.inventoryPosition) {
            // ACTUAL SELECTED OBJECT
            this.inventoryMenu.objectSelectedData = objectData
            // console.log('---'); console.log(objectData.read); console.log(objectData.eat); console.log('---');

            element.eq(i).addClass('text-hover')
            $("#object-text-container").html(objectData.text)

            objectData.read ? $("#object-read").show() : $("#object-read").hide();
            objectData.eat ? $("#object-eat").show() : $("#object-eat").hide();

            // IF SELECTED OBJECT MODE
            if (this.inventoryMenu.objectSelected) {
              this.inventoryMenu.selectedLength = $("#inventory-selected-item-container .item-selected-text-container:visible").length
  
              $("#inventory-selected-item-container .item-selected-text-container").removeClass('text-hover').removeClass('text-selected')
              $("#inventory-selected-item-container .item-selected-text-container:visible").eq(this.inventoryMenu.selectedPosition).addClass('text-hover')
            } else {
              $("#inventory-selected-item-container .item-selected-text-container").removeClass('text-hover').removeClass('text-selected')
            }
          } else {
            element.eq(i).removeClass('text-hover').removeClass('text-selected')
          }
        }

        // ARROWS UP AND DOWN SHOW/HIDE
        this.inventoryMenu.inventoryStartIndex == 0 && this.inventoryMenu.inventoryPosition == 0 ? $("#arrow-up").hide() : $("#arrow-up").show();

        let actualIndex = this.inventoryMenu.inventoryStartIndex + this.inventoryMenu.inventoryPosition
        actualIndex == this.game.playerObjects.length - 1 ? $("#arrow-down").hide() : $("#arrow-down").show();        
        if (this.game.playerObjects.length <= 7) $("#arrow-down").hide();
      }
    }

    loadBookPage() {
      $(".book-title-1").html(this.readArray.readData.titles[this.readArray.readIndex][0])
      $(".book-text-1").html(this.readArray.readData.texts[this.readArray.readIndex][0])
      $(".book-title-2").html(this.readArray.readData.titles[this.readArray.readIndex][1])
      $(".book-text-2").html(this.readArray.readData.texts[this.readArray.readIndex][1])
      $("#book-container").css('display', 'flex')
      $("#book-background").addClass('anim-in')
      this.readArrowsOptions('book')
    }

    loadNotePage() {
      $(".note-title").html(this.readArray.readData.titles[this.readArray.readIndex])
      $(".note-text").html(this.readArray.readData.texts[this.readArray.readIndex])
      $("#note-container").css('display', 'flex')
      $("#note-background").addClass('anim-in')
      $("#note-background").removeClass('photo-bg').removeClass('letter-bg').addClass('note-bg').addClass('anim-in')
      this.readArrowsOptions('note')
    }

    loadLetterPage() {
      $(".note-title").html(this.readArray.readData.titles[this.readArray.readIndex])
      $(".note-text").html(this.readArray.readData.texts[this.readArray.readIndex])
      $("#note-container").css('display', 'flex')
      $("#note-background").removeClass('note-bg').removeClass('photo-bg').addClass('letter-bg').addClass('anim-in')
      this.readArrowsOptions('note')
    }

    loadPhotoPage() {
      $(".note-title").html(this.readArray.readData.titles[this.readArray.readIndex])
      $(".note-text").html(this.readArray.readData.texts[this.readArray.readIndex])
      $("#note-container").css('display', 'flex')
      $("#note-background").removeClass('note-bg').removeClass('letter-bg').addClass('photo-bg').addClass('anim-in')
      this.readArrowsOptions('note')
    }

    readArrowsOptions(type) {
      $(`#${type}-arrow-left`).show(); $(`#${type}-arrow-right`).show();
      if (this.readArray.readIndex == 0) $(`#${type}-arrow-left`).hide();
      if (this.readArray.readIndex == this.readArray.readData.texts.length - 1) $(`#${type}-arrow-right`).hide();
    }

    async firstLoadAllObjects() {
      Object.entries(this.game.objectsList).forEach(([index, value]) => {
        this.loadObjectInScreen(index)
      })

      // FIRST OBJECT SELECTED
      this.selectedObject = await this.getInventorySelecteObjectData(this.game.playerObjects[0])
      this.firstLoadedAllObjects = true
    }

    async getInventorySelecteObjectData(inventoryIndex) {      
      let object = this.game.loadedObjects.find(obj => obj && obj.index == inventoryIndex)
      return object ? object : null;
    }

    async loadObjectInScreen(index) {
      const object = this.game.objectsList[index]

      if (object.data[0]) {
        const objectGroup = new THREE.Group()
        objectGroup.ratio = object.ratio
        objectGroup.read = object.read
        objectGroup.eat = object.eat
        objectGroup.eattype = object.eattype
        objectGroup.text = object.text

        this.game.loader.createTHREEObject(object, objectGroup, object.data[0])
        objectGroup.position.set(0, 0, 0)
        objectGroup.visible = false;

        this.inventory.scene.add(objectGroup)

        this.game.loadedObjects[objectGroup.id] = objectGroup
        this.game.loadedObjects[objectGroup.id].filename = object.filename
        this.game.loadedObjects[objectGroup.id].name = object.name
        this.game.loadedObjects[objectGroup.id].ratio = object.ratio
        this.game.loadedObjects[objectGroup.id].read = object.read
        this.game.loadedObjects[objectGroup.id].eat = object.eat
        this.game.loadedObjects[objectGroup.id].eattype = object.eattype
        this.game.loadedObjects[objectGroup.id].text = object.text
        this.game.loadedObjects[objectGroup.id].index = object.id
      }
    }

  async addObjectToFront(objectId) {
    const id = parseInt(objectId)

    if (!Number.isFinite(id)) return false;

    if (!this.firstLoadedAllObjects) await this.firstLoadAllObjects()

    if (this.selectedObject && this.game.loadedObjects[this.selectedObject.id]) {
      this.game.loadedObjects[this.selectedObject.id].visible = false
    }

    this.game.playerObjects.unshift(id)

    this.inventoryMenu.selectedObject = false
    this.inventoryMenu.reloadInventory = true
    this.inventoryMenu.inventoryStartIndex = 0
    this.inventoryMenu.inventoryPosition = 0
    this.inventoryMenu.objectSelected = false
    this.inventoryMenu.objectSelectedData = null
    this.inventoryMenu.selectedPosition = 0
    this.inventoryMenu.selectedLength = 0

    this.selectedObject = await this.getInventorySelecteObjectData(id)

    return true;
  }   
}