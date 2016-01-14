var path = require('path');
var serverPath = path.relative(__dirname,
  path.join(process.cwd(), 'serverExpress', 'app.singleton'));
var server = require(serverPath).getTypedoc();

module.exports = function(gulp, plugins, config) {
  return function(done) {
    server.launchServer(config.expressServer.typedoc);
    done();
  };
};
