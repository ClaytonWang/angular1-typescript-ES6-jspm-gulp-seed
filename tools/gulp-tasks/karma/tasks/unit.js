var path = require('path');
var Server = require('karma').Server;

module.exports = function(gulp, plugins, config) {
  'use strict';

  return function(done) {

    new Server({
      configFile: path.join(__dirname, '../../../../karma.conf.js')
    }, done).start();

  };
};
