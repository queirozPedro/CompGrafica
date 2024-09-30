import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const geometry = new THREE.SphereGeometry( 1, 100, 100);
const material = new THREE.MeshStandardMaterial( { color: 0xaaaaaa} );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );


const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(0, 0, 0);
controls.update();
camera.position.z = 5;

// const light = new THREE.AmbientLight(0xf100ff, 100);
const light = new THREE.PointLight(0xf100ff, 10000);
light.position.set( 0, 0, 2)
scene.add(light);
let theta = 0;


function animate() {
	theta += 0.1
	renderer.render( scene, camera );
	light.position.set(Math.sin(theta), 1 , Math.cos(theta))

}
renderer.setAnimationLoop( animate );
