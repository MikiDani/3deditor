import * as THREE from 'three'
import $ from 'jquery'
import * as bootstrap from 'bootstrap'

export default class Input {
  constructor(game) {
    this.game = game

    this.selectedObjectIndex = 1 // !!! ide kell ?

    this.gravity = 0

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
    $('.btn-close').on('click', function () {
      setTimeout(function () {
        if (document.activeElement) {
          document.activeElement.blur()
        }
      }, 10);
    });

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
      const modal = bootstrap.Modal.getInstance(document.getElementById('myModal'))
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

    this.setupCameraControls()
    this.mousePointerClickLoader()

    $(document).on('keydown', (e) => {
      if(e.key =='Escape') {        
        const modal = bootstrap.Modal.getInstance(document.getElementById('myModal'))
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

      if (e.key == 'i') {
        console.log(this.map.lod)
        
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

      if (e.key == 'f') {
        if (document.pointerLockElement === this.game.canvas) {
          console.log('PointerLock kikapcsolás...')
          document.exitPointerLock()
        } else {
          console.log('PointerLock bekapcsolás...')
          this.game.canvas.requestPointerLock()
        }
      }

      if (e.key == 'n') {
        console.log('INVENTORY')
        this.game.play = false
        this.game.currentState = 'inventory'
        this.game.showHideOptions('inventory')
      }

      if (this.game.currentState == 'inventory') {
        console.log('INVENTORY')

        console.log(e.key)

        if (e.key == ' ') {
          console.log('space!')

          console.log(this.game.inventory.selectedObjectId)
          this.game.loadedObjects[this.game.inventory.selectedObjectId].visible = false

          this.selectedObjectIndex = Number(this.selectedObjectIndex) + 1;

          if (this.selectedObjectIndex == 4) this.selectedObjectIndex = 1;
          console.log(this.selectedObjectIndex)          

          let obj = this.game.loadedObjects.find(obj => obj && obj.index == this.selectedObjectIndex)
          let objectId = obj ? obj.id : null

          if (objectId) this.game.inventory.selectedObjectId = objectId;
        }        
      }
    });

    this.game.inputsLoading = true
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

    if (this.game.keysPressed.has('w')) {
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

    if (this.game.keysPressed.has('s')) {
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

    if (this.game.keysPressed.has('a')) {
      if (shift || this.game.isPointerLocked) {
        const left = new THREE.Vector3().crossVectors(this.game.camera.up, direction).normalize().multiplyScalar(this.game.moveSpeed)
        moved ||= this.testMove(left);
      } else {
        this.game.player.rotation.y += this.game.rotateSpeed
        moved = true
      }
    }

    if (this.game.keysPressed.has('d')) {
      if (shift || this.game.isPointerLocked) {
        const right = new THREE.Vector3().crossVectors(direction, this.game.camera.up).normalize().multiplyScalar(this.game.moveSpeed)
        moved ||= this.testMove(right)
      } else {
        this.game.player.rotation.y -= this.game.rotateSpeed
        moved = true
      }
    }

    const pitchLimit = THREE.MathUtils.degToRad(80);

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

  actionsClicksCheck() {
    let clickTimer;
  
    // MOUSEDOWN
    $(document).on('mousedown', (event) => {
      clickTimer = setTimeout(() => {
        this.handleClickEvent(event, 'mousedown');
      }, 150);
    });
  
    // DBLCLICK
    $(document).on('dblclick', (event) => {
      clearTimeout(clickTimer);
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

    this.game.map.actionelements.forEach(action => {
      if (action[1].conditions.click == clickType) {

        const intersects = raycaster.intersectObjects(action[0].children, true)
        // IF HAVE CLICK SHOT MESH
        if (intersects.length > 0) {
          const intersect = intersects[0]
          const cameraPos = new THREE.Vector3()
          this.game.camera.getWorldPosition(cameraPos)
          const hitPoint = intersect.point
          const distance = cameraPos.distanceTo(hitPoint)

          // console.clear()

          this.game.gameplay.checkActions(action, distance)
        }
      }
    });
  }
}