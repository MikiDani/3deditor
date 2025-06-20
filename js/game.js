import * as THREE from 'three'
import $ from 'jquery'

import Graphics from './graphics.js'
import Loader from './loader.js'
import Input from './input.js'
import Menu from './menu.js'
import Gameplay from './gameplay.js'
import Inventory from './inventory.js'
import Statemanager from './statemanager.js'

export default class Game {
  constructor() {
    this.loader = new Loader()
    this.stateManager = new Statemanager()
    this.graphics = new Graphics()
    this.menu = new Menu()
    this.inventory = new Inventory()
    this.gameplay = new Gameplay()
    this.input = new Input()

    this.init()
  }

  async init() {
    this.buildHtmlElements()
    await this.loader.generalLoader()
    this.graphics.init()
    this.input.gameControls()

    this.loop()
  }

  buildHtmlElements() {
    const elements = $(`<div id="screen">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laudantium maiores asperiores saepe. Officia quasi officiis iusto error dolores id natus, harum nulla, nam rerum voluptas dignissimos dolorum ut sapiente amet?</div>`)

    $("body").append(elements)
  }

  loop() {
    requestAnimationFrame(() => this.loop())

    switch (this.stateManager.currentState) {
      case 'menu':
        this.menu.update()
        break
      case 'loading':
        this.loader.loadMap()
        break
      case 'playing':
        this.gameplay.update()
        break
      case 'inventory':
        this.inventory.update()
        break
    }

    this.graphics.render()
  }
}

const game = new Game()