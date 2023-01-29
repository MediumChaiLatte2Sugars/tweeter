/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

function renderTweets(tweetArray) {

  // Extract tweet container from DOM 
  const tweetContainer = $('main.container');

  // Loop through tweets
  for (let $tweet of tweetArray) {
    tweetContainer.append(createTweetElement($tweet));
  }

}

function escape(str){
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
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
          <span><img src=${tweet.user.avatars} alt="Tweeter user avatar" class="tweet-user-avatar">${escape(tweet.user.name)}</span>
          <span class="tweet-user-handle">${escape(tweet.user.handle)}</span>
      </div>
      <p class="tweet">${escape(tweet.content.text)}</p>
    </header>
    <footer> 
      <time>${timeago.format(tweet.created_at)}</time>
      <div class="tweet-actions">
        <i class="fa-solid fa-flag"></i>
        <i class="fa-solid fa-retweet"></i>
        <i class="fa-solid fa-heart"></i>
      </div>
    </footer>
  </article>
  `);

  return createdTweet;

}

/**
 * Perform ajax get requests to /tweets endpoint and render the recieved tweets from the server
 */
function loadTweets(){

  $.get('/tweets', function(data){
    console.log(data);
    renderTweets(data);
  })

}

loadTweets();

// DOM work
$(document).ready(function() {

  // Listener for tweet submission
  $("#tweet-form").submit(function( event ) {
    
    // prevent the page from redirecting/refreshing
    event.preventDefault();

    // Extract tweet data from form DOM node
    let tweetDataSerialized = $( this ).serialize();
    let tweetText = $(this)[0][0].value;

    // Validation: tweet is non-empty
    if (!tweetText){

      alert("Whoops! You didn't submit anything 🙃");
      return;

    }

    // Validation: tweet is less than 140 characters
    if (tweetText.length > 140){

      alert("Whoa! That tweet's way too long! 😵");
      return;

    }

    // Make POST request with tweet data to /tweets
    $.post('/tweets', tweetDataSerialized, function(data, status){
      
      // Empty the tweet containers
      $('article.tweet').remove();
      
      // Load tweets
      loadTweets();
      
    });
    

  });
});
