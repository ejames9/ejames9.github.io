
/*
ericFosterIO.js

This file is the entry point module for the site's
(ericfoster.io) JavaScript.

Author: Eric Foster
*/


//elementsJS imports
use 'elementsJS' go, el, x, log, on, inspect, isMobile
use './scrollControl' scrollController
use './cubeFolio' cubeFolio
use 'bowser' as browser




  //---DOM Ready Function=================================>>>
  go
  (function() {
    log('offsets', 'red');
    <'.snap'/>
          .every((element)=> {
            log(element.fromTop(), 'green');
          });
    //Set projects pane to parameters appropriate for firefox
    if (browser.firefox) {
      <'#aboutMe'/>
                .top('-10px');
      <'#aboutMeContainer'/>
                .top('-35px');
    }
    if (window.innerWidth > 1280) {
      //Make sure map is centered by removing img-responsive class.
      <'#map-image'/>
                .class('img-responsive', '-');
    }
    //If device is mobile, kill cubeFolio and show thumbNail portfolio..
    if (window.innerWidth < 10100) {
      //Kill cubeFolio..
      x(<'#cubeFolio'>);
      //Show thumbFolio
      <'#thumbFolio'/>
            .display('block');

    } else {
      //Show cubeFolio..
      <'#cubeFolio'/>
            .display('block');
      //Kill thumbFolio
      x(<'#thumbFolio'>)
    }
    if (window.innerWidth < 730 && window.innerHeight > window.innerWidth) {
      <'#meBrand'/>
          .position('relative')
          .display('inline')
          .fontSize('40px')
          .top('4px')
          .left('0');
      <'#naviBar'/>
          .class('naviBar', '-')
          .class('naviBar_Mobile', '+');
      //
      <'#me-head'/>
          .display('none');
    } else {
      flags.ME_HEAD_ = true;
    }
    //Reload window if orientation changes, to avoid 'scrambling' of header.
    on('orientationchange', window, ()=> {
      window.location.reload();
    });

    if (!window.frameElement) {
      //Activate scroll-handling.
      scrollController();
      //Set up three.js scene.
      //Call Cube Assembly Function..
      // cubeFolio.assembleCube();
      // //Initiate cube hover and click events/behaviour.
      cubeFolio.controller();
      // //initiate render loop.
      // cubeFolio.animate();
    }
  });




//===TO DO===============================================================>>>

//TODO: Smoothly animate header..
//TODO: Finish project descriptions..
//TODO: animate scroll to different sections..
//TODO:


// do({
//         el: [<'#block'>, position],
//     easing: [Elastic.In, 2000],
//         to: target,
//   onUpdate: (function() {
//       <'#project-info'>.style.transform = 'translate(' + this.left + 'px, ' + this.top + 'px)';
//   })
// });



//===CODE BIN===============================================================>>>
//light table color combo
//background-color: #3e6b6b;
//color: #7ffffd;


//   //Create new tween for header animation..
//   if (flags.HEAD_TWEEN_) {
//     const
//     tween = new TWEEN.Tween({fontS: 101, fontS2: 46});
//     tween
//         .to({fontS: 42, fontS2: 36}, 500)
//         .easing(TWEEN.Easing.Linear.None)
//         .onUpdate(function() {
//           _meBrand
//                   .fontSize(this.fontS + 'px');
//           _naviBarLI
//                   .every((element)=> {
//                     element
//                        .fontSize(this.fontS2 + 'px')
//                   });
//         })
//         .start();
//     //Reset flag to false..
//     flags.HEAD_TWEEN_ = false;
//   }
