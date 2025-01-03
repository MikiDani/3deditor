export class Texture {
    constructor(link) {
        this.link = link
    }

    async load() {
        const image = new Image()
        image.src = this.link

        await new Promise((resolve, reject) => {
            image.onload = resolve
            image.onerror = reject
        });

        const canvas = document.createElement("canvas");
        canvas.width = image.width
        canvas.height = image.height

        const ctx = canvas.getContext("2d")
        ctx.drawImage(image, 0, 0)

        const imageData = ctx.getImageData(0, 0, image.width, image.height).data

        this.width = image.width
        this.height = image.height

        this.pixels = new Uint32Array(image.width * image.height)
        for (let i = 0; i < imageData.length; i += 4) {
            const r = imageData[i]
            const g = imageData[i + 1]
            const b = imageData[i + 2]
            const a = imageData[i + 3]
            this.pixels[i / 4] = (a << 24) | (b << 16) | (g << 8) | r;
        }
    }
}

export class Vec3D {
    constructor(x = 0, y = 0, z = 0, w = 1) {
        this.x = x
        this.y = y
        this.z = z
        this.w = w
    }
}

export class Vec2D {
    constructor(u = 0, v = 0, w = 1) {
        this.u = u
        this.v = v
        this.w = w
    }
}

export class Triangle {
    constructor(p1 = new Vec3D(), p2 = new Vec3D(), p3 = new Vec3D(), t1 = new Vec2D, t2 = new Vec2D(), t3 = new Vec2D(), tid, light = 1, rgba = [255, 200, 40, 1]) {
        this.tid = tid
        this.p = [p1, p2, p3]
        this.t = [t1, t2, t3]
        this.light = light
        this.rgba = [rgba[0], rgba[1], rgba[2], rgba[3]]
    }
}

export class Mesh {
    constructor() {
        this.tris = []; // Háromszögek listája (Triangle típusú elemek)
        this.lineColor = 'yellow'
    }

    // Objektum fájl betöltése
    async loadFromObjectFile(filename, name, lineColor, hasTexture = false) {
        const response = await fetch(filename)
        if (!response.ok) return false;

        const text = await response.text()
        const lines = text.split('\n')
        const verts = []
        const texs = []

        this.name = name
        this.lineColor = lineColor

        for (let line of lines) {
            const parts = line.trim().split(' ')

            if (parts[0] === 'v') { // Ha vertex (v) sor
                if (parts[1] === 't') { // Ha textúra koordináta (vt)
                    const v = new Vec2D(parseFloat(parts[2]), parseFloat(parts[3]))
                    texs.push(v) // Textúra koordináták hozzáadása
                } else { // Ha 3D pont (v)
                    const v = new Vec3D(parseFloat(parts[1]), parseFloat(parts[2]), parseFloat(parts[3]))
                    verts.push(v) // Pont hozzáadása
                }
            }

            if (!hasTexture) { // Ha nincs textúra
                if (parts[0] === 'f') { // Face definíció
                    const indices = parts.slice(1).map(str => parseInt(str.split('/')[0]) - 1)
                    let randId = Math.floor(Math.random()* 6)

                    this.tris.push(new Triangle(verts[indices[0]], verts[indices[1]], verts[indices[2]], new Vec2D(0, 10, 10), new Vec2D(0, 0, 10), new Vec2D(10, 0, 10), randId, 1, [255, 200, 40, 1]))
                }
            } else { // Ha van textúra
                if (parts[0] === 'f') {
                    const tokens = parts.slice(1).flatMap(str => str.split('/').map(v => parseInt(v) - 1));
                    this.tris.push(new Triangle(
                        [verts[tokens[0]], verts[tokens[2]], verts[tokens[4]]], [texs[tokens[1]], texs[tokens[3]], texs[tokens[5]]]
                    ));
                }
            }
        }
        return true;
    }

    async loadFromOwnObjectFile(filename, name, lineColor) {
        const response = await fetch(filename); // Fájl betöltése
        if (!response.ok) return false;         // Ha sikertelen, visszatérés false értékkel

        this.name = name
        this.lineColor = lineColor

        const text = await response.text();     // Fájl tartalmának olvasása szövegként        
        const lines = text.split('\n');         // Sorokra bontás
        let v = [];                             // Lokális pontok listája
        let vt = [];                            // Texture kordináták
        let texId = [];                         // Texture ID
        let light = [];                         // Light
        let rgba = [];                          // color

        for (let line of lines) {
            if (line.startsWith('#') || line == '') continue;
            const parts = line.trim().split(' ')

            if (parts[0] == 'v') {
                let data = parts[1].trim().split(',');
                v[0] = new Vec3D(parseInt(data[0]), parseInt(data[1]), parseInt(data[2]), parseInt(data[3]))
                v[1] = new Vec3D(parseInt(data[4]), parseInt(data[5]), parseInt(data[6]), parseInt(data[7]))
                v[2] = new Vec3D(parseInt(data[8]), parseInt(data[9]), parseInt(data[10]), parseInt(data[11]))
                // console.log(v[0], v[1], v[2])
            }

            if (parts[0] == 'vt') {
                let data = parts[1].trim().split(',');
                vt[0] = new Vec2D(parseInt(data[0]), parseInt(data[1]), parseInt(data[2]))
                vt[1] = new Vec2D(parseInt(data[3]), parseInt(data[4]), parseInt(data[5]))
                vt[2] = new Vec2D(parseInt(data[6]), parseInt(data[7]), parseInt(data[8]))
                // console.log(vt[0], vt[1], vt[2])
            }

            if (parts[0] == 'i') {
                let data = parts[1].trim().split(',')

                texId = parseInt(data[0])
                light = parseInt(data[1])
                rgba = [parseInt(data[2]), parseInt(data[3]), parseInt(data[4]), parseInt(data[5])]

                const row = new Triangle(v[0], v[1], v[2], vt[0], vt[1], vt[2], texId, light, rgba)

                this.tris.push(row)
            }
        }
        return true;
    }
}

export class Matrix4x4 {
    constructor() {
        this.m = Array(4).fill(0).map(() => Array(4).fill(0));
    }
}
