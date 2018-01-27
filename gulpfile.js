

var gulp = require('gulp');
var extReplace = require('gulp-ext-replace');
var conCat = require('gulp-concat');
var uglify = require('gulp-uglify');
var babel = require('gulp-babel');
var sourcemaps = require('gulp-sourcemaps');
var webpack = require('webpack');
var gulpWebpack = require('gulp-webpack');
var watch = require('gulp-watch');
var minifyCSS = require('gulp-minify-css');
var runSequence = require('run-sequence');
var elemsJS = require('./node_modules/gulp-elementsJS-interpreter');


var webpackConfig = {
  entry: './build/play.js',
  output: {
    filename: './build/playBundle.js'
  }
};

// gulp.task('babel', function() {
//   var jsxSrc = ['../jsx/*.jsx', '../es6/*.js']
//       jsxDst = './'
//   return gulp.src(jsxSrc)
//     .pipe(babel())
//     .pipe(extReplace('.js'))
//     .pipe(gulp.dest(jsxDst));
// });

gulp.task('babel', ()=> {
  var jsSrc = './play.js',
      jsDst = './build';
  return gulp.src(jsSrc)
    .pipe(elemsJS())
    .pipe(babel())
    .pipe(gulp.dest(jsDst));
});

gulp.task('bundle', function() {
  var compiler = gulpWebpack(webpackConfig, webpack),
        jsSrc  = './build/play.js',
        jsDst  = './';
  return gulp.src(jsSrc)
    .pipe(compiler)
    .pipe(gulp.dest(jsDst));
});


gulp.task('default', gulp.series('babel', 'bundle'));

gulp.watch('./*.js', gulp.series('babel', 'bundle'));

// ========================================||>>>>>>
// +++++++ ElementsJS Stuff ++++++++++++++||||>>>>>>>>
// ========================================||>>>>>>


// gulp.task('default', ()=> {
//   runSequence(['elsJS'], '3d');
// });
//
// //watch all js files.
// gulp.watch('./*.js', ()=> {
//   gulp.run('3d');
// });
//
// gulp.watch(['./elementsJS/index.js', './elementsJS/lib/*.js'], ()=> {
//   runSequence(['elsJS'], '3d');
// });

// gulp.task('elsJS', ()=> {
//   runSequence('elsIndex', 'elsLib');
// });

// gulp.task('elsIndex', function() {
//   var jsSrc = './elementsJS/index.js';
//       jsDst = '../node_modules/elementsJS/'
//   return gulp.src(jsSrc)
//     .pipe(babel())
//     .pipe(gulp.dest(jsDst));
// });
//
// gulp.task('elsLib', function() {
//   var jsSrc = './elementsJS/lib/*.js';
//       jsDst = '../node_modules/elementsJS/lib/'
//   return gulp.src(jsSrc)
//     .pipe(babel())
//     .pipe(gulp.dest(jsDst));
// });

// gulp.task('JS', function() {
//   runSequence('babel', 'webpack', 'webpack2', 'index');
// });
