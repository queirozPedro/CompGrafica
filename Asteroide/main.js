import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const light = new THREE.AmbientLight( 0xffffff ); // soft white light
scene.add( light );

// scene.background = new THREE.Color(0xffffff);
const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(0, 0, 0);
controls.update();

let model = null;

class Asteroid {
    constructor(){
        this.model = null;
        this.load(this);
    }
    move(){
        if(this.model) {
            this.model.rotation.x += 0.1;
            this.model.position.z += 0.1;
            if(this.model.position.z >= 5){
                this.model.position.z = -20.0;
                let r = Math.random();
                this.model.position.x = -30.0*r + 30.0*(1.0-r);
                r = Math.random();
                this.model.position.y = -30.0*r + 30.0*(1.0-r);
            }
        }
    }
    load(object){
        // Instantiate a loader
        const loader = new GLTFLoader();
        
        // Load a glTF resource
        loader.load(
            // resource URL
            'modelo/asteroide.gltf',
            // called when the resource is loaded
            function ( gltf ) {
        
                scene.add( gltf.scene );
                object.model = gltf.scene.children[0];
                model.position.z = -20;
        
                gltf.animations; // Array<THREE.AnimationClip>
                gltf.scene; // THREE.Group
                gltf.scenes; // Array<THREE.Group>
                gltf.cameras; // Array<THREE.Camera>
                gltf.asset; // Object
        
            },
            // called while loading is progressing
            function ( xhr ) {
        
                console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
        
            },
            // called when loading has errors
            function ( error ) {
        
                console.log( 'An error happened' );
        
            }
        );
    }
}

let asteroids = [];
let asteroid = null
for (let i = 0; i < 500; i++){
    asteroid = new Asteroid();
    asteroids.push(asteroid);
}


function animate() {
	renderer.render( scene, camera );

    for(let asteroid of asteroids){
        asteroid.move();
    }
    
}
renderer.setAnimationLoop( animate );