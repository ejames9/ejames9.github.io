
/*
ericFosterIO.js javascript file for my portfolio site.
Author: Eric Foster
*/


//elementsJS imports
use 'elementsJS' go, info, log, el, inspect, scroll
use 'three' as THREE
use 'underscore' as __
use 'moment' as moment

use '../../src/js/CSS3DRenderer'
use '../../src/js/TrackballControls'
use '../../src/js/OrbitControls'


//globals..
var scene,
    camera,
    clock,
    controls,
    css3DRenderer;

var initScene = function () {
  // set the scene size
  var width = window.innerWidth,
      height = window.innerHeight;
  // set some camera attributes
  var fov = 45,
      aspect = width / height,
      near = 0.1,
      far = 1000;
  // get the DOM element to attach to
  var _container = <'#threejs'>;

  //css3DRenderer.
  css3DRenderer = new THREE.CSS3DRenderer();
  css3DRenderer.setSize(width, height);


  //Setting up the camera.
  camera = new THREE.PerspectiveCamera(fov, width / height, near, far);
  scene = new THREE.Scene();
  // add the camera to the scene
  scene.add(camera);
  // the camera starts at 0,0,0, so pull it back
  camera.position.z = 800;
  camera.position.x = 500;
  camera.position.y = 700;
  camera.lookAt(scene.position);

  controls = new THREE.OrbitControls(camera);
  controls.autoRotate = true;

  clock = new THREE.Clock();

  controls.rotateSpeed          = 2.0;
	controls.zoomSpeed            = 2.0;
	controls.panSpeed             = 1.5;
	controls.enableZoom           = false;
	controls.enablePan            = false;
	controls.staticMoving         = true;
	// controls.dynamicDampingFactor = 0.3;
	// controls.keys                 = [ 65, 83, 68 ];
	// controls.addEventListener( 'change', animate );


  // attach the render-supplied DOM element
  _container.appendChild(css3DRenderer.domElement);
}

function createCSS3DObject(s) {
     // create outerdiv and set inner HTML from supplied string
     var div = document.createElement('div');
     div.innerHTML = s;
     //set some values on the div to style it, standard CSS
    //  div.style.width = '370px';
    //  div.style.height = '370px';
     div.style.opacity = '.7';


     // create a CSS3Dobject and return it.
     var object = new THREE.CSS3DObject(div);
     return object;
}

function createSides(s, geometry) {
    // iterate over all the sides
    for (var iFace = 0;
      iFace < geometry.faces.length; iFace += 2) {
      // create a new object based on the supplied HTML String
      var side = createCSS3DObject(s);
      // get this face and the next which both make the cube
      var face = geometry.faces[iFace];
      var faceNext = geometry.faces[iFace + 1];
      // reposition the sides using the center of the faces
      var centroid = new THREE.Vector3();
      centroid.copy( geometry.vertices[face.a] )
        .add( geometry.vertices[face.b] )
        .add( geometry.vertices[face.c] )
        .add( geometry.vertices[faceNext.a] )
        .add( geometry.vertices[faceNext.b] )
        .add( geometry.vertices[faceNext.c] )
        .divideScalar( 6 );
      side.position.x = centroid.x;
      side.position.y = centroid.y;
      side.position.z = centroid.z;

      // Calculate and apply the rotation for this side
      var up = new THREE.Vector3(0, 0, 1);
      var normal = geometry.faces[iFace].normal;
      // We calculate the axis on which to rotate by
      // selecting the cross of the vectors
      var axis = new THREE.Vector3();
      axis.crossVectors(up, normal);
      var a = axis.crossVectors(up, normal);
      // based on the axis, in relation to our normal vector
      // we can calculate the angle.
      var angle = Math.atan2(axis.length(), up.dot(normal));
      axis.normalize();
      // now we can use matrix function to rotate the object so
      // it is aligned with the normal from the face
      var matrix4 = new THREE.Matrix4();
      matrix4.makeRotationAxis(axis, angle);
      // apply the rotation
      side.rotation.setFromRotationMatrix(matrix4);

      // add to the scene
      scene.add(side);
 }
}



var animate = function() {
  //update OrbitControls
  controls.update(clock.getDelta());
  //renderer
  css3DRenderer.render(scene, camera);
  //animation function
  requestAnimationFrame( animate );
}




var iframe = '<iframe width="600" height="600" frameborder="0"' +
     ' style="border:0" src="{URL}"></iframe>';
var eJSURL = 'http://elementsjs.io',
      html = <html/>.el;


go(()=> {
  //affix mainNav to top upon scroll.
  scroll(window, (e)=> {
    //Affix to top.
    if (<body/>.scrolled() > 700) {
      <'#meBrand'/>
              .fontSize('42px')
              .top('8px');
      <'#mainNav li a'/>
              .every((element)=> {
                element
                   .fontSize('36px')
              });
      <'#mainNav'/>
              .position('absolute')
              .top('-5px')
              .right('25px');
      <'#header'/>
              .height('70px')
              .bgColor('black')
              .opacity('.6');

    } else {
      //Release.
      <'#meBrand'/>
              .fontSize('101px')
              .top('25px');
      <'#mainNav li a'/>
              .every((element)=> {
                element
                   .fontSize('46px')
              });
      <'#mainNav'/>
              .position('')
              .top('')
              .right('');
      <'#header'/>
              .height('')
              .bgColor('')
              .opacity('');
    }
  });
  //Set site wrapper to window parameters.
  <'#wrapper'/>
            .size(String(window.innerHeight) + 'px', String(window.innerWidth) + 'px');
  //set up three.js scene.
  initScene();
  createSides(iframe.replace('{URL}', eJSURL), new THREE.CubeGeometry(600,600,600));

  animate();
});
