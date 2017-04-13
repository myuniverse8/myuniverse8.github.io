var myNickname = '';
var myUrl = '';
var myComments = '';
var myTestMode = '';
var myTitle = '';
var myCockpit;
var lastPostProcessed = 0;
var myBegda;
var myEndda;
var myUseDates;
var myTags = '';
var myLocations = '';
var myCommentors = '';
var myLikers = '';

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
        var myCommentors = new MyCommentors(comName, realName, postId);
        myCommentors.postIds.push(postId);
        this.commentors.push(myCommentors);
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

function MyCommentors(comName, realName) {
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
    myComments = getURLParameter('comments');
    myTestMode = getURLParameter('testmode');
    myBegda = new Date(getURLParameter('begda'));
    myEndda = new Date(getURLParameter('endda'));
    myUseDates = getURLParameter('dates');
    myTags = getURLParameter('tags');
    myLocations = getURLParameter('locations');
    myCommentors = getURLParameter('commentors');
    myLikers = getURLParameter('likers');

    myBegda.setHours(0);
    myBegda.setMinutes(0);
    myBegda.setSeconds(0);

    myEndda.setHours(0);
    myEndda.setMinutes(0);
    myEndda.setSeconds(0);

    myTitle = myNickname + '(';

    if (myComments === 'X') {
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

        myTitle = myTitle + 'comments)';
        document.getElementById("myList").classList.add("comments");
    } else if (myTags === 'X') {
        document.getElementById("myList").classList.add("tags");
        myTitle = myTitle + 'tags)';
    } else if (myLocations === 'X') {
        document.getElementById("myList").classList.add("locations");
        myTitle = myTitle + 'locations)';
    } else if (myCommentors === 'X') {
        document.getElementById("myList").classList.add("commentors");
        myTitle = myTitle + 'commentors)';
    } else if (myLikers === 'X') {
        document.getElementById("myList").classList.add("likers");
        myTitle = myTitle + 'likers)';
    } else {
        document.getElementById("myList").classList.add("photos");
        myTitle = myTitle + 'photos)';
    }

    document.title = myTitle;

    if ((myTags === 'X') || (myLocations === 'X') || (myCommentors === 'X') || (myLikers === 'X')) {
        beforeItemsProcessing();
    }

    loadData(myUrl);
};

togglePostCaptionCheckbox = function(element) {
    if (element.checked === true) {
        $("ul#myList").find("p.postcaption").show();
    } else {
        $("ul#myList").find("p.postcaption").hide();
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

toggleOwnRepliesCheckbox = function(element) {
    if (element.checked === true) {
        $("ul#myList").find("p.own-reply").show();
    } else {
        $("ul#myList").find("p.own-reply").hide();
    }
}

loadData = function(mediaUrl) {
    var xhr = new XMLHttpRequest();

    xhr.open('GET', mediaUrl, true);

    xhr.send();
    $('p#loading-p').css('color', 'yellow').text('Data is loading ...');
    $('input.nav-input').prop("disabled", true);
    $('select#sel-drop-tags').prop("disabled", true);
    $('select#sel-drop-locations').prop("disabled", true);
    $('select#sel-drop-commentors').prop("disabled", true);
    $('select#sel-drop-likers').prop("disabled", true);

    xhr.onreadystatechange = function() {

        if (xhr.readyState != 4) return;

        if (xhr.status != 200) {
            console.log('Error getting data from server : ' + xhr.status + ': ' + xhr.statusText);
            $('p#loading-p').css('color', 'red').text('Data loading error!');
            $('input.nav-input').prop("disabled", false);
            $('select#sel-drop-tags').prop("disabled", false);
            $('select#sel-drop-locations').prop("disabled", false);
            $('select#sel-drop-commentors').prop("disabled", false);
            $('select#sel-drop-likers').prop("disabled", false);
        } else {
            $('p#loading-p').css('color', 'white').text('Data loaded');
            $('input.nav-input').prop("disabled", false);
            $('select#sel-drop-tags').prop("disabled", false);
            $('select#sel-drop-locations').prop("disabled", false);
            $('select#sel-drop-commentors').prop("disabled", false);
            $('select#sel-drop-likers').prop("disabled", false);

            var mediaObj = JSON.parse(xhr.responseText);
            collectData(mediaObj);

            if (myComments === 'X') {
                processMediaObjComments();
            } else if (myTags === 'X') {
                clearMyList();
                processMediaObjTags();
            } else if (myLocations === 'X') {
                clearMyList();
                processMediaObjLocations();
            } else if (myCommentors === 'X') {
                clearMyList();
                processMediaObjCommentors();
            } else if (myLikers === 'X') {
                clearMyList();
                processMediaObjLikers();
            } else {
                processMediaObjPhotos();
            }
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

        for (x = 0; x<mediaObj.items[i].likes.data.length; x++){
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

        if (myComments === 'X') {
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
        //console.log(myCockpit.posts[i]);
        var photoTxt = '<a target="_blank" href="' + myCockpit.posts[i].link + '"><img class="post" src="' + myCockpit.posts[i].thumbnail + '"></img></a>';
        var node = document.createElement("li");
        node.innerHTML = photoTxt;
        document.getElementById("myList").appendChild(node);
    }

    lastPostProcessed = i;
}

beforeItemsProcessing = function() {
    var navDiv = document.getElementById("nav");
    var contentDiv = document.getElementById("content");

    var selDrop = document.createElement("select");

    if (myLocations === 'X') {
        selDrop.setAttribute('id', 'sel-drop-locations');
        selDrop.setAttribute('onchange', 'selDropLocsChanged(this)');
    } else if (myTags === 'X') {
        selDrop.setAttribute('id', 'sel-drop-tags');
        selDrop.setAttribute('onchange', 'selDropChanged(this)');
    } else if (myCommentors === 'X') {
        selDrop.setAttribute('id', 'sel-drop-commentors');
        selDrop.setAttribute('onchange', 'selDropCommentorsChanged(this)');
    } else if (myLikers === 'X') {
        selDrop.setAttribute('id', 'sel-drop-likers');
        selDrop.setAttribute('onchange', 'selDropLikersChanged(this)');
    }

    var opt = document.createElement("option");
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

    var label = document.createElement('label');

    if (myLocations === 'X') {
        label.setAttribute('for', 'sel-drop-locations');
        label.innerHTML = 'Sort locations: ';
        navDiv.classList.add("nav-locations");
    } else if (myTags === 'X') {
        label.setAttribute('for', 'sel-drop-tags');
        label.innerHTML = 'Sort tags: ';
        navDiv.classList.add("nav-tags");
    } else if (myCommentors === 'X') {
        label.setAttribute('for', 'sel-drop-commentors');
        label.innerHTML = 'Sort commentors: ';
        navDiv.classList.add("nav-commentors");
    } else if (myLikers === 'X') {
        label.setAttribute('for', 'sel-drop-likers');
        label.innerHTML = 'Sort likers: ';
        navDiv.classList.add("nav-likers");
    }

    navDiv.appendChild(label);
    navDiv.appendChild(selDrop);

    var photosDiv = document.createElement("div");
    var photosUl = document.createElement("ul");

    if (myLocations === 'X') {
        photosDiv.setAttribute("id", "photos-by-location");
        photosUl.setAttribute("id", "myLocationsPhotosList");
    } else if (myTags === 'X') {
        photosDiv.setAttribute("id", "photos-by-tag");
        photosUl.setAttribute("id", "myTagsPhotosList");
    } else if (myCommentors === 'X') {
        photosDiv.setAttribute("id", "photos-by-commentors");
        photosUl.setAttribute("id", "myCommentorsPhotosList");
    } else if (myLikers === 'X') {
        photosDiv.setAttribute("id", "photos-by-likers");
        photosUl.setAttribute("id", "myLikersPhotosList");
    }

    contentDiv.appendChild(photosDiv);

    photosUl.classList.add("photos");
    photosDiv.appendChild(photosUl);

    clearMyList();
}

locBtnClick = function(elem) {
    var locName = elem.getAttribute('data-loc');

    var myFoundLoc = myCockpit.locations.filter(function(obj) {
        return obj.locName === locName;
    })[0];

    var myList = document.getElementById("myList");
    var myLocsPhotosList = document.getElementById("myLocationsPhotosList");

    myLocsPhotosList.innerHTML = '';

    if (myFoundLoc) {
        for (var j = 0; j < myFoundLoc.postIds.length; j++) {
            var photosDiv = document.getElementById("photos-by-tag");

            var myFoundPost = myCockpit.posts.filter(function(obj) {
                return obj.id === myFoundLoc.postIds[j];
            })[0];

            if (myFoundPost) {
                var photoTxt = '<a target="_blank" href="' + myFoundPost.link + '"><img class="post" src="' + myFoundPost.thumbnail + '"></img></a>';
                var node = document.createElement("li");
                node.innerHTML = photoTxt;
                myLocsPhotosList.appendChild(node);
            }
        }
    }
}

comBtnClick = function(elem) {
    var comName = elem.getAttribute('data-com');

    var myFoundCom = myCockpit.commentors.filter(function(obj) {
        return obj.comName === comName;
    })[0];

    var myList = document.getElementById("myList");
    var myCommPhotosList = document.getElementById("myCommentorsPhotosList");

    myCommPhotosList.innerHTML = '';

    if (myFoundCom) {
        for (var j = 0; j < myFoundCom.postIds.length; j++) {
            var photosDiv = document.getElementById("photos-by-commentors");

            var myFoundPost = myCockpit.posts.filter(function(obj) {
                return obj.id === myFoundCom.postIds[j];
            })[0];

            if (myFoundPost) {
                var photoTxt = '<a target="_blank" href="' + myFoundPost.link + '"><img class="post" src="' + myFoundPost.thumbnail + '"></img></a>';
                var node = document.createElement("li");
                node.innerHTML = photoTxt;
                myCommPhotosList.appendChild(node);
            }
        }
    }
}

likerBtnClick = function(elem) {
    var likerName = elem.getAttribute('data-liker');

    var myFoundLiker = myCockpit.likers.filter(function(obj) {
        return obj.likerName === likerName;
    })[0];

    var myList = document.getElementById("myList");
    var myLikersPhotosList = document.getElementById("myLikersPhotosList");

    myLikersPhotosList.innerHTML = '';

    if (myFoundLiker) {
        for (var j = 0; j < myFoundLiker.postIds.length; j++) {
            var photosDiv = document.getElementById("photos-by-likers");

            var myFoundPost = myCockpit.posts.filter(function(obj) {
                return obj.id === myFoundLiker.postIds[j];
            })[0];

            if (myFoundPost) {
                var photoTxt = '<a target="_blank" href="' + myFoundPost.link + '"><img class="post" src="' + myFoundPost.thumbnail + '"></img></a>';
                var node = document.createElement("li");
                node.innerHTML = photoTxt;
                myLikersPhotosList.appendChild(node);
            }
        }
    }
}

tagBtnClick = function(elem) {
    var tagName = elem.getAttribute('data-tag');

    var myFoundTag = myCockpit.tags.filter(function(obj) {
        return obj.tagName === tagName;
    })[0];

    var myList = document.getElementById("myList");
    var myTagsPhotosList = document.getElementById("myTagsPhotosList");

    myTagsPhotosList.innerHTML = '';

    if (myFoundTag) {
        for (var j = 0; j < myFoundTag.postIds.length; j++) {
            var photosDiv = document.getElementById("photos-by-tag");

            var myFoundPost = myCockpit.posts.filter(function(obj) {
                return obj.id === myFoundTag.postIds[j];
            })[0];

            if (myFoundPost) {
                var photoTxt = '<a target="_blank" href="' + myFoundPost.link + '"><img class="post" src="' + myFoundPost.thumbnail + '"></img></a>';
                var node = document.createElement("li");
                node.innerHTML = photoTxt;
                myTagsPhotosList.appendChild(node);
            }
        }
    }
};

processMediaObjLocations = function(locations) {
    var myList = document.getElementById("myList");

    var myLocations = locations;

    if (!myLocations) {
        myLocations = myCockpit.locations;
    }

    for (var i = 0; i < myLocations.length; i++) {
        var node = document.createElement("li");
        var btn = document.createElement("button");
        btn.setAttribute('data-loc', myLocations[i].locName);
        var t = document.createTextNode(myLocations[i].locName + ' (' + myLocations[i].locCnt + ')');
        btn.appendChild(t);
        node.appendChild(btn);

        btn.onclick = function() {
            locBtnClick(this);
        };

        myList.appendChild(node);
    }
}

processMediaObjCommentors = function(commentors) {
    var myList = document.getElementById("myList");

    var myCommentorsList = commentors;

    if (!myCommentorsList) {
        myCommentorsList = myCockpit.commentors;
    }

    for (var i = 0; i < myCommentorsList.length; i++) {
        var node = document.createElement("li");
        var btn = document.createElement("button");
        btn.setAttribute('data-com', myCommentorsList[i].comName);
        var t = document.createTextNode(myCommentorsList[i].comName + ' - ' + myCommentorsList[i].realName + ' (' + myCommentorsList[i].comCnt + ')');
        btn.appendChild(t);
        node.appendChild(btn);

        btn.onclick = function() {
            comBtnClick(this);
        };

        myList.appendChild(node);
    }
}

processMediaObjTags = function(tags) {
    var myList = document.getElementById("myList");

    var myTags = tags;

    if (!myTags) {
        myTags = myCockpit.tags;
    }

    for (var i = 0; i < myTags.length; i++) {
        var node = document.createElement("li");
        var btn = document.createElement("button");
        btn.setAttribute('data-tag', myTags[i].tagName);
        var t = document.createTextNode(myTags[i].tagName + ' (' + myTags[i].tagCnt + ')');
        btn.appendChild(t);
        node.appendChild(btn);

        btn.onclick = function() {
            tagBtnClick(this);
        };

        myList.appendChild(node);
    }
}

sortTagsList = function(option) {
    var tags;
    switch (option) {
        case 'space':
            clearMyList();
            processMediaObjTags();
            break;
        case 'name':
            clearMyList();
            var byName = myCockpit.tags.slice(0);
            tags = byName.sort(function(a, b) {
                var x = a.tagName.toLowerCase();
                var y = b.tagName.toLowerCase();
                return x < y ? -1 : x > y ? 1 : 0;
            });
            processMediaObjTags(tags);
            break;
        case 'count':
            clearMyList();
            var byCount = myCockpit.tags.slice(0);
            tags = byCount.sort(function(a, b) {
                return b.tagCnt - a.tagCnt;
            });
            processMediaObjTags(tags);
            break;
    }
}

sortLocationsList = function(option) {
    var locs;
    switch (option) {
        case 'space':
            clearMyList();
            processMediaObjLocations();
            break;
        case 'name':
            clearMyList();
            var byName = myCockpit.locations.slice(0);
            locs = byName.sort(function(a, b) {
                var x = a.locName.toLowerCase();
                var y = b.locName.toLowerCase();
                return x < y ? -1 : x > y ? 1 : 0;
            });
            processMediaObjLocations(locs);
            break;
        case 'count':
            clearMyList();
            var byCount = myCockpit.locations.slice(0);
            locs = byCount.sort(function(a, b) {
                return b.locCnt - a.locCnt;
            });
            processMediaObjLocations(locs);
            break;
    }
}

sortCommentorsList = function(option) {
    var commentors;
    switch (option) {
        case 'space':
            clearMyList();
            processMediaObjCommentors();
            break;
        case 'name':
            clearMyList();
            var byName = myCockpit.commentors.slice(0);
            commentors = byName.sort(function(a, b) {
                var x = a.comName.toLowerCase();
                var y = b.comName.toLowerCase();
                return x < y ? -1 : x > y ? 1 : 0;
            });
            processMediaObjCommentors(commentors);
            break;
        case 'count':
            clearMyList();
            var byCount = myCockpit.commentors.slice(0);
            commentors = byCount.sort(function(a, b) {
                return b.comCnt - a.comCnt;
            });
            processMediaObjCommentors(commentors);
            break;
    }
}

sortLikersList = function(option) {
    var likers;
    switch (option) {
        case 'space':
            clearMyList();
            processMediaObjLikers();
            break;
        case 'name':
            clearMyList();
            var byName = myCockpit.likers.slice(0);
            likers = byName.sort(function(a, b) {
                var x = a.likerName.toLowerCase();
                var y = b.likerName.toLowerCase();
                return x < y ? -1 : x > y ? 1 : 0;
            });
            processMediaObjLikers(likers);
            break;
        case 'count':
            clearMyList();
            var byCount = myCockpit.likers.slice(0);
            likers = byCount.sort(function(a, b) {
                return b.likerCnt - a.likerCnt;
            });
            processMediaObjLikers(likers);
            break;
    }
}

clearMyList = function() {
    var myList = document.getElementById("myList");
    myList.innerHTML = '';
}

selDropChanged = function(elem) {
    sortTagsList(elem.options[elem.selectedIndex].value);
}

selDropLocsChanged = function(elem) {
    sortLocationsList(elem.options[elem.selectedIndex].value);
}

selDropCommentorsChanged = function(elem) {
    sortCommentorsList(elem.options[elem.selectedIndex].value);
}

selDropLikersChanged = function(elem) {
    sortLikersList(elem.options[elem.selectedIndex].value);
}

processMediaObjComments = function(mediaObj) {
    var i = 0;
    var j = 0;
    var commentTxt;
    var node;

    var postsLength = myCockpit.posts.length;

    for (i = lastPostProcessed; i < postsLength; i++) {
        var commentsLength = myCockpit.posts[i].commentscnt;

        commentTxt = '<p class="postcaption comments"><b>' + getDateStr(myCockpit.posts[i].date)

        if (myCockpit.posts[i].caption !== '') {
            commentTxt = commentTxt + ' - ' + myCockpit.posts[i].caption;
        } else {
            commentTxt = commentTxt + ' - nocaption';
        }

        commentTxt = commentTxt + '</b> (likes: ' + myCockpit.posts[i].likescnt + ', comments: ' + myCockpit.posts[i].commentscnt + ', <a target="_blank" href="' + myCockpit.posts[i].link + '">post</a>, <a target="_blank" href="' + myCockpit.posts[i].bigsizelink + '">big photo</a>)</p>';

        node = document.createElement("li");
        node.innerHTML = commentTxt;

        document.getElementById("myList").appendChild(node);

        var commentsObj = myCockpit.posts[i].comments;
        var commentsLength = commentsObj.length;
        if (commentsLength > 0) {
            for (j = 0; j < commentsLength; j++) {
                commentTxt = '<p class="comments ';
                if (myCockpit.posts[i].comments[j].user === myNickname) {
                    commentTxt = commentTxt + 'own-reply';
                } else {
                    commentTxt = commentTxt + 'comment';
                }
                commentTxt = commentTxt + '">' + getDateStr(myCockpit.posts[i].comments[j].date) + ' - ' + myCockpit.posts[i].comments[j].user + ': ' + myCockpit.posts[i].comments[j].text + ' (<a target="_blank" href="' + myCockpit.posts[i].link + '">post</a>)</p>';

                node = document.createElement("li");
                node.innerHTML = commentTxt;
                document.getElementById("myList").appendChild(node);
            }
        }
    }

    lastPostProcessed = i;
}


processMediaObjLikers = function(likers) {
    var myList = document.getElementById("myList");

    var myLikersList = likers;

    if (!myLikersList) {
        myLikersList = myCockpit.likers;
    }

    //debugger;

    for (var i = 0; i < myLikersList.length; i++) {
        var node = document.createElement("li");
        var btn = document.createElement("button");
        btn.setAttribute('data-liker', myLikersList[i].likerName);
        var t = document.createTextNode(myLikersList[i].likerName + ' - ' + myLikersList[i].realName + ' (' + myLikersList[i].likerCnt + ')');
        btn.appendChild(t);
        node.appendChild(btn);

        btn.onclick = function() {
            likerBtnClick(this);
        };

        myList.appendChild(node);
    }
}
