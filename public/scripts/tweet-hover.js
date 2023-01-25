$(document).ready(function() {

  // Extract the article object
  const article = $(".tweet")[0];

  // Change the style on mouseover
  $(article).on("mouseover", function(event){

    // Get user handle
    const tweet = $(".tweet-user-handle")[0];

    // Set hover to true
    tweet.setAttribute("hover", "true");

  });

  // Reset style on mouseout
  $(article).on("mouseout", function(event){

    // Get user handle
    const tweet = $(".tweet-user-handle")[0];

    // Set hover to false
    tweet.removeAttribute("hover");

  });

});