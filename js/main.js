import * as THREE from 'three'
import $ from 'jquery'

document.getElementById('closeBtn').addEventListener('click', () => {
  document.getElementById('cloud').style.display = 'none';
});

//----
// Start options
var gravity = -0.05
var gravityValue = -0.05

var lightsOn = true
var ghostMode = false
//----


var texturesLinks = []

var map = {
  data: null,
  structure: null,
}

var moveSpeed = 0.02

const rotatingGroups = []

const hutoMeshes = []
const cheesMeshes = []
const saladMeshes = []
const ketchupMeshes = []

var play = true

var effect = {
  active: true,
  state: 'closed',
  scale: 0.02,
  counter: 0,
  min: 0,
  max: 90,
}

var dynamicBoundingBoxes = []; // mozgatott objektumok frissülő bounding box-ai

//----
const scene = new THREE.Scene();

const canvas = document.getElementById('screen');
canvas.style.imageRendering = 'pixelated'

console.log(window.innerWidth)

const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, premultipliedAlpha: false });
// renderer.setSize(window.innerWidth, window.innerHeight);

const scX = window.innerWidth / 3
const scY = window.innerHeight / 3

renderer.setSize(scX, scY, false)
renderer.setPixelRatio(1)

var camera = new THREE.PerspectiveCamera(60, scX / scY, 0.1, 10);

// var camera
// SMALL SCREEN SIZE
if (false) {
  camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
  renderer.setSize(320, 240, false)
}

const pitchObject = new THREE.Object3D();
pitchObject.add(camera);

const yawObject = new THREE.Object3D();
yawObject.position.set(0, 0, 0);
yawObject.add(pitchObject);
scene.add(yawObject);

// ----- EGERES FORGÁS -----
const button = document.getElementById('mouseButton');
button.addEventListener('click', () => {
  canvas.requestPointerLock();
});

let isPointerLocked = false;

document.addEventListener('pointerlockchange', () => {
  isPointerLocked = document.pointerLockElement == canvas
});

document.addEventListener('mousemove', (event) => {
  if (!isPointerLocked) return;

  const movementX = event.movementX || 0;
  const movementY = event.movementY || 0;

  yawObject.rotation.y -= movementX * 0.002
  pitchObject.rotation.x -= movementY * 0.002

  const maxPitch = THREE.MathUtils.degToRad(80)
  const minPitch = THREE.MathUtils.degToRad(-80)
  pitchObject.rotation.x = Math.max(minPitch, Math.min(maxPitch, pitchObject.rotation.x))

  camera.rotation.z = 0
});

// ----- RÁCS -----
if (false) {
  const gridHelper = new THREE.GridHelper(10, 10, 0x444444, 0x888888);
  gridHelper.position.set(5, 0, 5);
  scene.add(gridHelper);
}

// ----- OBJEKTEK + BOUNDING BOXOK -----
const boundingBoxes = [];

// ----- MOZGÁS VEZÉRLÉS -----
function setupCameraControls() {
  const rotateSpeed = THREE.MathUtils.degToRad(3);
  const keysPressed = new Set();

  let isGrounded = true;
  let jumpState = {
    isJumping: false,
    size: 0.5,
    startY: 0,
    targetY: 0,
    startTime: 0,
    duration: 200 // ms
  };

  window.addEventListener('keydown', (e) => keysPressed.add(e.key.toLowerCase()));
  window.addEventListener('keyup', (e) => keysPressed.delete(e.key.toLowerCase()));

  function willCollide(testPos) {
    const cameraBox = new THREE.Box3().setFromCenterAndSize(
      testPos,
      new THREE.Vector3(0.4, 1, 0.4)
    );

    // Statikus objektumok
    let collides = boundingBoxes.some(box => box.intersectsBox(cameraBox));

    // Dinamikus objektumok
    collides ||= dynamicBoundingBoxes.some(entry => entry.box.intersectsBox(cameraBox));

    return collides;
  }

  function attemptMove(offset) {
    const testPosFull = yawObject.position.clone().add(offset);

    if (ghostMode) {
      yawObject.position.add(offset);
      return true;
    }

    if (!willCollide(testPosFull)) {
      yawObject.position.add(offset);
      return true;
    }

    const testOffsetX = new THREE.Vector3(offset.x, 0, 0);
    const testPosX = yawObject.position.clone().add(testOffsetX);
    const xOK = !willCollide(testPosX);

    const testOffsetZ = new THREE.Vector3(0, 0, offset.z);
    const testPosZ = yawObject.position.clone().add(testOffsetZ);
    const zOK = !willCollide(testPosZ);

    if (xOK) yawObject.position.add(testOffsetX);
    if (zOK) yawObject.position.add(testOffsetZ);

    return xOK || zOK;
  }

  function updateCamera() {
    const shift = keysPressed.has('shift');
    let moved = false;

    const direction = new THREE.Vector3(-Math.sin(yawObject.rotation.y), 0, -Math.cos(yawObject.rotation.y)).normalize();

    if (keysPressed.has('escape')) {
      console.log('esc') 
      play = false
    }

    if (keysPressed.has('w')) {
      if (shift) {
        if (!moved) {
          moved = attemptMove(new THREE.Vector3(0, moveSpeed, 0));
        }
      } else {
        if (!moved) {
          moved = attemptMove(direction.clone().multiplyScalar(moveSpeed));
        }
      }
    }

    if (keysPressed.has('s')) {
      if (shift) {
        if (!moved) {
          moved = attemptMove(new THREE.Vector3(0, -moveSpeed, 0))
        }
      } else {
        if (!moved) {
          moved = attemptMove(direction.clone().multiplyScalar(-moveSpeed))
        }
      }
    }

    if (keysPressed.has('a')) {
      if (shift) {
        const left = new THREE.Vector3().crossVectors(camera.up, direction).normalize().multiplyScalar(moveSpeed)
        moved ||= attemptMove(left);
      } else {
        yawObject.rotation.y += rotateSpeed
        moved = true
      }
    }

    if (keysPressed.has('d')) {
      if (shift) {
        const right = new THREE.Vector3().crossVectors(direction, camera.up).normalize().multiplyScalar(moveSpeed)
        moved ||= attemptMove(right);
      } else {
        yawObject.rotation.y -= rotateSpeed
        moved = true
      }
    }

    const pitchLimit = THREE.MathUtils.degToRad(80);

    if (keysPressed.has('pagedown')) {
      pitchObject.rotation.x -= rotateSpeed;
      pitchObject.rotation.x = Math.max(-pitchLimit, Math.min(pitchLimit, pitchObject.rotation.x))
    }

    if (keysPressed.has('pageup')) {
      pitchObject.rotation.x += rotateSpeed;
      pitchObject.rotation.x = Math.max(-pitchLimit, Math.min(pitchLimit, pitchObject.rotation.x))
    }

    //---

    // ----- UGRÁS -----
    if (keysPressed.has(' ') && isGrounded && !jumpState.isJumping) {
      jumpState.isJumping = true;
      jumpState.startY = yawObject.position.y;
      jumpState.targetY = yawObject.position.y + jumpState.size;
      jumpState.startTime = performance.now();
      isGrounded = false;
    }

    if (jumpState.isJumping) {
      const elapsed = performance.now() - jumpState.startTime;
      const t = Math.min(elapsed / jumpState.duration, 1);
      const newY = THREE.MathUtils.lerp(jumpState.startY, jumpState.targetY, t);

      const jumpOffset = new THREE.Vector3(0, newY - yawObject.position.y, 0);
      const testPos = yawObject.position.clone().add(jumpOffset);

      if (!willCollide(testPos)) {
        yawObject.position.y = newY;
      } else {
        jumpState.isJumping = false;
      }

      if (t >= 1) jumpState.isJumping = false;
    }

    // ----- GRAVITÁCIÓ -----
    if (!jumpState.isJumping) {
      // const gravityOffset = new THREE.Vector3(0, 0, 0);  // !!
      const gravityOffset = new THREE.Vector3(0, gravity, 0);
      const testPos = yawObject.position.clone().add(gravityOffset);

      if (!willCollide(testPos)) {
        yawObject.position.add(gravityOffset);
        isGrounded = false;
      } else {
        isGrounded = true;
      }
    }

    return moved;
  }

  return updateCamera
}

// INFO
$(document).on('keydown', (event) => {
  if (event.key == 'i') {
    console.log('map.player')
    console.log(map.player.x)
    console.log(map.player.y)
    console.log(map.player.z)

    console.log(map.player.fYaw)
    console.log(map.player.fXaw)

    // console.log('---')
    // console.log(yawObject.position.x)
    // console.log(yawObject.position.y)
    // console.log(yawObject.position.z)

    //console.log(yawObject.position??.fYaw)
    // console.log(yawObject.position??.fXaw)
  }
});

function deepCopy(data, allVisible) { 
  if (Array.isArray(data)) {
    return data.map(item => deepCopy(item, allVisible));
  }
  if (data !== null && typeof data == 'object') {
    let copy = {};
    for (let key in data) {
      if (data.hasOwnProperty(key)) {
        copy[key] = (key == 'visible' && allVisible == true) ? 1 : deepCopy(data[key], allVisible);
      }
    }
    return copy;
  }
  return data;
}

async function fetchData(data, originaldata) {

  // const path = 'https://tuccmann.com/3deditor/editor.php'; // !!! Online
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

async function fetchDataFile(data, originaldata) {
  try {
    const response = await $.ajax({
      url: 'editor.php',
      type: 'POST',
      data: data,
      cache: false,
      contentType: false,
      processData: false
    });
    return originaldata ? response : JSON.parse(response);
  } catch (error) {}
}

// Spritesheet generálása több képből és animált textúra létrehozása
async function createSpritesheetTexture(name, imagePaths, interval = 100) { 
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

async function loadMap(filename) {

  // filename = 'maniac';

  const response = await fetchData({ ajax: true, load: true, filename: filename });
  console.log(response)
  
  if (response?.data && response?.structure) {
    map.data = deepCopy(response.data, true)
    map.structure = deepCopy(response.structure, true)
    map.player = deepCopy(response.player)
    map.lights = deepCopy(response.lights)
  }

  function convertEditorToThreePlayer(editorPlayer) {
    return {
      x: editorPlayer.x,
      y: editorPlayer.y,
      z: -editorPlayer.z, // Editorban előre: Z+, Three.js-ben előre: Z-
      fYaw: THREE.MathUtils.degToRad(180) - editorPlayer.fYaw,
      fXaw: editorPlayer.fXaw // változatlan
    };
  }

  // SUCCESS GET DATA
  if (map.data) {
    // console.log(map.player)
    // console.log(yawObject.position)

    if (map?.player) {
      console.log('Player DATAS', map.player)

      /*
      new 1
      const playerPos = convertEditorToThreePlayer(map.player);

      yawObject.position.set(playerPos.x, playerPos.y, playerPos.z);
      yawObject.rotation.y = playerPos.fYaw;
      pitchObject.rotation.x = -playerPos.fXaw;
      */

      /* OLD
      yawObject.position.x = map.player.x
      yawObject.position.y = map.player.y
      yawObject.position.z = -map.player.z
  
      yawObject.rotation.y -= map.player.fYaw - THREE.MathUtils.degToRad(180)
      pitchObject.rotation.x -= map.player.fXaw
      */

      yawObject.position.x = map.player.x
      yawObject.position.y = map.player.y
      yawObject.position.z = -map.player.z / 7
  
      yawObject.rotation.y -= map.player.fYaw
      pitchObject.rotation.x -= map.player.fXaw

    } else {
      yawObject.position.x = 0.5
      yawObject.position.y = 0.0
      yawObject.position.z = 0.5
    }

    for (let mesh of map.data) {
     
      const meshGroup = new THREE.Group(); // új csoport minden mesh-hez

      for (let tri of mesh.tris) {

        let loadedTexture = null

        if (tri.texture.name) {
          let texturePaths = Object.values(texturesLinks[tri.texture.name])
          loadedTexture = await createSpritesheetTexture(tri.texture.name, texturePaths, 500)
        }

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

        geometry.computeVertexNormals();

        // MeshBasicMaterial vagy MeshLambertMaterial
        // const material = new THREE.MeshBasicMaterial({
        const material = new THREE.MeshLambertMaterial({
          map: loadedTexture,
          side: THREE.DoubleSide,
          transparent: true,
          opacity: 1,
          alphaTest: 0.01
        });

        const triangleMesh = new THREE.Mesh(geometry, material)
        meshGroup.add(triangleMesh)

        // if (mesh.name == 'Huto-ajto') {
        //   hutoMeshes.push(triangleMesh)  // mentés kattintásérzékeléshez
        // }

        if (mesh?.actions && mesh.actions.includes('1')) {
          hutoMeshes.push(triangleMesh)  // mentés kattintásérzékeléshez
        }

        // console.log(mesh.name)

        if (mesh.name == 'chees') {
          cheesMeshes.push(triangleMesh)  // mentés kattintásérzékeléshez
        }

        if (mesh.name == 'salad') {
          saladMeshes.push(triangleMesh)  // mentés kattintásérzékeléshez
        }

        if (mesh.name == 'Ketchup') {
          ketchupMeshes.push(triangleMesh)  // mentés kattintásérzékeléshez
        }

        geometry.computeBoundingBox();
        const box = geometry.boundingBox.clone();
        box.min.add(triangleMesh.position);
        box.max.add(triangleMesh.position);
        boundingBoxes.push(box);
      }

      // Ha ez a 'Huto', hozzunk létre egy pivotot a legalacsonyabb pont köré
      // if (mesh.name == 'Huto-ajto') {
      if (mesh?.actions && (mesh.actions.includes('2') || mesh.actions.includes('1'))) {

        const box = new THREE.Box3().setFromObject(meshGroup);
        const pivot = new THREE.Group();

        // Forgási pont: jobb alsó sarok (X-max, Y-min, Z-max)
        // 1:
        // pivot.position.copy(box.min);
        // 2:
        pivot.position.set(box.min.x, box.min.y, box.max.z)

        meshGroup.position.sub(pivot.position); // eltolás az új origóhoz
        pivot.add(meshGroup);
        scene.add(pivot);
        rotatingGroups.push(pivot); // forgatandó elem most már a pivot

        // Tárold a pivothoz tartozó dinamikus box referenciát
        dynamicBoundingBoxes.push({ object: pivot, box: new THREE.Box3() });

        // SÁRGA KERET A BOUNDING BOX-NAK
        /*
        const helper = new THREE.BoxHelper(pivot, 0xffff00);
        scene.add(helper);
        */
      } else {
        scene.add(meshGroup);
      }
    }
  }
}

async function loadTexturesLinks() {  
  const response = await fetchData({ ajax: true, gettexturestructure: true })  
  if (response?.structure) {
    for (const key in response.structure) {
      let keys = Object.keys(response.structure[key]);
      for (let key2 of keys) {
        texturesLinks[key2] = response.structure[key][key2]
      }
    }
  } else throw('Textures didn\'t load.');
}

async function init() {
  await loadTexturesLinks()

  const response = await fetchData({ ajax: true, getfiles: true })  
  if (response?.files) {
    console.log(response.files)
    let elements = '';
    for (const file of response.files) {
      elements += `<span class="filename" style="margin-left:10px;margin-right:10px;color:white;cursor:pointer;">${file.name}</span>`
    }
    $('#filelist-container').append(elements)
  }

  $("#loading").hide()

  $('#gravity-button').on('click', function() {
    gravity = $(this).prop('checked') ? gravityValue : 0;
  });

  $('#lights-button').on('click', function() {
    lightsOn = $(this).prop('checked')
  });

  $('#ghost-button').on('click', function() {
    ghostMode = $(this).prop('checked')
  });

  $('#filelist-container .filename').on('click', function() {
    $('#file-input').val($(this).text())    
  });

  await new Promise((resolve, reject) => {
    $('#closeBtn').on('click', () => { resolve() })
  })

  $("#cloud").hide()

  const filename = $("input[name='filename']").val()

  await loadMap(filename)

  const raycaster = new THREE.Raycaster()
  const mouse = new THREE.Vector2()

  canvas.addEventListener('mousedown', (event) => {
    mouse.x = (event.clientX / canvas.clientWidth) * 2 - 1;
    mouse.y = - (event.clientY / canvas.clientHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(hutoMeshes, true); // true: ha belső objektumok is

    if (intersects.length > 0) {
      console.clear();
      console.log('A Hűtő messze van...');
      console.log(intersects[0].distance)

      if (intersects[0].distance < 0.8) {
        console.log('HŰTŐ: ' + effect.state + ' !!!');
        effect.active = !effect.active      
      }
    }

    const intersects2 = raycaster.intersectObjects(cheesMeshes, true)
    if (intersects2.length > 0) {
      cheesMeshes.forEach(mesh => {
        mesh.visible = !mesh.visible;
      });
    }

    const intersects3 = raycaster.intersectObjects(saladMeshes, true)
    if (intersects3.length > 0) {
      saladMeshes.forEach(mesh => {
        mesh.visible = !mesh.visible;
      });
    }

    const intersects4 = raycaster.intersectObjects(ketchupMeshes, true)
    if (intersects4.length > 0) {
      ketchupMeshes.forEach(mesh => {
        mesh.visible = !mesh.visible;
      });
    }

  });

  // Fények hozzáadása a betöltött jelenethez

  // 1. Környezeti fény – mindenre gyengén világít
  /*
  const ambient = new THREE.AmbientLight(0xcccccc, 0.4); // szín, erősség
  scene.add(ambient);
  */
 
  // // 2. Irányított fény (mint napfény)
  // const sunLight = new THREE.DirectionalLight(0xffffff, 0.8); // szín, erősség
  // sunLight.position.set(5, 10, 7); // fentről, oldalról világít
  // scene.add(sunLight);

  /*
  // // 3. Pontfény (opcionális)
  const pointLight = new THREE.PointLight(0xffddaa, 0.3, 10); // szín, erősség, távolság
  pointLight.position.set(0, 0.7, 0);
  scene.add(pointLight);

  const pointLight2 = new THREE.PointLight(0xffffff, 0.4, 1.5); // szín, erősség, távolság
  pointLight2.position.set(0.5, 0.7, -1);
  scene.add(pointLight2);

  const pointLight3 = new THREE.PointLight(0xffddaa, 0.7, 10); // szín, erősség, távolság
  pointLight3.position.set(-2, 0.5, -1);
  scene.add(pointLight3);
  */

  console.log(map.lights)

  if (lightsOn) {
    if (map?.lights && map.lights.length > 0) {
      for (const light of map.lights) {
        
        // console.log('light.visible: ', light.visible)
        
        if (light.visible) {
          console.log(light.color)
          // console.log(light.editcolor)
          console.log(light.intensity)
          console.log(light.distance)
          console.log(light.type)
      
          let lightColor = new THREE.Color(parseInt(light.color, 16))
    
          let pointLight = null
      
          if (light.type == 'point') pointLight = new THREE.PointLight(lightColor, light.intensity, light.distance * 5);    
          else if (light.type == 'direction') pointLight = new THREE.DirectionalLight(lightColor, light.intensity);
      
          if (pointLight) {
            pointLight.position.set(light.p.x, light.p.y, light.p.z)
            scene.add(pointLight)
          }
        }
        // break;
      }
    }
  } else {
    console.log('NINCSEN')
    const ambient = new THREE.AmbientLight(0xffffff, 1); // szín, erősség
    scene.add(ambient);
    
  }

  game();
}

function game() {
  const updateCamera = setupCameraControls();

  function animate() {
    if (play) requestAnimationFrame(animate)

    // minden frame-ben frissítsük a dinamikus bounding boxokat
    for (const entry of dynamicBoundingBoxes) {
      entry.box.copy(new THREE.Box3().setFromObject(entry.object));
    }

    for (const group of rotatingGroups) {

      const dynBox = dynamicBoundingBoxes.find(e => e.object === group); // keressük ki a hozzá tartozó dinamikus boxot
      if (!dynBox) continue; // ha nincs ilyen, ugorjunk

      let angleDelta = 0; // forgatás mértéke

      if (effect.active) {
        if (effect.state == 'closed') {
          angleDelta = effect.scale;
        } else if (effect.state == 'opened') {
          angleDelta = -effect.scale;
        }

        group.rotation.y += angleDelta; // próbáljuk meg a forgatást
        const newBox = new THREE.Box3().setFromObject(group); // új box forgatás után

        // ütközésvizsgálat a kamerával
        const camBox = new THREE.Box3().setFromCenterAndSize(
          yawObject.position.clone(),
          new THREE.Vector3(0.5, 1, 0.5)
        );
        const intersectsCamera = camBox.intersectsBox(newBox); // 
        if (!intersectsCamera) {
          // ha nincs ütközés: megtarthatjuk
          dynBox.box.copy(newBox); // frissítjük a boxot

          // const helper = new THREE.BoxHelper(group, 0xffff00);
          // scene.add(helper);

          if (effect.state == 'closed') {
            effect.counter++
            if (effect.counter == effect.max) {
              effect.active = false
              effect.state = 'opened'
            }
          } else if (effect.state == 'opened') {
            effect.counter--
            if (effect.counter == effect.min) {
              effect.active = false
              effect.state = 'closed'
            }
          }
        } else {
          // ha ütközne, akkor visszaállítjuk a forgatást
          group.rotation.y -= angleDelta;
        }
      }
    }

    updateCamera()

    renderer.render(scene, camera)

    map.player = {
      x: yawObject.position.x,
      y: yawObject.position.y,
      z: yawObject.position.z,
      fYaw: yawObject.rotation.y,
      fXaw: pitchObject.rotation.x
    }

  }
  animate();
}

init();
