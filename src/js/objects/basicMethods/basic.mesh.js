/**
 * @author petroniusly /blinkovpag@gmail.com
 * Basic methods for meshs;
 */

import * as THREE from 'three';

export default class BasicMesh extends THREE.Mesh{
    constructor (...args) {
        super(...args);
        // this.clone = super.clone;
    }

    clone(...args) {
        return super.clone(...args);
    }

    setRandomFaces() {
        // set individual color for each face;
        for ( let i = 0; i < this.geometry.faces.length; i++) {
            this.geometry.faces[i].color.setRGB(Math.random(), Math.random(), Math.random() );  
        }
        this.setMatVertex();
        this.geometry.groupsNeedUpdate = true;

        return this;
    }

    setReceiveShadow() {
        this.receiveShadow = true;

        return this;
    }

    setCastShadow() {
        this.castShadow = true;

        return this;
    }

    setMatVertex() {
        this.material.vertexColors = THREE.FaceColors;
        this.material.color.setRGB(1,1,1);

        return this;
    }

    setMatWireframe(){
        this.material.wireframe = true;

        return this;
    }

}