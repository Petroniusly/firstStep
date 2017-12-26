/**
 * @author petroniusly /blinkovpag@gmail.com
 * Player state;
 */

import * as THREE from 'three';

export default class BasicMesh extends THREE.Mesh {
    constructor () {
        super();
    }

    getRandomFaces() {
        // set individual color for each face;
        for ( let i = 0; i < this.geometry.faces.length; i++) {
            this.geometry.faces[i].color.setRGB(Math.random(), Math.random(), Math.random() );  
        }
        this.getMatVertex();
        // this.geometry.elementsNeedUpdate = true;

        return this;
    }

    getReceiveShadow() {
        this.receiveShadow = true;

        return this;
    }

    getMatWireframe(){
        this.material.wireframe = true;

        return this;
    }

    getMatVertex() {
        this.material.vertexColors = THREE.FaceColors;

        return this;
    }
}