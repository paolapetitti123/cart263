/**
jQuery Form Input
Paola Petitti
*/

"use strict";

$(`#example-button`).on(`click`, function(event) {
  let input = $(`#example-text-input`).val();
  alert(input);
});
