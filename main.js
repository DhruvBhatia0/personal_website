import * as THREE from 'https://unpkg.com/three@0.120.1/build/three.module.js';
// import { OrbitControls } from 'https://unpkg.com/three@0.120.1/jsm/controls/OrbitControls';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// Setup
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
camera.position.setX(-3);

renderer.render(scene, camera);

// Torus

const geometry = new THREE.TorusGeometry(10, 2, 16, 100);
const material = new THREE.MeshNormalMaterial({wireframe:true});
const torus = new THREE.Mesh(geometry, material);

scene.add(torus);

// Lights

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(ambientLight);

// Helpers

// const lightHelper = new THREE.PointLightHelper(pointLight)
// const gridHelper = new THREE.GridHelper(200, 50);
// scene.add(lightHelper, gridHelper)

// const controls = new OrbitControls(camera, renderer.domElement);

function addStar() {
  const geometry = new THREE.SphereGeometry(0.75, 24, 24);
  const material = new THREE.MeshNormalMaterial({ color: 0xffffff});
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(300));

  star.position.set(x, y, z);
  scene.add(star);
}

Array(300).fill().forEach(addStar);

// Background

//const spaceTexture = new THREE.TextureLoader().load('space_background.jpg');
// scene.background = spaceTexture;

// Avatar

const MeTexture = new THREE.TextureLoader().load('me.jpg');

const Me = new THREE.Mesh(new THREE.BoxGeometry(3, 3, 3), new THREE.MeshBasicMaterial({ map: MeTexture }));

scene.add(Me);


// Sphere

//const circleTexture = new THREE.TextureLoader().load('saitama.jpg');
// const normalTexture = new THREE.TextureLoader().load('normal.jpg');

const circle = new THREE.Mesh(
  new THREE.SphereGeometry(12, 32, 32),
  new THREE.MeshNormalMaterial({
    wireframe:true
  })
);

scene.add(circle);

circle.position.set(0,10,85);
// circle.position.z = 30;
// circle.position.setX(-10);

Me.position.z = -5;
Me.position.x = 2;

//adding a torus knot
const Tgeometry = new THREE.TorusKnotGeometry( 10, 3, 100, 16 );
const Tmaterial = new THREE.MeshNormalMaterial( {wireframe: true} );
const torusKnot = new THREE.Mesh( Tgeometry, Tmaterial );
torusKnot.position.set(5,0,30);
scene.add( torusKnot );
// Scroll Animation

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  // circle.rotation.x += 0.05;
  // circle.rotation.y += 0.075;
  // circle.rotation.z += 0.05;

  Me.rotation.y = t * -0.0008;
  Me.rotation.z = t * -0.0009;

  camera.position.z = t * -0.03;
  camera.position.x = t * -0.002;
  camera.rotation.y = t * -0.0002;
  camera.rotation.z = t * -0.001;
  camera.rotation.x = t * -0.0001;
}

document.body.onscroll = moveCamera;
moveCamera();

// Animation Loop

function animate() {
  requestAnimationFrame(animate);

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;

  torusKnot.rotation.x += 0.01;
  torusKnot.rotation.y += 0.005;
  torusKnot.rotation.z += 0.01;

  circle.rotation.x += 0.01;
  circle.rotation.y += 0.005;
  circle.rotation.z += 0.01;

  // controls.update();

  renderer.render(scene, camera);
}

animate();
