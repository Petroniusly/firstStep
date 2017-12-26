/**
 * @author petroniusly /blinkovpag@gmail.com
 * Player state;
 */

import * as THREE from 'three';
import * as options from './gameOptions';

export default class Player {

    constructor(camera) {
        this.zeroPosition = new THREE.Vector3();
        this.zeroVector = new THREE.Vector2();
        this.zeroEuler = new THREE.Euler(); 

        // this.movementSpeed = 20;
        this.currentPos = this.zeroPosition.clone(); //equal camera.position.x and y
        // this.targetPos = this.zeroVector.clone(); //change by moving 
        // this.deltaPos = this.zeroVector.clone(); //get delta
        this.currentSpeed = this.zeroVector.clone(); //current moving speed
        this.currentAngle = this.zeroVector.clone(); //current rotation on moving left/right, rotation around Y-axis AND current rotation on moving up/down, rotation around X-axis
        this.kx = 0;
        this.ky = 0;
        
        this.camera = camera;
        
        this.camera.rotation.set( 0, 0, 0 );

        this.pitchObject = new THREE.Object3D();
        this.pitchObject.add( this.camera );
        this.pitchObject.position.add(this.zeroPosition);

        this.yawObject = new THREE.Object3D();
        this.yawObject.position.y = 10; //-------------------------------------------------------------------------------------------------------------------------------
        this.yawObject.position.add(this.zeroPosition);
        this.yawObject.add( this.pitchObject );

        this.angleX = Math.PI / 5 ; //dinamic angle, approx from high
    }

    speedUp(axis, k) {
        if( k * this.currentAngle[axis] < Math.PI / 16) {
            this.currentAngle[axis] += k * Math.PI / 256;
        };
        if( k * this.currentSpeed[axis] < 2 ) {
            this.currentSpeed[axis] += k * 0.4 ;
        };
    }

    speedDown(axis, k) {
        if( k * this.currentAngle[axis] > 0) {
            this.currentAngle[axis] -= k * Math.PI / 256;
        };
        if( k * this.currentSpeed[axis] > 0) {
            this.currentSpeed[axis] -= k * 0.4 ;
        };
        if (k * this.currentSpeed[axis] < 0) {
            this.currentSpeed[axis] = 0;
        }
    }

    update(clicks, mouse) {

        // if ( clicks.enabled === false ) return;

        if ( clicks.moveLeft ) {
            this.kx = -1;
            this.speedUp("x",this.kx);

        } else if ( clicks.moveRight ) {
            this.kx = 1;
            this.speedUp("x",this.kx);

        } else {
            this.speedDown("x",this.kx);
        }

        if ( clicks.moveUp ) {
            this.ky = 1;
            this.speedUp("y",this.ky);

        } else if ( clicks.moveDown ) {
            this.ky = -1;
            this.speedUp("y",this.ky);

        } else {
            this.speedDown("y",this.ky);
        }

        //set new position
        if (this.currentSpeed.x) this.currentPos.x = Math.max(-options.dX, Math.min(options.dX, this.currentPos.x + this.currentSpeed.x));
        if (this.currentSpeed.y) this.currentPos.y = Math.max(options.minY, Math.min(options.maxY, this.currentPos.y + this.currentSpeed.y));
        
        // it is for dev mode with ulimited position
        // if (this.currentSpeed.x) this.currentPos.x += this.currentSpeed.x;
        // if (this.currentSpeed.y) this.currentPos.y += this.currentSpeed.y;

        this.yawObject.position.x = this.currentPos.x;
        this.yawObject.position.y = this.currentPos.y;
        this.angleX = Math.PI / (5 + this.yawObject.position.y / 120) ; // set angle = Math.PI / 12 ... Math.PI / 24 bethween high 0...120
        this.onMouseMove(mouse);
        this.camera.rotation.set(this.currentAngle.y, 0, -this.currentAngle.x);
    };
 
    //logic from onMouseMOve method;
    onMouseMove(mouse){
        this.yawObject.rotation.y -= mouse.movementX * 0.002;
        this.pitchObject.rotation.x -= mouse.movementY * 0.002;
        
        this.updateRotationX ()
        this.updateRotationY();  // horizontal range rotation
    };
    
    updateRotationY () {
        this.yawObject.rotation.y = Math.max( - this.angleX, Math.min( this.angleX, this.yawObject.rotation.y ) );
    }

    updateRotationX () {
        this.pitchObject.rotation.x = Math.max( options.minAngleY, Math.min( options.maxAngleY, this.pitchObject.rotation.x ) );  // vertical range rotation
    }

    getObject () {
        return this.yawObject;
    };

    flip() {
        this.yawObject.rotation.x += Math.PI / 80;
    }

    clearPosition() {
        this.yawObject.rotation.copy(this.zeroEuler);
        this.pitchObject.rotation.x = 0;
        this.camera.rotation.copy(this.zeroEuler);
        this.yawObject.position.copy(this.zeroPosition);
        this.currentPos.copy(this.zeroVector);
        this.currentAngle.copy(this.zeroVector);
        this.currentSpeed.copy(this.zeroVector);
    }

    getDirection () {
        // assumes the camera itself is not rotated
        let direction = new THREE.Vector3( 0, 0, - 1 );
        let rotation = new THREE.Euler( 0, 0, 0, "YXZ" );

        rotation.set( this.pitchObject.rotation.x, this.yawObject.rotation.y, 0 );
        return direction.applyEuler( rotation );
    };
}