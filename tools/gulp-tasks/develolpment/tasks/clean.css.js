var rimraf = require('rimraf');

module.exports = function(gulp, plugins, config) {

  return function(done) {
    rimraf(config.delete.css, function() {
      done();
    });
  };
};
