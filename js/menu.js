import $ from 'jquery'
import * as bootstrap from 'bootstrap'

export default class Menu {
  constructor(game) {
    this.game = game

    this.memorySave = null
    this.optionsChanged = false

    this.firstInteraction = false

    this.options = {
      hints: false,         // Shows what objects should be used for the given "action"
      darkContrast: 0.004   // Minimum dark contrast options
    }

    this.buildHtml()
    this.init()
  }

  buildHtml() {
    this.game.$menu = $(`
      <div id="menu-container">
        <div class="full-size d-flex justify-content-center align-items-center">
          <div class="delta-time-menu text-white"></div>

          <button id="first-interaction-button" class="btn btn-primary rounded-0" data-bs-toggle="modal" data-bs-target="#topLayer">
            Join the menu
          </button>

          <div class="modal" id="topLayer" tabindex="-1">
            <div class="modal-dialog modal-dialog-centered">
              <div id="menu-bg" class="modal-content">

                <div class="frame-corner-1"></div>
                <div class="frame-corner-2"></div>
                <div class="frame-corner-3"></div>
                <div class="frame-corner-4"></div>

                <div class="menu-frame">
                  <div class="frame-side frame-top">
                    <div class="frame-half frame-half-1"></div>
                    <div class="frame-half frame-half-2"></div>
                    <div class="frame-center"></div>
                  </div>

                  <div class="frame-side frame-right">
                    <div class="frame-half frame-half-1"></div>
                    <div class="frame-half frame-half-2"></div>
                    <div class="frame-center"></div>
                  </div>

                  <div class="frame-side frame-bottom">
                    <div class="frame-half frame-half-1"></div>
                    <div class="frame-half frame-half-2"></div>
                    <div class="frame-center"></div>
                  </div>

                  <div class="frame-side frame-left">
                    <div class="frame-half frame-half-1"></div>
                    <div class="frame-half frame-half-2"></div>
                    <div class="frame-center"></div>
                  </div>
                </div>

                <div class="modal-header border-0 pt-0 mt-0">
                  <div id="menu-logo" class="mt-0 pt-0"></div>
                </div>

                <div class="modal-body">

                  <div id="menu-main" class="menu-panel text-center">
                    <button id="main-start-button" class="d-block btn menu-button-bg menu-text-color mb-2 p-0 rounded-0 mx-auto">New Game</button>
                    <button id="main-load-button" class="d-block btn menu-button-bg menu-text-color mb-2 p-0 rounded-0 mx-auto">Load Game</button>
                    <button id="main-save-button" class="d-block btn menu-button-bg menu-text-color mb-2 p-0 rounded-0 mx-auto" style="display:none;">Save Game</button>
                    <button id="main-end-button" class="d-block btn menu-button-bg menu-text-color mb-2 p-0 rounded-0 mx-auto" style="display:none;">End Game</button>
                    <button id="main-options-button" class="d-block btn menu-button-bg menu-text-color mb-2 p-0 rounded-0 mx-auto">Options</button>
                    <button id="main-information-button" class="d-block btn menu-button-bg menu-text-color p-0 rounded-0 mx-auto">Information</button>
                  </div>

                  <div id="menu-load" class="menu-panel menu-text-color-2" style="display:none;">
                    <h5>Load Game</h5>

                    <div id="local-savegame-list" class="d-flex flex-column justify-content-start align-items-center mb-3"></div>

                    <button id="local-loadgame-button" class="btn btn-success w-100 mb-2">Load</button>
                    <button class="menu-back-button btn btn-dark w-100">Back</button>
                  </div>

                  <div id="menu-save" class="menu-panel menu-text-color-2" style="display:none;">
                    <h5>Save Game</h5>

                    <div class="text-center mb-3">
                      <input id="file-input" type="text" class="w-100" name="filename" value="${this.game.filename}" data-ext="${this.game.ext}">
                    </div>

                    <button id="local-savegame-button" class="btn btn-danger w-100 mb-2">Save</button>
                    <button class="menu-back-button btn btn-dark w-100">Back</button>
                  </div>

                  <div id="menu-options" class="menu-panel menu-text-color-2" style="display:none;">
                    <h5>Options</h5>

                    <div class="my-3">
                      <input type="checkbox" id="hints-button">
                      <span>Hints</span>
                    </div>

                    <div class="my-3">
                      <input type="checkbox" id="darkcontrast-button" checked>
                      <span>Maximum dark contrast</span>
                    </div>

                    <div id="distance-mode-container" class="my-3">
                      <div class="mb-2">Distance Mode</div>

                      <label class="me-2">
                        <input type="radio" name="distance-mode" value="best">
                        Best
                      </label>

                      <label class="me-2">
                        <input type="radio" name="distance-mode" value="medium">
                        Medium
                      </label>

                      <label>
                        <input type="radio" name="distance-mode" value="low" checked>
                        Low
                      </label>
                    </div>

                    <div class="my-3">
                      <input type="checkbox" id="music-button">
                      <span>Music On</span>
                    </div>

                    <div class="my-3">--------</div>

                    <div class="my-3">
                      <input type="checkbox" id="lights-button" checked>
                      <span>All Lights On</span>
                    </div>

                    <div class="my-3">
                      <input type="checkbox" id="ghost-button">
                      <span>Ghost Mode</span>
                    </div>

                    <button class="menu-back-button btn btn-dark w-100">Back</button>
                  </div>

                  <div id="menu-information" class="menu-panel menu-text-color-2" style="display:none;">
                    <h5>Information</h5>
                    <div class="my-4">
                      The Forgotten Cottage
                    </div>
                    <div class="my-4">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis molestias deserunt aliquam nemo recusandae numquam ex ut ratione nisi fugiat aperiam a, harum blanditiis provident quae est eum sit odio.<br>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis molestias deserunt aliquam nemo recusandae numquam ex ut ratione nisi fugiat aperiam a, harum blanditiis provident quae est eum sit odio.
                    </div>
                    <button class="menu-back-button btn btn-dark w-100">Back</button>
                  </div>
                  <div id="local-savegame-message" class="text-center w-100 mt-3"></div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    `)

    $('body').append(this.game.$menu)

    this.game.gravity = this.game.gravityValue
    this.game.lightsOn = true
    this.game.ghostMode = false

    this.showPanel('main')
  }

  init() {
    this.bindEvents()
  }

  bindEvents() {
    $(document).on('click', '#first-interaction-button', () => {
      this.firstInteraction = true
    })

    $('.btn-close').on('click', function () {
      setTimeout(function () {
        if (document.activeElement) document.activeElement.blur()
      }, 10)
    })

    $('#gravity-button').on('click', event => {
      const $this = $(event.currentTarget)

      this.game.gravity = $this.prop('checked')
        ? this.game.gravityValue
        : 0
    })

    $('#lights-button').on('click', event => {
      const $this = $(event.currentTarget)
      this.game.lightsOn = $this.prop('checked')
    })

    $('#ghost-button').on('click', event => {
      const $this = $(event.currentTarget)
      this.game.ghostMode = $this.prop('checked')
    })

    $('#hints-button').on('click', event => {
      const $this = $(event.currentTarget)
      this.options.hints = $this.prop('checked')
    })

    $('#darkcontrast-button').on('click', event => {
      const $this = $(event.currentTarget)

      this.options.darkContrast = $this.prop('checked') ? 0.012 : 0.004
      this.optionsChanged = true
    })
    //0.012
    $('#local-savegame-button').on('click', async () => {
      await this.saveGame()
    })

    $(document).on('click', '.filename-listelement, .savegame-listelement', event => {
      this.selectSavegame(event)
    })

    $(document).on('click', '.del-save-button', async event => {
      await this.deleteSavegame(event)
    })

    $('#local-loadgame-button').on('click', async () => {
      await this.loadGame()
    })

    //-- újak

    $('#main-start-button').on('click', async () => {
      if (this.game.mapLoading) {
        await this.resumeGame()
      } else {
        this.newGame()
      }
    })

    $('#main-load-button').on('click', () => {
      this.showPanel('load')
    })

    $('#main-save-button').on('click', () => {
      this.showPanel('save')
    })

    $('#main-end-button').on('click', () => {
      this.endGame()
    })

    $('#main-options-button').on('click', () => {
      this.showPanel('options')
    })

    $('#main-information-button').on('click', () => {
      this.showPanel('information')
    })

    $('.menu-back-button').on('click', () => {
      this.showPanel('main')
    })

    $('#music-button').on('change', () => {
      this.musicOptions()
    })

    // -- ideiglenes
    $('#lights-button').on('click', event => {
      const $this = $(event.currentTarget)

      this.game.lightsOn = $this.prop('checked')
      this.optionsChanged = true
    })

    $("input[name='distance-mode']").on('change', () => {
      this.optionsChanged = true
    })

    $('#ghost-button').on('click', event => {
      const $this = $(event.currentTarget)
      this.game.ghostMode = $this.prop('checked')
    })
  }

  hideModal() {
    const modal = bootstrap.Modal.getInstance(document.getElementById('topLayer'))
    if (modal) modal.hide()
  }

  showModal() {
    if (!this.firstInteraction) return

    const element = document.getElementById('topLayer')
    if (!element) return

    const modal = bootstrap.Modal.getOrCreateInstance(element)
    modal.show()
  }

  startGame() {
    this.hideModal()

    this.game.play = true
    this.game.currentState = 'game'
    this.game.showHideOptions('game')
  }

  async open() {
    if (this.game.mapLoading) {
      await this.game.loader.saveGame('memory')
    }

    this.optionsChanged = false

    this.game.play = false
    this.game.currentState = 'menu'
    this.game.showHideOptions('menu')

    this.showPanel('main')
    this.showModal()
  }

  async saveGame() {
    if (!this.game.mapLoading) {
      console.log('Error: not loaded map!')

      $("#local-savegame-message").html(`<div class="text-center text-danger">Not loaded map!</div>`)

      setTimeout(() => {
        $("#local-savegame-message").html('')
      }, 4000)

      return false;
    }

    const request = await this.game.loader.saveGame('local')

    if (request) await this.game.loader.loadSavedgamesList('local')

    return true;
  }

  async deleteSavegame(event) {
    const $this = $(event.target).prev()
    const filename = $this.attr('data-filename')
    const ext = $this.attr('data-ext')

    if (ext != 'local') return false;

    localStorage.removeItem(filename)

    $("#local-savegame-message").html(`<div class="text-center text-success">Törölve: ${filename}</div>`)

    setTimeout(() => {
      $("#local-savegame-message").html('')
    }, 4000)

    await this.game.loader.loadSavedgamesList('local')

    return true;
  }

  selectSavegame(event) {
    const $this = $(event.currentTarget)

    const filename = $this.attr('data-filename')
    const ext = $this.attr('data-ext')

    this.game.filename = filename
    this.game.ext = ext

    $('#file-input').val(filename).attr('data-ext', ext)
  }

  async loadGame() {
    if (!this.game.filename || !this.game.ext || (this.game.ext != 'stuc' && this.game.ext != 'local')) {
      console.log('Error: Not saved game selected!')

      $("#local-savegame-message").html(`<div class="text-center text-danger">Not saved game selected!</div>`)

      setTimeout(() => {
        $("#local-savegame-message").html('')
      }, 4000)

      return false;
    }

    this.game.forceClearAllTimers()

    this.game.sound.removeAllPlayedAudio()

    this.game.deleteAllObjectInScene(this.game.scene)
    this.game.deleteAllObjectInScene(this.game.heandScene)

    this.game.loadedLights = []
    this.game.loadedBeings = []
    this.game.loadedHeands = []
    this.game.loadedMeshs = []

    this.game.playerObjects = [...this.game.playerObjectsDefault]

    this.game.playerDeathReset()

    this.game.mapLoading = false

    this.startGame()

    return true;
  }

  update(deltaTime) {
    if (!this.game.$menu.is(':visible')) {
      this.game.showHideOptions('menu')
    }

    this.render(deltaTime)
  }

  render(deltaTime) {
    $(".delta-time-menu").html(deltaTime.toFixed(0))
  }

  showPanel(panelName) {
    $('.menu-panel').hide()
    $(`#menu-${panelName}`).show()

    if (panelName == 'main') this.refreshMainMenu()

    if (panelName == 'options') {
      $('#darkcontrast-button').prop(
        'checked',
        this.options.darkContrast == 0.012
      )
    }
  }

  refreshMainMenu() {
    const gameLoaded = this.game.mapLoading

    $('#main-start-button').html(gameLoaded ? 'Resume Game' : 'New Game')

    if (gameLoaded) {
      $('#main-save-button').show()
      $('#main-end-button').show()
    } else {
      $('#main-save-button').hide()
      $('#main-end-button').hide()
    }
  }

  newGame() {
    this.game.filename = 'cottage-1'
    this.game.ext = 'mtuc'
    this.game.mapLoading = false

    $('#file-input').val(this.game.filename).attr('data-ext', this.game.ext)

    this.startGame()
  }

  endGame() {
    this.game.forceClearAllTimers()
    this.game.sound.removeAllPlayedAudio()

    this.game.deleteAllObjectInScene(this.game.scene)
    this.game.deleteAllObjectInScene(this.game.heandScene)

    this.game.loadedLights = []
    this.game.loadedBeings = []
    this.game.loadedHeands = []
    this.game.loadedMeshs = []

    this.game.playerObjects = [...this.game.playerObjectsDefault]

    this.game.playerDeathReset()
    this.game.mapVariableReset()

    this.game.mapLoading = false
    this.game.filename = 'cottage-1'
    this.game.ext = 'mtuc'

    this.game.play = false
    this.game.currentState = 'menu'

    $('#file-input').val(this.game.filename).attr('data-ext', this.game.ext)

    this.showPanel('main')
  }

  async resumeGame() {
    if (!this.optionsChanged) {
      this.startGame()
      return
    }

    this.game.forceClearAllTimers()
    this.game.sound.removeAllPlayedAudio()

    this.game.deleteAllObjectInScene(this.game.scene)
    this.game.deleteAllObjectInScene(this.game.heandScene)

    this.game.loadedLights = []
    this.game.loadedBeings = []
    this.game.loadedHeands = []
    this.game.loadedMeshs = []

    this.game.playerDeathReset()

    this.game.filename = 'memory'
    this.game.ext = 'memory'
    this.game.mapLoading = false

    this.optionsChanged = false

    this.startGame()
  }

  musicOptions() {
    const musicOn = $('#music-button').prop('checked')

    this.game.music = musicOn

    const musicData = this.game.loadedSounds.find(sound => sound.id == 1)
    if (!musicData) return;

    if (musicOn) {
      const alreadyPlaying = this.game.activePlayedSounds.some(audio =>
        audio?.buffer == musicData.buffer && audio.isPlaying
      )

      if (!alreadyPlaying && this.game.mapLoading) {
        this.game.sound.play(1, { volume: 0.2, loop: true })
      }

    } else {
      this.game.activePlayedSounds.forEach(audio => {
        if (audio?.buffer == musicData.buffer) {
          if (audio.isPlaying) audio.stop()
          audio.disconnect()
        }
      })

      this.game.activePlayedSounds = this.game.activePlayedSounds.filter(audio =>
        audio?.buffer != musicData.buffer
      )
    }
  }
}