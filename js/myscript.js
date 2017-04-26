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
  this.comments = [];
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

MyCockpit.prototype.updateCommentors = function(str, realName, postId, profile_picture) {
  var comName = str.toLowerCase();

  var myFoundCommentors = this.commentors.filter(function(obj) {
    return obj.comName === comName;
  })[0];

  if (!myFoundCommentors) {
    // object is not found
    var myCommentor = new MyCommentor(comName, realName, profile_picture);
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

MyCockpit.prototype.updateLikers = function(str, realName, postId, profile_picture) {
  //debugger;
  var likerName = str.toLowerCase();

  var myFoundLikers = this.likers.filter(function(obj) {
    return obj.likerName === likerName;
  })[0];

  if (!myFoundLikers) {
    // object is not found
    var myLiker = new MyLiker(likerName, realName, profile_picture);
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

MyCockpit.prototype.addComment = function(comment) {
  this.comments.push(comment);
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

function MyCommentor(comName, realName, profile_picture) {
  this.comName = comName;
  this.realName = realName
  this.comCnt = 1;
  this.profile_picture = profile_picture;
  this.postIds = [];
};

function MyLiker(likerName, realName, profile_picture) {
  this.likerName = likerName;
  this.realName = realName
  this.likerCnt = 1;
  this.profile_picture = profile_picture;
  this.postIds = [];
};

function MyComment(date, user, text, profile_picture) {
  this.date = date;
  this.user = user;
  this.text = text;
  this.profile_picture = profile_picture;
};

function MyAloneComment(date, user, text, post_id, post_link, post_thumbnail, profile_picture) {
  this.date = date;
  this.user = user;
  this.text = text;
  this.post_id = post_id;
  this.post_link = post_link;
  this.post_thumbnail = post_thumbnail;
  this.profile_picture = profile_picture;
};

function MyLike(user) {
  this.user = user;
};

function getURLParameter(name) {
  return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [null, ''])[1].replace(/\+/g, '%20')) || null;
}

window.onload = function() {
  var clipboard = new Clipboard('.clipboard-btn');

  clipboard.on('success', function(e) {
    var txt = 'Text "' + e.text + '" copied to clipboard.';
    $('p#loading-p').css('color', 'white').text(txt);

    setTimeout(updateInfoText, 2500);
    // console.info('Action:', e.action);
    // console.info('Text:', e.text);
    // console.info('Trigger:', e.trigger);
  });

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

  beforeItemsProcessing();
  updateTitle();
  updateNavTabButtonSelection();

  loadData(myUrl);
};

updateTitle = function() {
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
      break;
    case '2':
      //2 - tags
      document.getElementById("myList").classList.add("tags");
      myTitle = myTitle + 'tags)';
      break;
    case '3':
      //3 - locations
      document.getElementById("myList").classList.add("locations");
      myTitle = myTitle + 'locations)';
      break;
    case '4':
      //4 - commentors
      document.getElementById("myList").classList.add("commentors");
      myTitle = myTitle + 'commentators)';
      break;
    case '5':
      //5 - likers
      document.getElementById("myList").classList.add("likers");
      myTitle = myTitle + 'likers)';
      break;
  }

  document.title = myTitle;
}

togglePostCaptionCheckbox = function(element) {
  if (element.checked === true) {
    $("ul#myList").find("li.postcaption").show();
  } else {
    $("ul#myList").find("li.postcaption").hide();
  }
}

toggleCommentsCheckbox = function(element) {
  if (element.checked === true) {
    $("ul#myList").find("li.comment").show();
    var ownReply = document.getElementById('own-replies');
    toggleOwnRepliesCheckbox(ownReply);
  } else {
    $("ul#myList").find("li.comment").hide();
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
    $("ul#myList").find("li.own-reply").show();
  } else {
    $("ul#myList").find("li.own-reply").hide();
  }
}

loadData = function(mediaUrl) {
  var xhr = new XMLHttpRequest();
  var postsCnt = myCockpit.posts ? myCockpit.posts.length : 0;

  xhr.open('GET', mediaUrl, true);

  xhr.send();
  $('p#loading-p').css('color', 'yellow').text('Data is loading ... ' + postsCnt + ' posts');
  $('select#sel-drop-search').prop("disabled", true);
  $('#save-big-photos-btn').prop("disabled", true);

  xhr.onreadystatechange = function() {

    if (xhr.readyState != 4) return;

    if (xhr.status != 200) {
      console.log('Error getting data from server : ' + xhr.status + ': ' + xhr.statusText);
      $('p#loading-p').css('color', 'red').text('Data loading error!');
      $('select#sel-drop-search').prop("disabled", false);
      $('#save-big-photos-btn').prop("disabled", false);
    } else {
      $('select#sel-drop-search').prop("disabled", false);
      $('#save-big-photos-btn').prop("disabled", false);
      updateInfoText();

      var mediaObj = JSON.parse(xhr.responseText);
      collectData(mediaObj);

      processObjectsByMode();
      updateSearchDropdown();
    }
  }
}

updateNavTabButtonSelection = function() {
  var tabBtn;

  $('button.tab-btn').removeClass('selected');

  switch (myMode) {
    case '0':
      //0 - photos
      tabBtn = document.getElementById('photos-tab-btn');
      break;
    case '1':
      //1 - post/comments
      tabBtn = document.getElementById('posts-tab-btn');
      break;
    case '2':
      //2 - tags
      tabBtn = document.getElementById('tags-tab-btn');
      break;
    case '3':
      //3 - locations
      tabBtn = document.getElementById('locations-tab-btn');
      break;
    case '4':
      //4 - commentors
      tabBtn = document.getElementById('commentators-tab-btn');
      break;
    case '5':
      //5 - likers
      tabBtn = document.getElementById('likers-tab-btn');
      break;
  }
  tabBtn.classList.add('selected');
}

updateInfoText = function() {
  var txt = myNickname;

  var length = myCockpit.posts.length;
  if (length > 0) {
    txt = txt + '. ' + myCockpit.posts.length + ' posts';
  }

  $('p#loading-p').css('color', 'white').text(txt);
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
      myCockpit.updateLikers(mediaObj.items[i].likes.data[x].username, mediaObj.items[i].likes.data[x].full_name, mediaObj.items[i].id, mediaObj.items[i].likes.data[x].profile_picture);
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
          commentsObj.data[j].text,
          commentsObj.data[j].from.profile_picture
        );

        var aloneComment = new MyAloneComment(d,
          commentsObj.data[j].from.username,
          commentsObj.data[j].text,
          mediaObj.items[i].id,
          mediaObj.items[i].link,
          mediaObj.items[i].images.thumbnail.url,
          commentsObj.data[j].from.profile_picture
        );

        if (myUseDates === 'X') {
          if ((dateForSearchComm >= myBegda) & (dateForSearchComm <= myEndda)) {
            addPost = 'X';
            post.addComment(comment);
            myCockpit.addComment(aloneComment);
            myCockpit.updateTags(commentsObj.data[j].text, mediaObj.items[i].id);
            if (commentsObj.data[j].from.username !== myNickname) {
              myCockpit.updateCommentors(commentsObj.data[j].from.username, commentsObj.data[j].from.full_name, mediaObj.items[i].id, commentsObj.data[j].from.profile_picture);
            }
          }
        } else {
          addPost = 'X';
          post.addComment(comment);
          myCockpit.addComment(aloneComment);
          myCockpit.updateTags(commentsObj.data[j].text, mediaObj.items[i].id);
          if (commentsObj.data[j].from.username !== myNickname) {
            myCockpit.updateCommentors(commentsObj.data[j].from.username, commentsObj.data[j].from.full_name, mediaObj.items[i].id, commentsObj.data[j].from.profile_picture);
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
    }
  }

  updateInfoText();

  if (mediaObj.more_available === true) {
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
    var node = document.createElement("li");
    node.innerHTML = getPhotoTxt(myCockpit.posts[i]);
    document.getElementById("myList").appendChild(node);
  }

  lastPostProcessed = i;
}

getPhotoTxt = function(mediaObj) {
  var place = '';
  if (mediaObj.location) {
    place = '<p> place: ' + mediaObj.location + '</p>';
  }
  var photoTxt = '<div class="before-post-link"><a class="post-photo-link" target="_blank" href="' + mediaObj.link + '"><img class="post" src="' + mediaObj.thumbnail + '"></img></a><div id="img-info" class="img-info"><p>likes: ' + mediaObj.likescnt + '</p><p>comments: ' + mediaObj.commentscnt + '</p>' + place + '</div></div>';
  return photoTxt;
}

goToNextTab = function(elem) {
  lastPostProcessed = 0;
  myMode = elem.attributes['data-next-tab'].nodeValue;
  document.getElementById('myList').setAttribute('class', '');
  updateTitle();
  beforeItemsProcessing();
  processObjectsByMode();
  updateSearchDropdown();
  updateNavTabButtonSelection();
}

updateSearchDropdown = function() {
  var sel = document.getElementById('sel-drop-search');
  var value;

  switch (myMode) {
    case '2':
    case '3':
    case '4':
    case '5':
      value = 'count';
      sortObjList(value);
      sel.value = value;
      break;
  }

}

beforeItemsProcessing = function() {
  clearMyList();

  var opt;
  var navTabDiv = document.getElementById("nav-tab");
  navTabDiv.innerHTML = '';
  navTabDiv.classList.add("nav");

  var navDiv = document.getElementById("nav");
  navDiv.innerHTML = '';
  navDiv.classList.add("nav");

  var contentDiv = document.getElementById("tmp-content");
  contentDiv.innerHTML = '';
  var selDrop = document.createElement("select");

  selDrop.setAttribute('id', 'sel-drop-search');
  $('#nav').show();

  //0 - photos, 1 - post/comments, 2 - tags, 3 - locations, 4 - commentors, 5 - likers
  switch (myMode) {
    case '0':
      //0 - photos
      $('#nav').hide();
      break;
    case '1':
      //1 - post/comments
      opt = document.createElement("option");
      opt.setAttribute('value', 'space');
      opt.innerHTML = 'by post date';
      selDrop.appendChild(opt);

      opt = document.createElement("option");
      opt.setAttribute('value', 'comm_date');
      opt.innerHTML = 'by comment date (without posts)';
      selDrop.appendChild(opt);

      opt = document.createElement("option");
      opt.setAttribute('value', 'posts');
      opt.innerHTML = 'by comments count';
      selDrop.appendChild(opt);

      opt = document.createElement("option");
      opt.setAttribute('value', 'likes');
      opt.innerHTML = 'by likes count';
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
      label.innerHTML = 'Sort commentators: ';
      break;
    case '5':
      //5 - likers
      label.innerHTML = 'Sort likers: ';
      break;
  }

  if (myMode !== '0') {
    var divGroup = document.createElement('div');
    divGroup.classList.add("form-group");
    divGroup.appendChild(label);
    selDrop.classList.add("form-control");
    divGroup.appendChild(selDrop);
    navDiv.appendChild(divGroup);
  }

  if (myMode == '1') {
    var saveBtnDiv = document.createElement("div")
    var saveBtn = document.createElement("button");
    saveBtn.setAttribute('onclick', 'saveBtnClick()');
    saveBtn.setAttribute('id', 'save-big-photos-btn');
    saveBtn.classList.add('btn');
    saveBtn.classList.add('btn-default');
    var saveBtnTxt = document.createTextNode('save photos');
    saveBtn.setAttribute('title', 'Save big photos of downloaded posts to zip file');
    saveBtn.appendChild(saveBtnTxt);
    saveBtnDiv.appendChild(saveBtn)
    navDiv.appendChild(saveBtnDiv);
  }

  var btn1 = document.createElement('button');
  btn1.setAttribute('onclick', 'goToNextTab(this)');
  btn1.setAttribute('data-next-tab', '0');
  btn1.setAttribute('id', 'photos-tab-btn');
  btn1.classList.add('tab-btn');
  btn1.classList.add('btn');
  btn1.classList.add('btn-default');
  var tn = document.createTextNode('photos');
  btn1.appendChild(tn);
  navTabDiv.appendChild(btn1);

  var btn1 = document.createElement('button');
  btn1.setAttribute('onclick', 'goToNextTab(this)');
  btn1.setAttribute('data-next-tab', '1');
  btn1.setAttribute('id', 'posts-tab-btn');
  btn1.classList.add('tab-btn');
  btn1.classList.add('btn');
  btn1.classList.add('btn-default');
  var tn = document.createTextNode('posts/comments');
  btn1.appendChild(tn);
  navTabDiv.appendChild(btn1);

  var btn1 = document.createElement('button');
  btn1.setAttribute('onclick', 'goToNextTab(this)');
  btn1.setAttribute('data-next-tab', '2');
  btn1.setAttribute('id', 'tags-tab-btn');
  btn1.classList.add('tab-btn');
  btn1.classList.add('btn');
  btn1.classList.add('btn-default');
  var tn = document.createTextNode('tags');
  btn1.appendChild(tn);
  navTabDiv.appendChild(btn1);

  var btn1 = document.createElement('button');
  btn1.setAttribute('onclick', 'goToNextTab(this)');
  btn1.setAttribute('data-next-tab', '3');
  btn1.setAttribute('id', 'locations-tab-btn');
  btn1.classList.add('tab-btn');
  btn1.classList.add('btn');
  btn1.classList.add('btn-default');
  var tn = document.createTextNode('locations');
  btn1.appendChild(tn);
  navTabDiv.appendChild(btn1);

  var btn1 = document.createElement('button');
  btn1.setAttribute('onclick', 'goToNextTab(this)');
  btn1.setAttribute('data-next-tab', '4');
  btn1.setAttribute('id', 'commentators-tab-btn');
  btn1.classList.add('tab-btn');
  btn1.classList.add('btn');
  btn1.classList.add('btn-default');
  var tn = document.createTextNode('commentators');
  btn1.appendChild(tn);
  navTabDiv.appendChild(btn1);

  var btn1 = document.createElement('button');
  btn1.setAttribute('onclick', 'goToNextTab(this)');
  btn1.setAttribute('data-next-tab', '5');
  btn1.setAttribute('id', 'likers-tab-btn');
  btn1.classList.add('tab-btn');
  btn1.classList.add('btn');
  btn1.classList.add('btn-default');
  var tn = document.createTextNode('likers');
  btn1.appendChild(tn);
  navTabDiv.appendChild(btn1);

  if (myMode === '1') {
    //1 - post/comments
    var divNavTmp = document.createElement("div");

    var node = document.createElement("div");
    node.classList.add("nav-comments");
    node.classList.add("checkbox");
    node.innerHTML = '<label for="incl-post-caption"><input type="checkbox" class="nav-input" id="incl-post-caption" name="incl-post-caption" checked onchange="togglePostCaptionCheckbox(this)">display post captions</label>';
    divNavTmp.appendChild(node);
    node = document.createElement("div");
    node.classList.add("nav-comments");
    node.classList.add("checkbox");
    node.innerHTML = '<label for="incl-comments"><input type="checkbox" class="nav-input" id="incl-comments" name="incl-comments" onchange="toggleCommentsCheckbox(this)">display comments</label>';
    divNavTmp.appendChild(node);
    node = document.createElement("div");
    node.classList.add("nav-comments");
    node.classList.add("own-replies");
    node.classList.add("checkbox");
    node.innerHTML = '<label for="own-replies"><input type="checkbox" class="nav-input" id="own-replies" name="own-replies" onchange="toggleOwnRepliesCheckbox(this)">display own replies</label>';
    divNavTmp.appendChild(node);
    navDiv.appendChild(divNavTmp);
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
      break;
  }

  updateInfoText();
}

processObjectsByMode = function() {
  //0 - photos, 1 - post/comments, 2 - tags, 3 - locations, 4 - commentors, 5 - likers
  switch (myMode) {
    case '0':
      //0 - photos
      processMediaObjPhotos();
      break;
    case '1':
      //1 - post/comments
      processMediaObjPosts();
      break;
    case '2':
    case '3':
    case '4':
    case '5':
      clearMyList();
      processMediaObj();
      break;
  }
}

saveBtnClick = function() {
  var zip = new JSZip();
  var imgLinks = [];

  for (var x = 0; x < myCockpit.posts.length; x++) {
    imgLinks.push(myCockpit.posts[x].bigsizelink);
  }

  var count = imgLinks.length;
  var j = 0;

  for (var i = 0; i < count; i++) {
    JSZipUtils.getBinaryContent(imgLinks[i], function(err, data) {
      if (err) {
        console.error("Problem when downloading img: " + imgLinks[i]);
      } else {
        j++;
        $('p#loading-p').css('color', 'yellow').text('Downloading photo ' + j + ' of ' + count + ' ... ');
        zip.file("picture" + j + ".jpg", data, {
          binary: true
        });

        if (j === count) {
          $('p#loading-p').css('color', 'white').text('Done');

          setTimeout(updateInfoText, 2500);

          zip.generateAsync({
              type: "blob"
            })
            .then(function(content) {
              saveAs(content, myNickname + "_insta_big_photos.zip");
            });
        }
      }
    });
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
  var profilePicture;
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
      htmlTxt = '<a target="_blank" title="Open google map with this location" href="https://www.google.de/maps/place/' + dataValue + '">' + dataValue + '</a>';
      break;
    case '4':
      //4 - commentors
      var myFoundElem = myCockpit.commentors.filter(function(obj) {
        return obj.comName === dataValue;
      })[0];
      profilePicture = elem.getAttribute('data-profile-picture');
      htmlTxt = '<a class="with-hover-img" target="_blank" href="http://instagram.com/' + dataValue + '">' + dataValue + '<span><img class="profile-picture" src="' + profilePicture + '"/></span></a>';
      break;
    case '5':
      //5 - likers
      var myFoundElem = myCockpit.likers.filter(function(obj) {
        return obj.likerName === dataValue;
      })[0];
      profilePicture = elem.getAttribute('data-profile-picture');
      htmlTxt = '<a class="with-hover-img" target="_blank" href="http://instagram.com/' + dataValue + '">' + dataValue + '<span><img class="profile-picture" src="' + profilePicture + '"/></span></a>';
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
        var node = document.createElement("li");
        node.innerHTML = getPhotoTxt(myFoundPost);
        myDataList.appendChild(node);
      }
    }
  }

  document.getElementById("photos-by-data").scrollIntoView();
}

processMediaObj = function(objs) {
  var myList = document.getElementById("myList");
  var myObjs = objs;
  var t;
  var spanEl;
  var imgEl;

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

    btn.classList.add('clipboard-btn');

    //0 - photos, 1 - post/comments, 2 - tags, 3 - locations, 4 - commentors, 5 - likers
    switch (myMode) {
      case '2':
        //2 - tags
        btn.setAttribute('data-str-value', myObjs[i].tagName);
        btn.setAttribute('data-clipboard-text', myObjs[i].tagName);
        t = document.createTextNode(myObjs[i].tagName + ' (' + myObjs[i].tagCnt + ')');
        break;
      case '3':
        //3 - locations
        btn.setAttribute('data-str-value', myObjs[i].locName);
        btn.setAttribute('data-clipboard-text', myObjs[i].locName);
        t = document.createTextNode(myObjs[i].locName + ' (' + myObjs[i].locCnt + ')');
        break;
      case '4':
        //4 - commentors
        btn.setAttribute('data-str-value', myObjs[i].comName);
        btn.setAttribute('data-clipboard-text', myObjs[i].comName);
        btn.setAttribute('data-profile-picture', myObjs[i].profile_picture);
        t = document.createTextNode(myObjs[i].comName + ' - ' + myObjs[i].realName + ' (' + myObjs[i].comCnt + ')');
        btn.setAttribute('class', "user-btn");
        spanEl = document.createElement('span');
        imgEl = document.createElement('img');
        imgEl.setAttribute('src', myObjs[i].profile_picture);
        imgEl.setAttribute('class', "post-hover");
        spanEl.appendChild(imgEl);
        btn.appendChild(spanEl);
        break;
      case '5':
        //5 - likers
        btn.setAttribute('data-str-value', myObjs[i].likerName);
        btn.setAttribute('data-clipboard-text', myObjs[i].likerName);
        btn.setAttribute('data-profile-picture', myObjs[i].profile_picture);
        btn.setAttribute('class', "user-btn");
        spanEl = document.createElement('span');
        imgEl = document.createElement('img');
        imgEl.setAttribute('src', myObjs[i].profile_picture);
        imgEl.setAttribute('class', "post-hover");
        spanEl.appendChild(imgEl);
        btn.appendChild(spanEl);
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
  for (var i = 0; i < objects.length; i++) {
    var node = document.createElement("li");
    node.classList.add('comments');
    if (objects[i].user === myNickname) {
        node.classList.add('own-reply');
    } else {
        node.classList.add('comment');
    }

    commentTxt = '<i>' + getDateStr(objects[i].date) + ' - ' + '<a target="_blank" href="http://instagram.com/' + objects[i].user + '">' + objects[i].user + '<span><img class="post-hover" src="' + objects[i].profile_picture + '"/></span></a> : ' + objects[i].text + ' (<a target="_blank" href="' + objects[i].post_link + '">post<span><img class="post-hover" src="' + objects[i].post_thumbnail + '"/></span></a>)</i>';

    node.innerHTML = commentTxt;
    document.getElementById("myList").appendChild(node);
  }
}

processMediaObjPosts = function(objects) {
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

    commentTxt = getDateStr(posts[i].date) + ' - (likes: ' + posts[i].likescnt + ', comments: ' + posts[i].commentscnt + ', <a target="_blank" href="' + posts[i].link + '">post<span><img class="post-hover" src="' + posts[i].thumbnail + '"/></span></a>, <a target="_blank" href="' + posts[i].bigsizelink + '">big photo<span><img class="post-hover" src="' + posts[i].thumbnail + '"/></span></a>)';

    if (posts[i].caption !== '') {
      commentTxt = commentTxt + ' - ' + posts[i].caption;
    } else {
      commentTxt = commentTxt + ' - nocaption';
    }

    node = document.createElement("li");
    node.classList.add("postcaption");
    node.classList.add("comments");
    node.innerHTML = commentTxt;

    document.getElementById("myList").appendChild(node);

    var commentsObj = posts[i].comments;
    var commentsLength = commentsObj.length;
    if (commentsLength > 0) {
      for (j = 0; j < commentsLength; j++) {
        node = document.createElement("li");
        node.classList.add("comments");

        if (posts[i].comments[j].user === myNickname) {
          node.classList.add("own-reply");
        } else {
          node.classList.add("comment");
        }

        commentTxt = '<i>' + getDateStr(posts[i].comments[j].date) + ' - ' + '<a target="_blank" href="http://instagram.com/' + posts[i].comments[j].user + '">' + posts[i].comments[j].user + '<span><img class="post-hover" src="' + posts[i].comments[j].profile_picture + '"/></span></a> : ' + posts[i].comments[j].text + ' (<a target="_blank" href="' + posts[i].link + '">post<span><img class="post-hover" src="' + posts[i].thumbnail + '"/></span></a>)</i>';

        node.innerHTML = commentTxt;
        document.getElementById("myList").appendChild(node);
      }
    }
  }

  toggleCheckboxes();
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

  $('#incl-post-caption').prop("disabled", false);
  document.getElementById('incl-post-caption').checked = true;

  switch (option) {
    case 'space':
      processMediaObjPosts();
      break;
    case 'comm_date':
      $('#incl-post-caption').prop("disabled", true);
      document.getElementById('incl-comments').checked = true;
      document.getElementById('incl-post-caption').checked = false;

      slicedObjs = myCockpit.comments.slice(0);
      objs = slicedObjs.sort(function(a, b) {
        return b.date.getTime() - a.date.getTime();
      });
      processMediaObjComments(objs);
      break;
    case 'likes':
      objs = slicedObjs.sort(function(a, b) {
        return b.likescnt - a.likescnt;
      });
      processMediaObjPosts(objs);
      break;
    case 'posts':
      objs = slicedObjs.sort(function(a, b) {
        return b.commentscnt - a.commentscnt;
      });
      processMediaObjPosts(objs);
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
