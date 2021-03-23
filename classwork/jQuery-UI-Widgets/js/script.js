/**
jQuery UI Widgets
Paola Petitti
*/

"use strict";

// Hide the escape tunnel initially
$(`#escape-tunnel`).hide();

$(`#introduction-dialog`).dialog({
  modal: true,
  buttons: {
    "Imagination": function() {
      // NEW!
      // Remove the restriction of the prisoner being contained by the prison!
      $(`#prisoner`).draggable(`option`,`containment`,`none`);
      $(this).dialog(`close`);
    },
    "Escape tunnel": function() {
      // If they want an escape tunnel, give it to them...
      $(`#escape-tunnel`).show();
      $(this).dialog(`close`);
    }
  }
});
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
