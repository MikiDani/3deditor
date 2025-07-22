import { Vec3D, Triangle, Mesh, Matrix4x4, Vec2D } from './data.js';

export class Graphics {
  constructor(text, keys, options, map, findMeshById, findMeshParent, playerPos) {

    this.findMeshById = findMeshById
    this.findMeshParent = findMeshParent
    this.text = text // console.log(this.text)
    this.keys = keys
    this.options = options
    this.map = map
    this.playerPos = playerPos

    this.counter2 = 0

    this.options3D = {
      textured: true,
      fill: false,
      grid: false,
      realtime: false,
    }

    for(const [key, value] of Object.entries(this.options3D)) {
      let html = value ? 'ON' : 'OFF';
      $(`button[class='3d-buttons'][name='${key}']`).val(this.options3D[key]).html(html)
    }

    //--- SCREEN ---
    // this.GAMEWIDTH = 160; this.GAMEHEIGHT = 120; this.RATIO = 3;
    this.GAMEWIDTH = 800; this.GAMEHEIGHT = 480; this.RATIO = 1;
    // this.GAMEWIDTH = 1024; this.GAMEHEIGHT = 768; this.RATIO = 1;
    // this.GAMEWIDTH = 320; this.GAMEHEIGHT = 180; this.RATIO = 3;
    
    // this.GAMEWIDTH = 640; this.GAMEHEIGHT = 480; this.RATIO = 0.5;
    // this.GAMEWIDTH = 640; this.GAMEHEIGHT = 360; this.RATIO = 0.5;

    this.HALFWIDTH = this.GAMEWIDTH / 2
    this.HALFHEIGHT = this.GAMEHEIGHT / 2

    this.SCREENWIDTH =  this.GAMEWIDTH * this.RATIO
    this.SCREENHEIGHT = this.GAMEHEIGHT * this.RATIO

    this.screenCanvas = (document.getElementById("screen-canvas")) ? document.getElementById("screen-canvas") : null;
    this.screenCtx = (this.screenCanvas) ? this.screenCanvas.getContext("2d") : null;
    this.screenCtx.imageSmoothingEnabled = false

    this.screenCanvas.width = this.SCREENWIDTH
    this.screenCanvas.height = this.SCREENHEIGHT

    this.memoryCanvas = document.createElement('canvas')
    this.memoryCtx = this.memoryCanvas.getContext('2d')
    this.memoryCtx.imageSmoothingEnabled = false

    this.memoryCanvas.width = this.GAMEWIDTH
    this.memoryCanvas.height = this.GAMEHEIGHT

    this.screenData = this.memoryCtx.createImageData(this.GAMEWIDTH, this.GAMEHEIGHT)
    this.buffer = new Uint32Array(this.screenData.data.buffer)
    this.depthBuffer = new Array(this.GAMEWIDTH * this.GAMEHEIGHT).fill(0)

    this.mesh = new Mesh()

    // this.matProj = this.matrix_MakeProjection(75, this.GAMEHEIGHT / this.GAMEWIDTH, 1, 1000) //  FOV, ratio, near, far
    this.matProj = this.matrix_MakeProjection(60, this.GAMEHEIGHT / this.GAMEWIDTH, 0.1, 10)

    this.resetCordinates()

    this.lightDirection = new Vec3D(0, 1, -1)
    this.fTheta = 0

    this.clipped = [new Triangle(), new Triangle()];
  }

  resetCordinates() {
    this.vLookDir = new Vec3D(0, 0, -1)
    this.vCamera = new Vec3D(this.playerPos.x, this.playerPos.y, this.playerPos.z)
    this.fYaw = this.playerPos.fYaw
    this.fXaw = this.playerPos.fXaw
  }

  angleToRandian(angle) {
    return angle * (Math.PI / 180);
  }

  radianToAngle(rad) {
    return rad * (180 / Math.PI);
  }

  matrix_MultiplyVector(mM, i) {
    let m = mM.m
    let v = {x:0, y:0, z:0, w:0}
    v.x = i.x * m[0][0] + i.y * m[1][0] + i.z * m[2][0] + i.w * m[3][0]
    v.y = i.x * m[0][1] + i.y * m[1][1] + i.z * m[2][1] + i.w * m[3][1]
    v.z = i.x * m[0][2] + i.y * m[1][2] + i.z * m[2][2] + i.w * m[3][2]
    v.w = i.x * m[0][3] + i.y * m[1][3] + i.z * m[2][3] + i.w * m[3][3]
    return v;
  }

  matrix_MakeIdentity() {
    const matrix = new Matrix4x4();
    matrix.m[0][0] = 1.0;
    matrix.m[1][1] = 1.0;
    matrix.m[2][2] = 1.0;
    matrix.m[3][3] = 1.0;
    return matrix;
  }

  matrix_MakeRotationX(fAngleRad) {
    const matrix = new Matrix4x4();
    matrix.m[0][0] = 1.0;
    matrix.m[1][1] = Math.cos(fAngleRad);
    matrix.m[1][2] = Math.sin(fAngleRad);
    matrix.m[2][1] = -Math.sin(fAngleRad);
    matrix.m[2][2] = Math.cos(fAngleRad);
    matrix.m[3][3] = 1.0;
    return matrix;
  }

  matrix_MakeRotationY(fAngleRad) {
    const matrix = new Matrix4x4();
    matrix.m[0][0] = Math.cos(fAngleRad);
    matrix.m[0][2] = Math.sin(fAngleRad);
    matrix.m[2][0] = -Math.sin(fAngleRad);
    matrix.m[1][1] = 1.0;
    matrix.m[2][2] = Math.cos(fAngleRad);
    matrix.m[3][3] = 1.0;
    return matrix;
  }

  matrix_MakeRotationZ(fAngleRad) {
    const matrix = new Matrix4x4();
    matrix.m[0][0] = Math.cos(fAngleRad);
    matrix.m[0][1] = Math.sin(fAngleRad);
    matrix.m[1][0] = -Math.sin(fAngleRad);
    matrix.m[1][1] = Math.cos(fAngleRad);
    matrix.m[2][2] = 1.0;
    matrix.m[3][3] = 1.0;
    return matrix;
  }

  matrix_MakeTranslation(x, y, z) {
    const matrix = new Matrix4x4();
    matrix.m[0][0] = 1.0;
    matrix.m[1][1] = 1.0;
    matrix.m[2][2] = 1.0;
    matrix.m[3][3] = 1.0;
    matrix.m[3][0] = x;
    matrix.m[3][1] = y;
    matrix.m[3][2] = z;
    return matrix;
  }

  matrix_MakeScale(s) {
    const matrix = new Matrix4x4();
    matrix.m[0][0] = s;   // X tengely mentén nagyítás
    matrix.m[1][1] = s;   // Y tengely mentén nagyítás
    matrix.m[2][2] = s;   // Z tengely mentén nagyítás
    matrix.m[3][3] = 1.0; // Homogén koordináta
    return matrix;
  }

  matrix_MakeProjection(fFovDegrees, fAspectRatio, fNear, fFar) {
    const fFovRad = 1.0 / Math.tan((fFovDegrees * 0.5) * (Math.PI / 180.0));
    const matrix = new Matrix4x4();
    matrix.m[0][0] = fAspectRatio * fFovRad;
    matrix.m[1][1] = fFovRad;
    matrix.m[2][2] = fFar / (fFar - fNear);
    matrix.m[3][2] = (-fFar * fNear) / (fFar - fNear);
    matrix.m[2][3] = 1.0;
    matrix.m[3][3] = 0.0;
    return matrix;
  }

  matrix_MultiplyMatrix(m1, m2) {
      const matrix = new Matrix4x4();
      for (let c = 0; c < 4; c++) {
          for (let r = 0; r < 4; r++) {
              matrix.m[r][c] = m1.m[r][0] * m2.m[0][c] + m1.m[r][1] * m2.m[1][c] + m1.m[r][2] * m2.m[2][c] + m1.m[r][3] * m2.m[3][c]
          }
      }
      return matrix;
  }

  matrix_MakeMirror(axis) {    
    const matrix = new Matrix4x4();
    matrix.m[0][0] = (axis == 'x') ? -1.0 : 1.0;
    matrix.m[1][1] = (axis == 'y') ? -1.0 : 1.0;
    matrix.m[2][2] = (axis == 'z') ? -1.0 : 1.0;
    matrix.m[3][3] = 1.0;
    return matrix;
  }

  calculateAveragePosition(meshData) {
    let sum = { x: 0, y: 0, z: 0 }
    let count = 0
  
    if (Array.isArray(meshData.tris) && meshData.tris.length > 0) {
      meshData.tris.forEach(tri => {
        for (let i = 0; i < 3; i++) {
          sum.x += tri.p[i].x
          sum.y += tri.p[i].y
          sum.z += tri.p[i].z
          count++
        }
      })
    }
  
    if (count > 0) {
      return {
        x: sum.x / count,
        y: sum.y / count,
        z: sum.z / count
      }
    } else {
      return { x: 0, y: 0, z: 0 }  // Ha nem volt pont
    }
  }

  calculateGroupAveragePosition(meshList) {
    let sum = { x: 0, y: 0, z: 0 };
    let count = 0;
  
    for (let meshData of meshList) {
      if (!Array.isArray(meshData.tris)) continue;
      for (let tri of meshData.tris) {
        for (let p of tri.p) {
          sum.x += p.x;
          sum.y += p.y;
          sum.z += p.z;
          count++;
        }
      }
    }

    return count > 0
      ? { x: sum.x / count, y: sum.y / count, z: sum.z / count }
      : { x: 0, y: 0, z: 0 };
  }

  matrix_PointAt(pos, target, up) {

    // Calculate new forward direction
    let newForward = new Vec3D()
    newForward = this.vector_Normalise(this.vector_Sub(target, pos))

    // Calculate new Up direction
    let a = this.vector_Mul(newForward, this.vector_DotProduct(up, newForward))
    let newUp = this.vector_Normalise(this.vector_Sub(up, a))

    // New Right direction is easy, its just cross product
    let newRight = this.vector_CrossProduct(newUp, newForward)

    const matrix = new Matrix4x4();
    matrix.m[0][0] = newRight.x;
    matrix.m[0][1] = newRight.y;
    matrix.m[0][2] = newRight.z;
    matrix.m[0][3] = 0.0;
    matrix.m[1][0] = newUp.x;
    matrix.m[1][1] = newUp.y;
    matrix.m[1][2] = newUp.z;
    matrix.m[1][3] = 0.0;
    matrix.m[2][0] = newForward.x;
    matrix.m[2][1] = newForward.y;
    matrix.m[2][2] = newForward.z;
    matrix.m[2][3] = 0.0;
    matrix.m[3][0] = pos.x;
    matrix.m[3][1] = pos.y;
    matrix.m[3][2] = pos.z;
    matrix.m[3][3] = 1.0;
    return matrix;
  }

  matrix_QuickInverse(m) {
    const matrix = new Matrix4x4();
    matrix.m[0][0] = m.m[0][0];
    matrix.m[0][1] = m.m[1][0];
    matrix.m[0][2] = m.m[2][0];
    matrix.m[0][3] = 0.0;
    matrix.m[1][0] = m.m[0][1];
    matrix.m[1][1] = m.m[1][1];
    matrix.m[1][2] = m.m[2][1];
    matrix.m[1][3] = 0.0;
    matrix.m[2][0] = m.m[0][2];
    matrix.m[2][1] = m.m[1][2];
    matrix.m[2][2] = m.m[2][2];
    matrix.m[2][3] = 0.0;
    matrix.m[3][0] = -(m.m[3][0] * matrix.m[0][0] + m.m[3][1] * matrix.m[1][0] + m.m[3][2] * matrix.m[2][0]);
    matrix.m[3][1] = -(m.m[3][0] * matrix.m[0][1] + m.m[3][1] * matrix.m[1][1] + m.m[3][2] * matrix.m[2][1]);
    matrix.m[3][2] = -(m.m[3][0] * matrix.m[0][2] + m.m[3][1] * matrix.m[1][2] + m.m[3][2] * matrix.m[2][2]);
    matrix.m[3][3] = 1.0;
    return matrix;
  }

  // Vector operations to support Matrix_PointAt
  vector_Sub(v1, v2) {
      return { x: v1.x - v2.x, y: v1.y - v2.y, z: v1.z - v2.z };
  }

  vector_Mul(v1, k) {
    return { x: v1.x * k, y: v1.y * k, z: v1.z * k };
  }

  vector_Normalise(v) {
      const length = Math.sqrt(v.x * v.x + v.y * v.y + v.z * v.z);
      return { x: v.x / length, y: v.y / length, z: v.z / length };
  }

  vector_Div(v1, k) {
    return { x: v1.x / k, y: v1.y / k, z: v1.z / k };
  }

  vector_DotProduct(v1, v2) {
      return v1.x * v2.x + v1.y * v2.y + v1.z * v2.z;
  }

  vector_CrossProduct(v1, v2) {
      return {
          x: v1.y * v2.z - v1.z * v2.y,
          y: v1.z * v2.x - v1.x * v2.z,
          z: v1.x * v2.y - v1.y * v2.x,
      };
  }

  vector_Add(v1, v2) {
      return new Vec3D(v1.x + v2.x, v1.y + v2.y, v1.z + v2.z);
  }

  // Vektorok kivonása
  subtract(v1, v2) {
      return new Vec3D(v1.x - v2.x, v1.y - v2.y, v1.z - v2.z);
  }

  // Vektor szorzása egy egységgel
  multiply(v, scalar) {
      return new Vec3D(v.x * scalar, v.y * scalar, v.z * scalar);
  }

  // Vektor osztása egy egységgel
  divide(v, scalar) {
      return new Vec3D(v.x / scalar, v.y / scalar, v.z / scalar);
  }

  dotProduct(v1, v2) {
      return v1.x * v2.x + v1.y * v2.y + v1.z * v2.z;
  }

  // Vektor hossza
  length(v) {
      return Math.sqrt(VecOperations.dotProduct(v, v));
  }

  // Vektor normalizálása
  normalize(v) {
      const len = VecOperations.length(v);
      return new Vec3D(v.x / len, v.y / len, v.z / len);
  }

  // Két vektor kereszt szorzata
  crossProduct(v1, v2) {
      return new Vec3D(
          v1.y * v2.z - v1.z * v2.y,
          v1.z * v2.x - v1.x * v2.z,
          v1.x * v2.y - v1.y * v2.x
      );
  }

  vector_IntersectPlane(plane_p, plane_n, lineStart, lineEnd, t) {
    plane_n = this.vector_Normalise(plane_n)
    let plane_d = -this.vector_DotProduct(plane_n, plane_p)
    let ad = this.vector_DotProduct(lineStart, plane_n)
    let bd = this.vector_DotProduct(lineEnd, plane_n)
    t = (-plane_d - ad) / (bd - ad)
    let lineStartToEnd = this.vector_Sub(lineEnd, lineStart)
    let lineToIntersect = this.vector_Mul(lineStartToEnd, t)

    let value = [t, this.vector_Add(lineStart, lineToIntersect)];
    return value;
  }

  triangle_ClipAgainstPlane(plane_p, plane_n, in_tri) {
    let out_tri1 = new Triangle();
    let out_tri2 = new Triangle();
  
    plane_n = this.vector_Normalise(plane_n);
  
    const dist = (p) => {
      return plane_n.x * p.x + plane_n.y * p.y + plane_n.z * p.z - this.vector_DotProduct(plane_n, plane_p);
    };
  
    let inside_points = [], outside_points = [];
    let inside_tex = [], outside_tex = [];
  
    let d0 = dist(in_tri.p[0]);
    let d1 = dist(in_tri.p[1]);
    let d2 = dist(in_tri.p[2]);
  
    if (d0 >= 0) { inside_points.push(in_tri.p[0]); inside_tex.push(in_tri.t[0]); }
    else { outside_points.push(in_tri.p[0]); outside_tex.push(in_tri.t[0]); }
  
    if (d1 >= 0) { inside_points.push(in_tri.p[1]); inside_tex.push(in_tri.t[1]); }
    else { outside_points.push(in_tri.p[1]); outside_tex.push(in_tri.t[1]); }
  
    if (d2 >= 0) { inside_points.push(in_tri.p[2]); inside_tex.push(in_tri.t[2]); }
    else { outside_points.push(in_tri.p[2]); outside_tex.push(in_tri.t[2]); }
  
    if (inside_points.length == 0) {
      return 0;
    }
  
    if (inside_points.length == 3) {
      this.clipped[0] = in_tri;
      return 1;
    }
  
    if (inside_points.length == 1 && outside_points.length == 2) {
      out_tri1.p[0] = inside_points[0];
      out_tri1.t[0] = new Vec2D(inside_tex[0].u, inside_tex[0].v, inside_tex[0].w);
  
      let inter1 = this.vector_IntersectPlane(plane_p, plane_n, inside_points[0], outside_points[0]);
      let t1 = inter1[0];
      out_tri1.p[1] = inter1[1];
      out_tri1.t[1] = new Vec2D(
        t1 * (outside_tex[0].u - inside_tex[0].u) + inside_tex[0].u,
        t1 * (outside_tex[0].v - inside_tex[0].v) + inside_tex[0].v,
        t1 * (outside_tex[0].w - inside_tex[0].w) + inside_tex[0].w
      );
  
      let inter2 = this.vector_IntersectPlane(plane_p, plane_n, inside_points[0], outside_points[1]);
      let t2 = inter2[0];
      out_tri1.p[2] = inter2[1];
      out_tri1.t[2] = new Vec2D(
        t2 * (outside_tex[1].u - inside_tex[0].u) + inside_tex[0].u,
        t2 * (outside_tex[1].v - inside_tex[0].v) + inside_tex[0].v,
        t2 * (outside_tex[1].w - inside_tex[0].w) + inside_tex[0].w
      );
  
      out_tri1.texture = in_tri.texture;
      out_tri1.light = in_tri.light;
      out_tri1.rgba = [255, 0, 0, 1];
  
      this.clipped[0] = out_tri1;
      return 1;
    }
  
    if (inside_points.length == 2 && outside_points.length == 1) {
      out_tri1.p[0] = inside_points[0];
      out_tri1.p[1] = inside_points[1];
      out_tri1.t[0] = new Vec2D(inside_tex[0].u, inside_tex[0].v, inside_tex[0].w);
      out_tri1.t[1] = new Vec2D(inside_tex[1].u, inside_tex[1].v, inside_tex[1].w);
  
      let inter1 = this.vector_IntersectPlane(plane_p, plane_n, inside_points[0], outside_points[0]);
      let t1 = inter1[0];
      out_tri1.p[2] = inter1[1];
      out_tri1.t[2] = new Vec2D(
        t1 * (outside_tex[0].u - inside_tex[0].u) + inside_tex[0].u,
        t1 * (outside_tex[0].v - inside_tex[0].v) + inside_tex[0].v,
        t1 * (outside_tex[0].w - inside_tex[0].w) + inside_tex[0].w
      );
  
      out_tri2.p[0] = inside_points[1];
      out_tri2.t[0] = new Vec2D(inside_tex[1].u, inside_tex[1].v, inside_tex[1].w);
      out_tri2.p[1] = out_tri1.p[2];
      out_tri2.t[1] = new Vec2D(out_tri1.t[2].u, out_tri1.t[2].v, out_tri1.t[2].w);
  
      let inter2 = this.vector_IntersectPlane(plane_p, plane_n, inside_points[1], outside_points[0]);
      let t2 = inter2[0];
      out_tri2.p[2] = inter2[1];
      out_tri2.t[2] = new Vec2D(
        t2 * (outside_tex[0].u - inside_tex[1].u) + inside_tex[1].u,
        t2 * (outside_tex[0].v - inside_tex[1].v) + inside_tex[1].v,
        t2 * (outside_tex[0].w - inside_tex[1].w) + inside_tex[1].w
      );
  
      out_tri1.texture = in_tri.texture;
      out_tri1.light = in_tri.light;
      out_tri1.rgba = [0, 255, 0, 1];
  
      out_tri2.texture = in_tri.texture;
      out_tri2.light = in_tri.light;
      out_tri2.rgba = [0, 0, 255, 1];
  
      this.clipped[0] = out_tri1;
      this.clipped[1] = out_tri2;
      return 2;
    }
  }
  
  
  
  moveObject(id, deltaX, deltaY, deltaZ) {
    // Hozz létre egy transzlációs mátrixot
    const matTranslate = this.matrix_MakeTranslation(deltaX, deltaY, deltaZ);

    if (this.map.data[id]) {
      // Válaszd ki az elmozdítani kívánt objektumot (például az elsőt)
      let useObject = this.map.data[id];
    
      // Minden háromszög csúcspontján alkalmazzuk a transzlációs mátrixot
      useObject.tris.forEach(triangle => {
          triangle.p[0] = this.matrix_MultiplyVector(matTranslate, triangle.p[0]);
          triangle.p[1] = this.matrix_MultiplyVector(matTranslate, triangle.p[1]);
          triangle.p[2] = this.matrix_MultiplyVector(matTranslate, triangle.p[2]);
      });
  
      this.map.data[id] = useObject
    }
  }

  movePlayerInMatrix(deltaTime = 0) {
    this.fTheta += deltaTime

    // World Matrix
    const matRotZ = this.matrix_MakeRotationZ(this.fTheta * 0.5)
    const matRotX = this.matrix_MakeRotationX(this.fTheta)
    let matTrans = this.matrix_MakeTranslation(0, 0, 5)
    this.matWorld = this.matrix_MakeIdentity()
    this.matWorld = this.matrix_MultiplyMatrix(matRotZ, matRotX)
    this.matWorld = this.matrix_MultiplyMatrix(this.matWorld, matTrans)

    //--MOVE CAMERA--
    const vUp = new Vec3D(0, 1, 0)
    const vForward = new Vec3D(0, 0, -1)

    // Apply X-axis (pitch) rotation
    let matCameraRotX = this.matrix_MakeRotationX(this.fXaw)                  // Up/down rotation
    let vLookDirX = this.matrix_MultiplyVector(matCameraRotX, vForward)

    // Apply Y-axis (yaw) rotation
    let matCameraRotY = this.matrix_MakeRotationY(this.fYaw)                  // Left/right rotation
    this.vLookDir = this.matrix_MultiplyVector(matCameraRotY, vLookDirX)

    const vRight = this.vector_CrossProduct(vUp, this.vLookDir)               // Right direction vector
    if (this.keys['KeyD'] && this.keys['ShiftLeft']) this.vCamera = this.vector_Sub(this.vCamera, this.vector_Mul(vRight, this.options.moveScale));
    if (this.keys['KeyA'] && this.keys['ShiftLeft']) this.vCamera = this.vector_Add(this.vCamera, this.vector_Mul(vRight, this.options.moveScale));

    const vTarget = this.vector_Add(this.vCamera, this.vLookDir)
    const matCamera = this.matrix_PointAt(this.vCamera, vTarget, vUp)

    // View Matrix
    this.matView = this.matrix_QuickInverse(matCamera)
  }

  isVisibleInTree(structure, id) {
    const current = this.findMeshById(structure, id);
    if (!current) return false;
    if (!current.visible) return false;
  
    const parent = this.findMeshParent(structure, id);
    if (!parent) return true;
  
    return this.isVisibleInTree(structure, parent.id);
  }

  async renderScreen() {   
    if (this.map.data && Object.keys(this.map.data).length > 0) {
      for (let mesh of this.map.data) {
        if (this.isVisibleInTree(this.map.structure, mesh.id)) {
          this.drawObject(mesh);
        }
      }
    }
  }

  ///////////////
  // DRAW OBJECTS
  drawObject(object) {
    let selectedTriangles = []

    // CALCULATE AND SELECT TRIANGLES
    for (const tri of object.tris) {

      let triTransformed = new Triangle()
      triTransformed.p[0] = this.matrix_MultiplyVector(this.matWorld, tri.p[0])
			triTransformed.p[1] = this.matrix_MultiplyVector(this.matWorld, tri.p[1])
			triTransformed.p[2] = this.matrix_MultiplyVector(this.matWorld, tri.p[2])
      triTransformed.t[0] = tri.t[0]
      triTransformed.t[1] = tri.t[1]
      triTransformed.t[2] = tri.t[2]
      triTransformed.texture = tri.texture
      triTransformed.light = tri.light
      triTransformed.rgba = tri.rgba
      triTransformed.normal = tri.normal

      // Get lines either side of triangle
			let line1 = this.vector_Sub(triTransformed.p[1], triTransformed.p[0])
			let line2 = this.vector_Sub(triTransformed.p[2], triTransformed.p[0])

			// Take cross product of lines to get normal to triangle surface
			let normal = this.vector_CrossProduct(line1, line2)
			// You normally need to normalise a normal!
			normal = this.vector_Normalise(normal)

      let vCameraRay = this.vector_Sub(triTransformed.p[0], this.vCamera)

      // CHECK NORMALS // if (normal.z < 0) // If ray is aligned with normal, then triangle is visible
      if ((triTransformed.normal != 'true') || (this.vector_DotProduct(normal, vCameraRay) < 0)) {
      
      // if (this.vector_DotProduct(normal, vCameraRay)) {

        // Illumination
        this.lightDirection = this.vector_Normalise(this.lightDirection)

        // How similar is normal to light direction
        let maplight = this.vector_DotProduct(this.lightDirection, normal)  // !!!

        let triViewed = new Triangle()
        triViewed.p[0] = this.matrix_MultiplyVector(this.matView, triTransformed.p[0])
				triViewed.p[1] = this.matrix_MultiplyVector(this.matView, triTransformed.p[1])
				triViewed.p[2] = this.matrix_MultiplyVector(this.matView, triTransformed.p[2])
        /*
        triViewed.t[0] = triTransformed.t[0]
        triViewed.t[1] = triTransformed.t[1]
        triViewed.t[2] = triTransformed.t[2]
        */
        for (let i = 0; i < 3; i++) {
          const p = this.matrix_MultiplyVector(this.matView, triTransformed.p[i]);
          triViewed.p[i] = p;
          triViewed.t[i] = new Vec2D(
            triTransformed.t[i].u / p.w,
            triTransformed.t[i].v / p.w,
            1.0 / p.w
          );
        }

        triViewed.texture = triTransformed.texture
        triViewed.light = (maplight > tri.light) ? maplight : tri.light;
        //triViewed.light = maplight + tri.light
        
        triViewed.light = parseInt(tri.light)

        triViewed.rgba = tri.rgba

        let minDistance = 0.01
        let nClippedTriangles = 0
        nClippedTriangles = this.triangle_ClipAgainstPlane({ x: 0, y: 0, z: minDistance }, { x: 0, y: 0, z: 1 }, triViewed)        

        this.viewScale = 1.0 //

        for (let n=0; n<nClippedTriangles; n++) {
          // Project triangles from 3D --> 2D
          let triProjected = new Triangle(this.matrix_MultiplyVector(this.matProj, this.clipped[n].p[0]), this.matrix_MultiplyVector(this.matProj, this.clipped[n].p[1]), this.matrix_MultiplyVector(this.matProj, this.clipped[n].p[2]), this.clipped[n].t[0], this.clipped[n].t[1], this.clipped[n].t[2], triTransformed.texture, this.clipped[n].light, this.clipped[n].rgba)

          let t0 = { ...triProjected.t[0]}; let t1 = { ...triProjected.t[1]}; let t2 = { ...triProjected.t[2]};
          let p0 = { ...triProjected.p[0]}; let p1 = { ...triProjected.p[1]}; let p2 = { ...triProjected.p[2]};
          let tLight = { ...triProjected.light}; let tRgba = { ...triProjected.rgba};          

          t0.u = t0.u / triProjected.p[0].w; t1.u = t1.u / triProjected.p[1].w; t2.u = t2.u / triProjected.p[2].w;
          t0.v = t0.v / triProjected.p[0].w; t1.v = t1.v / triProjected.p[1].w; t2.v = t2.v / triProjected.p[2].w;
          t0.w = 1 / triProjected.p[0].w; t1.w = 1 / triProjected.p[1].w; t2.w = 1 / triProjected.p[2].w;

          p0 = this.vector_Div(p0, p0.w); p1 = this.vector_Div(p1, p1.w); p2 = this.vector_Div(p2, p2.w);
          triProjected.t = [t0, t1, t2]; triProjected.p = [p0, p1, p2];
          triProjected.texture = triProjected.texture; triProjected.light = tLight; triProjected.rgba = tRgba;

          // SCALE START
          triProjected.p.forEach(p => { p.x *= -1; p.y *= -1; });
          const vOffsetView = new Vec3D(1, 1, 0)
          triProjected.p = triProjected.p.map(p => this.vector_Add(p, vOffsetView));


          //triProjected.p.forEach(p => { p.x *= 0.5 * this.GAMEWIDTH; p.y *= 0.5 * this.GAMEHEIGHT; });
          triProjected.p.forEach(p => { 
            p.x *= 0.5 * this.GAMEWIDTH * this.viewScale; 
            p.y *= 0.5 * this.GAMEHEIGHT * this.viewScale; 
          });

          let addTriangle = new Triangle(triProjected.p[0], triProjected.p[1], triProjected.p[2],  triProjected.t[0],  triProjected.t[1],  triProjected.t[2], triProjected.texture, triViewed.light, triProjected.rgba)
          selectedTriangles.push(addTriangle)
        }
      }
    }

    // SORTING TRIANGLES
    if (true) {
      selectedTriangles.sort((t1, t2) => {
        const z1 = (t1.p[0].z + t1.p[1].z + t1.p[2].z) / 3.0;
        const z2 = (t2.p[0].z + t2.p[1].z + t2.p[2].z) / 3.0;
        return z2 - z1;
      });
    }

    // CROOP 4 SCREEN EDGES
    let drawTriangles = []
    this.clipped = [null, null]
    let listTriangles = []

    selectedTriangles.forEach(triToRaster => {
        listTriangles = [triToRaster];
        for (let p = 0; p < 4; p++) {
            let newTriangles = [];
            listTriangles.forEach(triangle => {
              let nTrisToAdd = 0
              switch (p) {
                  case 0:
                      nTrisToAdd = this.triangle_ClipAgainstPlane({ x: 0.0, y: 0.0, z: 0.0 }, { x: 0.0, y: 1.0, z: 0.0 }, triangle)
                      break;
                  case 1:
                      nTrisToAdd = this.triangle_ClipAgainstPlane({ x: 0.0, y: this.GAMEHEIGHT - 1, z: 0.0 }, { x: 0.0, y: -1.0, z: 0.0 }, triangle)
                      break;
                  case 2:
                      nTrisToAdd = this.triangle_ClipAgainstPlane({ x: 0.0, y: 0.0, z: 0.0 }, { x: 1.0, y: 0.0, z: 0.0 }, triangle)
                      break;
                  case 3:
                      nTrisToAdd = this.triangle_ClipAgainstPlane({ x: this.GAMEWIDTH - 1, y: 0.0, z: 0.0 }, { x: -1.0, y: 0.0, z: 0.0 }, triangle)
                      break;
              }
              for (let w = 0; w < nTrisToAdd; w++) {
                newTriangles.push(this.clipped[w])
              }
          });
          listTriangles = newTriangles
        }
        drawTriangles.push(...listTriangles)
    });

    // DRAW TRIANGLES
    drawTriangles.forEach(tri => {
      if (this.options3D.textured) this.texturedTriangle(tri.p[0].x, tri.p[0].y, tri.t[0].u, tri.t[0].v, tri.t[0].w, tri.p[1].x, tri.p[1].y, tri.t[1].u, tri.t[1].v, tri.t[1].w, tri.p[2].x, tri.p[2].y, tri.t[2].u, tri.t[2].v, tri.t[2].w, tri.texture, tri.light)
      if (this.options3D.fill) this.drawTriangleFill(tri.p[0], tri.p[1], tri.p[2], tri.light, tri.rgba)
      if (this.options3D.grid) this.drawTriangleStroke(tri.p[0], tri.p[1], tri.p[2], tri.light, tri.rgba)
    });
  }

  texturedTriangle(x1, y1, u1, v1, w1, x2, y2, u2, v2, w2,x3, y3, u3, v3, w3, texture, light) {
    function swap(a, b) { return [b, a]; }

    x1 = Math.floor(x1); x2 = Math.floor(x2); x3 = Math.floor(x3);
    y1 = Math.floor(y1); y2 = Math.floor(y2); y3 = Math.floor(y3);

    if (y2 < y1) { [y1, y2] = swap(y1, y2); [x1, x2] = swap(x1, x2); [u1, u2] = swap(u1, u2); [v1, v2] = swap(v1, v2); [w1, w2] = swap(w1, w2); }
    if (y3 < y1) { [y1, y3] = swap(y1, y3); [x1, x3] = swap(x1, x3); [u1, u3] = swap(u1, u3); [v1, v3] = swap(v1, v3); [w1, w3] = swap(w1, w3); }
    if (y3 < y2) { [y2, y3] = swap(y2, y3); [x2, x3] = swap(x2, x3); [u2, u3] = swap(u2, u3); [v2, v3] = swap(v2, v3); [w2, w3] = swap(w2, w3); }

    let dy1 = y2 - y1, dx1 = x2 - x1, dv1 = v2 - v1, du1 = u2 - u1, dw1 = w2 - w1, dy2 = y3 - y1, dx2 = x3 - x1, dv2 = v3 - v1, du2 = u3 - u1, dw2 = w3 - w1, tex_u, tex_v, tex_w, dax_step = 0, dbx_step = 0, du1_step = 0, dv1_step = 0, dw1_step = 0, du2_step = 0, dv2_step = 0, dw2_step = 0;

    if (dy1) dax_step = dx1 / Math.abs(dy1); if (dy2) dbx_step = dx2 / Math.abs(dy2);
    if (dy1) { du1_step = du1 / Math.abs(dy1); dv1_step = dv1 / Math.abs(dy1); dw1_step = dw1 / Math.abs(dy1); }
    if (dy2) { du2_step = du2 / Math.abs(dy2); dv2_step = dv2 / Math.abs(dy2); dw2_step = dw2 / Math.abs(dy2); }

    if (dy1) {
      for (let i =y1; i<=y2; i++) {
        if (i< 0 || i >= this.GAMEHEIGHT) continue;
        let ax = Math.floor(x1 + (i - y1) * dax_step); let bx = Math.floor(x1 + (i - y1) * dbx_step);
        let tex_su = u1 + (i - y1) * du1_step; let tex_sv = v1 + (i - y1) * dv1_step; let tex_sw = w1 + (i - y1) * dw1_step;
        let tex_eu = u1 + (i - y1) * du2_step; let tex_ev = v1 + (i - y1) * dv2_step; let tex_ew = w1 + (i - y1) * dw2_step;
        if (ax > bx) { [ax, bx] = swap(ax, bx); [tex_su, tex_eu] = swap(tex_su, tex_eu); [tex_sv, tex_ev] = swap(tex_sv, tex_ev); [tex_sw, tex_ew] = swap(tex_sw, tex_ew); }
        tex_u = tex_su; tex_v = tex_sv; tex_w = tex_sw; let tstep = 1.0 / (bx - ax);
        let t = 0.0;
        for (let j = ax; j < bx; j++) {
          if (j< 0 || j >= this.GAMEWIDTH) continue;
          tex_u = (1.0 - t) * tex_su + t * tex_eu; tex_v = (1.0 - t) * tex_sv + t * tex_ev; tex_w = (1.0 - t) * tex_sw + t * tex_ew;
          if (this.depthBuffer[i * this.GAMEWIDTH + j] == 'undefined') this.depthBuffer[i * this.GAMEWIDTH + j] = 0
          if (tex_w > this.depthBuffer[i * this.GAMEWIDTH + j]) {
            this.drawPixel(j, i, tex_u, tex_v, tex_w, texture, light)
          }
          t += tstep;
        }
      }
    }

    dy1 = y3 - y2; dx1 = x3 - x2; dv1 = v3 - v2; du1 = u3 - u2; dw1 = w3 - w2;
    if (dy1) dax_step = dx1 / Math.abs(dy1); if (dy2) dbx_step = dx2 / Math.abs(dy2);

    du1_step = 0; dv1_step = 0; dw1_step = 0;
    if (dy1) {
      du1_step = du1 / Math.abs(dy1); dv1_step = dv1 / Math.abs(dy1); dw1_step = dw1 / Math.abs(dy1);
    }

    if (dy1) {
      for (let i = y2; i <= y3; i++) {
        if (i >= this.GAMEHEIGHT) continue;
        let ax = Math.floor(x2 + (i - y2) * dax_step); let bx = Math.floor(x1 + (i - y1) * dbx_step);
        let tex_su = u2 + (i - y2) * du1_step; let tex_sv = v2 + (i - y2) * dv1_step; let tex_sw = w2 + (i - y2) * dw1_step;
        let tex_eu = u1 + (i - y1) * du2_step; let tex_ev = v1 + (i - y1) * dv2_step; let tex_ew = w1 + (i - y1) * dw2_step;
        if (ax > bx) { [ax, bx] = swap(ax, bx); [tex_su, tex_eu] = swap(tex_su, tex_eu); [tex_sv, tex_ev] = swap(tex_sv, tex_ev); [tex_sw, tex_ew] = swap(tex_sw, tex_ew); }
        tex_u = tex_su; tex_v = tex_sv; tex_w = tex_sw;
        let tstep = 1.0 / (bx - ax);
        let t = 0.0;
        for (let j = ax; j < bx; j++) {
          if (j >= this.GAMEWIDTH) continue;
          tex_u = (1.0 - t) * tex_su + t * tex_eu; tex_v = (1.0 - t) * tex_sv + t * tex_ev; tex_w = (1.0 - t) * tex_sw + t * tex_ew;

          const index = i * this.GAMEWIDTH + j
          this.depthBuffer[index] = this.depthBuffer[index] ?? 0;
          //if (typeof this.depthBuffer[i * this.GAMEWIDTH + j] === 'undefined') this.depthBuffer[i * this.GAMEWIDTH + j] = 0

          if (tex_w > this.depthBuffer[i * this.GAMEWIDTH + j]) {
            this.drawPixel(j, i, tex_u, tex_v, tex_w, texture, light)
            t += tstep;
          }
        }
      }
    }
  }

  drawPixel(x, y, tex_u, tex_v, tex_w, texture = 0, light = 1) {

    x = Math.floor(x)
    y = Math.floor(y)   

    light = light < 0.3 ? 0.3 : light;
    // light = 0.2

    // image index select
    let picIndex = 0
    if (this.options3D.realtime && this.text.animTimer[texture.name]) picIndex = this.text.animTimer[texture.name].counter;
    // image select
    // console.log(texture.name)
    
    let selectedTexture = (texture.name) ? this.text.pic[texture.name][picIndex] : this.text.pic['notexture'][0];

    // texture
    if (selectedTexture?.width) {
      // let sampleU = Math.floor((((tex_u / tex_w) * selectedTexture.width) % selectedTexture.width + selectedTexture.width) % selectedTexture.width)
      // let sampleV = Math.floor((((tex_v / tex_w) * selectedTexture.height) % selectedTexture.height + selectedTexture.height) % selectedTexture.height)

      let u = (tex_u / tex_w) % 1
      if (u < 0) u += 1
      
      let v = (tex_v / tex_w) % 1
      if (v < 0) v += 1
      
      // apply half texel shift once
      let sampleU = Math.floor(u * selectedTexture.width - 0.5)
      let sampleV = Math.floor(v * selectedTexture.height - 0.5)
      
      // clamp (biztonság)
      sampleU = Math.max(0, Math.min(sampleU, selectedTexture.width - 1))
      sampleV = Math.max(0, Math.min(sampleV, selectedTexture.height - 1))
      
  
      let packedColor = selectedTexture.pixels[sampleV * selectedTexture.width + sampleU];
      let a = (packedColor >> 24) & 0xFF;
      let b = (packedColor >> 16) & 0xFF;
      let g = (packedColor >> 8) & 0xFF;
      let r = packedColor & 0xFF;
  
      if (packedColor != '0x00000000') {
        let mR = Math.min(255, Math.round(r * light))
        let mG = Math.min(255, Math.round(g * light))
        let mB = Math.min(255, Math.round(b * light))
    
        let hexColor = (a << 24) | (mB << 16) | (mG << 8) | mR;
    
        let memoryIndex = y * this.GAMEWIDTH + x;
        this.buffer[memoryIndex] = hexColor;
        this.depthBuffer[memoryIndex] = tex_w
      }
    }
  }

  drawTriangleFill(p1, p2, p3, light, rgba) {
    light = (light < 0.3) ? 0.3 : light;

    if (rgba && Array.isArray(rgba)) {
       this.screenCtx.fillStyle = `rgba(${rgba[0]*light}, ${rgba[1]*light}, ${rgba[2]*light}, ${rgba[3]})`
    } else {
      this.screenCtx.fillStyle = 'yellow'
    }

    this.screenCtx.beginPath()
    this.screenCtx.moveTo(p1.x*this.RATIO, p1.y*this.RATIO)
    this.screenCtx.lineTo(p2.x*this.RATIO, p2.y*this.RATIO)
    this.screenCtx.lineTo(p3.x*this.RATIO, p3.y*this.RATIO)
    this.screenCtx.closePath()
    this.screenCtx.fill()
  }

  drawTriangleStroke(p1, p2, p3, light, rgba) {
    light = (light < 0.4) ? 0.4 : light;

    if (rgba && Array.isArray(rgba)) {
      let invertedR = 255 - rgba[0]
      let invertedG = 255 - rgba[1]
      let invertedB = 255 - rgba[2]
      this.screenCtx.strokeStyle = `rgba(${invertedR}, ${invertedG}, ${invertedB}, ${rgba[3]})`
    } else {
      this.screenCtx.strokeStyle = 'yellow'
    }

    this.screenCtx.beginPath()
    this.screenCtx.moveTo(p1.x*this.RATIO, p1.y*this.RATIO)
    this.screenCtx.lineTo(p2.x*this.RATIO, p2.y*this.RATIO)
    this.screenCtx.lineTo(p3.x*this.RATIO, p3.y*this.RATIO)
    this.screenCtx.closePath()
    this.screenCtx.lineWidth = 1
    this.screenCtx.stroke()
  }

  // OWN FUNCTIONS
  distance(x1, y1, x2, y2) {
    return Math.sqrt( (x2-x1)*(x2-x1) + (y2-y1)*(y2-y1) );
  }

  clearScreen(canvas, ctx) {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
  }

  infoTable() {
    this.memoryCtx.fillStyle = 'rgb(0, 0, 0)'
    this.memoryCtx.font = '12px Arial'
    this.memoryCtx.textAlign = 'left'

    this.memoryCtx.fillText(`fYaw: ${this.fYaw.toFixed(2)} rad`, 4, 12)
    this.memoryCtx.fillText(`fXaw: ${this.fXaw.toFixed(2)} rad`, 4, 24)
    this.memoryCtx.fillText(`X: ${this.vCamera.x.toFixed(2)}`, 4, 36)
    this.memoryCtx.fillText(`Y: ${this.vCamera.y.toFixed(2)}`, 4, 48)
    this.memoryCtx.fillText(`Z: ${this.vCamera.z.toFixed(2)}`, 4, 60)
  }
}
