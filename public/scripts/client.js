/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Samble database to test dynamic tweet creation
const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd"
    },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
];

function renderTweets(tweetArray) {

  // Extract tweet container from DOM 
  const tweetContainer = $('main.container');

  // Loop through tweets
  for (let $tweet of tweetArray) {
    tweetContainer.append(createTweetElement($tweet));
  }

}

/**
 * Converts a JS tweet object into a DOM node, returning the result
 * @param {*} tweet 
 * @returns A DOM node representing a tweet
 */
function createTweetElement(tweet) {

  // Setup DOM tweet template with relevant tweet details interpolated
  const createdTweet = $(`
  <article class="tweet">
    <header>
      <div>
          <span><img src=${tweet.user.avatars} alt="Tweeter user avatar" class="tweet-user-avatar">${tweet.user.name}</span>
          <span class="tweet-user-handle">${tweet.user.handle}</span>
      </div>
      <p class="tweet">${tweet.content.text}</p>
    </header>
    <footer> 
      <time>${tweet.created_at}</time>
      <div class="tweet-actions">
        <i class="fa-solid fa-flag"></i>
        <i class="fa-solid fa-retweet"></i>
        <i class="fa-solid fa-heart"></i>
      </div>
    </footer>
  </article>
  <br>`);

  return createdTweet;

}


// DOM work
$(document).ready(function() {
  renderTweets(data);

  // Listener for tweet submission
  $("#tweet-form").submit(function( event ) {
    
    // prevent the page from redirecting/refreshing
    event.preventDefault();

    // Extract tweet data from form DOM node
    let tweetData = $( this ).serialize();

    // Make POST request with tweet data to /tweets
    $.post('/tweets', tweetData);

  });
});
