var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.urlencoded({extended: false}));

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

app.get('/:word/echo', function(req, res) {
  res.json({ echo: req.params.word });
});


app.get('/name', function(req, res) {
  const firstName = req.query['first'] || '';
  const lastName = req.query['last'] || '';
  res.json({ name: `${firstName} ${lastName}` });
})

module.exports = app;
