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
    } else {
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
    //
    // if (xhr.status != 200) {
    //     console.log(xhr.status + ': ' + xhr.statusText);
    // } else {
    //     var mediaObj = JSON.parse(xhr.responseText);
    //     if (myComments === 'X') {
    //         processMediaObjComments(mediaObj);
    //     } else {
    //         processMediaObjPhotos(mediaObj);
    //     }
    // }
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

    var itemsLength = mediaObj.items.length;

    for (i = 0; i < itemsLength; i++) {
        console.log(mediaObj.items[i]);

        if (mediaObj.items[i].caption) {
          photoScr = mediaObj.items[i].images.standard_resolution.url;
          photoScr = photoScr.replace('s640x640', 's1080x1080');
          commentTxt = mediaObj.items[i].caption.from.username + ': ' + mediaObj.items[i].caption.text + ' (<a target="_blank" href="' + mediaObj.items[i].link + '">post</a>, <a target="_blank" href="' + photoScr + '">big photo</a>)';
          node = document.createElement("li");
          node.innerHTML = commentTxt;
          document.getElementById("myList").appendChild(node);
        }

        var commentsObj = mediaObj.items[i].comments;
        if (commentsObj.count > 0) {
            for (j = 0; j < commentsObj.data.length; j++) {
                //if (commentsObj.data[j].from.username != myNickname) {
                    //    if ( commentsObj.data[j].from.username == mynickname ){
                    // console.log(mediaObj.items[i]);
                    photoScr = mediaObj.items[i].images.standard_resolution.url;
                    photoScr = photoScr.replace('s640x640', 's1080x1080');
                    commentTxt = commentsObj.data[j].from.username + ': ' + commentsObj.data[j].text + ' (<a target="_blank" href="' + mediaObj.items[i].link + '">post</a>)';
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
