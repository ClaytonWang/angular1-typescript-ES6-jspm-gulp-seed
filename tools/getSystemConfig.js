var fs = require("fs");

var systemConfig = null;
var gitHubPath = null;
var npmPath = null;

var System = {
  config: function(_config) {
    "use strict";
    systemConfig = _config;
    gitHubPath = _config.paths["github:*"].substr(0, _config.paths["github:*"].length - 1);
    npmPath = _config.paths["npm:*"].substr(0, _config.paths["npm:*"].length - 1);
  }
};

eval(fs.readFileSync("app/system.config.js", "utf-8"));

function getPath(key) {
  "use strict";
  var path = systemConfig.map[key].replace("github:", gitHubPath).replace("npm", npmPath);
  return "/" + path + "/";
}

module.exports.getPath = getPath;
