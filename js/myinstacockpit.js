var myNickname = '';
var myWin = '';
var myUrl = '';
var myTestMode = '';
var myWinName = '';
var myUseDates = '';
var myInclPostCaption = '';

window.onload = function() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();
    if(dd<10){dd='0'+dd}
    if(mm<10){mm='0'+mm}
    var todayStr = yyyy+'-'+mm+'-'+dd;
    document.getElementById('endda').value = todayStr;
    todayStr = yyyy+'-'+mm+'-01';
    document.getElementById('begda').value = todayStr;
}

function photosBtnClick() {
  getCurrentValues();
  myWinName = 'myphotos_' + myNickname;
  myUrl = 'newpage.html?nickname=' + myNickname;
  openWindow();
}

function commentsBtnClick() {
  getCurrentValues();
  myWinName = 'mycomments_' + myNickname;
  myUrl = 'newpage.html?nickname=' + myNickname + '&comments=X';
  openWindow();
}

function openWindow(){
  myUrl = myUrl + '&testmode=' + myTestMode + '&begda=' + document.getElementById('begda').value + '&endda=' + document.getElementById('endda').value + '&dates=' + myUseDates + '&postcaption=' + myInclPostCaption;
  myWin = window.open(myUrl, myWinName);
}


function getCurrentValues() {
  myNickname = document.getElementById('nickname').value;
  myTestMode = '';
  if ( document.getElementById('testmode').checked ) {
    myTestMode = 'X';
  };
  myUseDates = '';
  if ( document.getElementById('dates').checked ) {
    myUseDates = 'X';
  };
  myInclPostCaption = '';
  if ( document.getElementById('postcaption').checked ) {
    myInclPostCaption = 'X';
  };
}
