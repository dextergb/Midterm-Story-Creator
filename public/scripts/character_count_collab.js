$(document).ready(function () {
  $("#collab-text").on("input", function () {
    let counter = 500 - this.value.length;
    if (counter >= 0) {
      $(".counter").replaceWith(
        `<output name="counter" class="counter" style="color: black" for="tweet-text">${counter}</output>`
      );
    } else {
      $(".counter").replaceWith(
        `<output name="counter" class="counter" style="color: red" for="tweet-text">${counter}</output>`
      );
    }
  });
});
