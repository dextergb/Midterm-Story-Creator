$(document).ready(function () {
  const button = $(".back-to-top");
  // Back to top on click
  button.on("click", function (event) {
    $("html, body").animate(
      {
        scrollTop: 0,
      },
      500
    );
    event.preventDefault();
  });

  // Appears on scroll
  $(window).on("scroll", function () {
    const self = $(this),
      top = self.scrollTop();

    if (!button.is(":visible")) {
      button.show();
    }
    // Hidden at top of page
    if (top === 0) {
      button.hide();
    }
  });
});
