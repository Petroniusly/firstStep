/**
 * @author petroniusly /blinkovpag@gmail.com
 * Create turrel-body object;
 */

import * as THREE from 'three';
import BasicObject from '../../basicMethods/basic.object';
import TurrelGunMesh from './turrel-gun.mesh';

export default class TurrelGun extends BasicObject {
    
    constructor () {
        super();
            
        this
        .createData()
        .setName('turrel-gun');
    }
    
    setInstance() {
        this.add(new TurrelGunMesh());
    }
}