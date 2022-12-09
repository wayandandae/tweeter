// JS logic for scroll-to-top button
$(document).ready(function() {
  const $scrollButton = $('main.container').next('button#scroll-top');
  // whenever user scrolls the window, following actios are fired
  $(window).scroll(() => {
    // if the window scroll position is not exactly at the top,
    if ($(window).scrollTop() !== 0) {
      // hide div containing 'write a new tweet' text and button
      $('#tweet-toggle').fadeOut();
      // change css display value of the scroll button to something visible
      $scrollButton.css('display', 'inline-block');
      // if the scroll position is back at top, revert back to the original state
    } else {
      $('#tweet-toggle').fadeIn();
      $scrollButton.removeAttr('style');
    }
  });
  // if the scroll-to-top button is clicked, (buggy if clicked while scrolling)
  $scrollButton.click(() => {
    // if the section to compose a new tweet is hidden, reveal it
    if ($('section.new-tweet').is(':hidden')) {
      $('section.new-tweet').slideDown();
    }
    // scroll to top of the screen so user can use the input field
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  });
});