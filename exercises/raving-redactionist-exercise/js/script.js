/**
Raving Redactionist Exercise
Paola Petitti

The idea of this exercise is to reveal the hidden text and steal the Declaration
of Independence
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

/*
  Starting off with the document hidden showing the users the instructions
*/
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

/*
  Once the enter key is pressed it'll bring the users into the game and music
  will start
*/
function keyPressed(){
  if(keyCode === ENTER){
    state = `game`;
    bgMusic.play();
  }
}

/*
  The canvas gets removed entirely, the document gets shown, you can click on the
  redacted words/phrases to uncover them, and the steal button brings you to the
  end of the game
*/
function game(){
  noCanvas();
  $(`#secret-document`).show();
  $(`.top-secret`).on(`click`,redact);
  $(`#stealButton`).on(`click`, function(){
    $(`#secret-document`).hide();
    $(`#win`).fadeIn();
    $(this).fadeOut();
    bgMusic.stop();
  });
}

// This stops the user from scrolling
function noScroll(){
  window.scrollTo(0,0);

}

/*
  This function gets rid of the redaction and reveals the redacted word/phrase
  while also keeping track of a counter to know when the user finishes to then
  get the steal button to fade in to allow the user to end the game.
*/
function redact(event){
  $(this).removeClass(`redacted`);
  $(this).addClass(`revealed`);
  counter++;
  if(counter == hiddenWords){
    $(`#stealButton`).fadeIn();
  }
}
