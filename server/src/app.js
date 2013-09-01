var path = require('path');
var url = require('url');
var express = require('express');
var config = null;

var useSandbox = false;
process.argv.forEach(function(val, index, array) {
  if(val == 'sandbox')
    useSandbox = true;
});

// TODO production.json and test.json configs
if (useSandbox) {
  console.log("== SANDBOX ==");
  config = require('../config/sandbox.json');
} else {
  console.log("== DEV ==");
  config = require('../config/dev.json');
}
console.log(JSON.stringify(config));

var expandPath = function(root, filepath) {
  p = __dirname + '/../../' + root + '/' + filepath;
  return path.resolve(p);
}

var app = express();

app.get('/', function(req, res) {
  p = expandPath(config.root, 'index.html');
  console.log(p);
  res.sendfile(p);
});

app.get('/*.js', function(req, res) {
  console.log(req.route);
  res.sendfile(expandPath(config.root, url.parse(req.url).pathname));
});

app.get('/*.png', function(req, res) {
  console.log(req.route);
  res.sendfile(expandPath(config.content, url.parse(req.url).pathname));
});

console.log("== STARTING ==")
app.listen(config.port);

console.log("Sweet. http://localhost:" + config.port);
console.log("CTRL + C to stop");

console.log("== LOG ==");
