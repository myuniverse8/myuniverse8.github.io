var myNickname = '';
var myUrl = '';
var myComments = '';
var myTestMode = '';
var myTitle = '';

function getURLParameter(name) {
    return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [null, ''])[1].replace(/\+/g, '%20')) || null;
}

window.onload = function() {
    myNickname = getURLParameter('nickname');
    // myUrl = 'https://crossorigin.me/https://www.instagram.com/' + myNickname + '/media/';
    myUrl = 'https://cors-anywhere.herokuapp.com/https://www.instagram.com/' + myNickname + '/media/';

    myComments = getURLParameter('comments');
    myTestMode = getURLParameter('testmode');

    myTitle = myNickname + '(';

    if (myComments === 'X') {
        myTitle = myTitle + 'comments)';
        document.getElementById("myList").classList.add("comments");
    } else {
        document.getElementById("myList").classList.add("photos");
        myTitle = myTitle + 'photos)';
    }

    document.title = myTitle;
    loadData(myUrl);
};

loadData = function(mediaUrl) {
    var xhr = new XMLHttpRequest();

    // xhr.open('GET', mediaUrl, false);
    xhr.open('GET', mediaUrl, true);

    xhr.send();

    xhr.onreadystatechange = function() {
        if (xhr.readyState != 4) return;

        if (xhr.status != 200) {
            console.log(xhr.status + ': ' + xhr.statusText);
        } else {
            var mediaObj = JSON.parse(xhr.responseText);
            if (myComments === 'X') {
                processMediaObjComments(mediaObj);
            } else {
                processMediaObjPhotos(mediaObj);
            }
        }
    }
}

getDateStr = function (d) {
  var date = d.getDate() < 10 ? '0' + d.getDate() : d.getDate();
  var month = (d.getMonth()+1) < 10 ? '0' + (d.getMonth()+1) : (d.getMonth()+1);
  var hours = d.getHours() < 10 ? '0' + d.getHours() :  d.getHours();
  var minutes = d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes();
  return date + "-" + month + "-" + d.getFullYear() + " " + hours + ":" + minutes;
}

processMediaObjPhotos = function(mediaObj) {
    var i = 0;
    var j = 0;
    var nextUrl = '';

    var itemsLength = mediaObj.items.length;

    for (i = 0; i < itemsLength; i++) {
        //console.log(mediaObj.items[i]);

        var photoTxt = '<a target="_blank" href="' + mediaObj.items[i].link + '"><img src="' + mediaObj.items[i].images.thumbnail.url + '"></img></a>';

        var node = document.createElement("LI"); // Create a <li> node
        node.innerHTML = photoTxt;
        document.getElementById("myList").appendChild(node);

        if (i === (itemsLength - 1)) {
            nextUrl = myUrl + '?max_id=' + mediaObj.items[i].id;
        } else {
            nextUrl = '';
        }
    }

    if (nextUrl !== '') {
        if (myTestMode !== 'X') {
            loadData(nextUrl);
        }
    }
}

processMediaObjComments = function(mediaObj) {
    var i = 0;
    var j = 0;
    var nextUrl = '';
    var photoScr;
    var commentTxt;
    var node;
    var d;

    var itemsLength = mediaObj.items.length;

    for (i = 0; i < itemsLength; i++) {
          console.log(mediaObj.items[i]);

        d = new Date( +mediaObj.items[i].created_time * 1000 );

        photoScr = mediaObj.items[i].images.standard_resolution.url;
        photoScr = photoScr.replace('s640x640', 's1080x1080');
        if (mediaObj.items[i].caption) {
          commentTxt = '<b>' + getDateStr(d) + ' - post : ' + mediaObj.items[i].caption.text + '</b> (<a target="_blank" href="' + mediaObj.items[i].link + '">post</a>, <a target="_blank" href="' + photoScr + '">big photo</a>)';
        } else {
          commentTxt = '<b>' + getDateStr(d) + ' - post : nocaption </b> (<a target="_blank" href="' + mediaObj.items[i].link + '">post</a>, <a target="_blank" href="' + photoScr + '">big photo</a>)';
        }
        node = document.createElement("li");
        node.innerHTML = commentTxt;
        document.getElementById("myList").appendChild(node);

        var commentsObj = mediaObj.items[i].comments;
        if (commentsObj.count > 0) {
            for (j = 0; j < commentsObj.data.length; j++) {
                //if (commentsObj.data[j].from.username != myNickname) {
                    //    if ( commentsObj.data[j].from.username == mynickname ){
                    // console.log(mediaObj.items[i]);
                    d = new Date( +commentsObj.data[j].created_time * 1000 );
                    photoScr = mediaObj.items[i].images.standard_resolution.url;
                    photoScr = photoScr.replace('s640x640', 's1080x1080');
                    commentTxt = getDateStr(d) + ' - comment : ' + commentsObj.data[j].from.username + ': ' + commentsObj.data[j].text + ' (<a target="_blank" href="' + mediaObj.items[i].link + '">post</a>)';
                    node = document.createElement("li");
                    node.innerHTML = commentTxt;
                    document.getElementById("myList").appendChild(node);
              //  }
            }
        }
        if (i === (itemsLength - 1)) {
            nextUrl = myUrl + '?max_id=' + mediaObj.items[i].id;
        } else {
            nextUrl = '';
        }
    }

    if (nextUrl !== '') {
        if (myTestMode !== 'X') {
            loadData(nextUrl);
        }
    }
}
