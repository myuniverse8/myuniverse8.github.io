var myNickname = '';
var myUrl = '';
var myComments = '';
var myTestMode = '';
var myTitle = '';
var posts = [];
var myCockpit;
var lastPostProcessed = 0;

function MyCockpit() {
    this.posts = [];
}

MyCockpit.prototype.addPost = function(post) {
    this.posts.push(post);
}

function MyPost(id, link, user, date, location, caption, thumbnail, bigphoto, likescnt, commentscnt) {
    this.id = id;
    this.link = link;
    this.user = user;
    this.date = date;
    this.location = location;
    this.caption = caption;
    this.thumbnail = thumbnail;
    this.bigsizelink = bigphoto;
    this.likescnt = likescnt;
    this.commentscnt = commentscnt;

    this.comments = [];
    this.likes = [];
}

MyPost.prototype.addComment = function(comment) {
    this.comments.push(comment);
}

MyPost.prototype.addLike = function(like) {
    this.likes.push(like);
}

function MyComment(date, user, text) {
    this.date = date;
    this.user = user;
    this.text = text;
};

function MyLike(user) {
    this.user = user;
};

function getURLParameter(name) {
    return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [null, ''])[1].replace(/\+/g, '%20')) || null;
}

window.onload = function() {
    myCockpit = new MyCockpit();

    myNickname = getURLParameter('nickname');
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
            collectData(mediaObj);

            if (myComments === 'X') {
                processMediaObjComments();
            } else {
                processMediaObjPhotos();
            }
        }
    }
}

collectData = function(mediaObj) {
    var i = 0;
    var j = 0;
    var nextUrl = '';
    var fullSizeLnk = '';
    var d;

    var itemsLength = mediaObj.items.length;

    for (i = 0; i < itemsLength; i++) {
        //console.log(mediaObj.items[i]);
        d = new Date(+mediaObj.items[i].created_time * 1000);

        fullSizeLnk = mediaObj.items[i].images.standard_resolution.url;
        fullSizeLnk = fullSizeLnk.replace('s640x640', 's1080x1080');

        var caption = mediaObj.items[i].caption ? mediaObj.items[i].caption.text : '';
        var location = mediaObj.items[i].location ? mediaObj.items[i].location.name : '';
        var post = new MyPost(mediaObj.items[i].id,
            mediaObj.items[i].link,
            mediaObj.items[i].user.username,
            d,
            location,
            caption,
            mediaObj.items[i].images.thumbnail.url,
            fullSizeLnk,
            mediaObj.items[i].likes.count,
            mediaObj.items[i].comments.count
        );

        var commentsObj = mediaObj.items[i].comments;
        if (commentsObj.count > 0) {
            for (j = 0; j < commentsObj.data.length; j++) {
                d = new Date(+commentsObj.data[j].created_time * 1000);
                var comment = new MyComment(d,
                    commentsObj.data[j].from.username,
                    commentsObj.data[j].text);
                post.addComment(comment);
            }
        }

        var likesObj = mediaObj.items[i].likes;
        if (likesObj.count > 0) {
            for (j = 0; j < likesObj.data.length; j++) {
                var like = new MyLike(likesObj.data[j].username);
                post.addLike(like);
            }
        }

        myCockpit.addPost(post);

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

getDateStr = function(d) {
    var date = d.getDate() < 10 ? '0' + d.getDate() : d.getDate();
    var month = (d.getMonth() + 1) < 10 ? '0' + (d.getMonth() + 1) : (d.getMonth() + 1);
    var hours = d.getHours() < 10 ? '0' + d.getHours() : d.getHours();
    var minutes = d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes();
    return date + "-" + month + "-" + d.getFullYear() + " " + hours + ":" + minutes;
}

processMediaObjPhotos = function(mediaObj) {
  var i;
  var postsLength = myCockpit.posts.length;

  for (i = lastPostProcessed; i < postsLength; i++) {
        var photoTxt = '<a target="_blank" href="' + myCockpit.posts[i].link + '"><img src="' + myCockpit.posts[i].thumbnail + '"></img></a>';
        var node = document.createElement("li");
        node.innerHTML = photoTxt;
        document.getElementById("myList").appendChild(node);
  }

  lastPostProcessed = i;
}

processMediaObjComments = function(mediaObj) {
    var i = 0;
    var j = 0;
    var commentTxt;
    var node;

    var postsLength = myCockpit.posts.length;

    for (i = lastPostProcessed; i < postsLength; i++) {
        var commentsLength = myCockpit.posts[i].commentscnt;

        if (myCockpit.posts[i].caption !== '') {
            commentTxt = '<b>' + getDateStr(myCockpit.posts[i].date) + ' - post : ' + myCockpit.posts[i].caption + '</b> (<a target="_blank" href="' + myCockpit.posts[i].link + '">post</a>, <a target="_blank" href="' + myCockpit.posts[i].bigsizelink + '">big photo</a>)';
        } else {
            commentTxt = '<b>' + getDateStr(myCockpit.posts[i].date) + ' - post : nocaption </b> (<a target="_blank" href="' + myCockpit.posts[i].link + '">post</a>, <a target="_blank" href="' + myCockpit.posts[i].bigsizelink + '">big photo</a>)';
        }
        node = document.createElement("li");
        node.innerHTML = commentTxt;
        document.getElementById("myList").appendChild(node);

        var commentsObj = myCockpit.posts[i].comments;
        var commentsLength = commentsObj.length;
        if (commentsLength > 0) {
            for (j = 0; j < commentsLength; j++) {
                commentTxt = getDateStr(myCockpit.posts[i].comments[j].date) + ' - comment : ' + myCockpit.posts[i].comments[j].user + ': ' + myCockpit.posts[i].comments[j].text + ' (<a target="_blank" href="' + myCockpit.posts[i].link + '">post</a>)';
                node = document.createElement("li");
                node.innerHTML = commentTxt;
                document.getElementById("myList").appendChild(node);
            }
        }
    }

    lastPostProcessed = i;
}
