var express = require('express');
var app = express();

app.delete('/hero/:hi-:me', function(req, res) {
  res.json({"hero":req.params.hi,"villain":req.params.me});
});
module.exports = app;
