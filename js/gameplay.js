import * as THREE from 'three';
import $ from 'jquery';

export default class Gameplay {
  constructor(game) {
    this.game = game
  }

  async waitForGameInfo(text) {
    while (this.game.startGameInfoText || this.game.finishGameInfoText) {
      $('#text-box-text').html(text)
      $('#text-box').show()
      this.game.waitingGameInfoText = true
      
      /*
      this.game.input.changeMouseLock()
      $('#game-blood').show()
      */

      await new Promise(resolve => setTimeout(resolve, 50))
    }
  }

  async update(deltaTime) {
    if (this.game.waitingGameInfoText) return;

    const triCount = this.game.renderer.info.render.triangles
    $(".delta-time-game").html(`${deltaTime.toFixed(0)} | tris: ${triCount}`)

    // GRAVITI RESPONE
    if (this.game.player.position.y < -5) this.game.player.position.y = 7;  // !!

    // REFRESH SOUND POSITION
    await this.game.input.updatePlayer()

    this.game.sound.listener.position.copy(this.game.camera.position)

    // LAMP CENTER
    await this.autoMovePlayer()

    await this.updateBeings(deltaTime)

    await this.updateHeand(deltaTime)

    await this.startActions(deltaTime)

    // RENDER SCREEN
    await this.game.renderer.render(this.game.scene, this.game.camera)

    // START / FINISH GAME INFO TEXT
    if (this.game.startGameInfoText || this.game.finishGameInfoText) {      
      let textName = this.game.startGameInfoText ? 'start_text' : 'finish_text';
      const text = this.game.config.textdata.find(item => item.id === textName)?.text
      await this.waitForGameInfo(text)
    }

    // RENDER HEAND
    let selectedHeand = this.game.loadedHeands[this.game.playerMouse.selectedHeand]    
    if (!selectedHeand) return;

    this.game.renderer.autoClear = false
    this.game.renderer.clearDepth()

    // remove previous heand object (DO NOT CLEAR SCENE)
    const old = this.game.heandScene.children.find(o => o.isGroup)
    if (old) this.game.heandScene.remove(old)

    this.game.heandScene.add(selectedHeand)
    this.game.renderer.render(this.game.heandScene, this.game.camera)

    this.game.renderer.autoClear = true
  }

  async autoMovePlayer() {
    if (this.game.autoMovePlayerData.mode == null) return;

    switch (this.game.autoMovePlayerData.mode) {
      case 'y-center': {
        // IF CHANGE LAMP, AND THE HEAD Y NOT CENTER LIMIT
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
    // console.log(this.game.autoMovePlayerData)
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

  setVisibleRecursive(node, visible) {
    if (!node || typeof node !== 'object') return;
    node.visible = visible

    if (Array.isArray(node.children)) {
      for (const child of node.children) {
        this.setVisibleRecursive(child, visible)
      }
    }
  }

  visibleOptionsBeingAnimationState(data) {
    if (!data.visibleData) return;

    for(const [id, value] of Object.entries(data.visibleData)) {
      const mesh = data.selectedBeing.children.find(child => child.objId == id)
      if (mesh) mesh.visible = value.visible;
    }
  }

  getArrayRandomId(idArray) {
    if (!Array.isArray(idArray) || idArray.length === 0) return 100;
    const randomIndex = Math.floor(Math.random() * idArray.length)
    return idArray[randomIndex];
  }

  async updateBeings(deltaTime) {    
    for (let [id, beingGroup] of Object.entries(this.game.loadedBeings)) {
      if (!beingGroup || beingGroup.active == false) continue;

      const beingId = Number(id)
      const beingModell = this.game.beingsList[beingGroup.filename]
      const beingConfig = this.game.config.beingoptions[beingGroup.filename]

      // IF HIT ENEMY BEING
      if (beingModell.type = 'enemy' && beingGroup.damageState && beingGroup.waitDamage == null) {
        beingGroup.damageState = null
        beingGroup.waitDamage = true

        beingGroup.energy = beingGroup.energy - 1;
        console.log('Energy: ', beingGroup.energy)

        if (beingGroup.energy > 0) {
          // DAMAGE
          this.game.sound.play(this.getArrayRandomId(beingConfig.damageSounds), null, true, beingGroup)
          beingGroup.animState = { type: 'DAMAGE', card: 0, cardframe: 0, cardsegment: 0 }

          setTimeout(() => {
            beingGroup.waitDamage = null
            beingGroup.animState = {type: 'MOVE', card: 0, cardframe: 0,cardsegment: 0 }
          }, 800)

        } else {
          // DIE
          if (beingConfig.dieSounds) this.game.sound.play(this.getArrayRandomId(beingConfig.dieSounds), null, true, beingGroup);

          beingGroup.dead = true
          beingGroup.gravity = true
          beingGroup.waitDamage = true

          beingGroup.animState = {type: 'DIE', card: 0, cardframe: 0, cardsegment: 0 }
        }
      }

      // ANIMATION
      if (beingGroup.animationActive) {
        beingGroup.animTime += deltaTime
        if (beingGroup.animTime >= Number(beingGroup.speed)) {
          beingGroup.animTime = 0
          // console.log(beingGroup.id, beingGroup.filename, beingGroup.beingId, beingGroup.ratio, beingGroup.speed, beingGroup.energy, beingGroup.damage)
          if (beingGroup.animState.type != 'none') {
            beingGroup.animState = this.stepAnimState(beingGroup.animState, beingModell.animations)
  
            const actualFrameData = this.game.deepCopy(this.game.beingsList[beingGroup.filename]?.data?.[beingGroup.animState.cardframe])

            // IF DIE
            if (beingGroup.animState.type == 'DIE' && beingGroup.animState.card == beingGroup.animState.maxcard && beingGroup.animState.cardsegment == beingGroup.animState.segmentlength - 1) {
              beingGroup.animationActive = false
              setTimeout(()=> {                
                this.removeBeing(beingGroup, id)
              }, 3000)
              continue;
            }

            const nextFrameData = this.game.beingsList[beingGroup.filename]?.data?.[beingGroup.animState.nextFrameIndex] ?? this.game.beingsList[beingGroup.filename]?.data?.[beingGroup.animState.firstCardFrame]
  
            this.visibleOptionsBeingAnimationState({selectedBeing: this.game.loadedBeings[beingId], frameData: actualFrameData, visibleData: beingGroup.animState.visibledata})
  
            if (actualFrameData && nextFrameData) {
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
    
              actualFrameDataDifference = this.calcInterpolated(actualFrameDataDifference, nextFrameData, beingGroup.animState.segmentlength)
    
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
                this.syncTrianglesPositions(beingGroup, interpolatedFrame)
              }
            }
          }
        }
      }

      // ROTATE + MOVE + ATTACK
      if (beingGroup.animState.type != 'DAMAGE' && beingGroup.animState.type != 'DIE') {
        // console.log(beingGroup.animState.type)
        
        this.rotateAndMove(beingGroup, this.game.config.beingoptions[beingGroup.filename])
      }

      // GRAVITY
      if (beingGroup.gravity) {
        this.applyGravity(beingGroup, beingId)
        if (beingGroup.position.y < -1) beingGroup.position.set(-3, 2, beingGroup.position.z);
      }

      // BOUNDING BOX INIT
      if (!beingGroup.box) {
        beingGroup.box = this.game.beingsList[beingGroup.filename].largestBoundingBox.clone()
        this.game.boundingBoxes.push(beingGroup.box)

        // HELPER
        if (false) {
          beingGroup.helper = new THREE.Box3Helper(beingGroup.box, new THREE.Color('#ffff00'))
          this.game.scene.add(beingGroup.helper)
        }
      }

      // WORLD MATRIX ELŐBB
      beingGroup.updateMatrixWorld(true)

      // BOX FRISSÍTÉS
      beingGroup.box.copy(this.game.beingsList[beingGroup.filename].largestBoundingBox)
      beingGroup.box.applyMatrix4(beingGroup.matrixWorld)

      // HELPER FRISSÍTÉS
      if (beingGroup.helper) beingGroup.helper.box.copy(beingGroup.box);

    }
  }

  removeBeing(beingGroup, id) {
    beingGroup.active = false
  
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
  
    this.game.removeObjectOfMap(this.game.scene, beingGroup)
    delete this.game.loadedBeings[id]
  }

  async updateHeand(deltaTime) {  
    for (let [id, heandGroup] of Object.entries(this.game.loadedHeands)) {
      // SELECTED HEAND
      if (id == this.game.playerMouse.selectedHeand) {
        heandGroup.visible = true
  
        const heandModell = this.game.heandsList[heandGroup.heandId]
        if (!heandModell) continue
  
        // INIT
        if (typeof heandGroup.animTime != 'number') heandGroup.animTime = 0
  
        // --- ATTACK LOGIC (HEAND 2) ---
        if (id == 2) {
          const attackAnimType = 'ATTACK'
  
          // Akkor egyszer játszódjon le az animáció
          if (this.game.playerMouse.playerAttack) {
            if (!heandGroup.attackPlaying) {
              heandGroup.attackPlaying = true
              heandGroup.animTime = 0
              heandGroup.animState = {
                type: attackAnimType,
                card: 0,
                cardframe: 0,
                cardsegment: 0
              }
            }
          } 
          // Akkor ne játszódjon le az animáció csak az első frame eslő kocája legyen álladóan
          else {
            heandGroup.attackPlaying = false
            heandGroup.animState = {
              type: 'none',
              card: 0,
              cardframe: 0,
              cardsegment: 0
            }
  
            const firstFrameData = this.game.deepCopy(heandModell?.data?.[0])
            if (firstFrameData) this.syncTrianglesPositions(heandGroup, firstFrameData)
          }
        }
        // --------------------------------
  
        // ANIMATION TIMER
        heandGroup.animTime += deltaTime
  
        if (heandGroup.animTime >= Number(heandGroup.speed)) {
          heandGroup.animTime = 0
  
          if (heandGroup.animState.type != 'none') {
            heandGroup.animState = this.stepAnimState(heandGroup.animState, heandModell.animations)
  
            // HA LEFUTOTT AZ ATTACK ANIMÁCIÓ → LEÁLL
            if (id == 2 &&heandGroup.attackPlaying && heandGroup.animState.card == heandGroup.animState.maxcard && heandGroup.animState.cardsegment == heandGroup.animState.segmentlength - 1) {
              heandGroup.attackPlaying = false
              this.game.playerMouse.playerAttack = false
              return;
            }
  
            const actualFrameData = this.game.deepCopy(heandModell?.data?.[heandGroup.animState.cardframe])
            const nextFrameData = heandModell?.data?.[heandGroup.animState.nextFrameIndex] ?? heandModell?.data?.[heandGroup.animState.firstCardFrame]
  
            if (actualFrameData && nextFrameData) {
              let actualFrameDataDifference = actualFrameData.map(mesh => ({
                id: mesh.id,
                tris: mesh.tris.map(tri => ({
                  id: tri.id,
                  p: tri.p.map(pt => ({
                    x: Number(pt.x),
                    y: Number(pt.y),
                    z: Number(pt.z)
                  }))
                }))
              }))
  
              actualFrameDataDifference = this.calcInterpolated(actualFrameDataDifference, nextFrameData, heandGroup.animState.segmentlength)
  
              let interpolatedFrame
              if (heandGroup.animState.cardsegment > 0) {
                interpolatedFrame = this.game.deepCopy(actualFrameData)
  
                if (heandGroup.animState.cardsegment != 0) {
                  for (let row of interpolatedFrame) {
                    if (row?.tris) {
                      for (let tri of row.tris) {
                        let tri2 = actualFrameDataDifference
                          .flatMap(obj => obj.tris)
                          .find(triangle => triangle.id == tri.id)
  
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
        }
  
        // végleges box újraszámolása
        if (!heandGroup.box) heandGroup.box = new THREE.Box3()
  
        // CAMERA WORLD ROTATION (yaw + pitch)
        const camQuat = new THREE.Quaternion()
        this.game.camera.getWorldQuaternion(camQuat)
  
        // CAMERA WORLD POSITION
        const camPos = new THREE.Vector3()
        this.game.camera.getWorldPosition(camPos)
  
        const heandConfig = this.game.config.heands.find(heand => heand.id == this.game.playerMouse.selectedHeand)
        if (heandConfig) {
          // MOD UP/DOWN LOOK HEAD POSITION            
          const yModifyToXaw = ((this.game.pitchObject.rotation._x + 1) / heandConfig.yRatio) * -1
  
          const localOffset = new THREE.Vector3(heandConfig.xDistance, heandConfig.yDistance + yModifyToXaw, -heandConfig.zDistance)
          const worldPos = camPos.clone().add(localOffset.clone().applyQuaternion(camQuat))
  
          // HEAND POSITION
          heandGroup.position.copy(worldPos)
  
          // FIX Y
          if (heandConfig.tilt) {
            const camEuler = new THREE.Euler().setFromQuaternion(camQuat, 'YXZ')
            const yawOnlyQuat = new THREE.Quaternion().setFromEuler(new THREE.Euler(0, camEuler.y, 0, 'YXZ'))
            heandGroup.quaternion.copy(yawOnlyQuat)
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
                })
              }
  
              if (heandGroup.lightsGroup) {
                this.game.scene.remove(heandGroup.lightsGroup)
                heandGroup.lightsGroup = null
                heandGroup.lightsAdded = false
              }
            }
  
            heandGroup.lightsAdded = true // ONLY ONE
          }
  
          if (false || heandGroup.lightsGroup) {
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
                // this.game.loadedLights[index][1].intensity += this.lightVibration(0.025, 2500)
              })
            }
          }
  
          this.refreshHeandLights()
  
          heandGroup.updateMatrixWorld(true)
          heandGroup.box.setFromObject(heandGroup)
        }
      } else {
        heandGroup.visible = false
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
    // LIGHT REMOVE THE MAP
    if (actHeand && actHeand.lightsGroup) {
      this.game.scene.remove(actHeand.lightsGroup)
      actHeand.lightsGroup = null
      actHeand.lightsAdded = false
    }
  }

  stepAnimState(animState, modellAnimations) {    
    const animation = modellAnimations.find(anim => anim[0] == animState.type)
    if (!animation) return animState;

    const animationList = animation ? animation[1] : []

    let card = animState.card
    let cardsegment = animState.cardsegment
    const segmentlength = parseInt(animationList[card]?.[1] ? animationList[card][1]  : 0);

    cardsegment++
    if (cardsegment == segmentlength) {
      cardsegment = 0
      card = (card + 1) % animationList.length
    }

    const cardframe = parseInt(animationList[card]?.[0] ? animationList[card][0] : 0);
    // const maxcard = animationList > 0 ? animationList.length - 1 : 1;
    const maxcard = animationList.length > 0 ? animationList.length - 1 : 0

    const isLastCard = card == maxcard
    const nextCard = isLastCard ? 0 : card + 1
    const nextFrameIndex = parseInt(animationList?.[nextCard]?.[0])

    const cardlength = animation[1].length   

    let visibledata = animation[2] ??= null;

    const firstCardFrame = parseInt(animationList?.[0]?.[0] ?? 0)

    return {
      ...animState,
      maxcard,
      card,
      cardlength,
      cardframe,
      cardsegment,
      segmentlength,
      nextFrameIndex,
      visibledata,
      firstCardFrame,
    }
  }

  calcInterpolated(actualFrameDataDifference, nextFrameData, segmentlength) {
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

  rotateAndMove(beingGroup, options) {
    if (options == null) options = {}
    options.rotateOn ??= true
    options.moveOn ??= true
    options.moveOnY ??= true
    options.backMove ??= 0.8
    options.backAttack ??= 0.6
    options.beingDistance ??= 0.4

    // console.log('energy: ', beingGroup.energy)
    // console.log('damage: ', beingGroup.damage)

    // PLAYER CENTER (world)
    let finishPosition = new THREE.Vector3()

    // CHECK ANIMPOINT
    let targetMode = null

    if (beingGroup?.animationpoints) {
      targetMode = 'animationpoints'
      if (!beingGroup.apactive) return;

      if (beingGroup.animStep == null) {
        beingGroup.animStep = '0';
        beingGroup.pointData = beingGroup.animationpoints?.[beingGroup.apname]?.[beingGroup.animStep] ?? null
      }
      if (!beingGroup.pointData) return;

      finishPosition.set(beingGroup.pointData.x_pos, beingGroup.pointData.y_pos, beingGroup.pointData.z_pos)
    } else {

      targetMode = 'player'
      this.game.player.getWorldPosition(finishPosition)
    }

    // IF NO ENEMY AND NO HAVE ANIMPOINTS GO RETURN
    if (options.type !='enemy' && targetMode != 'animationpoints') return;  // !!

    // HIT PLAYER
    if (targetMode == 'player' && beingGroup.animState.type == 'ATTACK') {
      /*
      if (beingGroup.filename == 'bat-a' && beingGroup.animState.type == 'ATTACK' && beingGroup.animState.card == beingGroup.animState.cardlength / 2)
        this.game.modifyPlayerEnergy(beingGroup.damage);
  
      if ((beingGroup.filename == 'ghost-1' || beingGroup.filename == 'spider-1') && beingGroup.animState.type == 'ATTACK')
          this.game.modifyPlayerEnergy(beingGroup.damage);
      */
     this.game.modifyPlayerEnergy(beingGroup.damage);
    }

    // BEING CENTER (world)
    const beingBox = new THREE.Box3().setFromObject(beingGroup)
    const beingCenter = new THREE.Vector3()
    beingBox.getCenter(beingCenter)

    // --- DIRECTION VECTORS ---
    const dirFull = finishPosition.clone().sub(beingCenter)
    const dirFlat = dirFull.clone()
    dirFlat.y = 0

    if (dirFlat.lengthSq() > 0) dirFlat.normalize()
    if (dirFull.lengthSq() > 0) dirFull.normalize()

    // ROTATE SECTION
    if (options.rotateOn) {
      const targetAngle = Math.atan2(dirFlat.x, dirFlat.z)
      const currentAngle = beingGroup.rotation.y

      let angleDiff = targetAngle - currentAngle
      angleDiff = Math.atan2(Math.sin(angleDiff), Math.cos(angleDiff))

      if (Math.abs(angleDiff) > THREE.MathUtils.degToRad(1)) {
        const step = THREE.MathUtils.degToRad(3)
        const nextAngle = currentAngle + (angleDiff > 0 ? step : -step)

        const originalAngle = beingGroup.rotation.y

        beingGroup.rotation.y = nextAngle
        beingGroup.updateMatrixWorld(true)

        const testBox = new THREE.Box3().setFromObject(beingGroup)
        const collision = this.checkCrash(testBox, beingGroup.beingId, true)

        if (collision) {
          beingGroup.rotation.y = originalAngle
          beingGroup.updateMatrixWorld(true)
        }
      }
    }

    // CHECK DISTANCE (CENTER TO CENTER)
    const distanceToTarget = beingCenter.distanceTo(finishPosition)

    if (targetMode == 'player') {
      // BACK TYPE TO MOVE
      if (beingGroup.animState.type == 'ATTACK' && distanceToTarget >= options.backMove) { //(i) options
        beingGroup.animState = {
          type: 'MOVE',
          card: 0,
          cardframe: 0,
          cardsegment: 0,
        }
      }
  
      // BACK TYPE TO ATTACK
      if (beingGroup.animState.type == 'MOVE' && distanceToTarget <= options.backAttack) { //(i) options
        beingGroup.animState = {
          type: 'ATTACK',
          card: 0,
          cardframe: 0,
          cardsegment: 0,
        }
      }
    }

    // MOVE SECTION
    if (options.moveOn) {
      const moveDir = options.moveOnY ? dirFull : dirFlat
      const moveStep = moveDir.clone().multiplyScalar(beingGroup.speed / 1000)

      if (targetMode == 'player' && distanceToTarget <= options.beingDistance) {
        beingGroup.position.add(new THREE.Vector3(-moveStep.x, 0, -moveStep.z))
        return;
      }

      const tempGroup = beingGroup.clone()
      tempGroup.position.copy(beingGroup.position.clone().add(moveStep).add(new THREE.Vector3(0, this.game.gravityValue, 0)))
      tempGroup.updateMatrixWorld(true)

      const testBox = new THREE.Box3().setFromObject(tempGroup)
      const collision = this.checkCrash(testBox, beingGroup.beingId, targetMode == 'animationpoints' ? false : true)

      if (!collision) {
        beingGroup.position.add(moveStep)

        if (targetMode == 'player') {
          beingGroup.position.add(new THREE.Vector3(moveStep.x, options.moveOnY ? moveStep.y : 0,moveStep.z))
        } else if (targetMode == 'animationpoints') {
          const tolerance = 0.1
          const animPointsPositionData = beingGroup.pointData

          let reached = true

          if (animPointsPositionData.x_axis) {
            if (Math.abs(beingCenter.x - finishPosition.x) > tolerance) reached = false
          }

          if (animPointsPositionData.y_axis) {
            if (Math.abs(beingCenter.y - finishPosition.y) > tolerance) reached = false
          }

          if (animPointsPositionData.z_axis) {
            if (Math.abs(beingCenter.z - finishPosition.z) > tolerance) reached = false
          }

          if (reached) {

            beingGroup.position.copy(finishPosition)
            /*
            if (animPointsPositionData.x_axis) beingGroup.position.x = finishPosition.x
            if (animPointsPositionData.y_axis) beingGroup.position.y = finishPosition.y
            if (animPointsPositionData.z_axis) beingGroup.position.z = finishPosition.z
            */

            beingGroup.animStep = beingGroup.animationpoints[beingGroup.apname][beingGroup.animStep].next

            if (true) {
              const geometry = new THREE.SphereGeometry(0.02, 8, 8)
              const material = new THREE.MeshBasicMaterial({ color: 0xffff00 })
              const helperSphere = new THREE.Mesh(geometry, material)

              helperSphere.position.copy(finishPosition)

              this.game.scene.add(helperSphere)
            }

            // END
            if (!beingGroup.animStep) {
              // beingGroup.animState.type = 'NONE'
              beingGroup.apactive = false
              beingGroup.pointData = null
              beingGroup.animStep = null
              return;
            }

            beingGroup.pointData = beingGroup.animationpoints[beingGroup.apname][beingGroup.animStep]

            if (beingGroup.pointData?.sound) this.game.sound.play(beingGroup.pointData.sound, null, true, beingGroup)
            if (beingGroup.pointData?.type) beingGroup.animState.type = beingGroup.pointData.type
            return;
          }
        }

      } else {
        let moved = false

        // X axis slide
        if (moveStep.x !== 0) {
          const stepX = new THREE.Vector3(moveStep.x * 4, 0, 0)
          const tempX = beingGroup.clone()
          tempX.position.copy(beingGroup.position.clone().add(stepX).add(new THREE.Vector3(0, this.game.gravityValue, 0)))
          tempX.updateMatrixWorld(true)

          const boxX = new THREE.Box3().setFromObject(tempX)
          if (!this.checkCrash(boxX, beingGroup.beingId, true)) {
            beingGroup.position.add(stepX)
            moved = true
          }
        }

        // Z axis slide
        if (moveStep.z !== 0) {
          const stepZ = new THREE.Vector3(0, 0, moveStep.z * 4)
          const tempZ = beingGroup.clone()
          tempZ.position.copy(beingGroup.position.clone().add(stepZ).add(new THREE.Vector3(0, this.game.gravityValue, 0)))
          tempZ.updateMatrixWorld(true)

          const boxZ = new THREE.Box3().setFromObject(tempZ)
          if (!this.checkCrash(boxZ, beingGroup.beingId, true)) {
            beingGroup.position.add(stepZ)
            moved = true
          }
        }

        // CHECK STAIRS MOVE
        if (!moved && !options.moveOnY) {
          const stepHeight = this.game.stepHeight
          const tempGroup2 = tempGroup.clone()
          tempGroup2.position.copy(beingGroup.position.clone().add(moveStep).add(new THREE.Vector3(0, stepHeight, 0)))
          tempGroup2.updateMatrixWorld(true)

          const testBox2 = new THREE.Box3().setFromObject(tempGroup2)
          const collision2 = this.checkCrash(testBox2, beingGroup.beingId)
          if (!collision2) beingGroup.position.add(moveStep).y += stepHeight
        }
      }
    }
  }

  checkCrash(testBox, ignoreBeingId = null, ignorePlayer = false) {
    // PLAYER CHECK HIT
    if (!ignorePlayer) {
      const half = this.game.playerBoundingBox.clone();
      half.y = 1
  
      const playerCenter = this.game.player.position.clone();
      const playerBox = new THREE.Box3(
        playerCenter.clone().sub(half),
        playerCenter.clone().add(half)
      )
      if (testBox.intersectsBox(playerBox)) {
        return true;
      }
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

  playerAttack(weapon) {
    const attackDistance = 0.5

    const cameraPos = new THREE.Vector3()
    this.game.camera.getWorldPosition(cameraPos)

    const direction = new THREE.Vector3()
    this.game.camera.getWorldDirection(direction)

    const hitPoint = cameraPos.clone().add(direction.multiplyScalar(attackDistance))
  
    const attackBox = new THREE.Box3().setFromCenterAndSize(hitPoint, new THREE.Vector3(0.3, 0.3, 0.3))

    // FOUND HIT BEING
    for (const [id, beingGroup] of Object.entries(this.game.loadedBeings)) {
      if (!beingGroup || beingGroup.active == false || beingGroup.energy <= 0) continue;

      beingGroup.updateMatrixWorld(true)

      const beingBox = beingGroup.box
        ? beingGroup.box.clone()
        : new THREE.Box3().setFromObject(beingGroup)
  
      if (attackBox.intersectsBox(beingBox)) {
        //const mapBeingData = this.game.map.beings.find(being => being.id == beingGroup.beingId)

        beingGroup.damageState = true
        return;
      }
    }
  
    console.log('NO HIT:', weapon)
    return null
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

  async startActions(deltaTime) {    
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
          this.checkActions(deltaTime, 'noclick', action, intersects[0].distance)
        }
      }
    });
  }

  async checkActions(deltaTime, type, actions, distance) {
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

          // MOVE FX
          if (event.moveactions.length > 0) {
            for (const fx of event.moveactions) {
              let mesh = this.game.loadedMeshs[parseInt(fx[0])]
              let fxData = this.game.config.movefx.find(fxpc => fxpc.id == parseInt(fx[1]))
              if (mesh && fxData) this.moveFx(deltaTime, event.id, mesh, fxData);
            }
          }

          // LIGHT FX
          if (event.lightfx.length > 0) {
            for (const fx of event.lightfx) {
              let light = this.game.loadedLights[parseInt(fx[0])]?.[1] != null ? this.game.loadedLights[parseInt(fx[0])][1] : null;
              let fxData = this.game.config.lightfx.find(lfx => lfx.id == parseInt(fx[1]))
              if (light && fxData) this.lightFx(event.id, light, fxData);
            }
          } 

          // BEING FX
          if (event.beingfx.length > 0) {
            for (const fx of event.beingfx) {
              let being = this.game.loadedBeings[parseInt(fx[0])]
              let fxData = this.game.config.beingfx.find(fxbeing => fxbeing.id == parseInt(fx[1]))
              if (being && fxData) this.beingFx(deltaTime, event.id, being, fxData);
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

    function getDefaultLightStates(data, light) {
      data[eventId] = {}
      data[eventId].state = light.defaultValues.active
      data[eventId].save_color = light.defaultValues.color
      data[eventId].save_distance = light.defaultValues.distance
      data[eventId].save_intensity = light.defaultValues.intensity

      /*
      data[eventId] = {}
      data[eventId].state = light.defaultValues?.active ?? false
      data[eventId].save_color = light.defaultValues?.color ?? 'ffffff'
      data[eventId].save_distance = light.defaultValues?.distance ?? 0.5
      data[eventId].save_intensity = light.defaultValues?.intensity ?? 0.5
      */
    }

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
        if (data[eventId] == null) getDefaultLightStates(data, light);

        if (data[eventId].state) {
          console.log('OFF', eventId)
          // BLACK
          light.color = new THREE.Color(0, 0, 0)
          light.distance = 0
          light.intensity = 0
          light.active = false

          data[eventId].state = false
        } else {
          console.log('ON', eventId)

          light.color = new THREE.Color(`#${data[eventId].save_color}`)
          light.distance = data[eventId].save_distance
          light.intensity = data[eventId].save_intensity
          light.active = true

          data[eventId].state = true
        }

        // data[eventId].state = !data[eventId].state

        this.refreshHeandLights()
      break

      case 2:
        // TURN ON LIGHT
        if (data[eventId] == null) getDefaultLightStates(data, light);

        data[eventId].state = true

        console.log('ON', eventId)
        light.color = new THREE.Color(`#${data[eventId].save_color}`)
        light.distance = data[eventId].save_distance
        light.intensity = data[eventId].save_intensity

        this.refreshHeandLights()
      break

      case 3:
        // TURN OFF LIGHT
        if (data[eventId] == null) getDefaultLightStates(data, light);

        data[eventId].state = false

        console.log('OFF', eventId)
        data[eventId].save_color = light.color.getHexString()
        data[eventId].save_distance = light.distance
        data[eventId].save_intensity = light.intensity
        // BLACK
        light.color = new THREE.Color(0, 0, 0)
        light.distance = 0
        light.intensity = 0

        this.refreshHeandLights()
      break

      case 10:
        // RED COLOR 1
        if (!(light instanceof THREE.PointLight)) return;
        setTimeout(() => {
          light.color = new THREE.Color(135/255, 15/255, 0);
          light.distance = 1;
          light.intensity = 0.2;

          console.log(light)
          
        }, data.time)

        // this.refreshHeandLights()
      break

      case 15:
        // GREEN COLOR 1
        if (!(light instanceof THREE.PointLight)) return;
        setTimeout(() => {
          light.color = new THREE.Color(0, 255/255, 0);
        }, data.time)

        this.refreshHeandLights()
      break

      case 20:
        // BLUE COLOR 1
        if (!(light instanceof THREE.PointLight)) return;
        setTimeout(() => {
          light.color = new THREE.Color(0, 0, 255/255);
        }, data.time)

        this.refreshHeandLights()
      break
    }
  }

  // MOVE FX
  moveFx(deltaTime, eventId, mesh, data) {    
    switch(data.id) {
      case 0:
        //  Open-1 (fridge) x:min y:min z:max
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
            axis: 'y',
          }
        }
        this.openFx(deltaTime, data[eventId], mesh)
        break

      case 1:
        // Open-2 (doorA) PULL x:min y:min z:min
        if (!data[eventId]) {
          data[eventId] = []
          data[eventId] = {
            meshId: mesh.objId,
            meshName: mesh.name,
            state: false,
            min: 0,
            max: 64,
            value: 0,
            waiting: 10,
            valueAdd: null,
            addedStep: 0.025,
            addedValue: null,
            offsetTypeX: 'min',
            offsetTypeY: 'min',
            offsetTypeZ: 'min',
            axis: 'y',
          }
        }
        this.openFx(deltaTime, data[eventId], mesh)
      break

      case 2:
        // Open-3 (doorA) PUSH x:min y:max z:max
        if (!data[eventId]) {
          data[eventId] = []
          data[eventId] = {
            meshId: mesh.objId,
            meshName: mesh.name,
            state: false,
            min: 0,
            max: 64,
            value: 0,
            waiting: 10,
            valueAdd: null,
            addedStep: -0.025,
            addedValue: null,
            offsetTypeX: 'min',
            offsetTypeY: 'max',
            offsetTypeZ: 'max',
            axis: 'y',
          }
        }
        this.openFx(deltaTime, data[eventId], mesh)
      break

      case 3:
        // Open-4 (doorB) PULL 90 deg x:min y:max z:min
        if (!data[eventId]) {
          data[eventId] = {
            meshId: mesh.objId,
            meshName: mesh.name,
            state: false,
            min: 0,
            max: 64,
            value: 0,
            waiting: 10,
            valueAdd: null,
            addedStep: -0.025,
            addedValue: null,
            offsetTypeX: 'min',
            offsetTypeY: 'max',
            offsetTypeZ: 'min',
            axis: 'y',
          }
        }
        this.openFx(deltaTime, data[eventId], mesh)
      break

      case 4:
        // Open-5 (doorB) PUSH 90 deg x:max y:min z:min"
        if (!data[eventId]) {
          data[eventId] = {
            meshId: mesh.objId,
            meshName: mesh.name,
            state: false,
            min: 0,
            max: 64,
            value: 0,
            waiting: 10,
            valueAdd: null,
            addedStep: 0.025,
            addedValue: null,
            offsetTypeX: 'max',
            offsetTypeY: 'min',
            offsetTypeZ: 'min',
            axis: 'y',
          }
        }
        this.openFx(deltaTime, data[eventId], mesh)
      break

      case 5:
        // Open-6 (floor-door) x:min y:max z:min
        if (!data[eventId]) {
          data[eventId] = {
            meshId: mesh.objId,
            meshName: mesh.name,
            state: false,
            min: 0,
            max: 64,
            value: 0,
            waiting: 10,
            valueAdd: null,
            addedStep: 0.025,
            addedValue: null,
            offsetTypeX: 'min',
            offsetTypeY: 'max',
            offsetTypeZ: 'min',
            axis: 'z',
          }
        }
        this.openFx(deltaTime, data[eventId], mesh)
      break

      case 6:
        // Open-7 (cheast-box) x:min y:min z:max
        if (!data[eventId]) {
          data[eventId] = {
            meshId: mesh.objId,
            meshName: mesh.name,
            state: false,
            min: 0,
            max: 64,
            value: 0,
            waiting: 10,
            valueAdd: null,
            addedStep: 0.025,
            addedValue: null,
            offsetTypeX: 'min',
            offsetTypeY: 'min',
            offsetTypeZ: 'max',
            axis: 'x',
          }
        }
        this.openFx(deltaTime, data[eventId], mesh)
      break

      case 7:
        // Open-8 (wc-board) x:max y:min z:min
        if (!data[eventId]) {
          data[eventId] = {
            meshId: mesh.objId,
            meshName: mesh.name,
            state: false,
            min: 0,
            max: 64,
            value: 0,
            waiting: 10,
            valueAdd: null,
            addedStep: -0.025,
            addedValue: null,
            offsetTypeX: 'max',
            offsetTypeY: 'min',
            offsetTypeZ: 'min',
            axis: 'z',
          }
        }
        this.openFx(deltaTime, data[eventId], mesh)
      break

      case 10:
        // SWITCH TEXTURE CHANGE
        this.textureOnOff(mesh, data, eventId, 'switch-1-on', 'switch-1-off')
      break

      case 20:
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
      break

      case 30:
        // PICTURE TEXTURE CHANGE
        this.textureOnOff(mesh, data, eventId, 'picture-2', 'picture-3')
      break

      case 40:
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

      case 50:
        // PLAYER DEMAGE        
        if (typeof mesh.waitTimer !== 'number') mesh.waitTimer = 0
        mesh.waitTimer += deltaTime

        if (mesh.waitTimer >= 250) {
          mesh.waitTimer = 0
          this.game.modifyPlayerEnergy(20)
        }
      break

      case 60:
        // Delete Mesh of screen
        console.log('mesh', mesh)

        console.log('---')        

        let selectedMapDataStructure = this.game.findMeshById(this.game.map.structure, mesh.objId)
        if (selectedMapDataStructure) {
          console.log('MEGTALALTA !! : )')
          selectedMapDataStructure.active = 0
          console.log(selectedMapDataStructure)
        }

        this.game.removeObjectOfMap(this.game.scene, mesh)
      break

      case 80:
        // Delete Mesh of screen
        console.log('mesh', mesh)
        console.log('FINISH!!!')

        this.game.finishGameInfoText = true

      break
    }
  }

  // BEING FX
  beingFx(deltaTime, eventId, being, data) {
    switch(data.id) {
      case 0:
        // Active Being OFF / ON
        if (!data[eventId]) data[eventId] = { active: being.active };

        being.active = !being.active

        data[eventId].active = being.active
        this.game.beingActiveOptions(being, being.active)
      break

      case 1:
        // Active Being ON
        if (!data[eventId]) data[eventId] = { active: being.active };

        being.active = true

        data[eventId].active = being.active
        this.game.beingActiveOptions(being, true)
      break

      case 2:
        // Active Being OFF
        if (!data[eventId]) data[eventId] = { active: being.active };

        being.active = false

        data[eventId].active = being.active
        this.game.beingActiveOptions(being, false)
      break
    }
  }

  textureOnOff(mesh, data, eventId, texture_on, texture_off) {
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

  openFx(deltaTime, data, mesh) {
    if (!mesh.container) this.refreshOpenFxState(deltaTime, data, mesh);

    if (!data?.timeInterval) {
      data.addedValue = data.state ? -data.addedStep : data.addedStep; // ÉRTÉKE
      data.valueAdd = data.state ? -1 : 1; // COUNT-JA

      data.timeInterval = setInterval(() => {
        // TEST NEXT MOVE
        const now = performance.now()
        if (mesh.lastUpdate === undefined) mesh.lastUpdate = now - (data.waiting * 2);

        if (now - mesh.lastUpdate >= data.waiting) {
          mesh.lastUpdate = now
          const tempRotation = mesh.container.rotation[data.axis] + data.addedValue
          const clone = mesh.container.clone(true)
          clone.rotation[data.axis] = tempRotation
          const testBox = new THREE.Box3().setFromObject(clone)
          const playerBox = new THREE.Box3().setFromCenterAndSize(this.game.player.position.clone(), this.game.playerBoundingBox)
          if (testBox.intersectsBox(playerBox)) return;

          // MOVE AND REFRESH
          mesh.container.rotation[data.axis] = tempRotation
          mesh.container.updateMatrixWorld(true)

          data.value += data.valueAdd

          // BOUNDING BOX REFRESH
          this.game.refreshBoundingBoxOfMapContainer(mesh)

          // CLAMP VALUE
          data.value = Math.max(data.min, Math.min(data.max, data.value))

          if (data.value >= data.max || data.value <= data.min) {
            // console.log('STOP!');
            data.state = !data.state
            clearInterval(data.timeInterval);
            data.timeInterval = null;
          }
        }
      }, 20);
    } else {
      // IF NEW CLICK - INVERT WAY
      data.state = !data.state
      data.addedValue = data.state ? -data.addedStep : data.addedStep;
      data.valueAdd = data.state ? -1 : 1;
    }
  }

  refreshOpenFxState(deltaTime, data, mesh) {
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
        container.rotation[data.axis] = data.addedValue * data.value
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
