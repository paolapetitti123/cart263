/**
jQuery Extras
Paola Petitti
*/

"use strict";

$(`#button`).on(`click`, function(event) {
  $(`.header`).animate({
    "opacity": 0.5,
    "height": "200px"
  },{
    duration: 2000,
    complete: function() {
      $(this).text("ANIMATED");
    },
    easing: `linear`
  });
});
