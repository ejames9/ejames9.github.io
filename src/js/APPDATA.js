

/*
APPDATA.js

This file houses the app data object, which contains user Data
and boolean flags which facilitate operation of the app.

Author: Eric James Foster
*/




//Application Data..
export let APPLICATION_DATA               = {};
           APPLICATION_DATA.FLAGS_        = {};
           APPLICATION_DATA.PROJECT_URLS  = {};
           APPLICATION_DATA.REPO_URLS     = {};
           APPLICATION_DATA.USER_DATA     = {};
           APPLICATION_DATA.PARAMETERS    = {};



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
//
APPLICATION_DATA.FLAGS_.HEAD_TWEEN_  = true;
//If user device is not mobile, this will be set to true.
APPLICATION_DATA.FLAGS_.CUBEFOLIO_   = false;
//This boolean will allow the cover head shot to spin when set to true.
APPLICATION_DATA.FLAGS_.HEAD_SPIN_   = false;
//This boolean will allow the cover magic hat/wand to spin when set to true.
APPLICATION_DATA.FLAGS_.BALL_SPIN_   = false;
//This boolean will allow the cover crystal ball to spin when set to true.
APPLICATION_DATA.FLAGS_.HAT_SPIN_    = false;
//This flag is set to true when the header is fixed to the top, and set back to false when it is released.
APPLICATION_DATA.FLAGS_.ME_HEAD_     = false;
//This flag is set to true when the caption is on top of the carousel-image and false otherwise.
APPLICATION_DATA.FLAGS_.FLIPPER_     = true;
//This flag is set to true when the full curtains are closed.
APPLICATION_DATA.FLAGS_.FULL_CURTS_  = true;
//This flag is set to true when the mid curtains are closed.
APPLICATION_DATA.FLAGS_.MID_CURTS_   = true;
//This flag is set to true when the outer curtains are closed.
APPLICATION_DATA.FLAGS_.OUTR_CURTS_  = true;


//
APPLICATION_DATA.PARAMETERS.HEAD_SPEED = 0.012;
APPLICATION_DATA.PARAMETERS.BALL_SPEED = 0.012;
APPLICATION_DATA.PARAMETERS.HATX_SPEED = 0.012;
APPLICATION_DATA.PARAMETERS.HATZ_SPEED = 0.012;



//Project URLs..
APPLICATION_DATA.PROJECT_URLS['_1']  = 'http://elementsjs.io';
APPLICATION_DATA.PROJECT_URLS['_2']  = 'http://elementsjs.io/#interpreter-install';
APPLICATION_DATA.PROJECT_URLS['_3']  = 'https://www.npmjs.com/package/gulp-elementsjs-interpreter';
APPLICATION_DATA.PROJECT_URLS['_4']  = 'http://showtrippers.com';
APPLICATION_DATA.PROJECT_URLS['_5']  = 'https://pypi.python.org/pypi/DjamBase';
APPLICATION_DATA.PROJECT_URLS['_6']  = 'http://ejames9.github.io';

//Repository URLs..
APPLICATION_DATA.REPO_URLS['_1']     = 'https://github.com/ejames9/elementsJS';
APPLICATION_DATA.REPO_URLS['_2']     = 'https://github.com/ejames9/elementsJS/blob/gh-pages/js/sideNavControl.js';
APPLICATION_DATA.REPO_URLS['_3']     = 'https://github.com/ejames9/gulp-elementsJS-interpreter';
APPLICATION_DATA.REPO_URLS['_4']     = 'https://github.com/ejames9/GoOnTour';
APPLICATION_DATA.REPO_URLS['_5']     = 'https://github.com/ejames9/DjamBase';
APPLICATION_DATA.REPO_URLS['_6']     = 'https://github.com/ejames9/ejames9.github.io/blob/master/src/js/ericFosterIO.js';

//This global hold the user's scroll/slide position.. for use with the scroll-snapping function..
APPLICATION_DATA.USER_DATA.SLIDE     = window.scrollY;
//Compress into global..
window.currentSlideOffset = APPLICATION_DATA.USER_DATA.SLIDE;

//Compress var names.
window.flags  = APPLICATION_DATA.FLAGS_;
window.params = APPLICATION_DATA.PARAMETERS;
