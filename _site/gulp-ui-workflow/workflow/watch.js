/*
 * Workflow - watch.js
 * Gulp file to organise general watch tasks
 *
 * Copyright (c) 2015 BAESystems AI Creative
 * Licensed under the MIT license.
 */

'use strict';

var gulp = require('gulp');

gulp.task('watch:assets', function() {
	gulp.watch(config.sourceDir + "assets/js/_src/*.js", ['babel:transpile', 'uglify']);
	gulp.watch(config.sourceDir + config.sassDir + '/**/*.scss', ['sass']);
	gulp.watch(config.sourceDir + config.cssDir + '/**/*.min.css', ['deploy:css']);
});
