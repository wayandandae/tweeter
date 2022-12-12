/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// create tweet markup element to be added to tweet-list section
const createTweetElement = tweet => {
  let $tweet = `
    <article class="other-tweet">
      <header>
        <img class="avatar" src="${tweet.user.avatars}"></div>
        <div class="username">${tweet.user.name}</div> 
        <div class="account">${tweet.user.handle}</div>
      </header>
        <p>${tweet.content.text}</p>
      <footer>
        <div>${timeago.format(tweet.created_at)}</div>
        <div class="social-icon">
          <i class="fa-solid fa-flag"></i>
          <i class="fa-solid fa-retweet"></i>
          <i class="fa-solid fa-heart"></i>
        </div>
      </footer>
    </article>
  `;

  return $tweet;
};

// add the newly created markup element to tweet-list section using tweets array
const renderTweets = tweets => {
  // empty all nodes under the section to prevent duplicate items being added
  $('.tweet-list').empty();
  for (const tweet of tweets) {
    // prepend to view tweets in a reverse chronological order
    $('.tweet-list').prepend(createTweetElement(tweet));
  }
};

// load data from /tweets using AJAX get method
const loadTweets = () => {
  $.get('/tweets').then(data => renderTweets(data));
};

// escape cross-site scripting vulnerable string from the user input
const escapeXSS = str => {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

// reveal error box, add class, and change css
const boxReveal = element => {
  element.slideDown();
  element.addClass('error-box');
  // default display css value of addClass is block so manually change to flex
  element.css('display', 'flex');
};

// wait for DOMs to be loaded and perform jQuery actions within main.container
$(document).ready(function() {
  // load saved tweets as soon as possible
  loadTweets();
  // submit action to post a new tweet to the server
  $('.tweet-form').submit(function(event) {
    // prevent page refresh
    event.preventDefault();
    // traverse through elements to get jQuery object of tweet-text textarea
    const $userInput = $(this).children('#tweet-text');
    const $tweetContent = $userInput.val();
    // hidden divs containing error messages for null, long input, or server error
    const $errorBox = $(this).prev();
    const $errorMsg = $errorBox.children('#error-msg');
    // if user has not entered anything in the input field, reveal relevant error message
    if (!$tweetContent) {
      $errorMsg.text('You cannot post an empty tweet. Please try again.');
      boxReveal($errorBox);
      // if the user has entered more than 140 characters in the field, reveal long error
    } else if ($tweetContent.length > 140) {
      $errorMsg.text('Tweet cannot be longer than 140 characters. Please try again.');
      boxReveal($errorBox);
    } else {
      // perform ajax post request with the XSS escaped user input
      $.post('/tweets', `text=${escapeXSS($tweetContent)}`)
        .done(() => {
          // hide existing error box if new user input passes data validation
          $errorBox.slideUp();
          // form is cleared after the tweet is posted
          $userInput.val('');
          // and the character counter is reset
          $('#counter').val('140');
          // load tweets again with the updated data array
          loadTweets();
        })
        .fail((error) => {
          $errorMsg.text(`Error ${error.status}: ${error.statusText}`);
          boxReveal($errorBox);
        });
    }
  });
});