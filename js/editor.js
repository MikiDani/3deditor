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
      this.ctx.lineCap = 'round'
      this.ctx.lineJoin = 'round'
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

    this.mapMemory = []
    this.textureDir = []

    this.clipboardMemory = {
      tris: [],
      meshs: [],
    }

    this.keys = {}
    this.selectedView = null
    this.textureRatio = 1

    this.mouseVariableReset()

    this.resetMouseAddTri()
    this.resetMouseAddRec()
    
    this.newTriSide = true

    this.init()
  }

  mouseVariableReset() {
    this.mouse = {
      startX: 0,
      startY: 0,
      endX: 0,
      endY: 0,
      mode: 'move',           // move, point, triangle
      selectedMeshId: null,
      selectedMeshData: null,
      isMouseDown: false,
      addTri: {},
      addRec: {},
      selectedTri: {},
      selectedLock: {},

      moveTriPoint: null,
    }
  }

  async init() {

    if (false) {
      let filename = 'valamika'    
      const responseIsset = await this.fetchData({ ajax: true, save: true, filename }, true)
      if (responseIsset) {
        console.log('---------------')
        console.log('TEST')
        console.log(responseIsset)
        console.log('---------------')
      }
    }

    await this.loadTextures()
    await this.loadModels()

    this.graph = new Graphics(this.textures, this.keys, this.options, this.map)

    // MOVE OBJECTS IN START
    this.graph.moveObject(1, 2,  0, 0)
    this.graph.moveObject(2, 0, -2, 0)
    this.graph.moveObject(3, 2, -2, 0)

    this.views = {
      // name, vX, vY, ratio, frequent, showDots, showGrid
      'XYview-canvas': new ViewWindow('XYview-canvas', 'x', 'y', 100, 10, true, true),
      'XZview-canvas': new ViewWindow('XZview-canvas', 'x', 'z', 100, 10, true, true),
      'ZYview-canvas': new ViewWindow('ZYview-canvas', 'z', 'y', 100, 10, true, true),
    } // console.log(this.views)

    /////////////////////
    // ADD HTML ELEMENTS

    // VIEW-SCREEN OPTIONS
    Object.entries(this.views).forEach(([name, value]) => {

      let funcKey
      if (this.views[name].vX =='x' && this.views[name].vY == 'y') funcKey = 'F2';
      else if (this.views[name].vX =='x' && this.views[name].vY == 'z') funcKey = 'F3'
      else if (this.views[name].vX =='z' && this.views[name].vY == 'y') funcKey = 'F4'

      let element = `
      <div class="top-screen-options">
        <div class="left-side">
          <div class="side-row">
              <span><strong class="text-uppercase">View ${this.views[name].vX}/${this.views[name].vY}(${funcKey})</strong></span><span class="reset-center-button" data-name="${name}" title="Reset to default center.">&#9679;</span>
          </div>
          <div class="side-row">
              <span>Ratio:</span><input type="number" name="ratio" data-name="${name}" min="0" max="200" step="10" value="${this.views[name].ratio}">
          </div>
          <div class="side-row">
              <span>Freq.:</span><input type="number" name="frequent" data-name="${name}" min="1" max="20" step="1" value="${this.views[name].frequent}">
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
      $(`#axis-container`).append(element)
    });

    this.refreshObjectList()
    
    this.initInputs()
    this.saveMapMemory('init')
    this.fullRefreshCanvasGraphics()
  }

  deepCopy(data) {
    if (Array.isArray(data)) {
      return data.map(item => this.deepCopy(item));
    }
    if (data !== null && typeof data == 'object') {
      let copy = {};
      for (let key in data) {
        if (data.hasOwnProperty(key)) {
          copy[key] = key == 'visible' ? 1 : this.deepCopy(data[key]);
        }
      }
      return copy;
    }
    return data;
  }

  saveMapMemory(mode) {
    if (mode == 'init') {
      $(".menu-text-border.menu-back").on('click', () => {
        this.saveMapMemory('back')
      });
    } else if (mode == 'save') {
      this.mapMemory.unshift(JSON.parse(JSON.stringify(this.map)))
      if (this.mapMemory.length > 8) this.mapMemory.splice(8);
    } else if (mode == 'back') {
      if (this.mapMemory.length > 0) {
        console.log('BACK')

        this.mouse.selectedTri = null; this.mouse.selectedLock = null;

        this.map = null
        this.map = JSON.parse(JSON.stringify(this.mapMemory[0]))
        this.graph.map = this.map

        this.mapMemory.shift()

        this.refreshObjectList()
        this.fullRefreshCanvasGraphics()
      } else {
        alert(`you can't go back`)
      }
    }

    // Button design
    $(".menu-text-border.menu-back").removeClass('menu-back-isset menu-back-empty');
    if (this.mapMemory.length > 0) $(".menu-text-border.menu-back").addClass('menu-back-isset');
    else $(".menu-text-border.menu-back").addClass('menu-back-empty');
  }

  refreshClipboard() {    
    function isEmptyStructure(obj) {
      return Object.values(obj).every(
        (value) => Array.isArray(value) && value.length == 0
      );
    }

    function drawList(clipboardMemory, variable, title) {
      if (clipboardMemory[variable].length > 0) {
        let list = `<span class="underline"><strong>${title}</strong></span>`
        list += `<ul class="p-0 m-0 no-list-style">`
        clipboardMemory[variable].forEach(obj => {
          list += `<li style="margin-left:10px;" data-id="${obj.id}">${obj.name}</li>`
        });
        list += "</ul>"
        $("#clipboard-content").append(list)
      }
    }

    // start
    $("#clipboard-content").html('')
    if (!isEmptyStructure(this.clipboardMemory)) { 
      drawList(this.clipboardMemory, 'tris', 'Triangles:')
      drawList(this.clipboardMemory, 'meshs', 'Meshs:')
      $("#clipboard-container").show()
    } else {
      $("#clipboard-container").hide()
    }
  }

  refreshObjectList() {
    $('#object-list').html('');
    if (this.map.structure.length > 0) {
      this.refreshClipboard()
      // LIST OBJECTS
      let element = `<ul>`;
      this.map.structure.forEach(item => {
        element += this.recursiveMenu(item)
      })
      element += `</ul>`;
      $('#object-list').html(element)

      if (this.mouse.selectedMeshId) this.selectedMeshClassChange(this.mouse.selectedMeshId);
    }
  }

  recursiveMenu(item) {
    const meshData = this.map.data.find(element => element.id == item.id)
    let itemData = this.findMeshById(this.map.structure, meshData.id)

    let classTriangle = itemData.status ? 'triangle-up' : 'triangle-down';
    let classEye = itemData.visible ? 'eye-up' : 'eye-down';

    let element = `<ul>`;
    element += `
    <li data-id="${item.id}" class="mesh-name">
      <span>${meshData.name}</span>
      <span class="menu-icon triangle ${classTriangle} p-0 m-0" title="Open/Close group triangles"></span>
      <span class="menu-icon eye ${classEye}" title="Visible or hide group"></span>
      <span class="menu-icon menu-icon-pos-1 plus" title="Add group"></span>
      <span class="menu-icon menu-icon-pos-2 duplicate" title="Duplicaded group"></span>
      <span class="menu-icon menu-icon-pos-3 up" data-type="prev" title="Move up-brother"></span>
      <span class="menu-icon menu-icon-pos-4 down" data-type="next" title="Move down-brother"></span>
      <span class="menu-icon menu-icon-pos-5 back" title="Move back-parent"></span>
      <span class="menu-icon menu-icon-pos-6 back-blend-in" title="Blend in to parent"></span>
      <span class="menu-icon menu-icon-pos-7 clipboard" title="Cut group to clipboard"></span>
      <span class="menu-icon menu-icon-pos-8 delete-group" title="Delete group"></span>
    </li>`;

    if (Array.isArray(meshData.tris) && meshData.tris.length > 0) {
      let show = Number(item.status) ? 'block' : 'none'; 
      element += `<ul data-parent-id="${item.id}" style="display:${show};">`;
      meshData.tris.forEach(tri => {
        element += `<li data-id="${tri.id}" class="tri-list">${tri.name}</li>`;
      });
      element += `</ul>`;
    }

    if (Array.isArray(item.child) && item.child.length > 0) {
      item.child.forEach(child => {
        element += this.recursiveMenu(child)
      });
    }
    element += `</ul>`;
    return element;
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
    this.textures[6] = new Texture('img/texture3.png'); await this.textures[6].load()
    console.log(`${this.textures[6].link} loaded...`)
    this.textures[7] = new Texture('img/f-1.png'); await this.textures[7].load()
    console.log(`${this.textures[7].link} loaded...`)
  }

  async loadModels() {
    this.map.data = []
    this.map.structure = []

    // FIRST LOAD
    if (false) {
      let filename = 'dani1'
      const response = await this.fetchData({ ajax: true, load: true, filename: filename })
      console.log(response)

      if (response?.data && response?.structure) {
        console.log('response:'); console.log(response);
  
        this.map.data = this.deepCopy(response.data)
        this.map.structure = this.deepCopy(response.structure)

        const maxId = Math.max(...this.map.data.map(obj => obj.id));
        Mesh.setInstanceCount(maxId + 1)

        console.log(this.map.data)
        console.log(this.map.structure)
      }
    }

    if (false) {
      // this.montains = new Mesh()
      // this.axis = new Mesh()
      
      // --- MOST teszt LOAD
  
      // await this.montains.loadFromObjectFile("data/montains.obj", 'Montains', 'yellow')
      // await this.axis.loadFromObjectFile("data/axis.obj", 'Axis', 'yellow')
  
      // this.axis.id = 100
  
      // this.map.data.push(this.montains)
      // this.map.data.push(this.axis)
      const cube = new Mesh()
      await cube.loadFromOwnTris("data/cube2.obj", 'Cube', 'lime')    
      const cube2 = new Mesh()
      await cube2.loadFromOwnTris("data/cube.obj", 'Cube2', 'orange')
      const cube3 = new Mesh('', 1)
      await cube3.loadFromOwnTris("data/cube.obj", 'Cube3', 'purple')
  
      // MAP DATA
      this.map.data.push(cube)
      this.map.data.push(cube2)
      this.map.data.push(cube3)

      // MAP STRUCTURE
      this.map.structure = [
        {
          id: cube.id,
          child: [
            {
              id: cube3.id,
              child: [],
            }
          ],
        },
        {
          id: cube2.id,
          child: [],
        }
      ]
    }

  }

  getMousePosition(clone, event, rect, name) {
    let startX = Math.floor(event.clientX - rect.left)    // Egér kezdő X
    let startY = Math.floor(event.clientY - rect.top)     // Egér kezdő Y

    let invertX = rect.width - startX; let invertY = rect.height - startY;
    let plusMouseX = invertX - clone.views[name].posX; let plusMouseY = invertY - clone.views[name].posY;

    // old
    // let valueX = Math.round(plusMouseX / clone.views[name].ratio)
    // let valueY = Math.round(plusMouseY / clone.views[name].ratio)

    let valueX = Math.round((plusMouseX / clone.views[name].ratio) * clone.views[name].frequent) / clone.views[name].frequent
    let valueY = Math.round((plusMouseY / clone.views[name].ratio) * clone.views[name].frequent) / clone.views[name].frequent

    return {sx: startX, sy: startY, ix:invertX, iy:invertY, vx: valueX, vy: valueY}
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

  findMeshParent(data, meshId) {
    if (!Array.isArray(data)) return null;

    for (let mesh of data) {
        if (!mesh || typeof mesh != "object" || !Array.isArray(mesh.child)) continue;

        if (mesh.child.some(child => child.id == meshId)) {
            return mesh; // Ez a szülő elem
        }

        let foundParent = this.findMeshParent(mesh.child, meshId);
        if (foundParent) {
            return foundParent;
        }
    }
    return null;
  }

  getAllMeshTreeIds(data, ids = []) {      
    if (data?.id) ids.push(data.id);
    if (data?.child && Array.isArray(data.child) && data.child.length > 0) for (let row of data.child) this.getAllMeshTreeIds(row, ids);

    return ids;
  }

  deleteMeshParent(parent, id) {
    if (!parent || !Array.isArray(parent)) return;

    for (let i = 0; i < parent.length; i++) {
      if (parent[i].id == id) {        
        // DELETE
        parent.splice(i, 1)
        // continue;
      }

      if (parent[i]?.child && parent[i].child.length > 0) {        
        this.deleteMeshParent(parent[i].child, id)
      }
    }
  }

  findMeshBrothers(data, meshId) {
    // If null level
    let parentId = this.map.data.find(element => element.id == meshId).parent_id
    if (!parentId) {      
      let returnData = []
      for (let mesh of data) {
        returnData.push(parseInt(mesh.id))
      }
      return returnData;
    }
    // if have child
    for (let mesh of data) {
      if (mesh.child) {
        let found = mesh.child.find(child => child.id == meshId);
        if (found) {
          let returnData = []
          for (let meshList of mesh.child) {
            returnData.push(parseInt(meshList.id))
          }
          return returnData;
        }
        // find child
        let deeperSearch = this.findMeshBrothers(mesh.child, meshId);
        if (deeperSearch) {
            return deeperSearch;
        }
      }
    }
    return null;
  }

  getMapNextOrPrevId(id, brotherIds, type) {
    let returnData = null
    id = parseInt(id)
    const index = brotherIds.indexOf(id)
    if (index !== -1) {
      if (type == 'prev') {
        returnData = index > 0 ? brotherIds[index - 1] : null;
      } else if (type == 'next') {
        returnData = index < brotherIds.length - 1 ? brotherIds[index + 1] : null;
      }
    }
    return returnData;
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
          // console.log(newWidth, newHeight)
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
    let r = this.textureRatio
    this.mouse.addTri = {
      mode: false,
      count: 0,
      cords: [{x:0, y:0, z:0}, {x:0, y:0, z:0}, {x:0, y:0, z:0}],
      texture1: [{u:0, v:r}, {u:0, v:0}, {u:r, v:0}],
      texture2: [{u:0, v:r}, {u:r, v:0}, {u:r, v:r}],
      light: 1,
    }
    // HELP
    // new Triangle(new Vec3D(1, 0, 0, 1), new Vec3D(1, 1, 0, 1), new Vec3D(1, 1, 1, 1), new Vec2D(0, 1, 1), new Vec2D(0, 0, 1), new Vec2D(1, 0, 1)),
    // new Triangle(new Vec3D(1, 0, 0, 1), new Vec3D(1, 1, 1, 1), new Vec3D(1, 0, 1, 1), new Vec2D(0, 1, 1), new Vec2D(1, 0, 1), new Vec2D(1, 1, 1)),
    $('#add-new-tri').removeClass('green2')
  }

  resetMouseAddRec () {
    let r = this.textureRatio
    this.mouse.addRec = {
      mode: false,
      count: 0,
      cords: [{x:0, y:0, z:0}, {x:0, y:0, z:0}],
      texture1: [{u:0, v:r}, {u:0, v:0}, {u:r, v:0}],
      texture2: [{u:0, v:r}, {u:r, v:0}, {u:r, v:r}],
      light: 1,
    }
    $('#add-new-rec').removeClass('green2')
  }

  fileListElementsMake(mode, listElements, showInput, isTextures) {
    showInput ? $("#modal-input").show() : $("#modal-input").hide();

    $("#modal-content").html('')
    $("#modal-message").html('')
    let elements = ''

    let buttonText
    if (mode == 'load') buttonText = 'Load'; else if (mode == 'save') buttonText = 'Save'; else if (mode == 'textures') buttonText = 'New Dir'; else buttonText = mode;

    if (isTextures) {
      $("#modal-input").show()
      this.textureDir.length == 0 ? $("#modal-back").hide() : $("#modal-back").show();
    }

    listElements.forEach(fileOrDir => {
      if (isTextures) {
        elements += `
        <div class="list-element cursor-pointer" data-filename="${fileOrDir}" data-mode="${mode}">
          <span>${fileOrDir}</span>
        </div>`
      } else if (fileOrDir.extension == 'tuc') {
        elements += `<div class="list-element cursor-pointer" data-filename="${fileOrDir.name}" data-mode="${mode}">
          <span>${fileOrDir.name}</span><span>.${fileOrDir.extension}</span>
        </div>`
      }
    });

    if (isTextures && this.textureDir.length == 2) {
      elements += `<div>${this.textureDir} Most kell a képlista !!!!</div>`
    }

    $("#modal-content").append(elements)
    $("#modal-container .modal-action-button").html(buttonText).attr('mode', mode).prop('disabled', true)
    $("#modal-container .modal-delete-button").prop('disabled', true)
    $("#modal-content").show()
  }

  makeDirStructure() {
    let getdirs = '';
    if (this.textureDir.length > 0) {
      this.textureDir.forEach(list => {
        getdirs += `${list}/`;
      });
    }
    return getdirs;
  }

  async textureFunction(mode) {
    let getdirs = this.makeDirStructure()
    const response = await this.fetchData({ ajax: true, getdirs: getdirs })
    if (response?.dirs) this.fileListElementsMake(mode, response.dirs, false, true)
  }

  initInputs() {
    var clone = this

    // mouse right button off
    $(document).on("contextmenu", function(event) {
      event.preventDefault();
      console.log("Jobb klikk letiltva!");
    });

    // MAP INFO TO THE CONSOL
    $(document).on('keydown', (event) => {
      if (event.key == 'i') {
        console.log('this.map.data:')
        console.log(this.map.data)
    
        console.log('this.map.structure')
        console.log(this.map.structure)
      }
    });

    // VIEW BUTTONS
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

    // MODAL CONTENT CREATE
    $(".modal-button").on('click', async function() {
      let mode = $(this).attr('data-mode')
      if (mode) $("#modal-title").html(mode);

      $("#modal-container").attr('data-mode', mode)

      // LOAD
      if (mode == 'load') {
        const response = await clone.fetchData({ ajax: true, getfiles: true })
        if (response?.files) clone.fileListElementsMake(mode, response.files, false, false)
      }

      // SAVE
      if(mode == 'save') {
        const response = await clone.fetchData({ ajax: true, getfiles: true })
        if (response?.files) clone.fileListElementsMake(mode, response.files, true, false)
      }

      // TEXTURES
      if(mode == 'textures') {
        await clone.textureFunction(mode)
      }

      $("#modal-bg").toggle()
    });

    // MODAL BACK
    $("#modal-back").on('click', async () => {
      if (this.textureDir.length > 0) {
        this.textureDir.pop()
        await clone.textureFunction('textures')
      }      
    });

    $(document).on('click', "#modal-container", async function(event) {
      if (!$(event.target).closest("#modal-inputdiv").length) {
        event.stopPropagation()
        // remove class
        $("#modal-content .list-element").each(function() {
          $(this).removeClass("list-selected-file")
        });

        let mode = $("#modal-container").attr('data-mode')
        let buttonText
        if (mode == 'load') buttonText = 'Load'; else if (mode == 'save') buttonText = 'Save'; else if (mode == 'textures') buttonText = 'New Dir'; else buttonText = mode;
  
        $("#modal-container .modal-action-button").html(buttonText).prop('disabled', true)
        $("#modal-container .modal-delete-button").prop('disabled', true)
        $('#modal-input').val('')
  
        console.log('STOP!!!')
      }
    });

    $(document).on('click', "#modal-content .list-element", async function(event) {
      event.stopPropagation()
      // remove selected list-element class
      $("#modal-content .list-element").each(function() {
        $(this).removeClass("list-selected-file")
      });

      let filename = $(this).attr('data-filename')

      $(".modal-action-button").attr('data-original-filename', filename)

      let mode = $("#modal-container").attr('data-mode')
      let buttonText
      if (mode == 'load') buttonText = 'Load'; else if (mode == 'save') buttonText = 'Save'; else if (mode == 'textures') buttonText = 'Rename'; else buttonText = mode;

      if (mode=='textures') {
        // ???
        console.log('TEXTURE !!! Sima click!!!')
      }

      $(this).addClass("list-selected-file")
      if (filename) {
        $("#modal-container .modal-action-button").html(buttonText).prop('disabled', false).attr('data-filename', filename)
        $("#modal-container .modal-delete-button").prop('disabled', false)
        $('#modal-input').val(filename)
      }
    });

    // DIR DUBBLE CLICK
    $(document).on('dblclick', "#modal-content .list-element", async function() {
      let mode = $(this).attr('data-mode')

      if (mode=='textures') {
        console.log('2click TEXTURESS')
        $('#modal-input').val('')
        let filename = $(this).attr('data-filename')
        clone.textureDir.push(filename)
        await clone.textureFunction(mode)  
      }
    });

    // AJAX ACTION
    $(document).on('click', "#modal-container .modal-action-button", async function() {
      let mode = $("#modal-container").attr('data-mode')
      let filename = $(this).attr('data-filename')

      console.log('--------'); console.log(mode); console.log(filename); console.log('--------');

      if (mode == 'load' && filename) {
        // LOAD
        const response = await clone.fetchData({ ajax: true, load: true, filename: filename }); // console.log(response)
        if (response?.data && response?.structure) {
          clone.mouseVariableReset()

          clone.graph.resetCordinates()
          clone.mapMemory = []
          $('.menu-back').removeClass('menu-back-isset').addClass('menu-back-empty')
          clone.map.data = response.data
          clone.map.structure = response.structure

          clone.refreshObjectList(); clone.fullRefreshCanvasGraphics();

          $("#modal-message").html('<div class="text-center text-success">successfully loaded!</div>')

          setTimeout(() => {
            $("#modal-close").click()
            $('#modal-input').val('')
            $("#modal-message").html('')
          }, 500);

        } else if (response?.error) {
          $("#modal-message").html(`<span class="text-center text-warning">${response?.error}</span>`)
        } else {
          $("#modal-message").html(`<span class="text-center text-danger">${response?.error}</span>`)
        }
      }

      // SAVE
      if (mode == 'save' && filename) { 
        let save = true;

        const responseIsset = await clone.fetchData({ ajax: true, issetfile: true, filename }); // console.log(responseIsset)
        if (responseIsset[0]) save = (confirm(`File is isset: ${filename} Are you seure ovverrite?`)) ? true : false;

        if (save) {
          let saveMapData = JSON.stringify(clone.map)

          const responseSave = await clone.fetchData({ ajax: true, save: true, filename, mapdata: saveMapData }); // console.log('response:'); console.log(responseSave);
          if (responseSave?.success) {
            $("#modal-message").html(`<div class="text-center text-success">${responseSave?.success}</div>`)
            setTimeout(() => {
              $("#modal-close").click()
              $('#modal-input').val('')
              $("#modal-message").html('')
            }, 1000);
          } else {
            $("#modal-message").html(`<span class="text-center text-danger">${responseSave?.error}</span>`)
          }
        }
      }

      // TEXTURES
      if (mode == 'textures' && filename) {
        let selectedDir = $("#modal-content .list-selected-file").length > 0 ? true : false;
        if (selectedDir) {
          // RENAME
          let addgetdirs = clone.makeDirStructure()
          let olddirname =  $(".modal-action-button").attr("data-original-filename")

          const checkFile = await clone.fetchData({ ajax: true, addgetdirs: addgetdirs, olddirname: olddirname, renamedirname: filename });  
          if (checkFile?.success) {
            $("#modal-input").val('')
            await clone.textureFunction('textures')
          } else {
            $("#modal-message").html(`<span class="text-center text-danger">${checkFile?.error}</span>`)
            setTimeout(() => { $("#modal-message").html('') }, 4000)
          }

        } else {
          // NEW DIR
          let addgetdirs = clone.makeDirStructure()

          const responseNewDir = await clone.fetchData({ ajax: true, addgetdirs: addgetdirs, newdirname: filename })  
          if (responseNewDir?.success) {
            $("#modal-input").val('')
            await clone.textureFunction(mode)
          } else {
            $("#modal-message").html(`<span class="text-center text-danger">${responseNewDir.error}</span>`)
            setTimeout(() => { $("#modal-message").html(''); }, 4000);
          }
        }
      }
    });

    // DELETE
    $(document).on('click', "#modal-container .modal-delete-button", async () => {

      let mode = $("#modal-container").attr('data-mode')

      if (mode == 'load' || mode == 'save') {
        // DELETE FILE
        let filename = $("#modal-container .modal-action-button").attr('data-filename')
        let trueDelete = false;

        const checkFile = await clone.fetchData({ ajax: true, issetfile: true, filename }); // console.log(checkFile)
        if (checkFile[0]) trueDelete = (confirm(`File is isset: ${filename} Are you seure delete?`)) ? true : false;

        if (trueDelete) {
          const responseDelete = await this.fetchData({ ajax: true, delete: true, filename }); console.log('response:'); console.log(responseDelete);
          if (responseDelete?.success) {
            let mode = $("#modal-container .modal-action-button").attr('data-mode')

            const response = await this.fetchData({ ajax: true, getfiles: true })
            if (response?.files) this.fileListElementsMake(mode, response.files, true)

            $("#modal-message").html(`<div class="text-center text-success">${responseDelete?.success}</div>`)

            $('#modal-input').val('');
            setTimeout(() => { $("#modal-message").html(''); }, 4000);
          } else {
            $('#modal-input').val('');
            $("#modal-message").html(`<span class="text-center text-danger">${responseDelete?.error}</span>`)
            setTimeout(() => { $("#modal-message").html(''); }, 4000);
          }
        }
      } else if (mode == 'textures') {        
        // DELETE DIR
        let deletedirname = $("#modal-container .modal-action-button").attr('data-filename')
        let trueDelete = (confirm(`Are you seure delete? ${deletedirname} Directiry`)) ? true : false;
        if (trueDelete) {
          let addgetdirs = clone.makeDirStructure()

          const checkFile = await clone.fetchData({ ajax: true, addgetdirs: addgetdirs, deletedirname: deletedirname });  
          if (checkFile) {
            $("#modal-input").val('')
            await clone.textureFunction('textures')
          }
        }
      }
    });

    $(document).on('input', "#modal-input", function() {
      let value = $(this).val()
      let actionButton = $("#modal-container .modal-action-button")

      if (value.length > 0) {
        actionButton.attr('data-filename', value).prop('disabled', false)
      } else {
        actionButton.attr('data-filename', null).prop('disabled', true)
      }
    });

    $("#modal-close").on('click', function(){
      $('#modal-input').val('')
    });

    // DOTS BUTTONS
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

    // GRID BUTTONS
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

    // 3D VIEW BUTTONS
    $(".3d-buttons").on('click', function() {
      let value = $(this).val()
      let name = $(this).attr('name')

      value = (value == 'false') ? true : false;
      $(this).val(value)
      clone.graph.options3D[name] = value

      if (value) $(this).text('ON'); else $(this).text('OFF');

      clone.fullRefreshCanvasGraphics()
    });

    // TOOLBAR BUTTONS
    this.refreshToolbar()

    $(".toolbar-icon").on('click', function() {
      let mode = $(this).attr('data-mode')
      clone.mouse.mode = mode

      if (mode=='point' && (clone.mouse.selectedTri == null || Object.keys(clone.mouse.selectedTri).length == 0)) {
        clone.mouse.mode = 'move'
        alert('Not selected triangle!')
      }

      clone.refreshToolbar()
    });

    // TRIANGLE NAME MODIFY
    $("#selected-mesh-name").on('input', function() {
      let selectedMesh = clone.map.data.find(mesh => mesh.id == clone.mouse.selectedMeshId)
      if (selectedMesh) {
        selectedMesh.name = $(this).val()

        $("#object-list").find(`[data-id='${selectedMesh.id}']`).text(selectedMesh.name)

        clone.refreshObjectList(); clone.fullRefreshCanvasGraphics();
      }
    })

    // TRIANGLE NAME MODIFY
    $("#selected-tri-name").on('input', function() {
      // console.log($(this).val())     
      clone.mouse.selectedTri.name = $(this).val()
      $("#object-list").find(`[data-id='${clone.mouse.selectedTri.id}']`).text(clone.mouse.selectedTri.name)
    })

    $("#text-ratio").on('input', function() {
      if ($(this).val() > 1 && $(this).val() < 101) clone.textureRatio = $(this).val();
      if ($(this).val() < 1) { $(this).val(1); this.textureRatio = 1 }
      if ($(this).val() > 100) { $(this).val(100); this.textureRatio = 100 }
      clone.resetMouseAddTri(); clone.resetMouseAddRec();
    });

    /////////////////////////////////////
    // CANVAS ViewWindow event listeners
    Object.entries(this.views).forEach(([name, value]) => {
      $(`#${name}`).on('mousemove', function (event) {
        const rect = this.getBoundingClientRect()
        let pos = clone.getMousePosition(clone, event, rect, name)

        $('#info-box').html(`X: ${pos.ix} y: ${pos.iy}<br>vX: ${pos.vx.toFixed(3)} vY:${pos.vy.toFixed(3)}`)
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
        else if (frequentInputValue > 20) frequentInputValue = 20;

        this.views[name].frequent = frequentInputValue

        this.selectedView = name
        this.fullRefreshCanvasGraphics()
      });

      ///////////////////////
      // canvas window click
      $(`#${name}`).on('mousedown', function (event) {
        if (clone.mouse.mode == 'move') $('body').addClass('cursor-move');

        clone.selectedView = name
        clone.mouse.isOk = name
        const rect = this.getBoundingClientRect()

        clone.mouse.startX = event.clientX - rect.left // Egér kezdő X
        clone.mouse.startY = event.clientY - rect.top // Egér kezdő Y
        clone.mouse.isMouseDown = true

        ///////////////////////
        // MOVE TRIANGLE POINT
        if (clone.mouse.selectedTri != null && clone.mouse.mode == 'point') {
          event.stopPropagation()
          clone.saveMapMemory('save')

          $('body').addClass('cursor-crosshair')

          let view = clone.views[name]

          const rect = this.getBoundingClientRect()
          let pos = clone.getMousePosition(clone, event, rect, name)

          let findedPoint = clone.mouse.selectedTri.p.find(point => point[view.vX] == pos.vx && point[view.vY] == pos.vy)
          if (findedPoint) clone.mouse.moveTriPoint = findedPoint;
        }

        ////////////////
        // ADD TRI MODE
        if (clone.mouse.addTri.mode) {
          const rect = this.getBoundingClientRect()
          let pos = clone.getMousePosition(clone, event, rect, name)

          clone.mouse.addTri.cords[clone.mouse.addTri.count][clone.views[name].vX] = pos.vx
          clone.mouse.addTri.cords[clone.mouse.addTri.count][clone.views[name].vY] = pos.vy

          // Count clicked cordinate points
          if (clone.mouse.addTri.count == 2) {
            if ((clone.mouse.addTri.cords[0][clone.views[name].vX] == clone.mouse.addTri.cords[1][clone.views[name].vX] && clone.mouse.addTri.cords[1][clone.views[name].vX] == clone.mouse.addTri.cords[2][clone.views[name].vX])
            || (clone.mouse.addTri.cords[0][clone.views[name].vY] == clone.mouse.addTri.cords[1][clone.views[name].vY] && clone.mouse.addTri.cords[1][clone.views[name].vY] == clone.mouse.addTri.cords[2][clone.views[name].vY])) {
              // Adding error
              clone.resetMouseAddTri()
              alert('Adding error!')
            } else {
              // Add triangle
              clone.saveMapMemory('save')

              let selectedMash = clone.map.data.find(data => data.id == clone.mouse.selectedMeshId)

              if (selectedMash) {
                let t1, t2, t3 = null
                if (clone.newTriSide) {
                  // console.log('t1'); console.log(clone.newTriSide)
                  t1 = new Vec2D(clone.mouse.addTri.texture1[0].u, clone.mouse.addTri.texture1[0].v)
                  t2 = new Vec2D(clone.mouse.addTri.texture1[1].u, clone.mouse.addTri.texture1[1].v)
                  t3 = new Vec2D(clone.mouse.addTri.texture1[2].u, clone.mouse.addTri.texture1[2].v)
                } else {
                  // console.log('t2'); console.log(clone.newTriSide)
                  t1 = new Vec2D(clone.mouse.addTri.texture2[0].u, clone.mouse.addTri.texture2[0].v)
                  t2 = new Vec2D(clone.mouse.addTri.texture2[1].u, clone.mouse.addTri.texture2[1].v)
                  t3 = new Vec2D(clone.mouse.addTri.texture2[2].u, clone.mouse.addTri.texture2[2].v)
                }

                clone.newTriSide = !clone.newTriSide

                let newTriangleName = 'Tri-New-' + Math.floor(Math.random()*99999)

                selectedMash.tris.unshift(
                  new Triangle(new Vec3D(clone.mouse.addTri.cords[0].x, clone.mouse.addTri.cords[0].y, clone.mouse.addTri.cords[0].z), new Vec3D(clone.mouse.addTri.cords[1].x, clone.mouse.addTri.cords[1].y, clone.mouse.addTri.cords[1].z), new Vec3D(clone.mouse.addTri.cords[2].x, clone.mouse.addTri.cords[2].y, clone.mouse.addTri.cords[2].z),
                  t1, t2, t3,
                  2, 1, [255, 200, 40, 1], false, newTriangleName)
                )
              }
            }
            clone.resetMouseAddTri()
            clone.refreshObjectList(); clone.fullRefreshCanvasGraphics();
          } else {
            clone.mouse.addTri.count++
          }
        }

        /////////////////////
        // ADD RECTANGLE MODE
        if (clone.mouse.addRec.mode) {
          const rect = this.getBoundingClientRect()
          let pos = clone.getMousePosition(clone, event, rect, name)

          clone.mouse.addRec.cords[clone.mouse.addRec.count][clone.views[name].vX] = pos.vx
          clone.mouse.addRec.cords[clone.mouse.addRec.count][clone.views[name].vY] = pos.vy

          // Count clicked cordinate points
          if (clone.mouse.addRec.count == 1) {
            if ((clone.mouse.addRec.cords[0][clone.views[name].vX] == clone.mouse.addRec.cords[1][clone.views[name].vX])
            || (clone.mouse.addRec.cords[0][clone.views[name].vY] == clone.mouse.addRec.cords[1][clone.views[name].vY])) {
              // Adding error
              clone.resetMouseAddRec()
              alert('Adding error!')
            } else {
              // Add rectangle
              clone.saveMapMemory('save')

              let selectedMash = clone.map.data.find(data => data.id == clone.mouse.selectedMeshId)

              if (selectedMash) {
                let p1 = clone.mouse.addRec.cords[0]; let p2 = clone.mouse.addRec.cords[1]
                let vX = clone.views[clone.selectedView].vX; let vY = clone.views[clone.selectedView].vY;

                // add triangle 1.
                let t1_0 = { x: 0, y: 0, z: 0 }; let t1_1 = { x: 0, y: 0, z: 0 }; let t1_2 = { x: 0, y: 0, z: 0 };
                t1_0[vX] = p1[vX]; t1_0[vY] = p2[vY]; t1_1[vX] = p2[vX]; t1_1[vY] = p2[vY]; t1_2[vX] = p2[vX]; t1_2[vY] = p1[vY];

                let ta1 = new Vec2D(clone.mouse.addRec.texture1[0].v, 1 - clone.mouse.addRec.texture1[0].u);
                let ta2 = new Vec2D(clone.mouse.addRec.texture1[1].v, 1 - clone.mouse.addRec.texture1[1].u);
                let ta3 = new Vec2D(clone.mouse.addRec.texture1[2].v, 1 - clone.mouse.addRec.texture1[2].u);
                
                let newTriangleName = 'Rec-New-A-' + Math.floor(Math.random()*99999)
                let newTri1 = new Triangle(new Vec3D(t1_0.x, t1_0.y, t1_0.z), new Vec3D(t1_1.x, t1_1.y, t1_1.z), new Vec3D(t1_2.x, t1_2.y, t1_2.z), ta1, ta2, ta3, 2, 1, [255, 200, 40, 1], false, newTriangleName)

                // add triangle 2.
                let t2_0 = { x: 0, y: 0, z: 0 }; let t2_1 = { x: 0, y: 0, z: 0 }; let t2_2 = { x: 0, y: 0, z: 0 };
                t2_0[vX] = p1[vX]; t2_0[vY] = p2[vY]; t2_1[vX] = p2[vX]; t2_1[vY] = p1[vY]; t2_2[vX] = p1[vX]; t2_2[vY] = p1[vY];

                let tb1 = new Vec2D(clone.mouse.addRec.texture2[0].v, 1 - clone.mouse.addRec.texture2[0].u);
                let tb2 = new Vec2D(clone.mouse.addRec.texture2[1].v, 1 - clone.mouse.addRec.texture2[1].u);
                let tb3 = new Vec2D(clone.mouse.addRec.texture2[2].v, 1 - clone.mouse.addRec.texture2[2].u);

                let newTriangleName2 = 'Rec-New-B-' + Math.floor(Math.random()*99999)
                
                let newTri2 = new Triangle(new Vec3D(t2_0.x, t2_0.y, t2_0.z), new Vec3D(t2_1.x, t2_1.y, t2_1.z), new Vec3D(t2_2.x, t2_2.y, t2_2.z), tb1, tb2, tb3, 2, 1, [255, 200, 40, 1], false, newTriangleName2)
                
                newTri1.locket = newTri2.id
                newTri2.locket = newTri1.id
                selectedMash.tris.unshift(newTri2)
                selectedMash.tris.unshift(newTri1)

                clone.mouse.selectedTri = clone.map.data.flatMap(obj => obj.tris).find(triangle => triangle.id == newTri1.id)
                clone.mouse.selectedLock = clone.map.data.flatMap(obj => obj.tris).find(triangle => triangle.id == newTri2.id)

                clone.resetMouseAddRec()
                clone.refreshObjectList(); clone.fullRefreshCanvasGraphics();

                setTimeout(() => {
                  $(`li.tri-list[data-id='${newTri1.id}']`).trigger('click');
                }, 100);
              }
            }
            clone.resetMouseAddRec()
            clone.refreshObjectList(); clone.fullRefreshCanvasGraphics();
          } else {
            clone.mouse.addRec.count++
            console.log('clone.mouse.addRec.count: ', clone.mouse.addRec.count)
          }
        }
      });

      $(`#${name}`).on('mouseup', function (event) {
        $('body').removeClass('cursor-crosshair')
        $('body').removeClass('cursor-move')

        // MOVE TRI POINT ENDING
        if (clone.mouse.selectedTri != null && clone.mouse.mode == 'point' && clone.mouse.moveTriPoint) {
          let view = clone.views[name]

          const rect = this.getBoundingClientRect()
          let pos = clone.getMousePosition(clone, event, rect, name)

          clone.mouse.moveTriPoint[view.vX] = pos.vx
          clone.mouse.moveTriPoint[view.vY] = pos.vy
          clone.fullRefreshCanvasGraphics()

          clone.mouse.moveTriPoint = null
        }

        // MOUSE MODE: MOVE
        if (clone.mouse.mode == 'move') {
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
        }
      });

      // reset views clicks
      $(`[class='reset-center-button'][data-name='${name}']`).on('click', function (event) {
        let name = $(this).attr('data-name')
        clone.views[name].posX = 0; clone.views[name].posY = 0;
        clone.fullRefreshCanvasGraphics()
      });
    });

    // Reset view-screen
    $(`[class='reset-center-button'][data-name='screen-canvas']`).on('click', function () {
      clone.graph.vCamera.x = 0; clone.graph.vCamera.y = 0; clone.graph.vCamera.z = 0;
      clone.graph.fYaw = 0; clone.graph.fXaw = 0;     

      clone.fullRefreshCanvasGraphics()
    });

    // Add new Triangle
    $(document).on('click', '#add-new-tri', () => {
      $('#add-new-tri').removeClass('green2')

      if (this.mouse.selectedMeshId) {
        //remove selected triangle
        this.mouse.selectedTri = null
        $('#object-list').find('.list-triangle-selected').removeClass('list-triangle-selected')
        $('#object-list').find('.list-triangle-locket').removeClass('list-triangle-locket')
        $('#selected-tri-container').hide()
        clone.fullRefreshCanvasGraphics()

        if (this.mouse.addTri.mode == false) {
          this.mouse.addTri.mode = true

          $('#add-new-tri').addClass('green2')
          this.resetMouseAddRec()
        } else {
          console.log('reseting add trialgle...')
          this.resetMouseAddTri()
        }
      } else alert('Not selected Mesh!')
    });

    // Add new Rectangle
    $(document).on('click', '#add-new-rec', () => {
      $('#add-new-rec').removeClass('green2')
      if (this.mouse.selectedMeshId) {
        //remove selected triangle
        this.mouse.selectedTri = null
        $('#object-list').find('.list-triangle-selected').removeClass('list-triangle-selected')
        $('#object-list').find('.list-triangle-locket').removeClass('list-triangle-locket')
        $('#selected-tri-container').hide()
        clone.fullRefreshCanvasGraphics()
        
        if (this.mouse.addRec.mode == false) {
          this.mouse.addRec.mode = true
          $('#add-new-rec').addClass('green2')
          this.resetMouseAddTri()
        } else {
          console.log('reset add rectangle....')
          this.mouse.addRec.mode = false
          this.resetMouseAddRec()
        }
      } else alert('Not selected Mesh!')
    });

    $(document).on('click', '.size-number-box', function () {
      let mode = $(this).attr('data-mode')
      let number = $(this).attr('data-number')
      $(`input[name='move-size'][data-mode='${mode}']`).val(number)
    });

    $(document).on('click', '#clipboard-button', () => {
      if (this.mouse.selectedMeshId) {
        let mapDataSelected = clone.map.data.find(element => element.id == this.mouse.selectedMeshId)
        let mapStructureSelected = clone.findMeshById(clone.map.structure, this.mouse.selectedMeshId)       

        if (Array.isArray(this.clipboardMemory.tris) && this.clipboardMemory.tris.length > 0) {
          this.clipboardMemory.tris.forEach(tri => {
            mapDataSelected.tris.push(tri)
          });
          this.clipboardMemory.tris = []
        }

        if (Array.isArray(this.clipboardMemory.meshs) && this.clipboardMemory.meshs.length > 0) {
          this.clipboardMemory.meshs.forEach(mesh => {
            // structure
            let newMesh = {id: mesh.id, child: []}
            mapStructureSelected.child.push(newMesh)
            // mapdata
            mesh.parent_id = mapDataSelected.id
            this.map.data.push(mesh)
          });
          this.clipboardMemory.meshs = []
        }

        clone.refreshObjectList()
        clone.fullRefreshCanvasGraphics()

      } else alert('Not selected Mesh!');
    });

    // Mouse wheel Zoom
    $(document).on('mousewheel', (event) => {
      if (this.selectedView) {
        let isHover = $("#container-screens").is(":hover");
        if (isHover) {
          if (this.selectedView == 'screen-canvas') {
            let vForward = new Vec3D()
            vForward = this.graph.vector_Mul(this.graph.vLookDir, this.options.moveScale)
            this.graph.vCamera = (event.originalEvent.wheelDelta > 0) ? this.graph.vector_Add(this.graph.vCamera, vForward) : this.graph.vector_Sub(this.graph.vCamera, vForward);
          } else {
            let mod = (event.originalEvent.wheelDelta > 0) ? 5 : -5;
            let element = $(`input[name='ratio'][data-name='${this.selectedView}']`)
            let modifyNum = parseInt(element.val()) + mod
            element.val(modifyNum)
            element.trigger('input')
          }
        }
        clone.fullRefreshCanvasGraphics()
      }
    });

    // MOVE MASH AND TRIANGLE
    $(".grid-item.arrow").on('click', function () {
      let mode = $(this).attr('data-mode')      
      if (clone.selectedView != null && clone.selectedView != 'screen-canvas') {
        
        if ((mode == 'mesh' && clone.mouse.selectedMeshId && !clone.mouse.selectedTri) ||
            (mode == 'rectangle' && clone.mouse.selectedTri?.id && clone.mouse.selectedLock?.id)) {

          clone.saveMapMemory('save')

          const type = $(this).attr("data-type")
          const moveSize = $(`input[name='move-size'][data-mode='${mode}']`).val()
          const angleSize = $(`input[name='angle-size'][data-mode='${mode}']`).val()
          const directionX = parseInt($(this).attr("data-direction-x"))
          const directionY = parseInt($(this).attr("data-direction-y"))
          const directionSign = parseInt($(this).attr("data-direction-sign"))
          
          let transformData = {
            type: type,
            movesize: moveSize,
            anglesize: angleSize,
            axisx: clone.views[clone.selectedView].vX,
            axisy: clone.views[clone.selectedView].vY,
            directionx: directionX,
            directiony: directionY,
            directionsign: directionSign,
          }
         
          if (mode == 'mesh') {
            let selectedMesh = clone.findMeshById(clone.map.structure, clone.mouse.selectedMeshId)
            if (selectedMesh) clone.recursiveTransform(mode, selectedMesh, transformData)
          }

          if (mode == 'rectangle') clone.recursiveTransform(mode, null, transformData);

        }
      } else alert('Not selected view window!');

      if (mode == 'rectangle') {
        //
      }
    });

    $("select[name='line-color']").on('input', function () {
      if(clone.mouse.selectedMeshId) {       
        let mapDataSelected = clone.map.data.find(element => element.id == clone.mouse.selectedMeshId)
        mapDataSelected.lineColor = $(this).val()
        clone.fullRefreshCanvasGraphics()
      }
    });

    ///////////////
    // HTML inputs
    let triangeInputs = [
      'tri-p1-X', 'tri-p1-Y', 'tri-p1-Z', 'tri-t1-U', 'tri-t1-V',
      'tri-p2-X', 'tri-p2-Y', 'tri-p2-Z', 'tri-t2-U', 'tri-t2-V',
      'tri-p3-X', 'tri-p3-Y', 'tri-p3-Z', 'tri-t3-U', 'tri-t3-V',
    ]

    triangeInputs.forEach(name => {
      $(`input[name='${name}']`).on('input', function () {
        let type = $(this).attr('data-type')
        let axis = $(this).attr('data-axis')
        let num = $(this).attr('data-num')
        //console.log(type, num, axis)

        if (typeof clone.mouse.selectedTri.id !== 'undefined') {
          clone.mouse.selectedTri[type][num][axis] = $(this).val()
          clone.fullRefreshCanvasGraphics()
        }
      });
    });

    $(`select[name='tri-texture']`).on('input', function () {
      if (typeof clone.mouse.selectedTri.id !== 'undefined') {
        clone.mouse.selectedTri.tid = $(this).val()
        clone.fullRefreshCanvasGraphics()
      }
    });

    $(`select[name='tri-normal']`).on('input', function () {
      if (typeof clone.mouse.selectedTri.id !== 'undefined') {
        clone.mouse.selectedTri.normal = $(this).val()
        clone.fullRefreshCanvasGraphics()
      }
    });

    $(`input[name='tri-light']`).on('input', function () {
      if (typeof clone.mouse.selectedTri.id !== 'undefined') {
        clone.mouse.selectedTri.light = $(this).val()
        clone.fullRefreshCanvasGraphics()
      }
    });

    // move triangle points
    $(`.tri-move-up`).on('click', () => {
      this.saveMapMemory('save')
      let save = this.mouse.selectedTri.p[1]
      this.mouse.selectedTri.p[1] = this.mouse.selectedTri.p[0]
      this.mouse.selectedTri.p[0] = save
      clone.refreshTriangleDatas()
    });

    $(`.tri-move-down`).on('click', () => {
      this.saveMapMemory('save')
      let save = this.mouse.selectedTri.p[1]
      this.mouse.selectedTri.p[1] = this.mouse.selectedTri.p[2]
      this.mouse.selectedTri.p[2] = save
      clone.refreshTriangleDatas()
    });

    $(`.tri-all-move`).on('click', () => {
      this.saveMapMemory('save')
      let save = this.mouse.selectedTri.p[0]
      this.mouse.selectedTri.p[0] = this.mouse.selectedTri.p[1]
      this.mouse.selectedTri.p[1] = this.mouse.selectedTri.p[2]
      this.mouse.selectedTri.p[2] = save
      clone.refreshTriangleDatas()
    });

    // move rectangle points
    $(`.rec-move-up`).on('click', () => {
      this.saveMapMemory('save')
      let save = this.mouse.selectedTri.p[1]
      this.mouse.selectedTri.p[1] = this.mouse.selectedTri.p[0]
      this.mouse.selectedTri.p[0] = save

      let save2 = this.mouse.selectedLock.p[1]
      this.mouse.selectedLock.p[1] = this.mouse.selectedLock.p[0]
      this.mouse.selectedLock.p[0] = save2
      clone.refreshRectangleDatas()
    });

    $(`.rec-move-down`).on('click', () => {
      this.saveMapMemory('save')
      let save = this.mouse.selectedTri.p[1]
      this.mouse.selectedTri.p[1] = this.mouse.selectedTri.p[2]
      this.mouse.selectedTri.p[2] = save

      let save2 = this.mouse.selectedLock.p[1]
      this.mouse.selectedLock.p[1] = this.mouse.selectedLock.p[2]
      this.mouse.selectedLock.p[2] = save2
      clone.refreshRectangleDatas()
    });

    $(`.rec-all-move`).on('click', () => {
      this.saveMapMemory('save')
      let save = this.mouse.selectedTri.p[0]
      this.mouse.selectedTri.p[0] = this.mouse.selectedTri.p[1]
      this.mouse.selectedTri.p[1] = this.mouse.selectedTri.p[2]
      this.mouse.selectedTri.p[2] = save

      let save2 = this.mouse.selectedLock.p[0]
      this.mouse.selectedLock.p[0] = this.mouse.selectedLock.p[1]
      this.mouse.selectedLock.p[1] = this.mouse.selectedLock.p[2]
      this.mouse.selectedLock.p[2] = save2
      clone.refreshRectangleDatas()
    });

    // LOCKET
    let locketInputs = [
      'lock-t1-U', 'lock-t1-V', 'lock-t2-U', 'lock-t2-V', 'lock-t3-U', 'lock-t3-V',
      'lock-light', 'lock-texture', 'lock-normal',
    ]

    locketInputs.forEach(name => {
      $(`input[name='${name}']`).on('input', function () {
        let type = $(this).attr('data-type')
        let axis = $(this).attr('data-axis')
        let num = $(this).attr('data-num')
        console.log(type, num, axis)

        console.log(clone.mouse.selectedTri)
        console.log(clone.mouse.selectedLock)

        if (typeof clone.mouse.selectedTri?.id && typeof clone.mouse.selectedLock?.id) {

          console.log('TRI')
          console.log(clone.mouse.selectedTri)

          console.log('LOCK')
          console.log(clone.mouse.selectedLock)

          let newValue = parseFloat($(this).val())

          clone.mouse.selectedTri[type][num][axis] = newValue

          if (true) {
            let r = clone.mouse.addRec.r || 1;
            // Az aktuálisan módosított érték frissítése
            clone.mouse.selectedTri[type][num][axis] = parseFloat($(this).val());
  
            // Szinkronizáljuk a lock háromszöget az alábbiak szerint:
            // Feltételezzük, hogy a háromszög csúcspontjai egy tömbben szerepelnek, pl. selectedTri[type] = [p0, p1, p2]
            let tri = clone.mouse.selectedTri[type];
            let lock = clone.mouse.selectedLock[type];
  
            // Frissítés: 
            // Lock háromszög 0. pontja: egyenlő a selectedTri 0. pontjával:
            lock[0].u = tri[0].u;
            lock[0].v = tri[0].v;
  
            // Lock háromszög 1. pontja: egyenlő a selectedTri 2. pontjával:
            lock[1].u = tri[2].u;
            lock[1].v = tri[2].v;
  
            // Lock háromszög 2. pontja: inverz a selectedTri 1. pontjából:
            lock[2].u = r - tri[1].u;
            lock[2].v = r - tri[1].v;
          }

          clone.fullRefreshCanvasGraphics()
        }
      });
    });

    $(`select[name='lock-texture']`).on('input', function () {
      if (typeof clone.mouse.selectedTri.id !== 'undefined' && typeof clone.mouse.selectedLock.id !== 'undefined') {
        clone.mouse.selectedTri.tid = $(this).val()
        clone.mouse.selectedLock.tid = $(this).val()
        clone.fullRefreshCanvasGraphics()
      }
    });

    $(`select[name='lock-normal']`).on('input', function () {
      if (typeof clone.mouse.selectedTri.id !== 'undefined' && typeof clone.mouse.selectedLock.id !== 'undefined') {
        clone.mouse.selectedTri.normal = $(this).val()
        clone.mouse.selectedLock.normal = $(this).val()
        clone.fullRefreshCanvasGraphics()
      }
    });

    $(`input[name='lock-light']`).on('input', function () {
      if (typeof clone.mouse.selectedTri.id !== 'undefined' && typeof clone.mouse.selectedLock.id !== 'undefined') {
        clone.mouse.selectedTri.light = $(this).val()
        clone.mouse.selectedLock.light = $(this).val()
        clone.fullRefreshCanvasGraphics()
      }
    });

    $(`input[id='selected-tri-name-1']`).on('input', function (event) {
      event.stopImmediatePropagation()      
      if (typeof clone.mouse.selectedTri.id !== 'undefined' && typeof clone.mouse.selectedLock.id !== 'undefined') {
        clone.mouse.selectedTri.name = $(this).val()
        let triangle = clone.map.data.flatMap(obj => obj.tris).find(triangle => triangle.id == clone.mouse.selectedTri.id)
        triangle.name = $(this).val()
        $(document).find("#object-list").find(`li[data-id='${clone.mouse.selectedTri.id}']`).html($(this).val())
      }
    });

    $(`input[id='selected-tri-name-2']`).on('input', function (event) {
      event.stopImmediatePropagation()
      console.log($(this).val())

      if (typeof clone.mouse.selectedLock.id !== 'undefined') {
        clone.mouse.selectedLock.name = $(this).val()
        
        let triangle = clone.map.data.flatMap(obj => obj.tris).find(triangle => triangle.id == clone.mouse.selectedLock.id)
        triangle.name = $(this).val()
        $(document).find("#object-list").find(`li[data-id='${clone.mouse.selectedLock.id}']`).html($(this).val())
      }
    });

    ////////////////////
    // Responsite menu
    // First load object list
    setTimeout(function() {
      $("#object-list").find(".menu-icon").each(function() {
          let id = Number($(this).closest('li').attr('data-id'))
          let thisMeshStructure = clone.findMeshById(clone.map.structure, id)
          if ($(this).hasClass('triangle-down')) {
            thisMeshStructure.status = 0
            $(this).closest(`ul`).find(`ul[data-parent-id='${id}']`).hide()
          } else if ($(this).hasClass('triangle-down')) {
            thisMeshStructure.status = 1
            $(this).closest(`ul`).find(`ul[data-parent-id='${id}']`).show()
          }
      });

      $("#object-list").show()
    }, 100);

    // PUSH CONTROLL
    if (true) {
      $(document).keydown(function (e) {
          if (e.ctrlKey) {
            clone.ctrlPressed = true
          }
      });
      $(document).keyup(function (e) {
          if (e.key == "Control") {
            clone.ctrlPressed = false
          }
      });

      $(document).click(".tri-list", function(e) {
        // IF PUSH CONTROLL
        if (clone.ctrlPressed == true) {
          clone.ctrlPressed = false
          if (clone.mouse.selectedTri && Object.keys(clone.mouse.selectedTri).length > 0 && clone.mouse.selectedMeshId) {
            if (clone.mouse.selectedTri?.locket) {
              alert(`If a sibling of the triangle is selected, it will not choose another! It have: ${clone.mouse.selectedTri.locket}`)
            } else {

              $(document).find(`li[data-id='${clone.mouse.selectedTri.id}']`).addClass('list-triangle-selected').append('<span class="menu-icon menu-icon-pos-2 clipboard"></span><span class="menu-icon menu-icon-pos-1 delete"></span>')

              let brotherTriId = $(e.target).attr('data-id')
              let parentMeshData = clone.map.data.find(mesh => mesh.id == clone.mouse.selectedMeshId)
              let findBrother = parentMeshData.tris.find(list => list.id == brotherTriId && list.id != clone.mouse.selectedTri.id)
  
              if (findBrother) {
                if (!findBrother?.locket) {
                  // save brother locket id-s
                  clone.mouse.selectedTri.locket = findBrother.id
                  findBrother.locket = clone.mouse.selectedTri.id
  
                  clone.mouse.selectedLock = findBrother
  
                  $(document).find(`li[data-id='${clone.mouse.selectedTri.locket}']`).addClass('list-triangle-locket').append('<span class="menu-icon menu-icon-pos-1 delete-locket"></span>')
  
                  clone.refreshLocketDatas(clone.mouse.selectedTri, findBrother)
  
                  $("#selected-tri-container").hide(); $("#selected-mesh-container").hide();
                  $("#selected-locket-container").show();

                  clone.fullRefreshCanvasGraphics()
  
                } else alert(`The selected triangle already has another sibling assigned to it. ${findBrother.locket}`);
              } else alert(`You can only choose a sibling of the triangle!`);
            }
          } else alert('Not selected triangle!');
        }
      });
    }

    // DELETE LOCKETS
    $(document).on('click', '.delete-locket', function(e) {
      let triId = $(e.target).closest('li').attr('data-id')
      clone.deleteLocketBrothers(triId)
    });

    // ADD NEW ROOT OBJECT
    $(document).on('click', '#object-add-new', function() {
      let addNewMesh = new Mesh('New Group', null)
      clone.map.data.push(addNewMesh)
      clone.map.structure.push({id: addNewMesh.id, visible: true, child: []})
      clone.refreshObjectList()
    });

    // OPEN / CLOSE ALL OBJECT LIST
    $(document).on('click', '#object-open-close-all', function() {
      let status = $(this).attr('data-status')
      status = Number(status)     

      $("#object-list").removeAttr("style")

      $("#object-list").find(".menu-icon").each(function() {
          let id = Number($(this).closest('li').attr('data-id'))
          if (id) {
            let thisMeshStructure = clone.findMeshById(clone.map.structure, id)
            $(this).removeClass('triangle-up').removeClass('triangle-down')
            if (status) {                
              thisMeshStructure.status = 0                
              $(this).closest(`ul`).find(`ul[data-parent-id='${id}']`).hide(40)
              $(this).addClass('triangle-down')
            } else {
              thisMeshStructure.status = 1
              $(this).closest(`ul`).find(`ul[data-parent-id='${id}']`).show(40)
              $(this).addClass('triangle-up')
            }
          }
      });

      $("#object-open-close-all").removeClass("triangle-up triangle-down")
      status == 1 ? $("#object-open-close-all").addClass("triangle-down") : $("#object-open-close-all").addClass("triangle-up")

      status = status == 1 ? 0 : 1;
      $(this).attr('data-status', status)
    });

    // RESIZE OBJECT LIST
    if (true) {
      $(document).on('mousedown', '#object-list-size-button', function (e) {
        clone.isResizing = true;
        clone.startY = e.clientY;
        clone.startHeight = $('#object-list').height();
        e.preventDefault();
      });
      $(document).on('mousemove', function (e) {
          if (clone.isResizing) {
              let diffY = e.clientY - clone.startY
              let newHeight = clone.startHeight + diffY
              
              if (newHeight < 51) newHeight = 50
              if (newHeight > 600) newHeight = 600
              
              $('#object-list').height(newHeight);
          }
      });
      $(document).on('mouseup', function () {
          clone.isResizing = false;
      });
    }

    // OPEN / CLOSE TRIANGLES
    $(document).on('click', ".triangle", function(event) {
      event.stopPropagation()
        let id = Number($(this).closest('li').attr('data-id'))        
        if (id) {
          let thisMeshStructure = clone.findMeshById(clone.map.structure, id)
          if (thisMeshStructure.status) {
            thisMeshStructure.status = 0
            $(this).removeClass('triangle-up').addClass('triangle-down')
            $(this).closest(`ul`).find(`ul[data-parent-id='${id}']`).hide(100)
          } else {
            $(this).removeClass('triangle-down').addClass('triangle-up')
            $(this).closest(`ul`).find(`ul[data-parent-id='${id}']`).show(100)
            thisMeshStructure.status = 1
          }
        }
    });

    // VISIBLE
    $(document).on('click', ".eye", function(event) {
      event.stopPropagation()
        let id = Number($(this).closest('li').attr('data-id'))        
        if (id) {
          let thisMeshStructure = clone.findMeshById(clone.map.structure, id)
          if (thisMeshStructure.visible) {
            thisMeshStructure.visible = 0
            $(this).removeClass('eye-up').addClass('eye-down')
          } else {
            $(this).removeClass('eye-down').addClass('eye-up')
            thisMeshStructure.visible = 1
          }
          clone.fullRefreshCanvasGraphics()
        } 
    });

    // MESH SELECTING
    $(document).on('click', ".mesh-name", function(event) {
        event.stopPropagation()
        clone.mouse.selectedTri = null
        clone.mouse.selectedLock = null
        let id = $(this).attr('data-id')
        clone.selectedMeshClassChange(id)
    });

    // TRIANGLE SELECTING
    $(document).on('click', ".tri-list", function() {
      // NOT PUSH CONTROLL
      clone.refreshObjectList()
      if (!clone.ctrlPressed) {   // not use controll
        // all locket class remove
        $("#object-list").find('*').removeClass('list-triangle-locket')
        $("#object-list").find('span.delete-locket').remove()
  
        let triId = $(this).attr('data-id')
  
        let findedTri = null
        // SEARCH TRI
        findedTri = clone.map.data.flatMap(obj => obj.tris).find(triangle => triangle.id == triId)
  
        if (findedTri) {
          clone.mouse.selectedTri = findedTri
          // remove selected class graph
          if (clone.mouse.selectedTri && clone.mouse.selectedTri.id) {
            $(document).find(`li[data-id='${clone.mouse.selectedTri.id}']`).removeClass('list-triangle-selected').find('.delete').remove();
            $(document).find(`li[data-id='${clone.mouse.selectedTri.id}']`).removeClass('list-triangle-locket').find('.delete').remove();
            $(document).find(`li[data-id='${clone.mouse.selectedTri.id}']`).find('.clipboard').remove();
          }
          // modify selected parent Mash graph
          $(document).find(`li[data-id='${clone.mouse.selectedMeshId}'].mesh-name`).removeClass('list-mesh-selected')
          clone.mouse.selectedMeshId = $(this).closest('ul').attr('data-parent-id')
          $(document).find(`li[data-id='${clone.mouse.selectedMeshId}'].mesh-name`).addClass('list-mesh-selected')
  
          // add new selectedTri
          clone.mouse.selectedTri = findedTri
          $("#selected-tri-name").val(clone.mouse.selectedTri.name)
          $("#selected-tri-name").attr('data-id', clone.mouse.selectedTri.id)
          $("#selected-mesh-container").hide()

          // if isset Locket Brother
          if (clone.mouse.selectedTri?.locket) {
            clone.mouse.selectedLock = clone.map.data.flatMap(obj => obj.tris).find(triangle => triangle.id == clone.mouse.selectedTri.locket)

            $(document).find(`li[data-id='${clone.mouse.selectedTri.locket}']`).addClass('list-triangle-locket').append('<span class="menu-icon menu-icon-pos-1 delete-locket"></span>')

            clone.refreshLocketDatas(clone.mouse.selectedTri, clone.mouse.selectedLock)

            $("#selected-tri-container").hide(); $("#selected-locket-container").show();
          } else {
            $("#selected-locket-container").hide(); $("#selected-tri-container").show();
          }

          // add selected triangle graph
          $(document).find(`li[data-id='${triId}']`).addClass('list-triangle-selected').append('<span class="menu-icon menu-icon-pos-2 clipboard"></span><span class="menu-icon menu-icon-pos-1 delete"></span>')
  
          
          clone.refreshTriangleDatas()
          clone.fullRefreshCanvasGraphics()
        }
      }
    });

    // TRIANGLE DELETE
    $(document).on('click', ".delete", function(event) {
      event.stopPropagation()
      clone.saveMapMemory('save')

      let triId = $(this).closest('.list-triangle-selected').attr('data-id')

      let result = confirm(`Are you sure you want to delete the triangle with id ${triId}?`)
      if (result) {
        // FIND TRI MESH
        let selectedObject = clone.map.data.find(obj => obj.tris.some(triangle => triangle.id == triId));
        if (selectedObject) {
          // FIND TRI
          let selectedTri = clone.map.data.flatMap(obj => obj.tris).find(triangle => triangle.id == triId)
          // CHECK LOCKET BROTHER
          if (selectedTri?.locket) {
            let selectedTriLocket = clone.map.data.flatMap(obj => obj.tris).find(triangle => triangle.id == selectedTri.locket)
            if (selectedTriLocket) delete selectedTriLocket.locket
          }
          // felülírjuk hogy ne legyen benne a megtalált háromszög
          selectedObject.tris = selectedObject.tris.filter(triangle => triangle.id != triId);
        }
        clone.mouse.selectedTri = null
  
        clone.refreshObjectList()
        clone.fullRefreshCanvasGraphics()
      }

    });

    // Clipboard 
    $(document).on('click', ".clipboard", function(event) {
      event.stopPropagation()
      clone.saveMapMemory('save')

      let triId = $(this).closest('.list-triangle-selected').attr('data-id')

      let selectedObject = clone.map.data.find(obj => obj.tris.some(triangle => triangle.id == triId));
      if (selectedObject) {
        clone.deleteLocketBrothers(triId) // delete locket brother
        clone.clipboardMemory.tris.push(selectedObject.tris.filter(triangle => triangle.id == triId)[0]) // copy clipboard
        selectedObject.tris = selectedObject.tris.filter(triangle => triangle.id != triId) // delete triangle
      }
      clone.mouse.selectedTri = null

      clone.refreshObjectList()
      clone.fullRefreshCanvasGraphics()
    });

    // Duplicate
    $(document).on('click', ".duplicate", function(event) {
      event.stopPropagation()
      clone.saveMapMemory('save')

      let meshId = $(this).closest('.mesh-name').attr('data-id')

      let selectedMeshStructure = clone.findMeshById(clone.map.structure, meshId)
      let selectedMeshData = clone.map.data.find(mesh => mesh.id == meshId)

      if (selectedMeshStructure && selectedMeshData) {
        // ACTION
        let duplicatedFunction = function(dupicatedStructure, parent_id, mapData) {
          let newMesh = new Mesh('', parent_id)
          newMesh.name = 'duplicated-' + newMesh.id;
          newMesh.lineColor = 'orange'
          newMesh.tris = []

          let addNum = $("input[name='move-size'][data-mode='mesh']").val() ? parseFloat($("input[name='move-size'][data-mode='mesh']").val()) : 0.5;
          let getDatas = mapData.find(mesh => mesh.id == dupicatedStructure.id)

          getDatas.tris.forEach(tri => {
            let cloneTri = clone.deepCopy(tri)

            newMesh.tris.push(new Triangle(
              new Vec3D(cloneTri.p[0].x + addNum, cloneTri.p[0].y + addNum, cloneTri.p[0].z + addNum),
              new Vec3D(cloneTri.p[1].x + addNum, cloneTri.p[1].y + addNum, cloneTri.p[1].z + addNum),
              new Vec3D(cloneTri.p[2].x + addNum, cloneTri.p[2].y + addNum, cloneTri.p[2].z + addNum),
              cloneTri.t[0], cloneTri.t[1], cloneTri.t[2],
              cloneTri.tid, cloneTri.light, cloneTri.rgba, cloneTri.normal, null))
          });

          mapData.push(newMesh)
          dupicatedStructure.id = newMesh.id

          if (Array.isArray(dupicatedStructure.child)) {
            dupicatedStructure.child.forEach(child => duplicatedFunction(child, newMesh.id, mapData));
          }

          return dupicatedStructure;
        }
        // start
        let dupicatedStructure = clone.deepCopy(selectedMeshStructure)
        dupicatedStructure = duplicatedFunction(dupicatedStructure, selectedMeshData.parent_id, clone.map.data)

        let parent = clone.findMeshParent(clone.map.structure, meshId)
        // push use have children or not have
        parent ? parent.child.push(dupicatedStructure) : clone.map.structure.push(dupicatedStructure);
      }

      clone.mouse.selectedTri = null

      clone.refreshObjectList()
      clone.fullRefreshCanvasGraphics()
    });

    // ADD MESH CHILD
    $(document).on('click', ".menu-icon.plus", function(event) {
      event.stopPropagation()
      clone.saveMapMemory('save')

      let meshId = $(this).closest('li').attr('data-id')
      clone.mouse.selectedTri = null; clone.mouse.selectedMeshId = meshId;

      let parentMeshData = clone.map.data.find(element => element.id == meshId)

      if (parentMeshData) {
        let addNewMesh = new Mesh('new', parentMeshData.id)
        addNewMesh.name = `${parentMeshData.name}-${addNewMesh.id}`
        clone.map.data.push(addNewMesh)

        let parentMeshStructure = clone.findMeshById(clone.map.structure, meshId)

        if (parentMeshStructure) parentMeshStructure.child.push({id: addNewMesh.id, child: []})
        clone.mouse.selectedMeshId = addNewMesh.id

      } else console.error("Mesh not found");

      clone.refreshObjectList()
      clone.fullRefreshCanvasGraphics()
    });

    // MOVE DATA BROTHER PREV / NEXT
    $(document).on('click', ".menu-icon.up, .menu-icon.down", function(event) {
      event.stopPropagation()
      clone.saveMapMemory('save')

      let type = $(this).attr('data-type')            
      let meshId = $(this).closest('li').attr('data-id')

      clone.mouse.selectedTri = null; clone.mouse.selectedMeshId = meshId;

      let structureAllBrothersIds = clone.findMeshBrothers(clone.map.structure, meshId)

      let firstId = meshId
      let secondId = clone.getMapNextOrPrevId(firstId, structureAllBrothersIds, type)

      if (meshId && firstId && secondId) {  
        // MAP.DATA CHANGE
        let mapDataFirst = clone.map.data.find(element => element.id == firstId); let mapDataFirstCopy = { ...mapDataFirst };
        let mapDataSecond = clone.map.data.find(element => element.id == secondId); let mapDataSecondCopy = { ...mapDataSecond };
        [mapDataFirst, mapDataSecond] = [mapDataSecondCopy, mapDataFirstCopy]

        // MAP.STRUCTURE CHANGE
        let parent = clone.findMeshParent(clone.map.structure, firstId); 
        if (!parent) parent = { child: clone.map.structure }; // Ha a szülő maga a root structure

        let indexFirst = parent.child.findIndex(el => el.id == firstId);
        let indexSecond = parent.child.findIndex(el => el.id == secondId);

        if (indexFirst !== -1 && indexSecond !== -1)
          [parent.child[indexFirst], parent.child[indexSecond]] = [parent.child[indexSecond], parent.child[indexFirst]]
        
        clone.refreshObjectList()
        clone.fullRefreshCanvasGraphics()
      }
    });

    // MOVE DATA BACK PARENT
    $(document).on('click', ".menu-icon.back", function(event) {
      event.stopPropagation()
      clone.saveMapMemory('save')

      let meshId = $(this).closest('li').attr('data-id')

      clone.mouse.selectedTri = null; clone.mouse.selectedMeshId = meshId;

      // MOVED DATA
      let mapDataSelected = clone.map.data.find(element => element.id == meshId)
      let mapStructureSelected = clone.findMeshById(clone.map.structure, meshId)

      if (mapDataSelected.parent_id != null) {
        let mapStructureParent = clone.findMeshById(clone.map.structure, mapDataSelected.parent_id)
        let mapDataParent = clone.map.data.find(element => element.id == mapStructureParent.id)
        if (mapDataParent.parent_id != null) {
          // PARENT + PARENT
          let mapStructureParentParent = clone.findMeshById(clone.map.structure, mapDataParent.parent_id)

          let mapStructureSelectedCopy = {...mapStructureSelected}
          mapDataSelected.parent_id = mapStructureParentParent.id
          mapStructureParentParent.child.push(mapStructureSelectedCopy)

          const index = mapStructureParent.child.findIndex(element => element.id == meshId)
          if (index !== -1) mapStructureParent.child.splice(index, 1);

          clone.refreshObjectList()
          clone.fullRefreshCanvasGraphics()
        } else {
          // PARENT + NULL
          let mapStructureParentNull = clone.findMeshById(clone.map.structure, mapDataParent.id)

          let mapStructureSelectedCopy = {...mapStructureSelected}
          mapDataSelected.parent_id = null
          clone.map.structure.push(mapStructureSelectedCopy)

          const index = mapStructureParentNull.child.findIndex(element => element.id == meshId)
          if (index !== -1) mapStructureParentNull.child.splice(index, 1);

          clone.refreshObjectList()
          clone.fullRefreshCanvasGraphics()
        }
      }
    });

    $(document).on('click', ".menu-icon.back-blend-in", function(event) {
      event.stopPropagation()
      clone.saveMapMemory('save')

      let meshId = $(this).closest('li').attr('data-id')

      clone.mouse.selectedTri = null; clone.mouse.selectedMeshId = meshId;

      // MOVED MESH DATA
      let mapDataSelected = clone.map.data.find(element => element.id == meshId)
      let mapStructureSelected = clone.findMeshById(clone.map.structure, meshId)

      if (mapStructureSelected.child.length == 0) {
        if (mapDataSelected.parent_id != null) {
          let mapStructureParent = clone.findMeshById(clone.map.structure, mapDataSelected.parent_id)
          
          let mapDataParent = clone.map.data.find(element => element.id == mapStructureParent.id)
          // copy triangles
          for (const [key, value] of Object.entries(mapDataSelected.tris)) mapDataParent.tris.push(value);
          // delete structure
          const indexS = mapStructureParent.child.findIndex(element => element.id == meshId)
          if (indexS !== -1) mapStructureParent.child.splice(indexS, 1);
          // delete data
          let index = clone.map.data.findIndex(element => element.id == meshId)
          if (index !== -1) clone.map.data.splice(index, 1);
          // change selected mesh
          clone.mouse.selectedMeshId = mapDataSelected.parent_id;       
  
          clone.refreshObjectList()
          clone.fullRefreshCanvasGraphics()
        }
      } else {
        alert('As long as the group has children, it cannot be merged with the parent element!')
      }
    });

    // DELETE MESH
    $(document).on('click', ".menu-icon.delete-group", function(event) {
      let result = confirm(`Are you sure you want to delete Group?`)
      if (result) {
        event.stopPropagation()
        clone.saveMapMemory('save')
        
        let meshId = $(this).closest('li').attr('data-id')
  
        clone.mouse.selectedTri = null; clone.mouse.selectedMeshId = null;
  
        let getMeshStructure = clone.findMeshById(clone.map.structure, meshId)

        console.log(getMeshStructure)

        // find mesh all tree ids
        let deletedIds = clone.getAllMeshTreeIds(getMeshStructure)
        console.log('deletedIds:')
        console.log(deletedIds)
        if (deletedIds) {
          deletedIds.forEach(meshId => {
            // delete structure
            clone.deleteMeshParent(clone.map.structure, meshId)
            // delete data
            let index = clone.map.data.findIndex(element => element.id == meshId)
            if (index != -1) clone.map.data.splice(index, 1);
          });
        }

        clone.refreshObjectList()
        clone.fullRefreshCanvasGraphics()
      }
    });

    // CLIPBOARD MESH
    $(document).on('click', ".menu-icon.clipboard", function(event) {
      event.stopPropagation()
      clone.saveMapMemory('save')
      
      let meshId = $(this).closest('li').attr('data-id')

      clone.mouse.selectedTri = null; clone.mouse.selectedMeshId = null;

      //--

      let getMeshStructure = clone.findMeshById(clone.map.structure, meshId)

      // find mesh all tree ids
      let clipIds = clone.getAllMeshTreeIds(getMeshStructure)
      console.log('clipIds:')
      console.log(clipIds)
      if (clipIds) {
        clipIds.forEach(meshId => {
          // copy clipboard memory
          console.log(meshId)
          console.log(typeof meshId)
          
          let mapdataRow = clone.map.data.find(mesh => mesh.id == meshId)
          
          clone.clipboardMemory.meshs.push(mapdataRow)
          // delete structure
          clone.deleteMeshParent(clone.map.structure, meshId)
          // delete data
          let index = clone.map.data.findIndex(element => element.id == meshId)
          if (index != -1) clone.map.data.splice(index, 1);
        });
        console.log(clone.clipboardMemory.meshs)
      }

      //--

      // // delete structure
      // clone.deleteMeshParent(clone.map.structure, meshId)
      // // delete data
      // let index = clone.map.data.findIndex(element => element.id == meshId)
      // if (index != -1) {

      //   clone.clipboardMemory.meshs.push(clone.map.data[index])
      //   clone.map.data.splice(index, 1)
      //   console.log(clone.clipboardMemory.meshs)
        
      // }
      
      clone.refreshObjectList()
      clone.fullRefreshCanvasGraphics()
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
        this.moveViewInputs();
        setTimeout(() => {
          this.refreshScreen();
        }, this.refTime);
      }
      // ALLOWED BUTTONS
      if (event.code == 'Enter') {
        const activeElement = document.activeElement
        if (activeElement.tagName == 'INPUT' || activeElement.tagName == 'TEXTAREA') {
          activeElement.blur(); event.preventDefault();
        }
        return;
      }

      if (event.code == 'F12') return;
      if (event.ctrlKey && event.shiftKey && event.code == 'KeyC') return;
      if (event.shiftKey && event.code == 'F5') return;
      if (event.code.startsWith('Digit') || event.code.startsWith('Key') || event.code.startsWith('Arrow')) return;
      if (event.code == 'Backspace' || event.code == 'Period' || event.code == 'Minus' || event.code == 'NumpadSubtract' || event.code == 'Digit0' || event.code == 'Backquote' || event.code == 'Numpad0' || event.code == 'Delete' || event.code == 'Home' || event.code == 'End' || event.code == 'Tab') return;

      if (['F1', 'F2', 'F3', 'F4'].includes(event.code)) {
        switch (event.code) {
          case 'F1': $("button[name='screen-canvas']").trigger('click'); break;
          case 'F2': $("button[name='XYview-canvas']").trigger('click'); break;
          case 'F3': $("button[name='XZview-canvas']").trigger('click'); break;
          case 'F4': $("button[name='ZYview-canvas']").trigger('click'); break;
        }
        event.preventDefault(); // DISABLED
        return;
      }
     
      event.preventDefault()  // DISABLED
    });
    document.addEventListener('keyup', (event) => {
      this.keys[event.code] = false
    })

    // MOUSE INIT
    this.lookMouseApi()
  }

  // DELETE LOCKET BROTHER
  deleteLocketBrothers(triId) {
    let selectedObject = this.map.data.find(obj => obj.tris.some(triangle => triangle.id == triId));
    let selectedTriangle = selectedObject ? selectedObject.tris.find(triangle => triangle.id == triId) : null;
    if (selectedTriangle) {
      let locketId = (selectedTriangle?.locket) ? selectedTriangle.locket : false;
      if (locketId) {
        let locketTriangle = selectedObject.tris.find(triangle => triangle.id == locketId)

        delete selectedTriangle.locket
        delete locketTriangle.locket

        if (this.mouse?.selectedLock) this.mouse.selectedLock = null;
      }
    }
  }

  // TRANSFORM MESH
  recursiveTransform(mode, mesh, transformData) {
    let modifyData = { x: 0, y: 0, z: 0 }
    let transform = false

    // MOVE
    if (transformData.type == 'move') {
      modifyData[transformData.axisx] = transformData.directionx * transformData.movesize
      modifyData[transformData.axisy] = transformData.directiony * transformData.movesize

      transform = this.graph.matrix_MakeTranslation(modifyData.x, modifyData.y, modifyData.z)
    }
    // ROTATE
    if (transformData.type == 'rotate') {
      let value = transformData.directionsign * this.graph.angleToRandian(transformData.anglesize)

      if (this.selectedView == 'XYview-canvas') transform = this.graph.matrix_MakeRotationX(value)
      if (this.selectedView == 'XZview-canvas') transform = this.graph.matrix_MakeRotationY(value)
      if (this.selectedView == 'ZYview-canvas') transform = this.graph.matrix_MakeRotationZ(value)
    }
    // SIZE
    if (transformData.type == 'size') {
      transform = this.graph.matrix_MakeScale(transformData.movesize)
    }

    // TRANSFORM
    if (transform) {
      // console.log(transform)

      // MESH
      if (mode == 'mesh') {
        let meshData = this.map.data.find(mapMesh => mapMesh.id == mesh.id)
        if (Array.isArray(meshData.tris) && meshData.tris.length > 0) {
          meshData.tris.forEach(tri => {
            tri.p[0] = this.graph.matrix_MultiplyVector(transform, tri.p[0])
            tri.p[1] = this.graph.matrix_MultiplyVector(transform, tri.p[1])
            tri.p[2] = this.graph.matrix_MultiplyVector(transform, tri.p[2])
          });
        }
  
        if (Array.isArray(mesh.child) && mesh.child.length > 0) {
          mesh.child.forEach(child => {
            this.recursiveTransform(mode, child, transformData)
          });
        }
      }

      // RECTANGLE
      if (mode == 'rectangle') {
        this.mouse.selectedTri.p[0] = this.graph.matrix_MultiplyVector(transform, this.mouse.selectedTri.p[0])
        this.mouse.selectedTri.p[1] = this.graph.matrix_MultiplyVector(transform, this.mouse.selectedTri.p[1])
        this.mouse.selectedTri.p[2] = this.graph.matrix_MultiplyVector(transform, this.mouse.selectedTri.p[2])

        this.mouse.selectedLock.p[0] = this.graph.matrix_MultiplyVector(transform, this.mouse.selectedLock.p[0])
        this.mouse.selectedLock.p[1] = this.graph.matrix_MultiplyVector(transform, this.mouse.selectedLock.p[1])
        this.mouse.selectedLock.p[2] = this.graph.matrix_MultiplyVector(transform, this.mouse.selectedLock.p[2])
      }
    }
  }

  // TRIANGLE INPUTS
  refreshTriangleDatas() {
    $("input[name='tri-p1-X']").val(this.mouse.selectedTri.p[0].x); $("input[name='tri-p1-Y']").val(this.mouse.selectedTri.p[0].y)
    $("input[name='tri-p1-Z']").val(this.mouse.selectedTri.p[0].z); $("input[name='tri-t1-U']").val(this.mouse.selectedTri.t[0].u)
    $("input[name='tri-t1-V']").val(this.mouse.selectedTri.t[0].v)

    $("input[name='tri-p2-X']").val(this.mouse.selectedTri.p[1].x); $("input[name='tri-p2-Y']").val(this.mouse.selectedTri.p[1].y)
    $("input[name='tri-p2-Z']").val(this.mouse.selectedTri.p[1].z); $("input[name='tri-t2-U']").val(this.mouse.selectedTri.t[1].u)
    $("input[name='tri-t2-V']").val(this.mouse.selectedTri.t[1].v);

    $("input[name='tri-p3-X']").val(this.mouse.selectedTri.p[2].x); $("input[name='tri-p3-Y']").val(this.mouse.selectedTri.p[2].y)
    $("input[name='tri-p3-Z']").val(this.mouse.selectedTri.p[2].z); $("input[name='tri-t3-U']").val(this.mouse.selectedTri.t[2].u)
    $("input[name='tri-t3-V']").val(this.mouse.selectedTri.t[2].v);

    $("select[name='tri-light']").val(this.mouse.selectedTri.light)
    $("select[name='tri-texture']").val(this.mouse.selectedTri.tid)
    $("select[name='tri-normal']").val(this.mouse.selectedTri.normal)
  }

  // RECTANGLE INPUTS
  refreshRectangleDatas() {
    $("input[name='rec-t1-U']").val(this.mouse.selectedTri.t[0].u)
    $("input[name='rec-t1-V']").val(this.mouse.selectedTri.t[0].v)
    $("input[name='rec-t2-U']").val(this.mouse.selectedTri.t[1].u)
    $("input[name='rec-t2-V']").val(this.mouse.selectedTri.t[1].v)
    $("input[name='rec-t3-U']").val(this.mouse.selectedTri.t[2].u)
    $("input[name='rec-t3-V']").val(this.mouse.selectedTri.t[2].v)

    // ???
    // $("select[name='tri-light']").val(this.mouse.selectedTri.light)
    // $("select[name='tri-texture']").val(this.mouse.selectedTri.tid)
    // $("select[name='tri-normal']").val(this.mouse.selectedTri.normal)
  }

  // REVRITE LOCKET TRIANGLES
  refreshLocketDatas(tri1, tri2) {
    let tri1Data = this.map.data.flatMap(obj => obj.tris).find(triangle => triangle.id == tri1.id)
    let tri2Data = this.map.data.flatMap(obj => obj.tris).find(triangle => triangle.id == tri2.id)

    $(`input[id='selected-tri-name-1']`).val(tri1Data.name)
    $(`input[id='selected-tri-name-2']`).val(tri2Data.name)

    if (false) {
      tri2.tid = tri1.tid
      tri2.t[0] = { u: 0, v: 1, w: 1 };  // (0,0) → megegyezik tri1-gyel
      tri2.t[1] = { u: 1, v: 0, w: 1 };  // (1,1) → megegyezik tri1-gyel
      tri2.t[2] = { u: 1, v: 1, w: 1 };  // (1,0) → új érték
    }

    $("input[name='lock-t1-U']").val(tri1.t[0].u); $("input[name='lock-t1-V']").val(tri1.t[0].v);
    $("input[name='lock-t2-U']").val(tri1.t[1].u); $("input[name='lock-t2-V']").val(tri1.t[1].v);
    $("input[name='lock-t3-U']").val(tri1.t[2].u); $("input[name='lock-t3-V']").val(tri1.t[2].v);
  }

  // JQUERY MASH 
  selectedMeshClassChange(mashId) {
    let selectedMesh = this.map.data.find(mesh => mesh.id == mashId)
    if (selectedMesh) {
      this.mouse.selectedMeshId = selectedMesh.id
      // line color setting
      $(`select[name='line-color'] option[value='${selectedMesh.lineColor}']`).prop('selected', true)
      // discard selected triange
      $('#object-list').find('.delete').remove()
      $('#object-list').find('.mesh-name').removeClass('child-style') // mesh child seledted class remove
      $("#object-list").find('.list-triangle-selected').removeClass('list-triangle-selected')
      $("#object-list").find('.list-triangle-locket').removeClass('list-triangle-locket')
      $("#object-list").find('.list-mesh-selected').removeClass('list-mesh-selected')
      $("#selected-tri-container").hide()
      // new Mesh selecting
      $(document).find(`li[data-id='${selectedMesh.id}'].mesh-name`).addClass('list-mesh-selected')
  
      $("#selected-mesh-name").val(selectedMesh.name)
      $("#selected-mesh-name").attr('data-id', selectedMesh.id)

      // if (!$("#selected-locket-container").is(":visible")) $("#selected-mesh-container").show();

      $("#selected-locket-container").hide()
      $("#selected-mesh-container").show()
  
      this.fullRefreshCanvasGraphics()
    }
  }

  // TOOLBAR
  refreshToolbar() {
    var clone = this
    $(".menu-icons-center-container > .toolbar-icon").each(function() {
      $(this).removeClass('toolbar-select')

      if ($(this).hasClass(`${clone.mouse.mode}`)) {
        $(this).addClass('toolbar-select')
      }
    });
  }

  // MOVE 3D
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
        // console.log("Pointer lock aktív")
      } else {
        // console.log("Pointer lock megszűnt")
        document.activeElement.blur()
        this.selectedView = null
        $("#screen-canvas").css('border-color', 'gray')
      }
    });

    window.addEventListener("resize", () => {
      this.fullRefreshCanvasGraphics()
    });
  }

  // REFRESH GRAPHICS
  fullRefreshCanvasGraphics() {
    this.refreshToolbar()
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

      const space = (view.ratio / view.frequent < 1) ? 1 : view.ratio / view.frequent

      // DRAW GRID
      if (view.showGrid) {
        view.ctx.strokeStyle = 'rgba(128, 128, 128, 0.2)'; view.ctx.lineWidth = 1;

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

      // DRAW ALL OBJECTS
      this.map.data.forEach(mesh => {
        
        let strucSelected = this.findMeshById(this.map.structure, mesh.id)
        strucSelected.visible = strucSelected.visible ?? true;

        // CHECK VISIBLE
        if (strucSelected?.visible) {
          var lineColor = mesh.lineColor
          var lineWidth = 1

          mesh.tris.forEach(tri => {
            this.drawViewTriangeAction(view, lineColor, lineWidth, tri.p[0][view.vX], tri.p[0][view.vY], tri.p[1][view.vX], tri.p[1][view.vY], tri.p[2][view.vX], tri.p[2][view.vY])
          });
        }
      });

      // SELECTED TRIANGLE DRAW
      if (this.mouse.selectedTri && this.mouse.selectedTri.id) {
        let selectTri = this.mouse.selectedTri
        var lineWidth = 3
        this.drawViewTriangeAction(view, 'white', lineWidth, selectTri.p[0][view.vX], selectTri.p[0][view.vY], selectTri.p[1][view.vX], selectTri.p[1][view.vY], selectTri.p[2][view.vX], selectTri.p[2][view.vY])
        // DRAW LOCKET IF HAVE
        if (selectTri?.locket) {
          let locketTriangle = this.map.data.flatMap(obj => obj.tris).find(triangle => triangle.id == selectTri.locket)
          this.drawViewTriangeAction(view, 'white', lineWidth, locketTriangle.p[0][view.vX], locketTriangle.p[0][view.vY], locketTriangle.p[1][view.vX], locketTriangle.p[1][view.vY], locketTriangle.p[2][view.vX], locketTriangle.p[2][view.vY])
        }
      }

      // SELECTED MASH DRAW
      if (this.mouse.selectedMeshId && !this.mouse.selectedTri) {
        let selectedMesh = this.findMeshById(this.map.structure, this.mouse.selectedMeshId)

        if (selectedMesh) {          
          var lineWidth = 3
          // IF VISIBLE
          if (selectedMesh.visible) {
            this.recursiveDrawMeshs(selectedMesh, view, 'white', lineWidth)
          }
        }
      }

      // TRIANGLE: WHEN DRAW: HELP POINT AND HELP LINE
      if (this.mouse.addTri.mode && this.mouse.addTri.count > 0) {
        let np0X = view.posX + this.mouse.addTri.cords[0][view.vX] * view.ratio;
        let np0Y = view.posY + this.mouse.addTri.cords[0][view.vY] * view.ratio;

        // point
        view.ctx.fillStyle = 'purple'
        view.ctx.beginPath()
        view.ctx.arc(np0X, np0Y, 3, 0, 2 * Math.PI)
        view.ctx.fill()
      }

      if (this.mouse.addTri.mode && this.mouse.addTri.count == 2) {
        let actPoint = this.mouse.addTri.count - 1
        let prewPoint = this.mouse.addTri.count - 2

        let np0X = view.posX + this.mouse.addTri.cords[prewPoint][view.vX] * view.ratio; let np0Y = view.posY + this.mouse.addTri.cords[prewPoint][view.vY] * view.ratio;
        let np1X = view.posX + this.mouse.addTri.cords[actPoint][view.vX] * view.ratio; let np1Y = view.posY + this.mouse.addTri.cords[actPoint][view.vY] * view.ratio;

        // line
        view.ctx.strokeStyle = 'white'
        view.ctx.lineWidth = 3
        view.ctx.beginPath()
        view.ctx.moveTo(np0X, np0Y)
        view.ctx.lineTo(np1X, np1Y)
        view.ctx.stroke()
        // point
        view.ctx.fillStyle = 'purple'
        view.ctx.beginPath()
        view.ctx.arc(np1X, np1Y, 3, 0, 2 * Math.PI)
        view.ctx.fill()
      }
      
      // RECTANGLE: WHEN DRAW: HELP POINT
      if (this.mouse.addRec.mode && this.mouse.addRec.count > 0) {
        let np0X = view.posX + this.mouse.addRec.cords[0][view.vX] * view.ratio;
        let np0Y = view.posY + this.mouse.addRec.cords[0][view.vY] * view.ratio;

        // point
        view.ctx.fillStyle = 'orange'
        view.ctx.beginPath()
        view.ctx.arc(np0X, np0Y, 3, 0, 2 * Math.PI)
        view.ctx.fill()
      }

      // POS ORIGO
      view.ctx.fillStyle = 'green';
      view.ctx.beginPath(); view.ctx.arc(view.posX, view.posY, 3, 0, 2 * Math.PI); view.ctx.fill();

      view.ctx.restore() // Eredeti koordinátarendszer visszaállítása

      // Információk kirajzolása (nem tükrözve)
      view.ctx.fillStyle = 'rgb(255, 255, 255)'
      view.ctx.font = '16px Arial'
      view.ctx.textAlign = 'left'
      view.ctx.fillText(`${view.vX.toUpperCase()} / ${view.vY.toUpperCase()}`, 5, 17)
    }
  }

  recursiveDrawMeshs(mesh, view, color, lineWidth) {
    let meshData = this.map.data.find(mapMesh => mapMesh.id == mesh.id)

    $(`.mesh-name[data-id=${mesh.id}]`).addClass("child-style")

    if (Array.isArray(meshData.tris) && meshData.tris.length > 0) {
      meshData.tris.forEach(tri => {
        this.drawViewTriangeAction(view, color, lineWidth, tri.p[0][view.vX], tri.p[0][view.vY], tri.p[1][view.vX], tri.p[1][view.vY], tri.p[2][view.vX], tri.p[2][view.vY])
      });
    }

    if (Array.isArray(mesh.child) && mesh.child.length > 0) {
      mesh.child.forEach(child => {
        this.recursiveDrawMeshs(child, view, color, lineWidth)
      });
    }
  }

  isTriangleOnScreen(vertices, screenWidth, screenHeight) {
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
      if (this.lineIntersectsRect(p1, p2, screenRect)) {
        return true;
      }
    }
    return false; // Ha semmi nem talál, a háromszög nem látszik
  }

  lineIntersectsRect(p1, p2, rect) {
    // Definiáljuk a téglalap éleit
    const rectEdges = [
      [{ x: rect.x1, y: rect.y1 }, { x: rect.x2, y: rect.y1 }], // Felső
      [{ x: rect.x2, y: rect.y1 }, { x: rect.x2, y: rect.y2 }], // Jobb
      [{ x: rect.x2, y: rect.y2 }, { x: rect.x1, y: rect.y2 }], // Alsó
      [{ x: rect.x1, y: rect.y2 }, { x: rect.x1, y: rect.y1 }], // Bal
    ];

    for (const [q1, q2] of rectEdges) {
      if (this.linesIntersect(p1, p2, q1, q2)) {
        return true;
      }
    }
    return false;
  }

  linesIntersect(p1, p2, q1, q2) {
    // Ellenőrizzük, hogy a két egyenes szakasz metszi-e egymást
    const orientation = (a, b, c) => (b.y - a.y) * (c.x - b.x) - (b.x - a.x) * (c.y - b.y)
    const o1 = orientation(p1, p2, q1)
    const o2 = orientation(p1, p2, q2)
    const o3 = orientation(q1, q2, p1)
    const o4 = orientation(q1, q2, p2)

    if (o1 * o2 < 0 && o3 * o4 < 0) return true; // Átlépő orientációk
    return false; // Ha nincs metszés
  }

  drawViewTriangeAction(view, lineColor, lineWidth, p0vX, p0vY, p1vX, p1vY, p2vX, p2vY) {
    let p0X = view.posX + p0vX * view.ratio; let p0Y = view.posY + p0vY * view.ratio;
    let p1X = view.posX + p1vX * view.ratio; let p1Y = view.posY + p1vY * view.ratio;
    let p2X = view.posX + p2vX * view.ratio; let p2Y = view.posY + p2vY * view.ratio;

    const vertices = [
      { x: p0X, y: p0Y },
      { x: p1X, y: p1Y },
      { x: p2X, y: p2Y },
    ];

    if (this.isTriangleOnScreen(vertices, view.canvas.width, view.canvas.height)) {

      view.ctx.strokeStyle = lineColor
      view.ctx.lineWidth = lineWidth
      view.ctx.lineCap = 'round'
      view.ctx.lineJoin = 'round'

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
    this.graph.buffer.fill(0)         // CLEAR memoryCanvas
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

  //--

  // AJAX
  async fetchData(data, originaldata) {
    const response = await $.ajax({
        url: 'editor.php',
        type: 'POST',
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        data: data,
    });

    return originaldata ? response : JSON.parse(response);
  } catch (error) {
      console.error("Hiba történt:", error);
  }
}

const editor = new Editor()
