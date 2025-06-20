export default class Loader {
  constructor() {
    this.init()
  }

  init() {
  }

  async generalLoader() {
    console.log('loading general datas (game textures, sounds, menudata...)')

  }

  async mapLoader() {
    console.log('loading Map data....')
  }

  update(deltaTime) {
    console.log('Loader UPDATE')
  }

  render() {
    console.log('Loader RENDER')
  }
}
