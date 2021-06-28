$(document).ready(function () {
  const button = $(".compose");

  button.on("click", function (event) {
    $(".tweet-form").slideToggle("slow");
    $("html, body").animate(
      {
        scrollTop: 0,
      },
      500
    );
    $(".tweet-form").find("#tweet-text").focus();
    event.preventDefault();
  });
});
