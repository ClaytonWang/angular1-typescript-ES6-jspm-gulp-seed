var fs = require('fs');

/**
 * Could have used lodash's _.isFile function, but wanted to make sure this
 * is compatible with all versions of node.js
 *
 *
 * Reference: http://stackoverflow.com/questions/4482686/
 * check-synchronously-if-file-directory-exists-in-node-js
 *
 * @param {string} file
 * @returns {*}
 */
module.exports.test = function isFile(file) {
  var stats;
  var method;

  if (fs.lstatSync) {
    method = fs.lstatSync; //node 2015
  } else if (fs.lstatSync) {
    method = fs.existsSync; //node 2012
  } else if (fs.existsSync) {
    method = fs.statSync; //node 2010
  }

  try {
    // Query the entry
    stats = method(file);
  }
  catch (e) {
    //console.log(error('ERROR: file does not exist: ' + file));
  }

  if (fs.existsSync) {
    return (stats !== undefined || stats !== null);
  } else {
    return stats.isFile();
  }
};
