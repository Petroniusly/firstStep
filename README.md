Game sources
newest version look at https://github.com/Petroniusly/firstStep/tree/master/src/js

Usage:
 Webpack with boilerplate-threejs-es6-webpack from edap https://github.com/edap/boilerplate-threejs-es6-webpack

 Three.js from mrdoob https://github.com/mrdoob/three.js;
  
 Stat.js from mrdoob https://github.com/mrdoob/stats.js/;
  
 Gui.js from dataarts https://github.com/dataarts/dat.gui;
  
 PointerLock API https://developer.mozilla.org/en-US/docs/Web/API/Pointer_Lock_API
 - realized in MouseMoveController;
 modified version FirstPersonControls from mrdoob https://github.com/mrdoob/three.js/blob/master/examples/js/controls/FirstPersonControls.js 
 - realized in ClickController;

Guides:
 Linear Math for begginers from https://habrahabr.ru/post/131931/ (ru);
 Three.js examples from https://threejs.org/examples/;

 Performance/decrease calculating steps/mergeMesh:
 - http://blog.sandromartis.com/2016/11/16/merging-geometries/
 create one geometry to apply Matrix at once, not for every Geometry. 
 Not work with BufferGeometry;
 
 Performance/save memory/cloneMesh
 - https://github.com/mrdoob/three.js/blob/master/src/objects/Mesh.js 
 method clone() - clone Object3D create deep copy till Mesh. For the Mesh it create link to this.geometry/this.material. If you need another/independence geometry and/or material - create new instance of current class;
 
 Performance/decrease calcilating points/mergeVertices
 -  https://github.com/mrdoob/three.js/blob/master/src/core/Geometry.js 
 method mergeVertices() - create verticesMap, find unique vertices and save it to verticesMap and remove duplicate vertices. 
 After set the propertie verticesNeedUpdate to true for update vertices;

Ideas:
 Making of Aviator Part 1 https://tproger.ru/translations/the-aviator-game-1/ (ru);
 and Part 2 https://tproger.ru/translations/the-aviator-game-2/ (ru);
 Game HEXGL from http://hexgl.bkcore.com/play/ (looking code sources for buildings archtecture of game window);


