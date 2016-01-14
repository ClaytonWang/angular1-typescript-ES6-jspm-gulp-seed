function waitForUrlToChangeTo(url, timeout) {
  var urlRegex = new RegExp( url, 'i');
  var currentUrl;

  return browser.getCurrentUrl().then(function storeCurrentUrl(url) {
      currentUrl = url;
    }
  ).then(function waitForUrlToChangeTo() {
      return browser.wait(function () {
        return browser.getCurrentUrl().then(function compareCurrentUrl(url) {
          return urlRegex.test(url);
        });
      }, timeout);
    }
  );
}

module.exports.waitForUrlToChangeTo = waitForUrlToChangeTo;
