import { Inputs } from './inputs.js';
import { Graphics } from './graphics.js';
import { Texture } from './data.js';

class Game {
  state;
  player;
  constructor () {

    this.stopGame = false
    this.msWait = 15

    this.state = {
      gameLoopId: null
    };

    this.init()
  }

  async init() {
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

    //---

    this.graph = new Graphics(this.textures, this.state, this.inputs, this.angleToRandian, this.radianToAngle)
    this.inputs = new Inputs(this.textures, this.graph, this.state, this.angleToRandian, this.radianToAngle)
    this.graph.inputs = this.inputs

    this.gameRepeat()
  }

  angleToRandian(angle) {
    return angle * (Math.PI / 180);
  }

  radianToAngle(rad) {
    return rad * (180 / Math.PI);
  }

  gameRepeat() { 
    // Az első frame elindítása
    this.fistTime = Date.now()
    this.state.gameLoopId = requestAnimationFrame(this.gameLoop)
    this.gameLoop
  }

  gameLoop = async () => {   
      var start = Date.now()

      this.graph.clearScreen(this.graph.screenCanvas, this.graph.screenCtx)

      // this.graph.testFloor()
      // this.graph.testTexture()

      this.inputs.movePlayer()
      this.graph.movePlayerInMatrix(0) // 0.005
      this.graph.moveObjectsInMatrix(0) // 0.005
      this.graph.renderScreen()

      this.graph.memoryCtx.putImageData(this.graph.screenData, 0, 0)

      this.graph.infoTable()

      this.graph.screenCtx.drawImage(this.graph.memoryCanvas, 0, 0, this.graph.screenCanvas.width, this.graph.screenCanvas.height)

      this.graph.buffer.fill(0)         // clear memoryCanvas
      this.graph.depthBuffer.fill(0)    // DELETE Depth Buffer

      let frameTime = Date.now() - start

      if (frameTime < this.msWait) {
        let stop = this.msWait - frameTime;
  
        if (stop > 0 && typeof stop === 'number') {  
          await new Promise(resolve => setTimeout(resolve, stop));
        }
      }

      document.getElementById('info-fps').textContent = "Frame time: " + (Date.now() - start) + " ms";
      this.state.gameLoopId = requestAnimationFrame(this.gameLoop)
      // stop game
      if (this.stopGame) {
        if (Date.now() > (this.fistTime + 100)) {
          console.log('Vége a játéknak!!! TIME')
          this.inputs.stopGame()
        }
      }
    
  }
}

const game = new Game()
