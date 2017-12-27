/**
 * @author petroniusly /blinkovpag@gmail.com
 * Create turrel object;
 */

import * as THREE from 'three';
import BasicObject from '../basicMethods/basic.object';
import TurrelBody from './static_part/turrel-body.object';
import TurrelGun from './dinamic_part/turrel-gun.object';


export default class Turrel extends BasicObject {
    
    constructor () {
        super();
            
        this
        .setName('turrel');
    }
    
    setInstance() {
        this.add(new TurrelBody);
        this.add(new TurrelGun);
        for (let i = 0; i < this.children.length; i++) {
            this.children[i].setInstance();
        }
    }
}