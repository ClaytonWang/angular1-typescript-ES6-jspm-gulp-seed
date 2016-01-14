var src = null;

module.exports.getDev = function getDev() {
  if (!src) {
    src = require('./app');
  }
  return src;
};

var production = null;

module.exports.getProd = function getProd() {
  if (!production) {
    production = require('./app');
  }
  return production;
};

var coverage = null;

module.exports.getCoverage = function getCoverage() {
  if (!coverage) {
    coverage = require('./app');
  }
  return coverage;
};

var sassdoc = null;

module.exports.getSassdoc = function getSassdoc() {
  if (!sassdoc) {
    sassdoc = require('./app');
  }
  return sassdoc;
};

var typedoc = null;

module.exports.getTypedoc = function getTypedoc() {
  if (!typedoc) {
    typedoc = require('./app');
  }
  return typedoc;
};
