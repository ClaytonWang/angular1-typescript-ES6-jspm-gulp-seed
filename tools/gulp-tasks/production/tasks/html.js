module.exports = function(gulp, plugins, config) {
  'use strict';

  config = config.html.production;

  return function(done) {

    return gulp.src(config.source)
      .pipe(plugins.removeCode({production: true}))

      //.pipe(plugins.inject(sources, {
      //  ignorePath: ignorePath
      //}))

      .pipe(plugins.inject(gulp.src(config.dest + '/build.js', {read: false}), {
        //starttag: '<!-- begin-build-inject:js -->',
        //endtag: '<!-- end-build-inject:js -->',
        transform: function(filepath, file, i, length) {

          var pathToLibItem = '<script src=\"';
          pathToLibItem += filepath.split('/').pop();
          pathToLibItem += '\"></script>';

          return pathToLibItem;
        }
      }))

      .pipe(gulp.dest(config.dest));
  };
};
