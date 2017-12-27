/**
 * @author petroniusly /blinkovpag@gmail.com
 * Basic methods for geometry;
 */

import * as THREE from 'three';

export default class BasicGeometry extends THREE.Geometry{
    constructor () {
        super();
    }

    mergeChain(geom) {
        this.merge(geom);
        return this;
    }
}