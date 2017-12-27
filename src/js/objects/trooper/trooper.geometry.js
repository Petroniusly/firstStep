/**
 * @author petroniusly /blinkovpag@gmail.com
 * 
 */

import * as THREE from 'three';
import BasicGeometry from '../basicMethods/basic.geometry';

export default class TrooperGeometry extends BasicGeometry{
    constructor () {

        super();

        this.mergeChain(this.createHead())
        .mergeChain(this.createArm(true))
        .mergeChain(this.createArm(false))
        .mergeChain(this.createWing(true))
        .mergeChain(this.createWing(false));
        return this;
    };

    createHead() {
        let headGeom = new THREE.SphereGeometry(10,10,10);

        return headGeom;
    }

    createArm(toLeft) {
        let k = (toLeft) ? 1 : -1;
        let armGeom = new THREE.CylinderGeometry(6,2,12,8,2);
        armGeom.rotateZ(k * Math.PI / 2);
        armGeom.translate(k * 14,0,0);
        return armGeom;
    }

    createWing(toLeft) {
        let k = (toLeft) ? 1 : -1;

        let tempY = 10*Math.sin(Math.PI/3);

        let crestShape = new THREE.Shape();
        crestShape.moveTo(-10,0);
        crestShape.lineTo(-5,tempY);
        crestShape.lineTo(5,tempY);
        crestShape.lineTo(10,0);
        crestShape.lineTo(5,-tempY);
        crestShape.lineTo(-5,-tempY);
        crestShape.lineTo(-10,0);
        
        let wingGeom = new THREE.ExtrudeGeometry( crestShape, {
            steps: 1,
            amount: 0.5,
            bevelEnabled: true,
            bevelThickness: 0.5,
            bevelSize: 0.5,
            bevelSegments: 1
        });

        wingGeom.rotateY(Math.PI / 2);
        wingGeom.scale(1,2,2);
        wingGeom.translate(k * 21,0,0);

        return wingGeom;
    }
}