var merge = require('merge-stream');

module.exports = function(gulp, plugins, config) {
  'use strict';

  config = config.sass.development;

  return function(done) {

    return gulp.src(config.src)
      .pipe(plugins.cssGlobbing({
        extensions: ['.scss']
      }))
      .pipe(plugins.sass().on('error', plugins.sass.logError))
      .pipe(plugins.concat('features.css'))
      .pipe(plugins.flatten())
      .pipe(gulp.dest(config.dest));
  };
};
