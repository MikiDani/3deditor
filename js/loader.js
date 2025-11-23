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

  async loadTextures() {
    await this.loadTexturesLinks()    

    for (const [name, path] of Object.entries(this.texturesLinks)) {
      // console.log(name, path)
      if (this.game.loadedTextures[name]) {
        // IF THE TEXTURE IS LOADED
        console.log('LOADED! : ', this.game.loadedTextures[name])
        continue;
      }

      let texturePaths = Object.values(this.texturesLinks[name])

      if (texturePaths.length > 0) {
        const loadData = await this.createSpritesheetTexture(texturePaths, 500)        
        if (loadData[0]) {
          this.game.loadedTextures[name] = loadData[1]
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

  async loadTexturesLinks() {
    const response = await this.fetchData({ ajax: true, gettexturestructure: true })
    if (response?.structure) {
      for (const key in response.structure) {
        let keys = Object.keys(response.structure[key]);
        for (let key2 of keys) {
          this.texturesLinks[key2] = response.structure[key][key2]
        }
      }
    } else throw('Textures didn\'t load.');
  }

  // Spritesheet generálása több képből és animált textúra létrehozása
  async createSpritesheetTexture(imagePaths, interval = 100) {    // !! KÉP ANIMÁCIÓ IDŐ az iterval
    const loader = new THREE.ImageLoader()
    const tilesHoriz = imagePaths.length
    const images = []

    for (const path of imagePaths) {
      try {
        const thisPath = path + '.png'
        const img = await new Promise((resolve, reject) => {
          loader.load( thisPath, resolve, undefined, () => reject(new Error(`Nem sikerült betölteni: ${thisPath}`))
          );
        });
        images.push(img)
      } catch (e) {
        console.error(`Hiba a kép betöltésekor: ${e.message}`);
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
    texture.repeat.set(1 / tilesHoriz, 1)
    texture.offset.set(0, 0)

    let currentTile = 0;
    const tileCount = images.length;

    if (tileCount > 1) {
      setInterval(() => {
        currentTile = (currentTile + 1) % tileCount;
        texture.offset.x = currentTile / tilesHoriz;
        texture.needsUpdate = true;
      }, interval);
    }

    return [true, texture];
  }

  // MAP LOADER
  async mapLoader(filename, ext) {
    console.log(filename, ext)

    let loadType = null
    let savedgamesdir = null
    if (ext == 'stuc') {
      loadType = 'loadgame'
      savedgamesdir = '__saved_games__'
    } else {
      loadType = 'newgame'
    }

    this.game.map = this.game.mapVariableReset()
    this.game.map.map_filename = filename
    this.game.map.map_ext = ext

    const startTime = Date.now()
    this.game.addConsoleRow('--- loading map datas start ---', 'div', true, true)

    const response = await this.fetchData({ ajax: true, load: true, filename: filename, ext: ext, savedgamesdir: savedgamesdir })
    if (response?.data && response?.structure) {
      // console.log('LOAD MAPDATA:', response)

      // CONFIG
      if (response.config != null) this.game.config = response.config
      // PLAYER
      this.game.map.player = this.game.deepCopy(response.player)
      if (response.playerObjects != null) this.game.playerObjects = response.playerObjects;
      if (response.playerMouse != null) this.game.playerMouse = response.playerMouse;
      // MAP
      this.game.map.data = this.game.deepCopy(response.data[0], true)
      this.game.map.structure = this.game.deepCopy(response.structure, true)
      // LIGHTS
      this.game.map.lights = this.game.deepCopy(response.lights)
      // BEINGS
      this.game.map.beings = this.game.deepCopy(response.beings)
      // ACTIONS
      this.game.map.actions = this.game.deepCopy(response.actions)

      // this.game.map.actionelements = []
      // if (response.actionelements != null) this.game.map.actionelements = response.actionelements;

      // PLAYER POSITION
      this.game.player.position.set(this.game.map.player.x, this.game.map.player.y, this.game.map.player.z)
      this.game.player.rotation.y = this.game.map.player.fYaw
      this.game.pitchObject.rotation.x = this.game.map.player.fXaw
      this.game.camera.position.set(0, 0, 0)
      this.game.camera.updateMatrixWorld(true)

      // LOAD MAP MESHS (DATA)
      for (let mesh of this.game.map.data) {
        let meshGroup = new THREE.Group() //(i) START MESHGROUP

        // GIVE MESH DATA TO MESHGROUP        
        if (mesh.id) meshGroup.objId = mesh.id;                 // IF HAVE MESH ID
        if (mesh.name) meshGroup.name = mesh.name;              // IF HAVE MESH NAME
        if (mesh.text) meshGroup.text = mesh.text;              // IF HAVE MESH INFO TEXT ADD
        if (mesh.pickuped) meshGroup.pickuped = mesh.pickuped   // IF HAVE PICKUPED

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

          let triTransparent = tri?.transparent ? true : false;
          let triNormal = tri?.normal ? 'FrontSide' : 'DoubleSide';

          const texture = this.game.loadedTextures[tri.texture.name]
          if (texture?.needsUpdate) texture.needsUpdate = false;

          const materialType = (this.game.lightsOn) ? 'MeshLambertMaterial' : 'MeshBasicMaterial';
          const material = new THREE[materialType]({
            map: texture,                                     // TEXTURA ÚJ MEGOLDÁS
            side: THREE[triNormal],                           // side: THREE.FrontSide, THREE.DoubleSide
            transparent: triTransparent,                      // Fontos a false, mert a tru nagyon lassítja!
            opacity: 1,
            alphaTest: 0.1,
          });

          const triangleMesh = new THREE.Mesh(geometry, material)
          meshGroup.add(triangleMesh)

          geometry.computeBoundingBox()
          const box = geometry.boundingBox.clone()
          box.min.add(triangleMesh.position)
          box.max.add(triangleMesh.position)

          this.game.boundingBoxes.push(box); // ADD BOUNDING BOX !!!

          // YELLOW BOX-HELPER
          if (false) {
            if (mesh.name == 'HUTO-AJTO') {
              console.log(mesh.id)
              console.log(mesh.name)
              const helper = new THREE.Box3Helper(box, new THREE.Color('#ffff00'));
              this.game.scene.add(helper);
            }
          }
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

        this.game.loadedMeshs[mesh.id] = meshGroup  //(i) ADD loadedMeshs[mesh.id] !!!

        // LOAD ACTIONS OF MESH
        if (mesh?.actions && mesh.actions.length > 0) {
          // console.log('Van AKCIÓJA: ', mesh.name)
          for (const actionId of mesh.actions) {
            const thisAction = this.game.map.actions.find(action => action.id == actionId)
            if (thisAction) {
              if (loadType == 'loadgame') meshGroup = this.checkmoveFx(thisAction, meshGroup);

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
              let lightColor = new THREE.Color(`#${light.color}`)

              let pointLight
              if (light.type == 'point') pointLight = new THREE.PointLight(lightColor, light.intensity, light.distance);    
              else if (light.type == 'direction') pointLight = new THREE.DirectionalLight(lightColor, light.intensity);

              light.decay = light.decay ?? 2

              if (pointLight) {
                pointLight.position.set(light.p.x, light.p.y, light.p.z)
                // PRIMARY LIGHT
                this.game.scene.add(pointLight)
                // HAND LIGHT
                const handLight = pointLight.clone()
                this.game.heandScene.add(handLight)

                this.game.loadedLights[light.id] = [light.name, pointLight]

                this.game.addConsoleRow(`Added Light: ${light.id}. ${light.name}, `, 'div', false, true)
              }
            }
          }
          // MINIMUM AMBIENT LIGHT
          if (false) {  // !!!
            const ambient = new THREE.AmbientLight('#ffffff', 0.2)  // 0.05
            this.game.scene.add(ambient)
          }
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
          const actualBeingData = this.game.beingsList[being.filename].data[0]
          if (actualBeingData) {
            const beingGroup = new THREE.Group()

            beingGroup.beingId = being.id
            beingGroup.ratio = being.ratio
            beingGroup.speed = being.speed
            beingGroup.energy = being.energy
            beingGroup.damage = being.damage
            beingGroup.boxlines = being.boxlines
            beingGroup.angle = being.angle    

            beingGroup.animState = {
              'type': being.type,
              'card': 0,
              'cardframe': 0,
              'cardsegment': 0,
            }

            this.createTHREEObject(being, beingGroup, actualBeingData, false)

            beingGroup.position.set(being.p.x, being.p.y, being.p.z)
            beingGroup.rotation.y = THREE.MathUtils.degToRad(beingGroup.angle)

            this.game.scene.add(beingGroup)

            this.game.loadedBeings[being.id] = beingGroup
            this.game.loadedBeings[being.id].filename = being.filename              
            this.game.loadedBeings[being.id].lastUpdate = performance.now()

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

            this.game.addConsoleRow(`Added Heand: ${heand.id}. ${heand.name}`, 'div', false, true)
          }
        }
        // console.log(this.game.loadedHeands)
      }    

      // SKY BACKGROUND
      if (!this.game.scene.background) {
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
      this.game.mapLoading = true
    }
  }

  checkmoveFx(thisAction, meshGroup) {
    // OPENFX POSITION REFRESH
    for(let value of Object.values(this.game.config.movefx)) {
      if (value.id == 0 || value.id == 1 || value.id == 2 ) {
        // OPEN FX
        for(let [eventId, oldData] of Object.entries(value)) {
          if (eventId == 'id' || eventId == 'name') continue;
          for(let event of thisAction.events) {
            if (event.id == eventId) {
              meshGroup = this.game.gameplay.refreshOpenFxState(oldData, meshGroup)
            }
          }
        }
      } else if (value.id == 3 || value.id == 5 || value.id == 6) {
        // SWITCH 1. # Picture Change. # Micro Hamster Change
        for(let [eventId, oldData] of Object.entries(value)) {
          if (eventId == 'id' || eventId == 'name') continue;
          for(let event of thisAction.events) {
            if (event.id == eventId) this.game.gameplay.refreshPicture(meshGroup, oldData);
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
        let triNormal = tri?.normal ? 'FrontSide' : 'DoubleSide';

        const texture = this.game.loadedTextures[tri.texture.name]
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
      group.add(meshGroup)
    }
  }

  async loadSavedgamesList() {
    const response = await this.fetchData({ ajax: true, getsavegameslist: true, dirsstructure: '__saved_games__' })
    if (response?.files) {
      $("#savegame-list").html('')
      let list = ``
      response.files.forEach(files => {
        list += `<div class="d-inline-flex align-items-center gap-2 mb-2"><span class="savegame-listelement text-dark cursor-pointer px-2 py-1" data-filename="${files.name}" data-ext="${files.extension}">${files.name}.${files.extension}</span><span class="del-save-button cursor-pointer rounded-circle bg-danger text-white d-flex justify-content-center align-items-center p-1">&#x2716;</span></div>`;
      });

      $("#savegame-list").html(list)

    } else throw('Savegames list didn\'t load.');
  }

  async saveGame() {
    if (this.game.filename && this.game.ext) {

      const save_filename = Date.now()
      const save_ext = 'stuc';

      const savePlayerData = {
        x: this.game.player.position.x,
        y: this.game.player.position.y,
        z: this.game.player.position.z,
        fYaw: this.game.player.rotation._y,
        fXaw: this.game.pitchObject.rotation._x,
      }

      // GET LIGHTS DATA
      let convertLights = []
      for (const [id, light] of Object.entries(this.game.loadedLights)) {      
        convertLights.push({
          id: id,
          name: light[0],
          type: 'point',
          color: light[1].color.getHexString(),
          distance: light[1].distance,
          intensity: light[1].intensity,
          decay: light[1].decay,
          visible: light[1].visible,
          p: {
            x: light[1].position.x,
            y: light[1].position.y,
            z: light[1].position.z,
            w: 1
          }
        })
      }

      // TO PREPARE SAVE DATA
      const saveMapData = {
        config: this.game.config,
        player: savePlayerData,
        data: [this.game.map.data],
        structure: this.game.map.structure,
        lights: convertLights,
        beings: this.game.map.beings,
        actions: this.game.map.actions,
        playerObjects: this.game.playerObjects,
        playerMouse: this.game.playerMouse,
      }

      const saveMapDataJSON = JSON.stringify(saveMapData)

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
    }
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
    // const path = 'https://tuccmann.com/3deditor1/editor.php'; // Online
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
}
