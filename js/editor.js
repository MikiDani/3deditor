import { Graphics } from './graphics.js'
import { Texture, Vec3D, Mesh } from './data.js'

class Editor {
  state;
  player;
  constructor () {

    this.refTime = 15

    this.options = {
      fill: false,
      textured: true,
      grid: false,
      moveScale: 0.15,
      rotateScale: 0.115,
    }
    
    this.mapObjects = []
    this.keys = {}

    this.init()
  }

  async init() {
    await this.loadTextures()
    await this.loadModels()

    this.initInputs()
    
    this.graph = new Graphics(this.textures, this.keys, this.options, this.mapObjects)
    this.graph.moveObject(0, 0, -10, 0)

    this.viewXY = new ViewWindow('XYview-canvas', 320, 240, 10, 0, 0)
    console.log(this.viewXY)

    this.refreshScreen()
  }

  async loadTextures() {
    this.textures = []

    this.textures[0] = new Texture('img/test.png'); await this.textures[0].load()
    console.log(`${this.textures[0].link} loaded...`)
    this.textures[1] = new Texture('img/a-2.png'); await this.textures[1].load()
    console.log(`${this.textures[1].link} loaded...`)
    this.textures[2] = new Texture('img/b-1.png'); await this.textures[2].load()
    console.log(`${this.textures[2].link} loaded...`)
    this.textures[3] = new Texture('img/c-1.png'); await this.textures[3].load()
    console.log(`${this.textures[3].link} loaded...`)
    this.textures[4] = new Texture('img/texture1.png'); await this.textures[4].load()
    console.log(`${this.textures[4].link} loaded...`)
    this.textures[5] = new Texture('img/test.png'); await this.textures[5].load()
    console.log(`${this.textures[5].link} loaded...`)
  }

  async loadModels() {
    this.montains = new Mesh()
    this.axis = new Mesh()
    this.cube = new Mesh()

    await this.montains.loadFromObjectFile("data/montains.obj");
    await this.axis.loadFromObjectFile("data/axis.obj");
    // await this.cube.loadFromOwnObjectFile("data/cube.obj");
    
    this.mapObjects.push(this.montains)
    this.mapObjects.push(this.axis)
    this.mapObjects.push(this.cube)

    console.log(this.mapObjects)
  }

  initInputs() {
    // Disable default event listeners
    document.addEventListener('keydown', (event) => {
      if (event.code == 'Space') event.preventDefault()
    });

    // Add keys
    document.addEventListener('keydown', (event) => {
      // console.log(this.keys)
      this.keys[event.code] = true

      // Mouse move
      if (document.pointerLockElement == document.body) {
        this.moveViewInputs()
        setTimeout(() => {
          this.refreshScreen()
        },this.refTime)
      }
    });

    document.addEventListener('keyup', (event) => {
      this.keys[event.code] = false
    })

    // MOUSE INIT
    this.lookMouseApi()
  }

  // MOUSE MOVE
  lookMouseApi() {
    document.body.requestPointerLock = document.body.requestPointerLock || document.body.mozRequestPointerLock || document.body.webkitRequestPointerLock;
    document.getElementById("screen-canvas").addEventListener('click', function() {
      document.body.requestPointerLock();
      // if (!(document.pointerLockElement == document.body)) {
      // }
    });

    document.addEventListener('mousemove', (event) => {
      if (document.pointerLockElement == document.body) {
        // console.log("Elmozdulás X:", event.movementX, "Elmozdulás Y:", event.movementY);
        if (this.graph.fXaw + event.movementY*0.01 > -1.5 && this.graph.fXaw + event.movementY*0.01 < 1.5) this.graph.fXaw += event.movementY*0.01;
        this.graph.fYaw += event.movementX*0.01

        setTimeout(() => {
          this.refreshScreen()
        },this.refTime)
      }
    });

    // END POINTER CLICK (ESC)
    document.addEventListener('pointerlockchange', function() {
      if (document.pointerLockElement == document.body) {
        console.log("Pointer lock aktív")
      } else {
        console.log("Pointer lock megszűnt")
        document.activeElement.blur()
      }
    });

    window.addEventListener("resize", () => {
      setTimeout(() => {
        this.refreshScreen()
      },this.refTime)
    });
    
  }

  moveViewInputs() {
    if (this.keys['ArrowUp']) {
      // console.log('move up')
      this.graph.vCamera.y += this.options.moveScale
    }

    if (this.keys['ArrowDown']) {
        // console.log('move down')
        this.graph.vCamera.y -= this.options.moveScale
    }

    if (this.keys['ArrowLeft']) {
      // console.log('move left')
      this.graph.vCamera.x += this.options.moveScale
    }

    if (this.keys['ArrowRight']) {
        // console.log('move right')
        this.graph.vCamera.x -= this.options.moveScale
    }

    // FPS move
    if (this.keys['KeyW'] && !this.keys['ShiftLeft']) {
      // console.log('move foward')
      let vForward = new Vec3D()
      vForward = this.graph.vector_Mul(this.graph.vLookDir, this.options.moveScale)
      
      this.graph.vCamera = this.graph.vector_Add(this.graph.vCamera, vForward)
    }

    if (this.keys['KeyS'] && !this.keys['ShiftLeft']) {
      // console.log('move back')
      let vForward = new Vec3D()
      vForward = this.graph.vector_Mul(this.graph.vLookDir, this.options.moveScale)

      this.graph.vCamera = this.graph.vector_Sub(this.graph.vCamera, vForward)
    }

    if (this.keys['KeyA'] && !this.keys['ShiftLeft']) {
      // console.log('turn left')
      // console.log(this.graph.fYaw)
      this.graph.fYaw -= this.options.rotateScale
    }

    if (this.keys['KeyD'] && !this.keys['ShiftLeft']) {
      // console.log('turn right')
      // console.log(this.graph.fYaw)
      this.graph.fYaw += this.options.rotateScale
    }

    // FPS SHIFT move
    if (this.keys['KeyW'] && this.keys['ShiftLeft']) {
      // console.log('up')
      this.graph.vCamera.y += this.options.moveScale
    }

    if (this.keys['KeyS'] && this.keys['ShiftLeft']) {
      // console.log('down')
      this.graph.vCamera.y -= this.options.moveScale
    }

    if (this.keys['KeyR'] && !this.keys['ShiftLeft']) {
      // console.log('SEE UP')
      // console.log(this.graph.fXaw)
      
      if (this.graph.fXaw - this.options.rotateScale > -1.5 && this.graph.fXaw - this.options.rotateScale < 1.5) this.graph.fXaw -= this.options.rotateScale;
    }

    if (this.keys['KeyF'] && !this.keys['ShiftLeft']) {
      // console.log('SEE DOWN')
      // console.log(this.graph.fXaw)
      if (this.graph.fXaw + this.options.rotateScale > -1.5 && this.graph.fXaw + this.options.rotateScale < 1.5) this.graph.fXaw += this.options.rotateScale;
    }

    //---

    if (this.keys['Digit1']) {
      // console.log('Grid')
      this.options.grid = !this.options.grid
    }

    if (this.keys['Digit2']) {
      // console.log('Fill')
      this.options.fill = !this.options.fill
    }

    if (this.keys['Digit3']) {
      // console.log('Textured')
      this.options.textured = !this.options.textured
    }

    if (this.keys['Escape']) {
      console.log('ESC');
    }
  }

  resizeScreens() {
    let newWidth = Math.floor($('#container-screens').width() / 2)
    let newHeight = Math.floor($('#menu-right').height() / 2)

    // console.log(newWidth); console.log(newHeight);

    $('#container-screens > .view-segment').width(newWidth)
    $('#container-screens > .view-segment').height(newHeight)

    this.graph.screenCanvas.width = newWidth
    this.graph.screenCanvas.height = newHeight
  }

  refreshScreen = () => {
    this.resizeScreens()
    
    this.graph.clearScreen(this.graph.screenCanvas, this.graph.screenCtx)
    this.graph.buffer.fill(0)         // clear memoryCanvas
    this.graph.depthBuffer.fill(0)    // DELETE Depth Buffer

    // this.graph.testFloor()
    // this.graph.testTexture()

    this.graph.movePlayerInMatrix(0) // 0.005
    this.graph.moveObjectsInMatrix(0) // 0.005
    this.graph.renderScreen()
    
    this.graph.memoryCtx.putImageData(this.graph.screenData, 0, 0)
    this.graph.infoTable()

    this.graph.screenCtx.drawImage(this.graph.memoryCanvas, 0, 0, this.graph.screenCanvas.width, this.graph.screenCanvas.height)    
  }
}

class ViewWindow {
  constructor(name, width, height, ratio, posX, posY) {
    this.name = name
    this.width = width
    this.height = height
    this.ratio = ratio
    this.posX = posX
    this.posY = posY

    this.canvas = (document.getElementById(this.name)) ? document.getElementById(this.name) : null;
    
    if (this.canvas) {
      this.ctx = this.canvas.getContext("2d")
      this.ctx.imageSmoothingEnabled = false
      
      this.canvas.width = this.width
      this.canvas.height = this.height
    } else {
      console.error(`${name} is not isset!`)
    }
  }
}

const editor = new Editor()
