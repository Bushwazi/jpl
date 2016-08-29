<?php
ini_set('display_errors', 1);
require_once('TwitterAPIExchange.php');

/** Set access tokens here - see: https://dev.twitter.com/apps/ **/
$settings = array(
    'oauth_access_token' => "19831320-RPLWrD5c9cMORr6GczVAF7g9L6eGmk22h7p6BwkHw",
    'oauth_access_token_secret' => "Q9ZUFFcdKOgf4RPKcu7w0MIbvVd9b4m7uPvjeGWjQojuw",
    'consumer_key' => "WS97rBbiGcrbCcCEtA7dTKxZ1",
    'consumer_secret' => "mM7V6FsHDsq2ruO4kSnOW0MuIMbnGIM8ASYjC2AyIBKcGDSnY4"
);

/** Perform a GET request and echo the response **/
/** Note: Set the GET field BEFORE calling buildOauth(); **/
$url = 'https://api.twitter.com/1.1/statuses/user_timeline.json';
$getfield = 'count=10&q=remotelife';
$requestMethod = 'GET';
$twitter = new TwitterAPIExchange($settings);
echo $twitter->setGetfield($getfield)
             ->buildOauth($url, $requestMethod)
             ->performRequest();


/*
    THANKS TO: https://github.com/J7mbo/twitter-api-php
*/