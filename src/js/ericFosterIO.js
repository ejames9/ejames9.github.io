
/*
ericFosterIO.js javascript file for my portfolio site.
Author: Eric Foster
*/


//elementsJS imports
use 'elementsJS' go, info, log, el, inspect, scroll
use 'three' as THREE
use 'tween.js' as TWEEN
use 'underscore' as __
use 'moment' as moment

use '../../src/js/CSS3DRenderer'
use '../../src/js/TrackballControls'
use '../../src/js/OrbitControls'


//globals..
var scene,
    camera,
    clock,
    sides = [],
    controls,
    css3DRenderer;

var initProjectsScene = function () {
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
  camera.position.z = 2200;
  camera.position.x = 0;
  camera.position.y = -100;
  camera.lookAt(scene.position);

  // controls = new THREE.OrbitControls(camera);

  // controls.autoRotate = true;

  // clock = new THREE.Clock();
  //
  // controls.rotateSpeed          = 0.007;
	// controls.zoomSpeed            = 2.0;
	// controls.panSpeed             = 1.5;
	// controls.enableZoom           = false;
	// controls.enablePan            = false;
	// controls.staticMoving         = true;
	// // controls.dynamicDampingFactor = 0.3;
	// controls.keys                 = [ 65, 83, 68 ];
	// // controls.addEventListener( 'change', animate );


  // attach the render-supplied DOM element
  _container.appendChild(css3DRenderer.domElement);
}


//Simple function to create CSS3DObjects from the given HTML string.
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

//Create the sides of the specified geometry with CSS3DObjects created using the given HTML strings, and shift them into position.
function createSides(strings, geometry) {
  var tick = -1;
    // iterate over all the sides
    for (var i = 0;i < geometry.faces.length;i += 2) {
      tick++
      // create a new object based on the supplied HTML String
      var side = createCSS3DObject(strings[tick]);
      // get this face and the next which both make the cube
      var face = geometry.faces[i];
      var faceNext = geometry.faces[i + 1];
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

      sides.push(side);
      // Calculate and apply the rotation for this side
      var up = new THREE.Vector3(0, 0, 1);
      var normal = geometry.faces[i].normal;
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
 inspect(sides);
}


//Assemble Projects Cube.....
function assembleCube() {
  //iframe template.
  var iframe = '<iframe width="1280" height="740" frameborder="0"' +
               ' style="border:0" src="{URL}"></iframe>',
     divWrap = '<div><div class="drapes"></div><img src="{SRC}" width="1280" height="740"></div>';
  //URL's....
  var eJSURL        = 'http://elementsjs.io',
      eJSsideNavURL = 'http://elementsjs.io/#interpreter-install',
      efosterIOURL  = 'http://ejames9.github.io',
      showTURL      = 'http://showtrippers.com',
      dJamSRC       = './images/DjamBase.png',
      gulpeJSIntSRC = './images/gulpEJSInterpreter.png',
      efosterIOSRC  = './images/ericfosterIO.png',
      urlsArray     = [],
      cubeSidesHTML = [];
  //Store urls in array.
  urlsArray.push(dJamSRC);
  urlsArray.push(gulpeJSIntSRC);
  urlsArray.push(eJSURL);
  urlsArray.push(eJSsideNavURL);
  urlsArray.push(showTURL);
  urlsArray.push(eJSsideNavURL);
  //Combine urls with iframe template in new array.
  urlsArray.forEach((url)=> {
    if (/https?\:\/\//.test(url)) {
      cubeSidesHTML.push(iframe.replace('{URL}', url));
    } else {
      cubeSidesHTML.push(divWrap.replace('{SRC}', url));
    }
  });

  //Create the cube.
  createSides(cubeSidesHTML, new THREE.CubeGeometry(1280,740,1280));
  //
  inspect(cubeSidesHTML);
}


//Scroll events....
function onScroll() {
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

      if (<body/>.scrolled() > 2496) {
        <'#footer'/>
              .viz('visible');
      } else {
        <'#footer'/>
              .viz('hidden');
      }
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
}



//Animation function.
function animate() {
  //update OrbitControls
  // controls.update(clock.getDelta());
  //renderer
  css3DRenderer.render(scene, camera);

  // inspect(camera.position);

  var x = camera.position.x;
  var z = camera.position.z;
  camera.position.x = x * Math.cos(0.007) +
    z * Math.sin(0.007);
  camera.position.z = z * Math.cos(0.007) -
    x * Math.sin(0.007);
  camera.lookAt(scene.position);
  //animation function
  requestAnimationFrame(animate);
}



//---DOM Ready function---//
go(()=> {
  //Set site wrapper to window parameters.
  // <'#wrapper'/>
  //           .size(String(window.innerHeight) + 'px', String(window.innerWidth) + 'px');
  onScroll();
  //Set up three.js scene.
  initProjectsScene();
  //Call Cube Assembly Function..
  assembleCube();
  //Initiate cube spin animation.
  // setUpTween();
  //initiate render loop.
  animate();
});




//===Code Bin===============================================================>>>


//--Code for making the Projects cube spin.-------------------------------->>

// inspect(camera.position);
//
// var x = camera.position.x;
// var z = camera.position.z;
// camera.position.x = x * Math.cos(0.007) +
//   z * Math.sin(0.007);
// camera.position.z = z * Math.cos(0.007) -
//   x * Math.sin(0.007);
// camera.lookAt(scene.position);

//--Code for Updating Cube position.---------------------------------------->>

// var posit = new THREE.Vector3(7.699, 6.7355, 1099.973);
// var posit2 = new THREE.Vector3(355.4065, 6.7355, 1041.0025);
// var posit3 = new THREE.Vector3(1100, 6.7355, 0);
// var posit4 = new THREE.Vector3(0, 6.7355, -1100);
// var posit5 = new THREE.Vector3(-1100, 6.7355, 0);
//
// camera.position.x = posit.x;
// camera.position.y = posit.y;
// camera.position.z = posit.z;
// camera.lookAt(scene.position);
// animate();
// setTimeout(function() {
//   log('11111111');
//   inspect(posit2.x);
//   camera.position.x = posit2.x;
//   camera.position.y = posit2.y;
//   camera.position.z = posit2.z;
//   camera.lookAt(scene.position);
//   animate();
//   setTimeout(function() {
//     log('22222222222');
//     inspect(posit3.y);
//     camera.position.x = posit3.x;
//     camera.position.y = posit3.y;
//     camera.position.z = posit3.z;
//     camera.lookAt(scene.position);
//     animate();
//     setTimeout(function() {
//       log('33333333');
//       inspect(posit4);
//       camera.position.x = posit4.x;
//       camera.position.y = posit4.y;
//       camera.position.z = posit4.z;
//       camera.lookAt(scene.position);
//       animate();
//       setTimeout(function() {
//         log('44444444444');
//         inspect(posit5);
//         camera.position.x = posit5.x;
//         camera.position.y = posit5.y;
//         camera.position.z = posit5.z;
//         camera.lookAt(scene.position);
//         animate();
//       }, 3000);
//     }, 3000);
//   }, 3000);
// }, 3000);
