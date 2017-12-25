import * as THREE from 'three';
import Gui from './gui.js';
import Stats from 'stats.js';
// import { Math as MathTHREE} from 'three'; //fix overwriting Math object native JS

import * as options from './js/gameOptions';
import {gameStat as state} from './js/gameState';
import {gameStates as game} from './js/gameState';
import Player from './js/player.js';

import ClickControls from './js/controllers/ClickController';
import PointerLockControls from './js/controllers/MouseMoveController';

import * as elements from './js/elements';

let player;
//for createScene()
let height, width, aspectRatio, fieldOfView, nearPlane, farPlane, scene, camera, renderer, container;
//for createLights()
let hemisphereLight, shadowLight, ambientLight;
//for createSupportPanels() - support tools
let gui, controls, axisHelper, stats, clickControls, mouseControls; 
// Instantiate the planet and add it to the scene:
let planet, basicVector, planetSystem, basicGrid;
// Instantiate Enemyes, Turrel and Fighter;
let numberFighters, numberTurrels, numberAchieves;
let trooperDemo, turrelDemo, achievesDemo, turrelGunsDemo, bulletDemo;

//add to instantiate the planet
let TrooperSystem;

//run func when browser load all files;
window.addEventListener('load', init, false);

function init() {
	// set up the scene, the camera and the renderer
    createScene();

	// add the lights
	createLights();
    
    // add support panels like DAT.gui, Stats.js,  and AxisHelper();
	// supportDevelop();
	
	// run Controls for move and rotate
	runControls();
	
    // add the objects
	// createEnemies(); //include createTurrel() & createFigther() // May be will include to the function createPlanet()
	createTurrel();
	createTrooper();
	createBullet();
	//create Planet
    createPlanet();
	// createHeroPlane();
	// createPlayer();
	// start a loop that will update the objects' positions 
	// and render the scene on each frame
	loop();
}

function createScene() {

    // Get the width and the height of the screen,
	// use them to set up the aspect ratio of the camera 
	// and the size of the renderer.
	height = window.innerHeight;
	width = window.innerWidth;

	// Create the scene
	scene = new THREE.Scene();

    //-----------------------------------------------------------------------------------------------//
	// Add a fog effect to the scene; same color as the
	// background color used in the style sheet
	scene.fog = new THREE.Fog(0x994444, 50, 400); //work about color of fog
	
	// Create the camera
	aspectRatio = width / height;
	fieldOfView = 75;
	nearPlane = 1;
	farPlane = 10000;
	camera = new THREE.PerspectiveCamera(
		fieldOfView,
		aspectRatio,
		nearPlane,
		farPlane
		);
    
	// Set the position of the camera 
	camera.position.set(0,0,0);
	
	// Create the renderer
	renderer = new THREE.WebGLRenderer({ 
		// Allow transparency to show the gradient background
		// we defined in the CSS
		alpha: true, 

		// Activate the anti-aliasing; this is less performant,
		// but, as our project is low-poly based, it should be fine 
		antialias: true 
	});

	// Define the size of the renderer; It equal 100vh/100vw;
	renderer.setSize(width, height);
    
    // set opasity background to show css-background;
    renderer.setClearColor( 0xdc8874, 0.4);
	
	// Enable shadow rendering
    renderer.shadowMap.enabled = true;
    
	// Add the DOM element of the renderer to the 
	// container we created in the HTML
	container = document.getElementById('gameContainer');
	container.appendChild(renderer.domElement);
    
    //-----------------------------------------------------------------------------------------------//
    
	// Listen to the screen: if the user resizes it
	// we have to update the camera and the renderer size
	window.addEventListener('resize', handleWindowResize, false);
}

function handleWindowResize() {
    // update height and width of the renderer and the camera
	height = window.innerHeight;
	width = window.innerWidth;
	renderer.setSize(width, height);
	camera.aspect = width / height;
	camera.updateProjectionMatrix();
}

//-----------------------------------------------------------------------------------------------//
function supportDevelop() {
	//GUI.dat
    // gui = new Gui();
	// gui.addScene(scene, shadowLight, renderer);
	
	//-----------------------------------------------------------------------------------------------//
    //set css-style background (set in CSS in production);
    renderer.domElement.style.backgroundImage = 'url("/src/img/Dark-Space-2048.jpg")';
    renderer.domElement.style.backgroundRepeat = 'no-repeat';
    renderer.domElement.style.backgroundSize = 'cover';
	

    //aixsHelper
    axisHelper = new THREE.AxisHelper( 50 );
	scene.add( axisHelper );

	//stats
	stats = new Stats();
	// console.log(stats);
	document.body.appendChild( stats.dom );
	stats.showPanel( 0 ); // 0: fps, 1: ms, 2: mb, 3+: custom
		
	//set start position - correct to 0,0,0 before production
	camera.position.z = 80;

	//Set width/height in prod
	renderer.setSize(width/2, height/2);
	camera.aspect = width / height;
	camera.updateProjectionMatrix();
}

function runControls() {

	mouseControls = new PointerLockControls( camera );
	player = new Player(camera);
	scene.add( player.getObject() );

	clickControls = new ClickControls(camera, renderer.domElement);
	
	//-----------------------------------------------------------------------------------------------------------------------------------------//
	//set correct button Start


	// const cross = document.querySelector('fa fa-crosshairs');
	//#ec3636a3

	// const pause = document.getElementById('pause');
	const element = document.body;

	const pointerlockchange = function ( event ) {
		if ( document.pointerLockElement === element ) {

			//for controller
			mouseControls.enabled = true;
			clickControls.enabled = true;

			elements.gameInterface.style.display = 'block';
			elements.gameMenu.style.display = 'none';
			elements.pauseMenu.style.display = 'none';
			elements.mainMenu.style.display = 'none';
			elements.scoreMenu.style.display = 'none';

			renderer.domElement.focus();
		} else {
			//reverse all settings
			elements.gameInterface.style.display = 'none';
			elements.gameMenu.style.display = 'block';
			elements.pauseMenu.style.display = 'block';
			elements.mainMenu.style.display = 'none';
			elements.scoreMenu.style.display = 'none';

			mouseControls.enabled = false;
			clickControls.enabled = false;
			console.log('game paused');

			gamePaused();
			//set to pause
			// pauseMenu.style.display = 'block';
		}
	};

	const pointerlockerror = function ( event ) {
		console.log("something with PointerLock going wrong");
		elements.pauseMenu.style.display = 'block'; //on error show pause menu;
	};

	// Hook pointer lock state change events
	document.addEventListener( 'pointerlockchange', pointerlockchange, false );
	document.addEventListener( 'pointerlockerror', pointerlockerror, false );

	elements.start.addEventListener( 'click', function ( event ) {
		gameStart();
		// Ask the browser to lock the pointer
		element.requestPointerLock();
	}, false );

	elements.start2.addEventListener( 'click', function ( event ) {
		gameStart();
		// Ask the browser to lock the pointer
		element.requestPointerLock();
	}, false );

	elements.continued.addEventListener( 'click', function ( event ) {
		gameContinued();
		// Ask the browser to lock the pointer
		element.requestPointerLock();
	}, false );

	elements.backToMain.addEventListener( 'click', function ( event ) {
		elements.gameInterface.style.display = 'none';
		elements.gameMenu.style.display = 'block';
		elements.pauseMenu.style.display = 'none';
		elements.mainMenu.style.display = 'block';
		elements.scoreMenu.style.display = 'none';
	}, false );

	elements.backToMain2.addEventListener( 'click', function ( event ) {
		elements.gameInterface.style.display = 'none';
		elements.gameMenu.style.display = 'block';
		elements.pauseMenu.style.display = 'none';
		elements.mainMenu.style.display = 'block';
		elements.scoreMenu.style.display = 'none';
	}, false );

}

function createLights() {
    //-----------------------------------------------------------------------------------------------//
	// A hemisphere light is a gradient colored light; 
	// the first parameter is the sky color, the second parameter is the ground color, 
	// the third parameter is the intensity of the light
	hemisphereLight = new THREE.HemisphereLight(0x444444,0xbbbbbb, .05)
    
    //-----------------------------------------------------------------------------------------------//
	// A directional light shines from a specific direction. 
	// It acts like the sun, that means that all the rays produced are parallel. 
	shadowLight = new THREE.DirectionalLight(0xaaaab1, .9);

	// an ambient light modifies the global color of a scene and makes the shadows softer
	ambientLight = new THREE.AmbientLight(0xdc8874, .5);
	scene.add(ambientLight);

    //-----------------------------------------------------------------------------------------------//
	// Set the direction of the light  
	shadowLight.position.set(350, 500, 250);
	
	// Allow shadow casting 
	shadowLight.castShadow = true;

    //-----------------------------------------------------------------------------------------------//
	// define the visible area of the projected shadow
	shadowLight.shadow.camera.left = -400;
	shadowLight.shadow.camera.right = 400;
	shadowLight.shadow.camera.top = 400;
	shadowLight.shadow.camera.bottom = -400;
	shadowLight.shadow.camera.near = 1;
	shadowLight.shadow.camera.far = 1000;

	// define the resolution of the shadow; the higher the better, 
	// but also the more expensive and less performant
	shadowLight.shadow.mapSize.width = 2048;
	shadowLight.shadow.mapSize.height = 2048;
	
	// to activate the lights, just add them to the scene
	scene.add(hemisphereLight);  
	scene.add(shadowLight);
}

// First let's define a Planet object :
function Planet () {
	
	// create the geometry (shape) of the lathe;
	// loop for custom planet high;
	// before create array function x = f(y) with more density near y-axis;

	let points = [];
	let x = 0;
	for ( let i = 0; i < 20; i ++ ) {
		// x = (i < 15) ? i - 15 : ( 14 < i & i < 23) ? (i - 18) / 4 : i - 22;
		x = (i < 6) ? (i - 6) * 4 : (i < 14) ? (i - 9) : (i - 13) * 4;
		points.push( new THREE.Vector2( Math.sqrt(1 - x * x / 1024) * 400 , 50 * x));
	}

	// create LatheGeometry
	let geom = new THREE.LatheGeometry( points, 80, 0 , 2 * Math.PI );

	// merge vertices (exclude double vertices in one point for all faces)
	geom.mergeVertices();

	// randomise high of our planet and write all vertises near z-axis in enemyArray;
	let l = geom.vertices.length;
	let n = 0;
	basicVector = new THREE.Vector3();

	for (let j = 0; j < l; j++) {
		// get each vertex
		let v = geom.vertices[j];
		
		//get normalize vector in point of vertice from x-axis
		let norm = new THREE.Vector3(v.x, 0 , v.z).normalize();
		
		basicVector.set(geom.vertices.find(j => j.y == 0));
		
		// get random high from x-axis bethween -10 and +10 from high before
		geom.vertices[j].addScaledVector(norm, (Math.random() - 0.5)*30);
	};
		
    // rotate the geometry on the x axis
    geom.applyMatrix(new THREE.Matrix4().makeRotationZ(-Math.PI/2));

    geom.verticesNeedUpdate = true;
	
	// create the material 
	let mat = new THREE.MeshPhongMaterial({
		color: 0xf7d9aa, 
		vertexColors: THREE.FaceColors,
		transparent:true,
		opacity:1,
		// wireframe: true
		
	});

	// // set individual color for each face;
	// for ( let i = 0; i < geom.faces.length; i++) {
	// 	geom.faces[i].color.setRGB(Math.random(), Math.random(), Math.random() );
	// }

	// To create an object in Three.js, we have to create a mesh 
	// which is a combination of a geometry and some material
	let mesh = new THREE.Mesh(geom, mat);


	// Allow the sea to receive shadows
	mesh.receiveShadow = true;
	
	return mesh
}

// function PlanetGrid() {
// 	let geom = new THREE.CylinderGeometry( 400, 400, 500, 80, 5 );
// 	let mat = new THREE.MeshPhongMaterial( {color: 0xffff00, wireframe: true} );
// 	return new THREE.Mesh( geom, mat );
// }



function createPlanet() {

	planetSystem = new THREE.Group();
	// solarSystem.position.add(new THREE.Vector3(0,0,0).normalize());
	planet = new Planet();
	// basicGrid = new PlanetGrid();
	

	//change position our planet
	// planet.position.add(options.planetPosition);
	// basicGrid.position.set(options.planetPosition);
	planetSystem.add(planet);
	// planetSystem.add(basicGrid);
	planetSystem.position.add(options.planetPosition);
	// planetSystem.add(turrelDemo.copy())

	let turrelInst;
	let turrelGunsInst;
	for (let  i = 0; i < state.enemyQuantity.turrel; i++) {
	turrelInst = turrelDemo.clone();
	// turrelInst.position.set(planet.position);
	turrelInst.rotation.x = Math.round(Math.PI * 2 * Math.random() * 12 * 100) / 12 / 100; //get number 0.00 with step in 10 degrees;
	turrelInst.position.x = options.dX * Math.round ( 2 * (Math.random() - 0.5) * 10) / 10;
	turrelInst.name = 'turrel-' + i;


	turrelGunsInst = turrelGunsDemo.clone();
	turrelGunsInst.children[0].position.y = 420;
	turrelGunsInst.position.setComponent(0,turrelInst.position.x);
	turrelGunsInst.rotation.copy(turrelInst.rotation);
	turrelGunsInst.name = 'turrelGun-'+i;

	// getObjectByName
	
	
	state.enemyArray.turrelArray.push(turrelInst);
	state.enemyArray.turrelGunArray.push(turrelGunsInst);

	planetSystem.add(turrelInst);
	planetSystem.add(turrelGunsInst);
	}

	// console.log(turrelInst);
	// console.log(state.enemyArray.turrelArray);
	// console.log(state.enemyArray.turrelGunArray);
	// console.log(planetSystem);
	// add the mesh of the sea to the scene
	// scene.add(solarSystem);
	scene.add(planetSystem);
}

function Turrel() {
	//create static part;
	let turrelBase = new THREE.Group();

	let turrelMat = new THREE.MeshPhongMaterial({
		color: 0xd0d0d0,
		// vertexColors: THREE.FaceColors,
		transparent:false,
		opacity:1,
		// wireframe: true
	});

	let baseGeom = new THREE.CylinderBufferGeometry( 6, 12, 40, 8 );
	let base = new THREE.Mesh(baseGeom, turrelMat);
	base.castShadow = true;
	base.position.y = 400;
	turrelBase.add(base);

	let headGeom = new THREE.SphereBufferGeometry(10, 8, 8, 0, 2 * Math.PI, 0, Math.PI / 2);
	let head = new THREE.Mesh(headGeom, turrelMat);
	head.position.y = 420;
	head.castShadow = true;
	turrelBase.add(head);

	let headBaseGeom = new THREE.CircleBufferGeometry( 10, 8 );
	let headBase = new THREE.Mesh(headBaseGeom, turrelMat);
	headBase.position.y = 420;
	headBase.rotation.x = Math.PI / 2;
	headBase.castShadow = true;
	turrelBase.add(headBase);

	let point = new THREE.Points();
	point.position.y = 420;
	point.name = 'point';
	turrelBase.add(point);

	return turrelBase;
}

function TurrelGuns() {
	let gunsWrapper = new THREE.Group();
	let guns = new THREE.Group();
	let turrelMat = new THREE.MeshPhongMaterial({
		color: 0xd0d0d0,
		// vertexColors: THREE.FaceColors,
		transparent:false,
		opacity:1,		
		// wireframe: true
	});

	let gunGeom = new THREE.CylinderGeometry( 2, 2, 20, 8 );
	let gun = new THREE.Mesh(gunGeom, turrelMat);
	gun.castShadow = true;
	gun.position.z = 12;
	gun.rotation.x = Math.PI / 2;
	
	let gun2 = gun.clone();
	gun.position.x = -3;
	gun2.position.x = 3;
	
	guns.add(gun);
	guns.add(gun2);
	
	// guns.rotation.x = Math.PI / 4;
	guns.position.y = 2;

	gunsWrapper.add(guns);
	gunsWrapper.userData.tw = 0;
	gunsWrapper.userData.n = 0;
	gunsWrapper.userData.dirToCam = new THREE.Vector3();


	return gunsWrapper;
}

function createTurrel() {
	turrelGunsDemo = TurrelGuns();
	turrelDemo = Turrel();

	// let turrelDemoCopy = turrelDemo.clone();
	// turrelDemoCopy.position.y = -420;

	// let turrelGunsDemoCopy = turrelGunsDemo.clone();
	// turrelGunsDemoCopy.position.y = 0;
	// turrelGunsDemoCopy.name = 'gunsDemo';

	// scene.add(turrelDemoCopy);
	// scene.add(turrelGunsDemoCopy);
}

function Trooper() {
	let trooper = new THREE.Group();
	let mat = new THREE.MeshPhongMaterial({
		
		// wireframe: true

		color: 0x1f1f1f,
		// metalness: 0.5,
		// roughness: 0.1,
		opacity: 0.20,

		transparent: true,


		// color: 0xd0d0d0,
		// vertexColors: THREE.FaceColors,
		// transparent:false,
		opacity:1,
		reflectivity: 1,
		// refractionRatio: 0.4,
		shininess: 0.8,
		specular:1,

	});

	let headGeom = new THREE.SphereBufferGeometry(10,10,10);
	let armGeom = new THREE.CylinderBufferGeometry(6,2,12,8,2);
	let head = new THREE.Mesh(headGeom, mat);
	head.castShadow = true;

	let arm = new THREE.Mesh(armGeom, mat);
	arm.castShadow = true;
	let arm2 = arm.clone();
	arm2.castShadow = true;
	arm.rotation.z = Math.PI / 2;
	arm2.rotation.z = -Math.PI / 2;
	arm.position.x = 14;
	arm2.position.x = -14;

	let tempY = 10*Math.sin(Math.PI/3);
	let crestShape = new THREE.Shape();
	crestShape.moveTo(-10,0);
	crestShape.lineTo(-5,tempY);
	crestShape.lineTo(5,tempY);
	crestShape.lineTo(10,0);
	crestShape.lineTo(5,-tempY);
	crestShape.lineTo(-5,-tempY);
	crestShape.lineTo(-10,0);
	
	let wingGeom = new THREE.ExtrudeGeometry( crestShape, {
		steps: 2,
		amount: 1,
		bevelEnabled: true,
		bevelThickness: 1,
		bevelSize: 1,
		bevelSegments: 1
	});

	let wing = new THREE.Mesh(wingGeom, mat);
	wing.castShadow = true;
	wing.rotation.y = Math.PI / 2;
	wing.scale.set(2,2,1);
	let wing2 = wing.clone();
	wing.position.x = 21;
	wing2.position.x = -21;

	trooper.add(head);
	trooper.add(arm);
	trooper.add(arm2);
	trooper.add(wing);
	trooper.add(wing2);
	// scene.add(trooper);
	let trooperWrapper = new THREE.Group();
	trooperWrapper.add(trooper);
	trooperWrapper.userData.tw = 0;
	trooperWrapper.userData.n = 0;
	trooperWrapper.userData.dirToCam = new THREE.Vector3();


	return trooperWrapper;
	
	// Sphere(8,8,8,10)
}

function createTrooper() {
	let trooperDemo = Trooper();
	let trooperInst;

	for (let  i = 0; i < state.enemyQuantity.trooper; i++) {
	trooperInst = trooperDemo.clone();
	
	trooperInst.position.y = - 420;
	trooperInst.children[0].position.y = Math.round(450 * (1 + 0.3 * Math.random()));
	
	trooperInst.children[0].position.x = options.dX / 12 * Math.round ( (Math.random() - 0.5) * 24);
	trooperInst.rotation.x = Math.PI * 2 * Math.round(Math.random() * 60) / 60; //get number 0.00 with step in 10 degrees;
	// trooperInst.rotation.y = Math.round(Math.PI / 36 * Math.random() * 10000) / 10000; //get number 0.00 from 0 to PI/36
	trooperInst.name = 'trooper-' + i;
	
	
	// trooperInst.rotation.copy(turrelInst.rotation);
	// turrelGunsInst.position.setComponent(0,turrelInst.position.x);
	


	// turrelGunsInst = turrelGunsDemo.clone();
	// turrelGunsInst.name = 'turrelGun-'+i;

	// getObjectByName("");
	
	
	state.enemyArray.trooperArray.push(trooperInst);
	// state.enemyArray.turrelGunArray.push(turrelGunsInst);

	scene.add(trooperInst);
	// planetSystem.add(turrelGunsInst);
	}

}

//posibly best is created it with HTML/CSS, so we can also add shadows and etc.
// function Screen() {

// 	// let screen = new THREE.Object3D();

// 	// let crestShape = new THREE.Shape();
// 	// crestShape.moveTo(0,0);
// 	// crestShape.arc(0,0,6,0,Math.PI,true);
// 	// crestShape.arc(0,18,6,0,Math.PI, true);
// 	// crestShape.moveTo(18,-6);
// 	// crestShape.lineTo(0,-6);
// 	// crestShape.moveTo(0,6);
// 	// crestShape.moveTo(18,6);

// 	// let geom = new THREE.ShapeGeometry( crestShape );
// 	// let mat = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
// 	// let mesh = new THREE.Mesh( geom, mat ) ;
// 	// screen.add( mesh );
// 	// // screen.pos(camera.position.addScaledVector ( ,  ))
// 	// scene.add( screen );

// }

function Bullet() {
	let mat = new THREE.MeshPhongMaterial({
		color: 0xd41414,
		opacity: 0.20,
		transparent: true,
		opacity:1,
		reflectivity: 1,
		shininess: 0.8,
		specular:1,
	});

	let geom = new THREE.SphereBufferGeometry(2,2,6);
	let bullet = new THREE.Mesh(geom, mat);
	bullet.userData.dirToCam = new THREE.Vector3();

	return bullet;
}

function createBullet() {
	bulletDemo = Bullet();
	// let bulletExpo = bulletDemo.clone();
	// bulletExpo.position.set(5,5,5);
	// scene.add(bulletExpo);
}

let i = 0,
	obj,
	A, B, alfa, beta,
	dx,dy,dz,kz,ky,
	distance,
	kSpeed,
	timerSec, timerMin, timerMsec;
	let isFlip;
	/// It must be early 
	let cS = game.gameOver;


function loop(){
	// stats.begin();

	isFlip = (cS & options.gFl);

	if (clickControls.slowMotion) {
		console.log('cS is ' + cS);
		console.log('options.gFl ' + options.gFl);
		console.log('isFlip is ' + isFlip);
	}
	

	// state.timeNow = Math.ceil(performance.now());
	// console.log(state.timeNow);
	// state.timeDelta = Math.ceil(state.time.getDelta * 1000); //now oldtime equal now;
	// state.timeNow = state.time.oldTime;
	
	if (!state.isPaused) {
		
		planetSystem.rotation.x += 0.005;

		//movements
		// clickControls.update(state.player, options);
		player.update(clickControls, mouseControls);

		B = player.getObject().position; // camera position
		state.enemyArray.turrelGunArray  //turrelGuns look at camera
		.forEach(gun => {
	
			A = gun.children[0].getWorldPosition();
			
			
			
			if (A.y > -200) { 
				dx = B.x - A.x;
				dy = B.y - A.y;
				dz = B.z - A.z;
				kz = (A.z < 0) ? -1 : 1;
				ky = (dy < 0) ? 1 : -1;
				
				alfa = Math.atan(ky * dy/Math.sqrt(dx * dx + A.z * A.z));
				beta = Math.atan(kz * (B.x-A.x)/A.z);
				
				gun.up.set(0,0,1);
				gun.children[0].rotation.set(alfa, beta, 0, 'YXZ');
				// console.log(A.z);
				if (A.z > -120 && A.z < -80 && Math.random() * 60 < 1  && state.isPlaying) {
					// console.log('shoot');
					let bullet = bulletDemo.clone();
					bullet.position.add(A);
					let vector = new THREE.Vector3(dx, dy, dz)
					bullet.userData.dirToCam = vector.normalize();
					
					state.bulletArray.push(bullet);
					scene.add(bullet);
					// console.log(bullet);
				}
			}

			
		});
		state.bulletArray
		.forEach(bullet => {
			if (bullet){
				bullet.position.addScaledVector(bullet.userData.dirToCam, (8));
				distance = bullet.position.distanceTo(B);
				if (distance < 1) {
					// console.log('you die from bullet');
					state.isKilled = true;
				};
				if (bullet.position.z > 2) {
					scene.remove(scene.getObjectById(bullet.id));
					bullet = null;
				}
			}
		})



		state.enemyArray.trooperArray  //move troopers
		.forEach(trooper => {
			if(trooper){
				trooper.rotation.x += 0.009;

				A = trooper.children[0].getWorldPosition();

				if (A.y > -200) { 
					dx = B.x-A.x;
					dy = (B.y - A.y);
					kz = (A.z < 0) ? -1 : 1;
					ky = (dy < 0) ? 1 : -1;
					
					alfa = Math.atan(ky * dy/Math.sqrt(dx * dx + A.z * A.z));
					beta = Math.atan(kz * (B.x-A.x)/A.z);
					
					trooper.up.set(0,0,1);
					trooper.children[0].rotation.set(alfa, beta, 0, 'YXZ');
				}
				distance = A.distanceTo(B);
				// console.log(distance);
				if (distance < 50) {
					// console.log('you Die from trooper');
					state.isKilled = true;
				}

				if (A.z > -120 && A.z < -80 && Math.random() * 60 < 5  && state.isPlaying) {
					// console.log('shoot');
					let bullet = bulletDemo.clone();
					bullet.position.add(A);
					let vector = new THREE.Vector3(dx, dy, dz)
					bullet.userData.dirToCam = vector.normalize();
					
					state.bulletArray.push(bullet);
					scene.add(bullet);
					// console.log(bullet);
				}
			}
		});

	//Ray detected;
		if (state.isKilled == true){
		// if (isFlip){
			
			if (i > 20) { 
				gameOver();
			};
			player.getObject().rotation.x += Math.PI / 80;
			i++;
			state.isPlaying = false;
		};
// `		console.log(i);`

		state.timeTotal += (state.isPlaying) ? performance.now() - state.timeStart : 0;
		timerMsec = (Math.floor(state.timeTotal / 1000)).toString().substr(0,2);
		timerSec = (Math.floor(state.timeTotal / 100000)).toString();
	
		elements.timer.innerHTML = timerSec + " . " + timerMsec;
	};
	// planet.rotateOnAxis ( planetSystem.position, 0.004 );
	// timerMin = (Math.floor(state.timeTotal / 60000)).toString().substr(-2);

	// timerSec, timerMin, 

	renderer.render(scene, camera);
	// if (clickControls.slowMotion){
	// 	gameOver();
	// }
    // stats.end();
    requestAnimationFrame(loop);
}

function gameStart() {
	// console.log('run func Start');
	if (state.timeTotal == 0) {
		mouseControls.addListeners();
		clickControls.addListeners();
	};
	player.getObject().rotation.x = 0;
	state.timeTotal = 0;
	state.timeStart = performance.now();
	// state.time.start();
	state.isPlaying = true;
	// state.isPaused = false;

}

function gamePaused() {
	// console.log('run func Paused');

	// state.timeTotal += preformance.now() - state.timeStart;
	state.isPaused = true;
}

function gameContinued() {

	// state.timeStart = performance.now();
	state.isPaused = false;
}

function gameOver() {
	// state.timeTotal += performance.now() - state.timeStart;
	
	
	elements.scoreTime.innerHTML = ''+ Math.ceil(state.timeTotal/10000)/10 + ' ';
	state.isPlaying = false;
	document.exitPointerLock();

	elements.gameInterface.style.display = 'none';
	elements.gameMenu.style.display = 'block';
	elements.pauseMenu.style.display = 'none';
	elements.mainMenu.style.display = 'none';
	elements.scoreMenu.style.display = 'block';

}


function addStats(debug) {
    if (debug) {
        document.body.appendChild(stats.domElement);
    }
}



// loadAllAssets().then(
//     (assets) => {
//         init(assets);
//     },
//     (err) => { console.log(`impossible to load the assets: ${err}`); }
// );
