import * as THREE from 'three';
import $ from 'jquery';

export default class Gameplay {
  constructor(game) {
    this.game = game
  }

  async update(deltaTime) {
   $(".delta-time-game").html(deltaTime.toFixed(1))

    // GRAVITI RESPONE
    if (this.game.player.position.y < -5) this.game.player.position.y = 5;  // !!

    // REFRESH SOUND POSITION

    await this.game.input.updatePlayer()

    await this.autoMovePlayer()

    this.game.sound.listener.position.copy(this.game.camera.position)

    await this.updateBeings()

    await this.updateHeand()

    await this.startActions()

    await this.game.renderer.render(this.game.scene, this.game.camera)

    // RENDER HEAND
    let selectedHeand = this.game.loadedHeands[this.game.playerMouse.selectedHeand]    
    if (!selectedHeand) return;

    this.game.renderer.autoClear = false
    this.game.renderer.clearDepth()

    // remove previous heand object (DO NOT CLEAR SCENE)
    const old = this.game.heandScene.children.find(o => o.isGroup)
    if (old) this.game.heandScene.remove(old)

    this.game.heandScene.add(selectedHeand)
    await this.game.renderer.render(this.game.heandScene, this.game.camera)

    this.game.renderer.autoClear = true
  }

  async autoMovePlayer() {
    if (this.game.autoMovePlayerData.mode == null) return;

    switch (this.game.autoMovePlayerData.mode) {
      case 'y-center': {
        const step = THREE.MathUtils.degToRad(5)
        let x = this.game.pitchObject.rotation.x
  
        // NORMALIZE REGION
        x = THREE.MathUtils.euclideanModulo(x + Math.PI, Math.PI * 2) - Math.PI

        if (Math.abs(x) <= step) {
          // CENTER
          this.game.pitchObject.rotation.x = 0;
          $(document).trigger($.Event('keydown', { key: `${this.game.autoMovePlayerData.weapon}`, which: 49, keyCode: 49 }));

          this.game.autoMovePlayerData.mode = null
          this.game.autoMovePlayerData.weapon = null
        } else {
          // MOVEING
          this.game.pitchObject.rotation.x += (x > 0 ? -step : step);
        }
        break;
      }
    }
    //console.log(this.game.autoMovePlayerData)
  }

  async refreshHeandLights() {
    // töröljük a korábbi fényeket
    const lightsToRemove = []
    this.game.heandScene.traverse(obj => {
      if (obj.isLight) lightsToRemove.push(obj)
    })
    lightsToRemove.forEach(light => this.game.heandScene.remove(light))    

    // új fények hozzáadása
    this.game.loadedLights.map(element => {
      const light = element[1]
      const newLight = new THREE.PointLight(
        light.color.clone ? light.color.clone() : light.color,
        light.intensity,
        light.distance,
        light.decay,
      )

      newLight.position.copy(light.position)
      newLight.visible = light.visible
  
      this.game.heandScene.add(newLight)
    })
  }

  lightVibration(amplitude, durationMs) {
    const t = (Date.now() % durationMs) / durationMs
    const angle = t * 2 * Math.PI
    return Math.sin(angle) * (amplitude / 2)
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

          this.syncTrianglesPositions(beingGroup, interpolatedFrame)
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
          beingGroup.helper = new THREE.Box3Helper(beingGroup.box, new THREE.Color('#ffff00'))
          beingGroup.helper.box.copy(beingGroup.box)
          this.game.scene.add(beingGroup.helper)
        }

        this.game.boundingBoxes.push(beingGroup.box)
      }

      beingGroup.updateMatrixWorld(true)
      beingGroup.box.setFromObject(beingGroup)

      // beingGroup.box.expandByScalar(0.2)  //?? Bounding box nagyítás ha kell
      // beingGroup.box.min.x -= 0.2; beingGroup.box.max.x += 0.2; beingGroup.box.min.z -= 0.2; beingGroup.box.max.z += 0.2;
    }
  }

  async updateHeand() {
    // console.log(this.game.heandsList)
    for (let [id, heandGroup] of Object.entries(this.game.loadedHeands)) {
      // SELECTED HEAND
      if (id == this.game.playerMouse.selectedHeand) {
        heandGroup.visible = true

        const heandModell = this.game.heandsList[heandGroup.heandId]
        if (heandModell) {

          // ANIMATION
          const now = performance.now()
          if (now - heandGroup.lastUpdate >= Number(heandGroup.speed)) {
            heandGroup.lastUpdate = now
            if (heandGroup.animState.type != 'none') {
              heandGroup.animState = this.stepAnimState(heandGroup.animState, heandModell.animations)  
              const actualFrameData = this.game.deepCopy(heandModell?.data?.[heandGroup.animState.cardframe])
              const nextFrameData = heandModell?.data?.[heandGroup.animState.nextFrameIndex]
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
              actualFrameDataDifference = await this.calcInterpolated(actualFrameDataDifference, nextFrameData, heandGroup.animState.segmentlength)

              let interpolatedFrame
              if (heandGroup.animState.cardsegment > 0) {
                interpolatedFrame = this.game.deepCopy(actualFrameData)

                if (heandGroup.animState.cardsegment != 0) {
                  for (let row of interpolatedFrame) {
                    if (row?.tris) {
                      for (let tri of row.tris) {
                        let tri2 = actualFrameDataDifference
                          .flatMap(obj => obj.tris)
                          .find(triangle => triangle.id == tri.id);
                        if (tri2) {
                          for (let n = 0; n < 3; n++) {
                            tri.p[n].x = tri.p[n].x - (tri2.p[n].x * heandGroup.animState.cardsegment)
                            tri.p[n].y = tri.p[n].y - (tri2.p[n].y * heandGroup.animState.cardsegment)
                            tri.p[n].z = tri.p[n].z - (tri2.p[n].z * heandGroup.animState.cardsegment)
                          }
                        }
                      }
                    }
                  }
                }
              } else interpolatedFrame = actualFrameData

              this.syncTrianglesPositions(heandGroup, interpolatedFrame)
            }
          }

          // végleges box újraszámolása
          if (!heandGroup.box) heandGroup.box = new THREE.Box3()
          
          // CAMERA WORLD ROTATION (yaw + pitch)
          const camQuat = new THREE.Quaternion()
          this.game.camera.getWorldQuaternion(camQuat)
          
          // CAMERA WORLD POSITION
          const camPos = new THREE.Vector3()
          this.game.camera.getWorldPosition(camPos)

          const heandConfig = this.game.config.heands.find(heand=> heand.id == this.game.playerMouse.selectedHeand)
          if (heandConfig) {
            // MOD UP/DOWN LOOK HEAD POSITION            
            const yModifyToXaw = ((this.game.pitchObject.rotation._x + 1) / heandConfig.yRatio) * -1

            const localOffset = new THREE.Vector3(heandConfig.xDistance, heandConfig.yDistance + yModifyToXaw, -heandConfig.zDistance)
            const worldPos = camPos.clone().add(localOffset.clone().applyQuaternion(camQuat))

            // HEAND POSITION
            heandGroup.position.copy(worldPos)

            // FIX Y
            if (heandConfig.tilt) {
              // y tengelyen ne vegye át a forgást
              const camEuler = new THREE.Euler().setFromQuaternion(camQuat, 'YXZ')  // változás
              const yawOnlyQuat = new THREE.Quaternion().setFromEuler(new THREE.Euler(0, camEuler.y, 0, 'YXZ'))  // változás
              heandGroup.quaternion.copy(yawOnlyQuat)  // változás
            } else {
              heandGroup.quaternion.copy(camQuat)
            }

            // IF HAVE LIGHT          
            if (!heandGroup.lightsAdded) {
              if (heandGroup.lights) {
                if (!heandGroup.lightsGroup) {
                  heandGroup.lightsGroup = new THREE.Group()
                  // ADD THE LAMP LIGHT TO MAP
                  this.game.scene.add(heandGroup.lightsGroup)
                }
                heandGroup.lights.forEach(light => {
                  heandGroup.heandindex = heandGroup.heandindex ?? []
                  heandGroup.lightsGroup.add(light)
                  heandGroup.heandindex.push(this.game.loadedLights.push([heandModell.filename, light.clone()]) - 1)
                })
              } else {
                // RESET
                if (heandGroup.heandindex) {
                  heandGroup.heandindex.forEach(index => {
                    delete this.game.loadedLights[index]
                  });
                }
                if (heandGroup.lightsGroup) {
                  this.game.scene.remove(heandGroup.lightsGroup)
                  heandGroup.lightsGroup = null
                  heandGroup.lightsAdded = false
                }
              }

              heandGroup.lightsAdded = true; // ONLY ONE
            }
            
            if (heandGroup.lightsGroup) {              
              const originalCamPos = new THREE.Vector3()
              this.game.camera.getWorldPosition(originalCamPos)

              const originalCamQuat = new THREE.Quaternion()
              this.game.camera.getWorldQuaternion(originalCamQuat)

              heandGroup.lightsGroup.position.copy(originalCamPos)
              heandGroup.lightsGroup.quaternion.copy(originalCamQuat)

              if (heandGroup.heandindex) {
                heandGroup.heandindex.forEach((index, i) => {
                  const localOffset = new THREE.Vector3(-0.15, i * 0.1, i * -0.1)
                  this.game.loadedLights[index][1].position.copy(originalCamPos).add(localOffset)
                  this.game.loadedLights[index][1].quaternion.copy(originalCamQuat)
                  // LIGHT VIBRATION
                  this.game.loadedLights[index][1].intensity += this.lightVibration(0.025, 2500)
                })
              }
            }
            this.refreshHeandLights()

            heandGroup.updateMatrixWorld(true)
            heandGroup.box.setFromObject(heandGroup)
          }
        }
      } else {
        heandGroup.visible = false;
      }
    }
  }

  removeHeandLight() {
    const actHeand = this.game.loadedHeands[this.game.playerMouse.selectedHeand]
    if (actHeand  && actHeand.heandindex) {
      actHeand.heandindex.forEach(index => {
        delete this.game.loadedLights[index]
      });
      actHeand.heandindex = []
    }
    // LIFGT REMOVE THE MAP
    if (actHeand && actHeand.lightsGroup) {
      this.game.scene.remove(actHeand.lightsGroup)
      actHeand.lightsGroup = null
      actHeand.lightsAdded = false
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

  syncTrianglesPositions(group, data) {
    if (!group || !Array.isArray(group.children)) return;
    if (!Array.isArray(data)) return;   

    for (let m = 0; m < data.length; m++) {
      const mesh = data[m]
      const meshGroup = group.children[m]
      if (!mesh || !meshGroup) continue;
  
      const tris = mesh.tris || [];
      const triMeshes = (meshGroup.children || [])
  
      const count = Math.min(tris.length, triMeshes.length)
      for (let t = 0; t < count; t++) {
        const tri = tris[t]
        const triangleMesh = triMeshes[t]
        if (!triangleMesh || !triangleMesh.geometry) continue;
  
        const geom = triangleMesh.geometry
        const pos = geom.getAttribute('position')
        if (!pos || pos.itemSize !== 3 || pos.count < 3) continue;
  
        pos.setXYZ(0, tri.p[0].x * group.ratio, tri.p[0].y * group.ratio, tri.p[0].z * group.ratio)
        pos.setXYZ(1, tri.p[1].x * group.ratio, tri.p[1].y * group.ratio, tri.p[1].z * group.ratio)
        pos.setXYZ(2, tri.p[2].x * group.ratio, tri.p[2].y * group.ratio, tri.p[2].z * group.ratio)
        pos.needsUpdate = true
  
        // group.ratio = group.ratio + 0.000005  // hülyeség : )
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
          case('zombi-t'):
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
      if (distanceToPlayer <= 1) {
        return;
      }

      dirToPlayer.y = 0
      if (dirToPlayer.lengthSq() > 0) dirToPlayer.normalize();

      const moveStep = dirToPlayer.clone().multiplyScalar(beingGroup.speed / 1000)
      const tempGroup = beingGroup.clone()
      tempGroup.position.copy(beingGroup.position.clone().add(moveStep).add(new THREE.Vector3(0, this.game.gravityValue, 0)))
      tempGroup.updateMatrixWorld(true)

      // CHECK CRASH
      let testBox = new THREE.Box3().setFromObject(tempGroup)

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

        const firstMesh = children[0]
        firstMesh.geometry.computeBoundingBox()
        const boundingBox = firstMesh.geometry.boundingBox.clone()

        const center = new THREE.Vector3()
        boundingBox.getCenter(center)
        firstMesh.localToWorld(center)

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
    if (!(distance > actions[1].conditions.distance_near && distance < actions[1].conditions.distance_far)) {
      // REMOVE PLAYING SOUND
      if (actions[0].endFunction && actions[0].playSound) {
        let phantom = actions[0].playSound
        let audio = phantom.children[0]
        if (audio && audio.source) {
          audio.stop();
          actions[0].playSound = null
          actions[0].endFunction = null
        }
      }
      return;
    } 

    // CHECK USER CLICK TYPE
    if (type == 'click' && this.game.currentState == 'game') {
      // EXCEPTION MESSAGES
      const objId = this.game.playerMouse.selectedObject?.objId
      const actionId = actions[1].id
      if (objId != null && actionId != null) {
        // console.log('objId: ', objId); console.log('actionId: ', actionId);
        const found = this.game.config.actionmessages.find(item => item.object_id === objId && item.action_id === actionId)
        if (found) {
          this.makeActionObjectsMessageElement({type: 'actionmessage', actionText: found.message})
          return;
        }
      }
      // CHECK OBJECTS      
      if (actions[1].conditions.success) {
        // TASK COMPLETTED 
        // this.makeActionObjectsMessageElement({type: 'actionmessage', actionText: actions[1].conditions.success_text})
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
            // DELETE OBJECT FROM INVENTORY
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
        event.timeout = setTimeout(async() => {
          // EVENT CHECKS
          // ---
          // SOUND FX
          if (event.playsounds.length > 0) {
            for (const soundId of event.playsounds) {
              // NO CLICK SOUND PLAYING ONLY ONE TIME
              (async () => {
                if (type == 'noclick') {
                  if (!actions[0].endFunction) {
                    actions[0].endFunction = true

                    actions[0].updateMatrixWorld(true)
                    const phantom = await this.game.sound.play(soundId, {loop: true}, true, actions[0])

                    actions[0].playSound = phantom
                    let audio = phantom.children[0]

                    if (audio && audio.source) {
                      const endFunction = () => {
                        console.log("Vége a hangnak")

                        audio.stop()
                        audio.disconnect()
                        if (phantom.parent) phantom.parent.remove(phantom);
                
                        actions[0].playSound = null
                        actions[0].endFunction = null
                      };

                      audio.source.onended = endFunction
                      actions[0].endFunction = endFunction
                    }
                  }
                } else {
                  const loadedSounds = this.game.loadedSounds.find(obj => obj.id == soundId)
                  if (loadedSounds) {
                    // console.log(loadedSounds)
                    await this.game.sound.play(loadedSounds.id, null, true, actions[0])
                  }
                }
              })();
            }
          }

          // EVENT CHECK ADD OBJECTS
          if (event.addobjects.length > 0) {
            for (const addObjectId of event.addobjects) {
              // ADD OBJECT - Többször is előfordulhat egy tárgy, pl.: energiaital
              this.game.playerObjects.push(parseInt(addObjectId))
              this.game.inventory.inventoryMenu.reloadInventory = true
            }
            // REMOVE THREE OBJECT
            actions[0].visible = false
            let mapData = this.game.map.data.find(data => data.name == actions[0].name)
            if (mapData) {
              mapData.pickuped = true
            }
            this.game.removeObjectOfMap(this.game.scene, actions[0])
          }

          // LIGHT FX
          if (event.lightfx.length > 0) {
            for (const fx of event.lightfx) {
              let light = this.game.loadedLights[parseInt(fx[0])]?.[1] != null ? this.game.loadedLights[parseInt(fx[0])][1] : null;
              let fxData = this.game.config.lightfx.find(lfx => lfx.id == parseInt(fx[1]))
              if (light && fxData) this.lightFx(event.id, light, fxData);
            }
          }
  
          // MOVE FX
          if (event.moveactions.length > 0) {
            for (const fx of event.moveactions) {
              let mesh = this.game.loadedMeshs[parseInt(fx[0])]        
              let fxData = this.game.config.movefx.find(fxpc => fxpc.id == parseInt(fx[1]))
              if (mesh && fxData) this.moveFx(event.id, mesh, fxData);
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

  // SCENE FX

  //** ACTION FXS */

  // LIGHT FX
  lightFx(eventId, light, data) {
    switch(data.id) {
      case 0:
        // RANDOM COLOR 100ms
        if (!(light instanceof THREE.PointLight)) return;
        setTimeout(() => {
          const randomColor = new THREE.Color(Math.random(), Math.random(), Math.random());
          light.color = randomColor;
        }, data.time)

        this.refreshHeandLights()
      break
      case 1:
        // TURN OFF LIGHT / ON        
        if (data[eventId] == null) {
          data[eventId] = {}
          data[eventId].state = data.state
        }

        if (data[eventId].state) {
          // console.log('OFF', eventId)
          data[eventId].save_color = light.color.getHexString()
          data[eventId].save_distance = light.distance
          data[eventId].save_intensity = light.intensity
          // BLACK
          light.color = new THREE.Color(0, 0, 0)
          light.distance = 0
          light.intensity = 0
        } else {
          // console.log('ON', eventId)
          light.color = new THREE.Color(`#${data[eventId].save_color}`)
          light.distance = data[eventId].save_distance
          light.intensity = data[eventId].save_intensity
        }
        data[eventId].state = !data[eventId].state

        this.refreshHeandLights()
      break
    }
  }

  // MOVE FX
  moveFx(eventId, mesh, data) {    
    switch(data.id) {
      case 0:
        // FRIDGE
        if (!data[eventId]) {
          data[eventId] = []
          data[eventId] = {
            meshId: mesh.objId,
            meshName: mesh.name,
            state: false,
            min: 0,
            max: 90,
            value: 0,
            waiting: 10,
            valueAdd: null,
            addedStep: 0.025,
            addedValue: null,
            offsetTypeX: 'min',
            offsetTypeY: 'min',
            offsetTypeZ: 'max',
          }
        }
        this.openFx(data[eventId], mesh)
        break

      case 1:
        // DOOR + open
        if (!data[eventId]) {
          data[eventId] = []
          data[eventId] = {
            meshId: mesh.objId,
            meshName: mesh.name,
            state: false,
            min: 0,
            max: 90,
            value: 0,
            waiting: 10,
            valueAdd: null,
            addedStep: 0.025,
            addedValue: null,
            offsetTypeX: 'min',
            offsetTypeY: 'min',
            offsetTypeZ: 'min',
          }
        }
        this.openFx(data[eventId], mesh)
      break

      case 2:
        // DOOR - open
        if (!data[eventId]) {
          data[eventId] = []
          data[eventId] = {
            meshId: mesh.objId,
            meshName: mesh.name,
            state: false,
            min: 0,
            max: 90,
            value: 0,
            waiting: 10,
            valueAdd: null,
            addedStep: -0.025,
            addedValue: null,
            offsetTypeX: 'max',
            offsetTypeY: 'min',
            offsetTypeZ: 'min',
          }
        }
        this.openFx(data[eventId], mesh)
      break

      case 4:
        // RADIO ON / OFF
        if (!mesh.radioSwitch) mesh.radioSwitch = data.state;

        if (mesh.radioSwitch == "off") {
          // OFF->ON
          this.game.sound.play(17 /* UFO */, { volume: 0.5 }, true, mesh).then(phantom => {
            if (!phantom) return; // console.log(phantom)

            mesh.playSound = phantom;
            mesh.playSound.audio = phantom.children[0]
            mesh.radioSwitch = "on";
          }).catch(err => console.warn("Sound play error:", err));

        } else if (mesh.radioSwitch == "on") {
          // ON->OFF
          if (mesh.playSound) {
            const phantom = mesh.playSound
            const audio = phantom.children[0]

            if (audio && audio.isPlaying) audio.stop()
            if (phantom.parent) phantom.parent.remove(phantom)
            if (audio) audio.disconnect()

            mesh.playSound = null;
          }
          mesh.radioSwitch = "off";
        }
      break;
      case 3:
        // SWITCH TEXTURE CHANGE
        this.textureOnOf(mesh, data, eventId, 'switch-on', 'switch-off')
      break
      case 5:
        // PICTURE TEXTURE CHANGE
        this.textureOnOf(mesh, data, eventId, 'picture-2', 'picture-3')
      break
      case 6:
        // MICRO HAMSTER TEXTURE CHANGE
        this.textureOnOf(mesh, data, eventId, 'microhamster-on', 'microhamster-off')
      break
      case 7:
        // STOP/START ANIMATED TEXTURE        
        mesh.texture.playingState = !mesh.texture.playingState
        // SAVE LOADING FILES
        this.game.config['animationtextures'][mesh.texture.name].playingState = mesh.texture.playingState

        if (mesh.texture.playingState) {
          if (!mesh.texture.interval) {
            // REPLAY
            this.game.loader.startTextureMoveing(mesh.texture)
          }
        } else {
          // STOP
          clearInterval(mesh.texture.interval)
          mesh.texture.interval = null
        }
      break
    }
  }

  textureOnOf(mesh, data, eventId, texture_on, texture_off) {
    if (!data[eventId]) {
      data[eventId] = []
      data[eventId] = {
        "state": "switch-on",
        "texture_on": texture_on,
        "texture_off": texture_off,
      }
    }
    data[eventId].state = data[eventId].state == data[eventId].texture_on ? data[eventId].texture_off : data[eventId].texture_on;
    // console.log(data[eventId].state)
    this.refreshPicture(mesh, data[eventId])
  }

  refreshPicture(mesh, data) {
    mesh.traverse(obj => {
      if (obj.isMesh && obj.material && obj.material.map) {
        obj.material.map = this.game.loadedTextures[data.state]
        obj.material.needsUpdate = true
      }
    })
  }

  openFx(data, mesh) {
    if (!mesh.container) this.refreshOpenFxState(data, mesh);

    data.addedValue = data.state ? -data.addedStep : data.addedStep; // ÉRTÉKE
    data.valueAdd = data.state ? -1 : 1; // COUNT-JA

    if (!data?.timeInterval) {
      // CHECK CRASH
      const clone = mesh.container.clone(true)
      clone.rotation.y += data.addedValue
      const futureBox = new THREE.Box3().setFromObject(clone)
      const playerBox = new THREE.Box3().setFromCenterAndSize(this.game.player.position.clone(), this.game.playerBoundingBox)

      if (futureBox.intersectsBox(playerBox)) {
        clearInterval(data.timeInterval)  // talan mashogy
        data.timeInterval = null          // talan mashogy
        return;
      }

      data.timeInterval = setInterval(() => {
        // TEST NEXT MOVE
        const now = performance.now()
        if (mesh.lastUpdate === undefined) mesh.lastUpdate = now - (data.waiting * 2);

        if (now - mesh.lastUpdate >= data.waiting) {
          mesh.lastUpdate = now          
          const tempRotation = mesh.container.rotation.y + data.addedValue
          const clone = mesh.container.clone(true)
          clone.rotation.y = tempRotation
          const testBox = new THREE.Box3().setFromObject(clone)
          const playerBox = new THREE.Box3().setFromCenterAndSize(this.game.player.position.clone(), this.game.playerBoundingBox)
          if (testBox.intersectsBox(playerBox)) {
            clearInterval(data.timeInterval)  // talan mashogy
            data.timeInterval = null          // talan mashogy
            return;
          }

          // MOVE AND REFRESH
          mesh.container.rotation.y = tempRotation
          data.value += data.valueAdd

          // BOUNDING BOX FRISSÍTÉS A CONTAINERHEZ
          this.game.refreshBoundingBoxOfMapContainer(mesh)

          // CLAMP VALUE
          data.value = Math.max(data.min, Math.min(data.max, data.value)) // clamping

          if (data.value == data.max - 1 || data.value < data.min + 1) {
            // console.log('STOP!');
            data.state = !data.state
            clearInterval(data.timeInterval);
            data.timeInterval = null;
          }
        }
      }, 5);
    } else {
      // IF NEW CLICK
      clearInterval(data.timeInterval);
      data.timeInterval = null;
      /*
      data.state = !data.state
      data.addedValue = data.state ? -data.addedStep : data.addedStep;
      data.valueAdd = data.state ? -1 : 1;
      */
    }
  }

  refreshOpenFxState(data, mesh) {
    if (!mesh.containerOffset) {      
      this.game.removeBoundingBoxOfMap(mesh)

      const box = new THREE.Box3().setFromObject(mesh)
      const offset = new THREE.Vector3(box[data.offsetTypeX].x, box[data.offsetTypeY].y, box[data.offsetTypeZ].z)

      mesh.containerOffset = offset.clone()
      mesh.position.sub(offset)

      const container = new THREE.Group()
      container.position.copy(mesh.containerOffset)
      mesh.container = container

      // OPEN DOOR
      if (data.state == true) {
        container.rotation.y = data.addedValue * data.value
      }

      container.add(mesh)
      this.game.scene.add(container)

      this.game.refreshBoundingBoxOfMapContainer(mesh)

      // DOORS HELPER
      if (false) {
        const helper = new THREE.Box3Helper(
          new THREE.Box3().setFromObject(container),
          new THREE.Color('#ffff00')
        )
        this.game.scene.add(helper)
      }
    }
  
    return mesh
  }

}
