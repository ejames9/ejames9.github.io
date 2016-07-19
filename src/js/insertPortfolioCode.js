
/*
insertPortfolioCode.js

This file determines whether the user is on a mobile device or a desktop computer,
and loads the appropriate portfolio code into the DOM.

Author: Eric James Foster
*/

use 'elementsJS' el, isMobile, url, ajax, x, log

//Portfolio code urls..
let
rawGit      = 'https://rawgit.com/ejames9/ejames9.github.io/split-up-portfolio-code/',
cubeFolio_  = 'html/cubeFolio.html',
carouFolio_ = 'html/carouFolio.html';



//Decide which portfolio to use, and download it..
(function getAndInsertPortfolioCode() {
  //If device is mobile, kill cubeFolio and show thumbNail portfolio..
  if (isMobile()) {
    //get code from github repo with http request..
    ajax(url(rawGit, carouFolio_), null, (r)=> {
      <'#carouFolio'/>
                .html(r);
    });
    //kill #cubefolio..
    x(<'#cubeFolio'>);
  } else {
    //get code from github repo with http request..
    ajax(url(rawGit, cubeFolio_), null, (r)=> {
      <'#cubeFolio'/>
                .html(r);
    });
    //Kill #carouFolio
    x(<'#carouFolio'>);
  }
})();
