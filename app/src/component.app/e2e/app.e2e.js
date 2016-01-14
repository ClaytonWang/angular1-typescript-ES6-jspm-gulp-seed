'use strict';

describe('The app component', function() {
  var p;

  beforeEach(function() {

    p = require('./app.po');
    browser.get(p.page.url);
    p.e2eHelpers.waitForUrlToChangeTo(p.page.url, 10000);

  });

  afterEach(function() {
    p = null;
  });

  it('should have a title', function() {
    expect(browser.getTitle()).toEqual('Seed App');
  });

  it('should have nav links', function() {

    expect(p.page.nav.getText()).toEqual(['Home', 'About', 'BookShelf']);

  });

});
