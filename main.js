import './style.css'

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// we always need three main objects a scene, a camera and a renderer
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGL1Renderer({ //makes the stuff happen
    canvas: document.querySelector('#bg'),
});

//upscale image, and make it full screen
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.set(10,20,30);

renderer.render(scene, camera);

// three js has a bunch of inbuilt shapes, a torus is this big ring thing
const geometry = new THREE.TorusGeometry(10,3,16,100);
// materials are like wrapping paper around the shape that give it its properties
// const material = new THREE.MeshBasicMaterial({color: 0xFF6347, wireframe: true}); //since this is a basic material, it donest require a lightsource

const material = new THREE.MeshStandardMaterial({color: 0xFF6347});
//wire frame is enabled to help identify the object
const torus = new THREE.Mesh(geometry, material);

scene.add(torus);

//point light is a light thatemits in all directions
const pointLight = new THREE.PointLight(0xFF6347); //instead of point lights, ambient lights light up the entire scene
pointLight.position.set(20,20,20);

const pointLight2 = new THREE.PointLight(0xffffff); //instead of point lights, ambient lights light up the entire scene
pointLight2.position.set(-20,20,20);

const  ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, pointLight2)
scene.add(ambientLight)
const lightHelper = new THREE.PointLightHelper(pointLight, 2, 0xffffff);
scene.add(lightHelper)
const lightHelper2 = new THREE.PointLightHelper(pointLight2, 2, 0xffffff);
scene.add(lightHelper2)
const gridHelper = new THREE.GridHelper(200,50);
// scene.add(gridHelper);

//orbit controls using a mouse
const controls = new OrbitControls(camera, renderer.domElement);

function addStar(){
    const geometry = new THREE.SphereGeometry(0.25, 24, 24);
    const material = new THREE.MeshBasicMaterial({color: 0xffffff});
    const star = new THREE.Mesh(geometry, material);
    const [x,y,z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));

    star.position.set(x,y,z);

    scene.add(star)
}

Array(1000).fill().forEach(addStar);

const bg = new THREE.TextureLoader().load('space_background.jpg');
scene.background = bg;

const Me = new THREE.TextureLoader().load('me.jpg');
const me_box = new THREE.Mesh(
    new THREE.BoxGeometry(3,3,3),
    new THREE.MeshBasicMaterial({map: Me})
);
scene.add(me_box)

const saitamaTexture = new THREE.TextureLoader().load('saitama.jpg');
const sai = new THREE.Mesh(
    new THREE.SphereGeometry(3,32,32),
    new THREE.MeshStandardMaterial({map: saitamaTexture})
);
sai.position.set(-20,20,50)
scene.add(sai)
// Scroll Animation

function moveCamera() {
    const t = document.body.getBoundingClientRect().top;
    sai.rotation.x += 0.05;
    sai.rotation.y += 0.075;
    sai.rotation.z += 0.05;
  
    me_box.rotation.y += 0.01;
    me_box.rotation.z += 0.01;
  
    camera.position.z = t * -0.03;
    camera.position.x = t * -0.002;
    camera.rotation.y = t * -0.02;
  }
  
  document.body.onscroll = moveCamera;
  moveCamera();
function animate(){
    requestAnimationFrame(animate);
    torus.rotation.x += 0.01;
    torus.rotation.y -= 0.02;
    torus.rotation.z += 0.03;
    sai.rotation.y += 0.1;
    controls.update();

    renderer.render(scene, camera);
}

animate()