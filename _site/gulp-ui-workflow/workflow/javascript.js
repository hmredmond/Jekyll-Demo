/*
 * Workflow - babel.js
 * Gulp file to compile JS to browser compatible JS
 *
 * Copyright (c) 2017 BAESystems AI Creative
 * Licensed under the MIT license.
 */

'use strict';

var gulp = require('gulp');

var $ = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'uglify-save-license', 'del']
});

var babel = require("gulp-babel");

var jsFiles = 'assets/js/*utilities.js',
  jsDest = config.sourceDir + "assets/js";

gulp.task("js", ['babel:transpile'],  () => {
  gulp.start('uglify');
});

gulp.task("babel:transpile", () => {
  console.log('TRANSPILING: Babel');
  return gulp.src(config.sourceDir + "assets/js/_src/*.js")
    .pipe(babel())
    .pipe($.using())
    .pipe(gulp.dest(jsDest));
});

gulp.task('uglify', () => {
    console.log('Uglifing: Javascript');
    return gulp.src(jsFiles)
        .pipe($.uglify())
        .pipe(gulp.dest(jsDest));
});
