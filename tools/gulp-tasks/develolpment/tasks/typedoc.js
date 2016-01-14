var exec = require('child_process').exec;
var chalk = require('chalk');
var error = chalk.bold.red;
var warn = chalk.bold.yellow;
var success = chalk.bold.green;


module.exports = function(gulp, plugins, config) {

  return function(done) {
    return gulp
      .src([config.typescript.development.typedoc])
      .pipe(plugins.typedoc({
        module: 'system',
        target: 'es6',
        out: 'docs/typedoc',
        name: 'Angular 1.x TypeScript Docs'
      }));

    //exec('typedoc --out docs/typedoc app/src --name Angular 1.x TypeScript Docs --module system --target ES6',
    //  function(err, stdout, stderr) {
    //    console.log(success(stdout));
    //    console.log(error(stderr));
    //    done(err);
    //  });
  };
};
