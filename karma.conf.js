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
          'es6-module-loader':
            'node_modules/es6-module-loader/dist/es6-module-loader.js'
        },
        packages: {
          'app': {
            defaultExtension: 'ts'
          }
        },
        transpiler: 'typescript'
      },
      serveFiles: [
        'app/**/!(test | template)*.ts'
      ]
    },

    files: [
      'app/**/*test.ts'
    ],

    preprocessors: {},

    proxies: {},

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],

    browsers: ['Chrome'],

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    autoWatch: true,

    singleRun: false

  });

};
