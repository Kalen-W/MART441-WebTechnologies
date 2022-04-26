//--------------------------------------------------------------------------------------------------------------------------------|Setup
// Scene
var scene = new THREE.Scene();
scene.background = new THREE.Color( 0x050608 );

// Camera
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
camera.position.set( 0, 0, 8 );
camera.lookAt( 0, 0, 0 );

// Light
var light = new THREE.PointLight( 0xf0f2f6, 1, 0 );
light.position.set( 6, 4, 4 );
scene.add( light );

// Amient Light
var ambientLight = new THREE.AmbientLight( 0x151517 );
scene.add( ambientLight );

// Renderer
var renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
renderer.setPixelRatio( window.devicePixelRation );
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setClearColor( 0x060709 );
document.body.appendChild( renderer.domElement );




//--------------------------------------------------------------------------------------------------------------------------------|Variables
pause = false;




//--------------------------------------------------------------------------------------------------------------------------------|Geometry
// Basic Cube
// var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
var material = new THREE.MeshLambertMaterial({ color: 0x1ca648 });
var geometry = new THREE.BoxBufferGeometry( 1.4, 1.4, 1.4 );
var cube = new THREE.Mesh( geometry, material );
scene.add( cube );


// Basic Torus
var material_torus = new THREE.MeshLambertMaterial({ color: 0x426d88 });
var geometry_torus = new THREE.TorusBufferGeometry( 0.9, 0.34, 8, 12 );
var torus = new THREE.Mesh( geometry_torus, material_torus );
torus.position.set( 3.2, 0, 0 );
scene.add( torus );


// Basic Line
var material2 = new THREE.LineBasicMaterial({ color: 0x0000ff });
var points = [];
points.push( new THREE.Vector3(-  0.5,    5.5,    0.0) );
points.push( new THREE.Vector3(   2.0,    5.5,    0.0) );
points.push( new THREE.Vector3(   2.0,    3.0,    0.0) );
points.push( new THREE.Vector3(   0.0,    3.0,    0.0) );
points.push( new THREE.Vector3(   0.0,    1.2,    0.0) );

var geometry2 = new THREE.BufferGeometry().setFromPoints( points );
var line = new THREE.Line( geometry2, material2 );
scene.add( line );


// Basic Line 2
var points2 = [];
points2.push( new THREE.Vector3(-  1.2,-   1.2,    0.0) );
points2.push( new THREE.Vector3(   1.2,-   1.2,    0.0) );
points2.push( new THREE.Vector3(   1.2,    1.2,    0.0) );
points2.push( new THREE.Vector3(-  1.2,    1.2,    0.0) );
points2.push( new THREE.Vector3(-  1.2,-   1.2,    0.0) );

var geometry_line2 = new THREE.BufferGeometry().setFromPoints( points2 );
var line2 = new THREE.Line( geometry_line2, material2 );
scene.add( line2 );

var line3 = new THREE.Line( geometry_line2, material2 );
line3.rotation.y = Math.PI/2;
scene.add( line3 );


// Basic Plane
var material3 = new THREE.MeshLambertMaterial({ color: 0x605040, side: THREE.DoubleSide });
var geometry3 = new THREE.PlaneGeometry( 10, 6 );
var plane = new THREE.Mesh( geometry3, material3 );
plane.rotation.x = Math.PI / 2;
plane.position.set( 0, -1.26, 0 );
scene.add( plane );




//--------------------------------------------------------------------------------------------------------------------------------|Text
/*var loader = new THREE.FontLoader();
loader.load( './assets/fonts/VT323-Regular.ttf', function(font) {
  var geometry = new THREE.TextGeometry('three.js Test...', {
    font: font,
    size: 80,
    height: 5,
    curveSegments: 12,
    bevelEnabled: true,
    bevelThickness: 10,
    bevelSize: 8,
    bevelOffset: 0,
    bevelSegments: 5
  });
});*/




//--------------------------------------------------------------------------------------------------------------------------------|Load Model
var appleModel = undefined;
function loadModel() {
  var loader = new THREE.OBJLoader();
  loader.load( './assets/models/apple.obj', function( object ) {
    // object.rotation.z = 0;
    object.scale.set( 0.52, 0.52, 0.52 );
    object.position.set( -3.2, 0, 0 );
    // scene.add( object );

    appleModel = object;
    scene.add( appleModel );
    // console.log(appleModel);
  });
}




//--------------------------------------------------------------------------------------------------------------------------------|Controls
var controls = new THREE.TrackballControls( camera, renderer.domElement );
controls.zoomSpeed = 0.4;
controls.panSpeed = 0.4;

// var controls = new THREE.FlyControls( camera, renderer.domElement );
// controls.rollSpeed = 0.4;

// var draggable = [cube, line];
// var controls = new THREE.DragControls( draggable, camera, renderer.domElement );

var controlsNeedUpdate = true;




//--------------------------------------------------------------------------------------------------------------------------------|Event Listeners
document.addEventListener('keydown', (e) => {
  if (e.key == ' ') {
    pause = !pause;
    if (!pause) {
      renderer.render( scene, camera );
    }
  }
});




//--------------------------------------------------------------------------------------------------------------------------------|Render Loop
function render() {
  requestAnimationFrame( render );

  line.rotation.y -= 0.01;

  line2.rotation.x += 0.01;
  line3.rotation.y += 0.01;

  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  torus.rotation.x += 0.02;
  torus.rotation.y += 0.01;
  torus.rotation.z -= 0.02;

  if (typeof appleModel != 'undefined') {
    appleModel.rotation.x += 0.001;
    appleModel.rotation.z += 0.02;
  }

  if (pause) { return; }

  renderer.render( scene, camera );
  if (controlsNeedUpdate) { controls.update(); }
}




//--------------------------------------------------------------------------------------------------------------------------------|Initialize
loadModel();

render();
