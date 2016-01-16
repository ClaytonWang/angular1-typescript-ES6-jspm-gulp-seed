module.exports = function(gulp, plugins, config) {
  'use strict';

  return function() {

    console.log(config.gsap.inject);

    return gulp.src(config.gsap.template)
      .pipe(plugins.inject(gulp.src(config.gsap.inject), {
        starttag: '/* begin-gsap-inject:js */',
        endtag: '/* end-gsap-inject:js */',
        transform: function(filePath, file) {
          // return file contents as string
          return file.contents.toString('utf8') + '\n';
        }
      }))

      /**
       * Rename index-template.html to index.html
       */
      .pipe(plugins.rename(config.gsap.fileName))

      /**
       * Save to ( expirements | app ) location
       */
      .pipe(gulp.dest(config.gsap.dest));
  };
};
