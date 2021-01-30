"use strict";

/**************************************************
Annyang
Paola Petitti

Following the annyang video
**************************************************/
// The program's face
let face = `:-|`;

function setup() {
  createCanvas(500, 500);
  // Check if annyang is available
  if (annyang) {
    // Create commands
    let commands = {
      // They love me!
      'I love you': love,
      // They hate me!
      'I hate you': hate
    }
    // Add the commands and start annyang
    annyang.addCommands(commands);
    annyang.start();
  }
}

function draw() {
  background(0);

  // Draw the current face emoji in the center of the canvas
  // rotated to display more like a regular face
  push();
  translate(width / 2, height / 2);
  rotate(PI / 2);
  textSize(400);
  textAlign(CENTER, CENTER);
  fill(255);
  text(face, 0, 0);
  pop();
}

function love() {
  face = `:-)`;
}

function hate() {
  face = `:-(`;
}
