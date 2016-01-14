/**
 * This file uses the Page Object pattern to define the main page for tests
 * https://docs.google.com/presentation/d/1B6manhG0zEXkC-H-tPo2vwU06JhL8w9-XCF9oehXzAQ
 */

'use strict';

var path = require('path');
module.exports.e2eHelpers = require(path.join(process.cwd(), 'tools', 'e2eHelpers'));

var  AboutPage = function() {
  this.homeUrl        = 'http://localhost:8000/#/';
  this.aboutUrl       = 'http://localhost:8000/#/about';
  this.h1             = element(by.tagName('h1'));
  this.aboutCTA          = element.all(by.tagName('a')).get(1);
};

// export {AppComponent};
module.exports.page = new AboutPage();
