var path = require('path');

// TODO make this config-driven
var clientPath = path.resolve(__dirname, '../../client');

exports.getClientPath = function() {
  return clientPath;
}

exports.getContentPath = function() {
  return clientPath + "/content";
}

// TODO kill once everything is config-driven
exports.getSandboxPath = function() {
  return path.resolve(__dirname, '../../sandbox');
}

// TODO kill once everything is config-driven
exports.getSandboxContentPath = function() {
  return path.resolve(__dirname, '../../sandbox/content');
}
