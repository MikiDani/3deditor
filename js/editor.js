import { Graphics } from './graphics.js'
import { Texture, Vec3D, Vec2D, Mesh, Triangle } from './data.js'

class ViewWindow {
  constructor(name, vX, vY, ratio, frequent, showDots, showGrid) {
    this.name = name
    this.vX = vX
    this.vY = vY
    this.canvas = (document.getElementById(this.name)) ? document.getElementById(this.name) : null;
    this.posX = this.canvas.width / 2
    this.posY = this.canvas.height / 2
    this.ratio = ratio
    this.frequent = frequent
    this.showDots = showDots
    this.showGrid = showGrid

    if (this.canvas) {
      this.ctx = this.canvas.getContext("2d")
      this.ctx.imageSmoothingEnabled = false
    } else {
      console.error(`${name} is not isset!`)
    }
  }
}

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

    this.map = {
      data: {},
      structure: {},
    }

    this.keys = {}
    this.selectedView = null

    this.mouse = {
      startX: 0,
      startY: 0,
      endX: 0,
      endY: 0,
      isMouseDown: false,
      addTri: {},
      selectedTri: {}
    }
    this.resetMouseAddTri()
    
    this.howMany = true

    this.init()
  }

  async init() {
    await this.loadTextures()
    await this.loadModels()

    this.graph = new Graphics(this.textures, this.keys, this.options, this.map)

    // MOVE OBJECTS IN START
    this.graph.moveObject(1, 2,  0, 0)
    this.graph.moveObject(2, 0, -2, 0)
    this.graph.moveObject(3, 2, -2, 0)

    this.views = {
      // name, vX, vY, ratio, frequent, showDots, showGrid
      'XYview-canvas': new ViewWindow('XYview-canvas', 'x', 'y', 100, 1, true, true),
      'XZview-canvas': new ViewWindow('XZview-canvas', 'x', 'z', 100, 1, true, true),
      'ZYview-canvas': new ViewWindow('ZYview-canvas', 'z', 'y', 100, 1, true, true),
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
              <span>Ratio:</span><input type="number" name="ratio" data-name="${name}" min="0" max="200" step="10" value="${this.views[name].ratio}">
          </div>
          <div class="side-row">
              <span>Freq.:</span><input type="number" name="frequent" data-name="${name}" min="0" max="8" step="1" value="${this.views[name].frequent}">
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

    this.refreshMenuList()
    
    this.initInputs()    
    this.fullRefreshCanvasGraphics()
  }

  refreshMenuList() {
    // LIST OBJECTS
    function recursiveMenu(item) {
        let element = `<ul>`;
        element += `<li data-id="${item.id}">${item.name} <span class="menu-icon menu-icon-pos-1 triangle-up"></span></li>`;

        if (Array.isArray(item.tris) && item.tris.length > 0) {
          element += `<ul data-parent-id="${item.id}">`;
          item.tris.forEach(tri => {
            element += `<li data-id="${tri.id}" class="tri-list">Tri ${tri.id}</li>`;
          });
          element += `</ul>`;
        }

        if (Array.isArray(item.child) && item.child.length > 0) {
          item.child.forEach(child => {
            element += recursiveMenu(child)
          });
        }

        element += `</ul>`;
        return element;
    }
    // start
    $('#object-list').html('');
    let element = `<ul>`;

    this.map.structure.forEach(item => {
      element += recursiveMenu(item)
    })

    element += `</ul>`;
    $('#object-list').html(element)
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
    //this.montains = new Mesh(Date.now())
    //this.axis = new Mesh(Date.now())
    
    // await this.montains.loadFromObjectFile("data/montains.obj", 'Montains', 'yellow')
    // await this.axis.loadFromObjectFile("data/axis.obj", 'Axis', 'yellow')
    
    // this.map.data.push(this.montains)
    // this.map.data.push(this.axis)

    // --- MOST teszt LOAD
    this.map.data = []
    
    this.cube = new Mesh(1, null)
    await this.cube.loadFromOwnTris("data/cube.obj", 'Cube', 'lime')
    this.map.data.push(this.cube)

    this.cube2 = new Mesh(2, null)
    await this.cube2.loadFromOwnTris("data/cube.obj", 'Cube2', 'green')
    this.map.data.push(this.cube2)

    this.cube3 = new Mesh(3, 2)
    await this.cube3.loadFromOwnTris("data/cube.obj", 'Cube3', 'orange')
    this.map.data.push(this.cube3)

    this.cube4 = new Mesh(4, 3)
    await this.cube4.loadFromOwnTris("data/cube.obj", 'Cube4', 'olive')
    this.map.data.push(this.cube4)

    console.log(this.map.data)

    this.map.structure = this.buildStructure(this.map.data)

    console.log(this.map.structure)
  }

  buildStructure(data) {
    const map = new Map()
    const root = []

    // Az összes elemet elmentjük egy Map-be az id alapján
    data.forEach(group => map.set(group.id, { ...group, child: [] }))

    map.forEach(item => {
      if (item.parent_id === null) {
        root.push(map.get(item.id))
      } else {
        const parent = map.get(item.parent_id)
        if (parent) {
          parent.child.push(map.get(item.id))
        }
      }
    });

    return root;
  }

  getMousePosition(clone, event, rect, name) {
    let startX = Math.floor(event.clientX - rect.left)    // Egér kezdő X
    let startY = Math.floor(event.clientY - rect.top)     // Egér kezdő Y

    let invertX = rect.width - startX; let invertY = rect.height - startY;
    let plusMouseX = invertX - clone.views[name].posX; let plusMouseY = invertY - clone.views[name].posY;

    let valueX = Math.round(plusMouseX / clone.views[name].ratio)
    let valueY = Math.round(plusMouseY / clone.views[name].ratio)

    return {sx: startX, sy: startY, ix:invertX, iy:invertY, vx: valueX, vy: valueY}
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
        let newHeight = Math.floor($(window).height() - $(`#menu-top`).height()) - 8

        // all hide
        $('#container-screens > .view-segment').hide()
        // selected resize and show
        $(`#container-screens > canvas[id='${name}']`).width(newWidth)
        $(`#container-screens > canvas[id='${name}']`).height(newHeight)
        $(`#container-screens > canvas[id='${name}']`).show()

        if (name == 'screen-canvas') {                    
          clone.graph.screenCanvas.width = newWidth
          clone.graph.screenCanvas.height = newHeight

        } else if (name == 'XYview-canvas' || name == 'XZview-canvas' || name == 'ZYview-canvas') {
          clone.views[name].canvas.width = newWidth
          clone.views[name].canvas.height = newHeight
        }

      } else {
        let newWidth = Math.floor($('#container-screens').width() / 2)
        let newHeight = Math.floor(($(window).height() - $(`#menu-top`).height()) / 2) - 8

        $(`#container-screens > canvas[id='${name}']`).width(newWidth)
        $(`#container-screens > canvas[id='${name}']`).height(newHeight)

        if (name == 'XYview-canvas' || name == 'XZview-canvas' || name == 'ZYview-canvas') {
          clone.views[name].canvas.width = newWidth
          clone.views[name].canvas.height = newHeight
        }
      }
    });
  }

  resetMouseAddTri () {
    this.mouse.addTri = {
      mode: false,
      count: 0,
      cords: [{x:0, y:0, z:0}, {x:0, y:0, z:0}, {x:0, y:0, z:0}],
      texture1: [{u:0, v:1}, {u:0, v:0}, {u:1, v:0}],
      texture2: [{u:0, v:1}, {u:1, v:0}, {u:1, v:1}],
      light: 1,
    }   
    // new Triangle(new Vec3D(1, 0, 0, 1), new Vec3D(1, 1, 0, 1), new Vec3D(1, 1, 1, 1), new Vec2D(0, 1, 1), new Vec2D(0, 0, 1), new Vec2D(1, 0, 1)),
    // new Triangle(new Vec3D(1, 0, 0, 1), new Vec3D(1, 1, 1, 1), new Vec3D(1, 0, 1, 1), new Vec2D(0, 1, 1), new Vec2D(1, 0, 1), new Vec2D(1, 1, 1)),
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

    ////////////////////////////////////////
    // 5. CANVAS ViewWindow event listeners
    Object.entries(this.views).forEach(([name, value]) => {
      $(`#${name}`).on('mousemove', function (event) {
        const rect = this.getBoundingClientRect()
        let pos = clone.getMousePosition(clone, event, rect, name)

        $('#info-box').html(`X: ${pos.ix} y: ${pos.iy}<br>vX: ${pos.vx} vY:${pos.vy}`)
      });

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

      ///////////////////////
      // canvas window click
      $(`#${name}`).on('mousedown', function (event) {
        clone.selectedView = name
        clone.mouse.isOk = name
        const rect = this.getBoundingClientRect()

        clone.mouse.startX = event.clientX - rect.left // Egér kezdő X
        clone.mouse.startY = event.clientY - rect.top // Egér kezdő Y
        clone.mouse.isMouseDown = true

        ////////////////
        // ADD TRI MODE
        if (clone.mouse.addTri.mode) {
          console.log('TRIANGLE MODE!')

          const rect = this.getBoundingClientRect()
          let pos = clone.getMousePosition(clone, event, rect, name)

          clone.mouse.addTri.cords[clone.mouse.addTri.count][clone.views[name].vX] = pos.vx // - (clone.views[name].posX / clone.views[name].ratio)
          clone.mouse.addTri.cords[clone.mouse.addTri.count][clone.views[name].vY] = pos.vy // - (clone.views[name].posY / clone.views[name].ratio)

          if (clone.mouse.addTri.count == 2) {
            if ((clone.mouse.addTri.cords[0].x == clone.mouse.addTri.cords[1].x && clone.mouse.addTri.cords[1].x == clone.mouse.addTri.cords[2].x)
            || (clone.mouse.addTri.cords[0].y == clone.mouse.addTri.cords[1].y && clone.mouse.addTri.cords[1].y == clone.mouse.addTri.cords[2].y)) {
              // Adding error
              clone.resetMouseAddTri()
              alert('Adding error!')
            } else {
              // Add triangle
              let newGroup = new Mesh(Date.now())
              newGroup.name = 'New tri: ' + Math.floor(Math.random()*99999)
  
              let t1, t2, t3 = null
  
              if (clone.howMany) {
                // console.log('t1'); console.log(clone.howMany)
                t1 = new Vec2D(clone.mouse.addTri.texture1[0].u, clone.mouse.addTri.texture1[0].v)
                t2 = new Vec2D(clone.mouse.addTri.texture1[1].u, clone.mouse.addTri.texture1[1].v)
                t3 = new Vec2D(clone.mouse.addTri.texture1[2].u, clone.mouse.addTri.texture1[2].v)
              } else {
                // console.log('t2'); console.log(clone.howMany)
                t1 = new Vec2D(clone.mouse.addTri.texture2[0].u, clone.mouse.addTri.texture2[0].v)
                t2 = new Vec2D(clone.mouse.addTri.texture2[1].u, clone.mouse.addTri.texture2[1].v)
                t3 = new Vec2D(clone.mouse.addTri.texture2[2].u, clone.mouse.addTri.texture2[2].v)
              }
  
              clone.howMany = !clone.howMany
  
              newGroup.tris.push(
                new Triangle(new Vec3D(clone.mouse.addTri.cords[0].x, clone.mouse.addTri.cords[0].y, clone.mouse.addTri.cords[0].z), new Vec3D(clone.mouse.addTri.cords[1].x, clone.mouse.addTri.cords[1].y, clone.mouse.addTri.cords[1].z), new Vec3D(clone.mouse.addTri.cords[2].x, clone.mouse.addTri.cords[2].y, clone.mouse.addTri.cords[2].z),
                t1, t2, t3,
                2, 1, [255, 200, 40, 1])
              )
  
              clone.map.data.push(newGroup)
              clone.resetMouseAddTri()
  
              clone.refreshListObject()
            }
          } else {
            clone.mouse.addTri.count++
          }
        }
      });

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

      $('#add-new-tri').removeClass('green2')

      console.log('add new tri...')
      console.log(this.mouse.addTri.mode)
      
      if (this.mouse.addTri.mode == false) {
        this.mouse.addTri.mode = true
        $('#add-new-tri').addClass('green2')
      } else {
        console.log('reset add trialgle....')
        this.mouse.addTri.mode = false
        this.resetMouseAddTri()
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

    ////////////////////
    // Responsite menu
    // First load object list
    setTimeout(function() {
      $("#object-list").find(".menu-icon").each(function() {
          let id = $(this).closest('li').attr('data-id')
          if ($(this).hasClass('triangle-up')) {
              $(this).closest(`ul`).find(`ul[data-parent-id='${id}']`).hide()
          } else if ($(this).hasClass('triangle-down')) {
              $(this).closest(`ul`).find(`ul[data-parent-id='${id}']`).show()
          }
      });

      $("#object-list").show()
    }, 100);

    $(document).on('click', '#object-open-close-all', function() {
        let status = $(this).attr('data-status')
        status = Number(status)

        $("#object-list").find(".menu-icon").each(function() {
            let id = $(this).closest('li').attr('data-id')

            $(this).removeClass('triangle-up').removeClass('triangle-down')
    
            if (status) {
                $(this).closest(`ul`).find(`ul[data-parent-id='${id}']`).hide()
                $(this).addClass('triangle-up')
            } else {
                $(this).closest(`ul`).find(`ul[data-parent-id='${id}']`).show()
                $(this).addClass('triangle-down')
            }
        });

        status = status == 1 ? 0 : 1;
        $(this).attr('data-status', status)
    });

    $(document).on('click', ".menu-icon", function() {
        let id = $(this).closest('li').attr('data-id')

        if ($(this).hasClass('triangle-up')) {
            $(this).removeClass('triangle-up').addClass('triangle-down')
        } else if ($(this).hasClass('triangle-down')) {
            $(this).removeClass('triangle-down').addClass('triangle-up')
        }
    
        $(this).closest(`ul`).find(`ul[data-parent-id='${id}']`).slideToggle()
    });

    $(document).on('click', ".tri-list", function() {

      if (typeof clone.mouse.selectedTri.id !== 'undefined') 
        $(document).find(`li[data-id='${clone.mouse.selectedTri.id}']`).removeClass('menu-selected');

      let tri_id = $(this).attr('data-id')
      clone.mouse.selectedTri = {}
      clone.mouse.selectedTri.id = tri_id

      $(document).find(`li[data-id='${tri_id}']`).addClass('menu-selected')

      console.log(tri_id)
        
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
      this.resetMouseAddTri()
      
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
    this.refresViewSize() // full screen or not
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
      view.ctx.arc(view.posX, view.posY, 4, 0, 2 * Math.PI)
      view.ctx.stroke()

      const space = (view.ratio / view.frequent < 1) ? 1 : view.ratio / view.frequent

      // DRAW GRID
      if (view.showGrid) {
        view.ctx.strokeStyle = 'rgba(128, 128, 128, 0.5)'
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

      // DRAW OBJECTS
      this.map.data.forEach(object => {
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

          let p0X = view.posX + tri.p[0][view.vX] * view.ratio; let p0Y = view.posY + tri.p[0][view.vY] * view.ratio;
          let p1X = view.posX + tri.p[1][view.vX] * view.ratio; let p1Y = view.posY + tri.p[1][view.vY] * view.ratio;
          let p2X = view.posX + tri.p[2][view.vX] * view.ratio; let p2Y = view.posY + tri.p[2][view.vY] * view.ratio;

          const vertices = [
            { x: p0X, y: p0Y },
            { x: p1X, y: p1Y },
            { x: p2X, y: p2Y },
          ];

          if (isTriangleOnScreen(vertices, view.canvas.width, view.canvas.height)) {

            if (tri.id == this.mouse.selectedTri.id) {
              view.ctx.strokeStyle = 'white'
              view.ctx.lineWidth = 2

            } else {
              view.ctx.strokeStyle = lineColor
              view.ctx.lineWidth = 1
            }

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

      // DRAW HELPLINE
      if (this.mouse.addTri.mode && this.mouse.addTri.count > 0) {
        let np0X = view.posX + this.mouse.addTri.cords[0][view.vX] * view.ratio; let np0Y = view.posY + this.mouse.addTri.cords[0][view.vY] * view.ratio;
        view.ctx.strokeStyle = 'purple'
        view.ctx.lineWidth = 4
        view.ctx.beginPath()
        view.ctx.arc(np0X, np0Y, 4, 0, 2 * Math.PI)
        view.ctx.stroke()
      }

      if (this.mouse.addTri.mode && this.mouse.addTri.count == 2) {
        let actPoint = this.mouse.addTri.count - 1
        let prewPoint = this.mouse.addTri.count - 2

        let np0X = view.posX + this.mouse.addTri.cords[prewPoint][view.vX] * view.ratio; let np0Y = view.posY + this.mouse.addTri.cords[prewPoint][view.vY] * view.ratio;
        let np1X = view.posX + this.mouse.addTri.cords[actPoint][view.vX] * view.ratio; let np1Y = view.posY + this.mouse.addTri.cords[actPoint][view.vY] * view.ratio;

        view.ctx.strokeStyle = 'white'
        view.ctx.lineWidth = 3
        view.ctx.beginPath()
        view.ctx.moveTo(np0X, np0Y)
        view.ctx.lineTo(np1X, np1Y)
        view.ctx.stroke()
      }

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

  // DRAW GRAPHICS
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

const editor = new Editor()
