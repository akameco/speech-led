var socket = io();

var onButton = document.getElementById('on');
onButton.addEventListener('click',function(){
  socket.emit('led', 'on');
});

var offButton = document.getElementById('off');
offButton.addEventListener('click',function(){
  socket.emit('led', 'off');
});

// 音声認識
var recognition = new webkitSpeechRecognition();
var recognitioning = false;
recognition.lang = "ja-JP";
recognition.continuous = true;

recognition.onresult = function (event) {
  for (var i = 0; i < event.results.length; ++i) {
    var speechText = event.results[event.resultIndex][0].transcript.trim();
    console.log(speechText);
    if (speechText.match('オン')) {
      socket.emit('led', 'on');
    } else if (speechText.match('オフ')) {
      socket.emit('led', 'off');
    }
  }
};

var button = document.getElementById('start');
button.addEventListener('click', function () {
  if (recognitioning) {
    recognition.stop();
    this.textContent = 'スタート';
    recognitioning = false;
  } else {
    recognition.start();
    this.textContent = 'ストップ';
    recognitioning = true;
  }
});
