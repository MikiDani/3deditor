import * as THREE from 'three'
import $ from 'jquery'
import * as bootstrap from 'bootstrap'

export default class Input {
  constructor(game) {
    this.game = game

    this.fistInteraction = false

    this.lastKeyTime = 0
    this.selectedObjectIndex = 0
    this.gravity = 0

    this.isCrouching = false
    this.originalHeight = null

    this.mouseMoveTimer = 0
    this.eventMouse = { x: 0, y: 0 }
    this.lastEventMouse
    this.chechLookInterval = null

    // TURN OFF BROWSER ZOOM
    $(document).on("keydown", function(e) {
      if (e.ctrlKey && (e.key === "+" || e.key === "-" || e.key === "0")) e.preventDefault();
    })
    document.addEventListener("wheel", function(e) {
      if (e.ctrlKey) e.preventDefault();
    }, { passive: false })

    this.ideiglenesMenuInputs() // ! Ideiglenes
  }

  resetautoMovePlayerData() {
    this.game.autoMovePlayerData = {
      ...this.game.autoMovePlayerData,
      mode: null,
      weapon: null,
    }
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

    // RELOAD SCREEN
    $(window).on('resize', () => {
      this.game.graphics.reloadScreen()
    });

    // FIRST INTERACTION BUTTON
    $(document).on('click', '#first-interaction-button', () => {
      this.fistInteraction = true      
    });

    // CLOSE BUTTON
    $('.btn-close').on('click', function () {
      setTimeout(function () {
        if (document.activeElement) {
          document.activeElement.blur()
        }
      }, 10);
    });

    $("#console-reset").on('click', () => {
      $("#loading-console").html('')
      $("#loading-console-last").html('')
    });

    $("#console-button1").on('click', (event) => {
      let state = parseInt($(event.currentTarget).attr('data-state'))
      if (state) {
        $(event.currentTarget).attr('data-state', 0).text('ALL ROW')
        $("#loading-console").hide()
        $("#loading-console-last").show()
      } else {
        $(event.currentTarget).attr('data-state', 1).text('ONE LINE')
        $("#loading-console").show()
        $("#loading-console-last").hide()
      }
    });

    // CHECK CURSOR POINT AND CLICK INTERVAL
    $(document).on('mousemove', (event) => { this.checkMousePositionOptions(event) })
    this.checkLookingInterval()

    $('#gravity-button').on('click', (event) => {
      let $this = $(event.target)
      this.game.gravity = $this.prop('checked') ? this.game.gravityValue : 0;
    });

    $('#lights-button').on('click', (event) => {
      let $this = $(event.target)
      this.game.lightsOn = $this.prop('checked')
    });

    $('#ghost-button').on('click', (event) => {
      let $this = $(event.target)
      this.game.ghostMode = $this.prop('checked')
    });

    $('#hints-button').on('click', (event) => {
      let $this = $(event.target)
      this.game.menu.options.hints = $this.prop('checked')
      console.log($this.prop('checked'))
    });

    $('#darkcontrast-button').on('click', (event) => {
      let $this = $(event.target)

      console.log($this.prop('checked'))

      this.game.menu.options.darkContrast = $this.prop('checked') ? 0.008 : 0.004;
    });

    $(document).on('click', '.del-save-button', async (event) => {
      const $this = $(event.target).prev()
      const filename = $this.attr('data-filename')
      const ext = $this.attr('data-ext')

      // LOACAL SAVE
      if (ext == 'local') {
        localStorage.removeItem(filename)

        $("#local-savegame-message").html(`<div class="text-center text-success">Törölve: ${filename}</div>`)
        setTimeout(() => {
          $("#local-savegame-message").html('')
        }, 4000)

        this.game.loader.loadSavedgamesList('local')
        return true;
      }

      // FILE SAVE
      const responseDelete = await this.game.loader.fetchData({
        ajax: true,
        delete: true,
        filename: filename,
        ext: ext,
        savedgamesdir: '__saved_games__'
      })

      if (responseDelete.success) $("#savegame-message").html(`<div class="text-center text-success">${responseDelete.success}</div>`)
      else $("#savegame-message").html(`<div class="text-center text-danger">${responseDelete.error}</div>`)

      setTimeout(() => {
        $("#savegame-message").html('')
      }, 4000)

      this.game.loader.loadSavedgamesList('file')
    })

    $('.start-button').on('click', () => {
      const modal = bootstrap.Modal.getInstance(document.getElementById('topLayer'))
      if (modal) modal.hide()

      this.game.play = true
      this.game.currentState = 'game'
      this.game.showHideOptions('game')
    });

    $('#savegame-button').on('click', async () => {
      if (this.game.mapLoading) {
        const request = await this.game.loader.saveGame('file')
        // RELOAD SAVED GAMES FILE LIST
        if (request) await this.game.loader.loadSavedgamesList('file')
      } else {
        console.log('Error: not loaded map!');
        $("#savegame-message").html(`<div class="text-center text-danger">Not loaded map!</div>`)
        setTimeout(() => {$("#savegame-message").html('')}, 4000);
        return true;
      }
    });

    $('#local-savegame-button').on('click', async () => {
      if (this.game.mapLoading) {

        const request = await this.game.loader.saveGame('local')
        // RELOAD SAVED GAMES FILE LIST
        if (request) await this.game.loader.loadSavedgamesList('local')
      } else {
        console.log('Error: not loaded map!');
        $("#local-savegame-message").html(`<div class="text-center text-danger">Not loaded map!</div>`)
        setTimeout(() => {$("#local-savegame-message").html('')}, 4000);
        return false;
      }
    });

    $(document).on('click', '.filename-listelement, .savegame-listelement', (event) => {
      const $this = $(event.currentTarget)
      const filename = $this.attr('data-filename')
      const ext = $this.attr('data-ext')

      this.game.filename = filename
      this.game.ext = ext

      $('#file-input').val(filename).attr('data-ext', ext)
    })

    // LOADING SAVED GAME
    $('#file-loadgame-button, #local-loadgame-button').on('click', async () => {
      if (this.game.filename && this.game.ext && (this.game.ext == 'stuc' || this.game.ext == 'local')) {

        this.game.forceClearAllTimers()

        // DELETE ALL PLAYING SOUNDS
        this.game.sound.removeAllPlayedAudio()

        // DELETE ALL MESHS
        this.game.deleteAllObjectInScene(this.game.scene)
        this.game.deleteAllObjectInScene(this.game.heandScene)

        this.game.loadedLights = []
        this.game.loadedBeings = []
        this.game.loadedHeands = []
        this.game.loadedMeshs = []

        // inventory datas
        this.game.playerObjects = this.game.playerObjectsDefault
        // console.log(this.game.playerObjects)

        this.game.mapLoading = false

        //--- start
        const modal = bootstrap.Modal.getInstance(document.getElementById('topLayer'))
        if (modal) modal.hide()
  
        this.game.play = true
        this.game.currentState = 'game'
        this.game.showHideOptions('game')

      } else {
        console.log('Error: Not saved game selected!');
        $("#savegame-message").html(`<div class="text-center text-danger">Not saved game selected!</div>`)
        setTimeout(() => {$("#savegame-message").html('')}, 4000);
        return true;
      }
    });
  }

  checkLookingInterval_old() {
    this.chechLookInterval = setInterval(() => {
      const now = Date.now()
      if (now - this.mouseMoveTimer > 200) { 
        if (document.pointerLockElement === null && this.game.currentState == 'game') {
          this.mouseMoveTimer = Date.now()

          const mouse = new THREE.Vector2()
          mouse.x = (this.eventMouse.x / window.innerWidth) * 2 - 1
          mouse.y = -(this.eventMouse.y / window.innerHeight) * 2 + 1
          // console.log(mouse.x, mouse.y)

          const raycaster = new THREE.Raycaster()
          raycaster.setFromCamera(mouse, this.game.camera)

          //-- 1. CHECK FISRT HIT MESH
          let sceneIntersects = raycaster.intersectObjects(Object.values(this.game.loadedMeshs), true)

          let findLook = false;
          let findUse = false;

          for (const [meshId, meshGroup] of Object.entries(this.game.loadedMeshs)) {
            if (!meshGroup || !meshGroup.children) continue;
            const intersects = raycaster.intersectObjects(meshGroup.children, true)
            if (intersects.length > 0) {
              
              // 2. CHECK FISRT HIT MESH
              let sceneIntersects = raycaster.intersectObjects(Object.values(this.game.loadedMeshs), true)
              let firstSolidIntersect = sceneIntersects.find(hit => !hit.object.parent?.pervious)

              if (firstSolidIntersect?.object.parent.name != intersects[0].object.parent.name) continue;
              // SKIP IF NOT ACTIVE
              if (!intersects[0].object.parent.visible) continue;

              const intersect = intersects[0]
              const hitPoint = intersect.point;

              const cameraPos = new THREE.Vector3()
              this.game.camera.getWorldPosition(cameraPos)

              const distance = cameraPos.distanceTo(hitPoint)
              // CHECK // console.log(meshGroup.id, meshGroup.name)
              if (this.game.playerMouse.mode == 'look') {
                // LOOK
                if (meshGroup.text) {
                  const found = this.game.map.actionelements.find(pair => pair[0].id === meshGroup.id)
                  if (found) {
                    if (distance < found[1].conditions.distance_far) {
                      findLook = true
                      break
                    }
                  }
                }
              } else if (this.game.playerMouse.mode == 'use') {
                // USE
                const found = this.game.map.actionelements.find(pair => pair[0].id === meshGroup.id)
                if (found) {
                  // IF ONLY LOOCK TEXT HAVE
                  if (found[1].name == 'TEXT') break;

                  if (distance < found[1].conditions.distance_far) {
                    findUse = true
                    break
                  }
                }
              }
            }
          }

          this.removeAllCursorClass()
          if (this.game.playerMouse.mode == 'look') {
            // LOOK
            findLook ? $("html").addClass('cursor-look-on') : $("html").addClass('cursor-look-off');
          } else if (this.game.playerMouse.mode == 'use') {
            // USE
            findUse
            ? this.game.playerMouse.selectedObject ? $("html").addClass('cursor-get-on') : $("html").addClass('cursor-use-on')
            : this.game.playerMouse.selectedObject ? $("html").addClass('cursor-get-off') : $("html").addClass('cursor-use-off')
          }
        }
      }
    }, 25);
  }

  checkLookingInterval() {
    this.chechLookInterval = setInterval(() => {
      const now = Date.now()

      if (now - this.mouseMoveTimer > 200) {
        if (document.pointerLockElement === null && this.game.currentState == 'game') {
          this.mouseMoveTimer = Date.now()

          const mouse = new THREE.Vector2()
          mouse.x = (this.eventMouse.x / window.innerWidth) * 2 - 1
          mouse.y = -(this.eventMouse.y / window.innerHeight) * 2 + 1

          const raycaster = new THREE.Raycaster()
          raycaster.setFromCamera(mouse, this.game.camera)

          //-- 1. CHECK FISRT HIT MESH
          let sceneIntersects = raycaster.intersectObjects(Object.values(this.game.loadedMeshs), true)
          let firstSolidIntersect = sceneIntersects.find(hit => !hit.object.parent?.pervious)

          let findLook = false
          let findUse = false

          if (firstSolidIntersect) {
            const meshGroup = firstSolidIntersect.object.parent

            if (meshGroup?.visible) {
              const cameraPos = new THREE.Vector3()
              this.game.camera.getWorldPosition(cameraPos)

              const distance = cameraPos.distanceTo(firstSolidIntersect.point)

              const found = this.game.map.actionelements.find(pair => pair[0] === meshGroup)

              if (found) {
                if (this.game.playerMouse.mode == 'look') {
                  if (meshGroup.text) {
                    if (distance < found[1].conditions.distance_far) {
                      findLook = true
                    }
                  }
                } else if (this.game.playerMouse.mode == 'use') {
                  if (found[1].name != 'TEXT') {
                    if (distance < found[1].conditions.distance_far) {
                      findUse = true
                    }
                  }
                }
              }
            }
          }

          this.removeAllCursorClass()

          if (this.game.playerMouse.mode == 'look') {
            findLook ? $("html").addClass('cursor-look-on') : $("html").addClass('cursor-look-off')
          } else if (this.game.playerMouse.mode == 'use') {
            findUse
            ? this.game.playerMouse.selectedObject ? $("html").addClass('cursor-get-on') : $("html").addClass('cursor-use-on')
            : this.game.playerMouse.selectedObject ? $("html").addClass('cursor-get-off') : $("html").addClass('cursor-use-off')
          }
        }
      }
    }, 100)
  }

  checkMousePositionOptions(event) {
    this.lastEventMouse = event
    this.eventMouse.x = event.clientX
    this.eventMouse.y = event.clientY   

    if (this.game.playerMouse.mode == 'use' && $('#cursor-text-box:visible').length) {
      $('#cursor-text-box').css({ left: event.clientX + 40 + 'px', top: event.clientY - 10 + 'px' });
    }
  }

  async gameControls() {
    // mouse right button off
    $(document).on("contextmenu", function(event) {
      event.preventDefault(); event.stopPropagation(); // console.log("Jobb klikk letiltva!")
    });

    // MOUSE INVENTORY BUTTON
    $(document).on('mousedown', e => {

      // RIGHT MOUSE CLICK
      if (e.button == 2) {
        e.preventDefault(); e.stopPropagation();
        if (this.game.startGameInfoText || this.game.finishGameInfoText || this.game.waitingGameInfoText) return;

        if (this.game.inventory.readArray.readType !== null) return;
        this.getActualCursor()
        this.changeGameOrInventory()
      }

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
      if (e.button == 0 && this.game.currentState == 'game' && ( $(e.target).attr('id') == 'text-box-close-button' || $(e.target).closest('#text-box').length )) {
        e.preventDefault(); e.stopPropagation();

        // START GAME TEXT REMOVE
        if (this.game.startGameInfoText) {          
          this.game.startGameInfoText = false
          this.game.waitingGameInfoText = false
          $('#text-box-text').html('')
        }

        this.game.sound.play(300 /* click1 */, { volume: 0.1, loop: false })

        $("#text-box").removeClass('text-box-centered').hide()
        return;
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
      // STOP PLAYER MOVE
      if (!this.game.move.active) {
         e.preventDefault(); e.stopPropagation();
         console.log('itt...1')
         
        return;
      }

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
        console.log('this.game.playerMouse:')
        console.log(this.game.playerMouse)
        console.log('---')
        console.log('this.game.loadedLights:')
        console.log(this.game.loadedLights)
      }

      if (e.key == 'o') {
        console.log('---')
        console.log(this.game.config)
        console.log(this.game.loadedTextures)
        console.log(this.game.loadedSounds)
    
        console.log(this.game.beingsList)
        console.log(this.game.heandsList)
        console.log(this.game.objectsList)
        console.log('-!-')
        console.log(this.game.renderer.info)
        console.log('-!-')
      }

      if (e.key == 'h') {
        // CHET
        this.game.playerObjects.push(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22)
        this.game.inventory.update()

        this.game.playerMouse.knife = true
        this.game.playerMouse.lamp = true
        this.game.playerMouse.cigarette = true

        this.game.map.player.energy = 80
        this.game.energyModifyScreen()
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

            if (this.fistInteraction) $('#first-interaction-button').trigger('click');

          } else if (this.game.currentState =='menu' || this.game.currentState =='inventory') {
            this.game.playerMouse.selectedObject = null
            this.game.play = true
            this.game.currentState = 'game'
            this.game.showHideOptions('game')
          }
        }

        if(e.key =='0') {
          e.preventDefault(); e.stopPropagation();
          this.game.gameplay.removeHeandLight()
          this.resetautoMovePlayerData()

          this.game.playerMouse.selectedHeand = 0
          this.game.playerMouse.mouseMaxPitch = this.game.mouseMaxPitchDefault
          this.game.playerMouse.mouseMinPitch = this.game.mouseMinPitchDefault
        }

        if(e.key =='1') {
          e.preventDefault(); e.stopPropagation();

           console.log(this.game.playerMouse.lamp)

          if (!this.game.playerMouse.lamp) return;

          this.game.gameplay.removeHeandLight()
          this.resetautoMovePlayerData()

          const camQuat = new THREE.Quaternion()
          this.game.camera.getWorldQuaternion(camQuat)          
          const euler = new THREE.Euler().setFromQuaternion(camQuat, 'YXZ') // X → pitch (fel–le nézés)

          // AUTO MOVE PLAYER HEAND CENTER
          if (THREE.MathUtils.radToDeg(euler.x) < 25 && THREE.MathUtils.radToDeg(euler.x) > -30) {
            this.game.playerMouse.selectedHeand = 1
            this.game.playerMouse.mouseMaxPitch = 25
            this.game.playerMouse.mouseMinPitch = -30
          } else {
            // console.log('Wrong!!!')
            this.game.autoMovePlayerData = {
              ...this.game.autoMovePlayerData,
              mode: 'y-center',
              weapon: 1,
            }
          }
        }

        if(e.key =='2') {
          e.preventDefault(); e.stopPropagation();

          console.log(this.game.playerMouse.knife)

          if (!this.game.playerMouse.knife) return;

          this.game.gameplay.removeHeandLight()
          this.resetautoMovePlayerData()

          if (this.game.playerMouse.selectedHeand != 2) this.game.sound.play(210, {volume: 1})

          this.game.playerMouse.selectedHeand = 2
          this.game.playerMouse.mouseMaxPitch = this.game.mouseMaxPitchDefault
          this.game.playerMouse.mouseMinPitch = this.game.mouseMinPitchDefault

        }

        if (e.key == 'Shift' && this.game.playerMouse.selectedHeand == 2) {
          e.preventDefault(); e.stopPropagation();
          if (this.game.playerMouse.playerAttack) return;

          this.game.sound.play(this.game.gameplay.getArrayRandomId([210, 211]), {volume: 1})

          this.game.playerMouse.playerAttack = true

          setTimeout(() => {
            this.game.playerMouse.playerAttack = false
            this.game.gameplay.playerAttack()
          }, 500)

          return;
        }

        if(e.key =='3') {
          e.preventDefault(); e.stopPropagation();

          console.log(this.game.playerMouse.cigarette)

          if (!this.game.playerMouse.cigarette) return;

          this.game.gameplay.removeHeandLight()
          this.resetautoMovePlayerData()

          this.game.playerMouse.selectedHeand = 3
          this.game.playerMouse.mouseMaxPitch = this.game.mouseMaxPitchDefault
          this.game.playerMouse.mouseMinPitch = this.game.mouseMinPitchDefault

          this.game.sound.play(204, {volume: 0.7})
        }

        if(e.key =='5') {
          e.preventDefault(); e.stopPropagation();
          console.log('-----')
          console.log('-----')
          console.log(this.game.timers) 
        }

        if(e.key =='6') {
          e.preventDefault(); e.stopPropagation();
          // console.log(this.game.renderer.info)
          console.log('6.')

          this.game.forceClearAllTimers()

          // DELETE ALL PLAYING SOUNDS
          this.game.sound.removeAllPlayedAudio()

          // DELETE ALL MESHS
          this.game.deleteAllObjectInScene(this.game.scene)
          this.game.deleteAllObjectInScene(this.game.heandScene)

          this.game.loadedLights = []
          this.game.loadedBeings = []
          this.game.loadedHeands = []
          this.game.loadedMeshs = []

          // inventory datas
          this.game.playerObjects = this.game.playerObjectsDefault
          console.log(this.game.playerObjects)

          this.game.mapLoading = false

          // this.game.currentState = 'menu'
          // this.game.showHideOptions(this.game.currentState)
        }

        if(e.key =='8') {
          e.preventDefault(); e.stopPropagation();
          $("#loading-container").toggle()
        }

        if(e.key =='9') {
          e.preventDefault(); e.stopPropagation();
          $("#loading-container").toggle()

          console.log(this.game.renderer.info)
 
          this.game.graphics.resetScene()
          
          // $("#loading-console").html('')

          this.game.currentState = 'menu'
          this.game.showHideOptions(this.game.currentState)
        }

        if(e.key =='Enter') {
          e.preventDefault(); e.stopPropagation();
          this.changeGameOrInventory()
        }

        // POINTERLOCK MOUSE
        if (e.key == 'f' || e.key == 'F') {
          e.preventDefault(); e.stopPropagation();
          if (this.game.startGameInfoText || this.game.finishGameInfoText || this.game.waitingGameInfoText) return;

          $('#text-box-text').html('')
          $('#text-box').hide()
          this.changeMouseLock()
          return
        }

        // USE MOUSE MODE
        if (e.key == 'e' || e.key == 'E') {
          e.preventDefault(); e.stopPropagation();
          this.useSelectorChange()
          return
        }

        // LOOK MOUSE MODE
        if (e.key == 'q' || e.key == 'Q') {
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

        // BLOOD
        if ((e.key == 'z' || e.key == 'Z') && this.game.currentState == 'game') {
          this.game.modifyPlayerEnergy(1.2)
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
                this.game.inventory.inventoryMenu.reloadInventory = true
              }
            }

            if (e.key == 'ArrowDown' || e.key == 's' || e.key == 'S') {
              if (this.game.inventory.inventoryMenu.selectedPosition < this.game.inventory.inventoryMenu.selectedLength - 1) {
                this.game.inventory.inventoryMenu.selectedPosition++
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

      // GAME KEYS
      if (this.game.currentState == 'menu') {
        return
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
    this.removeUsedObject()
    this.game.play = true
    this.game.currentState = 'game'
    this.game.showHideOptions('game')

    if (e) e.stopPropagation();
    if (e) e.preventDefault();
  }

  changeGameOrInventory() {
    if (this.game.currentState == 'game') {
      // GO INVENTORY
      $("#game-blood").removeClass("play")
      if (document.pointerLockElement === this.game.canvas) document.exitPointerLock();
      this.setDefaultCursor()
      this.game.play = false
      this.game.currentState = 'inventory'
      this.game.showHideOptions('inventory')

    } else if (this.game.currentState == 'inventory') {
      // BACK GAME
      $("#game-blood").removeClass("play")
      this.removeUsedObject()
      this.game.play = true
      this.game.currentState = 'game'
      this.game.showHideOptions('game')
    }
  }

  removeUsedObject() {
    this.game.playerMouse.selectedObject = null
    $("#cursor-text-box").hide().html('')
    this.getActualCursor()
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
        if (this.game.inventory.readArray.readType == 'letter') this.game.inventory.loadLetterPage();
        if (this.game.inventory.readArray.readType == 'photo') this.game.inventory.loadPhotoPage();
        if (this.game.inventory.readArray.readType == 'note') this.game.inventory.loadNotePage();
        if (this.game.inventory.readArray.readType == 'book') this.game.inventory.loadBookPage();
      }
    }
  }

  // -- CURSOR OPTIONS
  removeAllCursorClass() {
    $("html").removeClass('cursor-default').removeClass('cursor-look-on').removeClass('cursor-look-off').removeClass('cursor-use-on').removeClass('cursor-use-off').removeClass('cursor-get-on').removeClass('cursor-get-off')
  }

  setDefaultCursor() {
    this.removeAllCursorClass()
    $("html").addClass('cursor-default')
  }

  setGetCursor() {
    this.removeAllCursorClass()
    $("html").addClass('cursor-get')
  }

  getActualCursor() {
    if (this.game.currentState == 'game') {
      if (this.game.playerMouse.mode == 'use') this.useSelectorChange()
      if (this.game.playerMouse.mode == 'look') this.lookSelectorChange()

    } else if (this.game.currentState == 'inventory') {
      this.setDefaultCursor()
    }
  }

  useSelectorChange() {    
    // TURN OFF POINTERLOCK
    if (document.pointerLockElement) document.exitPointerLock();
    this.game.isPointerLocked = false
    $('#mouseorkey-selector').removeClass('mouse-selector-pic').addClass('key-selector-pic')

    this.game.playerMouse.mode = 'use'
    this.removeAllCursorClass()
    $("html").addClass('cursor-use-off')
  }

  lookSelectorChange() {
    // TURN OFF POINTERLOCK
    if (document.pointerLockElement) document.exitPointerLock();
    this.game.isPointerLocked = false
    $('#mouseorkey-selector').removeClass('mouse-selector-pic').addClass('key-selector-pic')

    this.game.playerMouse.mode = 'look'
    this.removeAllCursorClass()
    $("html").addClass('cursor-look-off')
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
    console.log(this.game.move.rotateDeg)
    
    this.game.rotateSpeed = THREE.MathUtils.degToRad(this.game.move.rotateDeg)
    this.game.keysPressed = new Set()

    this.game.isGrounded = false
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

      if (e.key == 'c' || e.key == 'C') {
        e.preventDefault()
        e.stopPropagation()
      
        if (this.isCrouching) return
      
        const player = this.game.player
        const box = this.game.playerBoundingBox
      
        this.originalHeight = box.y
      
        const newHeight = this.originalHeight * 0.5
        const diff = this.originalHeight - newHeight
      
        box.y = newHeight
        // player.position.y -= diff / 2
      
        this.isCrouching = true
        this.game.jumpState.isLocked = true
      }
    })

    window.addEventListener('keyup', (e) => {
      if (typeof e.key == 'string') this.game.keysPressed.delete(e.key.toLowerCase())
      
      if (e.key == 'c' || e.key == 'C') {
        e.preventDefault()
        e.stopPropagation()
    
        if (!this.isCrouching) return
    
        const player = this.game.player
        const box = this.game.playerBoundingBox
    
        const diff = this.originalHeight - box.y
    
        box.y = this.originalHeight
        player.position.y += diff
    
        this.isCrouching = false
        this.game.jumpState.isLocked = false
      }
    })

    // SEE UP / DOWN
    document.addEventListener('wheel', (e) => {
      if (this.game.currentState != 'game' || this.game.isPointerLocked) return
  
      const pitchLimit = THREE.MathUtils.degToRad(this.game.playerMouse.mouseMaxPitch)
  
      if (e.deltaY > 0) {
        this.game.pitchObject.rotation.x -= this.game.rotateSpeed 
      } else {
        this.game.pitchObject.rotation.x += this.game.rotateSpeed
      }
  
      this.game.pitchObject.rotation.x = Math.max(
        -pitchLimit,
        Math.min(pitchLimit, this.game.pitchObject.rotation.x)
      )
    })

  }

  willCollide(testPos) {
    const size = this.game.playerBoundingBox.clone()
  
    // HEAD AND JUMP CORRECTION
    const center = testPos.clone()
    
    center.y += (this.game.playerYModify - size.y / 2)
  
    const cameraBox = new THREE.Box3().setFromCenterAndSize(center, size)
  
    return this.game.boundingBoxes.some(box =>
      box.intersectsBox(cameraBox)
    )
  }
  
  hasGround(testPos) {
    const size = this.game.playerBoundingBox.clone()
  
    size.x *= 0.75
    size.z *= 0.75
    size.y = 0.08
  
    const center = testPos.clone()
    center.y += this.game.playerYModify - this.game.playerBoundingBox.y / 2 - 0.04
  
    const groundBox = new THREE.Box3().setFromCenterAndSize(center, size)
  
    return this.game.boundingBoxes.some(box =>
      box.intersectsBox(groundBox)
    )
  }
  
  testMove(offset, allowStep = false) {
    const player = this.game.player
    const start = player.position.clone()
  
    if (this.game.ghostMode) {
      player.position.add(offset)
      return true
    }
  
    const isHorizontalMove = offset.y == 0
    const startHasGround = this.hasGround(start)
  
    // 1) Teljes mozgás
    const target = start.clone().add(offset)
    if (!this.willCollide(target)) {
      if (isHorizontalMove && startHasGround && !this.hasGround(target)) return false
  
      player.position.copy(target)
      return true
    }
  
    // 2) Tengelyenkénti csúsztatás
    let moved = false
    let blocked = false
  
    const dx = new THREE.Vector3(offset.x, 0, 0)
    const tryX = start.clone().add(dx)
    if (!this.willCollide(tryX) && (!isHorizontalMove || !startHasGround || this.hasGround(tryX))) {
      player.position.copy(tryX)
      moved = true
    } else blocked = true
  
    const dz = new THREE.Vector3(0, 0, offset.z)
    const tryZ = player.position.clone().add(dz)
    if (!this.willCollide(tryZ) && (!isHorizontalMove || !startHasGround || this.hasGround(tryZ))) {
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
      // console.log('PointerLock OFF...')
      document.exitPointerLock()
      $('#mouseorkey-selector').addClass('key-selector-pic')
    } else {
      // console.log('PointerLock ON...')
      this.game.canvas.requestPointerLock()
      $('#mouseorkey-selector').addClass('mouse-selector-pic')
    }
  }

  mousePointerClickLoader() {
    this.game.isPointerLocked = false

    document.addEventListener('mousedown', (e) => {
      if (document.pointerLockElement) {
        document.exitPointerLock()
        $('#mouseorkey-selector').removeClass('mouse-selector-pic').addClass('key-selector-pic')
        console.log('MOUSE: Kiléptél a pointer lockból')
      }
    });

    document.addEventListener('pointerlockchange', () => {
      this.game.isPointerLocked = document.pointerLockElement == this.game.canvas
    });

    $(document).on('mousemove', { game: this.game }, function(event) {
      const g = event.data.game
      if (!g.isPointerLocked) return

      const movementX = event.originalEvent.movementX || 0
      const movementY = event.originalEvent.movementY || 0

      g.player.rotation.y -= movementX * 0.002
      g.pitchObject.rotation.x -= movementY * 0.002

      const maxPitch = THREE.MathUtils.degToRad(g.playerMouse.mouseMaxPitch)
      const minPitch = THREE.MathUtils.degToRad(g.playerMouse.mouseMinPitch)

      g.pitchObject.rotation.x = Math.max(minPitch, Math.min(maxPitch, g.pitchObject.rotation.x))
      g.camera.rotation.z = 0
    })
  }

  updatePlayer(deltaTime = 16.6667) {
    const deltaRatio = Math.min(deltaTime / 16.6667, 3)

    const shift = this.game.keysPressed.has('shift')
    let moved = false;

    const direction = new THREE.Vector3(-Math.sin(this.game.player.rotation.y), 0, -Math.cos(this.game.player.rotation.y)).normalize()

    if (this.game.keysPressed.has('w') || this.game.keysPressed.has('W') || this.game.keysPressed.has('arrowup')) {

      this.speedController(true, 'w', deltaRatio)
      this.game.move.playerRotationY = this.game.player.rotation.y

      if (shift) {
        if (!moved) {
          moved = this.game.ghostMode
          ? this.testMove(new THREE.Vector3(0, this.game.move.speed * deltaRatio, 0))
          : this.testMove(direction.clone().multiplyScalar(this.game.move.speed * 1.6 * deltaRatio), true)
        }
      } else {
        if (!moved) {
          moved = this.testMove(direction.clone().multiplyScalar(this.game.move.speed * deltaRatio), true)
        }
      }
    }

    if (this.game.keysPressed.has('s') || this.game.keysPressed.has('S') || this.game.keysPressed.has('arrowdown')) {

      this.speedController(true, 's', deltaRatio)
      this.game.move.playerRotationY = this.game.player.rotation.y

      if (shift) {
        if (!moved) {
          moved = this.game.ghostMode
          ? this.testMove(new THREE.Vector3(0, -this.game.move.speed * deltaRatio, 0))
          : this.testMove(direction.clone().multiplyScalar(-this.game.move.speed * 1.6 * deltaRatio))
        }
      } else {
        if (!moved) {
          moved = this.testMove(direction.clone().multiplyScalar(-this.game.move.speed * deltaRatio))
        }
      }
    }

    if (this.game.keysPressed.has('a') || this.game.keysPressed.has('A') || this.game.keysPressed.has('arrowleft')) {
      if (shift || this.game.isPointerLocked) {

        this.speedController(true, 'a', deltaRatio)
        this.game.move.playerRotationY = this.game.player.rotation.y
        this.game.move.cameraUp = this.game.camera.up

        const left = new THREE.Vector3().crossVectors(this.game.camera.up, direction).normalize().multiplyScalar(this.game.move.speed * deltaRatio)
        moved ||= this.testMove(left)

      } else {
        this.game.player.rotation.y += this.game.rotateSpeed * deltaRatio
        moved = true
      }
    }

    if (this.game.keysPressed.has('d') || this.game.keysPressed.has('D') || this.game.keysPressed.has('arrowright')) {
      if (shift || this.game.isPointerLocked) {

        this.speedController(true, 'd', deltaRatio)
        this.game.move.playerRotationY = this.game.player.rotation.y
        this.game.move.cameraUp = this.game.camera.up

        const right = new THREE.Vector3().crossVectors(direction, this.game.camera.up).normalize().multiplyScalar(this.game.move.speed * deltaRatio)
        moved ||= this.testMove(right)

      } else {
        this.game.player.rotation.y -= this.game.rotateSpeed * deltaRatio
        moved = true
      }
    }

    if (!this.game.move.push && this.game.move.speed > 0) this.speedController(false, null, deltaRatio)
    this.game.move.push = false

    const pitchLimit = THREE.MathUtils.degToRad(80)

    if (this.game.keysPressed.has('pagedown')) {
      this.game.pitchObject.rotation.x -= this.game.rotateSpeed * deltaRatio;
      this.game.pitchObject.rotation.x = Math.max(-pitchLimit, Math.min(pitchLimit, this.game.pitchObject.rotation.x))
    }

    if (this.game.keysPressed.has('pageup')) {
      this.game.pitchObject.rotation.x += this.game.rotateSpeed * deltaRatio;
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
      const maxJumpHeight = Math.min(elapsed / this.game.jumpState.duration, 1)
      const newY = THREE.MathUtils.lerp(this.game.jumpState.startY, this.game.jumpState.targetY, maxJumpHeight)

      const jumpOffset = new THREE.Vector3(0, newY - this.game.player.position.y, 0)
      const testPos = this.game.player.position.clone().add(jumpOffset)

      if (!this.willCollide(testPos)) {
        this.game.player.position.y = newY
      } else {
        this.game.jumpState.isJumping = false
      }

      if (maxJumpHeight >= 0.6) this.game.jumpState.isJumping = false
    }

    // ----- GRAVITY -----
    if (!this.game.jumpState.isJumping) {
      const gravityOffset = (this.game.gravity)
        ? new THREE.Vector3(0, this.game.currentGravity * deltaRatio, 0)
        : new THREE.Vector3(0, 0, 0)

      const testPos = this.game.player.position.clone().add(gravityOffset)

      if (!this.willCollide(testPos)) {
        // if (moved && this.game.isGrounded) return moved

        this.game.player.position.add(gravityOffset)
        this.game.isGrounded = false
      } else {
        this.game.isGrounded = true
      }
    }
    return moved;
  }

  old_speedController(deltaRatio = 1, push, key) {
    if (push) {
      this.game.move.push = true
      this.game.move.key = key

      if (this.game.move.speed < this.game.move.max) this.game.move.speed += this.game.move.add * deltaRatio;
    } else {
      this.game.move.speed *= this.game.move.sub ** deltaRatio // / ** hatványozás

      if (this.game.move.speed < 0.001) {
        this.game.move.speed = 0
        this.game.move.key = ''
      } else {
        const direction = new THREE.Vector3(-Math.sin(this.game.move.playerRotationY), 0, -Math.cos(this.game.move.playerRotationY)).normalize()
        switch(this.game.move.key) {
          case 'w':
            this.testMove(direction.clone().multiplyScalar(this.game.move.speed), true)
          break
          case 's':
            this.testMove(direction.clone().multiplyScalar(-this.game.move.speed));
          break
          case 'a':
           this.testMove(new THREE.Vector3().crossVectors(this.game.move.cameraUp, direction).normalize().multiplyScalar(this.game.move.speed));
          break
          case 'd':
            this.testMove(new THREE.Vector3().crossVectors(direction, this.game.move.cameraUp).normalize().multiplyScalar(this.game.move.speed))
          break
        }
      }
    }
  }

  speedController(push, key = null, deltaRatio = 1) {
    if (push) {
      this.game.move.push = true
      this.game.move.key = key

      if (this.game.move.speed < this.game.move.max) {
        this.game.move.speed += this.game.move.add * deltaRatio
        this.game.move.speed = Math.min(this.game.move.speed, this.game.move.max)
      }
    } else {
      this.game.move.speed *= this.game.move.sub ** deltaRatio

      if (this.game.move.speed < 0.001) {
        this.game.move.speed = 0
        this.game.move.key = ''
      } else {
        const direction = new THREE.Vector3(-Math.sin(this.game.move.playerRotationY), 0, -Math.cos(this.game.move.playerRotationY)).normalize()
        const moveSize = this.game.move.speed * deltaRatio

        switch(this.game.move.key) {
          case 'w':
            this.testMove(direction.clone().multiplyScalar(moveSize), true)
          break

          case 's':
            this.testMove(direction.clone().multiplyScalar(-moveSize))
          break

          case 'a':
            this.testMove(new THREE.Vector3().crossVectors(this.game.move.cameraUp, direction).normalize().multiplyScalar(moveSize))
          break

          case 'd':
            this.testMove(new THREE.Vector3().crossVectors(direction, this.game.move.cameraUp).normalize().multiplyScalar(moveSize))
          break
        }
      }
    }
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

    //-- 1. CHECK FISRT HIT MESH
    let sceneIntersects = raycaster.intersectObjects(Object.values(this.game.loadedMeshs), true)

    for (const action of this.game.map.actionelements) {
      if (action[1].conditions.click == clickType) {
        const intersects = raycaster.intersectObjects(action[0].children, true)
        // IF HAVE CLICK SHOT MESH
        if (intersects.length > 0) {          

          // 2. CHECK FISRT HIT MESH
          let sceneIntersects = raycaster.intersectObjects(Object.values(this.game.loadedMeshs), true)
          let firstSolidIntersect = sceneIntersects.find(hit => !hit.object.parent?.pervious)

          if (firstSolidIntersect?.object.parent.name != intersects[0].object.parent.name) continue;
          // SKIP IF NOT ACTIVE
          if (!intersects[0].object.parent.visible) continue;

          const cameraPos = new THREE.Vector3()
          this.game.camera.getWorldPosition(cameraPos)
          const hitPoint = intersects[0].point
          const distance = cameraPos.distanceTo(hitPoint)

          // IF LOOK MODE AND HAVE TEXT
          if (this.game.playerMouse.mode == 'look' && action[0].text && distance < action[1].conditions.distance_far) {

            this.game.sound.play(300 /* click1 */, { volume: 0.1, loop: false })

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

          // IF USE MODE
          if (this.game.playerMouse.mode == 'use' && this.game.currentState == 'game') this.game.gameplay.checkActions(Date.now(), 'click', action, distance);

        }
      }
    }

    // REMOVE-CURSOR
    this.getActualCursor()
    this.game.playerMouse.selectedObject = null
    $('#cursor-text-box').hide().html('')
  }
}