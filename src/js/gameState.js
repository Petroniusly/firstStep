/**
 * @author petroniusly 
 * contain all dimanic property of game
 */

import * as THREE from 'three';
import {gR, gFr, gFl, mI, mP, mGO} from './gameOptions';

export let gameStat = { 
    // constructor() {
        //not in this release
        // this.fuel = 130; 			
        // this.circuit = 1;
        // this.bomb = 1;
        // this.slowMotionCard = 0;

        enemyArray : {
            turrelArray: [],
            turrelGunArray: [],
            trooperArray: [],
            //not in this release
            // achieveArray: [],
        },

        bulletArray : [],

        enemyQuantity : {
            turrel: 50,
            trooper: 10,
            //not in this release
            // achieves: 0,		
        },

        

        //not in this release
        //this.score = 0; 
        //this.time = new THREE.Clock(false);
        timeNow : 0,
        timeStart : 0,
        timeTotal : 0,
        timePause : 0,
        timeContinue : 0,
            
        isPlaying : false,
        isPaused : false,
        isKilled : false,
        currentWorldSpeed : 0,
        cS : 0,
    // };
};

// set gameStatesVariations
export const gameStates = {
    init: gR | mI,		//when game start - world rotate, nobody shoot, show main menu 
    play: gR | gFr,	    //when playing - rotate and shooting on
    pause: 0 | mP,		//when pause - no rotate and no shooting, show pause menu
    continue: gR | gFr,	//like play, but time not reset,
    killed: gR | gFl,	//player was killed, shooting off anf flip the camera on
    gameOver: gR | mGO, //like init, but not init the scene, show "game over" menu
};

// export let cS = 0; //current State at the moment
