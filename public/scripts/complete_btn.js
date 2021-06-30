$(document).ready(function () {
  $('.btn-complete').click(function (event) {
    // Don't follow the link
    event.preventDefault();
    console.log(`clicked complete`)
    // take a story id. Just for now - static
    //let storyId = req.params.storyID;
    let storyId = $this.attr("story.id");
    $.ajax({
      method: "POST",
      url: `/stories/${storyId}/complete`,
    }).done((res) => {
      console.log(`succes updated story status: ${res}`)
    }).fail((err)=>{
      console.log(`failed update with err: ${err}`)
    })
  });
});
