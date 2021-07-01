$(document).ready(function () {
  $(".btn-counter").on("click", function (event, count) {
    event.preventDefault();
    var $this = $(this),
      count = $this.attr("data-count"),
      active = $this.hasClass("active"),
      multiple = $this.hasClass("multiple-count");
    $.fn.noop = $.noop;
    const story_id = $this.attr("id");
    $(() => {
      $.ajax({
        method: "POST",
        url: "/vote_button",
        data: { param: story_id },
      })
        .then((data) => {
          $(`#vote_count_${story_id}`).text(data.message);
          $this
            .attr(
              "data-count",
              !active || multiple ? data.message : data.message
            )
            [multiple ? "noop" : "toggleClass"]("active");
        })
        .catch((err) => {
          console.log(err);
        });
    });
  });
});
