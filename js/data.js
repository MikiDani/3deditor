export class Picture {
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

export class Textures {
    constructor() {
        this.directory = []
        this.pic = []
        this.animTimer = {}
    }

    async multiTextureLoad(textData) {

        this.removeAllAnimTextureTimer()

        let noTexture = { 'notexture': { 'notexture': '.\\data\\notexture' } };
        textData = {
            ...noTexture,
            ...textData
        };
        
        for(const[key, value] of Object.entries(textData)) {
            // console.log(key, value)
            this.pic[key] = []
            let count = 0
            for(const[key2, value2] of Object.entries(value)) {
                // console.log(key2, value2)
                let link = `${value2}.png`
                const picture = new Picture(link);
                await picture.load()

                this.pic[key][count] = picture
                count++
            }
        }

        // console.log(this.pic)

        // OPTIONS ANIM TEXTURES
        for(const[name, value] of Object.entries(this.pic)) {
            // console.log(value.length)
            if (value.length > 1) {
                this.addAnimTextureTimer(name, value, true)
            }
        }
    }

    addAnimTextureTimer(name, value, listmode = false) {        
        let frames = value.length;
        let link = value[0].link.replace('0_', '$_')

        this.animTimer[name] = {
            counter: 0,
            interval: null,
            listmode: listmode,
            link: link,
        };

        this.animTimer[name].interval = setInterval(() => {            
            this.animTimer[name].counter++;
            if (this.animTimer[name].counter >= frames) this.animTimer[name].counter = 0;
            // EDITOR MODE ANIM PICTURES IN LIST
            if (this.animTimer[name].listmode) {
                if ($(`img[data-texture-name='${name}']`).length > 0) {
                    let link = this.animTimer[name].link.replace('$', this.animTimer[name].counter)
                    $(`img[data-texture-name='${name}']`).attr('src', link)
                }
            }
            // console.log(`${name} frame: ${this.animTimer[name].counter} (Interval ID: ${this.animTimer[name].interval})`);
        }, 300);
    }

    removeAnimateTimer(name) {
        if (this.animTimer[name]) {
            clearInterval(this.animTimer[name].interval);
            delete this.animTimer[name];
            console.log(`AnimTimer '${name}' törölve.`);
        } else {
            console.warn(`AnimTimer '${name}' nem létezik.`);
        }
    }

    removeAllAnimTextureTimer() {
        for (let name in this.animTimer) {
            clearInterval(this.animTimer[name].interval)
            // console.log(`AnimTimer '${name}' törölve.`)
        }
        this.animTimer = {}
        // console.log('Minden animTimer törölve.'); console.log(this.animTimer)
        // for (let i = 1; i < 1000; i++) { clearInterval(i); }  // FORCE
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
    constructor(p1 = new Vec3D(), p2 = new Vec3D(), p3 = new Vec3D(), t1 = new Vec2D, t2 = new Vec2D(), t3 = new Vec2D(), textureObj = { name: 'notexture', animate: false, animframe: null, animspeed: 100 }, light = 1, rgba = [255, 200, 40, 1], normal = 'false', name = null) {
        this.id = Date.now().toString().slice(-5) + '-' + Math.floor(Math.random() * 99999)
        this.texture = textureObj
        this.p = [p1, p2, p3]
        this.t = [t1, t2, t3]
        this.light = light
        this.rgba = [rgba[0], rgba[1], rgba[2], rgba[3]]
        this.normal = normal
        this.name = name ?? `Tri-${this.id}`
    }
}

export class Mesh {
    static instanceCount = 1;
    constructor(name = 'noname', parent_id = null, type = null) {
        this.name = name
        Mesh.instanceCount++
        this.id = Mesh.instanceCount
        this.parent_id = parent_id
        this.type = type
        this.tris = []
        this.lineColor = 'yellow'
        this.actions = []

        // console.log('staticMash count: ', Mesh.instanceCount)   
    }

    static setInstanceCount(value) {
        Mesh.instanceCount = value;
    }

    static getInstanceCount() {
        return Mesh.instanceCount;
    }
}

export class Matrix4x4 {
    constructor() {
        this.m = Array(4).fill(0).map(() => Array(4).fill(0));
    }
}

export class Light {
    static instanceCount = 1;
    constructor(name = 'noname', x, y, z, type = 'point', color = '0xffddaa', intensity = 0.5, distance = 5) {
        // type = THREE.AmbientLight, THREE.PointLight, THREE.DirectionalLight
        Light.instanceCount++
        this.id = Light.instanceCount
        this.name = name + '-' + Light.instanceCount
        this.p = new Vec3D(x, y, z)
        this.type = type
        this.color = color
        this.intensity = intensity
        this.distance = distance
        this.editcolor = 'red'
        this.visible = true
    }

    static setInstanceCount(value) {
        Light.instanceCount = value;
    }

    static getInstanceCount() {
        return Light.instanceCount;
    }
}

