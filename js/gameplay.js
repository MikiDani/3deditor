import * as THREE from 'three';
import $ from 'jquery'

export default class Gameplay {
  constructor(game) {
    this.game = game
    this.counter = 0
  }

  async update(deltaTime) {
    this.counter++

    if (this.counter > 5) {
      $(".delta-time-game").html(deltaTime.toFixed(1))
      this.counter = 0
    }

    // GRAVITI RESPONE
    if (this.game.player.position.y < -5) this.game.player.position.y = 5;  // !!

    await this.game.input.updatePlayer()

    await this.updateBeings()

    await this.startActions()

    await this.game.renderer.render(this.game.scene, this.game.camera)
  }

  async updateBeings() {
    for (let [id, beingGroup] of Object.entries(this.game.loadedBeings)) {
      const beingId = Number(id)
      const beingModell = this.game.beingsList[beingGroup.filename]
      
      // console.log(beingGroup.filename)
      // console.log(beingGroup.beingId)
      // console.log(beingGroup.ratio)
      
      // ANIMATION
      if (beingGroup.animState.type != 'none' && beingGroup.filename == 'zombi3') {   // !! csak zombi
        if (beingGroup.animState.type != 'none') {
          beingGroup.animState = this.animMover(beingGroup.animState, beingModell.animations)
          // console.log(beingGroup.animState)
          // console.log('card: ' + beingGroup.animState.card + '| cardframe: ' + beingGroup.animState.cardframe, '| cardsegment: ' +  beingGroup.animState.cardsegment)

          const index = beingGroup.animState.cardframe
          const actualFrameData = this.game.beingsList[beingGroup.filename]?.data?.[index]

          const nextIndex = index == beingGroup.animState.maxcard ? 0 : index + 1;
          const nextFrameData = this.game.beingsList[beingGroup.filename]?.data?.[nextIndex]

          let dataDifference = actualFrameData.map(mesh => ({
            id: mesh.id,
            tris: mesh.tris.map(tri => ({
              id: tri.id,
              p: tri.p.map(pt => ({ x: pt.x, y: pt.y, z: pt.z }))
            }))
          }));
          // console.log(dataDifference)

          dataDifference = await this.calcInterpolated(dataDifference, nextFrameData, beingGroup.animState.cardsegment)
          
          for (let s = 0; s<beingGroup.animState.cardsegment; s++) {
            // console.log(s)
            this.animationState = this.game.deepCopy(actualFrameData)

            if (s != 0) {
              for (let row of this.animationState) {
                if (row?.tris) {
                  //console.log(row.tris)
                  for (let tri of row.tris) {
                    let tri2 = dataDifference.flatMap(obj => obj.tris).find(triangle => triangle.id == tri.id)
                    if (tri2) {
                      for (let n = 0; n < 3; n++) {
                        tri.p[n].x = tri.p[n].x - (tri2.p[n].x * s)
                        tri.p[n].y = tri.p[n].y - (tri2.p[n].y * s)
                        tri.p[n].z = tri.p[n].z - (tri2.p[n].z * s)
                      }
                    }
                  }
                }
              }
            }
          }
 
          if (this.animationState) {
            this.syncBeingTrianglesPositions(beingGroup, this.animationState);
          }
        }
      }

      // MOVE
      if (false) this.moveObjectInMap(beingId, beingGroup, new THREE.Vector3(0.01, 0, 0))

      // GRAVITY
      if (true) this.applyGravity(beingGroup, beingId);

      if (beingGroup.position.y < -1) { beingGroup.position.y = 2; beingGroup.position.x = -3; }

      // végleges box újraszámolása
      if (!beingGroup.box) {
        beingGroup.box = new THREE.Box3()

        // HELPER
        if (false) {
          beingGroup.helper = new THREE.Box3Helper(beingGroup.box, new THREE.Color(0xffff00))
          beingGroup.helper.box.copy(beingGroup.box)
          this.game.scene.add(beingGroup.helper)
        }

        this.game.boundingBoxes.push(beingGroup.box)
      }

      beingGroup.updateMatrixWorld(true)
      beingGroup.box.setFromObject(beingGroup)
    }
  }


  animMover(beingData, modelAnim) {
    // console.log(modelAnim)

    const animation = modelAnim.find(anim => anim[0] == beingData.type)
    if (animation) {
      // console.log(animation)

      beingData.cardsegment++

      beingData.cardframe = parseInt(animation[1][beingData.card][0])
      // MAX
      beingData.maxcard = parseInt(animation[1].length - 1)

      if (beingData.cardsegment == animation[1][beingData.card][1]) {        
        beingData.cardsegment = 0

        beingData.card++

        if (beingData.card == parseInt(animation[1].length)) {
          beingData.card = 0;
          beingData.cardframe = parseInt(animation[1][beingData.card][0])
        }
      }

      // console.log('card: ' + beingData.card + '| cardframe: ' + beingData.cardframe, '| cardsegment: ' +  beingData.cardsegment)
    }

    return beingData;
  }

  async calcInterpolated(dataDifference, data2, segmentNumber) {
    for (let row of dataDifference) {
      if (row?.tris) {
        for (let tri of row.tris) {
          let tri2 = data2.flatMap(obj => obj.tris).find(triangle => triangle.id == tri.id)
          if (tri2) {
            for (let n = 0; n < 3; n++) {
              tri.p[n].x = (tri.p[n].x - tri2.p[n].x) / segmentNumber
              tri.p[n].y = (tri.p[n].y - tri2.p[n].y) / segmentNumber
              tri.p[n].z = (tri.p[n].z - tri2.p[n].z) / segmentNumber
            }
          }
        }
      }
    }
    return dataDifference;
  }

  syncBeingTrianglesPositions(beingGroup, data) {
    if (!beingGroup || !Array.isArray(beingGroup.children)) return;
    if (!Array.isArray(data)) return;

    for (let m = 0; m < data.length; m++) {
      const beingMesh = data[m]
      const meshGroup = beingGroup.children[m]
      if (!beingMesh || !meshGroup) continue;
  
      const tris = beingMesh.tris || [];
      const triMeshes = (meshGroup.children || [])
  
      const count = Math.min(tris.length, triMeshes.length)
      for (let t = 0; t < count; t++) {
        const tri = tris[t]
        const triangleMesh = triMeshes[t]
        if (!triangleMesh || !triangleMesh.geometry) continue;
  
        const geom = triangleMesh.geometry
        const pos = geom.getAttribute('position')
        if (!pos || pos.itemSize !== 3 || pos.count < 3) continue;
  
        pos.setXYZ(0, tri.p[0].x * beingGroup.ratio, tri.p[0].y * beingGroup.ratio, tri.p[0].z * beingGroup.ratio)
        pos.setXYZ(1, tri.p[1].x * beingGroup.ratio, tri.p[1].y * beingGroup.ratio, tri.p[1].z * beingGroup.ratio)
        pos.setXYZ(2, tri.p[2].x * beingGroup.ratio, tri.p[2].y * beingGroup.ratio, tri.p[2].z * beingGroup.ratio)
        pos.needsUpdate = true
  
        // beingGroup.ratio = beingGroup.ratio + 0.000005  // hülyeség : )

        // Normálok és (ha kell) bounding box frissítése
        // geom.computeVertexNormals()  // ??
        // geom.computeBoundingBox?.()  // !!!
      }
    }
  }

  moveObjectInMap(objId, object, newPosCords) {
    const newPos = object.position.clone().add(newPosCords)

    // MAKE TESTBOX
    const tempGroup = object.clone()
    tempGroup.position.copy(newPos)
    tempGroup.updateMatrixWorld(true)
    const testBox = new THREE.Box3().setFromObject(tempGroup)

    // CHECK CRASH
    const collision = this.checkCrash(testBox, objId)

    if (!collision) {
      // IF NO CRASH WE MOVING
      object.position.copy(newPos)
    }
  }
  
  checkCrash(testBox, ignoreBeingId = null) {
    // PLAYER CHECK HIT
    const half = this.game.playerBoundingBox.clone(); // Vector3 (0.3, 1, 0.3)
    const playerCenter = this.game.player.position.clone();
    const playerBox = new THREE.Box3(
      playerCenter.clone().sub(half),
      playerCenter.clone().add(half)
    )
    if (testBox.intersectsBox(playerBox)) {
      return true;
    }

    // MAP CHECK HIT
    for (const [key, loadedMesh] of Object.entries(this.game.loadedMeshs)) {      
      if (testBox.intersectsBox(loadedMesh.box)) {
        return true;
      }
    }

    // BEINGS CHECK HIT
    for (const [beingId, beingGroup] of Object.entries(this.game.loadedBeings)) {
      const id = Number(beingId);
      if (id === ignoreBeingId) continue; // saját maga kihagyva
      if (beingGroup.box && testBox.intersectsBox(beingGroup.box)) {
        return true;
      }
    }

    return false;
  }

  // ==== SEGÉDFÜGGVÉNY: Gravitáció ====
  applyGravity(objectGroup, id = null, fallSpeed = 0.01) {
    if (!objectGroup.box) return;

    // jelenlegi pozíció
    const newPos = objectGroup.position.clone();
    newPos.y -= fallSpeed;

    // teszt doboz a lejjebb lévő pozícióra
    const tempGroup = objectGroup.clone();
    tempGroup.position.copy(newPos);
    tempGroup.updateMatrixWorld(true);

    const testBox = new THREE.Box3().setFromObject(tempGroup);

    // van-e ütközés?
    const collision = this.checkCrash(testBox, id);

    if (!collision) {
      // ha nem ütközik, tényleg leesik
      objectGroup.position.copy(newPos);
    }

    // boundingBox újraszámolás
    objectGroup.updateMatrixWorld(true);
    objectGroup.box.setFromObject(objectGroup);

    if (objectGroup.helper) {
      objectGroup.helper.box.copy(objectGroup.box);
    }
  }

  async startActions() {
    this.game.map.actionelements.forEach(action => {
      // ALL AUTO ACTIONS
      if (action[1].conditions.click == 'auto') {
        const meshGroup = action[0]
        const children = meshGroup.children
        if (!children.length) return

        // Vegyük az első gyereket (vagy akár végig is mehetsz többön)
        const firstMesh = children[0];
        // bounding box alapján pozíció
        firstMesh.geometry.computeBoundingBox();
        const boundingBox = firstMesh.geometry.boundingBox.clone();
        // A mesh pozíciójához hozzáadjuk a bounding box center-t
        const center = new THREE.Vector3();
        boundingBox.getCenter(center);
        firstMesh.localToWorld(center); // átváltjuk world pos-ra

        const cameraPos = new THREE.Vector3()
        this.game.camera.getWorldPosition(cameraPos)

        const direction = center.clone().sub(cameraPos).normalize()
        const raycaster = new THREE.Raycaster()
        raycaster.set(cameraPos, direction)
        const intersects = raycaster.intersectObjects(children, true)
    
        if (intersects.length > 0) {
          // NO CLICK ACTIONS CHECK
          this.checkActions(action, intersects[0].distance)
        }
      }
    });
  }

  async checkActions(actions, distance) {
    // CHECK DISTANCES
    if (!(distance > actions[1].conditions.distance_near && distance < actions[1].conditions.distance_far)) return;
  
    // CHECK OBJECTS
    if (actions[1].conditions.issetobjects.length > 0 && !this.game.checkPlayerObject(actions[1].conditions.issetobjects)) return;
  
    // START EVENTS
    for(const event of actions[1].events) {
      // ACTION
      var oncePlayEvent = async () => {
        console.log('Start settimeout: '+ event.name)

        event.timeout = setTimeout(() => {
          // EVENT CHECK ADD OBJECTS
          if (event.addobjects.length > 0) {
            for (const addObjectId of event.addobjects) {
              // ADD OBJECT - Többször is előfordulhat egy tárgy, pl.: energiaital
              this.game.playerObjects.push(parseInt(addObjectId))
            }
            // REMOVE THREE OBJECT
            this.game.removeObjectOfMap(actions[0])
          }
  
          // EVENT CHECKS
          // ---
          // LIGHT FX
          if (event.lightfx.length > 0) {
            for (const fx of event.lightfx) {
              let light = this.game.loadedLights[parseInt(fx[0])][1]
              let fxData = this.game.config.lightfx.find(fxpc => fxpc.id == parseInt(fx[1]))
              if (light, fxData) this.lightFx(light, fxData);
            }
          }
  
          // MOVE FX
          if (event.moveactions.length > 0) {
            for (const fx of event.moveactions) {
              console.log(fx[0])
              console.log(fx[1])
              let mesh = this.game.loadedMeshs[parseInt(fx[0])]        
              let fxData = this.game.config.movefx.find(fxpc => fxpc.id == parseInt(fx[1]))
              if (mesh && fxData) this.moveFx(mesh, fxData);
            }
          }

          clearTimeout(event.timeout)
          event.timeout = null

        }, parseInt(event.timer))
      }
  
      // START

      // CHECK INTERVAL
      if (event.interval[0]) {
        event.setIntervalCounter = 1;
        const playIntervalEvents = async () => {
          while (event.setIntervalCounter <= event.interval[1]) {
            await oncePlayEvent()
            await new Promise(resolve => setTimeout(resolve, parseInt(event.timer)))
            event.setIntervalCounter++
          }
        }
        playIntervalEvents()
      } else {
        await oncePlayEvent()
      }
    }
  }

  changeLightColorRandom(light) {
    if (!(light instanceof THREE.PointLight)) return;

    const randomColor = new THREE.Color(Math.random(), Math.random(), Math.random());
    light.color = randomColor;
  }

  // LIGHT FX
  lightFx(light, data) {
    switch(data.id) {
      case 0:
        this.changeLightColorRandom(light)
      break
      case 1:
        //
      break
    }
  }

  // MOVE FX
  moveFx(mesh, data) {
    switch(data.id) {
      case 0:
        // FRIDGE
        if (!mesh.openConfig) {
          mesh.openConfig = {
            state: false,
            min: 0,
            max: 45,
            value: 0,
            valueadd: null,
            addedStep: 0.05,
            addedValue: null,
            offsetTypeX: 'min',
            offsetTypeY: 'min',
            offsetTypeZ: 'max',
          }
        }
        this.openFx(mesh)
        break

      case 1:
        // DOOR + open
        if (!mesh.openConfig) {
          mesh.openConfig = {
            state: false,
            min: 0,
            max: 45,
            value: 0,
            valueadd: null,
            addedStep: 0.05,
            addedValue: null,
            offsetTypeX: 'min',
            offsetTypeY: 'min',
            offsetTypeZ: 'min',
          }
        }
        this.openFx(mesh)
      break

      case 2:
        // DOOR - open
        if (!mesh.openConfig) {
          mesh.openConfig = {
            state: false,
            min: 0,
            max: 45,
            value: 0,
            valueadd: null,
            addedStep: -0.05,
            addedValue: null,
            offsetTypeX: 'max',
            offsetTypeY: 'min',
            offsetTypeZ: 'min',
          }
        }
        this.openFx(mesh)
      break
    }
  }

  openFx(mesh) {
    mesh.openConfig.addedValue = mesh.openConfig.state ? -mesh.openConfig.addedStep : mesh.openConfig.addedStep; // ÉRTÉKE
    mesh.openConfig.valueAdd = mesh.openConfig.state ? -1 : 1; // COUNT-JA

    console.log(mesh.openConfig.addedValue)

    if (!mesh?.timeInterval) {
      // FIRST OFFSET OPTIONS
      if (!mesh.containerOffset) {
        console.log(mesh.openConfig.offsetTypeX, mesh.openConfig.offsetTypeY, mesh.openConfig.offsetTypeZ)
        this.game.removeBoundingBoxOfMap(mesh) // ORIGINAL BOUNDINGBOX DELETE
        const box = new THREE.Box3().setFromObject(mesh)
        const offset = new THREE.Vector3(box[mesh.openConfig.offsetTypeX].x, box[mesh.openConfig.offsetTypeY].y, box[mesh.openConfig.offsetTypeZ].z)
        mesh.containerOffset = offset.clone()
        mesh.position.sub(offset)
        mesh.container = new THREE.Group()
        mesh.container.position.copy(mesh.containerOffset)
        mesh.container.add(mesh)
      }

      // CHECK CRESH
      const clone = mesh.container.clone(true)
      clone.rotation.y += mesh.openConfig.addedValue
      const futureBox = new THREE.Box3().setFromObject(clone)
      const playerBox = new THREE.Box3().setFromCenterAndSize(this.game.player.position.clone(), this.game.playerBoundingBox)

      if (futureBox.intersectsBox(playerBox)) {
        clearInterval(mesh.timeInterval)  // talan mashogy
        mesh.timeInterval = null          // talan mashogy
        return;
      }

      this.game.scene.add(mesh.container)

      mesh.timeInterval = setInterval(() => {
        // TEST NEXT MOVE
        const tempRotation = mesh.container.rotation.y + mesh.openConfig.addedValue
        const clone = mesh.container.clone(true)
        clone.rotation.y = tempRotation
        const testBox = new THREE.Box3().setFromObject(clone)
        const playerBox = new THREE.Box3().setFromCenterAndSize(this.game.player.position.clone(), this.game.playerBoundingBox)
        if (testBox.intersectsBox(playerBox)) {
          clearInterval(mesh.timeInterval)  // talan mashogy
          mesh.timeInterval = null          // talan mashogy
          return;
        }

        // MOVE AND REFRESH
        mesh.container.rotation.y = tempRotation
        mesh.openConfig.value += mesh.openConfig.valueAdd

        // CLAMP VALUE
        mesh.openConfig.value = Math.max(
          mesh.openConfig.min,
          Math.min(mesh.openConfig.max, mesh.openConfig.value)
        )
      
        // REFRESH BOUNDING BOX FRISSÍTÉS
        const updatedBox = new THREE.Box3().setFromObject(mesh.container)
        const index = this.game.boundingBoxes.findIndex(box => box === mesh._boundingBox)
        if (index !== -1) this.game.boundingBoxes[index] = updatedBox;
        else this.game.boundingBoxes.push(updatedBox);
        mesh._boundingBox = updatedBox

        // console.log(mesh.openConfig.value)  // !!!
        
        if (mesh.openConfig.value == mesh.openConfig.max - 1 || mesh.openConfig.value < mesh.openConfig.min + 1) {
          console.log('STOP!');
          mesh.openConfig.state = !mesh.openConfig.state
          clearInterval(mesh.timeInterval);
          mesh.timeInterval = null;
        }
      }, 10);
    } else {
      // IF NEW CLICK
      mesh.openConfig.state = !mesh.openConfig.state
      mesh.openConfig.addedValue = mesh.openConfig.state ? -mesh.openConfig.addedStep : mesh.openConfig.addedStep;
      mesh.openConfig.valueAdd = mesh.openConfig.state ? -1 : 1;
    }
  }
}
