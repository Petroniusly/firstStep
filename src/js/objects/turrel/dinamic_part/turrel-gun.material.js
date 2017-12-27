/**
 * @author petroniusly /blinkovpag@gmail.com
 * 
 */

import * as THREE from 'three';
import TurrelBodyMaterial from '../static_part/turrel-body.material';

export default class TurrelGunMaterial extends TurrelBodyMaterial{ //THREE.MeshPhongMaterial
    constructor () {
        //now it is copy of body;
        super();
        return this;
    }
}
