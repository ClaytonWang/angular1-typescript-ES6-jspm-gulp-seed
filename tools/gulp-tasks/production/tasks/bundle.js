var exec = require('child_process').exec;
var chalk = require('chalk');
var jspm = require('jspm');
var isFile = require('../../../util/isFile');

var error = chalk.bold.red;
var warn = chalk.bold.yellow;
var success = chalk.bold.green;

/**
 * Minification is not fully supported yet
 * https://github.com/jspm/jspm-cli/issues/182
 *
 * @param gulp
 * @param plugins
 * @param config
 * @returns {Function}
 */
module.exports = function(gulp, plugins, config) {

  return function(done) {

    //jspm.setPackagePath('.');

    jspm.bundleSFX('src/app', 'build/production/build.js'
      , {
        minify: false,
        mangle: false,
        sourceMaps: false,
        buildCSS: false
      }
    ).then(function onSuccess() {
      //var counter = 0;
      //var intervalID = setInterval(function() {
      //  if (isFile.test('build/production/build.js') || counter === 50) {
      //    console.log(success('app bundled at build/production/build.js'));
      //    clearInterval(intervalID);
      //    done();
      //  } else {
      //    console.log(warn('file not written'));
      //  }
      //  counter++;
      //}, 10);

      done();

    }, function onError(stderr) {
      console.log(error(stderr));
      done();
    });

    //exec('jspm bundle-sfx src/app build/production/build.js',
    //  function(err, stdout, stderr) {
    //    console.log(success(stdout));
    //    console.log(error(stderr));
    //    done(err);
    //  });

  };
};
