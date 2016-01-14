var runSequence = require('run-sequence');
var path = require('path');

module.exports.loadTasks = function(gulp, plugins, config) {
  'use strict';

  function task(task, options) {
    return require('./tasks/' + task)(gulp, plugins, config);
  }

  /**
   * ngTemplates are created for both development and production, and
   * saved in the app/src directory.
   *
   * Bundling using the generated templates.ts file.
   */
  gulp.task('ng.templates', task('ngtemplates'));

  gulp.task('clean.all', function(done) {
    runSequence(
      [
        'clean.devCompiled',
        'clean.production',
        'clean.coverage',
        'clean.css'
      ],
      done);
  });

  gulp.task('translate', task('translate'));

  /**
   * POST-INSTALL
   */
  gulp.task('npm', task('npm'));

  gulp.task('postinstall', function(done) {
    runSequence(
      'npm',
      done);
  });
};

