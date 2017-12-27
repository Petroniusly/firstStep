/**
 * @author Petroniusly / blinkovpag@gmail.com
 * based on PointerLockControls from mrdoob example;
 * @author mrdoob / http://mrdoob.com/
 */

import * as THREE from 'three';

export default class {
    constructor () {
        this.enabled = false;
        this.movementX = 0;
        this.movementY = 0;
    }

    onMouseMove(event) {
        if ( this.enabled === false ) return;

        this.movementX = event.movementX || 0;
        this.movementY = event.movementY || 0;

        // if (this.movementX) {console.log(this.movementX)};
        // if (this.movementY) {console.log(this.movementY)};
    }

    clearMovement() {
        this.movementX = 0;
        this.movementY = 0;
    }
        
    addListeners() {
        // console.log('try to add mouse listeners');
        document.addEventListener( 'mousemove', this.onMouseMove.bind(this), false );
    };

    removeListeners() {
        // console.log('try to remove mouse listeners');
        document.removeEventListener( 'mousemove', this.onMouseMove, false );
    };
};
