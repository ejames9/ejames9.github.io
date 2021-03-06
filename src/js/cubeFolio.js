
/*
cubeFolio.js

This file's code builds and controls my site's
Portfolio Cube.

Author: Eric James Foster
*/


use 'elementsJS' log, el, make, inspect, mouse, click, once, on, off, hasAncestor
use 'lodash' zipObject
use 'three' as THREE
use 'tween.js' as TWEEN
use 'bowser' as browser

use '../../src/js/CSS3DRenderer'
use './scrollControl' smoothScrollAnimation



//Application Data..
const APPLICATION_DATA               = {};
      APPLICATION_DATA.FLAGS_        = {};
      APPLICATION_DATA.PROJECT_URLS  = {};
      APPLICATION_DATA.REPO_URLS     = {};
      APPLICATION_DATA.USER_DATA     = {};
//Boolean flag that enables code that spins the portfolio cube.
APPLICATION_DATA.FLAGS_.SPIN_SWITCH_ = true;
//Flag that allows code to know when it is being run for the first time.
APPLICATION_DATA.FLAGS_.FOCUS_       = false;
//Flag that tells whether or not the 'show' class has been assigned yet. (project-info pane)
APPLICATION_DATA.FLAGS_.SHOW_        = false;
//Flag that tells whether or not the 'show2' class has been assigned yet. (browser-icon button)
APPLICATION_DATA.FLAGS_.SHOW2_       = false;
//Flag that tells whether or not the 'show3' class has been assigned yet. (visit-page text)
APPLICATION_DATA.FLAGS_.SHOW3_       = false;
//Flag that trips the tweenTwo snap-back animation.
APPLICATION_DATA.FLAGS_.TWEENTWO_    = false;
//This flag is set to false when the project-info pane is off-screen, and set back to true when it returns.
APPLICATION_DATA.FLAGS_.PROJ_PANE_   = true;
//This flag is set to true when a project is clicked, and not set back until the closeUp scene is exited.
APPLICATION_DATA.FLAGS_.FIRST_CLICK_ = false;
//global boolean flag that essentially turns off some event handling code  but continues to allow other code to run.
APPLICATION_DATA.FLAGS_.TWEEN_       = true;
APPLICATION_DATA.FLAGS_.HEAD_TWEEN_  = true;
//This flag is set to true when the header is fixed to the top, and set back to false when it is released.
APPLICATION_DATA.FLAGS_.ME_HEAD_     = false;
//This flag is set to true when the caption is on top of the carousel-image and false otherwise.
APPLICATION_DATA.FLAGS_.FLIPPER_     = true;


//Project URLs..
APPLICATION_DATA.PROJECT_URLS['_1']  = 'http://elementsjs.io';
APPLICATION_DATA.PROJECT_URLS['_2']  = 'http://elementsjs.io/#interpreter-install';
APPLICATION_DATA.PROJECT_URLS['_3']  = 'https://www.npmjs.com/package/gulp-elementsjs-interpreter';
APPLICATION_DATA.PROJECT_URLS['_4']  = 'http://showtrippers.com';
APPLICATION_DATA.PROJECT_URLS['_5']  = 'http://zooComedyNight.com';
APPLICATION_DATA.PROJECT_URLS['_6']  = 'http://ejames9.github.io';

//Repository URLs..
APPLICATION_DATA.REPO_URLS['_1']     = 'https://github.com/ejames9/elementsJS';
APPLICATION_DATA.REPO_URLS['_2']     = 'https://github.com/ejames9/elementsJS/blob/gh-pages/js/sideNavControl.js';
APPLICATION_DATA.REPO_URLS['_3']     = 'https://github.com/ejames9/gulp-elementsJS-interpreter';
APPLICATION_DATA.REPO_URLS['_4']     = 'https://github.com/ejames9/GoOnTour';
APPLICATION_DATA.REPO_URLS['_5']     = 'https://github.com/ejames9/zooComedyNight.com';
APPLICATION_DATA.REPO_URLS['_6']     = 'https://github.com/ejames9/ejames9.github.io/blob/master/src/js/ericFosterIO.js';

//This global hold the user's scroll/slide position.. for use with the scroll-snapping function..
APPLICATION_DATA.USER_DATA.SLIDE     = window.scrollY;
//Compress into global..
window.currentSlideOffset = APPLICATION_DATA.USER_DATA.SLIDE;

//Compress flag names.
window.flags = APPLICATION_DATA.FLAGS_;



//--The IIFE that runs my portfolio site.
//--Created a closure for organization, and fewer globals.============================>>>
export const cubeFolio = (function() {
  //Compress URL names..
  let
  repos = APPLICATION_DATA.REPO_URLS,
  projs = APPLICATION_DATA.PROJECT_URLS;

  //Camera face view coordinates for tween.js.
  const cameraPositions = [
    new THREE.Vector3(2200, -90, 0),
    new THREE.Vector3(-2200, -90, 0),
    new THREE.Vector3(0, 2000, 90),
    new THREE.Vector3(0, -2000, 90),
    new THREE.Vector3(0, -90, 2200),
    new THREE.Vector3(0, -90, -2200)
  ];

  //Camera close-up face view coordinates for tween.js.
  let closeUps = [
    new THREE.Vector3(1600, 0, 0),
    new THREE.Vector3(-1600, 0, 0),
    new THREE.Vector3(0, 1700, 90),
    new THREE.Vector3(0, -1700, 90),
    new THREE.Vector3(0, 0, 1600),
    new THREE.Vector3(0, 0, -1600)
  ];

  //globals..
  let
  tween,
      scene,
      camera,
      tweenTwo,
      css3DRenderer,
      camCoordinates,
              sides = [],
              URLs  = [];


  //--Initiate three.js scene and assemble portfolio cube. Closure is mainly for organization.=============>>>
  function assembleCubeFolio() {

    //Create three.js scene..
    initProjectsScene();
    //Assemble CubeFolio..
    assembleCube();

    //Set scene size, camera attributes and position, create container element, create renderer and attach to element.
    function initProjectsScene() {
      // set scene size
      var width  = window.innerWidth,
         height  = window.innerHeight;
      // set camera attributes
      var fov    = 45,
          aspect = width / height,
          near   = 0.1,
          far    = 1000;
      // get the container element
      var
      _container = <'#cubeFolio'>;

      //css3DRenderer.
      css3DRenderer = new THREE.CSS3DRenderer();
      css3DRenderer.setSize(width, height);

      //Setting up the camera.
      camera = new THREE.PerspectiveCamera(fov, width / height, near, far);
      scene  = new THREE.Scene();
      // add the camera to the scene
      scene.add(camera);
      // the camera starts at 0,0,0, so pull it back
      camera.position.z = 2200;
      camera.position.x = 0;
      camera.position.y = -120;
      camera.lookAt(scene.position);

      // attach the render-supplied DOM element
      _container.appendChild(css3DRenderer.domElement);
    }


    //Assemble Portfolio Cube.....
      function assembleCube() {
        //iframe template.
        var iframe   = '<iframe class="div" width="1280" height="740" frameborder="0"' +
                     '2style="border:0" src="{URL}"></iframe>',
            boxWrap  = '<div><img src="{SRC}" width="1280px" height="1280px" class="shine"></div>',
            divWrap  = '<div><img src="{SRC}" width="1280px" height="740px" class="shine"></div>';

        //URL's....
        var eJSURL        = './images/elementsjs.io.png',
            eJSsideNavURL = './images/elementsjs.ioClick.png',
            efosterIOURL  = './images/cubeFolio.png',
            showTURL      = './images/showTrippers.png',
            zooComSRC     = './images/zooComedyNight.png',
            gulpeJSIntSRC = './images/gulpEJSInterpreter.png',
            efosterIOSRC  = './images/ericfosterIO.png',
            cubeSidesHTML = [];

        //Store urls in array.
        URLs.push(zooComSRC);
        URLs.push(gulpeJSIntSRC);
        URLs.push(eJSsideNavURL);
        URLs.push(efosterIOURL);
        URLs.push(showTURL);
        URLs.push(eJSURL);

        //Combine urls with iframe template in new array.
        URLs.forEach((url, i)=> {
          if (i === 2 || i === 3) {
            cubeSidesHTML.push(boxWrap.replace('{SRC}', url));
          } else {
            cubeSidesHTML.push(divWrap.replace('{SRC}', url));
          }
        });

      //Create the cube.
      createSides(cubeSidesHTML, new THREE.CubeGeometry(1300,760,1300));
      //Map URLs to 3D coordinates, for tweening purposes.
      camCoordinates = zipObject(URLs, cameraPositions);
            closeUps = zipObject(URLs, closeUps);
    }


    //Create the sides of the specified geometry with CSS3DObjects created using the given HTML strings, and shift them into position.
    function createSides(strings, geometry) {
      var
      tick = -1;

      // iterate over all the sides
      for (var i = 0;i < geometry.faces.length;i += 2) {
        tick++
        // create a new object based on the supplied HTML String
        var
        side = createCSS3DObject(strings[tick]);
        // get this face and the next which both make the cube
        var
        face     = geometry.faces[i],
        faceNext = geometry.faces[i + 1];
        // reposition the sides using the center of the faces
        var
        centroid = new THREE.Vector3();
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
        var
        up     = new THREE.Vector3(0, 0, 1),
        normal = geometry.faces[i].normal;
        // We calculate the axis on which to rotate by
        // selecting the cross of the vectors
        var
        axis = new THREE.Vector3();
        axis.crossVectors(up, normal);
        var
        a = axis.crossVectors(up, normal);
        // based on the axis, in relation to our normal vector
        // we can calculate the angle.
        var
        angle = Math.atan2(axis.length(), up.dot(normal));
        axis.normalize();
        // now we can use matrix function to rotate the object so
        // it is aligned with the normal from the face
        var
        matrix4 = new THREE.Matrix4();
        matrix4.makeRotationAxis(axis, angle);
        // apply the rotation
        side.rotation.setFromRotationMatrix(matrix4);
        // add to the scene
        scene.add(side);
      }
    }


    //Simple function to create CSS3DObjects from the given HTML string.
    function createCSS3DObject(s) {
      //Create outerdiv and set inner HTML from string (s)..
      var
      div = document.createElement('div');
      div.innerHTML = s;

      //Apply any CSS Styling here.
      div.className = 'div';
      div.style.opacity = '0.8';

      //Create the CSS3DObject and return it.
      var
      object = new THREE.CSS3DObject(div);
      return object;
    }
  }



  //Created a closure here, mainly for organization, but also for the ability to share variables between functions=======>>>
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
      //If a project hasn't been clicked (TWEEN_), and the previous hovered project was _2 or _6 (TWEENTWO_)....
      if (flags.TWEEN_ && flags.TWEENTWO_) {
        //and..If the next mouseover element is not a project-list-item......
        if (!hasAncestor(e.target, <'#rightProjList'>) && !hasAncestor(e.target, <'#leftProjList'> )) {
          //Make sure camera is properly oriented. (Run the snap-back tween)
          let
          target   = new THREE.Vector3(0, -90, -2200);
          tweenTwo = new TWEEN.Tween(camera.position);
          tweenTwo
              .to(target, 3000)
              .easing(TWEEN.Easing.Elastic.Out)
              .onUpdate(()=> {
                camera.lookAt(scene.position);
              })
              .start();
          //Reset tTFlag..
          flags.TWEENTWO_ = false;
        } else {
          //Reset tTFlag..
          flags.TWEENTWO_ = false;
        }
      }
      if (e.target.className === 'projects-list-item') {
        if (e.target.id === '_2' || e.target.id === '_6') {
          //Stop tweenTwo
          flags.TWEENTWO_ = true;
        }
        if (flags.TWEEN_) {
          //Kill Spin.
          flags.SPIN_SWITCH_ = false;
          // //Create tween based on the camera's position.
          tween = new TWEEN.Tween(camera.position);
          //Configure animation.
          tween
              .to(camCoordinates[ <e.target/>.attrib('data-uri') ], 1000)
              .easing(TWEEN.Easing.Cubic.In)
              .onUpdate(function() {
                camera.position.x = this.x;
                camera.position.y = this.y;
                camera.position.z = this.z;
                camera.lookAt(scene.position);
              })
              .start();
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
      if (flags.TWEEN_) {
        //Cancel handler
        off('mouseout', eTarget, mouseoutCallBack);
        //Stop Tween.
        // tween.stop()
        //Restart spin.
        flags.SPIN_SWITCH_ = true;
      }
      //Unhighlight target.
      <eTarget/>
              .class('hover', '-');
    }

    //CubeFolio onClick function.
    function onClick() {
      const projectRE = /projects\-list\-item/;

      click(<'html'>, function(e) {
        //If one of the links in the main navigation header are clicked..
        if (e.target.className === 'head-nav') {
          //
          e.preventDefault();
          //Find the currently 'active' link, and remove the active class..
          <'[class~=activ]'/>
                  .class('activ', '-');
          //Add 'active' class to clicked link..
          <e.target/>
                  .ma()
                    .class('activ', '+');
          //Scroll to targeted offset..
          smoothScrollAnimation(e);
        } else if (e.target.id === 'chevy') {
          //Tween project-info out of the way..
          const
          tween = new TWEEN.Tween({top: 0, left: 0});
          tween
                .to({left: 920}, 1300)
                .easing(TWEEN.Easing.Cubic.In)
                .onUpdate(function() {
                  <'#project-info'>.style.transform = 'translate(' + this.left + 'px, ' + this.top + 'px)';
                })
                .start();
          //Set flag that signifies that the project-info pane is off-screen..
          flags.PROJ_PANE_ = false;
          //Reveal left chevron button.
          <'#chevyL'/>
                  .class('hide', '-');
          //Hide right chevron.
          <'#chevy'/>
                  .class('hide', '+');

        } else if (e.target.id === 'chevyL') {
          //Tween project-info back into view..
          projectInfoTweenBack();

        } else if (e.target.id === 'x') {
          //Reset the FIRST_CLICK_..
          flags.FIRST_CLICK_ = true;
          //Return to spinning cube..
          backToSpinningCube();

        } else {
          //Highlight focused list item.
          if (flags.FOCUS_) {
            <'[name=focus]'/>
                      .attrib('name', '')
                      .color('')
                      .fontWeight('')
                      .textShadow('')
                      .zIndex('');
          }
          flags.FOCUS_ = true;
          //Hone in on click events happening on our target elements.
          if (projectRE.test(e.target.className)) {
            //Give target focus.
            <e.target/>
                      .attrib('name', 'focus')
                      .color('#27130a')
                      .fontWeight('900')
                      .textShadow('0 0 0.2em #fe7927, 0 0 0.2em #fe7927, 0 0 0.2em #fe7927, 0 0 0.2em #fe7927, 0 0 0.2em #fe7927, 0 0 0.2em #fe7927, 0 0 0.2em #fe7927, 0 0 0.2em #fe7927')
                      .zIndex('1000');
            //Kill spin.
            flags.SPIN_SWITCH_ = false;
            //New tween/target for close-up animation.
            let
            tween3  = new TWEEN.Tween(camera.position),
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
            flags.TWEEN_ = false;
            // off('mouseover', <'html'>, hoverCallBack);
            // off('mouseout', eTarget, mouseoutCallBack);
            //Setup the project-info pane..
            projectInfoPane(e.target);

          } else {
            flags.FOCUS_ = false;
          }
        }
      });
    }


    //Function containing code for the project-info pane setup/click responses..
    function projectInfoPane(e_target) {
      //If the show class has been assigned to an element, remove it..
      if (flags.SHOW_) {
        <'[class~=show]'/>
                    .class('show', '-')
                    .class('hide', '+');
      }
      //Set the flag..
      flags.SHOW_ = true;
      let elString = '[name=' + e_target.id + ']';
      //Show Project Info, re-assign the 'show' class..
      <'#project-info'/>
                  .class('hidden', '-');
      dom(elString)
                  .class('hide', '-')
                  .class('show', '+');

      if (flags.SHOW2_) {
        <'[class~=show2]'/>
                    .class('show2', '-')
                    .class('hide', '+');
      }
      <'#github-link'/>
                    .href(repos[e_target.id]);
      //determine which browser icon to show, using bowser.
      // log('browser');
      // log(browser.name);
      if (flags.SHOW3_) {
        <'[class~=show3]'/>
                    .class('show3', '-')
                    .class('hide', '+');
      }
      switch (browser.name) {
        case ('Safari'):
            <'#safari'/>
                    .class('hide', '-')
                    .class('show2', '+')
                    .sib('next')
                      .class('hide', '-')
                      .class('show3', '+')
                      .ma()
                        .href(projs[e_target.id]);
            break;
        case ('Chrome'):
            <'#chrome'/>
                    .class('hide', '-')
                    .class('show2', '+')
                    .sib('next')
                      .class('hide', '-')
                      .class('show3', '+')
                      .ma()
                        .href(projs[e_target.id]);
            break;
        case ('Firefox'):
            <'#firefox'/>
                    .class('hide', '-')
                    .class('show2', '+')
                    .sib('next')
                      .class('hide', '-')
                      .class('show3', '+')
                      .ma()
                        .href(projs[e_target.id]);
            break;
        case ('Internet Explorer'):
            <'#ie'/>
                    .class('hide', '-')
                    .class('show2', '+')
                    .sib('next')
                      .class('hide', '-')
                      .class('show3', '+')
                      .ma()
                        .href(projs[e_target.id]);
            break;
        case ('Edge'):
            <'#ie'/>
                    .class('hide', '-')
                    .class('show2', '+')
                    .sib('next')
                      .class('hide', '-')
                      .class('show3', '+')
                      .ma()
                        .href(projs[e_target.id]);
            break;
        default:
            <'#www'/>
                    .class('hide', '-')
                    .class('show2', '+')
                    .sib('next')
                      .class('hide', '-')
                      .class('show3', '+')
                      .ma()
                        .href(projs[e_target.id]);
      }
      //Display Project info Closing 'X' button.
      <'#x'/>
            .class('hide', '-');
      //Check PROJ_PANE_ to see if project-info pane is offScreen. If so, move it back into view.
      if (!flags.PROJ_PANE_ && flags.FIRST_CLICK_) {
        //Invoke theSnitch Function..
        theSnitch();
        //reset FIRST_CLICK_ flag..
        flags.FIRST_CLICK_ = false;
      }
    }


    //Using a middle man (snitch) function to get a value for Function.caller;
    function theSnitch() {
      return projectInfoTweenBack();
    }


    //Return from closeUps to original camera coordinates and spinning cube.
    function backToSpinningCube() {
      //Return to spinning cube..
      //Check the orientation of the cube, to determine which "tweenBack" to run.
      //If the z coordinate = 90, we need to turn the cube as well is zoom out. (else)=>..
      if (camera.position.z === 90) {
        //Make sure camera is properly oriented. (Run the snap-back tween)
        let
        target   = new THREE.Vector3(0, -90, -2200),
        tweenTwo = new TWEEN.Tween(camera.position)

            .to(target, 2500)
            .easing(TWEEN.Easing.Elastic.Out)
            .onUpdate(()=> {
              camera.lookAt(scene.position);
            })
            .start();

        //Reset tTFlag..
        flags.TWEENTWO_ = false;

        //..<=(if) Otherwise, do the following..
      } else {
        let
        currentProject,
           camPosition = [];

        //Convert camera coordinates to simple array.
        camPosition.push(camera.position.x);
        camPosition.push(camera.position.y);
        camPosition.push(camera.position.z);

        for (let uri in closeUps) {
          let cUpsPosition = [];
          //Convert closeUps coordinates to simple array.
          cUpsPosition.push(closeUps[uri].x);
          cUpsPosition.push(closeUps[uri].y);
          cUpsPosition.push(closeUps[uri].z);
          //Compare cUpsPosition to camPosition to find a match.
          if (String(cUpsPosition) === String(camPosition)) {
            currentProject = uri;
          }
        }
        //Tween cube back to spinning state..
        const
        tween = new TWEEN.Tween(camera.position);
        tween
            .to(camCoordinates[currentProject], 2000)
            .easing(TWEEN.Easing.Elastic.Out)
            .onUpdate(()=> {
              camera.lookAt(scene.position);
            })
            .start();
      }

      //Get rid of 'x' and project-info pane..
      <'#project-info'/>
                  .class('hidden', '+');
      <'#x'/>
      .class('hide', '+');
      //Flip the SPIN_SWITCH_/TWEEN_ back on.
      flags.SPIN_SWITCH_ = true;
      flags.TWEEN_ = true;
    }

    //moves project-info pane back into original viewing position.
    function projectInfoTweenBack() {
      let
      tweenTime;

      if (projectInfoTweenBack.caller.name.toString() === 'theSnitch') {
        tweenTime = 20;
      } else {
        tweenTime = 1300;
      }
      //Tween project-info back into view..
      const
      tween = new TWEEN.Tween({top: 0, left: 920});
      tween
            .to({left: 0}, tweenTime)
            .easing(TWEEN.Easing.Cubic.In)
            .onUpdate(function() {
              <'#project-info'>.style.transform = 'translate(' + this.left + 'px, ' + this.top + 'px)';
            })
            .start();
      //Set flag that signifies the project-info pane is on-screen..
      flags.PROJ_PANE_ = true;
      //Re-hide left chevron button.
      <'#chevyL'/>
              .class('hide', '+');
      //Show right chevron.
      <'#chevy'/>
              .class('hide', '-');
    }
  }




  //---Cube Animation Function============================>>>
  function animate() {
    //Will not run in mobile mode..
    if (<'#cubeFolio'>) {
      //The Renderers Call to Render..
      css3DRenderer.render(scene, camera);
      //Make the cube spin..
      if (flags.SPIN_SWITCH_) {
        let x = camera.position.x,
            z = camera.position.z;
        camera.position.x = x * Math.cos(0.007) +
          z * Math.sin(0.007);
        camera.position.z = z * Math.cos(0.007) -
          x * Math.sin(0.007);
        camera.lookAt(scene.position);
      }
    }
    //Update tween.
    TWEEN.update()
    //Animation Loop Function
    requestAnimationFrame(animate);
  }



  //Export public functions..
  return {
    assembleCube: assembleCubeFolio,
      controller: cubeFolioController,
         animate: animate
                        }

//Run IIFE..
})();
