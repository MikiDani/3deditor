import { vLoading } from 'element-plus'
import $, { map } from 'jquery'
import * as THREE from 'three'

export default class Loader {

  constructor(game) {
    this.game = game

    this.texturesLinks = []
  }

  async generalLoader(logOn) {
    // LOAD DEFAULT DATA TO MEMORY
    try {
      this.game.addConsoleRow('+++ config json +++', 'div', true, true)

      const response = await fetch('config.json')
      this.game.config = await response.json()
    } catch (e) { this.game.loadingError = true; return; }
    if (logOn) console.log(this.game.config);

    //ADD ACTIONS CLICK CHECKS
    this.game.input.actionsClicksCheck()

    // PACKS
    try {
      this.game.addConsoleRow('+++ beings list +++', 'div', true, true)

      const response2 = await this.fetchData({ ajax: true, getbeings: true })
      if (response2.files) {
        for(const file of response2.files) {
          const response3 = await this.fetchData({ ajax: true, load: true, filename: file.name, ext: file.extension, beingsdir: '_beings' });
          if (response3?.data && response3?.structure) {
            this.game.beingsList[file.name] = {
              'data': this.game.deepCopy(response3.data),
              'structure': this.game.deepCopy(response3.structure),
              'animations': this.game.deepCopy(response3.animations),
              'lights': this.game.deepCopy(response3.lights),
            }
          }
        }
      }
    } catch (e) { this.game.loadingError = true; return; }
    if (logOn) console.log('BEINGS LIST: ', this.game.beingsList);

    this.game.heandsList[0] = false;
    try {
      this.game.addConsoleRow('+++ heands list +++', 'div', true, true)

      const response4 = await this.fetchData({ ajax: true, getheands: true })
      if (response4.files) {
        for (const file of response4.files) {
          const response5 = await this.fetchData({ ajax: true, load: true, filename: file.name, ext: file.extension, objectdir: '_heands' });
          if (response5?.data && response5?.structure) {
            let exp = file.name.split('_')

            this.game.heandsList[exp[0]] = {
              'id': exp[0],
              'name': exp[1],
              'filename': file.name,
              'ratio': response5.ratio ?? 1,
              'speed': 25,
              'data': this.game.deepCopy(response5.data),
              'structure': this.game.deepCopy(response5.structure),
              'animations': this.game.deepCopy(response5.animations),
            }
            // IF HAVE LIGHTS (lamp, lighter)
            if (response5.lights) this.game.heandsList[exp[0]].lights = this.game.deepCopy(response5.lights);
          }
        }
      }
    } catch (e) { this.game.loadingError = true; return; }
    if (logOn) console.log('HANDLE LIST: ', this.game.heandsList);

    try {
      this.game.addConsoleRow('+++ objects list +++', 'div', true, true)

      const response3 = await this.fetchData({ ajax: true, getobjects: true })
      if (response3.files) {
        for (const file of response3.files) {          
          const response4 = await this.fetchData({ ajax: true, load: true, filename: file.name, ext: file.extension, objectdir: '_objects' });
          if (response4?.data && response4?.structure) {            
            let exp = file.name.split('_')

            this.game.objectsList[exp[0]] = {
              'id': exp[0],
              'name': exp[1],
              'filename': file.name,
              'ratio': response4.ratio ?? 1,
              'text': response4.text,
              'read': response4.read ? (response4.read === 'false' ? false : response4.read) : false,
              'eat': response4.eat ? (response4.eat === 'false' ? false : parseInt(response4.eat)) : false,
              'eattype': response4.eattype ?? '0',
              'data': this.game.deepCopy(response4.data),
              'structure': this.game.deepCopy(response4.structure),
            }

            this.game.addConsoleRow(`Added Object: ${this.game.objectsList[exp[0]].id}. ${this.game.objectsList[exp[0]].name}, `, 'div', false, true)
          }
        }
      }
    } catch (e) { this.game.loadingError = true; return; }
    if (logOn) console.log('OBJECTLIST: ', this.game.objectsList);

    // MATERIAL
    try {
      this.game.addConsoleRow('+++ loading textures +++', 'div', true, true)

      await this.loadTextures()
    } catch (e) { this.game.loadingError = true; return; }    
    if (logOn) console.log('TEXTURES: ', this.game.loadedTextures);

    try {
      this.game.addConsoleRow('+++ loading sounds +++', 'div', true, true)

      await this.game.sound.loadSounds()
    } catch (e) { this.game.loadingError = true; return; }
    if (logOn) console.log('SOUNDS: ', this.game.loadedSounds);

    this.game.addConsoleRow('--- -------------- ---', 'div', true, true)
    this.game.addConsoleRow('--- -------------- ---', 'div', true, true)

    this.game.$loading.hide()
    // --
    this.game.generalLoading = true
  }

  async loadTexturesLinks() {
    const response = await this.fetchData({ ajax: true, gettexturestructure: true })
    if (response?.structure) {
      for (const key in response.structure) {
        let keys = Object.keys(response.structure[key]);
        for (let key2 of keys) {
          this.texturesLinks[key2] = response.structure[key][key2]
        }
      }
      // DEFAULT TEXTURE
      this.texturesLinks['notexture'] = { notexture: '.\\data\\notexture' }
    } else throw('Textures didn\'t load.');
  }

  async loadTextures() {
    await this.loadTexturesLinks()

    for (const name of Object.keys(this.texturesLinks)) {
      // console.log(name)
      if (this.game.loadedTextures[name]) {
        // IF THE TEXTURE IS LOADED
        console.log('LOADED! : ', this.game.loadedTextures[name])
        continue;
      }

      let texturePaths = Object.values(this.texturesLinks[name])
      if (texturePaths.length > 0) {
        // CHECK ISSET TIME FILE: data.ms
        const textureIntervalTime = this.game.config['animationtextures'][name]?.intervalTime ?? 500
        const textureplayingState = this.game.config['animationtextures'][name]?.playingState ?? true

        const loadData = await this.createSpritesheetTexture(texturePaths, textureIntervalTime, textureplayingState)
        if (loadData[0]) {
          this.game.loadedTextures[name] = loadData[1]
          this.game.loadedTextures[name].name = name

          const text = `${name}.png loaded!, `
          this.game.addConsoleRow(text, 'div', false, true)
        } else {
          const text = `${name}.png ERROR!`
          this.game.addConsoleRow(text, 'div', false, false)
          this.game.loadingError = true;
          return;  
        }
      } else {
        const text = `${name}.png ERROR!`
        this.game.loadingError = true;
        this.game.addConsoleRow(text, 'div', false, false)
        return;
      }
    }
  }

  // MORE ANIMATED PICTURE GENERATOR
  async createSpritesheetTexture(imagePaths, intervalTime = 500, textureplayingState = true) {
    const loader = new THREE.ImageLoader()
    const tilesHoriz = imagePaths.length
    const images = []

    for (const path of imagePaths) {
      try {
        const thisPath = path + '.png'
        const img = await new Promise((resolve, reject) => {
          loader.load( thisPath, resolve, undefined, () => reject(new Error(`Load error: ${thisPath}`))
          );
        });
        images.push(img)
      } catch (e) {
        console.error(`Load error: ${e.message}`);
        return [false]
      }
    }

    const frameWidth = images[0].width
    const frameHeight = images[0].height

    const canvas = document.createElement('canvas')
    canvas.width = frameWidth * tilesHoriz
    canvas.height = frameHeight
    const ctx = canvas.getContext('2d', { alpha: true })

    images.forEach((img, i) => {
      const x = i * frameWidth
      ctx.drawImage(img, x, 0)
    });

    const texture = new THREE.CanvasTexture(canvas)
    texture.minFilter = THREE.NearestFilter
    texture.magFilter = THREE.NearestFilter
    texture.generateMipmaps = false
    texture.wrapS = THREE.RepeatWrapping
    texture.wrapT = THREE.RepeatWrapping
    texture.tilesHoriz = imagePaths.length
    texture.repeat.set(1 / tilesHoriz, 1)
    texture.offset.set(0, 0)
    texture.imagesLength = images.length
    texture.intervalTime = intervalTime
    texture.playingState = textureplayingState

    return [true, texture];
  }

  startTextureMoveing(texture) {
    let currentTile = 0
    if (texture.imagesLength > 1) {      
      if (texture.interval == null) {
        texture.interval = setInterval(() => {
          currentTile = (currentTile + 1) % texture.imagesLength;
          texture.offset.x = currentTile / texture.tilesHoriz;
          texture.needsUpdate = true;
        }, texture.intervalTime);
      }
    }
  }

  // MAP LOADER
  async mapLoader(filename, ext) {
    this.cleanupMapRuntimeHitboxes()

    this.game.graphics.distanceMode = $("input[name='distance-mode']:checked").val()
    
    this.game.graphics.reloadScreen(this.game.graphics.distanceMode)

    let loadType = null
    let savedgamesdir = null

    if (ext == 'stuc' || ext == 'local') {
      loadType = 'loadgame'
      savedgamesdir = '__saved_games__'
      this.game.startGameInfoText = false; this.game.finishGameInfoText = false; this.game.waitingGameInfoText = false;
    } else {
      loadType = 'newgame'
      this.game.startGameInfoText = false; /* !!! */ this.game.finishGameInfoText = false; this.game.waitingGameInfoText = false;
    }

    $('#text-box').hide(); $('#text-box-text').html('');

    this.game.map = this.game.mapVariableReset()    

    this.game.map.map_filename = filename
    this.game.map.map_ext = ext

    const startTime = Date.now()
    this.game.addConsoleRow('--- loading map datas start ---', 'div', true, true)

    let response
    if (ext == 'stuc' || ext == 'mtuc') {
      response = await this.fetchData({ ajax: true, load: true, filename: filename, ext: ext, savedgamesdir: savedgamesdir })
    } else if (ext == 'local') {
      const localSaveData = localStorage.getItem(filename)
      const json = await this.decompressBase64ToString(localSaveData)
      response = JSON.parse(json)
    }

    if (response?.data && response?.structure) {
      // console.log('LOAD MAPDATA:', response)

      // CONFIG
      if (response.config != null) this.game.config = response.config
      // PLAYER
      this.game.map.player = {... this.game.config['player'], ...this.game.deepCopy(response.player)}
      this.game.map.player.nowtime = performance.now()

      if (response.playerObjects != null) this.game.playerObjects = response.playerObjects;
      
      if (response.playerMouse != null) {
        this.game.playerMouse = response.playerMouse

        $("#weapon1-selector").hide()
        $("#weapon2-selector").hide()
        $("#weapon3-selector").hide()

        if (this.game.playerMouse.lamp) $("#weapon1-selector").show()
        if (this.game.playerMouse.knife) $("#weapon2-selector").show()
        if (this.game.playerMouse.cigarette) $("#weapon3-selector").show()
      }

      this.game.autoMovePlayerData = { mode: null, weapon: null, handY: 0, time: 0 }

      // MAP
      this.game.map.data = this.game.deepCopy(response.data[0], true)
      this.game.map.structure = this.game.deepCopy(response.structure, true) // true all visible is true
      // LIGHTS
      this.game.map.lights = this.game.deepCopy(response.lights)
      // BEINGS
      this.game.map.beings = this.game.deepCopy(response.beings)
      // ACTIONS
      this.game.map.actions = this.game.deepCopy(response.actions)
      // PLAYER POSITION
      if (this.game.player.x !== 'undefined' && this.game.player.y !== 'undefined' && this.game.player.z !== 'undefined') {
        this.game.player.position.set(this.game.map.player.x, this.game.map.player.y, this.game.map.player.z)
        this.game.player.rotation.y = this.game.map.player.fYaw
        this.game.pitchObject.rotation.x = this.game.map.player.fXaw
      } else {
        this.game.player.position.set(0, 0, 0)
        this.game.player.rotation.y = 0
        this.game.pitchObject.rotation.x = 0
      }

      this.game.camera.position.set(0, 0, 0)
      this.game.camera.updateMatrixWorld(true)

      // LOAD MAP MESHS (DATA)
      for (let mesh of this.game.map.data) {
        let meshGroup = new THREE.Group() // (i) START MESHGROUP

        // CHECK VISIBLE (EDITOR MODE)
        // let selectedMeshStructure = this.game.findMeshById(this.game.map.structure, mesh.id)        
        // if (selectedMeshStructure.visible != 1) continue; // EDITOR OFF

        // GIVE MESH DATA TO MESHGROUP        
        if (mesh.id) meshGroup.objId = mesh.id;                          // IF HAVE MESH ID
        if (mesh.name) meshGroup.name = mesh.name;                       // IF HAVE MESH NAME
        if (mesh.text) meshGroup.text = mesh.text;                       // IF HAVE MESH INFO TEXT ADD
        if (mesh.pickuped) meshGroup.pickuped = mesh.pickuped            // IF HAVE PICKUPED
        if (mesh.pervious) meshGroup.pervious = mesh.pervious            // IF HAVE PERVIOUS
        // ACTIVE
        meshGroup.visible = mesh.active ?? true

        for (let tri of mesh.tris) {
          const geometry = new THREE.BufferGeometry()
          const vertices = new Float32Array([
            tri.p[0].x, tri.p[0].y, tri.p[0].z,
            tri.p[1].x, tri.p[1].y, tri.p[1].z,
            tri.p[2].x, tri.p[2].y, tri.p[2].z
          ]);

          geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3))

          const uvs = new Float32Array([
            tri.t[0].u, 1 - tri.t[0].v,
            tri.t[1].u, 1 - tri.t[1].v,
            tri.t[2].u, 1 - tri.t[2].v,
          ]);

          geometry.setAttribute('uv', new THREE.BufferAttribute(uvs, 2))  
          geometry.computeVertexNormals()

          let triNormal = tri?.normal ? 'FrontSide' : 'DoubleSide';
          let triTransparent = tri?.transparent ? true : false;
          // triTransparent = false; // !

          // SELECTED TEXTURE
          const texture = this.game.loadedTextures[tri.texture.name]

          // IF LOAD GAME PLAYINGSTATE
          if (loadType == 'loadgame') texture.playingState = this.game.config['animationtextures'][tri.texture.name]?.playingState ?? true;
          if (texture?.needsUpdate) texture.needsUpdate = false;

          const materialType = (this.game.lightsOn) ? 'MeshLambertMaterial' : 'MeshBasicMaterial';
          const material = new THREE[materialType]({
            map: texture,                                     // TEXTURA ÚJ MEGOLDÁS
            side: THREE[triNormal],                           // side: THREE.FrontSide, THREE.DoubleSide
            transparent: triTransparent,                      // Fontos a false, mert a tru nagyon lassítja!
            opacity: 1,
            alphaTest: 0.1,
          });

          meshGroup.texture = texture

          const triangleMesh = new THREE.Mesh(geometry, material)
          meshGroup.add(triangleMesh)

          geometry.computeBoundingBox()
          const box = geometry.boundingBox.clone()
          box.min.add(triangleMesh.position)
          box.max.add(triangleMesh.position)

          if (mesh.pervious) meshGroup.pervious = mesh.pervious
          if (!mesh.pervious) {
            // ADD BOUNDING BOX !!!
            meshGroup._boundingBoxes ??= []
            this.game.boundingBoxes.push(box)
            meshGroup._boundingBoxes.push(box)
          }

          // YELLOW BOX-HELPER
          if (false) {
            if (mesh.name == '' || true) {
              console.log(mesh.id)
              console.log(mesh.name)
              const helper = new THREE.Box3Helper(box, new THREE.Color('#ffff00'));
              this.game.scene.add(helper);
            }
          }
        }

        // RESTART ANIM TEXTURES
        for (const texture of Object.values(this.game.loadedTextures)) {
          if (texture.playingState) this.startTextureMoveing(texture);
        }

        meshGroup.box = new THREE.Box3().setFromObject(meshGroup)

        // IF ADD SCENE
        if (!meshGroup.pickuped) this.game.scene.add(meshGroup);

        // SOUND POSITION SAVE
        meshGroup.updateMatrixWorld(true)
        meshGroup.box = new THREE.Box3().setFromObject(meshGroup)
        meshGroup.center = new THREE.Vector3()
        meshGroup.box.getCenter(meshGroup.center)
        meshGroup.center.applyMatrix4(meshGroup.matrixWorld)

        this.game.loadedMeshs[mesh.id] = meshGroup  // (i) ADD loadedMeshs[mesh.id] !!!

        // LOAD ACTIONS OF MESH
        if (mesh?.actions && mesh.actions.length > 0) {
          // console.log('Van AKCIÓJA: ', mesh.name)
          for (const actionId of mesh.actions) {
            const thisAction = this.game.map.actions.find(action => action.id == actionId)
            if (thisAction) {
              thisAction.meshname = mesh.name
              this.game.map.actionelements.push([meshGroup, thisAction])
            }
          }
          this.game.addConsoleRow(`Add Mesh: ${mesh.id}. ${mesh.name}, `, 'div', false, true)
        }
      }

      // LIGHTS LOADING
      if (this.game.lightsOn) {
        this.game.addConsoleRow('--- loading Lights ---', 'div', true, true)

        if (this.game.map?.lights && this.game.map.lights.length > 0) {
          for (const light of this.game.map.lights) {
            //console.log('light.visible: ', light.visible)
            if (light.visible) {
              // console.log(light.color); console.log(light.editcolor); console.log(light.intensity); console.log(light.distance); console.log(light.type);

              // console.log('id: ', light.id, 'name: ', light.name, ' | active: ', light.active)

              let pointLight = light.active
              ? new THREE.PointLight(new THREE.Color(`#${light.color}`), light.intensity, light.distance)
              : new THREE.PointLight(new THREE.Color(0, 0, 0), 0, 0)

              pointLight.active = light.active

              pointLight.defaultValues = {
                'color': light.color,
                'intensity': light.intensity,
                'distance': light.distance,
                'active': light.active,
              }

              light.decay = light.decay ??= 2

              pointLight.position.set(light.p.x, light.p.y, light.p.z)
              // PRIMARY LIGHT
              this.game.scene.add(pointLight)
              this.game.loadedLights[light.id] = [light.name, pointLight]

              /*
              // HAND LIGHT
              const handLight = pointLight.clone()
              this.game.heandScene.add(handLight)
              */

              this.game.addConsoleRow(`Added Light: ${light.id}. ${light.name}, `, 'div', false, true)
            }
          }
        }
        // MINIMUM AMBIENT LIGHT
        if (true) {
          const ambient = new THREE.AmbientLight('#ffffff', this.game.menu.options.darkContrast)
          this.game.scene.add(ambient)
        }

      } else {
        this.game.addConsoleRow('--- Add ambient light !!! ---', 'div', true, true)
        const ambient = new THREE.AmbientLight('#ffffff', 1)
        this.game.scene.add(ambient)
      }

      // FIRST ADD BEINGS
      if (this.game.map.beings) {
        this.game.addConsoleRow('--- Add Beings ---', 'div', true, true)

        for (const being of this.game.map.beings) {
          const actualBeingData = this.game.beingsList[being.filename].data[0] ?? null
          if (actualBeingData) {
            if (!being.visible) continue;
            const beingNotHaveHitbox = this.game.config.beingNotHaveHitbox ?? []
            const beingName = being.name?.toLowerCase() ?? ''

            const beingGroup = new THREE.Group()
            beingGroup.beingId = being.id
            beingGroup.name = being.name
            beingGroup.filename = being.filename
            beingGroup.ratio = being.ratio
            beingGroup.speed = being.speed
            beingGroup.energy = being.energy
            beingGroup.damage = being.damage
            beingGroup.boxlines = being.boxlines
            beingGroup.angle = being.angle
            beingGroup.gravity = being.gravity == "1" ? true : false;
            beingGroup.active = being.active == "1" ? true : false;
            beingGroup.lights = this.game.beingsList[being.filename].lights
            beingGroup.apname = being.apname ?? null
            beingGroup.apactive = being.apactive == "1" ? true : false;
            beingGroup.animationActive = true // DIE hoz kell

            // IF NO HITBOX
            beingGroup.noHitbox = beingNotHaveHitbox.some(word => beingName.includes(String(word).toLowerCase()))

            const beingOptions = this.game.getBeingOptions(beingGroup)

            if (beingOptions.animationpoints)
              beingGroup.animationpoints = beingOptions.animationpoints;

            beingGroup.animState = {
              'type': being.type,
              'card': 0,
              'cardframe': 0,
              'cardsegment': 0,
            }

            // --- BOUNDINGBOX RATIO OPTIONS
            let largestBox = null
            let largestVolume = 0

            this.game.beingsList[being.filename].data.forEach(dataRow => {
              const box = this.game.boxFromDataRow(dataRow, being.ratio)

              const size = new THREE.Vector3()
              box.getSize(size)
              if (size.z === 0) size.z = 0.01; if (size.x === 0) size.x = 0.01; if (size.y === 0) size.y = 0.01;

              const volume = size.x * size.y * size.z             

              if (volume > largestVolume) {
                largestVolume = volume
                largestBox = box.clone()
              }
            });

            if (largestBox) {
              const center = new THREE.Vector3()
              const size = new THREE.Vector3()

              largestBox.getCenter(center)
              largestBox.getSize(size)
              if (size.z === 0) size.z = 0.01; if (size.x === 0) size.x = 0.01; if (size.y === 0) size.y = 0.01;

              const boundingBoxRatioSize = beingOptions.boundingBoxRatio ?? 1 * beingGroup.ratio
              
              /*
              console.log('name:', beingGroup.name)
              console.log(boundingBoxRatioSize) // !!!
              console.log('---:')
              */

              size.multiplyScalar(boundingBoxRatioSize)
              largestBox.setFromCenterAndSize(center, size)

              beingGroup.largestBoundingBox = largestBox
            }
            //--
            this.createTHREEObject(being, beingGroup, actualBeingData, false)

            beingGroup.position.set(being.p.x, being.p.y, being.p.z)
            beingGroup.rotation.y = THREE.MathUtils.degToRad(beingGroup.angle)

            this.game.scene.add(beingGroup)

            this.game.loadedBeings[being.id] = beingGroup
            this.game.loadedBeings[being.id].filename = being.filename
            this.game.loadedBeings[being.id].animTime = 0

            // LOAD BEING LIGHTS
            if (beingGroup.lights) {
              beingGroup.lights.forEach(light => {
                // POS
                const offset = new THREE.Vector3(light.p?.x ?? 0, light.p?.y ?? 0, light.p?.z ?? 0)
                offset.applyAxisAngle(new THREE.Vector3(0, 1, 0), beingGroup.rotation.y)

                const worldPos = new THREE.Vector3()
                beingGroup.getWorldPosition(worldPos)
                //
                light.decay = light.decay ?? 2
                const beingLight = new THREE.PointLight(`#${light.color}`, light.intensity, light.distance, light.decay)
                beingLight.position.copy(worldPos).add(offset)

                this.game.loadedLights[light.id] = [light.name, beingLight]

                this.game.scene.add(beingLight)
              });
            }

            // TURN ON / OFF BEING
            this.game.beingActiveOptions(beingGroup, beingGroup.active)

            this.game.addConsoleRow(`Added Being: ${being.id}. ${being.name}`, 'div', false, true)
          }
        }
        // console.log(this.game.loadedBeings)
      }

      // FIRST ADD HEANDS
      if (this.game.heandsList) {
        this.game.addConsoleRow('--- Add Heands ---', 'div', true, true)

        for (const heand of this.game.heandsList) {
          if (heand.id == null) continue;

          const actualHeandData = this.game.heandsList[heand.id].data[0] ? this.game.heandsList[heand.id].data[0] : null;
          if (actualHeandData) {
            const heandGroup = new THREE.Group()
            heandGroup.heandId = heand.id
            heandGroup.filename = heand.filename
            heandGroup.ratio = heand.ratio
            heandGroup.speed = heand.speed
            heandGroup.boxlines = heand.boxlines
            heandGroup.angle = 0
            heandGroup.animations = heand.animations
            heandGroup.animState = {
              'type': heand.animations?.[0][0] ?? null,
              'card': 0,
              'cardframe': 0,
              'cardsegment': 0,
            }
            heandGroup.visible = heand.id == this.game.playerMouse.selectedHeand ? true : false;
            heandGroup.lastUpdate = performance.now()

            // LOAD HEAND LIGHTS
            if (heand.lights) {
              heandGroup.lights = []
              heand.lights.map(light => {
                light.decay = light.decay ?? 2
                const newLight = new THREE.PointLight(`#${light.color}`, light.intensity, light.distance, light.decay)
                newLight.name = light.name
                newLight.position.set(light.p.x, light.p.y, light.p.z)

                heandGroup.lights.push(newLight)
              });
              //console.log(heandGroup.lights)
            }

            this.createTHREEObject(heand, heandGroup, actualHeandData, true)

            this.game.loadedHeands[heand.id] = heandGroup
            this.game.loadedHeands[heand.id].animTime = 0

            this.game.addConsoleRow(`Added Heand: ${heand.id}. ${heand.name}`, 'div', false, true)
          }
        }
        // console.log(this.game.loadedHeands)
      }

      // MODIFIED MESH CHANGES
      if (loadType == 'loadgame') this.restoreMoveFxStates()

      // SKY BACKGROUND
      if (!this.game.scene.background && this.game.graphics.distanceMode == 'best') {
        this.game.addConsoleRow('--- Add Skybox ---', 'div', true, true)

        const loader = new THREE.CubeTextureLoader()
        loader.setPath('img/skybox/')

        const files = ['px.png', 'nx.png', 'py.png', 'ny.png', 'pz.png', 'nz.png']

        const texture = await new Promise((resolve, reject) => {
          loader.load(
            files,
            texture => {
              texture.magFilter = THREE.NearestFilter
              texture.minFilter = THREE.NearestFilter
              texture.generateMipmaps = false
              if (texture?.needsUpdate) texture.needsUpdate = false;
        
              this.game.scene.background = texture
              this.game.addConsoleRow(`Added Sky files: ${files.join(', ')}`, 'div', false, true)
        
              resolve(texture)
            },
            undefined,
            error => reject(error)
          )
        });
      }

      // CHECK LOADING TIME
      const endTime = Date.now()
      this.game.addConsoleRow(`--- Map loaded: ${(endTime - startTime)} millisecond ---`, 'div', true, true)

      //--
     
      this.game.energyModifyScreen()
      this.game.oilModifyScreen()
      this.game.mapLoading = true
    }
  }

  restoreMoveFxStates() {
    for (const action of this.game.map.actions) {
      if (!action?.events) continue

      for (const event of action.events) {
        if (!Array.isArray(event.moveactions)) continue

        for (const fx of event.moveactions) {
          const meshId = Number(fx[0])
          const moveFxId = Number(fx[1])

          const meshGroup = this.game.loadedMeshs[meshId]
          const fxData = this.game.config.movefx.find(row => Number(row.id) == moveFxId)

          if (!meshGroup || !fxData) continue

          const oldData = fxData[event.id]
          if (!oldData) continue

          if (moveFxId >= 0 && moveFxId < 10) {
            this.game.gameplay.refreshOpenFxState(null, oldData, meshGroup)
            continue
          }

          if (moveFxId > 9 && moveFxId < 100) {
            if (oldData.deleted === true) {
              this.game.removeObjectOfMap(this.game.scene, meshGroup)
              delete this.game.loadedMeshs[meshId]
              continue
            }

            if (oldData.visible !== undefined) {
              meshGroup.visible = oldData.visible
            }

            if (typeof oldData.state === 'string' && oldData.texture_on && oldData.texture_off) {
              this.game.gameplay.refreshPicture(meshGroup, oldData)
            }

            // BOUNDING BOX OFF RESTORE
            if (moveFxId == 12 && oldData.state == true) {
              this.game.setMeshBoundingBoxActive(meshGroup, true)
            }

            if (moveFxId == 13 && oldData.state == true) {
              this.game.setMeshBoundingBoxActive(meshGroup, false)
            }
          }
        }
      }
    }
  }

  checkmoveFx(thisAction, meshGroup) {
    // OPENFX POSITION REFRESH
    for(let value of Object.values(this.game.config.movefx)) {
      if (value.id >= 0 && value.id < 10) {
        // OPEN FX
        for(let [eventId, oldData] of Object.entries(value)) {
          if (eventId == 'id' || eventId == 'name') continue;
          for(let event of thisAction.events) {
            if (event.id == eventId) {
              meshGroup = this.game.gameplay.refreshOpenFxState(null, oldData, meshGroup)
            }
          }
        }
      } else if (value.id > 9 && value.id < 100) {
        // SWITCH 1. # Picture Change. # Mesh visible ON/OFF # Delete Mesh of screen
        for(let [eventId, oldData] of Object.entries(value)) {
          if (eventId == 'id' || eventId == 'name') continue;
          for(let event of thisAction.events) {
            if (event.id == eventId) {
              /*
              if (oldData.deleted !== undefined && oldData.deleted) {
                if (Number(oldData.meshId) == Number(meshGroup.objId)) {
                  this.game.removeObjectOfMap(this.game.scene, meshGroup)
                  return null
                }
                continue;
              }
              */
              if (oldData.visible !== undefined) {
                if (Number(oldData.meshId) == Number(meshGroup.objId)) meshGroup.visible = oldData.visible;
              }
              if (oldData.state) this.game.gameplay.refreshPicture(meshGroup, oldData);
            }
          }
        }
      }
    }
    return meshGroup;
  }

  createTHREEObject(object, group, actualData, first = false) {
    for (let mesh of actualData) {
      const meshGroup = new THREE.Group()

      for (let tri of mesh.tris) {
        const geometry = new THREE.BufferGeometry()

        const vertices = new Float32Array([
          tri.p[0].x * object.ratio, tri.p[0].y * object.ratio, tri.p[0].z * object.ratio,
          tri.p[1].x * object.ratio, tri.p[1].y * object.ratio, tri.p[1].z * object.ratio,
          tri.p[2].x * object.ratio, tri.p[2].y * object.ratio, tri.p[2].z * object.ratio,
        ])
        geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3))

        const uvs = new Float32Array([
          tri.t[0].u, 1 - tri.t[0].v,
          tri.t[1].u, 1 - tri.t[1].v,
          tri.t[2].u, 1 - tri.t[2].v,
        ])
        geometry.setAttribute('uv', new THREE.BufferAttribute(uvs, 2))
        geometry.computeVertexNormals()

        let triTransparent = tri?.transparent ? true : false;
        // triTransparent = false; // !

        let triNormal = tri?.normal ? 'FrontSide' : 'DoubleSide';

        const texture = this.game.loadedTextures[tri.texture.name] ?? this.game.loadedTextures['notexture'];
        if (texture?.needsUpdate) texture.needsUpdate = false;

        const materialType = this.game.lightsOn ? 'MeshLambertMaterial' : 'MeshBasicMaterial'
        const material = new THREE[materialType]({
          map: texture,
          side: THREE[triNormal], // side: THREE.FrontSide, THREE.DoubleSide
          opacity: 1,
          transparent: triTransparent,
          alphaTest: 0.1,
        })

        const triangleMesh = new THREE.Mesh(geometry, material)
        meshGroup.add(triangleMesh)
      }

      meshGroup.objId = mesh.id
      meshGroup.name = mesh.name

      group.add(meshGroup)
    }
  }

  async loadSavedgamesList(mode) {
    if (mode == 'file') {      
      const response = await this.fetchData({ ajax: true, getsavegameslist: true, dirsstructure: '__saved_games__' })
      if (response?.files) {
        $("#savegame-list").html('')
        let list = ``
        response.files.forEach(files => {
          list += `<div class="d-inline-flex align-items-center gap-2 mb-2"><span class="savegame-listelement text-dark cursor-pointer px-2 py-1" data-filename="${files.name}" data-ext="${files.extension}">${files.name}.${files.extension}</span><span class="del-save-button cursor-pointer rounded-circle bg-danger text-white d-flex justify-content-center align-items-center p-1">&#x2716;</span></div>`
        })
        $("#savegame-list").html(list)
  
      } else throw('Savegames list didn\'t load.')

    } else if (mode == 'local') {
      $("#local-savegame-list").html('')
      let list = ``

      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i)
        if (!key.startsWith('save_')) continue

        list += `<div class="d-inline-flex align-items-center gap-2 mb-2"><span class="savegame-listelement text-dark cursor-pointer px-2 py-1" data-filename="${key}" data-ext="local">${key} (${(localStorage.getItem(key).length / 1024).toFixed(1)} KB)</span><span class="del-save-button cursor-pointer rounded-circle bg-danger text-white d-flex justify-content-center align-items-center p-1">&#x2716;</span></div>`
      }

      $("#local-savegame-list").html(list)
    }
  }

  cleanupMapRuntimeHitboxes() {
    this.cleanupBeingRuntimeHitboxes()

    this.game.boundingBoxes = []
  }

  cleanupBeingRuntimeHitboxes() {
    if (!this.game?.loadedBeings) return

    for (const beingGroup of Object.values(this.game.loadedBeings)) {
      if (!beingGroup) continue

      if (beingGroup.helper) {
        this.game.scene.remove(beingGroup.helper)
        beingGroup.helper.geometry?.dispose?.()
        beingGroup.helper.material?.dispose?.()
        beingGroup.helper = null
      }

      if (beingGroup.box) {
        this.game.boundingBoxes = this.game.boundingBoxes.filter(box => box !== beingGroup.box)
        beingGroup.box = null
      }
    }
  }

  async saveGame(mode) {
    if (this.game.filename && this.game.ext) {
      this.cleanupBeingRuntimeHitboxes()

      const save_filename = Date.now()
      const save_ext = 'stuc';

      const savePlayerData = {
        x: this.game.player.position.x,
        y: this.game.player.position.y,
        z: this.game.player.position.z,
        fYaw: this.game.player.rotation._y,
        fXaw: this.game.pitchObject.rotation._x,
      }

      // IF HAME REMOVE HEAND LIGHT IS SCENE
      this.game.gameplay.removeHeandLight()

      // GET LIGHTS DATA
      let convertLights = []
      for (const [id, light] of Object.entries(this.game.loadedLights)) {
        convertLights.push({
          id: id,
          name: light[0],
          type: 'point',
          color: light[1].defaultValues?.color ?? null,
          distance: light[1].defaultValues?.distance ?? null,
          intensity: light[1].defaultValues?.intensity ?? null,
          decay: light[1].decay,
          visible: light[1].visible,
          active: light[1].active,
          p: {
            x: light[1].position.x,
            y: light[1].position.y,
            z: light[1].position.z,
            w: 1
          }
        })
      }

      // GET BEINGS DATA
      let convertBeings = []
      for (const [id, being] of Object.entries(this.game.loadedBeings)) {
        const thisBeing = this.game.map.beings.find(being => being.id == id)
        if (thisBeing) {
          const { box, helper, _boundingBox, container, ...safeBeingData } = thisBeing
          convertBeings.push({
            ...safeBeingData,
            active: being.active ? "1" : "0",
            ratio: being.ratio,
            speed: being.speed,
            energy: being.energy,
            type: being.animState.type,
            p: {
              x: being.position.x,
              y: being.position.y,
              z: being.position.z,
            }
          })
        }
      }

      // TO PREPARE SAVE DATA
      const saveMapData = {
        config: this.game.config,
        player: savePlayerData,
        data: [this.game.map.data],
        structure: this.game.map.structure,
        lights: convertLights,
        beings: convertBeings,
        actions: this.game.map.actions,
        playerObjects: this.game.playerObjects,
        playerMouse: this.game.playerMouse,
      }

      const saveMapDataJSON = JSON.stringify(saveMapData)

      if (mode == 'file') {
        // FILE SAVE
        const responseSave = await this.fetchData({ ajax: true, savegame: true, save_filename: save_filename, save_ext: save_ext, mapdata: saveMapDataJSON });
        if (responseSave?.success) {
          $("#savegame-message").html(`<div class="text-center text-success">${responseSave?.success}</div>`)
          setTimeout(() => {$("#savegame-message").html('')}, 4000);
          return true;
        } else {
          $("#savegame-message").html(`<span class="text-center text-danger">${responseSave?.error}</span>`)
          setTimeout(() => {$("#savegame-message").html('')}, 4000);
          return false;
        }
      } else if (mode == 'local') {
        try {
          const saveName = 'save_' + Date.now()

          const compressedSaveMapData = await this.compressStringToBase64(saveMapDataJSON)

          localStorage.setItem(saveName, compressedSaveMapData)
          // localStorage.setItem(saveName, saveMapDataJSON) // old

          this.game.filename = saveName
          this.game.ext = 'local'

          $("#file-input").val(saveName).attr('data-ext', 'local')

          $("#local-savegame-message").html(`<div class="text-center text-success">${saveName}</div>`)
          setTimeout(() => {
            $("#local-savegame-message").html('')
          }, 4000)

          return true;
        } catch (err) {
          if (
            err.name === 'QuotaExceededError' ||
            err.name === 'NS_ERROR_DOM_QUOTA_REACHED' ||
            err.code === 22 ||
            err.code === 1014
          ) {
            $("#local-savegame-message").html(`<div class="text-center text-danger">Elfogyott a localStorage hely!</div>`)
            setTimeout(() => {
              $("#local-savegame-message").html('')
            }, 4000)

            return false;
          }

          throw err
        }
      }
    }
  }

  deleteCurrentLocalSave(filename = null) {
    const saveName = filename ?? this.game.filename

    if (!saveName || this.game.ext != 'local') {
      $("#local-savegame-message").html(`<div class="text-center text-danger">Nincs local mentés kijelölve!</div>`)
      setTimeout(() => {
        $("#local-savegame-message").html('')
      }, 4000)
      return false;
    }

    if (!localStorage.getItem(saveName)) {
      $("#local-savegame-message").html(`<div class="text-center text-danger">Nem található local mentés: ${saveName}</div>`)
      setTimeout(() => {
        $("#local-savegame-message").html('')
      }, 4000)
      return false;
    }

    localStorage.removeItem(saveName)

    if (this.game.filename == saveName) {
      this.game.filename = ''
      this.game.ext = ''
      $("#file-input").val('').attr('data-ext', '')
    }

    $("#local-savegame-message").html(`<div class="text-center text-success">Törölve: ${saveName}</div>`)
    setTimeout(() => {
      $("#local-savegame-message").html('')
    }, 4000)

    this.loadSavedgamesList('local')

    return true;
  }


  loadGame() {
    this.game.map.player = JSON.parse(saveMapData.player)
    this.game.map.data = JSON.parse(saveMapData.data)
    this.game.map.structure = JSON.parse(saveMapData.structure)
    this.game.map.lights = JSON.parse(saveMapData.lights)
    this.game.map.actions = JSON.parse(saveMapData.actions)
  }

  // ---

  async fetchData(data, originaldata) {
    // const path = 'https://tuccmann.com/3deditor4/editor.php'; // Online
    const path = 'http://localhost/3deditor/editor.php';
    try {
      const response = await $.ajax({
        url: path,
        type: 'POST',
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        data: data,
      });
      return originaldata ? response : JSON.parse(response);
    } catch (error) {}
  }

  // COMPRESS LOCAL SAVE GAME
  async compressStringToBase64(str) {
    const stream = new Blob([str])
      .stream()
      .pipeThrough(new CompressionStream('gzip'))

    const compressedBuffer = await new Response(stream).arrayBuffer()
    const bytes = new Uint8Array(compressedBuffer)

    let binary = ''
    const chunkSize = 0x8000

    for (let i = 0; i < bytes.length; i += chunkSize) {
      const chunk = bytes.subarray(i, i + chunkSize)
      binary += String.fromCharCode(...chunk)
    }

    return btoa(binary)
  }

  async decompressBase64ToString(base64) {
    const binary = atob(base64)
    const bytes = new Uint8Array(binary.length)

    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i)
    }

    const stream = new Blob([bytes])
      .stream()
      .pipeThrough(new DecompressionStream('gzip'))

    return await new Response(stream).text()
  }
}
