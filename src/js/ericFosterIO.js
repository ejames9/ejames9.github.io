
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

    //Set projects pane to parameters appropriate for firefox
    // if (browser.firefox) {
    //   <'#aboutMe'/>
    //             .top('-10px');
    //   <'#aboutMeContainer'/>
    //             .top('-35px');
    // }
    if (window.innerWidth > 1280) {
      //Make sure map is centered by removing img-responsive class.
      <'#map-image'/>
                .class('img-responsive', '-');
    }
    //If device is mobile, kill cubeFolio and show thumbNail portfolio..
    if (isMobile()) {
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
    // on('resize', <'body'>, ()=> {
    //   <'#responsiveCSS'/>
    //               .href('?', '+');
    //   //Reset the scrollController..
    //   currentSlideOffset = scrollY;
    //   scrollController();
    // });

    on('orientationchange', window, ()=> {
      <'#responsiveCSS'/>
                  .href('?', '+');
      //Reset the scrollController..
      currentSlideOffset = scrollY;
      scrollController();
    });

    if (!window.frameElement) {
      //Activate scroll-handling.
      scrollController();

      try {
        //Set up three.js scene.
        //Call Cube Assembly Function..
        cubeFolio.assembleCube();
        //Initiate cube hover and click events/behaviour.
        cubeFolio.controller();
        //initiate render loop.
        cubeFolio.animate();
      } catch (e) {
        log(e, 'red');
      }
    }
  });




//===TO DO===============================================================>>>

//TODO: Add all items to Carousel.
//TODO: Make sure all links are working properly.
//TODO: Make sure all buttons light up on 'active'.
//TODO: Adjust size of icons at bottom of Cover page.
//TODO: Make sure all bio's and descriptions are good, add dyi stuff etc.
//TODO: Add Favicon.ico..
//TODO: animate scroll to different sections..
//TODO: Make sure 1300px wide and larger are looking good.
//TODO:
//TODO: Smoothly animate header..



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
