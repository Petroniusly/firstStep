/**
 * @author petroniusly /blinkovpag@gmail.com
 * 
 */

import * as THREE from 'three';
import BasicMesh from '../../basicMethods/basic.mesh';
import Geometry from './turrel-gun.geometry';
import Material from './turrel-gun.material';

export default class TurrelGunMesh extends BasicMesh {
    constructor (geometry, material) {
        
        geometry = (geometry !== undefined) ? geometry : new Geometry();
        material = (material !== undefined) ? material : new Material();

        super(geometry, material);

        this.setCastShadow();
        return this;
    }
}