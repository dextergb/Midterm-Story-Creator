$(document).ready(function () {
  const db = require("../../db/database");

  $(".btn-counter").on("click", function (event, count) {
    event.preventDefault();

    var $this = $(this),
      count = $this.attr("data-count"),
      active = $this.hasClass("active"),
      multiple = $this.hasClass("multiple-count");

    $.fn.noop = $.noop;
    db.query(` SELECT story_id, votes FROM stories
    UPDATE stories
    SET votes = votes + 1
    WHERE story_id = $1
    `);
    $this
      .attr("data-count", !active || multiple ? ++count : --count)
      [multiple ? "noop" : "toggleClass"]("active");
  });
});
