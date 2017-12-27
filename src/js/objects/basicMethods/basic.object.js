/**
 * @author petroniusly /blinkovpag@gmail.com
 * Player state;
 */

import * as THREE from 'three';

export default class BasicObject extends THREE.Object3D{
    constructor () {
        super();
    }

    createData() {
        //tw - time weit a pause between two same acts
        this.userData.tw = 0;
        //n - a quantity of acts;
        this.userData.n = 0;
        //create vector that look to cam
        this.userData.dirToCam = new THREE.Vector3();

        return this;
    }

    setName(name) {
        let that = this;
        return that.setName = function(i) {
            that.name = name + '-' + i;
        };
    }

    setInstance() {
        //it will be redefined in inheritors
    }

    clearInstance() {
        if (this.children.length < 0) return this;
        for (let i =0; i < this.children.length; i++){
            this.children[i].remove();
        }   
        return this;
    }
}