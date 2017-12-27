/**
 * @author petroniusly /blinkovpag@gmail.com
 * 
 */

import * as THREE from 'three';
import BasicMesh from '../basicMethods/basic.mesh';
import Geometry from './planet.geometry';
import Material from './planet.material';

export default class PlanetMesh extends BasicMesh {
    constructor (geometry, material) {
        
        geometry = (geometry !== undefined) ? geometry : new Geometry();
        material = (material !== undefined) ? material : new Material();

        super(geometry, material);

        //set flag to update vertices before rendering
        this.verticesNeedUpdate = true;

        this.setReceiveShadow();
        // this.setRandomFaces();
        // this.setMatWireframe();

        //console.log(this);
        return this;
    }
}