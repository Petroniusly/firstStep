/*
var blocker = document.getElementById( 'blocker' );
var instructions = document.getElementById( 'instructions' );

var element = document.body;

var pointerlockchange = function ( event ) {
    if ( document.pointerLockElement === element ) {
        controlsEnabled = true;
        controls.enabled = true;
        blocker.style.display = 'none';
    } else {
        controls.enabled = false;
        blocker.style.display = 'block';
        instructions.style.display = '';
    }
};
var pointerlockerror = function ( event ) {
    instructions.style.display = '';
};
// Hook pointer lock state change events
document.addEventListener( 'pointerlockchange', pointerlockchange, false );
document.addEventListener( 'pointerlockerror', pointerlockerror, false );

//Why we need click event before?
instructions.addEventListener( 'click', function ( event ) {
    instructions.style.display = 'none';
    // Ask the browser to lock the pointer
    element.requestPointerLock = element.requestPointerLock;
    element.requestPointerLock();
}, false );

init();
animate();
var controlsEnabled = false;
// var moveForward = false;
// var moveBackward = false;
// var moveLeft = false;
// var moveRight = false;
// var canJump = false;
var prevTime = performance.now();
var velocity = new THREE.Vector3();
var direction = new THREE.Vector3();



function init() {
    
    
    
    // raycaster = new THREE.Raycaster( new THREE.Vector3(), new THREE.Vector3( 0, - 1, 0 ), 0, 10 );
    // // floor
    // var floorGeometry = new THREE.PlaneGeometry( 2000, 2000, 100, 100 );
    // floorGeometry.rotateX( - Math.PI / 2 );
    // for ( var i = 0, l = floorGeometry.vertices.length; i < l; i ++ ) {
    //     var vertex = floorGeometry.vertices[ i ];
    //     vertex.x += Math.random() * 20 - 10;
    //     vertex.y += Math.random() * 2;
    //     vertex.z += Math.random() * 20 - 10;
    // }
    // for ( var i = 0, l = floorGeometry.faces.length; i < l; i ++ ) {
    //     var face = floorGeometry.faces[ i ];
    //     face.vertexColors[ 0 ] = new THREE.Color().setHSL( Math.random() * 0.3 + 0.5, 0.75, Math.random() * 0.25 + 0.75 );
    //     face.vertexColors[ 1 ] = new THREE.Color().setHSL( Math.random() * 0.3 + 0.5, 0.75, Math.random() * 0.25 + 0.75 );
    //     face.vertexColors[ 2 ] = new THREE.Color().setHSL( Math.random() * 0.3 + 0.5, 0.75, Math.random() * 0.25 + 0.75 );
    // }
    // var floorMaterial = new THREE.MeshBasicMaterial( { vertexColors: THREE.VertexColors } );
    // var floor = new THREE.Mesh( floorGeometry, floorMaterial );
    // scene.add( floor );



    // objects
    // var boxGeometry = new THREE.BoxGeometry( 20, 20, 20 );
    // for ( var i = 0, l = boxGeometry.faces.length; i < l; i ++ ) {
    //     var face = boxGeometry.faces[ i ];
    //     face.vertexColors[ 0 ] = new THREE.Color().setHSL( Math.random() * 0.3 + 0.5, 0.75, Math.random() * 0.25 + 0.75 );
    //     face.vertexColors[ 1 ] = new THREE.Color().setHSL( Math.random() * 0.3 + 0.5, 0.75, Math.random() * 0.25 + 0.75 );
    //     face.vertexColors[ 2 ] = new THREE.Color().setHSL( Math.random() * 0.3 + 0.5, 0.75, Math.random() * 0.25 + 0.75 );
    // }
    // for ( var i = 0; i < 500; i ++ ) {
    //     var boxMaterial = new THREE.MeshPhongMaterial( { specular: 0xffffff, flatShading: true, vertexColors: THREE.VertexColors } );
    //     boxMaterial.color.setHSL( Math.random() * 0.2 + 0.5, 0.75, Math.random() * 0.25 + 0.75 );
    //     var box = new THREE.Mesh( boxGeometry, boxMaterial );
    //     box.position.x = Math.floor( Math.random() * 20 - 10 ) * 20;
    //     box.position.y = Math.floor( Math.random() * 20 ) * 20 + 10;
    //     box.position.z = Math.floor( Math.random() * 20 - 10 ) * 20;
    //     scene.add( box );
    //     objects.push( box );
    // }
    //
}

function animate() {
    requestAnimationFrame( animate );
    if ( controlsEnabled === true ) {

        //Raycaster and intersection
        raycaster.ray.origin.copy( controls.getObject().position );
        raycaster.ray.origin.y -= 10;
        var intersections = raycaster.intersectObjects( objects );
        var onObject = intersections.length > 0;

        //
        var time = performance.now();
        var delta = ( time - prevTime ) / 1000;
        velocity.x -= velocity.x * 10.0 * delta;
        velocity.z -= velocity.z * 10.0 * delta;
        velocity.y -= 9.8 * 100.0 * delta; // 100.0 = mass
        direction.z = Number( moveForward ) - Number( moveBackward );
        direction.x = Number( moveLeft ) - Number( moveRight );
        direction.normalize(); // this ensures consistent movements in all directions

        //Moving
        if ( moveForward || moveBackward ) velocity.z -= direction.z * 400.0 * delta;
        if ( moveLeft || moveRight ) velocity.x -= direction.x * 400.0 * delta;
        
        //can jump only from objects
        if ( onObject === true ) {
            velocity.y = Math.max( 0, velocity.y );
            canJump = true;
        }


        controls.getObject().translateX( velocity.x * delta );
        controls.getObject().translateY( velocity.y * delta );
        controls.getObject().translateZ( velocity.z * delta );

        if ( controls.getObject().position.y < 10 ) {
            velocity.y = 0;
            controls.getObject().position.y = 10;
            canJump = true;
        }
        prevTime = time;
    }
    renderer.render( scene, camera );
}
*/

/**
 * @author mrdoob / http://mrdoob.com/
 * @author Petroniusly
 */

import * as THREE from 'three';

export const PointerLockControls = function ( camera ) {
    this.zeroPosition = new THREE.Vector3(0,0,0); 

    let scope = this;

    camera.rotation.set( 0, 0, 0 );
    this.posX = 0;
    this.posY = 0;

    let pitchObject = new THREE.Object3D();
    pitchObject.add( camera );
    pitchObject.position.add(this.zeroPosition);

    let yawObject = new THREE.Object3D();
    yawObject.position.y = 10;
    yawObject.position.add(this.zeroPosition);
    yawObject.add( pitchObject );
    

    let angleX = Math.PI / 5 ; //dinamic angle, approx from high
    let minAngleY = - Math.PI / 3;
    let maxAngleY = Math.PI / 3;

    let onMouseMove = function ( event ) {

        if ( scope.enabled === false ) return;

        let movementX = event.movementX || 0;
        let movementY = event.movementY || 0;

        yawObject.rotation.y -= movementX * 0.002;
        pitchObject.rotation.x -= movementY * 0.002;

        // apply angle range in radians between we can rotate the camera
        pitchObject.rotation.x = Math.max( minAngleY, Math.min( maxAngleY, pitchObject.rotation.x ) );  // vertical range rotation
        updateRotationY();  // horizontal range rotation


    };

    let updateRotationY = function () {
        yawObject.rotation.y = Math.max( - angleX, Math.min( angleX, yawObject.rotation.y ) );
    }

    this.updatePos = function (v) {
        yawObject.position.x = v.x;
        yawObject.position.y = v.y;
        angleX = Math.PI / (5 + yawObject.position.y / 120) ; // set angle = Math.PI / 12 ... Math.PI / 24 bethween high 0...120
        //refresh angle. Need implement func - update AngleX;
        updateRotationY();
    
    }


    this.removeListeners = function() {
        // console.log('try to remove mouse listeners');
        document.removeEventListener( 'mousemove', onMouseMove, false );
        // console.log(document);

    };

    this.addListeners = function() {
        // console.log('try to add mouse listeners');
        document.addEventListener( 'mousemove', onMouseMove, false );
        // console.log(document);
    };

    // this.addListeners() //----------------------------------------------------------
    this.enabled = false;

    this.getObject = function () {

        return yawObject;

    };

    this.getDirection = function() {

        // assumes the camera itself is not rotated

        let direction = new THREE.Vector3( 0, 0, - 1 );
        let rotation = new THREE.Euler( 0, 0, 0, "YXZ" );

        rotation.set( pitchObject.rotation.x, yawObject.rotation.y, 0 );

        return direction.applyEuler( rotation );

     
    };

};
