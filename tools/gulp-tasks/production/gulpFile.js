var runSequence = require('run-sequence');
var shell = require('gulp-shell');

module.exports.loadTasks = function(gulp, plugins, config) {
  'use strict';

  function task(task, options) {
    return require('./tasks/' + task)(gulp, plugins, config);
  }

  gulp.task('scripts.bundle', task('bundle'));

  //Does not work
  gulp.task('uglify', task('uglify'));

  gulp.task('clean.production', task('clean.production'));

  gulp.task('sass.deploy', task('sass'));

  gulp.task('copy.fonts', task('copy.fonts'));

  gulp.task('copy.languages', task('copy.languages'));

  gulp.task('production.images', task('images'));

  gulp.task('html.deploy', task('html'));

  gulp.task('serve.production', task('server.start'));

  gulp.task('deploy', function(done) {
    runSequence(
      'clean.production',
      'sass',
      'ng.templates',
      'translate',
      'sass.deploy',
      'copy.fonts',
      'copy.languages',
      'scripts.bundle',
      'production.images',
      'html.deploy',
      'serve.production',
      done);
  });

};

