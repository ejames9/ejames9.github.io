
/*
ericfoster.io gulpfile.js
Author: Eric Foster
*/



var
gulp        = require('gulp')
elemsJS     = require('gulp-elementsjs-interpreter')
babel       = require('gulp-babel')
gulpWebpack = require('gulp-webpack')
webpack     = require('webpack')
run         = require ('run-sequence');



const webpackConfig = {
  entry: './dist/babel/ericFosterIO.js',
  output: {
    filename: 'ericFosterIO.js'
  }
}

gulp.task('ejf-babel', ()=> {
  var jsSrc = ['./src/js/ericFosterIO.js', './src/js/scrollControl.js', './src/js/cubeFolio.js'],
      jsDst = './dist/babel/';

  return gulp.src(jsSrc)
    .pipe(elemsJS())
    .pipe(babel({
      presets: ["es2015-loose"]
    }))
    .pipe(gulp.dest(jsDst));
});

gulp.task('ejf-bundle', ()=> {
  var compiler = gulpWebpack(webpackConfig, webpack),
      jsSrc    = './dist/babel/ericFosterIO.js',
      jsDst    = './';

  return gulp.src(jsSrc)
    .pipe(compiler)
    .pipe(gulp.dest(jsDst));
});

gulp.task('default', ()=> {
  return run('ejf-babel', 'ejf-bundle');
});
