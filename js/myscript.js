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

function MyCockpit() {
    this.posts = [];
    this.tags = [];
}

MyCockpit.prototype.addPost = function(post) {
    if (post.id === '898434682775807790_927378976') {
        debugger;
    }

    this.posts.push(post);
}

MyCockpit.prototype.updateTags = function(str, postId) {
    // var str = 'Test #tag1 #tag2_ty. today is the #tag3/,good day #tag4';
    var tagsArr = str.match(/#\w+/g);
    var i;
    var ind;

    if (tagsArr != null) {
        for (i = 0; i < tagsArr.length; i++) {
            var tagName = tagsArr[i].toLowerCase();

            if (tagName === '#veluxloversoflight') {
                debugger;
            }

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
                //check if post id is different - it could be the same tags in one post
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
    } else {
        document.getElementById("myList").classList.add("photos");
        myTitle = myTitle + 'photos)';
    }

    document.title = myTitle;
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
    xhr.onreadystatechange = function() {

        if (xhr.readyState != 4) return;

        if (xhr.status != 200) {
            $('p#loading-p').css('color', 'red').text('Data loading error!');
            console.log('Error getting data from server : ' + xhr.status + ': ' + xhr.statusText);
        } else {
            $('p#loading-p').css('color', 'white').text('Data loaded');
            $('input.nav-input').prop("disabled", false);
            var mediaObj = JSON.parse(xhr.responseText);
            collectData(mediaObj);

            if (myComments === 'X') {
                processMediaObjComments();
            } else if (myTags === 'X') {
                processMediaObjTags();
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

        if (caption !== '') {
            myCockpit.updateTags(caption, mediaObj.items[i].id);
        }

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
                    }
                } else {
                    addPost = 'X';
                    post.addComment(comment);
                    myCockpit.updateTags(commentsObj.data[j].text, mediaObj.items[i].id);
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
        var photoTxt = '<a target="_blank" href="' + myCockpit.posts[i].link + '"><img class="post" src="' + myCockpit.posts[i].thumbnail + '"></img></a>';
        var node = document.createElement("li");
        node.innerHTML = photoTxt;
        document.getElementById("myList").appendChild(node);
    }

    lastPostProcessed = i;
}

processMediaObjTags = function(mediaObj) {
    var i;
    var j;
    var tagsLength = myCockpit.tags.length;
    var navDiv = document.getElementById("nav");
    var contentDiv = document.getElementById("content");
    var myTagsPhotosList = document.getElementById("myTagsPhotosList");

    var myList = document.getElementById("myList");
    myList.innerHTML = '';

    var selDrop = document.createElement("select");
    selDrop.setAttribute('id', 'sel-drop-tags');
    selDrop.setAttribute('onchange', 'selDropChanged(this)');

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
    label.setAttribute('for', 'sel-drop-tags');
    label.innerHTML = 'Sort tags: ';

    // navDiv.appendChild(label);

    navDiv.classList.add("nav-tags");
    // navDiv.appendChild(selDrop);

    for (i = 0; i < tagsLength; i++) {
        var node = document.createElement("li");
        var btn = document.createElement("button");
        btn.setAttribute('data-tag', myCockpit.tags[i].tagName);
        var t = document.createTextNode(myCockpit.tags[i].tagName + ' (' + myCockpit.tags[i].tagCnt + ')');
        btn.appendChild(t);
        node.appendChild(btn);

        btn.onclick = function() {
            var tagName = this.getAttribute('data-tag');

            var myFoundTag = myCockpit.tags.filter(function(obj) {
                return obj.tagName === tagName;
            })[0];

            var myList = document.getElementById("myList");
            var myTagsPhotosList = document.getElementById("myTagsPhotosList");

            myTagsPhotosList.innerHTML = '';

            if (myFoundTag) {
                for (j = 0; j < myFoundTag.postIds.length; j++) {
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

        myList.appendChild(node);
    }

    var photosDiv = document.createElement("div");
    photosDiv.setAttribute("id", "photos-by-tag");
    contentDiv.appendChild(photosDiv);

    var photosUl = document.createElement("ul");
    photosUl.setAttribute("id", "myTagsPhotosList");
    photosUl.classList.add("photos");
    photosDiv.appendChild(photosUl);
}

sortTagsList = function(option) {
    switch (option) {
        case 'name':
            // debugger;
            // var byName = myCockpit.tags.slice(0);
            // byName.sort(function(a, b) {
            //     var x = a.tagName.toLowerCase();
            //     var y = b.tagName.toLowerCase();
            //     return x < y ? -1 : x > y ? 1 : 0;
            // });


            break;

        case 'count':

            break;
        default:

    }
}

selDropChanged = function(elem) {
    sortTagsList(elem.options[elem.selectedIndex].value);
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
