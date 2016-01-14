'use strict';

var path = require('path');
var e2eHelpers = require(path.join(process.cwd(), 'tools', 'e2eHelpers'));

describe('/about', function() {
  var p;

  beforeEach(function() {

    p = require('./about.po');
    browser.get(p.page.homeUrl);
    p.e2eHelpers.waitForUrlToChangeTo(p.page.homeUrl, 10000);

    p.page.aboutCTA.click();
    p.e2eHelpers.waitForUrlToChangeTo(p.page.aboutUrl, 10000);
  });

  afterEach(function() {
    p = null;
  });

  it('should have about title', function() {
    expect(p.page.h1.getText()).toEqual('What is this all about!');
  });

});
