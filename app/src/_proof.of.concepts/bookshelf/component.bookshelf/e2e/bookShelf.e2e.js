'use strict';

describe('/bookShelf', function() {

  var p;
  var url;
  var e2eHelpers;

  beforeEach(function() {

    p = require('./bookShelf.po');
    url = p.url;
    e2eHelpers = p.e2eHelpers;

    browser.get(url.home);
    e2eHelpers.waitForUrlToChangeTo(url.home, 10000);

    p.homeView.bookShelfCTA.click();
    e2eHelpers.waitForUrlToChangeTo(url.bookshelf, 10000);

  });

  afterEach(function() {
    p = null;
    url = null;
    e2eHelpers = null;
  });

  it('should have bookShelf title', function() {
    expect(p.bookShelfView.title.getText()).toEqual('e-Book Shelf');
  });

});
