/**
jQuery Extras
Paola Petitti
*/

"use strict";

$(`#button`).on(`click`, function(event) {
  $(`.header`).fadeOut(2500,function(){
    $(`.header`).fadeIn(2500);
  });
});
