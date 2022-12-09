// JS logic for navbar > 'write a new tweet' button
$(document).ready(function() {
  // find jQuery object of double angles down icon
  const $toggleButton = $('#tweet-toggle').children('i.fa-angles-down');
  // hovering over the whole div activates animation effect
  $toggleButton.parent().hover(function animate() {
    $toggleButton.animate({top: '.5em'}, 500);
    // queue up animate after the second animation ends
    $toggleButton.animate({top: 0}, 1000, animate);
  }, function() {
    // when user's mouse exits the div, stop the animation
    $toggleButton.stop(true);
  });
  // if the user clicked the text or button,
  $toggleButton.parent().click(function() {
    // and if input field is already visible, hide the element, vice-versa
    if ($('section.new-tweet').is(':visible')) {
      $('section.new-tweet').slideUp();
    } else {
      $('section.new-tweet').slideDown();
    }
  });
});