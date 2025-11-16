import * as THREE from 'three'

export default class Sound {
  constructor(game) {
    this.game = game

    this.listener = this.game.listener
    this.audioLoader = new THREE.AudioLoader()
  }

  async loadSounds() {
    for (const sound of this.game.config.sounds) {
      const url = `sounds/${sound.name}.mp3`
      try {
        const buffer = await this.audioLoader.loadAsync(url)
        this.game.loadedSounds.push ({
          buffer: buffer,
          id: sound.id,
          volume: sound.volume,
          loop: sound.loop,
          setRefDistance: sound.setRefDistance,
          setMaxDistance: sound.setMaxDistance,
          setRolloffFactor: sound.setRolloffFactor,
        })
        this.game.addConsoleRow(`id: ${sound.id}. ${sound.name}.mp3 loaded, `, 'div', false, true)

      } catch (err) {
        this.game.addConsoleRow(`id: ${sound.id}. ${sound.name}.mp3 ERROR!`, 'div', false, false)
        this.game.loadingError = true
        return;
      }
    }
  }

  async play(soundId, soundDataOptions = null, use3D = false, meshGroup = null) {
    const soundData = this.game.loadedSounds.find(sound => sound.id == soundId);
    if (!soundData) {
      console.warn(`Not find sound! ID: "${soundId}"`);
      return;
    }

    let phantom = null

    const sound = use3D ? new THREE.PositionalAudio(this.listener) : new THREE.Audio(this.listener);
  
    sound.setBuffer(soundData.buffer)
    sound.setLoop(soundData.loop)
    sound.setVolume(soundData.volume)
    // SOUND: linear, inverse

    // --- 3D hang esetén ---
    if (use3D && meshGroup) {
      sound.panner.distanceModel = 'inverse'
      sound.setRefDistance(soundData.setRefDistance)
      sound.setMaxDistance(soundData.setMaxDistance)
      sound.setRolloffFactor(soundData.setRolloffFactor)

      const position = meshGroup.center 
        ? meshGroup.center.clone() 
        : new THREE.Vector3();

      phantom = new THREE.Object3D()
      phantom.position.copy(position)
      phantom.add(sound)
      sound.position.set(0, 0, 0)

      this.game.scene.add(phantom)

      // SOUND POSITION HELPER //
      //?? const debugSphere = new THREE.Mesh(new THREE.SphereGeometry(0.15, 8, 8), new THREE.MeshBasicMaterial({ color: '#ffff00' }));
      //?? debugSphere.position.copy(position); this.game.scene.add(debugSphere);

      // AUTO DELETE
      const removeAll = () => {
        if (phantom.parent) phantom.parent.remove(phantom)
        //?? if (debugSphere.parent) debugSphere.parent.remove(debugSphere)  // HELPER
        sound.disconnect()
        // console.log(`Sound removed: ${soundId}`)
      };

      sound.onEnded = removeAll;
      if (sound.source) sound.source.onended = removeAll;

      meshGroup.updateMatrixWorld(true)
      phantom.updateMatrixWorld(true)
    }

    sound.updateMatrixWorld(true)

    // MODIFY
    if (soundDataOptions) {
      if ('loop' in soundDataOptions) sound.setLoop(soundDataOptions.loop)
      if ('volume' in soundDataOptions) sound.setVolume(soundDataOptions.volume)
      if ('setRefDistance' in soundDataOptions) sound.setRefDistance(soundDataOptions.setRefDistance)
      if ('setMaxDistance' in soundDataOptions) sound.setMaxDistance(soundDataOptions.setMaxDistance)
      if ('setRolloffFactor' in soundDataOptions) sound.setRolloffFactor(soundDataOptions.setRolloffFactor)
    }

    // --- PLAY ---
    requestAnimationFrame(() => {
      sound.play(0.05);
    });

    // ADD PLAYEDSOUNDS ARRAY
    (phantom) ? this.game.activePlayedSounds.push(phantom) : this.game.activePlayedSounds.push(sound);

    return phantom ?? null;
  }

  removeAllPlayedAudio() {
    if (this.game.scene) this.stopAndDisconnectAllAudio(this.game.scene)
    if (this.game.activePlayedSounds?.length) this.game.activePlayedSounds = []

    this.game.camera.remove(this.game.listener)
    this.game.listener.context.close()

    const NewCtx = new (window.AudioContext)()
    THREE.AudioContext.getContext = () => NewCtx
    THREE.AudioContext.context = NewCtx

    this.game.listener = new THREE.AudioListener()
    this.game.camera.add(this.game.listener)
    this.game.sound.listener = this.game.listener
  }

  stopAndDisconnectAllAudio(scene) {
    scene.traverse(obj => {
      if (obj.isAudio) {
        if (obj.source) {
          obj.source.stop(0)
          obj.source.disconnect()
          obj.source = null
        }

        if (obj.panner && obj.panner.disconnect) {
          obj.panner.disconnect()
          obj.panner = null
        }

        if (obj.gain && obj.gain.disconnect) {
          obj.gain.disconnect()
          obj.gain = null
        }
        obj.stop?.()
        obj.disconnect?.()
        obj.isPlaying = false
        obj.autoplay = false
      }
    })
  }
}
