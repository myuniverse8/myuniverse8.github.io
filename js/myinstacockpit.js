window.onload = function() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();
    if (dd < 10) {
        dd = '0' + dd
    }
    if (mm < 10) {
        mm = '0' + mm
    }
    var todayStr = yyyy + '-' + mm + '-' + dd;
    document.getElementById('endda').value = todayStr;
    todayStr = yyyy + '-' + mm + '-01';
    document.getElementById('begda').value = todayStr;

    $('#nickname').trigger('focus');
}

function openWindow(myWinName, myUrl, currentValues) {
    var begda = document.getElementById('begda').value;
    var endda = document.getElementById('endda').value;
    myUrl = myUrl + '&testmode=' + currentValues.myTestMode + '&begda=' + begda + '&endda=' + endda + '&dates=' + currentValues.myUseDates;
    myWin = window.open(myUrl, myWinName);
}

function goBtnClick() {
  var currentValues = getCurrentValues();
  var option = $("#sel-mode").val();
  var myWinName;

  //0 - photos, 1 - post/comments, 2 - tags, 3 - locations, 4 - commentors, 5 - likers
  switch (option) {
      case '0':
          myWinName = 'myphotos_';
          break;
      case '1':
          myWinName = 'mycomments_';
          break;
      case '2':
          myWinName = 'mytags_';
          break;
      case '3':
          myWinName = 'mylocations_';
          break;
      case '4':
          myWinName = 'mycommentors_';
          break;
      case '5':
          myWinName = 'mylikers_';
          break;
  }

  myWinName = myWinName + currentValues.myNickname;
  myUrl = 'newpage.html?nickname=' + currentValues.myNickname + '&mode=' + option;
  openWindow(myWinName, myUrl, currentValues);
}

function getCurrentValues() {
    var currentValues = {};

    currentValues.myNickname = document.getElementById('nickname').value;
    currentValues.myTestMode = '';

    if (document.getElementById('testmode').checked) {
        currentValues.myTestMode = 'X';
    };
    currentValues.myUseDates = '';
    if (document.getElementById('dates').checked) {
        currentValues.myUseDates = 'X';
    };

    return currentValues;
}

toggleDatesCheckbox = function(element) {
    if (element.checked === true) {
        $("div#dates").show();
        document.getElementById("testmode").checked = false;
    } else {
        $("div#dates").hide();
    }
}

$(document).keypress(function (e) {
    if (e.which == 13) {
        e.preventDefault();
        $('#go-btn').click();
    }
});
