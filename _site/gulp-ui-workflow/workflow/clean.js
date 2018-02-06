/*
 * Workflow - clean.js
 * Gulp file to clean down build folders
 *
 * Copyright (c) 2015 BAESystems AI Creative
 * Licensed under the MIT license.
 */

'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'uglify-save-license', 'del']
});

gulp.task('clean:all', $.sequence('clean:deploy', 'clean:workflow', 'clean:complete'));

gulp.task('clean:deploy', function(done) {
  $.del([config.deployDir], done);
});

gulp.task('clean:complete', function(done) {
	console.log('Clean Complete. ' + config.deployDir + ' removed.')
});

gulp.task('clean:node', function(done) {
  $.del(['node_modules'], done);
});


gulp.task('clean:workflow', function() {
  $.del(['accessibility_reports']);
});
