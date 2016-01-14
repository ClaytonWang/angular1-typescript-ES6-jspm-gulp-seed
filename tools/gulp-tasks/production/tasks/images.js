module.exports = function(gulp, plugins, config) {
  'use strict';

  config = config.images.production;

  return function(done) {
    return gulp.src(config.source)
      .pipe(gulp.dest(config.dest));
  };
};
