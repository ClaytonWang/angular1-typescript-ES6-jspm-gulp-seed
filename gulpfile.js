'use strict';

// THIS CHECK SHOULD BE THE FIRST THING IN THIS FILE
// This is to ensure that we catch env issues before we error while requiring other dependencies.
require('./tools/check-environment')(
  {requiredNpmVersion: '>=3.0.0 <3.3.13', requiredNodeVersion: '>=4.2.1 <5.5.0'});

var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var config = require('./tools/gulp.config');

/**
 * Load all gulp sub tasks from './tools/gulp-tasks'
 */
require('require-dir')('./tools/gulp-tasks', {recurse: true});

/**
 * Testing
 */
require('./tools/gulp-tasks/karma/gulpFile.js').loadTasks(gulp, plugins, config);

/**
 * e2e
 */
require('./tools/gulp-tasks/protractor/gulpFile.js').loadTasks(gulp, plugins, config);

/**
 * Development
 */
require('./tools/gulp-tasks/develolpment/gulpFile.js').loadTasks(gulp, plugins, config);

/**
 * Production
 */
require('./tools/gulp-tasks/production/gulpFile.js').loadTasks(gulp, plugins, config);

/**
 * Common
 */
require('./tools/gulp-tasks/common/gulpFile.js').loadTasks(gulp, plugins, config);
