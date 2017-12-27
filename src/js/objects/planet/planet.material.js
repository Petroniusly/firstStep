/**
 * @author petroniusly /blinkovpag@gmail.com
 * 
 */

import * as THREE from 'three';

export default class PlanetMaterial extends THREE.MeshPhongMaterial{
    constructor () {
        super({
            color: 0xf7d9aa, 
            transparent:true,
            opacity:1,
        });    
        return this;
    }
}