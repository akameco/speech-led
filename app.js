var express = require('express');
var path = require('path');
var app = express();

var server = require('http').Server(app);
var io = require('socket.io')(server);

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'bower_components')));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// app.listen(3000);
server.listen(3000);

app.get('/', function(req, res, next) {
  res.render('index');
});

var five = require('johnny-five');
var board = new five.Board({reql: false});
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

io.on('connection', function (socket) {
  socket.on('led', function (data) {
    console.log(data);
    if (data === 'on') {
      if(board.isReady){ led.on(); }
    } else if(data === 'off') {
      if(board.isReady){ led.off(); }
    }
  });
});

