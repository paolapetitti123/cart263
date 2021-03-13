/**
jQuery Form Input
Paola Petitti
*/

"use strict";

$(`#range-slider`).on(`change`, function(event) {
  // Use .val() to access the current value of the slider
  let value = $(this).val();
  alert(value);
});
