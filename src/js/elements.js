/**
* @author petroniusly 
* contain all active elements to interactive on page
*/


export const gameInterface = document.getElementById('gameInterface');
export const gameMenu = document.getElementById('gameMenu');
export const pauseMenu = document.getElementById('gameMenu__pause');
export const scoreMenu = document.getElementById('gameMenu__score');
export const mainMenu = document.getElementById('gameMenu__main');

//-------------------------------gameInterface-------------------------------------------//
export const timer = document.getElementById('time');
export const scoreTime = document.getElementById('score');

//-------------------------------start buttons-------------------------------------------//
export const start = document.getElementById('gameMenu__start');  //change to select by class
export const start2 = document.getElementById('score__start');

//-------------------------------continue button-----------------------------------------//
export const continued = document.getElementById('pause__button');

//-------------------------------go back to main-menu button-----------------------------//
export const backToMain2 = document.getElementById('score__goBack');
export const backToMain = document.getElementById('showmenu__button');
