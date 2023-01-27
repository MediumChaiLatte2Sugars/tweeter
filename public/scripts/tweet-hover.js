$(document).ready(function() {

  // Extract the article object
  const tweetContainer = $("main.container");

  // Define the mouseover function
  function highlightTweetHandle(event) {

    // Get the closest tweet jQuery
    const currentTweet = $(event.target).closest("article.tweet");

    // Extract handle
    const tweetUserHandle = currentTweet.find("span.tweet-user-handle");

    // Apply the style flag
    if (tweetUserHandle.length === 1) { 
      tweetUserHandle[0].setAttribute("hover", "true");
    }

  }

  function unhighlightTweetHandle(event){

    // Get the closest tweet
    const currentTweet = $(event.target).closest("article.tweet");
    
    // Extract handle
    const tweetUserHandle = currentTweet.find("span.tweet-user-handle");

    // Remove the style flag
    if (tweetUserHandle.length === 1) {
      tweetUserHandle[0].removeAttribute("hover");
    }

  }

  // Change the style on mouseover
  $(tweetContainer).on("mouseover", highlightTweetHandle);

  // Reset style on mouseout
  $(tweetContainer).on("mouseout", unhighlightTweetHandle);

});