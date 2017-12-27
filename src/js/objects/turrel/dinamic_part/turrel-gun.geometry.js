/**
 * @author petroniusly /blinkovpag@gmail.com
 * 
 */

import * as THREE from 'three';
import BasicMergeGeometry from '../../basicMethods/basic.merge.geometry';

export default class TurrelGunGeometry extends BasicMergeGeometry{
    constructor () {
        super();

        this
        .mergeChain(this.setGunGeom(true))
        .mergeChain(this.setGunGeom(false));

        return this;
    };

    setGunGeom(left) {
        let gunGeom = new THREE.CylinderGeometry( 2, 2, 20, 8 );
        let k = left ? -1 : 1;
        gunGeom.translate(k * 3,12,-2);
        gunGeom.rotateX(Math.PI / 2);
        return gunGeom;
    }
}