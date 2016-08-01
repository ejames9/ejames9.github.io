
/*
magicShow.js

This file controls the animations of the ericfoster.io site magic
show theme.

Author: Eric James Foster
*/


//imports..
use 'elementsJS' log, el
use 'three' as THREE
use 'tween.js' as TWEEN



//Curtain position globals..
window.fullCurtainsX = 0;
window.midCurtainsX = 0;
window.outerCurtainsX = 0;



//Open Curtains..
export function openCurtains(full=null, mid=null, outer=null) {
  //Open outer curtains..
  function openOuterCurtains() {
    //Tween for moving inner curtains..
    let
    destination    = 550;
    outerCurtainsX = 550;

    const
    tween = new TWEEN.Tween( {x: 0, y: 0} );
    tween
        .to( {x: destination}, outer)
        .easing(TWEEN.Easing.Linear.None)
        .onUpdate(function() {
          <'#topLeftCurtain'/>
                    .toLeft(this.x);

          //
          <'#topRightCurtain'/>
                    .toRight(this.x);
        })
        .start();

    <'#header'/>
            .display('block');

    setTimeout(()=> {
      <topRightCurtain/>
                 .display('none');
    }, outer);
    //
    flags.OUTR_CURTS_ = false;
  }

  function openMiddleCurtains() {
    //Tween for moving inner curtains..
    let
    destination  = 650;
    midCurtainsX = 650;

    const
    tween = new TWEEN.Tween( {x: 0, y: 0} );
    tween
        .to( {x: destination}, mid)
        .easing(TWEEN.Easing.Linear.None)
        .onUpdate(function() {
          <'#midLeftCurtain2'/>
                    .toLeft(this.x);
          //
          <'#midRightCurtain2'/>
                    .toRight(this.x);
        })
        .start();

    if (outer) {
      setTimeout(openOuterCurtains, (mid * 0.5));
    }
    setTimeout(()=> {
      <midRightCurtain2/>
                 .display('none');
    }, mid);
    //
    flags.MID_CURTS_ = false;
  }


  function openFullCurtains() {
    //Tween for moving inner curtains..
    let
    destination   = 650;
    fullCurtainsX = 650;

    const
    tween = new TWEEN.Tween( {x: 0, y: 0} );
    tween
        .to( {x: destination}, full)
        .easing(TWEEN.Easing.Linear.None)
        .onUpdate(function() {
          <leftCurtain/>
                    .toLeft(this.x);
          //
          <rightCurtain/>
                    .toRight(this.x);
        })
        .start();

    if (mid) {
      //Open mid curtains..
      setTimeout(openMiddleCurtains, (full * 0.75));
    }
    setTimeout(()=> {
      <rightCurtain/>
                 .display('none');
    }, full);
    //
    flags.FULL_CURTS_ = false;
  }
  //Open full curtains..
  openFullCurtains();
}


//Close Curtains.
export function closeCurtains(outer=null, mid=null, full=null) {
  //Close full curtains..
  function closeFullCurtains() {
    //Tween for moving inner curtains..
    let
    destination = 0;

    const
    tween = new TWEEN.Tween( {x: -fullCurtainsX, y: 0} );
    tween
        .to( {x: destination}, full)
        .easing(TWEEN.Easing.Linear.None)
        .onUpdate(function() {
          <'#leftCurtain'/>
                    .toRight(this.x);
          //
          <'#rightCurtain'/>
                    .toLeft(this.x);
        })
        .start();
    //
    flags.FULL_CURTS_ = true;
  }


  function closeMiddleCurtains() {
    //Tween for moving inner curtains..
    let
    destination = 0;

    const
    tween = new TWEEN.Tween( {x: -midCurtainsX, y: 0} );
    tween
        .to( {x: destination}, mid)
        .easing(TWEEN.Easing.Linear.None)
        .onUpdate(function() {
          <'#midLeftCurtain2'/>
                    .toRight(this.x);
          //
          <'#midRightCurtain2'/>
                    .toLeft(this.x);
        })
        .start();
        //
        if (!flags.FULL_CURTS_) {
          //make tangible..
          <rightCurtain/>
                   .display('block');
          //Close FULL curtains..
          setTimeout(closeFullCurtains, (mid * 0.5));
        }
        flags.MID_CURTS_ = true;
  }

  //Close outer curtains..
  function closeOuterCurtains() {
    //Tween for moving inner curtains..
    let
    destination = 0;

    const
    tween = new TWEEN.Tween( {x: -outerCurtainsX, y: 0} );
    tween
        .to( {x: destination}, outer)
        .easing(TWEEN.Easing.Linear.None)
        .onUpdate(function() {
          <'#topLeftCurtain'/>
                    .toRight(this.x);
          //
          <'#topRightCurtain'/>
                    .toLeft(this.x);
        })
        .start();

    <'#header'/>
            .display('block');
    //
    if (!flags.MID_CURTS_) {
      //make tangible..
      <midRightCurtain2/>
                  .display('block');
      //Close mid curtains..
      setTimeout(closeMiddleCurtains, (outer * 0.75));
    }
    flags.OUTR_CURTS_ = true;
  }
  //close curtains according to circumstances..
  if (!flags.OUTR_CURTS_) {
    //make tangible..
    <topRightCurtain/>
                .display('block');
    //close
    closeOuterCurtains();
  } else if (!flags.MID_CURTS_) {
    //make tangible..
    <midRightCurtain2/>
                .display('block');
    //
    closeMiddleCurtains();
  } else {
    //make tangible..
    <rightCurtain/>
                .display('block');
    //
    closeFullCurtains();
  }
}


//This code makes my head spin......
export function spinningIcons() {
  //
  initiate3DSpaces();
  //
  create3DObjects();

  //Set scene2 size, camera2 attributes and position, create container element, create renderer and attach to element.
    function initiate3DSpaces() {
      // set scene2 size
      var
      width  = 600,
      height = 600;
      // set camera2 attributes
      var
      fov    = 45,
      aspect = width / height,
      near   = 0.1,
      far    = 1000;
      // get the container element
      var
      _container  = ericHeadContainer,
      _container2 = crystalBallContainer,
      _container3 = magicHatContainer;

      ////Set the webGL renderer to a global variable so that the animate function will find it..
      window.css3DRenderer2 = new THREE.CSS3DRenderer();
             css3DRenderer2.setSize(width, height);

      flags.HEAD_SPIN_ = true;

      window.css3DRenderer3 = new THREE.CSS3DRenderer();
             css3DRenderer3.setSize(width, height);

      flags.HAT_SPIN_ = true;

      window.css3DRenderer4 = new THREE.CSS3DRenderer();
             css3DRenderer4.setSize(width, height);

      flags.BALL_SPIN_ = true;

      //Setting up the cameras.
      window.camera2 = new THREE.PerspectiveCamera(fov, width / height, near, far);
      window.scene2  = new THREE.Scene();
      // add the camera2 to the scene2
      scene2.add(camera2);
      // the camera2 starts at 0,0,0, so pull it back
      camera2.position.z = 665;
      camera2.position.x = 0;
      camera2.position.y = -170;

      window.camera3 = new THREE.PerspectiveCamera(fov, width / height, near, far);
      window.scene3  = new THREE.Scene();
      // add the camera2 to the scene2
      scene3.add(camera3);
      // the camera2 starts at 0,0,0, so pull it back
      camera3.position.z = 1700;
      camera3.position.x = 0;
      camera3.position.y = -170;

      window.camera4 = new THREE.PerspectiveCamera(fov, width / height, near, far);
      window.scene4  = new THREE.Scene();
      // add the camera2 to the scene2
      scene4.add(camera4);
      // the camera2 starts at 0,0,0, so pull it back
      camera4.position.z = 1950;
      camera4.position.x = 0;
      camera4.position.y = -170;
      // camera2.lookAt(scene2.position);

      // attach the render-supplied DOM element
      _container.appendChild(css3DRenderer2.domElement);
      _container2.appendChild(css3DRenderer3.domElement);
      _container3.appendChild(css3DRenderer4.domElement);
    }

    //Create the 3D object from html img element..
    function create3DObjects() {
      //
      let
      img  = document.createElement('div'),
      img2 = document.createElement('div'),
      img3 = document.createElement('div');
      //
      img.innerHTML          = "<a id='ME'><img id='ericHead' style='margin-right: -75px;' src='./images/ericHeadHatfr.png'></a>"
      img.style.borderRadius = '50%';
      img.id                 = 'headShotDiv';

      img2.innerHTML          = "<a id='CONTACT'><img id='crystalBall' src='./images/crystalBall.png'></a>"
      img2.style.borderRadius = '50%';
      img2.id                 = 'crystBallDiv';

      img3.innerHTML          = "<a id='WORK'><img id='magicHat' src='./images/magicHat.png'></a>"
      img3.style.borderRadius = '50%';
      img3.style.padding      = '20px';
      //
      window.headShotObj      = new THREE.CSS3DObject(img);
      window.crystBallObj     = new THREE.CSS3DObject(img2);
      window.magicHatObj      = new THREE.CSS3DObject(img3);
      //
      scene2.add(headShotObj);
      scene3.add(crystBallObj);
      scene4.add(magicHatObj);
    }
}
