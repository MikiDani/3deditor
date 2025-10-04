import * as THREE from 'three'
import $ from 'jquery'
import * as bootstrap from 'bootstrap'

export default class Input {
  constructor(game) {
    this.game = game

    this.selectedObjectIndex = 0

    this.gravity = 0

    this.mouseMoveTimer = 0
    this.eventMouse = { x: 0, y: 0 }
    this.chechLookInterval = null

    this.ideiglenesMenuInputs() // ! Ideiglenes
  }

  async ideiglenesMenuInputs() {
    const response = await this.game.loader.fetchData({ ajax: true, getfiles: true })  
    if (response?.files) {
      let elements = '';
      for (const file of response.files) {        
        if (file.extension != 'tuc' && file.extension != 'mtuc' && file.extension != 'otuc') continue;
        elements += `<div class="filename-listelement text-start cursor-pointer" data-filename="${file.name}" data-ext="${file.extension}">• ${file.name}.${file.extension}</div>`
      }      
      $('#filelist-container').append(elements)
    }

    // ADD EVENT LISTENERS

    // CLOSE BUTTON
    $('.btn-close').on('click', function () {
      setTimeout(function () {
        if (document.activeElement) {
          document.activeElement.blur()
        }
      }, 10);
    });

    // CHECK LOOKING OBJECTS
    $(document).on('mousemove', (event) => {
      this.eventMouse.x = event.clientX
      this.eventMouse.y = event.clientY
      if (this.game.playerMouse.mode == 'use') $('#cursor-box').css({ left: event.clientX + 40 + 'px', top: event.clientY - 10 + 'px' });
    })

    this.chechLookInterval = setInterval(() => {
      const now = Date.now()
      if (this.game.currentState == 'game' && this.game.playerMouse.mode == 'look' && now - this.mouseMoveTimer > 200) {
        this.mouseMoveTimer = Date.now();

        const mouse = new THREE.Vector2()
        mouse.x = (this.eventMouse.x / window.innerWidth) * 2 - 1
        mouse.y = -(this.eventMouse.y / window.innerHeight) * 2 + 1
    
        // console.log(mouse.x, mouse.y)

        const raycaster = new THREE.Raycaster();
        raycaster.setFromCamera(mouse, this.game.camera);

        let find = false;

        for (const [meshId, meshGroup] of Object.entries(this.game.loadedMeshs)) {
          // ellenőrzés: van gyerek objektuma?
          if (!meshGroup || !meshGroup.children) continue;
          // sugár-metszés
          const intersects = raycaster.intersectObjects(meshGroup.children, true)

          if (intersects.length > 0) {
            const intersect = intersects[0]

            // kamera pozíció
            const cameraPos = new THREE.Vector3()
            this.game.camera.getWorldPosition(cameraPos)

            // találati pont
            const hitPoint = intersect.point;

            // távolság számítás
            const distance = cameraPos.distanceTo(hitPoint)

            console.log(meshGroup.visible)  // Ez ascene en lesz szerintem mármint a false visible. Lászik a szem amikor felvetted a sajtot       //!!     

            if (distance < 1 && meshGroup.text) {
              console.log("Mesh Name:", meshGroup.text)
              // console.log("Mesh ID:", meshId)
              // console.log("Mesh Name:", meshGroup.name)
              // console.log("Távolság:", distance.toFixed(2))
              find = true
              break
            }
          }
        }

        this.removeAllCursorClass()
        if (find) {
          $("html").addClass('cursor-look-on')
        } else {
          $("html").addClass('cursor-look-off')
        }
      }
    }, 100);

    $('#gravity-button').on('click', (event) => {
      let $this = $(event.target)
      this.game.gravity = $this.prop('checked') ? gravityValue : 0;
    });

    $('#lights-button').on('click', (event) => {
      let $this = $(event.target)
      this.game.lightsOn = $this.prop('checked')
    });

    $('#ghost-button').on('click', (event) => {
      let $this = $(event.target)
      this.game.ghostMode = $this.prop('checked')
    });

    $('.filename-listelement').on('click', (event) => {      
      const $this = $(event.target)
      const filename = $this.attr('data-filename')
      const ext = $this.attr('data-ext')
      console.log(filename, ext)
      $('#file-input').val(filename).attr('data-ext', ext)
    });

    $('#closeBtn').on('click', () => {
      const modal = bootstrap.Modal.getInstance(document.getElementById('topLayer'))
      if (modal) modal.hide()

      this.game.play = true
      this.game.currentState = 'game'
      this.game.showHideOptions('game')
    });
  }

  async gameControls() {

    // mouse right button off
    $(document).on("contextmenu", function(event) {
      event.preventDefault()// console.log("Jobb klikk letiltva!")
    });

    // MOUSE INVENTORY BUTTON
    $(document).on('mousedown', e => {

      // MOUSE ACTION: USE
      if (e.button == 0 && this.game.currentState == 'game' && $(e.target).attr('id') == 'use-selector') {
        e.preventDefault(); e.stopPropagation();        
        this.useSelectorChange()
        return;
      }

      // MOUSE ACTION: LOOK
      if (e.button == 0 && this.game.currentState == 'game' && $(e.target).attr('id') == 'look-selector') {
        e.preventDefault(); e.stopPropagation();        
        this.lookSelectorChange()
        return;
      }

      // CLOSE TEXT BUTTON            
      if (e.button == 0 && this.game.currentState == 'game' && $(e.target).attr('id') == 'text-box-close-button') {
        e.preventDefault(); e.stopPropagation();
        $("#text-box").hide()
        return;
      }

      // RIGHT MOUSE CLICK
      if (e.button == 2) {
        e.preventDefault(); e.stopPropagation();
        if (this.game.inventory.readArray.readType !== null) return;
        this.getActualCursor()
        this.changeGameOrInventory()
      }
    })

    // INVENTORY MOUSE CLICK
    $(document).on('click', '#inventory-item-text-container .item-text-container', (e) => {
      if ($(e.currentTarget).html() == '') return;

      if (!this.game.inventory.inventoryMenu.selectedObject) {
        // DEFINITELY BACK
        if (this.game.inventory.inventoryMenu.objectSelected) this.definitelyBack();
  
        // PERVIOUS OBJECT HIDE AND REFRESH LIST
        this.game.loadedObjects[this.game.inventory.selectedObject.id].visible = false
        this.game.inventory.inventoryMenu.reloadInventory = true;
  
        let index = $(e.currentTarget).index('#inventory-item-text-container .item-text-container')
        this.game.inventory.inventoryMenu.inventoryPosition = index;
  
        let selectedObjectIndex = this.game.playerObjects[this.game.inventory.inventoryMenu.inventoryStartIndex + this.game.inventory.inventoryMenu.inventoryPosition]
        this.setInventorySelectedMeshObject(selectedObjectIndex)
      }
    })

    // DOUBLE CLICK 1.
    $(document).on('dblclick', '#inventory-item-text-container .item-text-container', (e) => {
      if ($(e.currentTarget).html() == '') return;

      if (!this.game.inventory.inventoryMenu.selectedObject) {
        console.log('DB click')
        this.game.inventory.inventoryMenu.objectSelected = true
        this.game.inventory.inventoryMenu.reloadInventory = true
        $('#inventory-item-text-container .item-selected-text-container').removeClass('text-hover').addClass('text-selected')
      }
    })

    $(document).on('click', '#arrow-up', () => { if (!this.game.inventory.inventoryMenu.selectedObject) { this.moveUp() } })
    $(document).on('click', '#arrow-down', () => { if (!this.game.inventory.inventoryMenu.selectedObject) { this.moveDown() } })

    // DOUBLE CLICK 2.
    $(document).on('click', '#inventory-selected-item-container .item-selected-text-container:visible', e => {
      if (!this.game.inventory.inventoryMenu.selectedObject) {
        $('#inventory-item-text-container .item-text-container.text-hover').removeClass('text-hover').addClass('text-selected')
        let $items = $('#inventory-selected-item-container .item-selected-text-container:visible')
        this.game.inventory.inventoryMenu.selectedLength = $("#inventory-selected-item-container .item-selected-text-container:visible").length
        let index = $items.index(e.currentTarget)

        this.game.inventory.inventoryMenu.selectedPosition = index
        this.game.inventory.inventoryMenu.objectSelected = true

        $items.removeClass('text-hover text-selected')
        $items.eq(index).addClass('text-hover')
      }
    })

    $(document).on('dblclick', '#inventory-selected-item-container .item-selected-text-container:visible', e => {
      if (!this.game.inventory.inventoryMenu.selectedObject) {
        let index = $('#inventory-selected-item-container .item-selected-text-container:visible').index(e.currentTarget)
        this.game.inventory.inventoryMenu.selectedPosition = index
        this.game.inventory.inventoryMenu.selectedObject = true
        this.game.inventory.inventoryMenu.reloadInventory = true
      }
    })

    // BOOK AND NOTE - ARROW RIGHT
    $(document).on('click', '#book-arrow-right, #note-arrow-right', (e) => {
      this.turnPage(1)
    });

    $(document).on('click', '#book-arrow-left, #note-arrow-left', (e) => {
      this.turnPage(-1)
    });

    $(document).on('click', '#mouseorkey-selector', () => {
      this.changeMouseLock()
    });

    // CLODE BOOK OR NOTE
    $(document).on('click', '.book-close-button, .note-close-button', (e) => {
      this.hitEscToInventory(e)
    });

    this.setupCameraControls()
    this.mousePointerClickLoader()

    // // // //
    // KEYS
    $(document).on('keydown', async (e) => {

      // HELPERS
      if (e.key == 'i') {
        console.log(this.game.map)
        
        console.log('map.player')
        console.log(this.game.map.player)
        console.log(this.game.map.player.x)
        console.log(this.game.map.player.y)
        console.log(this.game.map.player.z)
    
        console.log(this.game.map.player.fYaw)
        console.log(this.game.map.player.fXaw)
        console.log('---')
        console.log('game.config')
        console.log(this.game.config)
      }
      if (e.key == 'm') {
        console.log(this.game.playerMouse)
      }
      //---

      // GAME KEYS
      if (this.game.currentState == 'game') {
        if(e.key =='Escape') {
          const modal = bootstrap.Modal.getInstance(document.getElementById('topLayer'))
          if (modal) modal.hide()

          if (this.game.currentState =='game') {
            this.game.play = false
            this.game.currentState = 'menu'
            this.game.showHideOptions('menu')
          } else if (this.game.currentState =='menu' || this.game.currentState =='inventory') {
            this.game.play = true
            this.game.currentState = 'game'
            this.game.showHideOptions('game')
          }
        }

        if(e.key =='Enter') {
          e.preventDefault(); e.stopPropagation();
          this.changeGameOrInventory()
        }

        // POINTERLOCK MOUSE
        if (e.key == 'f') {
          e.preventDefault(); e.stopPropagation();
          this.changeMouseLock()
          return
        }

        // USE MOUSE MODE
        if (e.key == 'e') {
          e.preventDefault(); e.stopPropagation();
          this.useSelectorChange()
          return
        }

        // LOOK MOUSE MODE
        if (e.key == 'q') {
          e.preventDefault(); e.stopPropagation();
          this.lookSelectorChange()
          return
        }

        if (e.key == 'n' && this.game.currentState == 'game') {
          console.log('INVENTORY')
          this.game.play = false
          this.game.currentState = 'inventory'
          this.game.showHideOptions('inventory')
        }
      }

      // INVENTORY KEYS
      if (this.game.currentState == 'inventory') {

        // BOOK AND NOTE
        if (e.key == 'ArrowRight' || e.key == 'd' || e.key == 'D') this.turnPage(1);
        if (e.key == 'ArrowLeft' || e.key == 'a' || e.key == 'A') this.turnPage(-1);

        // ESC
        if (e.key == 'Escape' || e.key == 'Backspace') this.hitEscToInventory(e);

        // console.log(this.game.inventory.inventoryMenu.inventoryStartIndex + this.game.inventory.inventoryMenu.inventoryPosition)
        if (!this.game.inventory.inventoryMenu.selectedObject) {
          if (!this.game.inventory.inventoryMenu.objectSelected) {

            if ($('#book-container:visible').length || $('#note-container:visible').length) return

            // FIRST LEVEL MOVE - WHAT
            if (e.key == 'ArrowUp' || e.key == 'w' || e.key == 'W') this.moveUp();
            if (e.key == 'ArrowDown' || e.key == 's' || e.key == 'S') this.moveDown();
    
            if (e.key == 'Enter' || e.key == 'ArrowRight' || e.key == 'd' || e.key == 'D') {
              this.game.inventory.inventoryMenu.objectSelected = true
              this.game.inventory.inventoryMenu.reloadInventory = true
              $('#inventory-item-text-container .item-text-container.text-hover').removeClass('text-hover').addClass('text-selected')
            }
          } else {
            // SECOND LEVEL MOVE - HOW
            if (e.key == 'ArrowUp' || e.key == 'w' || e.key == 'W') {
              if (this.game.inventory.inventoryMenu.selectedPosition > 0) {
                this.game.inventory.inventoryMenu.selectedPosition--
                console.log(this.game.inventory.inventoryMenu.selectedPosition)
  
                this.game.inventory.inventoryMenu.reloadInventory = true
              }
            }
  
            if (e.key == 'ArrowDown' || e.key == 's' || e.key == 'S') {
              if (this.game.inventory.inventoryMenu.selectedPosition < this.game.inventory.inventoryMenu.selectedLength - 1) {
                this.game.inventory.inventoryMenu.selectedPosition++
                console.log(this.game.inventory.inventoryMenu.selectedPosition)
                
                this.game.inventory.inventoryMenu.reloadInventory = true
              }
            }
  
            if (e.key == 'Enter') {
              this.game.inventory.inventoryMenu.selectedObject = true
              this.game.inventory.inventoryMenu.reloadInventory = true
            }
  
            // SELECTED OBJECT MOVE
            if (e.key == 'Backspace' || e.key == 'ArrowLeft' || e.key == 'a' || e.key == 'A') {
              this.game.inventory.inventoryMenu.objectSelected = false
              this.game.inventory.inventoryMenu.selectedPosition = 0
              this.game.inventory.inventoryMenu.reloadInventory = true
              $('#inventory-item-text-container .item-text-container.text-selected').removeClass('text-selected').addClass('text-hover')
            }
          }
        }
      }
    });
    this.game.inputsLoading = true
  }

  hitEscToInventory(e = null) {
    this.game.inventory.readArray = {
      readType: null,
      readData: null,
      readIndex: 0,
    }

    if ($("#book-container").css('display') == 'flex') {
      $("#book-background").removeClass('anim-in').addClass('anim-out')
      setTimeout(() => {
        $("#book-background").removeClass('anim-out')
        $("#book-container").css('display', 'none')
      }, 300)
      return;
    }

    if ($("#note-container").css('display') == 'flex') {
      $("#note-background").removeClass('anim-in').addClass('anim-out')
      setTimeout(() => {
        $("#note-background").removeClass('anim-out')
        $("#note-container").css('display', 'none')
      }, 300)
      return;
    }

    // BACK GAME
    console.log('BACK GAME')
    this.game.play = true
    this.game.currentState = 'game'
    this.game.showHideOptions('game')

    if (e) e.stopPropagation();
    if (e) e.preventDefault();
  }

  changeGameOrInventory() {
    if (this.game.currentState == 'game') {
      // GO INVENTORY
      console.log('INVENTORY')
      if (document.pointerLockElement === this.game.canvas) document.exitPointerLock();
      this.setDefaultCursor()
      this.game.play = false
      this.game.currentState = 'inventory'
      this.game.showHideOptions('inventory')

    } else if (this.game.currentState == 'inventory') {
      // BACK GAME
      console.log('BACK GAME')
      this.getActualCursor()
      this.game.play = true
      this.game.currentState = 'game'
      this.game.showHideOptions('game')
    }
  }

  moveUp() {
    this.game.inventory.inventoryMenu.reloadInventory = true

    // DEFINITELY BACK
    if (this.game.inventory.inventoryMenu.objectSelected) this.definitelyBack();

    if (this.game.inventory.inventoryMenu.inventoryPosition > 0) {
      // HIDE OBJECT
      this.game.loadedObjects[this.game.inventory.selectedObject.id].visible = false
      this.game.inventory.inventoryMenu.inventoryPosition--;
    } else {
      // MOVE inventoryStartIndex
      if (this.game.inventory.inventoryMenu.inventoryStartIndex + this.game.inventory.inventoryMenu.inventoryPosition > 0) this.game.inventory.inventoryMenu.inventoryStartIndex--;
    }

    this.game.loadedObjects[this.game.inventory.selectedObject.id].visible = false
    let selectedObjectIndex = this.game.playerObjects[this.game.inventory.inventoryMenu.inventoryStartIndex + this.game.inventory.inventoryMenu.inventoryPosition]
    this.setInventorySelectedMeshObject(selectedObjectIndex)
  }

  moveDown() {
    this.game.inventory.inventoryMenu.reloadInventory = true

    // DEFINITELY BACK
    if (this.game.inventory.inventoryMenu.objectSelected) this.definitelyBack();

    if (this.game.inventory.inventoryMenu.inventoryPosition < this.game.inventory.inventoryMenu.inventoryLength - 1) {
      // IF SHORT INVENTORY LIST
      if (this.game.playerObjects.length <= 7 && this.game.inventory.inventoryMenu.inventoryPosition == this.game.playerObjects.length - 1) return;

      // HIDE OBJECT
      this.game.loadedObjects[this.game.inventory.selectedObject.id].visible = false
      this.game.inventory.inventoryMenu.inventoryPosition++;
    } else {
      // MOVE inventoryStartIndex
      if (this.game.inventory.inventoryMenu.inventoryStartIndex + this.game.inventory.inventoryMenu.inventoryPosition < this.game.playerObjects.length - 1) this.game.inventory.inventoryMenu.inventoryStartIndex++;
    }

    this.game.loadedObjects[this.game.inventory.selectedObject.id].visible = false
    let selectedObjectIndex = this.game.playerObjects[this.game.inventory.inventoryMenu.inventoryStartIndex + this.game.inventory.inventoryMenu.inventoryPosition]
    this.setInventorySelectedMeshObject(selectedObjectIndex)
  }

  turnPage(readIndexMove) {
    // console.log(this.game.inventory.readArray)
    if (this.game.inventory.readArray.readData) {
      let length = this.game.inventory.readArray.readData.texts.length

      let testValue = parseInt(this.game.inventory.readArray.readIndex) + parseInt(readIndexMove)

      if (testValue >= 0 && testValue < length) {
        this.game.inventory.readArray.readIndex = parseInt(this.game.inventory.readArray.readIndex) + parseInt(readIndexMove)
        if (this.game.inventory.readArray.readType == 'note') this.game.inventory.loadNotePage();
        if (this.game.inventory.readArray.readType == 'book') this.game.inventory.loadBookPage();
      }
    }
  }

  // -- CURSOR OPTIONS
  setDefaultCursor() {
    this.removeAllCursorClass()
    $("html").addClass('cursor-default')
  }

  useSelectorChange() {
    this.game.playerMouse.mode = 'use'

    this.removeAllCursorClass()
    $("html").addClass('cursor-use')

    console.log(this.game.playerMouse.mode)
  }

  lookSelectorChange() {
    this.game.playerMouse.mode = 'look'

    this.removeAllCursorClass()
    $("html").addClass('cursor-look-off')

    console.log(this.game.playerMouse.mode)
  }

  getActualCursor() {
    if (this.game.playerMouse.mode == 'use') this.useSelectorChange()
    if (this.game.playerMouse.mode == 'look') this.lookSelectorChange()
  }

  removeAllCursorClass() {
    $("html").removeClass('cursor-default').removeClass('cursor-look-on').removeClass('cursor-look-off').removeClass('cursor-use')
  }

  // --

  setInventorySelectedMeshObject(inventoryIndex) {
    let object = this.game.loadedObjects.find(obj => obj && obj.index == inventoryIndex)
    if (object) this.game.inventory.selectedObject = object;
  }

  definitelyBack() {
    this.game.inventory.inventoryMenu.objectSelected = false
    this.game.inventory.inventoryMenu.selectedPosition = 0
    $(document).find('.item-text-container.text-selected').removeClass('text-selected')
  }

  setupCameraControls() {
    this.game.rotateSpeed = THREE.MathUtils.degToRad(3)
    this.game.keysPressed = new Set()

    this.game.isGrounded = true
    this.game.jumpState = {
      isJumping: false,
      size: 0.5,
      startY: 0,
      targetY: 0,
      startTime: 0,
      duration: 200,
      isLocked: false,
      cooldownTime: 1000
    };

    window.addEventListener('keydown', (e) => {
      if (typeof e.key == 'string') this.game.keysPressed.add(e.key.toLowerCase())
    })

    window.addEventListener('keyup', (e) => {
      if (typeof e.key == 'string') this.game.keysPressed.delete(e.key.toLowerCase())
    })
  }

  willCollide(testPos) {    
    const cameraBox = new THREE.Box3().setFromCenterAndSize(testPos, this.game.playerBoundingBox);

    // Statikus objektumok
    let collides = this.game.boundingBoxes.some(box => box.intersectsBox(cameraBox));

    // Dinamikus objektumok
    // collides ||= this.game.dynamicBoundingBoxes.some(entry => entry.box.intersectsBox(cameraBox));  // !!

    return collides;
  }

  testMove(offset, allowStep = false) {
    const player = this.game.player
    const start = player.position.clone()

    if (this.game.ghostMode) {
      player.position.add(offset)
      return true;
    }

    // 1) Teljes mozgás
    const target = start.clone().add(offset)
    if (!this.willCollide(target)) {
      player.position.copy(target)
      return true;
    }

    // 2) Tengelyenkénti csúsztatás
    let moved = false
    let blocked = false

    const dx = new THREE.Vector3(offset.x, 0, 0)
    const tryX = start.clone().add(dx)
    if (!this.willCollide(tryX)) {
      player.position.copy(tryX)
      moved = true
    } else blocked = true;
  
    const dz = new THREE.Vector3(0, 0, offset.z)
    const tryZ = player.position.clone().add(dz)
    if (!this.willCollide(tryZ)) {
      player.position.copy(tryZ)
      moved = true
    } else {
      blocked = true
    }

    if (allowStep && blocked) {
      const originalY = player.position.y
      const up = new THREE.Vector3(0, this.game.stepHeight, 0)

      const raised = player.position.clone().add(up)
      if (!this.willCollide(raised)) {
        const stepTarget = raised.clone().add(offset)
        if (!this.willCollide(stepTarget)) {
          const supportProbe = stepTarget.clone().add(new THREE.Vector3(0, -this.game.stepHeight - 0.01, 0))
          const hasSupport = this.willCollide(supportProbe)
          if (hasSupport) {
            player.position.copy(stepTarget)
            return true
          }
        }
      }

      player.position.y = originalY
    }
  
    return moved
  }

  changeMouseLock() {
    $('#mouseorkey-selector').removeClass('key-selector-pic').removeClass('mouse-selector-pic')
    if (document.pointerLockElement === this.game.canvas) {
      console.log('PointerLock kikapcsolás...')
      document.exitPointerLock()
      $('#mouseorkey-selector').addClass('key-selector-pic')
    } else {
      console.log('PointerLock bekapcsolás...')
      this.game.canvas.requestPointerLock()
      $('#mouseorkey-selector').addClass('mouse-selector-pic')
    }
  }

  mousePointerClickLoader() {
    this.game.isPointerLocked = false

    document.addEventListener('pointerlockchange', () => {
      this.game.isPointerLocked = document.pointerLockElement == this.game.canvas
    });

    document.addEventListener('mousemove', (event) => {
      if (!this.game.isPointerLocked) return;

      const movementX = event.movementX || 0;
      const movementY = event.movementY || 0;

      this.game.player.rotation.y -= movementX * 0.002
      this.game.pitchObject.rotation.x -= movementY * 0.002

      const maxPitch = THREE.MathUtils.degToRad(80)
      const minPitch = THREE.MathUtils.degToRad(-80)
      this.game.pitchObject.rotation.x = Math.max(minPitch, Math.min(maxPitch, this.game.pitchObject.rotation.x))

      this.game.camera.rotation.z = 0
    });
  }

  updatePlayer() {
    const shift = this.game.keysPressed.has('shift')
    let moved = false;

    const direction = new THREE.Vector3(-Math.sin(this.game.player.rotation.y), 0, -Math.cos(this.game.player.rotation.y)).normalize()   

    if (this.game.keysPressed.has('w') || this.game.keysPressed.has('W') || this.game.keysPressed.has('arrowup')) {
      if (shift) {
        if (!moved) {
          moved = this.game.ghostMode
          ? this.testMove(new THREE.Vector3(0, this.game.moveSpeed, 0)) // UP
          : this.testMove(direction.clone().multiplyScalar(this.game.moveSpeed * 2), true);
        }
      } else {
        if (!moved) {
          moved = this.testMove(direction.clone().multiplyScalar(this.game.moveSpeed), true)
        }
      }
    }

    if (this.game.keysPressed.has('s') || this.game.keysPressed.has('S') || this.game.keysPressed.has('arrowdown')) {
      if (shift) {
        if (!moved) {
          moved = this.game.ghostMode
          ? this.testMove(new THREE.Vector3(0, -this.game.moveSpeed, 0)) // DOWN
          : this.testMove(direction.clone().multiplyScalar(-this.game.moveSpeed * 2));
        }
      } else {
        if (!moved) {
          moved = this.testMove(direction.clone().multiplyScalar(-this.game.moveSpeed))
        }
      }
    }

    if (this.game.keysPressed.has('a') || this.game.keysPressed.has('A') || this.game.keysPressed.has('arrowleft')) {
      if (shift || this.game.isPointerLocked) {
        const left = new THREE.Vector3().crossVectors(this.game.camera.up, direction).normalize().multiplyScalar(this.game.moveSpeed)
        moved ||= this.testMove(left);
      } else {
        this.game.player.rotation.y += this.game.rotateSpeed
        moved = true
      }
    }

    if (this.game.keysPressed.has('d') || this.game.keysPressed.has('D') || this.game.keysPressed.has('arrowright')) {
      if (shift || this.game.isPointerLocked) {
        const right = new THREE.Vector3().crossVectors(direction, this.game.camera.up).normalize().multiplyScalar(this.game.moveSpeed)
        moved ||= this.testMove(right)
      } else {
        this.game.player.rotation.y -= this.game.rotateSpeed
        moved = true
      }
    }

    const pitchLimit = THREE.MathUtils.degToRad(80)

    if (this.game.keysPressed.has('pagedown')) {
      this.game.pitchObject.rotation.x -= this.game.rotateSpeed;
      this.game.pitchObject.rotation.x = Math.max(-pitchLimit, Math.min(pitchLimit, this.game.pitchObject.rotation.x))
    }

    if (this.game.keysPressed.has('pageup')) {
      this.game.pitchObject.rotation.x += this.game.rotateSpeed;
      this.game.pitchObject.rotation.x = Math.max(-pitchLimit, Math.min(pitchLimit, this.game.pitchObject.rotation.x))
    }

    // ----- UGRÁS -----
    if (this.game.keysPressed.has(' ') && this.game.isGrounded && !this.game.jumpState.isJumping && !this.game.jumpState.isLocked) {
      this.game.jumpState.isJumping = true
      this.game.jumpState.startY = this.game.player.position.y
      this.game.jumpState.targetY = this.game.player.position.y + this.game.jumpState.size
      this.game.jumpState.startTime = performance.now()
      this.game.isGrounded = false

      // Ugrás tiltása cooldown idejére
      this.game.jumpState.isLocked = true
      setTimeout(() => {
        this.game.jumpState.isLocked = false
      }, this.game.jumpState.cooldownTime)
    }

    if (this.game.jumpState.isJumping) {
      const elapsed = performance.now() - this.game.jumpState.startTime;
      const t = Math.min(elapsed / this.game.jumpState.duration, 1)
      const newY = THREE.MathUtils.lerp(this.game.jumpState.startY, this.game.jumpState.targetY, t)

      const jumpOffset = new THREE.Vector3(0, newY - this.game.player.position.y, 0)
      const testPos = this.game.player.position.clone().add(jumpOffset)

      if (!this.willCollide(testPos)) {
        this.game.player.position.y = newY
      } else {
        this.game.jumpState.isJumping = false
      }

      if (t >= 1) this.game.jumpState.isJumping = false
    }

    // ----- GRAVITÁCIÓ -----
    if (!this.game.jumpState.isJumping) {

      const gravityOffset = (this.game.gravity)
        ? new THREE.Vector3(0, this.game.currentGravity, 0)
        : new THREE.Vector3(0, 0, 0);

      const testPos = this.game.player.position.clone().add(gravityOffset);

      if (!this.willCollide(testPos)) {
        this.game.player.position.add(gravityOffset);
        this.game.isGrounded = false;
      } else {
        this.game.isGrounded = true;
      }
    }

    return moved;
  }

  // CANVAS CLICK
  actionsClicksCheck() {
    let clickTimer

    // MOUSEDOWN
    $("#game-canvas").on('mousedown', (event) => {
      clickTimer = setTimeout(() => {
        event.preventDefault()
        event.stopImmediatePropagation()

        this.handleClickEvent(event, 'mousedown');
      }, 150);
    });
  
    // DBLCLICK
    $("#game-canvas").on('dblclick', (event) => {
      clearTimeout(clickTimer);
      event.preventDefault()
      event.stopImmediatePropagation()

      this.handleClickEvent(event, 'dblclick');
    });
  }

  // CLICK LOGICK
  handleClickEvent(event, clickType) {
    if (this.game.isPointerLocked) return;

    const mouse = new THREE.Vector2()
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1
    mouse.y = - (event.clientY / window.innerHeight) * 2 + 1

    const raycaster = new THREE.Raycaster()
    raycaster.setFromCamera(mouse, this.game.camera)

    // this.game.map.actionelements.forEach(action => {
    for (const action of this.game.map.actionelements) {
      if (action[1].conditions.click == clickType) {
        const intersects = raycaster.intersectObjects(action[0].children, true)
        // IF HAVE CLICK SHOT MESH
        if (intersects.length > 0) {
          const intersect = intersects[0]
          const cameraPos = new THREE.Vector3()
          this.game.camera.getWorldPosition(cameraPos)
          const hitPoint = intersect.point
          const distance = cameraPos.distanceTo(hitPoint)

          console.log('---')
          console.log(action[0].text)
          console.log('---')
          
          // IF HAVE TEXT
          if (this.game.playerMouse.mode == 'look' && action[0].text && distance < 1) {

            console.log('---')
            console.log(action[0].text)
            console.log(distance)
            console.log(this.game.playerMouse.mode)          
            console.log('---')

            console.log($("#text-box-text").html(), action[0].text)

            if ($("#text-box").is(":visible") && $("#text-box-text").html() == action[0].text) {
              $("#text-box").hide()
              $("#text-box-text").html('')
              continue
            } else {
              $("#text-box-text").html(action[0].text)
              $("#text-box").show()
              continue
            }

          }

          this.game.gameplay.checkActions(action, distance)
        }
      }
    }
  }
}