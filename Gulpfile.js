'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var rimraf = require('rimraf');
// var uglify = require('gulp-uglify'); //have to do an array syntax on code
// var ngAnnotate = require('gulp-ng-annotate'); //automatically adds all of the angular annotations
// var gutil = require('gulp-util'); //gulp utility tool - catch errors
// var plumber = require('gulp-plumber'); //takes care of leaks - univesal error catcher

//var sourcemaps = require('gulp-sourcemaps');

var config = {
  paths: {
    js: './src/js/**/*.js',
    sass: './src/css/**/*.scss',
    html: './src/partials/**/*.html'
  }
};

/*
gulp.task    // define tasks
gulp.src     // source - read (input)
gulp.dest    // destination - write (output)
gulp.watch   // watch files for changes, to run tasks
  *.pipe     // string together actions
*/

gulp.task('clean-js', function(cb) {
  rimraf('./public/js', cb);
});
gulp.task('clean-css', function(cb) {
  rimraf('./public/css', cb);
});
gulp.task('clean-html', function(cb) {
  rimraf('./public/partials', cb);
});

gulp.task('js', ['clean-js'], function() {
  return gulp.src(config.paths.js)
    // .pipe(sourcemaps.init())
    // .pipe(plumber())
    // .pipe(ngAnnotate())
    .pipe(concat('bundle.js'))
    // .pipe(uglify())
    // .pipe(source.write('../maps'));
    .pipe(gulp.dest('./public/js'));
});

// gulp.task('images', function() {
//
// })

gulp.task('css', ['clean-css'], function() {
  return gulp.src(config.paths.sass)
    .pipe(sass())
    .pipe(gulp.dest('./public/css'));
});

gulp.task('html', ['clean-html'], function() {
  return gulp.src(config.paths.html)
    .pipe(gulp.dest('./public/partials'));
});

gulp.task('watch', function() {
  gulp.watch(config.paths.sass, ['css']);
  gulp.watch(config.paths.js, ['js']);
  gulp.watch(config.paths.html, ['html']);
});

gulp.task('build', ['js', 'css', 'html']);
gulp.task('default', ['build', 'watch']);
