import * as THREE from 'three'

export default class Sound {
  constructor(game) {
    this.game = game

    this.listener = new THREE.AudioListener()
    this.game.camera.add(this.listener)

    this.audioLoader = new THREE.AudioLoader()
    this.soundsMemory = []  // ide kerülnek a betöltött AudioBuffer-ek   
  }

  async init() {
    const promises = this.game.config.sounds.map(async (sound) => {
      const url = `sounds/${sound.name}.mp3`
      try {
        const buffer = await this.audioLoader.loadAsync(url)
        this.soundsMemory.push ({
          buffer: buffer,
          id: sound.id,
          volume: sound.volume,
          loop: sound.loop,
          setRefDistance: sound.setRefDistance,
          setMaxDistance: sound.setMaxDistance,
          setRolloffFactor: sound.setRolloffFactor,
        })

        console.log(`+ ${sound.name} loaded. id: ${sound.id} `)
      } catch (err) {
        console.log(`- ERROR: (${sound.name}.mp3):`, err)
        this.game.loadingError = true
      }
    })
    await Promise.all(promises)
  }

  async play(soundsMemoryId, soundDataOptions = null, use3D = false, meshGroup = null) {
    const soundData  = this.soundsMemory.find(sound => sound.id == soundsMemoryId);
    if (!soundData) {
      console.warn(`Not find sound! ID: "${soundsMemoryId}"`);
      return;
    }

    let phantom = null

    const sound = use3D
      ? new THREE.PositionalAudio(this.listener)
      : new THREE.Audio(this.listener);
  
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

      // HELPER // 
      /*
      const debugSphere = new THREE.Mesh(new THREE.SphereGeometry(0.15, 8, 8), new THREE.MeshBasicMaterial({ color: '#ffff00' }));
      debugSphere.position.copy(position); this.game.scene.add(debugSphere);
      */

      // --- Automatikus törlés ---
      const removeAll = () => {
        if (phantom.parent) phantom.parent.remove(phantom)
        // if (debugSphere.parent) debugSphere.parent.remove(debugSphere)  // HELPER
        sound.disconnect()
        console.log(`Sound removed: ${soundsMemoryId}`)
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

    // --- Lejátszás ---
    requestAnimationFrame(() => {
      sound.play(0.05);
    });

    return phantom ?? null;
  }
}
