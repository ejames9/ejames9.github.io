
/*
ericFosterIO.js javascript file for my portfolio site.
Author: Eric Foster
*/


//elementsJS imports
use 'elementsJS' go, info, warn, log, el, inspect, scroll, mouse, click, once, on, off
use 'lodash' zipObject
use 'three' as THREE
use 'tween.js' as TWEEN

use '../../src/js/CSS3DRenderer'
use '../../src/js/TrackballControls'
use '../../src/js/OrbitControls'


//global boolean flag that enables code that spins the portfolio cube.
window.spinSwitch = true;
//global boolean flag that allows code to know when it is being run for the first time.
window.focusFlag  = false;
window.showFlag   = false;
//global boolean flag that essentially turns off some event handling code  but continues to allow other code to run.
window.tweenFlag  = true;

//Camera face view coordinates for tween.js.
var cameraPositions = [
  new THREE.Vector3(2200, -90, 0),
  new THREE.Vector3(-2200, -90, 0),
  new THREE.Vector3(0, 2000, 90),
  new THREE.Vector3(0, -2000, 90),
  new THREE.Vector3(0, -90, 2200),
  new THREE.Vector3(0, -90, -2200)
];
//Camera close-up face view coordinates for tween.js.
var closeUps = [
  new THREE.Vector3(1600, 0, 0),
  new THREE.Vector3(-1600, 0, 0),
  new THREE.Vector3(0, 1700, 90),
  new THREE.Vector3(0, -1700, 90),
  new THREE.Vector3(0, 0, 1600),
  new THREE.Vector3(0, 0, -1600)
];

//globals..
var scene,
    camera,
    clock,
    sides = [],
    URLs  = [],
    camCoordinates,
    controls,
    css3DRenderer,
    tween,
    tweenTwo,
    tween3,
    tween4;

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
  camera.position.y = -90;
  camera.lookAt(scene.position);

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
     div.className = 'div';
     div.style.opacity = '0.8';


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

      sides.push(side.position);
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


//Assemble Portfolio Cube.....
function assembleCube() {
  //iframe template.
  var iframe   = '<iframe class="div" width="1280" height="740" frameborder="0"' +
               '2style="border:0" src="{URL}"></iframe>',
      boxFrame = '<iframe class="div" width="1280" height="1280" frameborder="0"' +
                   'style="border:0" src="{URL}"></iframe>',
      divWrap  = '<div><img src="{SRC}" width="1280" height="740"></div>';
  //URL's....
  var eJSURL        = 'http://elementsjs.io',
      eJSsideNavURL = 'http://elementsjs.io/#interpreter-install',
      efosterIOURL  = 'http://ejames9.github.io',
      showTURL      = 'http://showtrippers.com',
      dJamSRC       = './images/DjamBase.png',
      gulpeJSIntSRC = './images/gulpEJSInterpreter.png',
      efosterIOSRC  = './images/ericfosterIO.png',
      cubeSidesHTML = [];
  //Store urls in array.
  URLs.push(dJamSRC);
  URLs.push(gulpeJSIntSRC);
  URLs.push(eJSsideNavURL);
  URLs.push(efosterIOURL);
  URLs.push(showTURL);
  URLs.push(eJSURL);
  //Combine urls with iframe template in new array.
  URLs.forEach((url, i)=> {
    if (/https?\:\/\//.test(url)) {
      log(i, 'blue');
      if (i === 2 || i === 3) {
        cubeSidesHTML.push(boxFrame.replace('{URL}', url));
      } else {
        cubeSidesHTML.push(iframe.replace('{URL}', url));
      }
    } else {
      cubeSidesHTML.push(divWrap.replace('{SRC}', url));
    }
  });
  //Create the cube.
  createSides(cubeSidesHTML, new THREE.CubeGeometry(1280,740,1280));
  //Map URLs to 3D coordinates, for tweening purposes.
  camCoordinates = zipObject(URLs, cameraPositions);
        closeUps = zipObject(URLs, closeUps);

  inspect(closeUps);
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


//Created a closure here, mainly for organization, but also for the ability to share variables between functions.
function cubeFolioController() {
  let eTarget = null;

  //Initiate onHover handler...
  onHover();
  //Initiate onClick handler...
  onClick();

  //CubeFolio, onHover function.
  function onHover() {
    mouse('over', <'html'>, hoverCallBack);
  }

  //Callback for onHover()..
  function hoverCallBack(e) {
    if (e.target.className === 'projects-list-item') {
      if (tweenFlag) {
        //Kill Spin.
        spinSwitch = false;
        // //Create tween based on the camera's position.
        tween = new TWEEN.Tween(camera.position);
        //Configure animation.
        tween
            .to(camCoordinates[ <e.target/>.attrib('data-uri') ], 5000)
            .easing(TWEEN.Easing.Elastic.Out)
            .onUpdate(function() {
              camera.position.x = this.x;
              camera.position.y = this.y;
              camera.position.z = this.z;
              camera.lookAt(scene.position);
            })
            .start();
        //Show pertinent Info paragraph.
        // <e.target/>
        //         .sib('next')
        //         .class('hide', '-');
      }
      eTarget = e.target;
      //Set mouseout behaviour.
      on('mouseout', e.target, mouseoutCallBack);
      //Add onHover CSS.
      <e.target/>
              .class('hover', '+');
    }
  }

  //Callback for once('mouseout')..
  function mouseoutCallBack() {
    if (tweenFlag) {
      //Cancel handler
      off('mouseout', eTarget, mouseoutCallBack);
      //Re-hide Info Paragraph
      // <eTarget/>
      //       .sib('next')
      //       .class('hide', '+')
      //Stop Tween.
      tween.stop()
      //Make sure camera is properly oriented.
      if (camera.position.y < 80 || camera.position.y > 100) {
        if (camera.position.y > -80 || camera.position.y < -100) {
          let
          target   = new THREE.Vector3(0, -90, -2200),
          tweenTwo = new TWEEN.Tween(camera.position);
          tweenTwo
              .to(target, 3000)
              .easing(TWEEN.Easing.Elastic.Out)
              .onUpdate(()=> {
                camera.lookAt(scene.position);
              })
              .start();
        }
      }
      //Restart spin.
      spinSwitch = true;
    }
    //Unhighlight target.
    <eTarget/>
            .class('hover', '-');
  }

  //CubeFolio onClick function.
  function onClick() {
    const projectRE = /projects\-list\-item/;

    click(<'html'>, (e)=> {
      //Highlight focused list item.
      if (focusFlag) {
        <'[name=focus]'/>
                  .attrib('name', '')
                  .color('')
                  .fontWeight('')
                  .textShadow('')
                  .zIndex('');
      }
      focusFlag = true;
      log(e.target.className, 'orange');
      //Hone in on click events happening on our target elements.
      if (projectRE.test(e.target.className)) {
        //Give target focus class.
        <e.target/>
                  .attrib('name', 'focus')
                  .color('white')
                  .fontWeight('900')
                  .textShadow('0 0 0.2em #6f3b87, 0 0 0.2em #6f3b87, 0 0 0.2em #6f3b87, 0 0 0.2em #6f3b87, 0 0 0.2em #6f3b87, 0 0 0.2em #6f3b87, 0 0 0.2em #6f3b87, 0 0 0.2em #6f3b87')
                  .zIndex('1000');
        //Kill spin.
        spinSwitch = false;
        //New tween/target for close-up animation.
        let tween3 = new TWEEN.Tween(camera.position),
           target  = closeUps[ <e.target/>.attrib('data-uri') ];
        //tweenify...
        tween3
            .to(target, 1500)
            .easing(TWEEN.Easing.Linear.None)
            .onUpdate(function() {
              camera.lookAt(scene.position);
            })
            .start();
        //kill mouseover/out behaviour..
        tweenFlag = false;
        // off('mouseover', <'html'>, hoverCallBack);
        // off('mouseout', eTarget, mouseoutCallBack);
        if (showFlag) {
          <'[class~=show]'/>
                      .class('show', '-')
                      .class('hide', '+');
        }
        showFlag = true;
        let elString = 'data-url~=' + <e.target/>.attrib('data-uri');
        log(elString, 'green');
        log('elString', 'blue');
        inspect(dom(elString));
        //Show Project Info..
        <'#project-info'/>
                    .class('hidden', '-');
        dom(elString)
                    .class('hide', '-')
                    .class('show', '+');

      }
    });
  }
}



//---Animation function---//
function animate() {
  //renderer
  css3DRenderer.render(scene, camera);
  // inspect(camera.position);
  if (spinSwitch) {
    let x = camera.position.x,
        z = camera.position.z;
    camera.position.x = x * Math.cos(0.007) +
      z * Math.sin(0.007);
    camera.position.z = z * Math.cos(0.007) -
      x * Math.sin(0.007);
    camera.lookAt(scene.position);
  }
  //Update tween.
  TWEEN.update()
  //animation function
  requestAnimationFrame(animate);
}


//---DOM Ready function---//
go(()=> {
  //Set site wrapper to window parameters.
  // <'#wrapper'/>
  //           .size(String(window.innerHeight) + 'px', String(window.innerWidth) + 'px');
  try {
    if (!window.frameElement) {
      onScroll();
      //Set up three.js scene.
      initProjectsScene();
      //Call Cube Assembly Function..
      assembleCube();
      //Initiate cube hover and click events/behaviour.
      cubeFolioController();
      //initiate render loop.
      animate();
    }
  } catch(e) {
    log(e, 'red');
  }
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
