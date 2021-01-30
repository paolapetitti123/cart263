"use strict";

/**************************************************
Responsive Voice
Paola Petitti

Following along with the ResponsiveVoice video.
**************************************************/
let phrase = `Hello, world!`
let saying = ``;

// setup()
//
// Description of setup() goes here.
function setup() {
  createCanvas(windowWidth,windowHeight);
}

// draw()
//
// Description of draw() goes here.
function draw() {
  background(255);

  push();
  textSize(32);
  textAlign(CENTER);
  text(saying, width / 2, height / 2);
  pop();
}

function mousePressed() {
  responsiveVoice.speak(phrase, "UK English Male", {
    onstart: showSpeaking,
    onend: hideSpeaking
  });
}

function showSpeaking(){
  saying = phrase;
}

function hideSpeaking(){
  saying = ``;
}
