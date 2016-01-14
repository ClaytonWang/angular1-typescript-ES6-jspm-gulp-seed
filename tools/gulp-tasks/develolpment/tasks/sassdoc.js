var sassdoc = require('sassdoc');

module.exports = function(gulp, plugins, config) {

  return function(done) {

    //http://sassdoc.com/configuration/#options
    var options = {
      dest: 'docs/sassdoc',
      verbose: true,
      display: {
        access: ['public', 'private'],
        alias: true,
        watermark: true
      },
      groups: {
        'fontMixins': 'Font Mixins',
        'fontWeight': 'font-weight',
        'Colors': 'Colors',
        'feature': 'Feature Classes'
      }
      //,basePath: 'https://github.com/SassDoc/sassdoc',
    };

    config = config.sass.development;

    var src = [
      config.stylesRoot,
      config.src
    ];

    return gulp.src(src)
      .pipe(sassdoc(options));
  };
};
