$(document).ready(function () {
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
  });
});
