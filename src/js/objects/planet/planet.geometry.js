/**
 * @author petroniusly /blinkovpag@gmail.com
 * 
 */

import * as THREE from 'three';

export default class PlanetGeometry extends THREE.LatheGeometry{
    constructor () {

        // create the geometry (shape) of the lathe;
        // loop for custom planet high;
        // before create array function x = f(y) with more density near y-axis;
    
        let points = [];
        let x = 0;
        for ( let i = 0; i < 20; i ++ ) {
            // x = (i < 15) ? i - 15 : ( 14 < i & i < 23) ? (i - 18) / 4 : i - 22;
            x = (i < 6) ? (i - 6) * 4 : (i < 14) ? (i - 9) : (i - 13) * 4;
            points.push( new THREE.Vector2( Math.sqrt(1 - x * x / 1024) * 400 , 50 * x));
        }
        
        // create LatheGeometry
        super(points, 80, 0 , 2 * Math.PI );
        
        // merge vertices (exclude double vertices in one point for all faces)
        this.mergeVertices();

        // rotate the geometry on the x axis
        this.applyMatrix(new THREE.Matrix4().makeRotationZ(-Math.PI/2));

        this.getRandomHigh();
        
        // console.log(this);
        return this;
    }

    getRandomHigh() {
        // randomise high of our planet and write all vertises near z-axis in enemyArray;
        let l = this.vertices.length;
        let n = 0;
    
        for (let j = 0; j < l; j++) {
            // get each vertex
            let v = this.vertices[j];
            
            //get normalize vector in point of vertice from x-axis
            let norm = new THREE.Vector3(0, v.y , v.z).normalize();
            
            // get random high from x-axis bethween -10 and +10 from high before
            this.vertices[j].addScaledVector(norm, (Math.random() - 0.5)*30);
        };

        return this;
    }  
}  
