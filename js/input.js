import * as THREE from 'three'
import $ from 'jquery'
import * as bootstrap from 'bootstrap'

export default class Input {
  constructor(game) {
    this.game = game
    this.gravity = 0

    this.ideiglenesMenuInputs() // ! Ideiglenes
  }

  async ideiglenesMenuInputs() {
    const response = await this.game.loader.fetchData({ ajax: true, getfiles: true })  
    if (response?.files) {
      // console.log(response.files)
      let elements = '';
      for (const file of response.files) {
        elements += `<div class="filename text-start cursor-pointer">• <span>${file.name}</span></div>`
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

    $('#filelist-container .filename').on('click', (event) => {
      let $this = $(event.target)
      $('#file-input').val($this.find('span').text())
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
        console.log('map.player')
        console.log(this.game.map.player)
        console.log(this.game.map.player.x)
        console.log(this.game.map.player.y)
        console.log(this.game.map.player.z)
    
        console.log(this.game.map.player.fYaw)
        console.log(this.game.map.player.fXaw)
      }

      if (e.key == 'm') {
        console.log('PointerLock...')
        this.game.canvas.requestPointerLock()
      }

      if (e.key == 'n') {
        console.log('INVENTORY')
        this.game.play = false
        this.game.currentState = 'inventory'
        this.game.showHideOptions('inventory')
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
      duration: 200
    };

    window.addEventListener('keydown', (e) => this.game.keysPressed.add(e.key.toLowerCase()))
    window.addEventListener('keyup', (e) => this.game.keysPressed.delete(e.key.toLowerCase()))
  }

  willCollide(testPos) {
    const cameraBox = new THREE.Box3().setFromCenterAndSize(testPos, new THREE.Vector3(0.4, 1, 0.4));

    // Statikus objektumok
    let collides = this.game.boundingBoxes.some(box => box.intersectsBox(cameraBox));

    // Dinamikus objektumok
    // collides ||= this.game.dynamicBoundingBoxes.some(entry => entry.box.intersectsBox(cameraBox));  // !!

    return collides;
  }

  attemptMove(offset) {    
    const testPosFull = this.game.player.position.clone().add(offset)

    if (this.game.ghostMode) {
      this.game.player.position.add(offset)
      return true;
    } 

    if (!this.willCollide(testPosFull)) {
      this.game.player.position.add(offset)
      return true;
    }

    const testOffsetX = new THREE.Vector3(offset.x, 0, 0)
    const testPosX = this.game.player.position.clone().add(testOffsetX)
    const xOK = !this.willCollide(testPosX)

    const testOffsetZ = new THREE.Vector3(0, 0, offset.z)
    const testPosZ = this.game.player.position.clone().add(testOffsetZ)
    const zOK = !this.willCollide(testPosZ)

    if (xOK) this.game.player.position.add(testOffsetX)
    if (zOK) this.game.player.position.add(testOffsetZ)

    return xOK || zOK;
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

  updateCamera() {
    const shift = this.game.keysPressed.has('shift')
    let moved = false;

    const direction = new THREE.Vector3(-Math.sin(this.game.player.rotation.y), 0, -Math.cos(this.game.player.rotation.y)).normalize()

    if (this.game.keysPressed.has('w')) {
      if (shift) {
        if (!moved) {          
          moved = this.attemptMove(new THREE.Vector3(0, this.game.moveSpeed, 0))
        }
      } else {
        if (!moved) {
          moved = this.attemptMove(direction.clone().multiplyScalar(this.game.moveSpeed))
        }
      }
    }

    if (this.game.keysPressed.has('s')) {
      if (shift) {
        if (!moved) {
          moved = this.attemptMove(new THREE.Vector3(0, -this.game.moveSpeed, 0))
        }
      } else {
        if (!moved) {
          moved = this.attemptMove(direction.clone().multiplyScalar(-this.game.moveSpeed))
        }
      }
    }

    if (this.game.keysPressed.has('a')) {
      if (shift) {
        const left = new THREE.Vector3().crossVectors(this.game.camera.up, direction).normalize().multiplyScalar(this.game.moveSpeed)
        moved ||= this.attemptMove(left);
      } else {
        this.game.player.rotation.y += this.game.rotateSpeed
        moved = true
      }
    }

    if (this.game.keysPressed.has('d')) {
      if (shift) {
        const right = new THREE.Vector3().crossVectors(direction, this.game.camera.up).normalize().multiplyScalar(this.game.moveSpeed)
        moved ||= this.attemptMove(right)
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
    if (this.game.keysPressed.has(' ') && this.game.isGrounded && !this.game.jumpState.isJumping) {
      this.game.jumpState.isJumping = true
      this.game.jumpState.startY = this.game.player.position.y
      this.game.jumpState.targetY = this.game.player.position.y + this.game.jumpState.size
      this.game.jumpState.startTime = performance.now()
      this.game.isGrounded = false
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

          console.clear()
          this.game.gameplay.checkActions(action, distance)
        }
      }
    });
  }
}