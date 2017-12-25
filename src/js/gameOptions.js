/**
 * @author petroniusly 
 * save State of game any frame
 */

import {Vector3} from 'three';

export const worldSpeed = Math.PI/60/1000; // get one circle in 120 sec
export const playerMovementSpeed = 20; //------------------------------------------------------------ experimental
export const bulletSpeed = 5;
export const bombSpeed = 15; //not in this release

export const dX = 120; //left/right borders of our position
export const minY = 0; //bottom border -//-
export const maxY = 120; //top border -//-
export const minAngleY = - Math.PI / 3;
export const maxAngleY = Math.PI / 3;

export const planetPosition = new Vector3 (0, -480, 0);

//gameStateOptions
export const gR = 1;	//game Rotation world on
export const gFr = 2;	//game Fire mode on
export const gFl = 4; 	//game Flip player mode on
