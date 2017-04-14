var myNickname = '';
var myUrl = '';
var myTestMode = '';
var myTitle = '';
var myCockpit;
var lastPostProcessed = 0;
var myBegda;
var myEndda;
var myUseDates;
var myMode = 0; //0 - photos, 1 - post/comments, 2 - tags, 3 - locations, 4 - commentors, 5 - likers

////0 - photos, 1 - post/comments, 2 - tags, 3 - locations, 4 - commentors, 5 - likers
// switch (myMode) {
//     case '0':
//     //0 - photos
//         break;
//     case '1':
//    //1 - post/comments
//         break;
//     case '2':
//    //2 - tags
//         break;
//     case '3':
//    //3 - locations
//         break;
//     case '4':
//    //4 - commentors
//         break;
//     case '5':
//    //5 - likers
//         break;
// }

function MyCockpit() {
    this.posts = [];
    this.tags = [];
    this.locations = [];
    this.commentors = [];
    this.likers = [];
}

MyCockpit.prototype.addPost = function(post) {
    this.posts.push(post);
}

MyCockpit.prototype.updateLocations = function(str, postId) {
    var locName = str.toLowerCase();

    var myFoundLocation = this.locations.filter(function(obj) {
        return obj.locName === locName;
    })[0];

    if (!myFoundLocation) {
        // object is not found
        var myLocation = new MyLocation(locName);
        myLocation.postIds.push(postId);
        this.locations.push(myLocation);
    } else {
        // object is found
        // check if post id is different - it could be the same tags in one post
        var ret = myFoundLocation.postIds.indexOf(postId);

        if (ret === -1) {
            myFoundLocation.locCnt++;
            myFoundLocation.postIds.push(postId);
        }
    }
}

MyCockpit.prototype.updateCommentors = function(str, realName, postId) {
    var comName = str.toLowerCase();

    var myFoundCommentors = this.commentors.filter(function(obj) {
        return obj.comName === comName;
    })[0];

    if (!myFoundCommentors) {
        // object is not found
        var myCommentor = new MyCommentor(comName, realName, postId);
        myCommentor.postIds.push(postId);
        this.commentors.push(myCommentor);
    } else {
        // object is found
        // check if post id is different - it could be the same tags in one post
        var ret = myFoundCommentors.postIds.indexOf(postId);

        if (ret === -1) {
            myFoundCommentors.comCnt++;
            myFoundCommentors.postIds.push(postId);
        }
    }
}

MyCockpit.prototype.updateLikers = function(str, realName, postId) {
    //debugger;
    var likerName = str.toLowerCase();

    var myFoundLikers = this.likers.filter(function(obj) {
        return obj.likerName === likerName;
    })[0];

    if (!myFoundLikers) {
        // object is not found
        var myLiker = new MyLiker(likerName, realName, postId);
        myLiker.postIds.push(postId);
        this.likers.push(myLiker);
    } else {
        // object is found
        // check if post id is different - it could be the same tags in one post
        var ret = myFoundLikers.postIds.indexOf(postId);

        if (ret === -1) {
            myFoundLikers.likerCnt++;
            myFoundLikers.postIds.push(postId);
        }
    }
}

MyCockpit.prototype.updateTags = function(str, postId) {
    // var str = 'Test #tag1 #tag2_ty. today is the #tag3/,good day #tag4';
    // var tagsArr = str.match(/#\w+/g);
    var tagsArr = str.match(/#[А-Яа-яё\w]+/g);
    var i;
    var ind;

    if (tagsArr != null) {
        for (i = 0; i < tagsArr.length; i++) {
            var tagName = tagsArr[i].toLowerCase();

            var myFoundTag = this.tags.filter(function(obj) {
                return obj.tagName === tagName;
            })[0];

            if (!myFoundTag) {
                // object is not found
                var myTag = new MyTag(tagName);
                myTag.postIds.push(postId);
                this.tags.push(myTag);
            } else {
                // object is found
                // check if post id is different - it could be the same tags in one post
                var ret = myFoundTag.postIds.indexOf(postId);

                if (ret === -1) {
                    myFoundTag.tagCnt++;
                    myFoundTag.postIds.push(postId);
                }
            }
        }
    }
}

MyPost.prototype.addComment = function(comment) {
    this.comments.push(comment);
}

MyPost.prototype.addLike = function(like) {
    this.likes.push(like);
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

function MyTag(tagName) {
    this.tagName = tagName;
    this.tagCnt = 1;
    this.postIds = [];
};

function MyLocation(locName) {
    this.locName = locName;
    this.locCnt = 1;
    this.postIds = [];
};

function MyCommentor(comName, realName) {
    this.comName = comName;
    this.realName = realName
    this.comCnt = 1;
    this.postIds = [];
};

function MyLiker(likerName, realName) {
    this.likerName = likerName;
    this.realName = realName
    this.likerCnt = 1;
    this.postIds = [];
};

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
    myTestMode = getURLParameter('testmode');
    myBegda = new Date(getURLParameter('begda'));
    myEndda = new Date(getURLParameter('endda'));
    myUseDates = getURLParameter('dates');
    myMode = getURLParameter('mode');

    myBegda.setHours(0);
    myBegda.setMinutes(0);
    myBegda.setSeconds(0);

    myEndda.setHours(0);
    myEndda.setMinutes(0);
    myEndda.setSeconds(0);

    myTitle = myNickname + '(';

    //0 - photos, 1 - post/comments, 2 - tags, 3 - locations, 4 - commentors, 5 - likers
    switch (myMode) {
        case '0':
            //0 - photos
            document.getElementById("myList").classList.add("photos");
            myTitle = myTitle + 'photos)';
            break;
        case '1':
            //1 - post/comments
            myTitle = myTitle + 'comments)';
            document.getElementById("myList").classList.add("comments");
            beforeItemsProcessing();
            break;
        case '2':
            //2 - tags
            document.getElementById("myList").classList.add("tags");
            myTitle = myTitle + 'tags)';
            beforeItemsProcessing();
            break;
        case '3':
            //3 - locations
            document.getElementById("myList").classList.add("locations");
            myTitle = myTitle + 'locations)';
            beforeItemsProcessing();
            break;
        case '4':
            //4 - commentors
            document.getElementById("myList").classList.add("commentors");
            myTitle = myTitle + 'commentors)';
            beforeItemsProcessing();
            break;
        case '5':
            //5 - likers
            document.getElementById("myList").classList.add("likers");
            myTitle = myTitle + 'likers)';
            beforeItemsProcessing();
            break;
    }

    document.title = myTitle;
    loadData(myUrl);
};

togglePostCaptionCheckbox = function(element) {
    if (element.checked === true) {
        $("ul#myList").find("p.postcaption").show();
        $('select#sel-drop-search').prop("disabled", false);
    } else {
        $("ul#myList").find("p.postcaption").hide();
        $('select#sel-drop-search').prop("disabled", true);
    }
}

toggleCommentsCheckbox = function(element) {
    if (element.checked === true) {
        $("ul#myList").find("p.comment").show();
        var ownReply = document.getElementById('own-replies');
        toggleOwnRepliesCheckbox(ownReply);
    } else {
        $("ul#myList").find("p.comment").hide();
    }
}

toggleCheckboxes = function() {
  var elem = document.getElementById('own-replies');
  toggleOwnRepliesCheckbox(elem);
  elem = document.getElementById('incl-comments');
  toggleCommentsCheckbox(elem);
  elem = document.getElementById('incl-post-caption');
  togglePostCaptionCheckbox(elem);
}

toggleOwnRepliesCheckbox = function(element) {
    if (element.checked === true) {
        $("ul#myList").find("p.own-reply").show();
    } else {
        $("ul#myList").find("p.own-reply").hide();
    }
}

loadData = function(mediaUrl) {
    var xhr = new XMLHttpRequest();
    var postsCnt = myCockpit.posts ? myCockpit.posts.length : 0;

    xhr.open('GET', mediaUrl, true);

    xhr.send();
    $('p#loading-p').css('color', 'yellow').text('Data is loading ... (' + postsCnt + ') posts');
    $('input.nav-input').prop("disabled", true);
    $('select#sel-drop-search').prop("disabled", true);

    xhr.onreadystatechange = function() {

        if (xhr.readyState != 4) return;

        if (xhr.status != 200) {
            console.log('Error getting data from server : ' + xhr.status + ': ' + xhr.statusText);
            $('p#loading-p').css('color', 'red').text('Data loading error!');
            $('input.nav-input').prop("disabled", false);
            $('select#sel-drop-search').prop("disabled", false);
        } else {
            $('input.nav-input').prop("disabled", false);
            $('select#sel-drop-search').prop("disabled", false);

            var mediaObj = JSON.parse(xhr.responseText);
            collectData(mediaObj);

            //0 - photos, 1 - post/comments, 2 - tags, 3 - locations, 4 - commentors, 5 - likers
            switch (myMode) {
                case '0':
                    //0 - photos
                    processMediaObjPhotos();
                    break;
                case '1':
                    //1 - post/comments
                    processMediaObjComments();
                    break;
                case '2':
                case '3':
                case '4':
                case '5':
                    clearMyList();
                    processMediaObj();
                    break;
            }
            postsCnt = myCockpit.posts ? myCockpit.posts.length : 0;
            $('p#loading-p').css('color', 'white').text('Data loaded. ' + postsCnt + ' posts.');
        }
    }
}

collectData = function(mediaObj) {
    var i = 0;
    var j = 0;
    var x = 0;
    var nextUrl = '';
    var fullSizeLnk = '';
    var d;
    var dateForSearch;
    var dateForSearchComm;
    var stopSearch = '';
    var addPost = '';

    var itemsLength = mediaObj.items.length;

    for (i = 0; i < itemsLength; i++) {
        //console.log(mediaObj.items[i]);

        addPost = '';

        d = new Date(+mediaObj.items[i].created_time * 1000);

        dateForSearch = d;
        dateForSearch.setHours(0);
        dateForSearch.setMinutes(0);
        dateForSearch.setSeconds(0);

        fullSizeLnk = mediaObj.items[i].images.standard_resolution.url;
        fullSizeLnk = fullSizeLnk.replace('s640x640', 's1080x1080');

        var caption = mediaObj.items[i].caption ? mediaObj.items[i].caption.text : '';

        for (x = 0; x < mediaObj.items[i].likes.data.length; x++) {
            myCockpit.updateLikers(mediaObj.items[i].likes.data[x].username, mediaObj.items[i].likes.data[x].full_name, mediaObj.items[i].id);
        }

        if (caption !== '') {
            myCockpit.updateTags(caption, mediaObj.items[i].id);
        }

        var location = mediaObj.items[i].location ? mediaObj.items[i].location.name : '';

        if (location != '') {
            myCockpit.updateLocations(location, mediaObj.items[i].id);
        }

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
                dateForSearchComm = d;
                dateForSearchComm.setHours(0);
                dateForSearchComm.setMinutes(0);
                dateForSearchComm.setSeconds(0);

                var comment = new MyComment(d,
                    commentsObj.data[j].from.username,
                    commentsObj.data[j].text);

                if (myUseDates === 'X') {
                    if ((dateForSearchComm >= myBegda) & (dateForSearchComm <= myEndda)) {
                        addPost = 'X';
                        post.addComment(comment);
                        myCockpit.updateTags(commentsObj.data[j].text, mediaObj.items[i].id);
                        if (commentsObj.data[j].from.username !== myNickname) {
                            myCockpit.updateCommentors(commentsObj.data[j].from.username, commentsObj.data[j].from.full_name, mediaObj.items[i].id);
                        }
                    }
                } else {
                    addPost = 'X';
                    post.addComment(comment);
                    myCockpit.updateTags(commentsObj.data[j].text, mediaObj.items[i].id);
                    if (commentsObj.data[j].from.username !== myNickname) {
                        myCockpit.updateCommentors(commentsObj.data[j].from.username, commentsObj.data[j].from.full_name, mediaObj.items[i].id);
                    }
                }
            }
        } else {
            addPost = 'X';
        }

        var likesObj = mediaObj.items[i].likes;
        if (likesObj.count > 0) {
            for (j = 0; j < likesObj.data.length; j++) {
                var like = new MyLike(likesObj.data[j].username);
                post.addLike(like);
            }
        }

        if (myMode === '1') { //1 - post/comments
            if (addPost === 'X') {
                if (myUseDates === 'X') {
                    if ((dateForSearch >= myBegda) & (dateForSearch <= myEndda)) {
                        myCockpit.addPost(post);
                        addPost = '';
                    }
                } else {
                    myCockpit.addPost(post);
                    addPost = '';
                }
            }
        } else {
            if (myUseDates === 'X') {
                if ((dateForSearch >= myBegda) & (dateForSearch <= myEndda)) {
                    myCockpit.addPost(post);
                }
                if (dateForSearch < myBegda) {
                    stopSearch = 'X';
                }
            } else {
                myCockpit.addPost(post);
            }
        }

        if (i === (itemsLength - 1)) {
            nextUrl = myUrl + '?max_id=' + mediaObj.items[i].id;
        } else {
            nextUrl = '';
        }
    }

    if (nextUrl !== '') {
        if ((myTestMode !== 'X') & (stopSearch !== 'X')) {
            loadData(nextUrl);
        }
    }
}

getDateStr = function(d) {
    var date = d.getDate() < 10 ? '0' + d.getDate() : d.getDate();
    var month = (d.getMonth() + 1) < 10 ? '0' + (d.getMonth() + 1) : (d.getMonth() + 1);
    return date + "-" + month + "-" + d.getFullYear();
}

processMediaObjPhotos = function(mediaObj) {
    var i;
    var postsLength = myCockpit.posts.length;

    for (i = lastPostProcessed; i < postsLength; i++) {
        var photoTxt = '<a target="_blank" href="' + myCockpit.posts[i].link + '"><img class="post" src="' + myCockpit.posts[i].thumbnail + '"></img></a>';
        var node = document.createElement("li");
        node.innerHTML = photoTxt;
        document.getElementById("myList").appendChild(node);
    }

    lastPostProcessed = i;
}

beforeItemsProcessing = function() {
    var opt;

    var navDiv = document.getElementById("nav");
    navDiv.classList.add("nav");

    var contentDiv = document.getElementById("content");
    var selDrop = document.createElement("select");

    selDrop.setAttribute('id', 'sel-drop-search');

    //0 - photos, 1 - post/comments, 2 - tags, 3 - locations, 4 - commentors, 5 - likers
    switch (myMode) {
        case '0':
            //0 - photos
            break;
        case '1':
            //1 - post/comments
            opt = document.createElement("option");
            opt.setAttribute('value', 'space');
            selDrop.appendChild(opt);

            opt = document.createElement("option");
            opt.setAttribute('value', 'comments');
            opt.innerHTML = 'by comments';
            selDrop.appendChild(opt);

            opt = document.createElement("option");
            opt.setAttribute('value', 'likes');
            opt.innerHTML = 'by likes';
            selDrop.appendChild(opt);

            selDrop.setAttribute('onchange', 'selDropCommentsChanged(this)');
            break;
        case '2':
        case '3':
        case '4':
        case '5':
            opt = document.createElement("option");
            opt.setAttribute('value', 'space');
            selDrop.appendChild(opt);

            opt = document.createElement("option");
            opt.setAttribute('value', 'name');
            opt.innerHTML = 'by name';
            selDrop.appendChild(opt);

            opt = document.createElement("option");
            opt.setAttribute('value', 'count');
            opt.innerHTML = 'by count';
            selDrop.appendChild(opt);

            selDrop.setAttribute('onchange', 'selDropChanged(this)');
            break;
    }


    var label = document.createElement('label');
    label.setAttribute('for', 'sel-drop-search');

    //0 - photos, 1 - post/comments, 2 - tags, 3 - locations, 4 - commentors, 5 - likers
    switch (myMode) {
        case '1':
            //1 - post/comments
            label.innerHTML = 'Sort posts: ';
            break;
        case '2':
            //2 - tags
            label.innerHTML = 'Sort tags: ';
            break;
        case '3':
            //3 - locations
            label.innerHTML = 'Sort locations: ';
            break;
        case '4':
            //4 - commentors
            label.innerHTML = 'Sort commentors: ';
            break;
        case '5':
            //5 - likers
            label.innerHTML = 'Sort likers: ';
            break;
    }

    navDiv.appendChild(label);
    navDiv.appendChild(selDrop);

    if (myMode === '1') {
        //1 - post/comments
        var node = document.createElement("div");
        node.classList.add("nav-comments");
        node.innerHTML = '<label for="incl-post-caption">Display post captions</label><input type="checkbox" class="nav-input" id="incl-post-caption" name="incl-post-caption" checked onchange="togglePostCaptionCheckbox(this)">';
        document.getElementById("nav").appendChild(node);
        node = document.createElement("div");
        node.classList.add("nav-comments");
        node.innerHTML = '<label for="incl-comments">Display comments</label><input type="checkbox" class="nav-input" id="incl-comments" name="incl-comments" checked onchange="toggleCommentsCheckbox(this)">';
        document.getElementById("nav").appendChild(node);
        node = document.createElement("div");
        node.classList.add("nav-comments");
        node.classList.add("own-replies");
        node.innerHTML = '<label for="own-replies">Display own replies</label><input type="checkbox" class="nav-input" id="own-replies" name="own-replies" checked onchange="toggleOwnRepliesCheckbox(this)">';
        document.getElementById("nav").appendChild(node);
    }

    //0 - photos, 1 - post/comments, 2 - tags, 3 - locations, 4 - commentors, 5 - likers
    switch (myMode) {
        case '2':
        case '3':
        case '4':
        case '5':
            var photosDiv = document.createElement("div");
            var photosUl = document.createElement("ul");

            photosDiv.setAttribute("id", "photos-by-data");
            photosUl.setAttribute("id", "photos-data-list");

            var infoBtnDiv = document.createElement("div");
            infoBtnDiv.setAttribute("id", "btn-info");

            contentDiv.appendChild(infoBtnDiv);
            contentDiv.appendChild(photosDiv);
            contentDiv.appendChild(photosDiv);

            photosUl.classList.add("photos");
            photosDiv.appendChild(photosUl);

            clearMyList();
            break;
    }
}

clearBtnsSelection = function() {
    $('ul#myList button').removeClass('selected');
}

setSelectedButton = function(elem) {
    elem.classList.add('selected');
};

beforeBtnClicked = function() {
    clearBtnsSelection();
    clearInfoDiv();
}

clearInfoDiv = function() {
    document.getElementById("btn-info").innerHTML = '';
}

objBtnClick = function(elem) {
    beforeBtnClicked();
    setSelectedButton(elem);

    var myFoundElem;
    var myList = document.getElementById("myList");
    var myDataList;
    var photosDiv;
    var dataValue = elem.getAttribute('data-str-value');
    var htmlTxt = '';

    //0 - photos, 1 - post/comments, 2 - tags, 3 - locations, 4 - commentors, 5 - likers
    switch (myMode) {
        case '2':
            //2 - tags
            var myFoundElem = myCockpit.tags.filter(function(obj) {
                return obj.tagName === dataValue;
            })[0];
            var tag = dataValue.substring(1)
            htmlTxt = '<a target="_blank" href="https://www.instagram.com/explore/tags/' + tag + '">' + dataValue + '</a>';
            break;
        case '3':
            //3 - locations
            myFoundElem = myCockpit.locations.filter(function(obj) {
                return obj.locName === dataValue;
            })[0];
            break;
        case '4':
            //4 - commentors
            var myFoundElem = myCockpit.commentors.filter(function(obj) {
                return obj.comName === dataValue;
            })[0];
            htmlTxt = '<a target="_blank" href="http://instagram.com/' + dataValue + '">' + dataValue + '</a>';
            break;
        case '5':
            //5 - likers
            var myFoundElem = myCockpit.likers.filter(function(obj) {
                return obj.likerName === dataValue;
            })[0];
            htmlTxt = '<a target="_blank" href="http://instagram.com/' + dataValue + '">' + dataValue + '</a>';
            break;
    }

    document.getElementById("btn-info").innerHTML = htmlTxt;

    myDataList = document.getElementById("photos-data-list");

    myDataList.innerHTML = '';

    if (myFoundElem) {
        for (var j = 0; j < myFoundElem.postIds.length; j++) {
            var myFoundPost = myCockpit.posts.filter(function(obj) {
                return obj.id === myFoundElem.postIds[j];
            })[0];

            if (myFoundPost) {
                var photoTxt = '<a target="_blank" href="' + myFoundPost.link + '"><img class="post" src="' + myFoundPost.thumbnail + '"></img></a>';
                var node = document.createElement("li");
                node.innerHTML = photoTxt;
                myDataList.appendChild(node);
            }
        }
    }
}

processMediaObj = function(objs) {
    var myList = document.getElementById("myList");
    var myObjs = objs;
    var t;

    if (!myObjs) {
        //0 - photos, 1 - post/comments, 2 - tags, 3 - locations, 4 - commentors, 5 - likers
        switch (myMode) {
            case '2':
                //2 - tags
                myObjs = myCockpit.tags;
                break;
            case '3':
                //3 - locations
                myObjs = myCockpit.locations;
                break;
            case '4':
                //4 - commentors
                myObjs = myCockpit.commentors;
                break;
            case '5':
                //5 - likers
                myObjs = myCockpit.likers;
                break;
        }
    }

    for (var i = 0; i < myObjs.length; i++) {
        var node = document.createElement("li");
        var btn = document.createElement("button");

        //0 - photos, 1 - post/comments, 2 - tags, 3 - locations, 4 - commentors, 5 - likers
        switch (myMode) {
            case '2':
                //2 - tags
                btn.setAttribute('data-str-value', myObjs[i].tagName);
                t = document.createTextNode(myObjs[i].tagName + ' (' + myObjs[i].tagCnt + ')');
                break;
            case '3':
                //3 - locations
                btn.setAttribute('data-str-value', myObjs[i].locName);
                t = document.createTextNode(myObjs[i].locName + ' (' + myObjs[i].locCnt + ')');
                break;
            case '4':
                //4 - commentors
                btn.setAttribute('data-str-value', myObjs[i].comName);
                t = document.createTextNode(myObjs[i].comName + ' - ' + myObjs[i].realName + ' (' + myObjs[i].comCnt + ')');
                break;
            case '5':
                //5 - likers
                btn.setAttribute('data-str-value', myObjs[i].likerName);
                t = document.createTextNode(myObjs[i].likerName + ' - ' + myObjs[i].realName + ' (' + myObjs[i].likerCnt + ')');
                break;
        }

        btn.appendChild(t);
        node.appendChild(btn);

        btn.onclick = function() {
            objBtnClick(this);
        };

        myList.appendChild(node);
    }
}

processMediaObjComments = function(objects) {
    var i = 0;
    var j = 0;
    var commentTxt;
    var node;

    var posts = objects;

    if (!posts) {
        posts = myCockpit.posts;
    }

    var postsLength = posts.length;

    for (i = lastPostProcessed; i < postsLength; i++) {
        var commentsLength = posts[i].commentscnt;

        commentTxt = '<p class="postcaption comments"><b>' + getDateStr(posts[i].date)

        if (posts[i].caption !== '') {
            commentTxt = commentTxt + ' - ' + posts[i].caption;
        } else {
            commentTxt = commentTxt + ' - nocaption';
        }

        commentTxt = commentTxt + '</b> (likes: ' + posts[i].likescnt + ', comments: ' + posts[i].commentscnt + ', <a target="_blank" href="' + posts[i].link + '">post</a>, <a target="_blank" href="' + posts[i].bigsizelink + '">big photo</a>)</p>';

        node = document.createElement("li");
        node.innerHTML = commentTxt;

        document.getElementById("myList").appendChild(node);

        var commentsObj = posts[i].comments;
        var commentsLength = commentsObj.length;
        if (commentsLength > 0) {
            for (j = 0; j < commentsLength; j++) {
                commentTxt = '<p class="comments ';
                if (posts[i].comments[j].user === myNickname) {
                    commentTxt = commentTxt + 'own-reply';
                } else {
                    commentTxt = commentTxt + 'comment';
                }

                commentTxt = commentTxt + '">' + getDateStr(posts[i].comments[j].date) + ' - ' + '<a target="_blank" href="http://instagram.com/' + posts[i].comments[j].user + '">' + posts[i].comments[j].user + '</a> : ' + posts[i].comments[j].text + ' (<a target="_blank" href="' + posts[i].link + '">post</a>)</p>';

                node = document.createElement("li");
                node.innerHTML = commentTxt;
                document.getElementById("myList").appendChild(node);
            }
        }
    }

    lastPostProcessed = i;
}

clearMyList = function() {
    var myList = document.getElementById("myList");
    myList.innerHTML = '';
}

selDropChanged = function(elem) {
    sortObjList(elem.options[elem.selectedIndex].value);
}

selDropCommentsChanged = function(elem) {
    var slicedObjs = myCockpit.posts.slice(0);
    var objs;
    clearMyList();
    lastPostProcessed = 0;
    var option = elem.options[elem.selectedIndex].value;

    switch (option) {
        case 'space':
            processMediaObjComments();
            break;
        case 'likes':
            objs = slicedObjs.sort(function(a, b) {
                return b.likescnt - a.likescnt;
            });
            processMediaObjComments(objs);
            break;
        case 'comments':
            objs = slicedObjs.sort(function(a, b) {
                return b.commentscnt - a.commentscnt;
            });
            processMediaObjComments(objs);
            break;
    }

    toggleCheckboxes();
}

sortObjList = function(option) {
    var objs;
    var slicedObjs;

    //0 - photos, 1 - post/comments, 2 - tags, 3 - locations, 4 - commentors, 5 - likers
    switch (myMode) {
        case '2':
            //2 - tags
            slicedObjs = myCockpit.tags.slice(0);
            break;
        case '3':
            //3 - locations
            slicedObjs = myCockpit.locations.slice(0);
            break;
        case '4':
            //4 - commentors
            slicedObjs = myCockpit.commentors.slice(0);
            break;
        case '5':
            //5 - likers
            slicedObjs = myCockpit.likers.slice(0);
            break;
    }

    switch (option) {
        case 'space':
            clearMyList();
            processMediaObj();
            break;
        case 'name':
            clearMyList();

            //0 - photos, 1 - post/comments, 2 - tags, 3 - locations, 4 - commentors, 5 - likers
            switch (myMode) {
                case '2':
                    //2 - tags
                    objs = slicedObjs.sort(function(a, b) {
                        var x = a.tagName.toLowerCase();
                        var y = b.tagName.toLowerCase();
                        return x < y ? -1 : x > y ? 1 : 0;
                    });
                    break;
                case '3':
                    //3 - locations
                    objs = slicedObjs.sort(function(a, b) {
                        var x = a.locName.toLowerCase();
                        var y = b.locName.toLowerCase();
                        return x < y ? -1 : x > y ? 1 : 0;
                    });
                    break;
                case '4':
                    //4 - commentors
                    objs = slicedObjs.sort(function(a, b) {
                        var x = a.comName.toLowerCase();
                        var y = b.comName.toLowerCase();
                        return x < y ? -1 : x > y ? 1 : 0;
                    });
                    break;
                case '5':
                    //5 - likers
                    objs = slicedObjs.sort(function(a, b) {
                        var x = a.likerName.toLowerCase();
                        var y = b.likerName.toLowerCase();
                        return x < y ? -1 : x > y ? 1 : 0;
                    });
                    break;
            }

            processMediaObj(objs);
            break;
        case 'count':
            clearMyList();

            //0 - photos, 1 - post/comments, 2 - tags, 3 - locations, 4 - commentors, 5 - likers
            switch (myMode) {
                case '2':
                    //2 - tags
                    objs = slicedObjs.sort(function(a, b) {
                        return b.tagCnt - a.tagCnt;
                    });
                    break;
                case '3':
                    //3 - locations
                    objs = slicedObjs.sort(function(a, b) {
                        return b.locCnt - a.locCnt;
                    });
                    break;
                case '4':
                    //4 - commentors
                    objs = slicedObjs.sort(function(a, b) {
                        return b.comCnt - a.comCnt;
                    });
                    break;
                case '5':
                    //5 - likers
                    objs = slicedObjs.sort(function(a, b) {
                        return b.likerCnt - a.likerCnt;
                    });
                    break;
            }

            processMediaObj(objs);
            break;
    }
}
