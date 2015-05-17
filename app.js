var express = require('express');
var path = require('path');

var app = express();
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'bower_components')));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.get('/', function(req, res, next) {
  res.render('index');
});

var five = require('johnny-five');
var board = new five.Board();
var led;
board.on('ready', function() {
  led = new five.Led(13);
  console.log('board is ready');  
});

app.get('/on', function(req, res, next) {
  if(board.isReady){ led.on(); }
  console.log('on');
});

app.get('/off', function(req, res, next) {
  if(board.isReady){ led.off(); }
  console.log('off');
});

app.listen(3000);
