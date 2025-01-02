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
    this.selectedView = null

    this.init()
  }

  async init() {
    await this.loadTextures()
    await this.loadModels()

    this.graph = new Graphics(this.textures, this.keys, this.options, this.mapObjects)
    this.graph.moveObject(0, 0, 0, 0)

    this.views = {
      'XYview-canvas': new ViewWindow('XYview-canvas', 'x', 'y', 0, 0, 10, 1),
      'ZXview-canvas': new ViewWindow('ZXview-canvas', 'z', 'x', 0, 0, 10, 1),
      'ZYview-canvas': new ViewWindow('ZYview-canvas', 'z', 'y', 0, 0, 10, 1),
    }

    this.initInputs()
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

    // await this.montains.loadFromObjectFile("data/montains.obj");
    await this.axis.loadFromObjectFile("data/axis.obj");
    await this.cube.loadFromOwnObjectFile("data/cube.obj");
    
    // this.mapObjects.push(this.montains)
    this.mapObjects.push(this.axis)
    this.mapObjects.push(this.cube)

    console.log(this.mapObjects)
  }

  renderViewWindow (name, value) {
    this.selectedView = name

    let width = this.views[name].canvas.width
    let height = this.views[name].canvas.height

    console.log(value)
    console.log(width, height)

    // value.forEach(item => {
    //   console.log(`Value item: ${item}`);
    // });
  }

  refresViewSize() {
    var clone = this
    // all hide
    $('#container-screens > .view-segment').show()

    // show selected view
    $(".view-buttons").each(function() {
      let name = $(this).attr('name')
      let value = $(this).val()
      value = (value == 'false') ? false : true;

      if (value) {
        let newWidth = Math.floor($('#container-screens').width())
        let newHeight = Math.floor($('#menu-right').height())

        // selected show
        $('#container-screens > .view-segment').hide()
        $(`#container-screens > canvas[id='${name}']`).show()

        $(`#container-screens > canvas[id='${name}']`).width(newWidth)
        $(`#container-screens > canvas[id='${name}']`).height(newHeight)

        if (name == 'screen-canvas') {
          clone.graph.screenCanvas.width = newWidth
          clone.graph.screenCanvas.height = newHeight
        } else if (name == 'XYview-canvas' || name == 'ZXview-canvas' || name == 'ZYview-canvas') {
          clone.views[name].canvas.width = newWidth
          clone.views[name].canvas.height = newHeight
        }

      } else {
        let newWidth = Math.floor($('#container-screens').width() / 2)
        let newHeight = Math.floor($('#menu-right').height() / 2)

        $(`#container-screens > canvas[id='${name}']`).width(newWidth)
        $(`#container-screens > canvas[id='${name}']`).height(newHeight)

        if (name == 'XYview-canvas' || name == 'ZXview-canvas' || name == 'ZYview-canvas') {
          clone.views[name].canvas.width = newWidth
          clone.views[name].canvas.height = newHeight
        }
      }
    });
  }

  initInputs() {
    var clone = this

    //1. VIEW BUTTONS
    $(".view-buttons").on('click', function() {
      let value = $(this).val()

      // All OFF
      $("button[class='view-buttons']").val(false).text('OFF')
      
      value = (value == 'false') ? true : false;
      value ? $(this).text('ON') : $(this).text('OFF');

      $(this).val(value)
    
      clone.refresViewSize()
      clone.refreshScreen()
    });

    // 3. Click ViewWindow    
    Object.entries(this.views).forEach(([name, value]) => {
      console.log(`Key: ${name}`)
      this.drawView(name)
      
      // ratio
      $(`input[name='ratio'][data-name='${name}']`).on('input', () => {
        let ratioInputValue = parseInt($(`input[name='ratio'][data-name='${name}']`).val())

        console.log(name)
        

        if (ratioInputValue < 1) ratioInputValue = 1;
        else if (ratioInputValue > 1000) ratioInputValue = 1000;

        this.views[name].ratio = ratioInputValue

        this.selectedView = name
        this.drawView(this.selectedView)
      });

      // frequent
      $(`input[name='frequent'][data-name='${name}']`).on('input', () => {
        let frequentInputValue = parseInt($(`input[name='frequent'][data-name='${name}']`).val())

        if (frequentInputValue < 1) frequentInputValue = 1;
        else if (frequentInputValue > 16) frequentInputValue = 16;

        this.views[name].frequent = frequentInputValue

        this.selectedView = name
        this.drawView(this.selectedView)
      });

      $(`#${name}`).on('click', () => {
        this.renderViewWindow(name, value)
        this.drawView(name)
      });
    });

    ///////////
    // KEYS
    // Add keys
    ///////////

    document.addEventListener('keydown', (event) => {
      // console.log(this.keys)
      this.keys[event.code] = true

      this.checkKeyboardInputs()

      // Mouse move
      if (document.pointerLockElement == document.body) {
        this.moveViewInputs()
        setTimeout(() => {
          this.refreshScreen()
        }, this.refTime)
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
        this.selectedView = null
      }
    });

    window.addEventListener("resize", () => {
      setTimeout(() => {
        this.refresViewSize()
        this.refreshScreen()
      },this.refTime)
    });
  }

  ///DRAW
  drawView(name) {
    let view = this.views[name]
    if (view) {
      view.ctx.clearRect(0, 0, view.canvas.width, view.canvas.height);
    
      // POS ORIGO
      view.ctx.strokeStyle = 'blue';
      view.ctx.lineWidth = 4;
      view.ctx.beginPath();
      view.ctx.arc(view.posX, view.posY, 1, 0, 2 * Math.PI);
      view.ctx.stroke();
    
      const space = (view.ratio / view.frequent < 1) ? 1 : view.ratio / view.frequent;
          
      if (space > 0) {
        // Vonalszín
        view.ctx.strokeStyle = 'rgba(128, 128, 128, 0.5)'; // Halvány szürke
        view.ctx.lineWidth = 1;
        
        const startX = Math.floor(-view.posX / space) * space + view.posX;
        const startY = Math.floor(-view.posY / space) * space + view.posY;        
        
        for (let x = startX; x < view.canvas.width; x += space) { view.ctx.beginPath(); view.ctx.moveTo(x, 0); view.ctx.lineTo(x, view.canvas.height); view.ctx.stroke(); }
        for (let y = startY; y < view.canvas.height; y += space) { view.ctx.beginPath(); view.ctx.moveTo(0, y); view.ctx.lineTo(view.canvas.width, y); view.ctx.stroke(); }
      }

      this.mapObjects.forEach(object => {
        object.tris.forEach(tri => {

          function isTriangleOnScreen(vertices, screenWidth, screenHeight) {
            const screenRect = { x1: 0, y1: 0, x2: screenWidth, y2: screenHeight };
        
            // Ellenőrizzük, hogy a pontok bármelyike a képernyőn van-e
            for (const { x, y } of vertices) {
                if (x >= screenRect.x1 && x <= screenRect.x2 && y >= screenRect.y1 && y <= screenRect.y2) {
                    return true;
                }
            }
        
            // Ellenőrizzük, hogy a háromszög élei metszenek-e a képernyő szélével
            const edges = [
                [vertices[0], vertices[1]],
                [vertices[1], vertices[2]],
                [vertices[2], vertices[0]],
            ];
        
            for (const [p1, p2] of edges) {
                if (lineIntersectsRect(p1, p2, screenRect)) {
                    return true;
                }
            }
        
            return false; // Ha semmi nem talál, a háromszög nem látszik
          }
        
          function lineIntersectsRect(p1, p2, rect) {
            // Definiáljuk a téglalap éleit
            const rectEdges = [
              [{ x: rect.x1, y: rect.y1 }, { x: rect.x2, y: rect.y1 }], // Felső
              [{ x: rect.x2, y: rect.y1 }, { x: rect.x2, y: rect.y2 }], // Jobb
              [{ x: rect.x2, y: rect.y2 }, { x: rect.x1, y: rect.y2 }], // Alsó
              [{ x: rect.x1, y: rect.y2 }, { x: rect.x1, y: rect.y1 }], // Bal
            ];

            for (const [q1, q2] of rectEdges) {
                if (linesIntersect(p1, p2, q1, q2)) {
                    return true;
                }
            }

            return false;
          }

          function linesIntersect(p1, p2, q1, q2) {
            // Ellenőrizzük, hogy a két egyenes szakasz metszi-e egymást
            const orientation = (a, b, c) => (b.y - a.y) * (c.x - b.x) - (b.x - a.x) * (c.y - b.y);
            const o1 = orientation(p1, p2, q1);
            const o2 = orientation(p1, p2, q2);
            const o3 = orientation(q1, q2, p1);
            const o4 = orientation(q1, q2, p2);
        
            if (o1 * o2 < 0 && o3 * o4 < 0) return true; // Átlépő orientációk
            return false; // Ha nincs metszés
          }
  
          let p0X = (view.canvas.width / 2) + view.posX + tri.p[0][view.vX] * view.ratio; let p0Y = (view.canvas.height / 2) + view.posY + tri.p[0][view.vY] * view.ratio;
          let p1X = (view.canvas.width / 2) + view.posX + tri.p[1][view.vX] * view.ratio; let p1Y = (view.canvas.height / 2) + view.posY + tri.p[1][view.vY] * view.ratio;
          let p2X = (view.canvas.width / 2) + view.posX + tri.p[2][view.vX] * view.ratio; let p2Y = (view.canvas.height / 2) + view.posY + tri.p[2][view.vY] * view.ratio;

          const vertices = [
            { x: p0X, y: p0Y },
            { x: p1X, y: p1Y },
            { x: p2X, y: p2Y },
          ];

          if (isTriangleOnScreen(vertices, view.canvas.width, view.canvas.height)) {

            view.ctx.strokeStyle = 'yellow';
            view.ctx.lineWidth = 1;

            view.ctx.beginPath()
            view.ctx.moveTo(p0X, p0Y)
            view.ctx.lineTo(p1X, p1Y)
            view.ctx.lineTo(p2X, p2Y)
            view.ctx.lineTo(p0X, p0Y)
            view.ctx.stroke()

            view.ctx.strokeStyle = 'deeppink'
            view.ctx.lineWidth = 2
            view.ctx.beginPath(); view.ctx.arc(p0X, p0Y, 1, 0, 2 * Math.PI); view.ctx.stroke();
            view.ctx.beginPath(); view.ctx.arc(p1X, p1Y, 1, 0, 2 * Math.PI); view.ctx.stroke();
            view.ctx.beginPath(); view.ctx.arc(p2X, p2Y, 1, 0, 2 * Math.PI); view.ctx.stroke();
          } else {
            //console.log('NEM RAJZOLT'); console.log(view)
          }
        });
      });

    } else {
      console.log('Error!')
    }
  }

  checkKeyboardInputs() {
    if (this.selectedView !== 'null' && typeof this.selectedView !== 'undefined') {
      console.log(this.selectedView)

      if (this.keys['ArrowUp'] || this.keys['ArrowW']) {
        // console.log('move up')
        this.views[this.selectedView].posY += 5
        this.drawView(this.selectedView)
      }

      if (this.keys['ArrowDown']) {
        this.views[this.selectedView].posY -= 5
        // console.log('move down')
        this.drawView(this.selectedView)
      }

      if (this.keys['ArrowLeft']) {
        // console.log('move left')
        this.views[this.selectedView].posX += 5
        this.drawView(this.selectedView)
      }

      if (this.keys['ArrowRight']) {
        // console.log('move right')
        this.views[this.selectedView].posX -= 5
        this.drawView(this.selectedView)
      }
    }
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
      // console.log('turn left') // console.log(this.graph.fYaw)
      this.graph.fYaw -= this.options.rotateScale
    }

    if (this.keys['KeyD'] && !this.keys['ShiftLeft']) {
      // console.log('turn right') // console.log(this.graph.fYaw)
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
      // console.log('SEE UP') // console.log(this.graph.fXaw)
      
      if (this.graph.fXaw - this.options.rotateScale > -1.5 && this.graph.fXaw - this.options.rotateScale < 1.5) this.graph.fXaw -= this.options.rotateScale;
    }

    if (this.keys['KeyF'] && !this.keys['ShiftLeft']) {
      // console.log('SEE DOWN') // console.log(this.graph.fXaw)
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
      this.selectedView = null
    }
  }

  refreshScreen = () => { 
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
  constructor(name, vX, vY, posX, posY, ratio, frequent) {
    this.name = name
    this.vX = vX
    this.vY = vY
    this.ratio = ratio
    this.frequent = frequent
    this.posX = posX
    this.posY = posY

    this.canvas = (document.getElementById(this.name)) ? document.getElementById(this.name) : null;

    if (this.canvas) {
      this.ctx = this.canvas.getContext("2d")
      this.ctx.imageSmoothingEnabled = false
      
      // this.canvas.width = 320
      // this.canvas.height = 240
    } else {
      console.error(`${name} is not isset!`)
    }
  }
}

const editor = new Editor()
