var runSequence = require('run-sequence');
var path = require('path');
var serverPath = path.relative(__dirname,
  path.join(process.cwd(), 'serverExpress', 'app.singleton'));
var server = require(serverPath);

module.exports.loadTasks = function(gulp, plugins, config) {
  'use strict';

  function task(task, options) {
    return require('./tasks/' + task)(gulp, plugins, config);
  }

  gulp.task('clean.coverage', task('clean.coverage'));

  gulp.task('unit', task('unit'));

  gulp.task('tsc', task('tsc'));

  gulp.task('test', function(done) {
    runSequence(
      'build',
      ['unit'],
      done);
  });

  gulp.task('run.coverage.report', task('coverage'));

  gulp.task('serve.coverage', task('server.start'));

  gulp.task('build.coverage', function(done) {
    runSequence(
      //'clean.coverage',
      'tsc',
      'ng.templates',
      'run.coverage.report',
      'clean.devCompiled',
      'serve.coverage',
      done);
  });

  gulp.task('watch.coverage', function() {
    gulp.watch(config.watch.coverage, function(e) {
      server.notifyLiveReload(e);
    });
  });

  gulp.task('coverage', function(done) {
    runSequence(
      'build.coverage',
      'watch.coverage',
      done);
  })

};

