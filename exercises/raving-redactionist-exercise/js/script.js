/**
Raving Redactionist Activity
Paola Petitti

Following along the activity video
*/
"use strict";
let bgMusic = undefined;
let state = `start`;
document.body.style.overflow = 'hidden';
let counter = 0;
let hiddenWords = 10;

function preload(){
  bgMusic = loadSound(`assets/sounds/HOMERUNOrchestra.mp3`);
}

function setup(){
  createCanvas(windowWidth,windowHeight);
  bgMusic.setVolume(0.5);
}

function draw(){
  if(state === `start`){
    intro();
  }
  else if(state === `game`){
    game();
  }
}

function intro(){
  $(`#secret-document`).hide();
  $(`#stealButton`).hide();
  $(`#win`).hide();
  textSize(25);
  textAlign(CENTER);
  textFont("monospace");
  text(`REVEAL & STEAL THE DECLARATION OF INDEPENDANCE!
    PRESS ENTER TO START`, width/2, height/2);
}

function keyPressed(){
  if(keyCode === ENTER){
    state = `game`;
    bgMusic.play();
  }
}

function game(){
  noCanvas();
  $(`#secret-document`).show();
  $(`.top-secret`).on(`click`,redact);
  $(`#stealButton`).on(`click`, function(){
    $(`#secret-document`).hide();
    $(`#win`).fadeIn();
    $(this).fadeOut();
  });
}

function noScroll(){
  window.scrollTo(0,0);

}

function redact(event){
  $(this).removeClass(`redacted`);
  $(this).addClass(`revealed`);
  counter++;
  if(counter == hiddenWords){
    $(`#stealButton`).fadeIn();
  }
}
