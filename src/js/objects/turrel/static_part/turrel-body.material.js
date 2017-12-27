/**
 * @author petroniusly /blinkovpag@gmail.com
 * 
 */

import * as THREE from 'three';

export default class TurrelBodyMaterial extends THREE.MeshPhongMaterial{
    constructor () {
        super({
            color: 0xd0d0d0,
            transparent:false,
            opacity:1,
        });    
        return this;
    }
}
