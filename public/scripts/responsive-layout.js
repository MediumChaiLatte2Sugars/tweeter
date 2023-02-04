$(document).ready(function() {

  // Extract the elements to be wrapped from the DOM
  const $responsiveContentContainer = $('div#responsive-content-container');

  // Function to handle the mobile case
  function handleMobileCase() {

    // Check for the existence of the wrapper containers
    if ($('div.wrapper').length === 0){
      return;
    }

    // Extract the DOM content from the containers
    let content = [$('div.wrapper').contents()[0], $('div.wrapper').contents()[1]];

    // Remove the wrapper containers
    $('div.wrapper').remove();
    
    // Add the content to the DOM to replace the wrapper
    $responsiveContentContainer
      .append(content[0])
      .append(content[1]);

  }

  // Function to handle the desktop case
  function handleDesktopCase() {

    // Check for the existence of the wrapper containers
    if ($('div.wrapper').length > 0){
      return;
    }

    // Extract the elements to be wrapped from the DOM
    const $header = $responsiveContentContainer.find("header").first().detach();
    const $mainContainer = $responsiveContentContainer.find("main.container").detach();

    // Append the two containers to the DOM
    $responsiveContentContainer
      .append('<div class="wrapper"></div>')
      .append('<div class="wrapper"></div>');

    // Attach the the previously removed elements into the wrapper divs
    $responsiveContentContainer.find('.wrapper').first().append($header);
    $responsiveContentContainer.find('.wrapper').last().append($mainContainer);
  }

  // Display checker
  function displayCheck() {

    if ($(window).innerWidth() < 1024){
      handleMobileCase();
    }
    
    if ($(window).innerWidth() >= 1024){
      handleDesktopCase();
    }

  }

  displayCheck();

  // Handler for window resizes for responsive layouts
  $(window).resize(function() {
   
    displayCheck();

  });
});
