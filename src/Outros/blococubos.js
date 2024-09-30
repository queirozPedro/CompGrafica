import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const scene = new THREE.Scene();
/**
 * Existem vários tipos de cameras no three.js, nesse caso vamos usar a câmera perspectiva.
 *
 * O primeiro atributo (75) é o campo de visão (FOV) da câmera, que é em ângulos.
 * O segundo é a proporção da tela, geralmente obtida através da largunra da tela dividida pela altura.
 * Os dois ultimos são o near e o far, eles são a distância de inicio e de fim em que os objetos
 * serão renderizados a partir da posição da câmera.
 */
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const raio = 2;
let theta = 0.0;
class Cube{
	constructor(cube){
		let min = -0.1;
		let max = 0.1;

		this.velocidadeX = min + (max - min) * Math.random();
		this.velocidadeY = min + (max - min) * Math.random();
		this.velocidadeZ = min + (max - min) * Math.random();
		this.cube = cube;
	}

	update(){
		this.cube.rotation.x += this.velocidadeX;
		
		this.cube.position.x += this.velocidadeX;
		if(this.cube.position.x > 7 || this.cube.position.x < -7){
			this.velocidadeX = -this.velocidadeX;
		}

		this.cube.position.y += this.velocidadeY;
		if(this.cube.position.y > 4	 || this.cube.position.y < -4){
			this.velocidadeY = -this.velocidadeY;
		}

		this.cube.position.z += this.velocidadeZ;
		if(this.cube.position.z > 2	 || this.cube.position.z < -10){
			this.velocidadeZ = -this.velocidadeZ;
		}
	}

	rotate(theta){
		this.cube.position.x = raio * Math.cos(theta);
		this.cube.position.y = raio * Math.sin(theta);
	}

	spin(){
		this.cube.rotation.x = raio * Math.cos(theta);
		this.cube.rotation.y = raio * Math.sin(theta);
	}

	moveForward(){
		this.cube.position.z += 0.05;
		if(this.cube.position.z > camera.position.z){
			this.cube.position.z = 0;
		}
	}
}


/**
 * Esse é o renderer (Renderizador), responsável por transformar os dados em uma representação visual.
 * Para criar um renderer é precisamos definir um Size (tamanho) que será o tamanho que ele irá renderizar
 * nosso apicativo.
 *  
 */
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setAnimationLoop( animate );
document.body.appendChild( renderer.domElement );

const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(0, 0, 0);
controls.update();

let cubes = []
const m = 10;
const n = 10;
const k = 10;
const deltaX = 0.3;
const deltaY = 0.3;
const side = 1.0;
let offset = ((m - 1)*(deltaX + side))/2;
let offsetY = ((n - 1)*(deltaY + side))/2;

for(let b = 0; b < k; b++){
	for(let j = 0; j < n; j++){
		for(let i = 0; i < m; i++){
			/**
			 * Para criar um cubo precisamos de uma Geometria de Caixa (BoxGeometry), que contêm os vertices 
			 * e as faces do cubo. 
			*/ 
			const geometry = new THREE.BoxGeometry(side, side, side)
			const material = new THREE.MeshBasicMaterial( { color: 0x00ff00, wireframe:true} );
			const cube = new Cube(new THREE.Mesh( geometry, material ));
			cube.cube.position.x = i * (side + deltaX) - offset;
			cube.cube.position.y = j * (side + deltaY) - offsetY;
			cube.cube.position.z = b;
			scene.add( cube.cube );
			cubes.push(cube);
		}
	}
}


// Coloca uma cor no background da cena
scene.background = new THREE.Color(0x7453ff);

camera.position.z = 15;

function animate() {
	theta += 0.01;
	renderer.render( scene, camera );
	for(var cube of cubes){
		cube.moveForward();	
	}
}

// renderer.setAnimationLoop( animate );