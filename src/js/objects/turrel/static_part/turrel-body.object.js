/**
 * @author petroniusly /blinkovpag@gmail.com
 * Create turrel-body object;
 */

import * as THREE from 'three';
import BasicObject from '../../basicMethods/basic.object';
import TurrelBodyMesh from './turrel-body.mesh';

export default class TurrelBody extends BasicObject {
    
    constructor () {
        super();
            
        this
        .setName('turrel-body');
    }
    
    setInstance() {
        this.add(new TurrelBodyMesh());
    }
}