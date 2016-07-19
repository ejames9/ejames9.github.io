
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

    //The following bit of code will allow for orientation change layout adjustments without a full page reload..
    on('orientationchange', window, ()=> {
      //Reload css when orientation changes, so that appropriate @media rules will take effect..
      <'#responsiveCSS'/>
                  .href('?', '+');
      //Reset the scrollController..
      setTimeout(resetScrollControlGlobals, 1000);
    });

    if (!window.frameElement) {
      //Activate scroll-handling.
      scrollController();
      //Activate touch control.
      touchControl();

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


function resetScrollControlGlobals() {
  let index = -1;
  //Reset current slide offset global..
  currentSlideOffset = scrollY;
  //Reset snapPoints global..
  <'.snap'/>
        .every((element)=> {
          snapPoints[String(index += 1)] = element.fromTop();
        });

  //Find current slide..
  for (let s in snapPoints) {
    if (currentSlideOffset === snapPoints[s]) {
      //Set position global..
      position = s;
    }
  }

  inspect(snapPoints);
}


//This function colors the backround of the project info buttons on touch start/end, making them more reactive.
function touchControl() {
  //Set background color of site link/github link buttons on touch start..
  on('touchstart', <'body'>, (e)=> {
    if (isMobile()) {
      switch (true) {
        case (e.target.className === 'site-link2'):
            <e.target/>
                  .bgColor('#164cac');
            break;
        case (e.target.className === 'github-link2'):
            <e.target/>
                  .bgColor('#6f3b87');
            break;
        case (/line/.test(e.target.className)):
            <e.target/>
                  .bgColor('#fe7927');
        default:
            break;
      }
    }
  });
  //Set background color of site link/github link buttons on touch end..
  on('touchend', <'body'>, (e)=> {
    if (isMobile()) {
      switch (true) {
        case (e.target.className === 'site-link2'):
            <e.target/>
                  .bgColor('transparent');
            break;
        case (e.target.className === 'github-link2'):
            <e.target/>
                  .bgColor('transparent');
            break;
        case (/line/.test(e.target.className)):
            <e.target/>
                  .bgColor('transparent');
        default:
            break;
      }
    }
  });
}



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





//===CODE BIN===============================================================>>>
//light table color combo
//background-color: #3e6b6b;
//color: #7ffffd;


//Set projects pane to parameters appropriate for firefox
// if (browser.firefox) {
//   <'#aboutMe'/>
//             .top('-10px');
//   <'#aboutMeContainer'/>
//             .top('-35px');
// }


// on('resize', <'body'>, ()=> {
//   <'#responsiveCSS'/>
//               .href('?', '+');
//   //Reset the scrollController..
//   currentSlideOffset = scrollY;
//   scrollController();
// });



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
