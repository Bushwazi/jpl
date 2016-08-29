var nT = {
  init: function intialize(){
    /*
      Initialize the nT object an run anything that happens on every page
    */
    nT.cE();
    nT.eL();
    nT.pD();
    nT.animateIntro();
  },
  cE: function cacheElements(){
    /*
      Cache any variable or DOM element that we want to store
    */
    nT.instaString = "";
    nT.thisPost = null;
    nT.instagramFeed = document.querySelectorAll(".instagram-feed") || null;
    nT.twitterFeed = document.querySelectorAll(".twitter-feed") || null;
  },
  eL: function eventListeners(){
    /*
      Register event listeners
    */
  },
  pD: function pageDependants(){
    /*
      Methods that are page dependant.
        1. Check to see if there is the instagram-feed element, and if there is, populate it
    */
    if(nT.instagramFeed && nT.instagramFeed.length > 0){
      nT.jsonp('https://api.instagram.com/v1/tags/remotelife/media/recent?access_token=441909070.98701fb.fb3913242f894aea842816e3af2945c9', nT.showInstagram);
    }
    if(nT.twitterFeed && nT.twitterFeed.length > 0){
      // https://twitter.com/search?q=%23remotework
      // https://api.twitter.com/1.1/search/tweets.json?q=%23remotework&result_type=recent
      nT.getTwitter();
    }
  },
  showInstagram: function (data){
    /*
      The callback for the Instagram JSONP call. This takes the data and builds the html for the section.
    */
    for(var post in data.data){
      thisPost = data.data[post];
      // console.dir(thisPost);
      nT.instaString += "<li><a href='"+thisPost.link+"' title='"+thisPost.caption.text+"' target='_blank'><img src='" + thisPost.images.thumbnail.url + "' alt='"+thisPost.caption.text+"'/><span>"+thisPost.caption.text+"</span><span>"+thisPost.likes.count+"&#10084;</span></a></li>";
    }
    nT.instagramFeed[0].innerHTML = nT.instaString;
  },
  jsonp: function(url, callback) {
    /*
      Instagram API call. This is the easiest way I found to get the Instagram DATA without using a GET. I poached this method from a Stack Overflow answer
        Cite: http://stackoverflow.com/questions/22780430/javascript-xmlhttprequest-using-jsonp
    */
    var callbackName = 'jsonp_callback_' + Math.round(100000 * Math.random());
    window[callbackName] = function(data) {
        delete window[callbackName];
        document.body.removeChild(script);
        callback(data);
    };

    var script = document.createElement('script');
    script.src = url + (url.indexOf('?') >= 0 ? '&' : '?') + 'callback=' + callbackName;
    document.body.appendChild(script);
  },
  animateIntro: function (){
    /*
      Just adds the class to the document.body after user has been on the page for half a second
    */
    window.setTimeout(function(){
      document.body.classList.add("animate-intro");
    }, 500);
    // console.log("LINE 1: ", document.querySelector(".line-1").getTotalLength());
    // console.log("LINE 2: ", document.querySelector(".line-2").getTotalLength());
    // console.log("LINE 3: ", document.querySelector(".line-3").getTotalLength());
    // console.log("LINE 4: ", document.querySelector(".line-4").getTotalLength());
    // console.log("LINE 5: ", document.querySelector(".line-5").getTotalLength());
    // console.log("LINE 6: ", document.querySelector(".line-6").getTotalLength());
    // console.log("LINE 7: ", document.querySelector(".line-7").getTotalLength());
    // console.log("LINE 8: ", document.querySelector(".line-8").getTotalLength());
    // console.log("LINE 9: ", document.querySelector(".line-9").getTotalLength());
  },
  getTwitter: function(){
    var tweet_request = new XMLHttpRequest();
    tweet_request.open('GET', 'public/actions/get-twitter.php', true);
    tweet_request.onload = function() {
      if (this.status >= 200 && this.status < 400) {
        // Success!
        var data = JSON.parse(this.response);
        console.dir(data);
        nT.reactToTweets(data);
      } else {
        // We reached our target server, but it returned an error
        console.log(err);
      }
    };
    tweet_request.onerror = function() {
    // There was a connection error of some sort
    };
    tweet_request.send();
  },
  reactToTweets: function(datum){
    for(var tweet in datum){
      thisTweet = datum[tweet];
      // console.dir(thisTweet);
      nT.tweetString += "<li>"+thisTweet.text+"</li>";
    }
    nT.twitterFeed[0].innerHTML = nT.tweetString;
  }
};
nT.init();