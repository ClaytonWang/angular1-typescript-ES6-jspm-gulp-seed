/**
 * This file uses the Page Object pattern to define the main page for tests
 * https://docs.google.com/presentation/d/1B6manhG0zEXkC-H-tPo2vwU06JhL8w9-XCF9oehXzAQ
 */

'use strict';

var path = require('path');
module.exports.e2eHelpers = require(path.join(process.cwd(), 'tools', 'e2eHelpers'));

var Url = function() {
  this.home           = 'http://localhost:8000/#/';
  this.bookshelf      = 'http://localhost:8000/#/bookShelf/list';
};

module.exports.url = new Url();

var  HomePage = function() {
  this.homeNav        = element(by.css('.container'));
  this.bookShelfCTA   = this.homeNav.all(by.tagName('a')).get(2);
};

module.exports.homeView = new HomePage();

var BookShelfPage     = function() {
  this.title          = element(by.css('.navbar-brand'));
};

module.exports.bookShelfView = new BookShelfPage();
