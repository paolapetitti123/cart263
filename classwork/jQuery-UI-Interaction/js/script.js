/**
jQuery UI Interaction
Paola Petitti
*/

"use strict";
$(`#prisoner`).draggable();

$(`#escape-tunnel`).droppable({
  drop: function(event, ui) {
    ui.draggable.remove();
  }
});
