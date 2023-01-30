$(document).ready(function() {

  // Extract the article DOM node (container for all the tweets)
  const tweetContainer = $("div.tweet-container");

  /**
   * Helper funciton for mouseover handler on tweets that helps style 
   * tweet user handles
   * @param {*} event 
   */
  function highlightTweetHandle(event) {

    // Get the closest tweet DOM node
    const currentTweet = $(event.target).closest("article.tweet");

    // Extract tweet handle DOM node
    const tweetUserHandle = currentTweet.find("span.tweet-user-handle");

    // Apply the style flag
    if (tweetUserHandle.length === 1) {
      tweetUserHandle[0].setAttribute("hover", "true");
    }

  }

  /**
   * Helper function for mouseout handler on tweets that helps reset
   * the style on tweet user handles
   * @param {*} event 
   */
  function unhighlightTweetHandle(event) {

    // Get the closest tweet DOM node
    const currentTweet = $(event.target).closest("article.tweet");

    // Extract tweet handle DOM node
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