import * as THREE from 'three';
import $ from 'jquery'

export default class Gameplay {
  constructor(game) {
    this.game = game
  }

  async update(deltaTime) {
   $(".delta-time-game").html(deltaTime.toFixed(1))

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

      // ANIMATION
      const now = performance.now()
      if (now - beingGroup.lastUpdate >= Number(beingGroup.speed)) {
        beingGroup.lastUpdate = now
        // console.log(beingGroup.id, beingGroup.filename, beingGroup.beingId, beingGroup.ratio, beingGroup.speed, beingGroup.energy, beingGroup.damage)
        if (beingGroup.animState.type != 'none') {
          beingGroup.animState = this.stepAnimState(beingGroup.animState, beingModell.animations)
          // console.log('card: ' + beingGroup.animState.card + '| cardframe: ' + beingGroup.animState.cardframe + '| cardsegment: ' + beingGroup.animState.cardsegment)

          const actualFrameData = this.game.deepCopy(this.game.beingsList[beingGroup.filename]?.data?.[beingGroup.animState.cardframe])
          const nextFrameData = this.game.beingsList[beingGroup.filename]?.data?.[beingGroup.animState.nextFrameIndex]

          if (!actualFrameData || !nextFrameData) return;

          let actualFrameDataDifference = actualFrameData.map(mesh => ({
            id: mesh.id,
            tris: mesh.tris.map(tri => ({
              id: tri.id,
              p: tri.p.map(pt => ({
                x: Number(pt.x),
                y: Number(pt.y),
                z: Number(pt.z),
              }))
            }))
          }))

          actualFrameDataDifference = await this.calcInterpolated(actualFrameDataDifference, nextFrameData, beingGroup.animState.segmentlength)

          let interpolatedFrame
          if (beingGroup.animState.cardsegment > 0) {
            interpolatedFrame = this.game.deepCopy(actualFrameData)

            if (beingGroup.animState.cardsegment != 0) {
              for (let row of interpolatedFrame) {
                if (row?.tris) {
                  for (let tri of row.tris) {
                    let tri2 = actualFrameDataDifference
                      .flatMap(obj => obj.tris)
                      .find(triangle => triangle.id == tri.id);
                    if (tri2) {
                      for (let n = 0; n < 3; n++) {
                        tri.p[n].x = tri.p[n].x - (tri2.p[n].x * beingGroup.animState.cardsegment)
                        tri.p[n].y = tri.p[n].y - (tri2.p[n].y * beingGroup.animState.cardsegment)
                        tri.p[n].z = tri.p[n].z - (tri2.p[n].z * beingGroup.animState.cardsegment)
                      }       
                    }
                  }
                }
              }
            }              
          } else interpolatedFrame = actualFrameData

          this.syncBeingTrianglesPositions(beingGroup, interpolatedFrame)
        }
      }

      // ROTATE + MOVE
      this.beingReactions(beingGroup)

      // GRAVITY
      if (true) this.applyGravity(beingGroup, beingId)

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

  stepAnimState(animState, modellAnimations) {
    const animation = modellAnimations.find(anim => anim[0] == animState.type)
    const animationList = animation ? animation[1] : []
  
    let card = animState.card
    let cardsegment = animState.cardsegment
    const segmentlength = parseInt(animationList[card][1])
  
    cardsegment++
    if (cardsegment == segmentlength) {
      cardsegment = 0
      card = (card + 1) % animationList.length
    }
  
    const cardframe = parseInt(animationList[card][0])
    const maxcard = animationList.length - 1

    const isLastCard = card == maxcard
    const nextCard = isLastCard ? 0 : card + 1
    const nextFrameIndex = parseInt(animationList?.[nextCard]?.[0])

    return {
      ...animState,
      maxcard,
      card,
      cardframe,
      cardsegment,
      segmentlength,
      nextFrameIndex,
    }
  }

  async calcInterpolated(actualFrameDataDifference, nextFrameData, segmentlength) {
    for (let row of actualFrameDataDifference) {
      if (row?.tris) {
        for (let tri of row.tris) {
          let tri2 = nextFrameData.flatMap(obj => obj.tris).find(triangle => triangle.id == tri.id)
          if (tri2) {
            for (let n = 0; n < 3; n++) {
              tri.p[n].x = (tri.p[n].x - tri2.p[n].x) / segmentlength
              tri.p[n].y = (tri.p[n].y - tri2.p[n].y) / segmentlength
              tri.p[n].z = (tri.p[n].z - tri2.p[n].z) / segmentlength              
            }
          }
        }
      }
    }
    return actualFrameDataDifference;
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

        // geom.computeVertexNormals()  // ??
        geom.computeBoundingBox?.()  // !!
      }
    }
  }

  beingReactions(beingGroup) {
    // MOVE
    switch (beingGroup.animState.type) {
      case('MOVE'):
        switch (beingGroup.filename) {
          case('zombi-t!X'):  //!!  ne mozogjon ideiglenesen a Zombi
            this.rotateAndMoveInPlayer(beingGroup, true, true) // rotate, move
            break;
          case('bat'):
            this.rotateAndMoveInPlayer(beingGroup, true, false) // rotate, move
            break;
        }
      break;
      case('ATTACK'):
        switch (beingGroup.filename) {
          case('zombi4'):
            // ATTACK ZOMBIE
            break;
          case('bat'):
            // ATTACK BAT
            break;
        }
      break;
    }
  }

  rotateAndMoveInPlayer(beingGroup, rotateOn, moveOn) {
    const playerPos = this.game.player.position.clone()
    const beingPos = beingGroup.position.clone()
    const dirToPlayer = playerPos.clone().sub(beingPos).normalize()

    // ROTATE SECTION
    if (rotateOn) {  
      const targetAngle = Math.atan2(dirToPlayer.x, dirToPlayer.z)
      const currentAngle = beingGroup.rotation.y
  
      let angleDiff = targetAngle - currentAngle
      angleDiff = Math.atan2(Math.sin(angleDiff), Math.cos(angleDiff));
  
      if (Math.abs(angleDiff) > THREE.MathUtils.degToRad(1)) {
        const step = THREE.MathUtils.degToRad(1)
        if (angleDiff > 0) beingGroup.rotation.y += step; else beingGroup.rotation.y -= step;
      } else beingGroup.rotation.y = targetAngle;
    }

    // MOVE SECTION
    if (moveOn) {
      // CHECK DISTANCE
      const distanceToPlayer = beingGroup.position.distanceTo(this.game.player.position)
      if (distanceToPlayer <= 0.8) {
        return;
      }

      dirToPlayer.y = 0
      if (dirToPlayer.lengthSq() > 0) dirToPlayer.normalize();

      const moveStep = dirToPlayer.clone().multiplyScalar(beingGroup.speed / 1000)
      const tempGroup = beingGroup.clone()
      tempGroup.position.copy(beingGroup.position.clone().add(moveStep).add(new THREE.Vector3(0, this.game.gravityValue, 0)))
      tempGroup.updateMatrixWorld(true)

      // CHECK CRASH
      const testBox = new THREE.Box3().setFromObject(tempGroup)
      const collision = this.checkCrash(testBox, beingGroup.beingId)
      if (!collision) {
        beingGroup.position.add(moveStep)
      } else {
        const stepHeight = this.game.stepHeight
        const tempGroup2 = tempGroup.clone()
        tempGroup2.position.copy(
          beingGroup.position.clone().add(moveStep).add(new THREE.Vector3(0, stepHeight, 0))
        )
        tempGroup2.updateMatrixWorld(true)

        const testBox2 = new THREE.Box3().setFromObject(tempGroup2)
        const collision2 = this.checkCrash(testBox2, beingGroup.beingId)
        if (!collision2) {
          beingGroup.position.add(moveStep).y += stepHeight
        }
      }
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

  applyGravity(objectGroup, id = null) {
    if (!objectGroup.box) return;

    const newPos = objectGroup.position.clone()
    newPos.y -= this.game.gravityValue

    const tempGroup = objectGroup.clone()
    tempGroup.position.copy(newPos)
    tempGroup.updateMatrixWorld(true)

    const testBox = new THREE.Box3().setFromObject(tempGroup)

    // CHECK CRASH
    const collision = this.checkCrash(testBox, id)
    if (!collision) objectGroup.position.copy(newPos);

    objectGroup.updateMatrixWorld(true)
    objectGroup.box.setFromObject(objectGroup)

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
          this.checkActions('noclick', action, intersects[0].distance)
        }
      }
    });
  }

  async checkActions(type, actions, distance) {
    // MAKE USEDOBJECTS ARRAY
    if (typeof actions[1].conditions.usedobjects === 'undefined') actions[1].conditions.usedobjects = []

    // CHECK DISTANCES
    if (!(distance > actions[1].conditions.distance_near && distance < actions[1].conditions.distance_far)) return;

    // CHECK USER CLICK TYPE
    if (type == 'click') {
      // CHECK OBJECTS
      if (actions[1].conditions.success) {
        // TASK COMPLETTED // this.makeActionObjectsMessageElement({type: 'actionmessage', actionText: actions[1].conditions.success_text})
      } else if (actions[1].conditions.issetobjects.length === 0 && this.game.playerMouse.selectedObject !== null) {
        // OBJECT IS IN HAND, BUT ACTION DOESN’T HAVE ISSETOBJECT ARRAY
        this.makeActionObjectsMessageElement({type: 'cantuse', cantUseObject: this.game.playerMouse.selectedObject.name}) 
        return;
      } else if (actions[1].conditions.issetobjects.length > 0 && !this.game.playerMouse.selectedObject) {
        // ACTION HAVE ISSETOBJECT DOESN’T HAVE IN HEAND

        const objects = actions[1].conditions.issetobjects.map(x => [this.game.objectsList[x].name, actions[1].conditions.usedobjects.includes(x)])
        let listElements = this.makeActionObjectsMessageElement({type: 'list', objects: objects})

        this.makeActionObjectsMessageElement({type: 'actionmessage', actionText: actions[1].conditions.failed_text + listElements})
        return;
      } else if (actions[1].conditions.issetobjects.length > 0 && this.game.playerMouse.selectedObject) {
        // HAVE ISSETOBJECT AND HAVE OBJECT IN HEAND
        let usedObjectName = null
        // PUSH OBJECT ID
        if (actions[1].conditions.issetobjects.includes(this.game.playerMouse.selectedObject.objId) && !actions[1].conditions.usedobjects.includes(this.game.playerMouse.selectedObject.objId)) {
          actions[1].conditions.usedobjects.push(this.game.playerMouse.selectedObject.objId)
          usedObjectName = this.game.playerMouse.selectedObject.name
          // IF NOT PROTECTED DELETE OBJECT FROM INVENTORY
          const isProtected = this.game.playerProtectedObjects.includes(this.game.playerMouse.selectedObject.objId)          
          if (!isProtected) {
            this.game.playerObjects = this.game.playerObjects.filter(obj => obj !== this.game.playerMouse.selectedObject.objId)
            this.game.inventory.inventoryMenu.reloadInventory = true
          }
        }
        // CHECK EXACT MATCH
        const success = actions[1].conditions.issetobjects.length === actions[1].conditions.usedobjects.length && actions[1].conditions.issetobjects.every(x => actions[1].conditions.usedobjects.includes(x))
        if (success) {
          // COMPLETT ACTION OBJECTS
          actions[1].conditions.success = true
          this.makeActionObjectsMessageElement({type: 'actionmessage', actionText: actions[1].conditions.success_text})
        } else {
          // MISSING ACTION OBJECTS
          const objects = actions[1].conditions.issetobjects.map(x => [this.game.objectsList[x].name, actions[1].conditions.usedobjects.includes(x)])
          let listElements = this.makeActionObjectsMessageElement({type: 'list', objects: objects})
          usedObjectName
          ? this.makeActionObjectsMessageElement({type: 'use', useObject: usedObjectName, listElements: listElements})
          : this.makeActionObjectsMessageElement({type: 'actionmessage', actionText: listElements})
          return;
        }
      }
    }

    // CHECK NOCLICK TYPE
    if (type == 'noclick') {
      // CHECK OBJECTS
      if (actions[1].conditions.issetobjects.length > 0 && !this.game.checkPlayerObject(actions[1].conditions.issetobjects)) return;
    }

    // START EVENTS
    for(const event of actions[1].events) {
      // ACTION
      var oncePlayEvent = async () => {
        // console.log('Start settimeout: '+ event.name)  // ?? EVENT NAME
        event.timeout = setTimeout(() => {
          // EVENT CHECK ADD OBJECTS
          if (event.addobjects.length > 0) {

            for (const addObjectId of event.addobjects) {
              // ADD OBJECT - Többször is előfordulhat egy tárgy, pl.: energiaital
              this.game.playerObjects.push(parseInt(addObjectId))
              this.game.inventory.inventoryMenu.reloadInventory = true
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
              // console.log(fx[0])
              // console.log(fx[1])
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

  makeActionObjectsMessageElement({type: type, objects: objects, cantUseObject: cantUseObject, useObject: useObject, actionText, listElements: listElements}) {
    const removeCursor = () => {
      // REMOVE SELECTED OBJECT AND CURSOR
      this.game.playerMouse.selectedObject = null
      $('#cursor-text-box').hide().html('')
      this.game.input.getActualCursor()
    }

    switch(type) {
      case "list":
        let elements = ``;
        objects.forEach(object => {
          elements += `
          <div class="text-center">
            <span class="${object[1] ? 'check-mark' : 'error-mark'}"></span> <span class="text-white">${object[0]}</span>
          </div>`;
        });
        return elements;
      case "use":
        let message = `<div class="text-center">You was used the <strong class="text-white">${useObject}</strong> here!<br>You neaded objects:</div>`
        message += listElements
        $("#text-box-text").html(message)
        $("#text-box").show()
      break
      case "cantuse":
        $("#text-box-text").html(`You can't use the ${cantUseObject} here!`)
        $("#text-box").show()
        removeCursor()
      break
      case "actionmessage":
        $("#text-box-text").html(actionText)
        $("#text-box").show()
        removeCursor()
      break
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
            max: 90,
            value: 0,
            waiting: 10,
            valueadd: null,
            addedStep: 0.025,
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
            max: 90,
            value: 0,
            waiting: 10,
            valueadd: null,
            addedStep: 0.025,
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
            max: 90,
            value: 0,
            waiting: 10,
            valueadd: null,
            addedStep: -0.025,
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
        const now = performance.now()
        if (mesh.lastUpdate === undefined) mesh.lastUpdate = now - (mesh.openConfig.waiting * 2);

        if (now - mesh.lastUpdate >= mesh.openConfig.waiting) {
          mesh.lastUpdate = now          
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
        }
      }, 5);
    } else {
      // IF NEW CLICK
      mesh.openConfig.state = !mesh.openConfig.state
      mesh.openConfig.addedValue = mesh.openConfig.state ? -mesh.openConfig.addedStep : mesh.openConfig.addedStep;
      mesh.openConfig.valueAdd = mesh.openConfig.state ? -1 : 1;
    }
  }
}
