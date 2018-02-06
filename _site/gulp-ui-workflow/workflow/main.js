/*
 * Workflow - main.js
 * Gulp file to control all of the main dev workflow tasks
 *
 * Copyright (c) 2017 BAESystems AI Creative
 * Licensed under the MIT license.
 */
'use strict';

var gulp = require('gulp');

var $ = require('gulp-load-plugins')({
    pattern: ['gulp-*', 'uglify-save-license', 'del']
  });

var browserSync = require('browser-sync').create();

  // Task for initialising blog with Browsersync
gulp.task('browsersync:init', () => {
    browserSync.init({server: {baseDir: '../_site/'}});
});

gulp.task('pre:develop', (cb) => {
    $.sequence('js', 'sass')(cb);
});

// Task for serving blog with Browsersync
gulp.task('develop', () => {
    //initialise browser sync to allow page reload
    gulp.start('browsersync:init');
    
    //start the watch assets task - which compiles CSS and JS
    gulp.start('watch:assets');

    //reload the site when anything in the compiled site folder
    gulp.watch('../_site/**/*.*').on('change', browserSync.reload);
});

gulp.task('test', (cb) => {
    $.sequence('testing:accessibility', 'testing:linting:html', 'testing:linting:js')(cb);
});


// Task for serving blog with Browsersync
gulp.task('testing:accessibility', (cb) => {
    $.sequence('clean:workflow', 'accessibility:audit')(cb);
});

// Task to test the html for lint errors
gulp.task('testing:linting:html', (cb) => {
    $.sequence('lint:bootstrap', 'lint:html')(cb);
});

// Task to test the html for js errors
gulp.task('testing:linting:js', (cb) => {
    $.sequence('jshint:scripts')(cb);
});



