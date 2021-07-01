$(document).ready(function () {
  $('.complete').click(function (event) {
    event.preventDefault();
    const storyId = story.id;
    console.log(`clicked complete`)
    console.log(storyId);
    // take a story id. Just for now - static
    //const storyId = req.params.story_id;
    //let storyId = $this.attr("story.id");
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
