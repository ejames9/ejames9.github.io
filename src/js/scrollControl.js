
/*
scrollController.js

This file controls  all of the scroll-based positioning/layout effects,
such as scroll-snapping.

Author: Eric James Foster
*/


//import elementsJS, elementsJS style..
use 'elementsJS' scroll



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

  let timeOutID = null,
     snapPoints = [];

  //Get snapPoints..
  <'.snap'/>
        .every((element)=> {
          snapPoints.push(element.fromTop());
        });

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
      //Check for existence of running setTimeout. If one exists, kill it, and create a new one.
      //The scrollSnapper() function will execute once the timer runs out (scrolling stops for 200 ms)..
      if (timeOutID) {
        //kill setTimeout..
        clearTimeout(timeOutID);
      }
      //Set new setTimeout()..
      timeOutID = setTimeout(scrollSnapper, 50, snapPoints);
    });
  }


  //This function will create an intuitive scrolling experience, allowing the user to scroll directly to different sections.
  function scrollSnapper(destinations) {
    //Adjust the snapping range for different screen heights..
    let snapRange = window.innerHeight > 700 ? 300
                  : window.innerHeight > 550 ? 200
                  : window.innerHeight > 400 ? 150
                  : window.innerHeight > 200 ? 100
                  : 90;
    //Determine snapping locale, if any,  and call snap function..
    switch (true) {
      case (Math.abs(destinations[0] - window.scrollY) < snapRange):
          //Call snap function..
          snap(destinations[0]);
          break;

      case (Math.abs(destinations[1] - window.scrollY) < snapRange):
          //
          snap(destinations[1]);
          break;

      case (Math.abs(destinations[2] - window.scrollY) < snapRange):
          //
          snap(destinations[2]);
          break;

      case (Math.abs(destinations[3] - window.scrollY) < snapRange):
          //
          snap(destinations[3]);
          break;

      default:
          //Scrolling stopped between (outside of) snapping ranges..
          break;
    }
    //Snapping function..
    function snap(destination) {
      //If scroll point is within 3 pixels, snap to destination, otherwise animate to destination..
      if (Math.abs(destination - window.scrollY) < 3) {
        scrollTo(0, destination);
      } else {
        scrollTo(0, window.scrollY + ((destination - window.scrollY) / 2));
        setTimeout(snap, 20, destination);
      }
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
