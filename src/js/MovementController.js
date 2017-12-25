/**
 * @author mrdoob / http://mrdoob.com/
 * @author alteredq / http://alteredqualia.com/
 * @author paulirish / http://paulirish.com/
 * @author petroniusly 
 * transformed from FirstPersonControls to movement only up/down, left/right and clicked on mousebuttons (not finished)
 */

import * as THREE from 'three';

export const MovementControls = function ( object, domElement ) {

	this.object = object;
	this.target = new THREE.Vector3( 0, 0, 0 );

	this.domElement = ( domElement !== undefined ) ? domElement : document;

	this.enabled = true;

	this.movementSpeed = 5; //gameStat.player.movementSpeed; //speed by one movement

	this.moveUp = false;
	this.moveDown = false;
	this.moveLeft = false;
	this.moveRight = false;

	this.shoot = false;
	this.getBomb = false;
	this.mouseDragOn = false;
	this.slowMotion = false;
	this.esc = false;

	let kx = 0;
	let ky = 0;

	// for tab in canvas and have control camera
	if ( this.domElement !== document ) {

		this.domElement.setAttribute( 'tabindex', -1 );

	}

	this.onMouseDown = function ( event ) {

		if ( this.enabled === false ) return;

		if ( this.domElement !== document ) {

			this.domElement.focus();

		}

		// console.log(event);
		console.log('Mouse down ' + event.target)
		event.preventDefault();
		event.stopPropagation();
		
		switch ( event.button ) {

			case 0: this.shoot = true; break; 
			case 2: this.getBomb = true; break;

		}

		this.mouseDragOn = true;

	};

	this.onMouseUp = function ( event ) {

		if ( this.enabled === false ) return;
		// console.log('Mouse up ' + event.target);
		event.preventDefault();
		event.stopPropagation();

		switch ( event.button ) {

			case 0: this.shoot = false; break;
			case 2: this.getBomb = false; break;

		}

		this.mouseDragOn = false;

	};

	this.onKeyDown = function ( event ) {

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


	let speedUp = function(posObj, axis, k) {
		
		if( k * posObj.currentAngle[axis] < Math.PI / 16) {
			posObj.currentAngle[axis] += k * Math.PI / 256;
		};

		if( k * posObj.currentSpeed[axis] < 2 ) {
			posObj.currentSpeed[axis] += k * 0.4 ;
		};
	}

	let speedDown = function(posObj, axis, k) {

		if( k * posObj.currentAngle[axis] > 0) {
			posObj.currentAngle[axis] -= k * Math.PI / 256;
		};

		if( k * posObj.currentSpeed[axis] > 0) {
			posObj.currentSpeed[axis] -= k * 0.4 ;
		};

		if (k * posObj.currentSpeed[axis] < 0) {
			posObj.currentSpeed[axis] = 0;
		}
	}

	this.update = function(posObj, option) {

		if ( this.enabled === false ) return;

		if ( this.moveLeft ) {
			kx = -1;
			speedUp(posObj,"x",kx);

		} else if ( this.moveRight ) {
			kx = 1;
			speedUp(posObj,"x",kx);

		} else {
			speedDown(posObj,"x",kx);
		}

		if ( this.moveUp ) {
			ky = 1;
			speedUp(posObj,"y",ky);

		} else if ( this.moveDown ) {
			ky = -1;
			speedUp(posObj,"y",ky);

		} else {
			speedDown(posObj,"y",ky);
		}

		if (posObj.currentSpeed.x) posObj.targetPos.x = Math.max(-option.dX, Math.min(option.dX, posObj.targetPos.x + posObj.currentSpeed.x));
		// if (posObj.currentSpeed.x) posObj.targetPos.x += posObj.currentSpeed.x;
		// if (posObj.currentSpeed.y) posObj.targetPos.y += posObj.currentSpeed.y;
		if (posObj.currentSpeed.y) posObj.targetPos.y = Math.max(option.minY, Math.min(option.maxY, posObj.targetPos.y + posObj.currentSpeed.y));
	};

	this.addListeners = function() {
		// console.log('try to add click listeners');
		document.addEventListener( 'contextmenu', function ( event ) { event.preventDefault(); }, false );

		// console.log(document);

		document.addEventListener( 'mousedown', this.onMouseDown.bind(this), false );
		// console.log(this.onMouseDown.bind(this));
		// console.log(this.onMouseDown);

		document.addEventListener( 'mouseup', this.onMouseUp.bind(this), false );


		document.addEventListener( 'keydown', this.onKeyDown.bind(this), false );
		document.addEventListener( 'keyup', this.onKeyUp.bind(this), false );
	};

	this.enabled = false;

	this.removeListeners = function() {
		// console.log('try to remove click listeners');
		document.removeEventListener( 'contextmenu', function ( event ) { event.preventDefault(); }, false );
		
		document.removeEventListener( 'mousedown', this.onMouseDown, false );
		document.removeEventListener( 'mouseup', this.onMouseUp, false );
		// console.log(this.onMouseDown.bind(this));
		// console.log(this.onMouseDown);
		
		document.removeEventListener( 'keydown', this.onKeyDown, false );
		document.removeEventListener( 'keyup', this.onKeyUp, false );

	};
	// this.addListeners();

};

