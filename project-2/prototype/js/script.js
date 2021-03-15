"use strict";

/**************************************************
Hidden Object Game Prototype (Project 2)
Paola Petitti

This is a prototype for my final project. This prototype will contain a start screen
where it's actually a html page with jQuery that provides a backstory for the game,
once you get through the backstory you'll be able to play the game. For this prototype
there won't be many objects to find, I'm merely going to get the functionality working.
**************************************************/
let counter = 0;
let titleTxt = `TREASURE`;
let speed = 500;

let story = document.getElementById('story');
let typewriter = new TypeWriter(story, {
  loop:true
});

typewriter.typeString('Hello World!')
    .pauseFor(2500)
    .deleteAll()
    .typeString('Strings can be removed')
    .pauseFor(2500)
    .deleteChars(7)
    .typeString('<strong>altered!</strong>')
    .pauseFor(2500)
    .start();

function typeWriter(){
  if(counter < titleTxt.length){
    document.getElementById("title").innerHTML += titleTxt.charAt(counter);
    counter++;
    setTimeout(typeWriter, speed);
  }
}

// setup()
//
// Description of setup() goes here.
function setup() {
  typeWriter();
$(`#musicPlayer`).hide();
}

// draw()
//
// Description of draw() goes here.
function draw() {

}
