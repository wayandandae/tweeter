/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// create tweet markup element to be appended to tweet-list section
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

// add created markup element to tweet-list section using tweets array
const renderTweets = tweets => {
  for (const tweet of tweets) {
    // prepend to view tweets in a reverse chronological order
    $('.tweet-list').prepend(createTweetElement(tweet));
  }
};

// load data from /tweets using AJAX get method
const loadTweets = () => {
  $.ajax('/tweets', { method: 'get' }).then(data => renderTweets(data));
};

// escape cross-site scripting vulnerable string from the string
const escapeXSS = str => {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

// DOM loading and jQuery actions
$(document).ready(function() {
  loadTweets();
  // tweets list mouse hovering effect
  // using on() instead of hover() to apply to dynamic children elements
  $('.tweet-list').on('mouseover', '.other-tweet', function() {
    $(this).css('box-shadow', '5px 5px gray');
  });
  $('.tweet-list').on('mouseout', '.other-tweet', function() {
    $(this).removeAttr('style');
  });
  // social icons mouse hovering effect
  $('.tweet-list').on('mouseover', 'i', function() {
    $(this).css('color', '#ebc634');
  });
  $('.tweet-list').on('mouseout', 'i', function() {
    $(this).removeAttr('style');
  });
  // button action to post a new tweet to the server
  $('#tweet').click(function(event) {
    // prevent page refresh
    event.preventDefault();
    // traverse through elements to get jQuery object of tweet-text textarea
    let $userInput = $(this).parent().prev('#tweet-text');
    const $tweetContent = $userInput.val();
    // hidden divs containing error messages for null or long input
    const $shortError = $(this).parents('form').prevAll('.too-short');
    const $longError = $(this).parents('form').prevAll('.too-long');
    // if user has not entered anything in the input field, reveal relevant error message
    if (!$tweetContent) {
      $shortError.slideDown();
      // if the user has entered more than 140 characters in the field,
    } else if ($tweetContent.length > 140) {
      $longError.slideDown();
    } else {
      // perform ajax post request with the XSS escaped user input
      $.ajax('/tweets', { method: 'post', data: `text=${escapeXSS($tweetContent)}` })
        .done(() => {
          alert('Tweet posted!');
          // hide existing error boxes if new input passes data validation
          $shortError.slideUp();
          $longError.slideUp();
          // form is cleared after tweet is posted
          $userInput.val('');
          // load the tweet again with the updated data array
          loadTweets();
        })
        .fail((error) => alert(error.status + ': ' + error.statusText));
    }
  });
});
