import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(0, 0, 0);
controls.update();

let r = 0.0;
let theta = 0.0;
let phi = 0.0;
let n = 20;
let m = 20;

for(let j = 0; j < m; j++){
    for(let i = 0; i < n; i++){
        const geometry = new THREE.BoxGeometry( 1, 1, 1);
        const material = new THREE.MeshBasicMaterial( { color: 0x1dc4c2, wireframe: true } );
        const cube = new THREE.Mesh( geometry, material );
        
        r = 3;
        theta = (2.0*Math.PI*j)/m;
        phi = Math.PI*i/n;

        cube.position.x = r*Math.sin(phi)*Math.sin(theta);
        cube.position.y = r*Math.cos(phi);
        cube.position.z = r*Math.sin(phi)*Math.cos(theta);
        scene.add( cube );
        
    }
} 

camera.position.z = 5;

function animate() {
	renderer.render( scene, camera );
    // camera.rotation.z += 0.01;
}
renderer.setAnimationLoop( animate );
