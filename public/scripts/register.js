function field_focus(field, email) {
  if (field.value == email) {
    field.value = "";
  }
}

function field_blur(field, email) {
  if (field.value == "") {
    field.value = email;
  }
}

//Fade in dashboard box
$(document).ready(function () {
  $(".box").hide().fadeIn(1000);
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const error = urlParams.get("error");
  if (error === "Userinuse") {
    alert("User In Use.");
  }
});

//Stop click event
$("a").click(function (event) {
  event.preventDefault();
});
