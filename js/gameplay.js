import * as THREE from 'three';
import $ from 'jquery'

export default class Gameplay {
  constructor(game) {
    this.game = game
    this.counter = 0
  }

  async update(deltaTime) {
    this.counter++

    if (this.counter>5) {
      $(".delta-time-game").html(deltaTime.toFixed(1))
      this.counter = 0
    }

    await this.game.input.updateCamera()

    // this.changeLightColorRandom(this.game.loadedlights[6][1]) // !

    await this.startActions()

    await this.game.renderer.render(this.game.scene, this.game.camera)
  }

  async startActions() {
    this.game.map.actionelements.forEach(action => {
      // NO CLICK ACTIONS
      if (action[1].conditions.click == 'null') {
        const meshGroup = action[0];
        const children = meshGroup.children
        if (!children.length) return;
    
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

    if (distance > actions[1].conditions.distance_near && distance < actions[1].conditions.distance_far) {

      if (!loop) {
        console.log('-------')
        console.log(actions[1].meshname, actions[1].conditions.distance_near.toFixed(3))
      }

      if (loop) {
        this.changeLightColorRandom(this.game.loadedlights[6][1])        
        this.game.loadedlights[6][1].position.x -= 0.01
        this.game.loadedlights[6][1].position.x = (this.game.loadedlights[6][1].position.x < -3) ? 0 : this.game.loadedlights[6][1].position.x;
      } else {
        console.log("SIKER !!! : )", distance.toFixed(3))
      }

    } else {

      if (loop) {

      } else {
        console.log("Kiesik a távokból!", distance.toFixed(3))
        console.log("near: ",  actions[1].conditions.distance_near)
        console.log("far: ",  actions[1].conditions.distance_far)
      }

    }
  }

  changeLightColorRandom(light) {
    if (!(light instanceof THREE.PointLight)) return;

    const randomColor = new THREE.Color(Math.random(), Math.random(), Math.random());
    light.color = randomColor;
  }
}
