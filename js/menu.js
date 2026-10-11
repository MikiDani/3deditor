import $ from 'jquery'
import * as bootstrap from 'bootstrap'

export default class Menu {
  constructor(game) {
    this.game = game

    this.memorySave = null
    this.optionsChanged = false
    this.firstInteraction = false
    this.menuMusic = null
    this.menuMusicOffset = 0

    this.saveSlotCount = 3

    this.currentPanel = 'main'
    this.mainMenuPosition = 0
    this.panelPosition = 0

    this.saveEditActive = false
    this.saveEditOriginalName = ''

    this.menuSelectedColor = null
    this.menuDefaultColor = null

    this.options = {
      hints: false,
      darkContrast: 0.004
    }

    this.buildHtml()
    this.init()
  }

  buildHtml() {
    const saveSlots = Array.from({ length: this.saveSlotCount }, (_, index) => {
      const slotName = `save${index + 1}`
      return `<input type="text" class="menu-save-slot menu-nav-item w-100 mb-2" data-slot="${slotName}" value="EMPTY" readonly>`
    }).join('')

    const loadSlots = Array.from({ length: this.saveSlotCount }, (_, index) => {
      const slotName = `save${index + 1}`
      return `<div class="menu-load-slot menu-nav-item w-100 mb-2" data-slot="${slotName}">EMPTY</div>`
    }).join('')

    this.game.$menu = $(`
      <div id="menu-container">

        <div class="menu-container-bg"></div>

        <div class="full-size d-flex justify-content-center align-items-center">
          <div class="delta-time-menu text-white"></div>
          <button id="first-interaction-button" class="btn btn-success text-white rounded-0">Start Game</button>
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
                    <button id="main-start-button" class="d-block menu-button-bg menu-text-color menu-nav-item mb-2 p-0 rounded-0 mx-auto">New Game</button>
                    <button id="main-load-button" class="d-block menu-button-bg menu-text-color menu-nav-item mb-2 p-0 rounded-0 mx-auto">Load Game</button>
                    <button id="main-save-button" class="menu-button-bg menu-text-color menu-nav-item mb-2 p-0 rounded-0 mx-auto" style="display:none;">Save Game</button>
                    <button id="main-end-button" class="menu-button-bg menu-text-color menu-nav-item mb-2 p-0 rounded-0 mx-auto" style="display:none;">End Game</button>
                    <button id="main-options-button" class="d-block menu-button-bg menu-text-color menu-nav-item mb-2 p-0 rounded-0 mx-auto">Options</button>
                    <button id="main-information-button" class="d-block menu-button-bg menu-text-color menu-nav-item p-0 rounded-0 mx-auto">Information</button>
                  </div>

                  <div id="menu-load" class="menu-panel menu-text-color-2" style="display:none;">
                    <h5>Load Game</h5>
                    <div id="menu-load-slot-list" class="d-flex flex-column justify-content-start align-items-center mb-3">${loadSlots}</div>
                    <button id="local-loadgame-button" class="btn btn-success w-100 mb-2">Load</button>
                    <button class="menu-back-button btn btn-dark w-100">Back</button>
                  </div>

                  <div id="menu-save" class="menu-panel menu-text-color-2" style="display:none;">
                    <h5>Save Game</h5>
                    <div id="local-savegame-save-list" class="d-flex flex-column justify-content-start align-items-center mb-3">${saveSlots}</div>
                    <button id="local-savegame-button" class="btn btn-danger w-100 mb-2">Save</button>
                    <button class="menu-back-button btn btn-dark w-100">Back</button>
                  </div>

                  <div id="menu-options" class="menu-panel menu-text-color-2" style="display:none;">
                    <h5 class="menu-text-title text-center w-100">Options</h5>
                    <div class="papper-bg p-5">
                      <div class="menu-option-row menu-nav-item my-3" data-option="hints">
                        <input type="checkbox" id="hints-button">
                        <span>Hints</span>
                      </div>
                      <div class="menu-option-row menu-nav-item my-3" data-option="darkcontrast">
                        <input type="checkbox" id="darkcontrast-button" checked>
                        <span>Maximum dark contrast</span>
                      </div>
                      <div id="distance-mode-container" class="menu-option-row menu-nav-item my-3" data-option="distance">
                        <div class="mb-2">Distance Mode</div>
                        <label class="me-2"><input type="radio" name="distance-mode" value="best">Best</label>
                        <label class="me-2"><input type="radio" name="distance-mode" value="medium">Medium</label>
                        <label><input type="radio" name="distance-mode" value="low" checked>Low</label>
                      </div>
                      <div class="menu-option-row menu-nav-item my-3" data-option="music">
                        <input type="checkbox" id="music-button" checked>
                        <span>Music On</span>
                      </div>
                      <div class="menu-option-row menu-nav-item my-3" data-option="menumusic">
                        <input type="checkbox" id="menu-music-button" checked>
                        <span>Menu Music On</span>
                      </div>
                      <div class="my-3">--------</div>
                      <div class="menu-option-row menu-nav-item my-3" data-option="lights">
                        <input type="checkbox" id="lights-button" checked>
                        <span>All Lights On</span>
                      </div>
                      <div class="menu-option-row menu-nav-item my-3" data-option="gravity">
                        <input type="checkbox" id="gravity-button" checked>
                        <span>Gravity</span>
                      </div>
                      <div class="menu-option-row menu-nav-item my-3" data-option="ghost">
                        <input type="checkbox" id="ghost-button">
                        <span>Ghost Mode</span>
                      </div>
                    </div>
                    <button class="menu-back-button menu-nav-item btn btn-dark w-100 mt-2">Back</button>
                  </div>

                  <div id="menu-information" class="menu-panel menu-text-color-2 p-1" style="display:none;">
                    <h5 class="menu-text-title text-center w-100">Information</h5>
                    <div class="papper-bg p-5 my-4">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis molestias deserunt aliquam nemo recusandae numquam ex ut ratione nisi fugiat aperiam a, harum blanditiis provident quae est eum sit odio. Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis molestias deserunt aliquam nemo recusandae numquam ex ut ratione nisi fugiat aperiam a, harum blanditiis provident quae est eum sit odio.<br>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis molestias deserunt aliquam nemo recusandae numquam ex ut ratione nisi fugiat aperiam a, harum blanditiis provident quae est eum sit odio. Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis molestias deserunt aliquam nemo recusandae numquam ex ut ratione nisi fugiat aperiam a, harum blanditiis provident quae est eum sit odio.<br>
                    </div>
                    <button class="menu-back-button menu-nav-item btn btn-dark w-100">Back</button>
                  </div>
                  <div id="local-savegame-message" class="text-center w-100 mt-2"></div>
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

    this.readInventoryMenuColors()
    this.refreshSaveSlots()
    this.showPanel('main', false)
  }

  init() {
    this.bindEvents()
    this.menuKeyboardControls()
  }

  bindEvents() {
    $(document).on('click', '#first-interaction-button', () => {
      this.firstInteraction = true
      this.game.listener.context.resume()
      this.mainMenuPosition = 0
      this.refreshMenuSelection()
      this.showModal()

      this.startMenuMusic()
    })

    $('.btn-close').on('click', function () {
      setTimeout(function () {
        if (document.activeElement) document.activeElement.blur()
      }, 10)
    })

    $('#gravity-button').on('click', event => {
      const $this = $(event.currentTarget)
      this.game.gravity = $this.prop('checked') ? this.game.gravityValue : 0

      console.log(this.game.gravity)
      
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

    $('#lights-button').on('click', event => {
      const $this = $(event.currentTarget)

      this.game.lightsOn = $this.prop('checked')
      this.optionsChanged = true
    })

    $('#ghost-button').on('click', event => {
      const $this = $(event.currentTarget)
      this.game.ghostMode = $this.prop('checked')
    })

    $('#music-button').on('change', () => {
      this.musicOptions()
    })

    $('#menu-music-button').on('change', event => {
      if ($(event.currentTarget).prop('checked')) this.startMenuMusic()
      else this.pauseMenuMusic()
    })

    $("input[name='distance-mode']").on('change', () => {
      this.optionsChanged = true
    })

    $('#local-savegame-button').on('click', async () => {
      if (this.saveEditActive) return

      const slotName = this.getSelectedSlotName('save')
      if (!slotName) return

      await this.saveGame(slotName, null, false)
    })

    $('#local-loadgame-button').on('click', async () => {
      const slotName = this.getSelectedSlotName('load')
      if (!slotName || !this.hasSaveSlot(slotName)) return

      await this.loadGame(slotName)
    })

    $(document).on('click', '.menu-save-slot', event => {
      if (this.saveEditActive) return

      const $items = $('#menu-save .menu-save-slot')
      this.panelPosition = $items.index(event.currentTarget)

      this.refreshMenuSelection()
    })

    $(document).on('input', '.menu-save-slot', event => {
      if (!this.saveEditActive) return

      const value = String($(event.currentTarget).val() ?? '')
        .toUpperCase()
        .replace(/[^A-Z0-9]/g, '')

      $(event.currentTarget).val(value)
    })

    $(document).on('click', '.menu-load-slot', event => {
      const $items = $('#menu-load .menu-load-slot')
      this.panelPosition = $items.index(event.currentTarget)

      this.refreshMenuSelection()
    })

    $(document).on('click', '#menu-main .menu-nav-item:visible', event => {
      const $items = this.getMainMenuItems()

      this.mainMenuPosition = $items.index(event.currentTarget)

      this.refreshMenuSelection()
    })

    $(document).on('click', '#menu-options .menu-option-row', event => {
      const $items = this.getPanelItems('options')
      this.panelPosition = $items.index(event.currentTarget)
      this.refreshMenuSelection()
      if (!$(event.target).is('input, label')) {
        this.activateOption($(event.currentTarget).data('option'))
      }
    })

    $('#main-start-button').on('click', async event => {
      if (event.originalEvent) await this.mainMenuMouseClickEffect(event.currentTarget)

      if (this.game.mapLoading) {
        await this.resumeGame()
      } else {
        this.newGame()
      }
    })

    $('#main-load-button').on('click', async event => {
      if (event.originalEvent) await this.mainMenuMouseClickEffect(event.currentTarget)
      this.showPanel('load')
    })

    $('#main-save-button').on('click', async event => {
      if (event.originalEvent) await this.mainMenuMouseClickEffect(event.currentTarget)
      this.showPanel('save')
    })

    $('#main-end-button').on('click', async event => {
      if (event.originalEvent) await this.mainMenuMouseClickEffect(event.currentTarget)
      this.endGame()
    })

    $('#main-options-button').on('click', async event => {
      if (event.originalEvent) await this.mainMenuMouseClickEffect(event.currentTarget)
      this.showPanel('options')
    })

    $('#main-information-button').on('click', async event => {
      if (event.originalEvent) await this.mainMenuMouseClickEffect(event.currentTarget)
      this.showPanel('information')
    })

    $('.menu-back-button').on('click', () => {
      if (this.saveEditActive) this.cancelSaveNameEdit()
      this.showPanel('main', false)
    })
  }

  menuKeyboardControls() {
    $(document).on('keydown.menu', async event => {
      if (this.game.currentState != 'menu') return

      if (this.saveEditActive) {
        if (event.key == 'Escape') {
          event.preventDefault()
          event.stopPropagation()

          this.cancelSaveNameEdit()

          return
        }

        if (event.key == 'Enter') {
          event.preventDefault()
          event.stopPropagation()

          await this.confirmSaveNameEdit()

          return
        }

        return
      }

      if (event.key == 'Escape' || event.key == 'Backspace') {
        if (this.currentPanel != 'main') {
          event.preventDefault()
          event.stopPropagation()

          this.showPanel('main', false)
        }

        return
      }

      if (this.currentPanel == 'information') {
        if (event.key == 'Enter') {
          event.preventDefault()
          event.stopPropagation()

          this.showPanel('main', false)
        }

        return
      }

      if (event.key == 'ArrowUp' || event.key == 'w' || event.key == 'W') {
        event.preventDefault()
        event.stopPropagation()

        this.moveMenuSelection(-1)

        return
      }

      if (event.key == 'ArrowDown' || event.key == 's' || event.key == 'S') {
        event.preventDefault()
        event.stopPropagation()

        this.moveMenuSelection(1)

        return
      }

      if (event.key == 'Enter') {
        event.preventDefault()
        event.stopPropagation()

        await this.activateMenuSelection()
      }
    })
  }

  getMainMenuItems() {
    return $('#menu-main .menu-nav-item:visible')
  }

  getPanelItems(panelName = this.currentPanel) {
    if (panelName == 'load') {
      return $('#menu-load .menu-load-slot')
    }

    if (panelName == 'save') {
      return $('#menu-save .menu-save-slot')
    }

    if (panelName == 'options') {
      return $('#menu-options .menu-nav-item:visible')
    }

    if (panelName == 'information') {
      return $('#menu-information .menu-back-button:visible')
    }

    return $()
  }

  moveMenuSelection(direction) {
    const $items = this.currentPanel == 'main'
      ? this.getMainMenuItems()
      : this.getPanelItems()

    if (!$items.length) return

    if (this.currentPanel == 'main') {
      this.mainMenuPosition = Math.max(0, Math.min( this.mainMenuPosition + direction, $items.length - 1))
    } else {
      this.panelPosition = Math.max(0, Math.min(this.panelPosition + direction,$items.length - 1)
      )
    }

    this.refreshMenuSelection()
  }

  async activateMenuSelection() {
    if (this.currentPanel == 'main') {
      const $items = this.getMainMenuItems()
      const $selected = $items.eq(this.mainMenuPosition)

      if (!$selected.length) return
      $selected.trigger('click')
      return;
    }

    if (this.currentPanel == 'load') {
      const slotName = this.getSelectedSlotName('load')
      if (!slotName || !this.hasSaveSlot(slotName)) return
      await this.loadGame(slotName)
      return;
    }

    if (this.currentPanel == 'save') {
      this.startSaveNameEdit()
      return;
    }

    if (this.currentPanel == 'options') {
      const $items = this.getPanelItems('options')
      const $selected = $items.eq(this.panelPosition)
      if (!$selected.length) return;

      if ($selected.hasClass('menu-back-button')) {
        this.showPanel('main', false)
        return;
      }

      this.activateOption($selected.attr('data-option'))
      return;
    }

    if (this.currentPanel == 'information') {
      this.showPanel('main', false)
    }
  }

  activateOption(optionName) {
    if (optionName == 'menumusic') {
      $('#menu-music-button').prop('checked', !$('#menu-music-button').prop('checked')).trigger('change')
      return
    }

    if (optionName == 'hints') {
      $('#hints-button').trigger('click')

      return
    }

    if (optionName == 'darkcontrast') {
      $('#darkcontrast-button').trigger('click')

      return
    }

    if (optionName == 'music') {
      $('#music-button')
        .prop(
          'checked',
          !$('#music-button').prop('checked')
        )
        .trigger('change')
      return;
    }

    if (optionName == 'lights') {
      $('#lights-button').trigger('click')
      return;
    }

    if (optionName == 'ghost') {
      $('#ghost-button').trigger('click')
      return;
    }

    if (optionName == 'gravity') {
      $('#gravity-button').trigger('click')
      return;
    }

    if (optionName == 'distance') {
      const values = [
        'best',
        'medium',
        'low'
      ]

      const currentValue = $("input[name='distance-mode']:checked").val()
      const currentIndex = values.indexOf(currentValue)

      const nextValue = values[
        (currentIndex + 1) % values.length
      ]

      $(`input[name='distance-mode'][value='${nextValue}']`)
        .prop('checked', true)
        .trigger('change')
    }
  }

  readInventoryMenuColors() {
    const $inventoryItem = $('#inventory-item-text-container .item-text-container').first()

    if (!$inventoryItem.length) return

    const oldClass = $inventoryItem.attr('class')

    $inventoryItem.removeClass('text-hover text-selected')

    this.menuDefaultColor = window
      .getComputedStyle($inventoryItem[0])
      .color

    $inventoryItem.addClass('text-hover')

    this.menuSelectedColor = window
      .getComputedStyle($inventoryItem[0])
      .color

    $inventoryItem.attr('class', oldClass)
  }

  async mainMenuMouseClickEffect(button) {
    const $button = $(button)
    const oldColor = $button.css('color')
    const selectedColor = this.menuSelectedColor ?? '#00ff00'

    $button.css('color', selectedColor)

    await new Promise(resolve => setTimeout(resolve, 100))

    $button.css('color', oldColor)
  }

  refreshMenuSelection() {
    const selectedColor = this.menuSelectedColor ?? '#00ff00'
    const defaultColor = this.menuDefaultColor ?? '#6f9f6f'

    $('#menu-container .menu-nav-item').css(
      'color',
      defaultColor
    )

    if (this.currentPanel == 'main') {
      const $items = this.getMainMenuItems()

      if (!$items.length) return

      this.mainMenuPosition = Math.max(
        0,
        Math.min(
          this.mainMenuPosition,
          $items.length - 1
        )
      )

      $items
        .eq(this.mainMenuPosition)
        .css('color', selectedColor)

      return
    }

    const $items = this.getPanelItems()

    if (!$items.length) return

    this.panelPosition = Math.max(
      0,
      Math.min(
        this.panelPosition,
        $items.length - 1
      )
    )

    $items
      .eq(this.panelPosition)
      .css('color', selectedColor)
  }

  showPanel(panelName, resetSelection = true) {
    if (
      this.saveEditActive &&
      panelName != 'save'
    ) {
      this.cancelSaveNameEdit()
    }

    $('.menu-panel').hide()
    $(`#menu-${panelName}`).show()

    this.currentPanel = panelName

    if (panelName == 'main') {
      this.refreshMainMenu()
    } else if (resetSelection) {
      this.panelPosition = 0
    }

    if (
      panelName == 'load' ||
      panelName == 'save'
    ) {
      this.refreshSaveSlots()
    }

    if (panelName == 'options') {
      $('#darkcontrast-button').prop(
        'checked',
        this.options.darkContrast == 0.012
      )
    }

    this.refreshMenuSelection()
  }

  getSelectedSlotName(type) {
    const selector = type == 'save'
      ? '#menu-save .menu-save-slot'
      : '#menu-load .menu-load-slot'

    const $items = $(selector)
    const $selected = $items.eq(this.panelPosition)

    return $selected.attr('data-slot') ?? null
  }

  getStorageNameKey(slotName) {
    return `${slotName}_storage_name`
  }

  getSlotStorageName(slotName) {
    if (!this.hasSaveSlot(slotName)) {
      return 'EMPTY'
    }

    const storageName = localStorage.getItem(
      this.getStorageNameKey(slotName)
    )

    return storageName && storageName.trim()
      ? storageName
      : 'NO NAME'
  }

  hasSaveSlot(slotName) {
    return localStorage.getItem(slotName) != null
  }

  refreshSaveSlots() {
    for (
      let index = 0;
      index < this.saveSlotCount;
      index++
    ) {
      const slotName = `save${index + 1}`
      const displayName = this.getSlotStorageName(slotName)

      $( `#menu-save .menu-save-slot[data-slot='${slotName}']` ).val(displayName)
      $( `#menu-load .menu-load-slot[data-slot='${slotName}']` ).text(displayName)
    }

    this.refreshMenuSelection()
  }

  startSaveNameEdit() {
    const $items = $('#menu-save .menu-save-slot')
    const $input = $items.eq(this.panelPosition)

    if (!$input.length) return;

    this.saveEditActive = true

    const currentValue = $input.val()

    this.saveEditOriginalName = currentValue == 'EMPTY' ? '' : currentValue;

    $input.prop('readonly', false)
    $input.val(this.saveEditOriginalName)

    $input.focus()
    $input.select()
  }

  cancelSaveNameEdit() {
    if (!this.saveEditActive) return;

    const $items = $('#menu-save .menu-save-slot')
    const $input = $items.eq(this.panelPosition)

    $input.val(
      this.saveEditOriginalName || 'EMPTY'
    )

    $input.prop('readonly', true)
    $input.blur()

    this.saveEditActive = false
    this.saveEditOriginalName = ''

    this.refreshSaveSlots()
  }

  async confirmSaveNameEdit() {
    if (!this.saveEditActive) return;

    const $items = $('#menu-save .menu-save-slot')
    const $input = $items.eq(this.panelPosition)
    const slotName = $input.attr('data-slot')

    if (!slotName) return;
    let storageName = String($input.val() ?? '').toUpperCase().replace(/[^A-Z0-9]/g, '')
    if (!storageName) { storageName = 'NO NAME' }

    $input.val(storageName)
    $input.prop('readonly', true)
    $input.blur()

    this.saveEditActive = false
    this.saveEditOriginalName = ''

    await this.saveGame(slotName, storageName, true)
  }

  hideModal() {
    const modal = bootstrap.Modal.getInstance( document.getElementById('topLayer'))
    if (modal) {modal.hide()}
  }

  showModal() {
    if (!this.firstInteraction) return;
    const element = document.getElementById('topLayer')
    if (!element) return;
    const modal = bootstrap.Modal.getOrCreateInstance(element, { backdrop: 'static', keyboard: false })
    modal.show()
  }

  startGame() {
    this.pauseMenuMusic()

    this.mainMenuPosition = 0
    this.panelPosition = 0
    this.currentPanel = 'main'

    this.hideModal()

    this.game.play = true
    this.game.currentState = 'game'

    this.game.showHideOptions('game')
    this.resumeGameMusic()
  }

  async open() {
    this.pauseGameMusic()

    if (this.game.playerDead) {
      this.endGame()
    } else if (this.game.mapLoading) {
      await this.game.loader.saveGame('memory')
    }

    this.optionsChanged = false

    this.mainMenuPosition = 0
    this.panelPosition = 0

    this.game.play = false
    this.game.currentState = 'menu'
    this.game.showHideOptions('menu')

    this.showPanel('main', false)
    this.showModal()
    this.startMenuMusic()
  }

  async saveGame(slotName, storageName = null, changeStorageName = false) {
    if (!this.game.mapLoading) {
      console.log('Error: not loaded map!')

      $('#local-savegame-message').html(
        `<div class="text-center text-danger">Not loaded map!</div>`
      )

      setTimeout(() => {
        $('#local-savegame-message').html('')
      }, 4000)

      return false;
    }

    const previousStorageName = this.getSlotStorageName(slotName)
    const request = await this.game.loader.saveGame('local')

    if (!request) {
      return false;
    }

    const generatedSaveName = this.game.filename
    const generatedSaveData = localStorage.getItem( generatedSaveName )
    if (!generatedSaveData) { return false }
    localStorage.setItem( slotName, generatedSaveData )
    if (generatedSaveName != slotName) { localStorage.removeItem( generatedSaveName ) }

    let finalStorageName = storageName

    if (!changeStorageName) {
      finalStorageName = previousStorageName
      if (finalStorageName == 'EMPTY') { finalStorageName = 'NO NAME' }
    }

    if (finalStorageName != 'NO NAME') { finalStorageName = String( finalStorageName ?? '' ) .toUpperCase() .replace(/[^A-Z0-9]/g, '') }
    if (!finalStorageName) { finalStorageName = 'NO NAME' }

    localStorage.setItem( this.getStorageNameKey(slotName), finalStorageName )

    this.game.filename = slotName
    this.game.ext = 'local'

    $('#local-savegame-message').html(
      `<div class="text-center text-success">${finalStorageName}</div>`
    )

    setTimeout(() => {
      $('#local-savegame-message').html('')
    }, 4000)

    this.refreshSaveSlots()
    this.startGame()

    return true;
  }

  async loadGame(slotName = null) {
    if (slotName) {
      if (!this.hasSaveSlot(slotName)) { return false }
      this.game.filename = slotName
      this.game.ext = 'local'
    }

    if (!this.game.filename || !this.game.ext || ( this.game.ext != 'stuc' && this.game.ext != 'local' )) {
      console.log('Error: Not saved game selected!')

      $('#local-savegame-message').html(`<div class="text-center text-danger">Not saved game selected!</div>`)

      setTimeout(() => {
        $('#local-savegame-message').html('')
      }, 4000);

      return false;
    }

    this.pauseMenuMusic()

    this.game.forceClearAllTimers()
    this.game.sound.removeAllPlayedAudio()
    this.game.deleteAllObjectInScene( this.game.scene )
    this.game.deleteAllObjectInScene( this.game.heandScene )

    this.game.loadedLights = []
    this.game.loadedBeings = []
    this.game.loadedHeands = []
    this.game.loadedMeshs = []

    this.game.playerObjects = [
      ...this.game.playerObjectsDefault
    ]

    this.game.playerDeathReset()

    this.game.mapLoading = false

    this.startGame()

    return true;
  }

  update(deltaTime) {
    if (!this.game.$menu.is(':visible')) { this.game.showHideOptions('menu') }
    this.render(deltaTime)
  }

  render(deltaTime) {
    $('.delta-time-menu').html(
      deltaTime.toFixed(0)
    )
  }

  refreshMainMenu() {
    const gameLoaded = this.game.mapLoading

    $('#main-start-button').html( gameLoaded ? 'Resume Game' : 'New Game' )

    if (gameLoaded) {
      $('#main-save-button').css('display', 'block')
      $('#main-end-button').css('display', 'block')
    } else {
      $('#main-save-button').hide()
      $('#main-end-button').hide()
    }

    const $items = this.getMainMenuItems()

    if (this.mainMenuPosition >= $items.length) this.mainMenuPosition = Math.max(0,$items.length - 1)

    this.refreshMenuSelection()
  }

  newGame() {
    this.game.filename = 'cottage-1'
    this.game.ext = 'mtuc'
    this.game.mapLoading = false

    this.startGame()
  }

  endGame() {
    this.pauseMenuMusic()

    this.game.forceClearAllTimers()
    this.game.sound.removeAllPlayedAudio()
    this.game.deleteAllObjectInScene( this.game.scene )
    this.game.deleteAllObjectInScene( this.game.heandScene )

    this.game.loadedLights = []
    this.game.loadedBeings = []
    this.game.loadedHeands = []
    this.game.loadedMeshs = []

    this.game.playerObjects = [
      ...this.game.playerObjectsDefault
    ]

    this.game.playerDeathReset()
    this.game.mapVariableReset()

    this.game.mapLoading = false
    this.game.filename = 'cottage-1'
    this.game.ext = 'mtuc'

    this.game.play = false
    this.game.currentState = 'menu'

    this.mainMenuPosition = 0
    this.panelPosition = 0

    this.showPanel('main', false)
    this.startMenuMusic()
  }

  async resumeGame() {
    if (!this.optionsChanged) {
      this.startGame()
      return;
    }

    this.pauseMenuMusic()

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

  pauseGameMusic() {
    const musicData = this.game.loadedSounds.find(sound => sound.id == 1)
    if (!musicData) return

    this.game.activePlayedSounds.forEach(audio => {
      if (audio?.buffer == musicData.buffer && audio.isPlaying) audio.pause()
    })
  }

  resumeGameMusic() {
    if (!$('#music-button').prop('checked') || !this.game.mapLoading) return

    const musicData = this.game.loadedSounds.find(sound => sound.id == 1)
    if (!musicData) return

    const music = this.game.activePlayedSounds.find(audio => audio?.buffer == musicData.buffer && audio.context == this.game.listener.context)

    if (music) {
      if (!music.isPlaying) music.play()
    } else {
      this.game.sound.play(1, { volume: 0.2, loop: true })
    }
  }

  musicOptions() {
    const musicOn = $('#music-button').prop('checked')

    this.game.music = musicOn

    const musicData = this.game.loadedSounds.find(sound => sound.id == 1)

    if (!musicData) return;

    if (musicOn) {
      const alreadyPlaying = this.game.activePlayedSounds.some(audio => audio?.buffer == musicData.buffer && audio.isPlaying)
      if (!alreadyPlaying && this.game.mapLoading && this.game.currentState == 'game') this.game.sound.play(1, { volume: 0.2, loop: true });
    } else {
      this.game.activePlayedSounds.forEach(
        audio => {
          if (audio?.buffer == musicData.buffer) {
            if (audio.isPlaying) { audio.stop() }
            audio.disconnect()
          }
        }
      )

      this.game.activePlayedSounds = this.game.activePlayedSounds.filter( audio => audio?.buffer != musicData.buffer )
    }
  }

  startMenuMusic() {
    if (!this.firstInteraction || this.game.currentState != 'menu' || !$('#menu-music-button').prop('checked')) return;

    this.game.listener.context.resume()

    if (this.menuMusic && this.menuMusic.context != this.game.listener.context) {
      this.menuMusic = null
    }

    if (this.menuMusic) {
      if (!this.menuMusic.isPlaying) this.menuMusic.play()
      return
    }

    const musicData = this.game.loadedSounds.find(sound => sound.id == 400)
    if (!musicData) return

    this.game.sound.play(400, { loop: true })

    this.menuMusic = this.game.activePlayedSounds.find(audio => audio?.buffer == musicData.buffer && audio.context == this.game.listener.context) ?? null

    if (this.menuMusic) this.menuMusic.offset = this.menuMusicOffset % musicData.buffer.duration
  }

  pauseMenuMusic() {
    if (!this.menuMusic) return

    if (this.menuMusic.isPlaying) this.menuMusic.pause()
    this.menuMusicOffset = this.menuMusic.offset
  }
}