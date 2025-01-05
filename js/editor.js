import { Graphics } from './graphics.js'
import { Texture, Vec3D, Vec2D, Mesh, Triangle } from './data.js'

class Editor {
  state;
  player;
  constructor () {

    this.refTime = 5

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

    this.mouse = {
      startX: 0,
      startY: 0,
      endX: 0,
      endY: 0,
      isMouseDown: false,
      addTri: {
        mode: false,
        count: 0,
        cords: [{x:0, y:0, z:0}, {x:0, y:0, z:0}, {x:0, y:0, z:0}],
        texture: [{x:0, y:1, z:1}, {x:0, y:0, z:1}, {x:1, y:0, z:1}],
        lineColor: 'yellow',
        light: 1,
      }
    }

    this.init()
  }

  async init() {
    await this.loadTextures()
    await this.loadModels()

    this.graph = new Graphics(this.textures, this.keys, this.options, this.mapObjects)

    // MOVE OBJECTS IN START
    // this.graph.moveObject(0, 0, -30, 0)

    this.views = {
      // name, vX, vY, posX, posY, ratio, frequent, showDots, showGrid
      'XYview-canvas': new ViewWindow('XYview-canvas', 'x', 'y', 0, 0, 50, 2, true, true),
      'XZview-canvas': new ViewWindow('XZview-canvas', 'x', 'z', 0, 0, 50, 2, true, true),
      'ZYview-canvas': new ViewWindow('ZYview-canvas', 'z', 'y', 0, 0, 50, 2, true, true),
    }

    // ADD HTML ELEMENTS

    // VIEW-SCREEN OPTIONS
    Object.entries(this.views).forEach(([name, value]) => {
      let element = `
      <div class="top-screen-options">
        <div class="left-side">
          <div class="side-row">
              <span>screen-X/Y</span><span class="reset-center-button" data-name="${name}" title="Reset to default center.">&#9679;</span>
          </div>
          <div class="side-row">
              <span>Ratio:</span><input type="number" name="ratio" data-name="${name}" min="0" max="200" step="10" value="50">
          </div>
          <div class="side-row">
              <span>Frequent:</span><input type="number" name="frequent" data-name="${name}" min="0" max="8" step="1" value="2">
          </div>
        </div>
        <div class="right-side">
          <div class="side-row">
              <span>Fullscr.:</span><button type="button" name="${name}" class="view-buttons" value="false">OFF</button>
          </div>
          <div class="side-row">
              <span>Dots:</span><button type="button" class="dots-buttons" data-name="${name}" value="true">ON</button>
          </div>
          <div class="side-row">
              <span>Grid:</span><button type="button" class="grid-buttons" data-name="${name}" value="true">ON</button>
          </div>
        </div>
      </div>`;
      $(`#menu-top`).append(element)
    });

    this.refreshListObject()
    
    this.initInputs()    
    this.fullRefreshCanvasGraphics()
  }

  refreshListObject() {
     // LIST OBJECTS
     $('#object-list').html('')
     let counter = 0
     let element = `<ul>`;
     this.mapObjects.forEach(obj => {
       let objName = (obj.name) ? obj.name : 'noname object';
       element += `<li data-id="${counter}">${objName} <span class="menu-icon triangle-up"></span></li>`;
       if (obj.tris) {
         element += `<ul parent-id="${counter}">`;
         obj.tris.forEach((tri, i) => {
           console.log(i)
           element += `<li data-id="${counter}/${i}">${i} triangle</li>`;
         });
         element += `</ul>`;
       }
       counter++
     });
     element += `</ul>`;
 
     $('#object-list').append(element)
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

    // await this.montains.loadFromObjectFile("data/montains.obj", 'Montains', 'yellow')
    // await this.axis.loadFromObjectFile("data/axis.obj", 'Axis', 'yellow')
    
    await this.cube.loadFromOwnObjectFile("data/cube.obj", 'Cube', 'lime')
    
    // this.mapObjects.push(this.montains)
    // this.mapObjects.push(this.axis)

    this.mapObjects.push(this.cube)

    console.log(this.mapObjects)
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

        // all hide
        $('#container-screens > .view-segment').hide()
        // selected resize and show
        $(`#container-screens > canvas[id='${name}']`).width(newWidth)
        $(`#container-screens > canvas[id='${name}']`).height(newHeight)
        $(`#container-screens > canvas[id='${name}']`).show()

        if (name == 'screen-canvas') {
          console.log('+++++++')

          console.log(newWidth, newHeight)
                    
          clone.graph.screenCanvas.width = newWidth
          clone.graph.screenCanvas.height = newHeight

          // ???
          // clone.graph.SCREENWIDTH = newWidth
          // clone.graph.SCREENHEIGHT = newHeight

        } else if (name == 'XYview-canvas' || name == 'XZview-canvas' || name == 'ZYview-canvas') {
          clone.views[name].canvas.width = newWidth
          clone.views[name].canvas.height = newHeight
        }

      } else {
        let newWidth = Math.floor($('#container-screens').width() / 2)
        let newHeight = Math.floor($('#menu-right').height() / 2)

        $(`#container-screens > canvas[id='${name}']`).width(newWidth)
        $(`#container-screens > canvas[id='${name}']`).height(newHeight)

        if (name == 'XYview-canvas' || name == 'XZview-canvas' || name == 'ZYview-canvas') {
          clone.views[name].canvas.width = newWidth
          clone.views[name].canvas.height = newHeight
        }
      }
    });
  }

  mouseAddTriReset () {
    this.mouse.addTri = {
      mode: false,
      count: 0,
      cords: [{x:0, y:0, z:0}, {x:0, y:0, z:0}, {x:0, y:0, z:0}],
      texture: [{u:0, v:1}, {u:0, v:0}, {u:1, v:0}],
      light: 1,
    }
    $('#add-new-tri').removeClass('green2')
  }

  initInputs() {
    var clone = this

    //1. VIEW BUTTONS
    $(".view-buttons").on('click', function() {
      let value = $(this).val()
      let name = $(this).attr('name')

      // All OFF
      $(".view-buttons").val(false).text('OFF')

      value = (value == 'false') ? true : false;
      $(this).val(value)
      if (value) {
        $(this).text('ON')
        clone.selectedView = name
      } else {
        $(this).text('OFF')
      }

      clone.fullRefreshCanvasGraphics()
    });

    //2. DOTS BUTTONS
    $(".dots-buttons").on('click', function() {
      let value = $(this).val()
      let name = $(this).attr('data-name')

      value = (value == 'false') ? true : false;
      $(this).val(value)
      if (value) {
        $(this).text('ON')
        clone.selectedView = name
        clone.views[name].showDots = true
      } else {
        $(this).text('OFF')
        clone.views[name].showDots = false
      }

      clone.fullRefreshCanvasGraphics()
    });

    //3. GRID BUTTONS
    $(".grid-buttons").on('click', function() {
      let value = $(this).val()
      let name = $(this).attr('data-name')

      value = (value == 'false') ? true : false;
      $(this).val(value)
      if (value) {
        $(this).text('ON')
        clone.selectedView = name
        clone.views[name].showGrid = true
      } else {
        $(this).text('OFF')
        clone.views[name].showGrid = false
      }

      clone.fullRefreshCanvasGraphics()
    });

    // 4.3D VIEW BUTTONS
    $(".3d-buttons").on('click', function() {
      let value = $(this).val()
      let name = $(this).attr('name')

      value = (value == 'false') ? true : false;
      $(this).val(value)
      clone.graph.options3D[name] = value

      if (value) {
        $(this).text('ON')
      } else {
        $(this).text('OFF')
      }

      clone.fullRefreshCanvasGraphics()
    });

    // 5. Click ViewWindow
    Object.entries(this.views).forEach(([name, value]) => {
      
      // ratio
      $(`input[name='ratio'][data-name='${name}']`).on('input', () => {
        let ratioInputValue = parseInt($(`input[name='ratio'][data-name='${name}']`).val())

        if (ratioInputValue < 1) ratioInputValue = 1;
        else if (ratioInputValue > 200) ratioInputValue = 200;

        this.views[name].ratio = ratioInputValue

        this.selectedView = name
        this.fullRefreshCanvasGraphics()
      });

      // frequent
      $(`input[name='frequent'][data-name='${name}']`).on('input', () => {
        let frequentInputValue = parseInt($(`input[name='frequent'][data-name='${name}']`).val())

        if (frequentInputValue < 1) frequentInputValue = 1;
        else if (frequentInputValue > 16) frequentInputValue = 16;

        this.views[name].frequent = frequentInputValue

        this.selectedView = name
        this.fullRefreshCanvasGraphics()
      });

      // canvas window click
      $(`#${name}`).on('mousedown', function (event) {
        clone.selectedView = name
        clone.mouse.isOk = name
        const rect = this.getBoundingClientRect()

        // console.log(rect.left, rect.top)
        
        clone.mouse.startX = event.clientX - rect.left // Egér kezdő X
        clone.mouse.startY = event.clientY - rect.top // Egér kezdő Y
        clone.mouse.isMouseDown = true

        // ADD TRI MODE
        if (clone.mouse.addTri.mode) {
          console.log('MODE TRUE!!!')
          console.log('clone.mouse.startX: ', clone.mouse.startX)
          console.log('clone.mouse.startY: ', clone.mouse.startY)

          clone.mouse.addTri.cords[clone.mouse.addTri.count][clone.views[name].vX] = (clone.mouse.startX + clone.views[name].posX) * 0.01
          clone.mouse.addTri.cords[clone.mouse.addTri.count][clone.views[name].vY] = (clone.mouse.startY + clone.views[name].posY) * 0.01

          if (clone.mouse.addTri.count == 2) {
            console.log('VEGE 3.')
                       
            let newObject = new Mesh()
            newObject.name = 'New tri: ' + Math.floor(Math.random()*99999)

            newObject.tris.push(
              new Triangle(new Vec3D(clone.mouse.addTri.cords[0].x, clone.mouse.addTri.cords[0].y, clone.mouse.addTri.cords[0].z), new Vec3D(clone.mouse.addTri.cords[1].x, clone.mouse.addTri.cords[1].y, clone.mouse.addTri.cords[1].z), new Vec3D(clone.mouse.addTri.cords[2].x, clone.mouse.addTri.cords[2].y, clone.mouse.addTri.cords[2].z),
              new Vec2D(clone.mouse.addTri.texture[0].u, clone.mouse.addTri.texture[0].v),
              new Vec2D(clone.mouse.addTri.texture[1].u, clone.mouse.addTri.texture[1].v),
              new Vec2D(clone.mouse.addTri.texture[2].u, clone.mouse.addTri.texture[2].v),
              2, 1, [255, 200, 40, 1])
            )

            clone.mapObjects.push(newObject)
            clone.mouseAddTriReset()

            clone.refreshListObject()
            
          } else clone.mouse.addTri.count++
        }
      });

      // $(`#${name}`).on('mousemove', function (event) {
      //   if (clone.mouse.isMouseDown) {
      //     // const rect = this.getBoundingClientRect()
      //     // clone.mouse.endX = event.clientX - rect.left
      //     // clone.mouse.endY = event.clientY - rect.top
      //     // console.log(`Current move: (${clone.mouse.endX}, ${clone.mouse.endY})`)
      //   }
      // });

      $(`#${name}`).on('mouseup', function (event) {
        const rect = this.getBoundingClientRect()
        clone.mouse.endX = event.clientX - rect.left
        clone.mouse.endY = event.clientY - rect.top
        clone.mouse.isMouseDown = false

        // Koordináták eltolásának számítása
        const deltaX = clone.mouse.endX - clone.mouse.startX;
        const deltaY = clone.mouse.endY - clone.mouse.startY;
        // console.log(`Mouse moved: ΔX=${deltaX}, ΔY=${deltaY}`)

        clone.views[name].posX -= deltaX
        clone.views[name].posY -= deltaY

        clone.fullRefreshCanvasGraphics()
      });

      // reset views clicks
      $(`[class='reset-center-button'][data-name='${name}']`).on('click', function (event) {
        let name = $(this).attr('data-name')

        clone.views[name].posX = 0; clone.views[name].posY = 0;
        clone.fullRefreshCanvasGraphics()
      });
    });

    // 6. Reset view-screen
    $(`[class='reset-center-button'][data-name='screen-canvas']`).on('click', function () {
      clone.graph.vCamera.x = 0; clone.graph.vCamera.y = 0; clone.graph.vCamera.z = 0;
      clone.graph.fYaw = 0; clone.graph.fXaw = 0;     

      clone.fullRefreshCanvasGraphics()
    });
    
    // 7. Add new Triangle
    $(document).on('click', '#add-new-tri', () => {
      console.log('add new tri...')
      if (!this.mouse.addTri.mode) {
        this.mouse.addTri.mode = true
        $('#add-new-tri').addClass('green2')
        
      } else {
        this.mouse.addTri.mode = false
        $('#add-new-tri').removeClass('green2')
      }
    });

    // 8. Mouse wheel Zoom
    $(document).on('mousewheel', (event) => {
      if (this.selectedView) {
        if (this.selectedView == 'screen-canvas') {
          let vForward = new Vec3D()
          vForward = this.graph.vector_Mul(this.graph.vLookDir, this.options.moveScale)
          this.graph.vCamera = (event.originalEvent.wheelDelta > 0) ? this.graph.vector_Add(this.graph.vCamera, vForward) : this.graph.vector_Sub(this.graph.vCamera, vForward);
        } else {
          let mod = (event.originalEvent.wheelDelta > 0) ? 2 : -2;          
          let element = $(`input[name='ratio'][data-name='${this.selectedView}']`)
          let modifyNum = parseInt(element.val()) + mod
          element.val(modifyNum)
          element.trigger('input')
        }
        clone.fullRefreshCanvasGraphics()
      }
    });

    //////////////////
    // KEYS | Add keys
    //////////////////
    document.addEventListener('keydown', (event) => {
      // console.log(this.keys)
      this.keys[event.code] = true

      this.checkKeyboardInputs()

      // IF MOUSE USE
      if (document.pointerLockElement == document.body) {
        // screen-canvas refresh
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

  lookMouseApi() {
    // MOUSE 3D VIEW SCREENLOCK MOVE
    document.body.requestPointerLock = document.body.requestPointerLock || document.body.mozRequestPointerLock || document.body.webkitRequestPointerLock;
    
    // Screen Click
    $("#screen-canvas").on('click', () => {
      this.selectedView = "screen-canvas"
      $("#screen-canvas").css('border-color', 'blue')

      this.fullRefreshCanvasGraphics()
      document.body.requestPointerLock()
    });

    $("#menu-top, #menu-right").on('click', () => {
      //console.log('Move out canvas')
      this.selectedView = null

      // remove new triange if active
      this.mouseAddTriReset()
      
      this.fullRefreshCanvasGraphics()
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
        $("#screen-canvas").css('border-color', 'gray')
      }
    });

    window.addEventListener("resize", () => {
      this.fullRefreshCanvasGraphics()
    });
  }

  fullRefreshCanvasGraphics() {
    this.refresViewSize()
    Object.entries(this.views).forEach(([name, value]) => {      
      let borderColor = (name == this.selectedView) ? 'blue' : 'gray';
      $(`#${name}`).css('border-color', borderColor)
      this.drawView(name)
    });
    this.refreshScreen()
  }

  // DRAW
  drawView(name) {
    let view = this.views[name];
    if (view) {
      view.ctx.clearRect(0, 0, view.canvas.width, view.canvas.height)

      // Koordinátarendszer mentése és tükrözés beállítása
      view.ctx.save() // Mentjük az eredeti koordinátarendszert
      view.ctx.translate(view.canvas.width / 2, view.canvas.height / 2) // Középpontba helyezés
      view.ctx.scale(-1, -1) // Tükrözés X és Y tengely mentén
      view.ctx.translate(-view.canvas.width / 2, -view.canvas.height / 2) // Visszahelyezés az eredeti helyre

      // POS ORIGO
      view.ctx.strokeStyle = 'blue'
      view.ctx.lineWidth = 4
      view.ctx.beginPath()
      view.ctx.arc(view.posX, view.posY, 1, 0, 2 * Math.PI)
      view.ctx.stroke()

      const space = (view.ratio / view.frequent < 1) ? 1 : view.ratio / view.frequent

      if (view.showGrid) {
        // Vonalszín
        view.ctx.strokeStyle = 'rgba(128, 128, 128, 0.5)' // Halvány szürke
        view.ctx.lineWidth = 1

        const startX = Math.floor(-view.posX / space) * space + view.posX
        const startY = Math.floor(-view.posY / space) * space + view.posY

        for (let x = startX; x < view.canvas.width; x += space) {
          view.ctx.beginPath()
          view.ctx.moveTo(x, 0)
          view.ctx.lineTo(x, view.canvas.height)
          view.ctx.stroke()
        }
        for (let y = startY; y < view.canvas.height; y += space) {
          view.ctx.beginPath()
          view.ctx.moveTo(0, y)
          view.ctx.lineTo(view.canvas.width, y)
          view.ctx.stroke()
        }
      }

      this.mapObjects.forEach(object => {
        var lineColor = object.lineColor

        object.tris.forEach(tri => {
          function isTriangleOnScreen(vertices, screenWidth, screenHeight) {
            const screenRect = { x1: 0, y1: 0, x2: screenWidth, y2: screenHeight }
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
            const orientation = (a, b, c) => (b.y - a.y) * (c.x - b.x) - (b.x - a.x) * (c.y - b.y)
            const o1 = orientation(p1, p2, q1)
            const o2 = orientation(p1, p2, q2)
            const o3 = orientation(q1, q2, p1)
            const o4 = orientation(q1, q2, p2)

            if (o1 * o2 < 0 && o3 * o4 < 0) return true; // Átlépő orientációk
            return false; // Ha nincs metszés
          }

          let p0X = (view.canvas.width / 2) + view.posX + tri.p[0][view.vX] * view.ratio
          let p0Y = (view.canvas.height / 2) + view.posY + tri.p[0][view.vY] * view.ratio
          let p1X = (view.canvas.width / 2) + view.posX + tri.p[1][view.vX] * view.ratio
          let p1Y = (view.canvas.height / 2) + view.posY + tri.p[1][view.vY] * view.ratio
          let p2X = (view.canvas.width / 2) + view.posX + tri.p[2][view.vX] * view.ratio
          let p2Y = (view.canvas.height / 2) + view.posY + tri.p[2][view.vY] * view.ratio

          const vertices = [
            { x: p0X, y: p0Y },
            { x: p1X, y: p1Y },
            { x: p2X, y: p2Y },
          ];

          if (isTriangleOnScreen(vertices, view.canvas.width, view.canvas.height)) {
            view.ctx.strokeStyle = lineColor
            view.ctx.lineWidth = 1

            view.ctx.beginPath()
            view.ctx.moveTo(p0X, p0Y)
            view.ctx.lineTo(p1X, p1Y)
            view.ctx.lineTo(p2X, p2Y)
            view.ctx.lineTo(p0X, p0Y)
            view.ctx.stroke()

            if (view.showDots) {
              view.ctx.strokeStyle = 'deeppink'
              view.ctx.lineWidth = 2
              view.ctx.beginPath()
              view.ctx.arc(p0X, p0Y, 1, 0, 2 * Math.PI)
              view.ctx.stroke()
              view.ctx.beginPath()
              view.ctx.arc(p1X, p1Y, 1, 0, 2 * Math.PI)
              view.ctx.stroke()
              view.ctx.beginPath()
              view.ctx.arc(p2X, p2Y, 1, 0, 2 * Math.PI)
              view.ctx.stroke()
            }
          }
        });
      });
      view.ctx.restore() // Eredeti koordinátarendszer visszaállítása

      // Információk kirajzolása (nem tükrözve)
      view.ctx.fillStyle = 'rgb(255, 255, 255)'
      view.ctx.font = '16px Arial'
      view.ctx.textAlign = 'left'
      view.ctx.fillText(`${view.vX.toUpperCase()} / ${view.vY.toUpperCase()}`, 5, 17)
    }
  }

  checkKeyboardInputs() {
    if (this.selectedView != 'screen-canvas' && this.selectedView != null && typeof this.selectedView != 'undefined') {

      // console.log(this.selectedView)

      if (this.keys['ArrowUp'] || this.keys['KeyW']) {
        // console.log('move up')
        this.views[this.selectedView].posY -= 5
        this.drawView(this.selectedView)
      }

      if (this.keys['ArrowDown'] || this.keys['KeyS']) {
        this.views[this.selectedView].posY += 5
        // console.log('move down')
        this.drawView(this.selectedView)
      }

      if (this.keys['ArrowLeft'] || this.keys['KeyA']) {
        // console.log('move left')
        this.views[this.selectedView].posX -= 5
        this.drawView(this.selectedView)
      }

      if (this.keys['ArrowRight'] || this.keys['KeyD']) {
        // console.log('move right')
        this.views[this.selectedView].posX += 5
        this.drawView(this.selectedView)
      }

      if (this.keys['Escape']) {
        console.log('Move ESC')
        this.selectedView = null
        this.fullRefreshCanvasGraphics()
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
      // console.log('1 gomb')
    }

    if (this.keys['Escape']) {
      console.log('ESC');
      this.selectedView = null
      this.fullRefreshCanvasGraphics()
    }
  }

  refreshScreen = () => { 
    this.graph.clearScreen(this.graph.screenCanvas, this.graph.screenCtx)
    this.graph.buffer.fill(0)         // clear memoryCanvas
    this.graph.depthBuffer.fill(0)    // DELETE Depth Buffer

    // this.graph.testFloor()
    // this.graph.testTexture()

    this.graph.movePlayerInMatrix(0) // 0.005
    this.graph.moveObjectsInMatrix(0.00) // 0.005
    this.graph.renderScreen()

    this.graph.memoryCtx.putImageData(this.graph.screenData, 0, 0)
    this.graph.infoTable()

    this.graph.screenCtx.drawImage(this.graph.memoryCanvas, 0, 0, this.graph.screenCanvas.width, this.graph.screenCanvas.height)
  }
}

class ViewWindow {
  constructor(name, vX, vY, posX, posY, ratio, frequent, showDots, showGrid) {
    this.name = name
    this.vX = vX
    this.vY = vY
    this.posX = posX
    this.posY = posY
    this.ratio = ratio
    this.frequent = frequent
    this.showDots = showDots
    this.showGrid = showGrid

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
