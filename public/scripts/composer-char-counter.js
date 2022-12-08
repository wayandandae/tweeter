$(document).ready(function() {
  let $wordCount = 0;
  $('#tweet-text').keyup(function() {
    $wordCount = $(this).val().length;
    // find a child element with class name counter from the next sibling
    const counter = $(this).next().children('#counter');
    counter.val(140 - $wordCount);
    if ($wordCount > 140) {
      // change counter font color to red when wordCount exceeds 140
      counter.css('color', 'red');
    } else {
      // remove style attribute set by jQuery whenever wordCount is less than 140
      counter.removeAttr('style');
    }
  });
});