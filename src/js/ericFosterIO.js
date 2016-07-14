
/*
ericFosterIO.js

This file is the entry point module for the site's
(ericfoster.io) JavaScript.

Author: Eric Foster
*/


//elementsJS imports
use 'elementsJS' go, el, x, log, on, inspect, isMobile, ajax, url
use './scrollControl' scrollController
use './cubeFolio' cubeFolio
use 'bowser' as browser


//Portfolio code urls..
let
rawGit      = 'https://rawgit.com/ejames9/ejames9.github.io/split-up-portfolio-code/',
cubeFolio_  = 'html/cubeFolio.html',
carouFolio_ = 'html/carouFolio.html';




  //---DOM Ready Function=================================>>>
  go
  (function() {
    //1280 is the original width of the map image..
    if (window.innerWidth > 1280) {
      //Make sure map is centered by removing img-responsive class.
      <'#map-image'/>
                .class('img-responsive', '-');
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
    //Reload CSS and reset scroll handler globals upon orientation (layout) change..
    on('orientationchange', window, ()=> {
      <'#responsiveCSS'/>
                  .href('?', '+');
      //Reset the scrollController..
      setTimeout(resetScrollControlGlobals, 1000);
    });

    if (!window.frameElement) {
      //Activate scroll-handling.
      scrollController();

      //
      getPortfolioCode();
    }
  });


//Reset scroll handler globals upon orientation (layout) change..
function resetScrollControlGlobals() {
  let index = -1;

  currentSlideOffset = scrollY;

  <'.snap'/>
        .every((element)=> {
          snapPoints[String(index += 1)] = element.fromTop();
        });

  //Find current slide..
  for (let s in snapPoints) {
    if (currentSlideOffset === snapPoints[s]) {
      position = s;
    }
  }

  inspect(snapPoints);
}


//Decide which portfolio to use, and download it..
function getPortfolioCode() {
  //If device is mobile, kill cubeFolio and show thumbNail portfolio..
  if (isMobile()) {
    //get code from github repo with http request..
    ajax(url(rawGit, carouFolio_), null, (r)=> {
      <'#carouFolio'/>
                .html(r);
    });
    //kill #cubefolio..
    x(<'#cubeFolio'>);
    //reload css..
    setTimeout(function() {
      <'.caption'/>
                  .every((element)=> {
                    element
                        .fontFamily('tulpen one');
                  });
      <'#responsiveCSS'/>
                  .href('?', '+');
      <'#carouFolio'/>
                  .height('100%');
      <'.carousel-indicators'/>
                  .padding('8px')
                  .bottom('20px');
      <'.item-inner'/>
                  .every((el)=> {
                    el.top('53px');
                  });
    }, 700);
  } else {
    //get code from github repo with http request..
    ajax(url(rawGit, cubeFolio_), null, (r)=> {
      <'#cubeFolio'/>
                .html(r);
    });
    //Kill #carouFolio
    x(<'#carouFolio'>);

    //FIXME: Use a promise here...
    //Fire up the cube!..
    setTimeout(initiateCubeFolio, 500);
  }
}


//Initiate cube..
function initiateCubeFolio() {
  //Set up three.js scene.
  //Call Cube Assembly Function..
  cubeFolio.assembleCube();
  //Initiate cube hover and click events/behaviour.
  cubeFolio.controller();
  //initiate render loop.
  cubeFolio.animate();
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


//Reload window if orientation changes, to avoid 'scrambling' of header.
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
