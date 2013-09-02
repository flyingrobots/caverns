var path = require('path');
var url = require('url');
var express = require('express');

// app vars ///////////////////////////////////////////////////////////////////

var config = null;
var app = express();

// helper funcs ///////////////////////////////////////////////////////////////

//-----------------------------------------------------------------------------
var expandPath = function(root, filepath) {
  p = __dirname + '/../../' + root + '/' + filepath;
  return path.resolve(p);
}

//-----------------------------------------------------------------------------
var getPathname = function(uri) {
  return url.parse(uri).pathname;
}

//-----------------------------------------------------------------------------
var logRequest = function(uri) {
  console.log('GET ' + uri);
}

//-----------------------------------------------------------------------------
var loadConfig = function() {
  process.argv.forEach(function(val, index, array) {
    switch (val) {
      case 'sandbox': {
        config = require('../config/sandbox.json');
        break;
      }
      case 'dev': {
        config = require('../config/dev.json');
        break;
      }
      case 'test': {
        config = require('../config/test.json');
        break;
      }
    }
  });
  // dev config is fallback
  if (config == null) {
    console.warn('No config given, using \'dev\'');
    config = require('../config/dev.json');
  }
  console.log(JSON.stringify(config));
}

// http routes ////////////////////////////////////////////////////////////////

//-----------------------------------------------------------------------------
app.get('/', function(req, res) {
  logRequest(req.url);
  p = expandPath(config.root, 'index.html');
  res.sendfile(p);
});

//-----------------------------------------------------------------------------
app.get('/*.(html)', function(req, res) {
  logRequest(req.url);
  res.sendfile(expandPath(config.root, getPathname(req.url)));
});

//-----------------------------------------------------------------------------
app.get('/*.js', function(req, res) {
  logRequest(req.url);
  res.sendfile(expandPath(config.root, getPathname(req.url)));
});

//-----------------------------------------------------------------------------
app.get('/*.png', function(req, res) {
  logRequest(req.url);
  res.sendfile(expandPath(config.content, getPathname(req.url)));
});

//-----------------------------------------------------------------------------
app.get('/*', function(req, res) {
  logRequest(req.url);
  console.log(req.route);
});

///////////////////////////////////////////////////////////////////////////////

loadConfig();

console.log("== STARTING ==")
app.listen(config.port);

console.log("Sweet. http://localhost:" + config.port);
console.log("CTRL + C to stop");

console.log("== LOG ==");
