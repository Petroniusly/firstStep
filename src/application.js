import * as THREE from 'three';
import Gui from './gui.js';
import Stats from 'stats.js';

//Package to create the polifill to advanced round of standart
let round10 = require('round10').round10;

import * as options from './js/gameOptions';
import {gameStat as state} from './js/gameState';
import {gameStates as game} from './js/gameState';
import Player from './js/player.js';

import ClickControls from './js/controllers/ClickController';
import PointerLockControls from './js/controllers/MouseMoveController';

import Planet from './js/objects/planet/planet.object';
import Trooper from './js/objects/trooper/trooper.object';
import Turrel from './js/objects/turrel/turrel.object';

import * as elements from './js/elements';

let player;
//for createScene()
let height, width, aspectRatio, fieldOfView, nearPlane, farPlane, scene, camera, renderer, container;
//for createLights()
let hemisphereLight, shadowLight, ambientLight;
//for createSupportPanels() - support tools
let gui, controls, axisHelper, stats, clickControls, mouseControls; 
// Instantiate the planet and add it to the scene:
let planet;
// Instantiate Enemyes, Turrel and Fighter;
let trooperDemo, turrelDemo, achievesDemo, turrelGunsDemo, bulletDemo;

//run func when browser load all files;
window.addEventListener('load', init, false);

function init() {
	state.cS = game.init;
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
	
	elements.container.appendChild(renderer.domElement);
    
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
	options.minAngleY = - Math.PI;
	options.maxAngleY = Math.PI;
	

	//Set width/height in prod
	renderer.setSize(width/2, height/2);
	camera.aspect = width / height;
	camera.updateProjectionMatrix();
}

function showMenu (cS) {
	elements.gameInterface.style.display = (cS < options.mI) ? 'block' : 'none';
	elements.gameMenu.style.display = (cS > options.sM) ? 'block' : 'none';
	elements.mainMenu.style.display = (cS & options.mI) ? 'block' : 'none';
	elements.pauseMenu.style.display = (cS & options.mP) ? 'block' : 'none';
	elements.scoreMenu.style.display = (cS & options.mGO) ? 'block' : 'none';
}
function runControls() {

	mouseControls = new PointerLockControls( camera );
	clickControls = new ClickControls(camera, renderer.domElement);
	player = new Player(camera);
	scene.add( player.getObject() );

	// const pause = document.getElementById('pause');
	const element = document.body;


	//set only state pointerLock on/off
	const pointerlockchange = function ( event ) {
		if ( document.pointerLockElement === element ) {
			//for controller
			renderer.domElement.focus();

			mouseControls.enabled = true;
			clickControls.enabled = true;
			// console.log('PointerLock enabled');
			// console.log(renderer.domElement);
			
		} else {
			//reverse all settings
			if(isFire) {
				state.cS = game.pause;
				// console.log('game Paused');
			}
			mouseControls.enabled = false;
			clickControls.enabled = false;
			
			// console.log('PointerLock disabled');
		}
	};

	const pointerlockerror = function ( event ) {
		console.log("something with PointerLock going wrong");
		state.cS = game.pause; //on error show pause menu;
	};

	clickControls.addListeners();
	mouseControls.addListeners();
	document.addEventListener( 'pointerlockchange', pointerlockchange, false );
	document.addEventListener( 'pointerlockerror', pointerlockerror, false );

	elements.start.addEventListener( 'click', function ( event ) {
		state.cS = game.play;
		// Ask the browser to lock the pointer
		element.requestPointerLock();
	}, false );

	elements.start2.addEventListener( 'click', function ( event ) {
		state.cS = game.play;
		// Ask the browser to lock the pointer
		element.requestPointerLock();
	}, false );

	elements.continued.addEventListener( 'click', function ( event ) {
		state.cS = game.continue;
		// Ask the browser to lock the pointer
		element.requestPointerLock();
	}, false );

	// elements.esc.addEventListener( 'click', function ( event ) {
	// 	state.cS = game.pause;
	// }, false );



	elements.backToMain.addEventListener( 'click', function ( event ) {
		state.cS = game.init;
	}, false );

	elements.backToMain2.addEventListener( 'click', function ( event ) {
		state.cS = game.init;
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

function setRandom(range, stepQuantity, zeroCentered){
	let dx = range / stepQuantity;
	let half = zeroCentered ? stepQuantity / 2 : 0;
	return function() {
		return dx * Math.round(Math.random() * stepQuantity - half);
	}
}

function createPlanet() {
	planet = new Planet();
	planet.position.add(options.planetPosition);

	turrelDemo = new Turrel();
	turrelDemo.setInstance();

	let turrelRotXRandom = setRandom(2 * Math.PI, 80, false);
	let turrelPosXRandom = setRandom(2 * options.dX, 8, true);
	let turrelInst;
	let turrelGunsInst;

	for (let  i = 0; i < state.enemyQuantity.turrel; i++) {

		turrelInst = turrelDemo.clone();
		turrelInst.rotation.x = turrelRotXRandom();
		turrelInst.position.x = turrelPosXRandom();
		turrelInst.setName(i);

		for (let j = 0; j < turrelInst.children.length; j++) {
			turrelInst.children[j].position.y = 420; 
			turrelInst.children[j].setName(i);
		}
		
		planet.add(turrelInst);
		state.enemyArray.turrelGunArray.push(planet.getObjectByName('turrel-gun-'+i));
		state.enemyArray.turrelArray.push(turrelInst);
		// console.log(planet.getObjectByName('turrel-gun-'+i));
	}
	console.log(state.enemyArray.turrelGunArray);
	
	scene.add(planet);
}

function createTrooper() {
	let trooperDemo = new Trooper();
	trooperDemo.setInstance();

	let trooperInst;
	let trooperPosYRandom = setRandom(120, 12, false);
	let trooperPosXRandom = setRandom(2 * options.dX, 16, true);
	let trooperRotXRandom = setRandom(2 * Math.PI, 60, false);
	let trooperRotYRandom = setRandom(Math.PI / 6, 6, true);

	for (let  i = 0; i < state.enemyQuantity.trooper; i++) {

		trooperInst = trooperDemo.clone(true);
		trooperInst.position.y = - 420;
		trooperInst.children[0].position.y = 450 + trooperPosYRandom();
		
		trooperInst.children[0].position.x = trooperPosXRandom();
		trooperInst.rotation.set(trooperRotXRandom(), trooperRotYRandom(), 0, "YXZ");
		trooperInst.setName(i);
		
		state.enemyArray.trooperArray.push(trooperInst);
		scene.add(trooperInst);
	}
	// trooperInst.children[0].setMatWireframe();
	// trooperInst.children[0].setRandomFaces();

}

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
	let isFlip, isRotate, isFire;
	let cSold = 11;
	let count = 0;
	/// It must be early 
	// let cS = game.gameOver;


function loop(){
	// stats.begin();

	state.cS = (clickControls.esc) ? game.pause : state.cS;
	// console.log(state.cS);

	if (clickControls.esc) {
		console.log('pause enable')
	}
	
	
	isFlip = (state.cS & options.gFl);
	isRotate = (state.cS & options.gR);
	isFire = (state.cS & options.gFr);
	showMenu(state.cS);
	
	if (isFire) {player.update(clickControls, mouseControls)};
	//dev tests and logs
	// if(i < 2 || clickControls.slowMotion) {
	
	// 	// if (cSold != state.cS) {
	// 	// 	// state.cS = game.pause
	// 	// 	// console.log(game);
	// 	// 	// console.log(state.cS);
	// 	// 	function show(cS) {
	// 	// 		isFlip = (cS & options.gFl);
	// 	// 		isRotate = (cS & options.gR);
	// 	// 		isFire = (cS & options.gFr);
	// 	// 		console.log(cS);
	// 	// console.log('options ' + game);
	// 	console.log('isFlip is ' + isFlip);
	// 	console.log('isFire is ' + isFire);
	// 	console.log('isRotate is ' + isRotate);
	// 	console.log(player.yawObject.rotation);
	// 	console.log(player.pitchObject.rotation);
	// 	console.log(player.camera.rotation);
	// 	console.log(player.yawObject.position);
	// 	console.log(player.currentPos);
	// 	console.log(player.currentAngle);
	// 	console.log(player.currentSpeed);
	// 	// console.log(player.yawObject.rotation.y);
	// 	// 	}
	// 	// 	for(let cS in game) {show(game[cS])};
	// 	// }
	// 	// cSold = state.cS;
	// }
	// i++

	// state.timeNow = Math.ceil(performance.now());
	// console.log(state.timeNow);
	// state.timeDelta = Math.ceil(state.time.getDelta * 1000); //now oldtime equal now;
	// state.timeNow = state.time.oldTime;
	
	if (isRotate) {
		
		planet.rotation.x += 0.005;
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
				if (A.z > -120 && A.z < -80 && Math.random() * 60 < 1  && isFire) {
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
				if (distance < 1 && isFire) {
					// console.log('you die from bullet');
					state.cS = game.killed;
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
				if (distance < 50 && isFire) {
					// console.log('you Die from trooper');
					state.cS = game.killed;
				}

				if (A.z > -120 && A.z < -80 && Math.random() * 60 < 5  && isFire) {
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
		if (isFlip){
			document.exitPointerLock();
			player.flip();
			count++;
			if (count == 320) {
				gameOver();
				count = 0;
			};
		};
		// console.log(player.getObject().rotation.x);

		state.timeTotal += (state.isPlaying) ? performance.now() - state.timeStart : 0;
		timerMsec = (Math.floor(state.timeTotal / 1000)).toString().substr(0,2);
		timerSec = (Math.floor(state.timeTotal / 100000)).toString();
	
		elements.timer.innerHTML = timerSec + " . " + timerMsec;
	};
	// planet.rotateOnAxis ( planet.position, 0.004 );
	// timerMin = (Math.floor(state.timeTotal / 60000)).toString().substr(-2);

	// timerSec, timerMin, 

	renderer.render(scene, camera);
	
	// stats.end();
	
    requestAnimationFrame(loop);
}
// not use now
// function gameStart() {
// 	// console.log('run func Start');

// 	player.getObject().rotation.x = 0;
// 	state.timeTotal = 0;
// 	state.timeStart = performance.now();
// 	// state.time.start();
// 	state.isPlaying = true;
// 	// state.isPaused = false;

// }

//not use now
// function gamePaused() {
// 	// console.log('run func Paused');
// 	state.cS = game.pause;

// 	//time not work yet
// 	// state.timeTotal += preformance.now() - state.timeStart;

// }

//not use now
// function gameContinued() {
// 	state.cS = game.continue;
// 	// state.timeStart = performance.now();
// 	// state.isPaused = false;
// }

function gameOver() {
	state.cS = game.gameOver;
	mouseControls.clearMovement();
	clickControls.clearClick();
	player.clearPosition();
	
	//time not work yet
	// state.timeTotal += performance.now() - state.timeStart;
	elements.scoreTime.innerHTML = ''+ Math.ceil(state.timeTotal/10000)/10 + ' ';

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
