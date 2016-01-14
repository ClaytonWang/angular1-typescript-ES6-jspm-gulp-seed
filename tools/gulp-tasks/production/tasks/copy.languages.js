module.exports = function(gulp, plugins, config) {

  return function(done) {

    var src = [
      config.translate.production.source
    ];

    return gulp.src(src)
      .pipe(gulp.dest(config.translate.production.dest));
  };
};
