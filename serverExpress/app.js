/**
 * Module dependencies
 */
var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var errorHandler = require('errorhandler');
var morgan = require('morgan');
var routes = require('./routes');
var partials = require('./routes/partials');
var api = require('./routes/api');
var http = require('http');
var path = require('path');
var mailer = require('express-mailer');
var mongoose = require('mongoose');
var openBrowser = require('open');
var tinylrFn = require('tiny-lr');

var tinylr = tinylrFn();

var server;

module.exports.launchServer = function(config) {
  'use strict';
  var app = module.exports = express();
  tinylr.listen(config.liveReloadPort);

  /**
   * Configuration
   */

  // all environments
  app.set('port', config.port || 3000);
  //app.set('views', __dirname + '/views');
  //app.set('view engine', 'jade');
  app.use(morgan('dev'));
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());
  app.use(methodOverride());
  app.use(express.static(path.join(process.cwd(), config.baseDir)));

  var env = process.env.NODE_ENV || 'development';

  // development only
  if (env === 'development') {
    app.use(errorHandler());
  }

  // production only
  // if (env === 'production') {
  // TODO
  // }

  // Express Mailer configuration
  mailer.extend(app, {
    from: 'username@gmail.com',
    host: 'smtp.gmail.com', // hostname
    secureConnection: true, // use SSL
    port: 465, // port for secure SMTP
    transportMethod: 'SMTP', // default is SMTP. Accepts anything that nodemailer accepts
    auth: {
      user: 'username',
      pass: 'password'
    }
  });

  // Mongoose configuration
  // Use your own configuration
  //mongoose.connect('mongodb://<user>:<pass>@<host>:<port>/<db>');

  if (config.useMongoDB) {
    mongoose.connect('mongodb://localhost:27017/' + config.mongoDB);
  }

  /**
   * Routes
   */
  app.use(
    config.baseURL,
    routes);

  // server view partials
  //  app.use('/partials', partials);

  // JSON API
  app.use('/api', api);

  // redirect all others to the index (HTML5 history)
  app.get('*', function(req, res, next) {
    res.sendFile(path.join(process.cwd(), config.baseDir, 'index.html'));
  });

  /**
   * Start Server
   */

  // http.createServer(app).listen(app.get('port'), function() {
  server = app.listen(app.get('port'), function() {
    openBrowser('http://localhost:' + config.port + config.baseURL);
    console.log('Express server listening on port ' + app.get('port'));
  });
};

module.exports.notifyLiveReload = function(e) {
  'use strict';
  var fileName = e.path;
  tinylr.changed({
    body: {files: [fileName]}
  });
};

module.exports.close = function() {
  'use strict';
  //tinylr.close();
  //server.close(function() {
  //  console.log('server closed');
  //});
};
