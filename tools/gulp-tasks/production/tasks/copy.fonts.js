module.exports = function(gulp, plugins, config) {

  return function(done) {
    return gulp.src(config.fonts.source)
      .pipe(gulp.dest(config.fonts.dest));
  };
};
