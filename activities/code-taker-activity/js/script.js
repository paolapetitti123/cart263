/**
Code Taker Activity
Paola Petitti

Following along activity video
*/

"use strict";

$(`#solved-dialog`).dialog({
  autoOpen: false,
  buttons: {
    "I know.": function(){
      $(this).dialog(`close`);
    }
  }
});

$(`.secret`).one(`mouseover`, function(event){
  $(this).addClass(`found`,500);
  $(this).draggable({
    helper: `clone`
  });
});

$(`#answer`).droppable({
  drop: function(event,ui){
    let character = ui.draggable.text();
    $(this).append(character);
    ui.draggable.draggable(`disable`);
    ui.draggable.removeClass(`found`);

    // Check if they got it right
    if($(this).text() === `Theremin`){
      $(`#solved-dialog`).dialog(`open`);
    }
  }
});
