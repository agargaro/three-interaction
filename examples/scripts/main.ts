// import { BoxGeometry, Color, DirectionalLight, DynamicDrawUsage, Mesh, MeshPhongMaterial, Scene, SphereGeometry, Vector3 } from "three";
// import Stats from "three/examples/jsm/libs/stats.module";
// import { WebGLRenderer, InstancedMesh, InstancedMeshSingle, LoadingMaterial, PerspectiveCamera } from "../../src/index";

// class Spheres extends InstancedMesh {
//     public activatedSpheres = 0;

//     constructor() {
//         super(new SphereGeometry(0.1, 10, 10), new MeshPhongMaterial(), 5000, Sphere, new Color(0xffffff));
//         this.instanceMatrix.setUsage(DynamicDrawUsage);

//         this.on("animate", () => {
//             (this as any).computeBoundingSphere(); //TODO fix ref 
//         });
//     }
// }

// class Sphere extends InstancedMeshSingle {
//     public override parent: Spheres;
//     public actived = false;

//     constructor(parent: InstancedMesh, index: number, color?: Color) {
//         super(parent, index, color);
//         const angleX = Math.random() * Math.PI * 2;
//         const angleY = Math.random() * Math.PI * 2;

//         this.on("animate", (e) => {
//             this.position.setFromSphericalCoords(5, angleX * e.total / 10, angleY * e.total / 10);
//             this.updateMatrix();
//         });

//         this.on("pointerintersection", (e) => {
//             if (!this.actived) {
//                 this.setColor(new Color().setHex(0xff0000));
//                 this.actived = true;
//                 this.parent.dispatchEvent({ type: "updated", percentage: ++this.parent.activatedSpheres / this.parent.count });
//             }
//         });
//     }
// }

// class LoadingBar extends Mesh {
//     public override interceptByRaycaster = false;
//     public override material: LoadingMaterial;

//     constructor() {
//         super(new BoxGeometry(0.2, 10, 1), new LoadingMaterial(10, 0xff0000, 0x00ff00));
//         this.position.setX(-10);

//         this.on("animate", () => {
//             this.material.uniforms.time.value = performance.now() / 1000;
//         });
//     }
// }

// class CustomScene extends Scene {
//     public camera = new PerspectiveCamera(70, 1, 10000).translateZ(10);
//     public loadingBar = new LoadingBar();
//     public spheres = new Spheres();

//     constructor() {
//         super();

//         this.add(this.camera, this.loadingBar, this.spheres, new DirectionalLight(0xffffff, 0.9).translateZ(10)); //import adding camera to scene to trigger renderresize event

//         this.spheres.addEventListener("updated", (e) => {
//             this.loadingBar.material.setPercentage(e.percentage);
//         });
//     }
// }

// class Main {
//     public scene = new CustomScene();
//     public renderer = new WebGLRenderer([this.scene], this.animate.bind(this), true, { antialias: true });
//     public stats = (Stats as any)();

//     constructor() {
//         document.body.appendChild(this.stats.dom);
//     }

//     public animate() {
//         this.renderer.render(this.scene, this.scene.camera);
//         this.stats.update();
//     }
// }

// (window as any).main = new Main();

// class Impact extends Mesh {

//     constructor(position, faceNormal, color) {
//         super(impactGeometry, new MeshBasicMaterial({ color, transparent: true, opacity: 0.7, side: DoubleSide }));

//         this.position.copy(position).sub(faceNormal.clone().setLength(sphereRadius));
//         this.lookAt(this.position.clone().add(faceNormal));
//         this.bindProperty("visible", () => showImpact);

//         this.on("animate", (e) => {
//             this.material.opacity -= e.delta * timeSpeed / 4;
//             this.scale.setScalar(this.material.opacity)
//             if (this.material.opacity <= 0) {
//                 this.material.dispose();
//                 this.removeFromParent();
//             }
//         });
//     }
// }