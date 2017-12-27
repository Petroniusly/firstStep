/**
 * @author petroniusly /blinkovpag@gmail.com
 * Use pattern Singleton;
 */

import * as THREE from 'three';
import BasicObject from '../basicMethods/basic.object';
import PlanetMesh from './planet.mesh';

let instance = null;

export default class Planet extends BasicObject {

    constructor () {
        if (!instance) {
            super();
            this.setName('planet')(0);
            this.add(new PlanetMesh());
            instance = this;
        }
      
        return instance;
    };
}