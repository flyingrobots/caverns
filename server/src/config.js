var path = require('path');

var clientPath = path.resolve(__dirname, '../../client');

exports.getClientPath = function() {
  return clientPath;
}

exports.getContentPath = function() {
  return clientPath + "/content";
}
