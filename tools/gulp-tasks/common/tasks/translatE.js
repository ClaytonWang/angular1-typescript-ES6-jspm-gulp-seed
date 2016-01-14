var _ = require('lodash');
var chalk = require('chalk');
var path = require('path');

var error = chalk.bold.red;
var warn = chalk.bold.yellow;
var success = chalk.bold.green;

module.exports = function(gulp, plugins, config) {
  'use strict';

  return function(done) {

    var src = [
      config.translate.development.source
    ];

    return gulp.src(src)
      .pipe(plugins.jsoncombine('en-us.json', function(data) {

        // the base object used for building the output language file.
        var output = {};

        _.forEach(data, function(jsonObject, filePath) {
          try {
            // read content of file into a JSON object
            var newKeys = _.keys(jsonObject);
            var existingKeys = _.keys(output);
            _.each(newKeys, function(key) {
              if (_.contains(existingKeys, key)) {
                console.log(warn('Duplicate key error: ' +
                  key + ' in file ' + filePath));
              }
            });
            _.assign(output, jsonObject);

          } catch (err) {
            console.log(warn(err));
          }
        });

        //Buffer is a native and global nodejs class
        return new Buffer(JSON.stringify(output, null, 2), 'utf8');
      }))
      .pipe(gulp.dest(config.translate.development.dest));

  };
};
