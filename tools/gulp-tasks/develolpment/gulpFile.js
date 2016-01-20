var runSequence = require('run-sequence');
var del = require('del');
var path = require('path');
var serverPath = path.relative(__dirname,
  path.join(process.cwd(), 'serverExpress', 'app.singleton'));
var server = require(serverPath).getDev();
var serverSassdoc = require(serverPath).getSassdoc();
var serverTypedoc = require(serverPath).getTypedoc();

module.exports.loadTasks = function(gulp, plugins, config) {
  'use strict';

  function task(task, options) {
    return require('./tasks/' + task)(gulp, plugins, config);
  }

  gulp.task('clean.devCompiled', ['clean.concepts'], task('clean.devCompiled'));
  gulp.task('clean.concepts', task('clean.concepts'));
  gulp.task('clean.css', task('clean.css'));

  gulp.task('sass.fonts', task('sass.fonts'));
  gulp.task('sass.app', task('sass.app'));
  gulp.task('sass.features', task('sass.features'));

  //gulp.task('inject.gsap', task('inject.gsap'));

  gulp.task('sass', function(done) {
    runSequence(
      [
        'sass.fonts',
        'sass.app',
        'sass.features'
      ],
      done);
  });

  gulp.task('sassdoc', task('sassdoc'));
  gulp.task('typedoc', task('typedoc'));

  gulp.task('docs', function(done) {
    runSequence(
      [
        'sassdoc',
        'typedoc'
      ],
      done);
  });

  gulp.task('build', function(done) {
    runSequence(
      'clean.devCompiled',
      [
        'ng.templates',
        'sass.fonts',
        'sass.app',
        'sass.features',
        'translate'
      ],
      'lint',
      //'sassdoc',
      //'typedoc',
      done);
  });

  gulp.task('serve.dev', task('server.start'));
  gulp.task('serve.sassdoc',['sassdoc'], task('server.sassdoc.start'));
  gulp.task('serve.typedoc',['sassdoc'], task('server.typedoc.start'));

  gulp.task('watch.sass', function() {
    gulp.watch(config.watch.sass, function(e) {
      runSequence(['sass', 'sassdoc'], function() {
        server.notifyLiveReload(e);
      });
    });
  });

  gulp.task('watch.html', function() {
    gulp.watch(config.watch.html, function(e) {
      runSequence('ng.templates', function() {
        server.notifyLiveReload(e);
      });
    });
  });

  gulp.task('watch.languages', function() {
    gulp.watch(config.watch.languages, function(e) {
      runSequence('translate', function() {
        server.notifyLiveReload(e);
      });
    });
  });

  gulp.task('watch.ts', function() {
    gulp.watch(config.watch.ts, function(e) {
      runSequence('lint', function() {
        server.notifyLiveReload(e);
      });
      //server.notifyLiveReload(e);
    });
  });

  //TODO INJECT LIVERELOAD SCRIPT IN DOC INDEX FILES
  //gulp.task('watch.sassdoc', ['serve.sassdoc'], function() {
  //  gulp.watch(config.watch.sassdoc, function(e) {
  //    serverSassdoc.notifyLiveReload(e);
  //  });
  //});
  //
  //gulp.task('watch.typedoc', ['serve.typedoc'], function() {
  //  gulp.watch(config.watch.typedoc, function(e) {
  //    serverTypedoc.notifyLiveReload(e);
  //  });
  //});

  gulp.task('watch', function(done) {
    runSequence(
      'build',
      'watch.sass',
      'watch.html',
      'watch.languages',
      'watch.ts',
      'serve.dev',
      //'serve.sassdoc',
      //'serve.typedoc',
      done);
  });

  /**
   * Formatting
   */
  function doCheckFormat() {
    var clangFormat = require('clang-format');
    var gulpFormat = require('gulp-clang-format');

    return gulp.src(['app/src/**/*.ts', 'tools/**/*.ts',
        '!typings/**/*.d.ts', 'gulpfile.js'])
      .pipe(gulpFormat.checkFormat('file', clangFormat));
  }

  gulp.task('check-format', function() {
    return doCheckFormat().on('warning', function(e) {
      console.log('NOTE: this will be promoted to an ERROR in the continuous build');
    });
  });

  gulp.task('enforce-format', function() {
    return doCheckFormat().on('warning', function(e) {
      console.log('ERROR: You forgot to run clang-format on your change.');
      console.log('See https://github.com/angular/angular/blob/master/DEVELOPER.md#clang-format');
      process.exit(1);
    });
  });

  gulp.task('lint', function() {
    // Built-in rules are at
    // https://github.com/palantir/tslint#supported-rules

    return gulp.src(['app/src/**/!(app.templates)*.ts'])
      .pipe(plugins.tslint())
      .pipe(plugins.tslint.report('prose', {emitError: true}));
  });

  function sequenceComplete(done) {
    return function(err) {
      if (err) {
        var error = new Error('build sequence failed');
        error.showStack = false;
        done(error);
      } else {
        done();
      }
    };
  }
};

