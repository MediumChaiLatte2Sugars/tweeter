
$(document).ready(function() {

  $("#tweet-text").on("input", function(event) {

    // Extract the counter element from the DOM
    const counter = $(this).next().children()[1];

    // Calculate the remaining characters
    counter.value = 140 - this.value.length;

    // Determine if the counter is negative to help stylize accordingly
    if (counter.value < 0) {
      counter.setAttribute("negative", "true");
    } else {
      counter.setAttribute("negative", "false");
    }

  });

});

$(document).change(function() {

  $("#tweet-text").on("input", function(event) {

    // Extract the counter element from the DOM
    const counter = $(this).next().children()[1];

    // Calculate the remaining characters
    counter.value = 140 - this.value.length;

    // Determine if the counter is negative to help stylize accordingly
    if (counter.value < 0) {
      counter.setAttribute("negative", "true");
    } else {
      counter.setAttribute("negative", "false");
    }
  });

});
