var express = require('express');
var app = express();

const myMiddleware = function(req, res, next) {
  console.log(`${req.method} ${req.path} - ${req.ip}`)
  next();
}

app.use(myMiddleware);

app.use('/public', express.static(__dirname + '/public'));

app.get('/', function(req, res) {
  const absolutePath = __dirname + "/views/index.html"
  res.sendFile(absolutePath);
});

app.get('/json', function(req, res) {
  let message = "Hello json";
  if (process.env.MESSAGE_STYLE === "uppercase") {
    message = message.toUpperCase();
  }
  res.json({ "message": message});
});

const timeMiddleware = function(req, res, next) {
  req.time = new Date().toString();
  next();
}

app.get('/now', timeMiddleware, function(req, res) {
  res.json({ time: req.time });
});

module.exports = app;

























 module.exports = app;
