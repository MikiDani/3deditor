import * as THREE from 'three';

export default class Graphics {
  constructor() {
    this.scene = new THREE.Scene();
    this.camera = null;
    this.renderer = null;
  }

  init() {
    /*
    const canvas = document.getElementById('screen');
    this.renderer = new THREE.WebGLRenderer({ canvas });
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.scene.add(this.camera);
    */
  }

  render() {
    console.log('render')
    
    // this.renderer.render(this.scene, this.camera);
  }
}