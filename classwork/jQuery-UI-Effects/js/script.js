/**
jQuery UI Effects
Paola Petitti
*/

"use strict";
$(`#prisoner`).effect({
  effect: `shake`,
  duration: 2000,
  times: 15,
  distance: 10,
  complete: prisonDrag
});



$(`#escape-tunnel`).droppable({
  drop: function(event, ui) {
    ui.draggable.remove();
    $(this).hide({
      effect: `blind`,
      duration: 500
    });
  }
});

function prisonDrag(){
  $(`#prisoner`).draggable({
    containment: `#prison`,
    start: function(event,ui) {
      $(this).addClass(`prisoner-dragging`, 750);
    },
    stop: function(event,ui) {
      $(this).removeClass(`prisoner-dragging`, 750);
    }
  });
}
