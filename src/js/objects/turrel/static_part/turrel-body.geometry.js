/**
 * @author petroniusly /blinkovpag@gmail.com
 * 
 */

import * as THREE from 'three';
import BasicMergeGeometry from '../../basicMethods/basic.merge.geometry';

export default class TurrelBodyGeometry extends BasicMergeGeometry{
    constructor () {

        super();

        this
        .mergeChain(this.createHead())
        .mergeChain(this.createBase())
        .mergeChain(this.createHeadBase());

        return this;
    };

    createHead() {
        let headGeom = new THREE.SphereGeometry(10, 8, 8, 0, 2 * Math.PI, 0, Math.PI / 2);

        return headGeom;
    }

    createBase() {
        let baseGeom = new THREE.CylinderGeometry( 6, 12, 40, 8 );
        baseGeom.translate(0,-20,0);

        return baseGeom;
    }

    createHeadBase() {
        let headBaseGeom = new THREE.CircleGeometry( 10, 8 );
        headBaseGeom.rotateX(Math.PI / 2);
        
        return headBaseGeom;
    }

}