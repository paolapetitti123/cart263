/**
Code Taker Exercise
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

$(`#instruct-dialog`).dialog({
  autoOpen: true,
  buttons: {
    "Got it!": function(){
      $(this).dialog(`close`);
    }
  },
  modal: true
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
