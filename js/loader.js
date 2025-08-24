import $ from 'jquery'
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
    // console.log(this.texturesLinks)
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
  async createSpritesheetTexture(name, imagePaths, interval = 100) {
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

      // this.game.player.position.z = -this.game.map.player.z / 7  // !!!
      this.game.player.position.z = -this.game.map.player.z / 7 + 3
      console.log(this.game.player.position.z)

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

      // ADD MAP DATA
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
            side: THREE[triNormal],       // side: THREE.FrontSide, THREE.DoubleSide
            transparent: triTransparent,  // Fontos a false, mert a tru nagyon lassítja!
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
          const helper = new THREE.Box3Helper(box, new THREE.Color(0xffff00));
          if (this.game.boxHelp) {
            this.game.scene.add(helper);
          }
        }

        // LOAD ACTIONS
        if (mesh?.actions && mesh.actions.length > 0) {
          console.log('Van AKCIÓJA: ', mesh.name)
          for (const action of mesh.actions) {
            let actionData = this.game.map.actions.find(obj => obj.id == action)
            if (actionData) {
              actionData.meshname = mesh.name
              this.game.map.actionelements.push([meshGroup, actionData])
            }
          }
        }

        meshGroup.box = new THREE.Box3().setFromObject(meshGroup)
        this.game.loadedMeshs[mesh.id] = meshGroup
        this.game.scene.add(meshGroup)
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
              let lightColor = new THREE.Color(parseInt(light.color, 16))

              let pointLight
              if (light.type == 'point') pointLight = new THREE.PointLight(lightColor, light.intensity, light.distance * 5);    
              else if (light.type == 'direction') pointLight = new THREE.DirectionalLight(lightColor, light.intensity);
          
              if (pointLight) {
                pointLight.position.set(light.p.x, light.p.y, light.p.z)
                this.game.scene.add(pointLight)

                this.game.loadedLights[light.id] = [light.name, pointLight]
              }
            }
          }
          // MINIMUM AMBIENT LIGHT
          const ambient = new THREE.AmbientLight(0xffffff, 0.0)  // 0.05
          this.game.scene.add(ambient)
        }

      } else {
        console.log('AMBIENT ALAP FÉNY')
        const ambient = new THREE.AmbientLight(0xffffff, 1)
        this.game.scene.add(ambient)
      }

      // BEINGS DATA LOADING
      const response2 = await this.fetchData({ ajax: true, getbeings: true})
      if (response2.files) {
        for(const file of response2.files) {
          const response3 = await this.fetchData({ ajax: true, load: true, filename: file.name, ext: file.extension });
          if (response3?.data && response3?.structure) {
            // this.game.beingsList[file.name] = response3
            this.game.beingsList[file.name] = {
              'data': this.game.deepCopy(response3.data),
              'structure': this.game.deepCopy(response3.structure),
              'animations': this.game.deepCopy(response3.animations),
            }
          }
        }

        // FIRST ADD BEINGS
        if (this.game.map.beings) {          
          this.game.map.beings.forEach(being => {
            const ActualBeingData = this.game.beingsList[being.filename].data[0]

            if (ActualBeingData) {
              const beingGroup = new THREE.Group()

              beingGroup.beingId = being.id
              beingGroup.ratio = being.ratio

              beingGroup.animState = {
                'type': being.type,
                'card': 0,
                'cardframe': 0,
                'cardsegment': 0,
              }

              for (let BeingMesh of ActualBeingData) {
                const meshGroup = new THREE.Group()

                for (let tri of BeingMesh.tris) {
                  const geometry = new THREE.BufferGeometry()

                  // console.log('Being.ratio: ', being.ratio)

                  const vertices = new Float32Array([
                    tri.p[0].x * being.ratio, tri.p[0].y * being.ratio, tri.p[0].z * being.ratio,
                    tri.p[1].x * being.ratio, tri.p[1].y * being.ratio, tri.p[1].z * being.ratio,
                    tri.p[2].x * being.ratio, tri.p[2].y * being.ratio, tri.p[2].z * being.ratio,
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
                  meshGroup.add(triangleMesh)
                }
                beingGroup.add(meshGroup)
              }
  
              beingGroup.position.set(being.p.x, being.p.y, being.p.z)
  
              this.game.scene.add(beingGroup)
    
              this.game.loadedBeings[being.id] = beingGroup
              this.game.loadedBeings[being.id].filename = being.filename              
              this.game.loadedBeings[being.id].lastUpdate = performance.now()
              this.game.loadedBeings[being.id].speed = 50
            }
          });

          console.log(this.game.loadedBeings)
        }
      }

      // SKY BACKGROUND
      const loader = new THREE.CubeTextureLoader()
      loader.setPath('img/skybox/')
      const texture = loader.load(
        [ 'sky-01.png', 'sky-01.png', 'sky-01.png', 'sky-01.png', 'sky-01.png', 'sky-01.png' ],
        () => {
          // console.log('Skybox betöltve')
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

  // ---

  async fetchData(data, originaldata) {
    // const path = 'https://tuccmann.com/3deditor/editor.php'; // Online
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
