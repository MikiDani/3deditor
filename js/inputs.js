import { Vec3D } from './data.js';

export class Inputs {
  angleToRandian;
  radianToAngle;
  state;
  game;
  player;
  keys;
  moveScale;
  constructor(textures, graph, state, angleToRandian, radianToAngle) {
    this.textures = textures
    this.graph = graph
    this.angleToRandian = angleToRandian
    this.radianToAngle = radianToAngle

    this.state = state

    this.options = {
      fill: false,
      textured: true,
      grid: false
    }

    this.moveScale = 0.15
    this.rotateScale = 0.115
    
    this.keys = {}

    // Disable default event listeners
    document.addEventListener('keydown', (event) => {
      if (event.code == 'Space') event.preventDefault()
    });

    // Add keys
    document.addEventListener('keydown', this.keydownHandler)
    document.addEventListener('keyup', this.keyupHandler)

    this.lookMouseApi()
  }

  keydownHandler = (event) => {
    // console.log(this.keys)
    this.keys[event.code] = true
  }

  keyupHandler = (event) => {
    this.keys[event.code] = false
  }

  // MOUSE MOVE
  lookMouseApi() {
    document.body.requestPointerLock = document.body.requestPointerLock || document.body.mozRequestPointerLock || document.body.webkitRequestPointerLock;
    document.getElementById("screen-canvas").addEventListener('click', function() {      
      document.body.requestPointerLock();
    });

    document.addEventListener('mousemove', (event) => {
      if (document.pointerLockElement == document.body) {
        // console.log("Elmozdulás X:", event.movementX, "Elmozdulás Y:", event.movementY);
        if (this.graph.fXaw + event.movementY*0.01 > -1.5 && this.graph.fXaw + event.movementY*0.01 < 1.5) this.graph.fXaw += event.movementY*0.01;
        this.graph.fYaw += event.movementX*0.01
      }
    });

    // END POINTER CLICK (ESC)
    document.addEventListener('pointerlockchange', function() {
      if (document.pointerLockElement == document.body) {
        console.log("Pointer lock aktív");
      } else {
        console.log("Pointer lock megszűnt");
      }
    });
  }

  stopGame() {
    // console.log(this.state.gameLoopId)
    if (this.state.gameLoopId) {
      cancelAnimationFrame(this.state.gameLoopId)
      this.state.gameLoopId = null
      console.log('STOP GAME')
    }
  }

  movePlayer() {
    if (this.keys['ArrowUp']) {
      // console.log('move up')
      this.graph.vCamera.y += this.moveScale
    }

    if (this.keys['ArrowDown']) {
        // console.log('move down')
        this.graph.vCamera.y -= this.moveScale
    }

    if (this.keys['ArrowLeft']) {
      // console.log('move left')
      this.graph.vCamera.x += this.moveScale
    }

    if (this.keys['ArrowRight']) {
        // console.log('move right')
        this.graph.vCamera.x -= this.moveScale
    }

    // FPS move
    if (this.keys['KeyW'] && !this.keys['ShiftLeft']) {
      // console.log('move foward')
      let vForward = new Vec3D()
      vForward = this.graph.vector_Mul(this.graph.vLookDir, this.moveScale)
      
      this.graph.vCamera = this.graph.vector_Add(this.graph.vCamera, vForward)
    }

    if (this.keys['KeyS'] && !this.keys['ShiftLeft']) {
      // console.log('move back')
      let vForward = new Vec3D()
      vForward = this.graph.vector_Mul(this.graph.vLookDir, this.moveScale)

      this.graph.vCamera = this.graph.vector_Sub(this.graph.vCamera, vForward)
    }

    if (this.keys['KeyA'] && !this.keys['ShiftLeft']) {
      // console.log('turn left')
      // console.log(this.graph.fYaw)
      this.graph.fYaw -= this.rotateScale
    }

    if (this.keys['KeyD'] && !this.keys['ShiftLeft']) {
      // console.log('turn right')
      // console.log(this.graph.fYaw)
      this.graph.fYaw += this.rotateScale
    }

    // FPS SHIFT move
    if (this.keys['KeyW'] && this.keys['ShiftLeft']) {
      // console.log('up')
      this.graph.vCamera.y += this.moveScale
    }

    if (this.keys['KeyS'] && this.keys['ShiftLeft']) {
      // console.log('down')
      this.graph.vCamera.y -= this.moveScale
    }

    if (this.keys['KeyR'] && !this.keys['ShiftLeft']) {
      // console.log('SEE UP')
      // console.log(this.graph.fXaw)
      
      if (this.graph.fXaw - this.rotateScale > -1.5 && this.graph.fXaw - this.rotateScale < 1.5) this.graph.fXaw -= this.rotateScale;
      
    }
    
    if (this.keys['KeyF'] && !this.keys['ShiftLeft']) {
      // console.log('SEE DOWN')
      // console.log(this.graph.fXaw)
      if (this.graph.fXaw + this.rotateScale > -1.5 && this.graph.fXaw + this.rotateScale < 1.5) this.graph.fXaw += this.rotateScale;
    }

    //---

    if (this.keys['Backquote']) this.stopGame();

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
}
