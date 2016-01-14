var runSequence = require('run-sequence');
var path = require('path');
var serverPath = path.relative(__dirname,
  path.join(process.cwd(), 'serverExpress', 'app.singleton'));
var server = require(serverPath);
var protractor = require('gulp-protractor');

module.exports.loadTasks = function(gulp, plugins, config) {
  'use strict';

  function task(task, options) {
    return require('./tasks/' + task)(gulp, plugins, config);
  }

  // Downloads the selenium webdriver
  //gulp.task('webdriver-update', protractor.webdriver_update);

  //gulp.task('webdriver-standalone', protractor.webdriver_standalone);


  var child_process = require('child_process');

  function getProtractorBinary(binaryName) {
    var winExt = /^win/.test(process.platform) ? '.cmd' : '';
    var pkgPath = require.resolve('protractor');
    var protractorDir = path.resolve(path.join(path.dirname(pkgPath), '..', 'bin'));
    var webDriverPath = path.join(protractorDir, '/' + binaryName + winExt);
    return webDriverPath;
  }

  gulp.task('webdriver-update', function(done) {
    child_process.spawn(getProtractorBinary('webdriver-manager'), ['update'], {
      stdio: 'inherit'
    }).once('close', done);
  });

  gulp.task('e2e', function(done) {
    // var argv = process.argv.slice(3); // forward args to protractor
    var argv = ['--protractor.conf.js'];
    child_process.spawn(getProtractorBinary('protractor'), argv, {
      stdio: 'inherit'
    }).once('close', done);
  });

};

