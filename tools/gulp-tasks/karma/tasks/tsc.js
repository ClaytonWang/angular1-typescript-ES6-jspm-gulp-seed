var path = require('path');
module.exports = function(gulp, plugins, config) {

  config = config.typescript.development;
  var tsProject = plugins.typescript.createProject({
    target: 'es5',
    module: 'commonjs',
    sortOutput: true,
    typescript: require('typescript')
  });

  return function(done) {
    var res = gulp.src(config.ts, {
        base: '.'
      })
      .pipe(plugins.sourcemaps.init())
      .pipe(plugins.typescript(tsProject));
    return res.js
      .pipe(plugins.sourcemaps.write('.', {
        // Return relative source map root directories per file.
        includeContent: false,
        sourceRoot: function(file) {
          var sourceFile = path.join(file.cwd, file.sourceMap.file);
          return path.relative(path.dirname(sourceFile), file.cwd);
        }
      }))
      .pipe(gulp.dest('.'));
  };
};
