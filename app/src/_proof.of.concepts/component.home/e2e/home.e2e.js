'use strict';

var path = require('path');
var e2eHelpers = require(path.join(process.cwd(), 'tools', 'e2eHelpers'));

describe('The home view', function() {
  var p;

  beforeEach(function() {

    p = require('./home.po');
    browser.get(p.page.url);
    p.e2eHelpers.waitForUrlToChangeTo(p.page.url, 10000);

  });

  afterEach(function() {
    p = null;
  });

  it('should have home title', function() {
    expect(p.page.h1.getText()).toEqual('Angular 1.x Seed!');
  });

});
