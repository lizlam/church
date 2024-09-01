import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const canvas = document.querySelector('canvas.webgl');
console.log(canvas);

const sizes = { width: 800, height: 600 };

const scene = new THREE.Scene();

// Textures
const texture = new THREE.TextureLoader().load('brick.jpg');
const brickMaterial = new THREE.MeshBasicMaterial({ map: texture });

const planeGeometry = new THREE.PlaneGeometry(10, 10);
const material = new THREE.MeshBasicMaterial({
  color: "green",
  side: THREE.DoubleSide
});

const plane = new THREE.Mesh(planeGeometry, material);
plane.rotation.x =  Math.PI * 0.5;
scene.add(plane);


const church = new THREE.Group();
scene.add(church)

const walls = new THREE.Mesh(
  new THREE.BoxGeometry(2, 2, 2),
  new THREE.MeshStandardMaterial({ color: 'white' }),
);
walls.position.y = 1;
church.add(walls);

const roof = new THREE.Mesh(
  new THREE.ConeGeometry(1.5, 3, 4),
  new THREE.MeshStandardMaterial({ color: 'white' }),
);
roof.position.y = 3.4;
roof.rotation.y = Math.PI / 4;
church.add(roof);

const crossVert = new THREE.Mesh(
  new THREE.BoxGeometry(.2, 2, .2),
  new THREE.MeshStandardMaterial({ color: 'white' }),
);
crossVert.position.y = 4;
crossVert.position.z = .5;
church.add(crossVert);

const crossHorizontal = new THREE.Mesh(
  new THREE.BoxGeometry(1, .2, .2),
  new THREE.MeshStandardMaterial({ color: 'white' }),
);
crossHorizontal.position.y = 4.6;
crossHorizontal.position.z = .5;
church.add(crossHorizontal);

const door = new THREE.Mesh(
  new THREE.BoxGeometry(.5, 1, .01),
  new THREE.MeshStandardMaterial({ color: 'red' }),
);
door.position.y = .5;
door.position.z = 1;
church.add(door);

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 10;
camera.position.y = 1;
scene.add(camera);

const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.z = 9;
scene.add(light);

const renderer = new THREE.WebGLRenderer({ 
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

const controls = new OrbitControls(camera, renderer.domElement);

function animate() {
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

animate();
