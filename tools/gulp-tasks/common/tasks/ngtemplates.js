module.exports = function (gulp, plugins, config) {

  config = config.html.development;

  return function (done) {

    var src = [
      config.source,
      '!' + config.dest + '/index.html'
    ];

    return gulp.src(src)
      .pipe(plugins.htmlmin({collapseWhitespace: true}))
      .pipe(plugins.ngTemplates({
        filename: 'app.templates.ts',
        module: 'app.templates',
        path: function (path, base) {
          // path to app directory
          return path.replace(base, '').replace('/' + config.dest, '');
        }
      }))
      .pipe(gulp.dest(config.dest));

  };
};
