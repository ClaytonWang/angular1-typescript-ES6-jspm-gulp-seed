var UglifyJS = require("uglify-js");
var fs = require("fs");

// jscs:disable
module.exports = function(gulp, plugins, config) {

  return function(done) {
    var result = UglifyJS.minify('build/production/build.js', {
      outSourceMap: "build.js.map",
      mangle: false,
      compress: {
        screw_ie8: true,
        sequences: true,
        dead_code: true,
        conditionals: true,
        booleans: true,
        unused: true,
        if_return: true,
        join_vars: true,
        drop_console: true
      }
    });

    fs.writeFileSync('build/production/build.min.js', result.code);
    fs.writeFileSync('build/production/build.min.map', result.map);
    done();
  };
};
// jscs:enable
