import $ from 'jquery'
import * as THREE from 'three';

export default class Inventory {
    constructor(game) {
      this.game = game
      this.inventory = {}
      this.scX
      this.scY

      this.firstLoadedAllObjects = false

      this.selectedObjectid = null
      this.selectedObjectindex = null

      this.init()
    }

    init() {
      console.log('Inventory init')

      this.inventory.canvas = document.getElementById('inventory-3d-canvas')
      this.inventory.renderer = new THREE.WebGLRenderer({ canvas: this.inventory.canvas })
      this.inventory.renderer.domElement.style.imageRendering = 'pixelated'
      this.inventory.renderer.setPixelRatio(1)

      this.isX = 800
      this.isY = 800

      this.inventory.renderer.setSize(this.isX, this.isY, false)

      this.inventory.scene = new THREE.Scene()

      // Kamera létrehozása
      this.inventory.camera = new THREE.PerspectiveCamera(60, this.isX / this.isY, 0.1, 5)
      this.inventory.camera.position.set(0, 0.5, 0.8)
      this.inventory.camera.rotateX(-0.5)

      const ambient = new THREE.AmbientLight(0xffffff, 1)
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
      if (this.selectedObjectId) {
        // console.log(this.selectedObjectId)
        $(".delta-time-inventory").html(deltaTime.toFixed(1))       
        $(".inventory-list").html(this.game.config.objectsdata.map(obj => obj.name + ', '))

        // ROTATE OBJECT
        if (this.game.loadedObjects[this.selectedObjectId]) {
          this.game.loadedObjects[this.selectedObjectId].rotation.y += 0.01
          this.game.loadedObjects[this.selectedObjectId].visible = true
        }

        if (this.inventory?.renderer && this.inventory?.scene && this.inventory?.camera) {        
          this.inventory.renderer.render(this.inventory.scene, this.inventory.camera)
        }
      }
      //...
    }

    async loadObjectInScreen(index) {
      const object = this.game.objectsList[index]

      // console.log(object.data[0])
      
      if (object.data[0]) {
        const objectGroup = new THREE.Group()
        objectGroup.ratio = object.ratio

        this.game.loader.createTHREEObject(object, objectGroup, object.data[0])

        objectGroup.position.set(0, 0, 0)

        objectGroup.visible = false;

        this.inventory.scene.add(objectGroup)

        this.game.loadedObjects[objectGroup.id] = objectGroup
        this.game.loadedObjects[objectGroup.id].filename = object.filename
        this.game.loadedObjects[objectGroup.id].name = object.name
        this.game.loadedObjects[objectGroup.id].ratio = object.ratio
        this.game.loadedObjects[objectGroup.id].index = object.id

        this.selectedObjectId = objectGroup.id

        console.log( this.selectedObjectId)
        

        console.log(this.game.loadedObjects[objectGroup.id])
        

      }
    }

    async firstLoadAllObjects() {
      console.log(this.game.objectsList)
      
      Object.entries(this.game.objectsList).forEach(([index, value]) => {
        this.loadObjectInScreen(index)
      })

      // FIRST INDEX 
      this.selectedObjectindex = this.game.objectsList.find(item => item && item.id)?.id
      console.log('FIRST INDEX: ', this.selectedObjectindex)
      
      this.firstLoadedAllObjects = true
    }

    render() {
      // console.log('RENDER')
    }
  }