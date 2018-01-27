"use strict";

var _elementsJS = require("elementsJS");

///-------elementsJS requires---------///
var _$ = require("elementsJS")._$;
var dom = require("elementsJS").dom;
var make = require("elementsJS").make;
var element = require("elementsJS").element;
///|------------------------------------|// 


/*
play.js

A web playground for testing new ideas...
*/

var toggler = function toggler(l) {
  (0, _elementsJS.log)(l.visibility());
  // Set visibility according to current setting...
  l.visibility() == 'visible' ? l.viz('hidden') : l.viz('visible');
};

var showHeader = function showHeader() {
  return (
    // Set timers for toggle function...
    setTimeout(function () {
      (function () {
        var elem0 = _$('#head') ? dom('#head') : make('#head').put("body");
        return elem0;
      })().class('show', '+');
    }, 300)
  );
};

var lick = function lick() {
  return (
    // Set timers for toggle function...
    setTimeout(function () {
      (function () {
        var elem1 = _$('#licker') ? dom('#licker') : make('#licker').put("body");
        return elem1;
      })().viz('visible');
      setTimeout(function () {
        (function () {
          var elem2 = _$('#licker') ? dom('#licker') : make('#licker').put("body");
          return elem2;
        })().viz('hidden');
        showHeader();
      }, 800);
    }, 700)
  );
};

var blinkLickNShowHeader = function blinkLickNShowHeader() {
  return (
    // Set timers for toggle function...
    setTimeout(function () {
      (function () {
        var elem3 = _$('#hero') ? dom('#hero') : make('#hero').put("body");
        return elem3;
      })().viz('hidden');
      setTimeout(function () {
        (function () {
          var elem4 = _$('#hero') ? dom('#hero') : make('#hero').put("body");
          return elem4;
        })().viz('visible');
        lick();
      }, 200);
    }, 3000)
  );
};

(0, _elementsJS.go)(function () {
  blinkLickNShowHeader();
});

(0, _elementsJS.log)("hello there you.", ["red", "bold"]);