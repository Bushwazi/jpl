var TweetBox = React.createClass({
  getTweets: function() {
    var tweet_request = new XMLHttpRequest();
    tweet_request.open('GET', this.props.url, true);
    tweet_request.onload = function(evt) {
      // console.log("STATUS", tweet_request.status, tweet_request.response, tweet_request, gt)
      if (tweet_request.status >= 200 && tweet_request.status < 400) {
        var data = JSON.parse(tweet_request.response);
        this.setState({data: data});
      } else {
        this.setState({data: sampleTweet});
      }
    }.bind(this);
    tweet_request.onerror = function() {
      // There was a connection error of some sort
    };
    tweet_request.send();
  },
  getInitialState: function() {
    return {data: []};
  },
  componentDidMount: function() {
    this.getTweets();
  },
  render: function() {
    return (
      <div className="twitter-box">
        <h1>Twitter + React</h1>
        <p>I had the Twitter API working correctly, but then it told me I was over the quota, so on GET error, I load the sample Twitter JSON that I found online. Hopefully by the time another human looks at this, the Twitter API will like me again!</p>
        <TweetList data={this.state.data} />
      </div>
    );
  }
});
var TweetList = React.createClass({
  render: function() {
    var tweetNodes = this.props.data.map(function(tweet,ind,arr){
        return (
          <Tweet author={tweet["user"]["screen_name"]} key={tweet["id"]}>
            {tweet["text"]}
          </Tweet>
        );
    });
    return (
      <ul className="tweet-list">
        {tweetNodes}
      </ul>
    );
  }
});

var Tweet = React.createClass({
  render: function(what) {
    return (
      <li className="tweet">
        <blockquote>"{this.props.children}"</blockquote>
        <cite className="tweetAuthor">{this.props.author}</cite>
      </li>
    );
  }
});
ReactDOM.render(
  <TweetBox url="public/actions/get-twitter.php" />,
  document.querySelector('.react-here')
);