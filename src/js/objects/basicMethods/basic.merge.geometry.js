/**
 * @author petroniusly /blinkovpag@gmail.com
 * Basic methods for geometry with using merge;
 */

import * as THREE from 'three';

export default class BasicMergeGeometry extends THREE.Geometry{
    constructor () {
        super();
    }

    mergeChain(geom) {
        this.merge(geom);
        return this;
    }
}