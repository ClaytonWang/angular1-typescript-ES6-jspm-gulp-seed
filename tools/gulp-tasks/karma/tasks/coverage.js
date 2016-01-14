var path = require('path');
var Server = require('karma').Server;
var remapIstanbul = require('remap-istanbul/lib/gulpRemapIstanbul');

module.exports = function(gulp, plugins, config) {
  'use strict';

  return function(done) {

    config = config.typescript.development;

    new Server({
      configFile: path.join(__dirname, '../../../../karma.coverage.conf.js')
    }, karmaDone).start();

    function karmaDone(exitCode) {
      console.log('Test Done with exit code: ' + exitCode);
      console.log('Remapping coverage to TypeScript format...');
      remapCoverage();
      console.log('Remapping done! View the result in report/remap/html-report');
      if (exitCode === 0) {
        done();
      } else {
        done('Unit test failed.');
      }
    }

    function remapCoverage() {
      gulp.src(config.coverage + 'report-json/coverage-final.json')
        .pipe(remapIstanbul({
          reports: {
            'lcovonly': config.coverage + 'remap/lcov.info',
            'json': config.coverage + 'remap/coverage.json',
            'html': config.coverage + 'remap/html-report'
          }
        }));
    }

  };
};
