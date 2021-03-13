/**
jQuery-Events
Paola Petitti
*/

"use strict";

$(`.header`).on(`click`, function(event) {
  $(this).css(`color`,`red`);
  $(`.header`).off(`click`);
});
