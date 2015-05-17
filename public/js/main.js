var socket = io();

var onButton = document.getElementById('on');
onButton.addEventListener('click',function(){
  socket.emit('led', 'on');
});

var offButton = document.getElementById('off');
offButton.addEventListener('click',function(){
  socket.emit('led', 'off');
});
