/**
 * Used in the post install process.
 * @param gulp
 * @param plugins
 * @param config
 * @returns {Function}
 */
module.exports = function(gulp, plugins, config) {

  return function(done) {
    return plugins.shell.task([
      'npm prune'
    ]);
  };
};
