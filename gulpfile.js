/*
gulpfile.js

gulpfile for ericfoster.io
*/

var gulp = require('gulp');
var babel = require('gulp-babel');
var webpack = require('webpack');
var gulpWebpack = require('gulp-webpack');
var watch = require('gulp-watch');
var elemsJS = require('./node_modules/gulp-elementsJS-interpreter');


var webpackConfig = {
  entry: './scripts/babel/james.js',
  output: {
    filename: './index.js'
  }
};


gulp.task('babel', ()=> {
  var jsSrc = './scripts/src/james.js',
      jsDst = './scripts/babel';
  return gulp.src(jsSrc)
    .pipe(elemsJS())
    .pipe(babel())
    .pipe(gulp.dest(jsDst));
});

gulp.task('bundle', function() {
  var compiler = gulpWebpack(webpackConfig, webpack),
        jsSrc  = './scripts/babel/james.js',
        jsDst  = './';
  return gulp.src(jsSrc)
    .pipe(compiler)
    .pipe(gulp.dest(jsDst));
});


gulp.task('default', gulp.series('babel', 'bundle'));

gulp.watch('./scripts/src/*.js', gulp.series('babel', 'bundle'));
