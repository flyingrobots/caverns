var path = require('path');
var url = require('url');
var express = require('express');
var config = require('./config');

var app = express();

var resolve_content_path = function(filepath) {
  if (filepath == '/') {
    filepath = 'index.html';
  }

  if (path.extname(filepath) == '.png')
    return config.getContentPath() + '/' + filepath;
  else
    return config.getClientPath() + '/' + filepath;
}

app.get('/*', function(req, res) {
  filepath = resolve_content_path(url.parse(req.url).pathname);
  console.log('GET ' + filepath);
  res.sendfile(path.resolve(filepath));
});

var port = 1337;
app.listen(port);

console.log("Sweet\nhttp://localhost:" + port + "\nCTRL + C to stop");
