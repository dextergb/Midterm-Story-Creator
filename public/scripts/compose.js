$(document).ready(function () {
  const button = $(".compose");

  button.on("click", function (event) {
    $(".collab-form").slideToggle("slow");
    $("html, body").animate(
      {
        scrollTop: 0,
      },
      500
    );
    $(".collab-form").find("#collab-text").focus();
    event.preventDefault();
  });
});
