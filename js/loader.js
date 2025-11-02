import $, { map } from 'jquery'
import * as THREE from 'three'

export default class Loader {

  constructor(game) {
    this.game = game

    this.texturesLinks = []
  }

  async generalLoader(logOn) {
    try {
      await this.loadTextures()
      if (logOn) console.log(this.game.loadedTextures)        
    } catch (e) { this.game.loadingError = true; return; }

    try {
      const response = await fetch('config.json')
      this.game.config = await response.json()
    } catch (e) { this.game.loadingError = true; return; }

    // FINISH LOADING
    this.game.generalLoading = true
    this.game.$loading.hide()
  }

  async loadTextures() {
    await this.loadTexturesLinks()

    console.log(this.texturesLinks)

    for (const [name, path] of Object.entries(this.texturesLinks)) {
      // console.log(name, path)
      let texturePaths = Object.values(this.texturesLinks[name])
      if (texturePaths.length > 0) {
        const loadData = await this.createSpritesheetTexture(name, texturePaths, 500)
        this.game.loadedTextures[name] = loadData
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
  async createSpritesheetTexture(name, imagePaths, interval = 100) {    // !! KÉP ANIMÁCIÓ IDŐ az iterval
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

    return texture;
  }

  async mapLoader() {
    const filename = $("#file-input").val()
    const ext = $("#file-input").attr('data-ext')

    const response = await this.fetchData({ ajax: true, load: true, filename: filename, ext: ext })
    if (response?.data && response?.structure) {
      this.game.map.data = this.game.deepCopy(response.data[0], true)
      this.game.map.structure = this.game.deepCopy(response.structure, true)
      this.game.map.lights = this.game.deepCopy(response.lights)
      this.game.map.beings = this.game.deepCopy(response.beings)
      this.game.map.actions = this.game.deepCopy(response.actions)
      this.game.map.player = this.game.deepCopy(response.player)

      this.game.player.position.x = this.game.map.player.x
      this.game.player.position.y = this.game.map.player.y

      this.game.player.position.z = -this.game.map.player.z / 7 + 1
      // this.game.player.position.z = -this.game.map.player.z / 7 + 3  // !!!
      // console.log(this.game.player.position.z)

      this.game.player.rotation.y -= this.game.map.player.fYaw
      this.game.pitchObject.rotation.x -= -this.game.map.player.fXaw

      if (false) {
        console.log('----')
        console.log(this.game.map.data)
        console.log(this.game.map.structure)
        console.log(this.game.map.player)
        console.log(this.game.map.lights)
        console.log(this.game.map.beings)
        console.log(this.game.map.actions)
        console.log('----')
      }

      // LOAD MAP MESHS
      for (let mesh of this.game.map.data) {
        const meshGroup = new THREE.Group()
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

          const materialType = (this.game.lightsOn) ? 'MeshLambertMaterial' : 'MeshBasicMaterial';
          const material = new THREE[materialType]({
            map: this.game.loadedTextures[tri.texture.name],  // TEXTURA ÚJ MEGOLDÁS
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

          this.game.boundingBoxes.push(box)

          // YELLOW BOX-HELPER
          if (mesh.name == 'radio' && false) {
            const helper = new THREE.Box3Helper(box, new THREE.Color('#ffff00'));
            this.game.scene.add(helper);
          }
        }

        meshGroup.box = new THREE.Box3().setFromObject(meshGroup)

        if (mesh.name) meshGroup.name = mesh.name;  // IF HAVE MESH NAME
        if (mesh.text) meshGroup.text = mesh.text;  // IF HAVE MESH INFO TEXT ADD
        
        this.game.scene.add(meshGroup)

        // SOUND POSITION SAVE
        meshGroup.updateMatrixWorld(true)
        meshGroup.box = new THREE.Box3().setFromObject(meshGroup)
        meshGroup.center = new THREE.Vector3()
        meshGroup.box.getCenter(meshGroup.center)

        meshGroup.center.applyMatrix4(meshGroup.matrixWorld)

        this.game.loadedMeshs[mesh.id] = meshGroup

        // LOAD ACTIONS OF MESH
        if (mesh?.actions && mesh.actions.length > 0) {
          // console.log('Van AKCIÓJA: ', mesh.name)
          for (const action of mesh.actions) {
            let actionData = this.game.map.actions.find(obj => obj.id == action)
            if (actionData) {
              actionData.meshname = mesh.name
              this.game.map.actionelements.push([meshGroup, actionData])
            }
          }
        }
      }

      //ADD ACTIONS CLICK CHECKS
      this.game.input.actionsClicksCheck()

      // LIGHTS LOADING
      if (this.game.lightsOn) {
        if (this.game.map?.lights && this.game.map.lights.length > 0) {
          for (const light of this.game.map.lights) {
            //console.log('light.visible: ', light.visible)
            if (light.visible) {
              // console.log(light.color); console.log(light.editcolor); console.log(light.intensity); console.log(light.distance); console.log(light.type);
              console.log(light.color)
              let lightColor = new THREE.Color(`#${light.color}`)

              let pointLight
              if (light.type == 'point') pointLight = new THREE.PointLight(lightColor, light.intensity, light.distance * 5);    
              else if (light.type == 'direction') pointLight = new THREE.DirectionalLight(lightColor, light.intensity);
          
              if (pointLight) {
                pointLight.position.set(light.p.x, light.p.y, light.p.z)
                // PRIMARY LIGHT
                this.game.scene.add(pointLight)
                // HAND LIGHT
                const handLight = pointLight.clone()
                this.game.heandScene.add(handLight)

                this.game.loadedLights[light.id] = [light.name, pointLight]
              }
            }
          }
          // MINIMUM AMBIENT LIGHT
          if (false) {  // !!!
            const ambient = new THREE.AmbientLight('#ffffff', 0.0)  // 0.05
            this.game.scene.add(ambient)
          }
        }

      } else {
        console.log('AMBIENT ALAP FÉNY')
        const ambient = new THREE.AmbientLight('#ffffff', 1)
        this.game.scene.add(ambient)
      }

      // BEINGS DATA LOADING
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
        // FIRST ADD BEINGS
        if (this.game.map.beings) {
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
            }
          }
          // console.log(this.game.loadedBeings)
        }
      }

      // HEANDS DATA LOADING
      this.game.heandsList[0] = false;
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
        // FIRST ADD HEANDS
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
                light.decay = light.decay ?? 1
                const newLight = new THREE.PointLight(`#${light.color}`, light.intensity, light.distance, light.decay)
                newLight.name = light.name
                newLight.position.set(light.p.x, light.p.y, light.p.z)

                heandGroup.lights.push(newLight)
              });
              //console.log(heandGroup.lights)
            }

            this.createTHREEObject(heand, heandGroup, actualHeandData, true)

            this.game.loadedHeands[heand.id] = heandGroup
          }
        }
        // console.log(this.game.loadedHeands)
      }

      // OBJECTS DATA LOADING
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
              'read': response4.read
              ? (response4.read === 'false' ? false : response4.read)
              : false,
              'eat': response4.eat
              ? (response4.eat === 'false' ? false : parseInt(response4.eat))
              : false,
              'data': this.game.deepCopy(response4.data),
              'structure': this.game.deepCopy(response4.structure),
            }
          }
        }
        // console.log(this.game.objectsList)
      }

      // SKY BACKGROUND
      const loader = new THREE.CubeTextureLoader()
      loader.setPath('img/skybox/')
      const texture = loader.load(
        [ 'px.png', 'nx.png', 'py.png', 'ny.png', 'pz.png', 'nz.png' ],
        () => {
          texture.magFilter = THREE.NearestFilter
          texture.minFilter = THREE.NearestFilter
          texture.generateMipmaps = false
          texture.needsUpdate = true
          this.game.scene.background = texture
        }
      );

      this.game.mapLoading = true
    }
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

        const materialType = this.game.lightsOn ? 'MeshLambertMaterial' : 'MeshBasicMaterial'
        const material = new THREE[materialType]({
          map: this.game.loadedTextures[tri.texture.name],
          side: THREE[triNormal], // side: THREE.FrontSide, THREE.DoubleSide
          opacity: 1,
          transparent: triTransparent,
          alphaTest: 0.1,
        })

        const triangleMesh = new THREE.Mesh(geometry, material)

        //!! FIRST
        if (first) {
          // material.depthTest = false
          // triangleMesh.renderOrder = 10_000

          // material.depthWrite = false;  // ne írjon a z-bufferbe
          // material.renderOrder = 999999; // mindig utolsónak rajzolódjon
        }

        meshGroup.add(triangleMesh)
      }

      group.add(meshGroup)
    }
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
