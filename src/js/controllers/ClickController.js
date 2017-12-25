/**
 * @author mrdoob / http://mrdoob.com/
 * @author alteredq / http://alteredqualia.com/
 * @author paulirish / http://paulirish.com/
 * @author petroniusly / blinkovpag@gmail.com
 * based on FirstPersonControls only in part of event 'click' and removed player movelogic to class Player;
 */

import * as THREE from 'three';

export default class {
	constructor (object, domElement) {

		this.object = object;
		this.target = new THREE.Vector3( 0, 0, 0 );
		
		this.domElement = ( domElement !== undefined ) ? domElement : document;
		
		this.enabled = false;
		// this.enabled = true;
		
		this.moveUp = false;
		this.moveDown = false;
		this.moveLeft = false;
		this.moveRight = false;

		//not in this release
		// this.shoot = false;
		// this.getBomb = false;
		// this.mouseDragOn = false; 
		
		this.slowMotion = false;  //used now for different tests
		this.esc = false;

		// for tab in canvas and have control camera
		if ( this.domElement !== document ) {

			this.domElement.setAttribute( 'tabindex', -1 );
		}

		//not in this release
		//-------------------------------------------------------------------------------------------------------------------------//

		// this.onMouseDown = function ( event ) {

		// 	if ( this.enabled === false ) return;

		// 	if ( this.domElement !== document ) {

		// 		this.domElement.focus();

		// 	}

		// 	// console.log(event);
		// 	// console.log('Mouse down ' + event.target)
		// 	event.preventDefault();
		// 	event.stopPropagation();
			
		// 	switch ( event.button ) {

		// 		case 0: this.shoot = true; break; 
		// 		case 2: this.getBomb = true; break;

		// 	}

		// 	this.mouseDragOn = true;

		// };

		// this.onMouseUp = function ( event ) {

		// 	if ( this.enabled === false ) return;
		// 	// console.log('Mouse up ' + event.target);
		// 	event.preventDefault();
		// 	event.stopPropagation();

		// 	switch ( event.button ) {

		// 		case 0: this.shoot = false; break;
		// 		case 2: this.getBomb = false; break;

		// 	}

		// 	this.mouseDragOn = false;

		// };

		//-------------------------------------------------------------------------------------------------------------------------//

		this.onKeyDown = function ( event ) { //eval to static/public method in Object

			if ( this.enabled === false ) return;
			// console.log('Key down');
			// event.preventDefault();

			switch ( event.keyCode ) {

				case 27: /*esc*/ this.esc = true; break; 

				case 38: /*up*/
				case 87: /*W*/ this.moveUp = true; break;

				case 37: /*left*/
				case 65: /*A*/ this.moveLeft = true; break;

				case 40: /*down*/
				case 83: /*S*/ this.moveDown = true; break;

				case 39: /*right*/
				case 68: /*D*/ this.moveRight = true; break;

				case 70: /*F*/ this.slowMotion = true; break;

			}

		};

		this.onKeyUp = function ( event ) {

			if ( this.enabled === false ) return;
			// console.log('Key up');

			switch( event.keyCode ) {

				case 27: /*esc*/ this.esc = false; break; 

				case 38: /*up*/
				case 87: /*W*/ this.moveUp = false; break;

				case 37: /*left*/
				case 65: /*A*/ this.moveLeft = false; break;

				case 40: /*down*/
				case 83: /*S*/ this.moveDown = false; break;

				case 39: /*right*/
				case 68: /*D*/ this.moveRight = false; break;

				case 70: /*F*/ this.slowMotion = false; break;

			}

		};

		this.addListeners = function() {
			// console.log('try to add click listeners');
			
			document.addEventListener( 'keydown', this.onKeyDown.bind(this), false );
			document.addEventListener( 'keyup', this.onKeyUp.bind(this), false );
			
			//not in this release
			// document.addEventListener( 'contextmenu', function ( event ) { event.preventDefault(); }, false );
			// document.addEventListener( 'mousedown', this.onMouseDown.bind(this), false );
			// document.addEventListener( 'mouseup', this.onMouseUp.bind(this), false );
		};
		
		
		this.removeListeners = function() { //not work, find bug in nearest future
			// console.log('try to remove click listeners');
			document.removeEventListener( 'keydown', this.onKeyDown, false );
			document.removeEventListener( 'keyup', this.onKeyUp, false );
			
			//not in this release
			// document.removeEventListener( 'contextmenu', function ( event ) { event.preventDefault(); }, false );
			// document.removeEventListener( 'mousedown', this.onMouseDown, false );
			// document.removeEventListener( 'mouseup', this.onMouseUp, false );
		};
	};
};
