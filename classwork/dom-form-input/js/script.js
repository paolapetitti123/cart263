let mainHeading = document.getElementById(`main-heading`);
let originalText = paragraph.innerText;

window.addEventListener(`offline`, function(event) {
  mainHeading.innerText = `:(`;
});
