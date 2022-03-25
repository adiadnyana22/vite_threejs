import './style.css'

import * as THREE from 'three'

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerHeight/window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg")

})

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

renderer.render(scene, camera);

const geometry = new THREE.IcosahedronGeometry(5, 0);
const material = new THREE.MeshStandardMaterial({ color: 0x4D96FF });
const torus = new THREE.Mesh(geometry, material);
scene.add(torus);

// const geometry2 = new THREE.TorusKnotGeometry( 10, 1, 165, 3, 20, 16 );
// const material2 = new THREE.MeshStandardMaterial( { color: 0x0E185F } );
// const torusKnot = new THREE.Mesh( geometry2, material2 );
// scene.add( torusKnot );

const geometry2 = new THREE.RingGeometry( 10, 11, 30, 10 );
const material2 = new THREE.MeshStandardMaterial( { color: 0x0E185F, side: THREE.DoubleSide } );
const mesh = new THREE.Mesh( geometry2, material2 );
scene.add( mesh );

const geometry3 = new THREE.RingGeometry( 10, 11, 30, 10 );
const material3 = new THREE.MeshStandardMaterial( { color: 0x0E185F, side: THREE.DoubleSide } );
const mesh2 = new THREE.Mesh( geometry3, material3 );
scene.add( mesh2 );

const pointLight = new THREE.PointLight(0xFFFFFF);
pointLight.position.set(15, 10, 15);

const pointLight2 = new THREE.PointLight(0xFFFFFF);
pointLight2.position.set(-30, -20, -15);

const ambientLight = new THREE.AmbientLight(0x666666);

// const helperLight = new THREE.PointLightHelper(pointLight);

scene.add(pointLight);
scene.add(pointLight2);
// scene.add(helperLight);
scene.add(ambientLight);

const control = new OrbitControls(camera, renderer.domElement);

function addStar() {
  const geometry = new THREE.SphereGeometry(0.15, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xFFFFFF });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));
  star.position.set(x, y, z);
  scene.add(star);
}

Array(200).fill().forEach(addStar);

const spaceTexture = new THREE.TextureLoader().load("space.jpeg");
scene.background = spaceTexture;

function animate() {
  requestAnimationFrame(animate);
  torus.rotation.y += 0.01;
  // torusKnot.rotation.x += 0.01;
  // torusKnot.rotation.y += 0.01;
  // torusKnot.rotation.z += 0.01;
  mesh.rotation.x += 0.01;
  mesh.rotation.y += 0.01;
  mesh.rotation.z += 0.01;
  mesh2.rotation.x -= 0.02;
  mesh2.rotation.y -= 0.02;
  mesh2.rotation.z -= 0.02;
  control.update();
  renderer.render(scene, camera);
}

animate();