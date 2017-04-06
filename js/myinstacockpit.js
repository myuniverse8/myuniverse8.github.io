var myNickname = '';
var myWin = '';
var myUrl = '';
var myTestMode = '';
var myWinName = '';
var myInclOwnComments = '';
var myInclPostCaption = '';

function photosBtnClick() {
  getCurrentValues();
  winName = 'myphotos_' + myNickname;
  myUrl = 'newpage.html?nickname=' + myNickname + '&testmode=' + myTestMode;
  myWin = window.open(myUrl, winName);
}

function commentsBtnClick() {
  getCurrentValues();
  myWinName = 'mycomments_' + myNickname;
  myUrl = 'newpage.html?nickname=' + myNickname + '&comments=X' + '&testmode=' + myTestMode + '&owncomments=' + myInclOwnComments + '&postcaption=' + myInclPostCaption;
  myWin = window.open(myUrl, myWinName);
}

function getCurrentValues() {
  myNickname = document.getElementById('nickname').value;
  myTestMode = '';
  myInclOwnComments = '';
  myInclPostCaption = '';
  if ( document.getElementById('testmode').checked ) {
    myTestMode = 'X';
  };
  if ( document.getElementById('myInclOwnComments').checked ) {
    myInclOwnComments = 'X';
  };
  if ( document.getElementById('myInclPostCaption').checked ) {
    myInclPostCaption = 'X';
  };
}
