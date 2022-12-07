/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {
  // other tweets mouse hovering effect
  $('.other-tweet').hover(
    function() {
      $(this).css('box-shadow', '5px 5px gray');
    }, function() {
      // remove style when mouse exits this element
      $(this).removeAttr('style');
    }
  );
  // social icons mouse hovering effect
  $('.social-icon').children().hover(
    function() {
      $(this).css('color', '#ebc634');
    }, function() {
      $(this).removeAttr('style');
    }
  );
});