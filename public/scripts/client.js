/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

/**
 * Tweet rendering helper function that takes an array of tweets, converts them to a tweet DOM element
 * and appends them to the DOM
 * @param {*} tweetArray 
 * @returns 
 */
function renderTweets(tweetArray) {

  // Extract tweet container from DOM 
  const tweetContainer = $('section.tweets');

  // Single tweeet case
  if (tweetArray.length === 1) {
    return tweetContainer.append(createTweetElement(tweetArray[0]));
  }

  // Loop through tweets
  for (let $tweet of tweetArray) {
    tweetContainer.append(createTweetElement($tweet));
  }

}

/**
 * Helper function to help stringify inputs from user to curtail XSS vulnerabilites
 * @param {*} str 
 * @returns 
 */
function escape(str) {
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
function loadTweets() {

  $.get('/tweets', function(data) {

    // Rendering only the newest tweet from the webpage
    if ((data.length) - $('article.tweet').length === 1) {

      let latestTweet = [data[data.length - 1]];
      return renderTweets(latestTweet);

    }

    renderTweets(data);
  });

}

/**
 * Helper function to determine if desired scrolling values have been reached to reveal the scroll toggle
 * button returning a user to the top of the tweet section, focusing on the tweet form for input
 * @param {*} element 
 * @param {*} value 
 */
function checkElementScroll(element, value) {

  if ($(element).scrollTop() > value) {
    $("div#scroll-to-top")[0].setAttribute("hidden", "false");
  } else {
    $("div#scroll-to-top")[0].removeAttribute("hidden", "false");
  }

}

// Initital load of the tweets on the DOM
loadTweets();

// DOM work
$(document).ready(function() {

  // Listen for clicks on scroll to top button
  $("div#scroll-to-top").on('click', function() {

    // Check if new tweet section is displayed
    if ($("section.new-tweet").is(":visible")) {

      // Focus on the tweet section
      $(window).scrollTop($("#tweet-text").offset());
      $("#tweet-text").focus();
      return;
    }

    // Reveal the tweet form
    $("section.new-tweet").slideDown("0.15", function() {

      // Check if new tweet section is displayed
      if ($("section.new-tweet").is(":visible")) {

        // Focus on the tweet section
        $(window).scrollTop($("#tweet-text").offset());
        $("#tweet-text").focus();
      }

    });

  });

  // Listen for window scrolling past the beginning
  $(window).on('scroll', function() {

    checkElementScroll(window, 500);

  });

  // Listen for overflow scrolling on main element
  $('main.container').on('scroll', function() {

    checkElementScroll('main.container', 250);

  });

  // Listener for clicks on the compose button
  $("span#tweet-prompt").on('click', function() {

    // Check if new tweet section is displayed
    if ($("section.new-tweet").is(":visible")) {

      // Hide the tweet section
      $("section.new-tweet").slideUp("0.15");
      return;
    }

    // Reveal the tweet form
    $("section.new-tweet").slideDown("0.15", function() {

      // Focus on the tweet form textarea
      $("#tweet-text").focus();

    });

  });

  // Listener for tweet submission
  $("#tweet-form").submit(function(event) {

    // prevent the page from redirecting/refreshing
    event.preventDefault();

    // Hide any currently displayed errors
    $("p.tweet-error").slideUp("0.15");

    // Extract tweet DOM elements
    const textArea = $(this)[0][0];
    const charCounter = $(this)[0][2];

    // Extract tweet data from form DOM node
    let tweetDataSerialized = $(this).serialize();
    let tweetText = textArea.value;

    // Validation: tweet is non-empty
    if (!tweetText) {

      // Dissplay DOM error element for empty tweets
      $("p.tweet-error").html(
        `<i class="fa-solid fa-triangle-exclamation"></i> Whoops! You didn't submit anything 🙃 <i class="fa-solid fa-triangle-exclamation"></i>`)
        .slideDown("0.15");

      return;

    }

    // Validation: tweet is less than 140 characters
    if (tweetText.length > 140) {

      // Display DOM error element for long tweets
      $("p.tweet-error").html(
        `<i class="fa-solid fa-triangle-exclamation"></i> Whoa! That tweet's way too long! (140 characters max) 😵 <i class="fa-solid fa-triangle-exclamation"></i>`)
        .slideDown("0.15");
      return;

    }

    // Clear the textarea
    textArea.value = "";

    // Reset the counter
    charCounter.value = 140;

    // Make POST request with tweet data to /tweets
    $.post('/tweets', tweetDataSerialized, function(data, status) {

      // Load tweets on the DOM 
      loadTweets();

    });


  });
});
