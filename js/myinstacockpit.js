var myNickname = '';
var myWin = '';
var myUrl = '';
var myTestMode = '';
var myWinName = '';

window.onload = function() {
  document.getElementById('begda').value = '2017-04-05';
  document.getElementById('endda').value = '2017-04-06';
}

function photosBtnClick() {
  getCurrentValues();
  winName = 'myphotos_' + myNickname;
  myUrl = 'newpage.html?nickname=' + myNickname + '&testmode=' + myTestMode + '&begda=' + document.getElementById('begda').value + '&endda=' + document.getElementById('endda').value;
  myWin = window.open(myUrl, winName);
}

function commentsBtnClick() {
  getCurrentValues();
  myWinName = 'mycomments_' + myNickname;
  myUrl = 'newpage.html?nickname=' + myNickname + '&comments=X' + '&testmode=' + myTestMode + '&begda=' + document.getElementById('begda').value + '&endda=' + document.getElementById('endda').value;;
  myWin = window.open(myUrl, myWinName);
}

function getCurrentValues() {
  myNickname = document.getElementById('nickname').value;
  myTestMode = '';
  if ( document.getElementById('testmode').checked ) {
    myTestMode = 'X';
  };
}
