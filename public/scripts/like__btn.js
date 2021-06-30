$(document).ready(function () {
<<<<<<< HEAD
  $(".btn-counter").on("click", function (event, count) {
    event.preventDefault();
    var $this = $(this),
      count = $this.attr("data-count"),
      active = $this.hasClass("active"),
      multiple = $this.hasClass("multiple-count");
    $.fn.noop = $.noop;
    const story_id = event.target.id;
    $(() => {
      $.ajax({
        method: "POST",
        url: "/vote_button",
        data: { param: story_id },
      })
        .then((data) => {
          console.log("THISISS", data);
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
=======
  $(".btn-counter").click(function (event) {
    // Don't follow the link
    event.preventDefault();
    console.log(`clicked incerement`);
    // take a story id. Just for now - static
    //let storyId = req.params.storyID;
    let storyId = 1;
    $.ajax({
      method: "POST",
      url: `/stories/${storyId}/increment`,
    })
      .done((res) => {
        console.log(`success updated story: ${res}`);
      })
      .fail((err) => {
        console.log(`failed update with err: ${err}`);
      });
>>>>>>> 8e12d52959b96616d8dd5605c506a2f2c8df81f3
  });
});
