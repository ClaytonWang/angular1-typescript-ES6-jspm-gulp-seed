/* global module */
module.exports = function(config) {
  'use strict';

  config.set({
    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: './',

    frameworks: ['systemjs', 'jasmine'],

    systemjs: {
      configFile: 'app/system.config.js',
      config: {
        paths: {
          'typescript': 'node_modules/typescript/lib/typescript.js',
          'systemjs': 'node_modules/systemjs/dist/system.js',
          'system-polyfills': 'node_modules/systemjs/dist/system-polyfills.js',
          'es6-module-loader': 'node_modules/es6-module-loader/dist/es6-module-loader.js'
        },
        packages: {
          'app': {
            defaultExtension: 'js'
          }
        }
        //,transpiler: 'typescript'
      },
      serveFiles: [
        'app/**/!(test)*.js'
      ]
    },

    files: [
      'app/jspm_packages/github/angular/bower-angular@1.4.8/angular.js',
      'app/jspm_packages/github/angular/bower-angular-mocks@1.4.8/angular-mocks.js',
      'app/src/**/!(index)*.js',

      // paths to support debugging with source maps in dev tools
      {pattern: 'app/src/**/*.ts', included: false, watched: false},
      {pattern: 'app/src/**/*.js.map', included: false, watched: false}
    ],

    preprocessors: {
      'app/src/**/!(*.test)+(.js)': ['coverage']
    },

    coverageReporter: {
      dir: 'build/coverage/',
      reporters: [
        // will generate json report file and this report is loaded to
        // make sure failed coverage cause gulp to exit non-zero
        {type: 'json', subdir: 'report-json'},

        // it does not generate any file but it will print coverage to console
        {type: 'text-summary'}
      ]
    },

    proxies: {
      '/base/jspm_packages/': '/base/app/jspm_packages/'
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress', 'coverage'],

    browsers: ['Chrome'],

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    autoWatch: true,

    singleRun: true

  });

};
