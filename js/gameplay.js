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

    await this.game.input.updateCamera()

    await this.startActions()

    await this.game.renderer.render(this.game.scene, this.game.camera)
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
          // NO CLICK ACTIONS
          this.checkActions(action, intersects[0].distance, true)  // !
        }
      }
    });
  }

  async checkActions(actions, distance, loop) {
    // .... Majd itt kell lekezelni a teljes Actions-ot... alakul : )

    // CHECK DISTANCES
    if (!(distance > actions[1].conditions.distance_near && distance < actions[1].conditions.distance_far)) return;

    // CHECK OBJECTS
    if (actions[1].conditions.issetobjects.length > 0 && !this.game.checkPlayerObject(actions[1].conditions.issetobjects)) return;

    // START EVENTS
    for(const event of actions[1].events) {
      if (event.timeout == null) {
        console.log('Most csinálok settimeout-ot: '+ event.name)  // !!!
        event.timeout = setTimeout(() => {
          // EVENT CHECK ADD OBJECTS
          if (event.addobjects.length > 0) {
            for (const addObjectId of event.addobjects) {
              // ADD OBJECT
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
              console.log(fx)
              console.log(fx[0])
              console.log(fx[1])
              
              let light = this.game.loadedLights[parseInt(fx[0])][1]
              let fxData = this.game.config.lightfx.find(fxpc => fxpc.id == parseInt(fx[1]))
              if (light, fxData) this.lightFx(light, fxData);
            }
          }

          // MOVE FX
          if (event.moveactions.length > 0) {
            for (const fx of event.moveactions) {
              let mesh = this.game.loadedMeshs[parseInt(fx[0])]        
              let fxData = this.game.config.movefx.find(fxpc => fxpc.id == parseInt(fx[1]))
              if (mesh && fxData) this.moveFx(mesh, fxData);
            }
          }

          console.log('Letelt: ' + event.name + " Most törlöm: " + event.name) // !!!
          clearTimeout(event.timeout)
          event.timeout = null

        }, parseInt(event.timer))
      } else {
        console.log(event.name + " Létezik... " + event.timer) // !!!
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
        if (!mesh.openConfig) {
          mesh.openConfig = {
            state: false,
            min: 0,
            max: 190,
            value: 0,
            valueadd: null,
            addedStep: 0.01,
            addedValue: null,
          }
        }

        mesh.openConfig.addedValue = mesh.openConfig.state ? -mesh.openConfig.addedStep : mesh.openConfig.addedStep;
        mesh.openConfig.valueAdd = mesh.openConfig.state ? -1 : 1;

        // console.log(mesh.openConfig.addedValue)

        if (!mesh?.timeInterval) {
          // FIRST OFFSET OPTIONS
          if (!mesh.containerOffset) {
            const box = new THREE.Box3().setFromObject(mesh)
            const offset = new THREE.Vector3(box.min.x, box.min.y, box.max.z)
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
          const playerBox = new THREE.Box3().setFromCenterAndSize(this.game.player.position.clone(), new THREE.Vector3(0.4, 1, 0.4))
          if (futureBox.intersectsBox(playerBox)) return;

          this.game.scene.add(mesh.container)

          mesh.timeInterval = setInterval(() => {
            // TEST NEXT MOVE
            const tempRotation = mesh.container.rotation.y + mesh.openConfig.addedValue
            const clone = mesh.container.clone(true)
            clone.rotation.y = tempRotation
            const testBox = new THREE.Box3().setFromObject(clone)
            const playerBox = new THREE.Box3().setFromCenterAndSize(this.game.player.position.clone(), new THREE.Vector3(0.4, 1, 0.4))
            if (testBox.intersectsBox(playerBox)) return;

            // MOVE AND REFRESH
            mesh.container.rotation.y = tempRotation
            mesh.openConfig.value += mesh.openConfig.valueAdd
          
            // REFRESH BOUNDING BOX FRISSÍTÉS
            const updatedBox = new THREE.Box3().setFromObject(mesh.container)
            const index = this.game.boundingBoxes.findIndex(box => box === mesh._boundingBox)
            if (index !== -1) this.game.boundingBoxes[index] = updatedBox;
            else this.game.boundingBoxes.push(updatedBox);
            mesh._boundingBox = updatedBox

            // console.log(mesh.openConfig.value)

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
        break

      case 1:
        //
      break
    }
  }
}
