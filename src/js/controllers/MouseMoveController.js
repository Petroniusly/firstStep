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
 * @author Petroniusly / blinkovpag@gmail.com
 * based on PointerLockControls from mrdoob example;
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
    }
        
    addListeners() {
        // console.log('try to add mouse listeners');
        document.addEventListener( 'mousemove', this.onMouseMove.bind(this), false );
        // console.log(document);
    };

    removeListeners() {
        // console.log('try to remove mouse listeners');
        document.removeEventListener( 'mousemove', this.onMouseMove, false );
        // console.log(document);
    };
};
