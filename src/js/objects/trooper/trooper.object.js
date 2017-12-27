/**
 * @author petroniusly /blinkovpag@gmail.com
 * Create trooper object;
 */

import * as THREE from 'three';
import BasicObject from '../basicMethods/basic.object';
import TrooperMesh from './trooper.mesh';

export default class Trooper extends BasicObject {
    
    constructor () {
        super();
            
        this
        .createData()
        .setName('trooper');
    }
    
    setInstance() {
        this.add(new TrooperMesh());
    }
}
