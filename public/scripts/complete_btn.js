$(document).ready(function () {
  $("#complete").on("click", function (event) {
   event.preventDefault();
   const story_id = $this.attr("id");
    $.ajax({
      method: "POST",
      url: "/",
      data:{ param: story_id }
    }).then((data) => {
      $(`#complete_${story_id}`)
    }).catch((err)=>{
      console.log(`failed update with err: ${err}`)
    })
  });
});
