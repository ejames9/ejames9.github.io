
/*
scrollController.js

This file controls  all of the scroll-based positioning/layout effects,
such as scroll-snapping.

Author: Eric James Foster
*/


//import elementsJS, elementsJS style..
use 'elementsJS' el, scroll, log, inspect, isMobile
use './cubeFolio' cubeFolio
use 'tween.js' as TWEEN


window.position   = null;
window.snapPoints = {};

//Created closure for organization of Scroll event-handling functions.
export function scrollController() {
  //cache elements..
  let _body    = <body/>,
      _html    = <html/>,
    _meBrand   = <'#meBrand'/>,
    _naviBarLI = <'#naviBar li a'/>,
    _naviBar   = <'#naviBar'/>,
    _header    = <'#navbar'/>,
    _meHead    = <'#me-head'/>,
    _footer    = <'#footer'/>;

  let timeOutID  = null;

  //Get snapPoints..
  (function() {
    let index = -1;

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
  })();

  // log('offsets2');
  // log(snapPoints);
  onScroll();

  //--ericfoster.io Scroll events=====================================>>>
  function onScroll() {
    //affix naviBar to top upon scroll.
    scroll(window, (e)=> {
      //This switch statement is for accomodating multiple screen sizes/configs. (Responsive Design).
      switch (99===9*9+18) {
        case (window.innerWidth > 1000):
            headerFooterAnimation(600, 2120, 42, 36);

            break;
        case (window.innerWidth > 900):
            headerFooterAnimation(600, 2060, 42, 36);
            break;
        case (window.innerWidth > 730):
            if (window.innerHeight > 730) {
              //Portrait
              headerFooterAnimation(500, 1960, 42, 36, 0);
            } else {
              //Landscape
              headerFooterAnimation(370, 1560, 42, 36, 0, '');
            }
            break;
        case (window.innerWidth > 700):
            if (window.innerHeight > 700) {
              headerFooterAnimation(1000, 2060, 42, 36);
            } else {
              headerFooterAnimation(380, 1600, 42, 36);
            }
            break;
        case (window.innerWidth > 600):
            if (window.innerHeight > 600) {
              footerAnimation_Mobile(2000);
            } else {
              headerFooterAnimation(380, 1450, 42, 36, 0, '');
            }
            break;
        case (window.innerWidth > 500):
            if (window.innerHeight > 500) {
              footerAnimation_Mobile(2000);
            } else {
              headerFooterAnimation(310, 1330, 32, 32, 0, '');
            }
            break;
        case (window.innerWidth > 400):
            if (window.innerHeight > 400) {
              footerAnimation_Mobile(2275);

            } else {
              headerFooterAnimation(300, 1400, 26, 29, 0, '');
              //Make a couple tweaks..
              <'#header'/>
                    .height('45px');
              <'#naviBar'/>
                    .right('5px');
            }
            break;
        case (window.innerWidth > 300):
            if (window.innerHeight > 300) {
              if (window.innerHeight > 600) {
                footerAnimation_Mobile(1600);

              } else if (window.innerHeight > 500) {
                footerAnimation_Mobile(1900);

              } else {
                footerAnimation_Mobile(1700);
              }
            } else {
              headerFooterAnimation(300, 1400, 26, 29);
              //A couple tweaks..
              <'#header'/>
                    .height('45px');
              <'#naviBar'/>
                    .right('5px');
            }
            break;
        case (window.innerWidth > 200):
            break;
        default:
            break;
      }
      //===VV=Scroll-Snapper=VV===//


      //Check for existence of running setTimeout. If one exists, kill it, and create a new one.
      //The scrollSnapper() function will execute once the timer runs out (scrolling stops for 200 ms)..
      if (timeOutID) {
        //kill setTimeout..
        clearTimeout(timeOutID);
      }
      //Set new setTimeout()..
      timeOutID = setTimeout(scrollSnapper, 200, snapPoints);
    });
  }


  //This function will create an intuitive scrolling experience, allowing the user to flick directly to different sections.
  function scrollSnapper(destinations) {
    //Adjust the snapping range for different screen heights..
    let snapRange = window.innerHeight > 700 ? 150
                  : window.innerHeight > 550 ? 120
                  : window.innerHeight > 400 ? 90
                  : window.innerHeight > 200 ? 70
                  : 60
                  ;

    //If user scrolls down, and beyond snap range....
    if (window.scrollY > currentSlideOffset + snapRange) {
      //Get approximate scrolled distance..
      let approxScrollDistance = Math.abs(scrollY - currentSlideOffset + snapRange);
      //If scrolled distance is greater than 2 viewport heights..
      if (approxScrollDistance > innerHeight * 2.5) {
        //Reset position global to +3 and convert back to string..
        position = String(parseInt(position) + 3);
        //If the scrolled distance is greater than 1 viewport height..
      } else if (approxScrollDistance > innerHeight * 1.5) {
        //Reset position global to +2 and convert back to string..
        position = String(parseInt(position) + 2);
      } else {
        //Else, set position global to +1 and convert back to string..
        position = String(parseInt(position) + 1);
      }
      //Call snapping function with 'position' as destinations' index..
      snap(destinations[position]);
    //Else iff user scrolls up, and beyond snap range.... repeat above, but subtract from position, instead of add.
    } else if (window.scrollY < currentSlideOffset - snapRange) {
      let approxScrollDistance = Math.abs(scrollY - currentSlideOffset + snapRange);

      if (approxScrollDistance > innerHeight * 2.5) {
        position = String(parseInt(position) - 3);
      } else if (approxScrollDistance > innerHeight * 1.5) {
        position = String(parseInt(position) - 2);
      } else {
        position = String(parseInt(position) - 1);
      }
      //Call snap function, with adjusted position..
      snap(destinations[position]);
    } else {
      //Snap back to same position..
      snap(destinations[position]);
    }

    //Snapping function..
    function snap(destination) {
      //Tween for snapping scroll position to pre-specified offsets..
      const
      tween = new TWEEN.Tween( {x: 0, y: scrollY} );
      tween
          .to( {y: destination}, 300)
          .easing(TWEEN.Easing.Back.Out)
          .onUpdate(function() {
            scrollTo(0, this.y);
          } )
          .start();
      //If cubeFolio is not present (mobile) we need to borrow it's animation function to update tween..
      if (isMobile()) {
        //Borrowing cubeFolio's animation function, for it's TWEEN updating/animating ability..
        cubeFolio.animate();
      }
      //Set new slide position once slide settles..
      setTimeout(()=> {
        currentSlideOffset = window.scrollY;
      }, 350);
    }
  }


  //This function adusts header and footer animation at lower resolutions in portrait mode..
  function footerAnimation_Mobile(offSet2) {
    //The following code exectutes if the page is scrolled beyond the # of px's below. This is the footer animation.
    if (_body.scrolled() > offSet2 || _html.scrolled() > offSet2) {
      _footer
          .viz('visible');
    } else {
      _footer
          .viz('hidden');
    }
  }

  //This function adjusts header footer animation..
  function headerFooterAnimation(offSet1, offSet2, fontSize1, fontSize2, top=25, left='175px') {
    //The following code exectutes if the page is scrolled beyond the # of px's below. This is the header animation.
    if (_body.scrolled() > offSet1 || _html.scrolled() > offSet1 - 20) {
      _meBrand
            .fontSize(String(fontSize1) + 'px')
            .textShadow('0 0 0.2em #5b85d1, 0 0 0.2em #5b85d1, 0 0 0.2em #5b85d1, 0 0 0.2em #5b85d1, 0 0 0.2em #5b85d1, 0 0 0.2em #5b85d1, 0 0 0.2em #5b85d1, 0 0 0.2em #5b85d1')
            .top('-8px')
            .left('12px');

      _naviBar
            .top('0');
      _naviBarLI
            .every((element)=> {
              element
                .fontSize('32px');
            });
      _header
            .bgColor('#191a1a')
            .opacity('.9')
            .border('');

      if (_meHead.display() !== 'none') {
        _meHead
              .display('none');
      }

      if (_body.scrolled() > offSet2 || _html.scrolled() > offSet2) {
        _footer
            .viz('visible');
      } else {
        _footer
            .viz('hidden');
      }
    } else {
      //Release.
      _meBrand
            .fontSize('')
            .textShadow('0 0 0.2em #fe7927, 0 0 0.2em #fe7927, 0 0 0.2em #fe7927, 0 0 0.2em #fe7927, 0 0 0.2em #fe7927, 0 0 0.2em #fe7927, 0 0 0.2em #fe7927, 0 0 0.2em #fe7927')
            .top('')
            .left(left);

      _naviBar
            .top(top + 'px')
      _naviBarLI
            .every((element)=> {
              element
                .fontSize('40px');
            });
      _header
            .bgColor('transparent')
            .border('none');
      //
      if (flags.ME_HEAD_) {
        if (_meHead.display() === 'none') {
          _meHead
                .display('block');
        }
      }
    }
  }
}


export function smoothScrollAnimation(e) {
  let idRE = /\#\w*/;

  //get destination element and it's offsetTop..
  let elementID = idRE.exec(<e.target/>.href());
           elem = document.querySelector(elementID);
    destination = <elem/>.fromTop();

  //Tween for smoothly animating scroll to diff sections of site upon clicking the main nav.
  const
  tween = new TWEEN.Tween( {x: 0, y: scrollY} );
  tween
      .to( {y: destination}, 1000)
      .easing(TWEEN.Easing.Exponential.In)
      .onUpdate(function() {
        scrollTo(0, this.y);
      } )
      .start();
}
