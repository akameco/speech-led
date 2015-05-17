var onButton = document.getElementById('on');
var offButton = document.getElementById('off');

onButton.addEventListener('click',function(){
  fetch('/on');
});

offButton.addEventListener('click',function(){
  fetch('/off');
});
