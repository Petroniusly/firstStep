/**
 * @author petroniusly /blinkovpag@gmail.com
 * 
 */

import * as THREE from 'three';

export default class TrooperMaterial extends THREE.MeshPhongMaterial{
    constructor () {
        super({
            color: 0x1f1f1f,
            // metalness: 0.5,
            // roughness: 0.1,
            opacity: 0.20,
            transparent: true,
            opacity:1,
            reflectivity: 1,
            // refractionRatio: 0.4,
            shininess: 0.8,
            specular:1,
        });    
        return this;
    }
}