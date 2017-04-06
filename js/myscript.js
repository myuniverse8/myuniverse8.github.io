var myNickname = '';
var myUrl = '';
var myComments = '';
var myTestMode = '';
var myTitle = '';
var myOwnComments = '';
var myPostCaption = '';

// $('.darken').hover(function() {
//     $(this).find('img').fadeTo(500, 0.5);
// }, function() {
//     $(this).find('img').fadeTo(500, 1);
// });

function getURLParameter(name) {
    return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [null, ''])[1].replace(/\+/g, '%20')) || null;
}

window.onload = function() {
    myNickname = getURLParameter('nickname');
    // myUrl = 'https://crossorigin.me/https://www.instagram.com/' + myNickname + '/media/';
    myUrl = 'https://cors-anywhere.herokuapp.com/https://www.instagram.com/' + myNickname + '/media/';

    myComments = getURLParameter('comments');
    myTestMode = getURLParameter('testmode');
    myOwnComments = getURLParameter('owncomments');
    myPostCaption = getURLParameter('postcaption');

    myTitle = myNickname + '(';

    if (myComments === 'X') {
        myTitle = myTitle + 'comments)';
    } else {
        //      document.getElementById("mylist").classList.add("my-photos-ul");
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

        var photoTxt = '<a class="darken" target="_blank" href="' + mediaObj.items[i].link + '"><img src="' + mediaObj.items[i].images.thumbnail.url + '" data-likes-count="' + mediaObj.items[i].likes.count + '" data-comments-count="' + mediaObj.items[i].comments.count + '"></img></a>';

        // var node = document.createElement("li"); // Create a <li> node
        var node = document.createElement("div");
        node.innerHTML = photoTxt;
        node.classList.add("photo");
        // document.getElementById("mylist").appendChild(node);

        var contentDiv = document.getElementById("content");
        contentDiv.classList.add("photos");
        contentDiv.appendChild(node);

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
    var commentTxt = '';
    var node;
    var photoScr;

    var itemsLength = mediaObj.items.length;
    var contentDiv = document.getElementById("content");
    contentDiv.classList.add("comments");

    for (i = 0; i < itemsLength; i++) {
        //console.log(mediaObj.items[i]);

        if (myPostCaption === 'X') {
            if (mediaObj.items[i].caption) {
                photoScr = mediaObj.items[i].images.standard_resolution.url;
                photoScr = photoScr.replace('s640x640', 's1080x1080');
                commentTxt = '<a target="_blank" href="' + mediaObj.items[i].link + '"><button class="ui-btn ui-btn-inline ui-shadow ui-corner-all" type="button">' + mediaObj.items[i].caption.from.username + ': ' + mediaObj.items[i].caption.text + '</button></a> <a target="_blank" href="' + photoScr + '"><button class="ui-btn ui-btn-inline ui-shadow ui-corner-all" type="button">big photo</button></a>';
                node = document.createElement("div");
                node.classList.add("comment");
                node.innerHTML = commentTxt;
                contentDiv.appendChild(node);
            }
        }

        var commentsObj = mediaObj.items[i].comments;
        if (commentsObj.count > 0) {
            for (j = 0; j < commentsObj.data.length; j++) {
                if (myOwnComments !== 'X') {
                    if (commentsObj.data[j].from.username === myNickname) {
                        continue;
                    }
                }

                // console.log(mediaObj.items[i]);

                photoScr = mediaObj.items[i].images.standard_resolution.url;
                photoScr = photoScr.replace('s640x640', 's1080x1080');
                // console.log(commentsObj.data[j].created_time);
                var timeSec = commentsObj.data[j].created_time;
                var commentDate = new Date(+timeSec);
                // console.log(commentDate);
                //var commentTxt = '<a href="#">sdasdasd</a>';
                commentTxt = '<a target="_blank" href="' + mediaObj.items[i].link + '"><button class="ui-btn ui-btn-inline ui-shadow ui-corner-all" type="button">' + commentsObj.data[j].from.username + ': ' + commentsObj.data[j].text + '</button></a> <a target="_blank" href="' + photoScr + '"><button class="ui-btn ui-btn-inline ui-shadow ui-corner-all" type="button">big photo</button></a>';
                //var commentTxt = commentsObj.data[j].from.username + ': ' + commentsObj.data[j].text + ' (<a target="_blank" href="' + mediaObj.items[i].link + '"><button class="ui-btn ui-btn-inline ui-shadow ui-corner-all" type="button">post</button></a>, <a target="_blank" href="' + photoScr + '"><button class="ui-btn ui-btn-inline ui-shadow ui-corner-all" type="button">big photo</button></a>)';

                // var node = document.createElement("li"); // Create a <li> node
                node = document.createElement("div");
                node.classList.add("comment");
                node.innerHTML = commentTxt;
                // var textnode = document.createTextNode(commentTxt);       // Create a text node
                // node.appendChild(textnode);                              // Append the text to <li>
                // document.getElementById("mylist").appendChild(node); // Append <li> to <ul> with id="myList"

                contentDiv.appendChild(node);
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
