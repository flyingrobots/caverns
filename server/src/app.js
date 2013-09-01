var path = require('path');
var url = require('url');
var express = require('express');
var config = require('./config');

var useSandbox = false;

// process command line arguments
process.argv.forEach(function(val, index, array) {
  if(val == 'sandbox') {
    useSandbox = true;
  }
});

var joinPath = function(root, path) {
  return root + '/' + path;
}

var resolveFilepath = function(filepath) {
  console.log("filepath is " + filepath);
  // default to index.html
  if (filepath == '/')
    filepath = 'index.html';
  // index.html lives in the client root dir
  if (filepath == 'index.html') {
    if (useSandbox)
      return joinPath(config.getSandboxPath(), filepath);
    else
      return joinPath(config.getClientPath(), filepath);
  }
  // other assets live under the 'content' subdirectory
  else {
    if (useSandbox)
      return joinPath(config.getSandboxContentPath(), filepath);
    else
      return config.getContentPath() + '/' + filepath;
  }
}

var app = express();
app.get('/', function(req, res) {
  filepath = resolveFilepath(url.parse(req.url).pathname);
  console.log('GET ' + filepath);
  res.sendfile(path.resolve(filepath));
});

// spin up the server
var port = 1337;
app.listen(port);
console.log("Sweet\nhttp://localhost:" + port + "\nCTRL + C to stop");
if (useSandbox) {
  console.log("[SANDBOX]");
}
