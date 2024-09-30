import * as THREE from 'three'; 
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const geometry = new THREE.BoxGeometry( 1, 1, 1, 5, 5, 5 );
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00, wireframe: true} );
const cube1 = new THREE.Mesh( geometry, material );
const cube2 = new THREE.Mesh( geometry, material );
scene.add( cube1 );
scene.add( cube2 );

const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(0, 0, 0);
controls.update();

camera.position.z = 5;
let arrowUp = false;
let arrowDown = false;
let arrowRight = false;
let arrowLeft = false;

let moveStart = false;

function animate() {
	renderer.render( scene, camera );
	cube1.rotation.x += 0.01;
	cube1.rotation.y += 0.01;
	
    cube2.rotation.x += 0.02;
	cube2.rotation.y += 0.03;
    
    if(arrowUp)
        cube1.position.y += 0.01;
    if(arrowDown)
        cube1.position.y -= 0.01;
    if(arrowRight)
        cube1.position.x += 0.01;
    if(arrowLeft)
        cube1.position.x -= 0.01;
    
    cube2.position.z -= 1;
    if(moveStart){
        cube2.position.z = 0;
        cube2.position.x = cube1.position.x;    
        cube2.position.y = cube1.position.y;    
    }
}
renderer.setAnimationLoop( animate );

document.addEventListener("keydown", onDocumentKeyDown, false);
document.addEventListener("keyup", onDocumentKeyUp, false);

function onDocumentKeyDown(event){
    console.log(event.key);
    console.log(event.keyCode);
    switch (event.key) {
        case "ArrowUp":
            arrowUp = true;
            break;
        case "ArrowDown":
            arrowDown = true;
            break;
        case "ArrowRight":
            arrowRight = true;
            break;
        case "ArrowLeft":
            arrowLeft = true;
            break;
        case " ":
            moveStart = true;
            break;
    }
}

function onDocumentKeyUp(event){
    switch (event.key) {
        case "ArrowUp":
            arrowUp = false;
            break;
        case "ArrowDown":
            arrowDown = false;
            break;
        case "ArrowRight":
            arrowRight = false;
            break;
        case "ArrowLeft":
            arrowLeft = false;
            break;
        case " ":
            moveStart = false;
            break;
    }
}

