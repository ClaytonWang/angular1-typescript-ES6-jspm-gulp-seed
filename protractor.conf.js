'use strict';

var path = require('path');
var ScreenShotReporter = require('protractor-html-screenshot-reporter');
var webServerDefaultPort = 8000;

exports.config = {

  // Capabilities to be passed to the webdriver instance.
  capabilities: {
    'browserName': (process.env.TEST_BROWSER_NAME || 'chrome'),
    'version': (process.env.TEST_BROWSER_VERSION || 'ANY'),
    'chromeOptions': {
      'args': ['show-fps-counter=true']
    }
  },

  //multiCapabilities: [
  //  {browserName: 'chrome'}
  //],

  // Default http port to host the web server
  webServerDefaultPort: webServerDefaultPort,

  // Protractor interactive tests
  interactiveTestPort: 6969,

  // A base URL for your application under test.
  baseUrl: 'http://' + (process.env.HTTP_HOST || 'localhost') +
  ':' + (process.env.HTTP_PORT || webServerDefaultPort),

  // Selector for the element housing the angular app.
  rootElement: 'body',

  seleniumArgs: ['-browserTimeout=60'],

  specs: ['app/src/**/*.e2e.js'],

  framework: 'jasmine2',

  /**
   * A callback function called once protractor is ready and available,
   * and before the specs are executed.
   *
   * You can specify a file containing code to run by setting onPrepare to
   * the filename string.
   */
  onPrepare: function() {
    browser.driver.manage().window().setSize(1024, 768);

    /**
     * At this point, global 'protractor' object will be set up, and
     * jasmine will be available.
     *
     * The require statement must be down here, since jasmine-reporters
     * needs jasmine to be in the global and protractor does not guarantee
     * this until inside the onPrepare function.
     */
    var jasmineReporters = require('jasmine-reporters');

    // returning the promise makes protractor wait for the reporter config before executing tests
    return browser.getProcessedConfig().then(function(config) {
      // you could use other properties here if you want, such as platform and version
      var browserName = config.capabilities.browserName;

      var junitReporter = new jasmineReporters.JUnitXmlReporter({
        consolidateAll: true,
        savePath: './build/e2e-reports/e2e-test-report',
        // this will produce distinct xml files for each capability
        filePrefix: browserName + '-xmloutput',
        modifySuiteName: function(generatedSuiteName, suite) {
          // this will produce distinct suite names for each capability,
          // e.g. 'firefox.login tests' and 'chrome.login tests'
          return browserName + '.' + generatedSuiteName;
        }
      });
      jasmine.getEnv().addReporter(junitReporter);

      // Add a screenshot reporter and store screenshots to `/test/test-reports/screenshots`:
      jasmine.getEnv().addReporter(new ScreenShotReporter({
        baseDirectory: './build/e2e-reports/screenshots',
        pathBuilder: function pathBuilder(spec, descriptions, results, capabilities) {
          // Return '<browser>/<specname>' as path for screenshots:
          // Example: 'firefox/list-should work'.
          return path.join(capabilities.caps_.browserName, descriptions.join('-'));
        },
        takeScreenShotsOnlyForFailedSpecs: true
      }));

      var SpecReporter = require('jasmine-spec-reporter');
      // add jasmine spec reporter
      jasmine.getEnv().addReporter(new SpecReporter({
        displayStacktrace: 'summary',    // display stacktrace for each failed assertion, values: (all|specs|summary|none)
        displayFailuresSummary: true, // display summary of all failures after execution
        displayPendingSummary: true,  // display summary of all pending specs after execution
        displaySuccessfulSpec: true,  // display each successful spec
        displayFailedSpec: true,      // display each failed spec
        displayPendingSpec: false,    // display each pending spec
        displaySpecDuration: false,   // display each spec duration
        displaySuiteNumber: false,    // display each suite number (hierarchical)
        colors: {
          success: 'green',
          failure: 'red',
          pending: 'yellow'
        },
        prefixes: {
          success: '✓ ',
          failure: '✗ ',
          pending: '* '
        },
        customProcessors: []
      }));

    });

  },

  // ----- Options to be passed to minijasminenode -----
  jasmineNodeOpts: {
    // If true, display spec names.
    isVerbose: true,
    print: function() {
    }
  }
};
