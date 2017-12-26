/**
 * @author petroniusly 
 * contain main options for balance the game
 */

import {Vector3} from 'three';

///speed options (not used yet)
export const worldSpeed = Math.PI/60/1000; // get one circle in 120 sec
export const playerMovementSpeed = 20; //------------------------------------------------------------ experimental
export const bulletSpeed = 5;
export const bombSpeed = 15; //not in this release

//player options
export const dX = 120; //left/right borders of our position
export const minY = 0; //bottom border -//-
export const maxY = 120; //top border -//-
export const minAngleY = - Math.PI / 3;
export const maxAngleY = Math.PI / 3;

//world position options
export const planetPosition = new Vector3 (0, -480, 0);

//gameStateOptions
export const gR = 1;	//game Rotation world on
export const gFr = 2;	//game Fire mode on
export const gFl = 4; 	//game Flip player mode on
//menuStateOptions
export const mI = 8;    //show main menu (init)
export const mP = 16;   //show pause menu 
export const mGO = 32;  //show "game over" menu
export const sM = mI -1;//don't show menu
