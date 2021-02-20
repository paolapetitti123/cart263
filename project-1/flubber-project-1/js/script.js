"use strict";

/**************************************************
Project 1: Flubber Game
Paola Petitti

For my project, I am going to create a little game based
on the Disney movie Flubber. The functionality will be somewhat
similar to the bubble popper activity as the goal of the game
will be to catch flubber using handpose.
**************************************************/
// Webcam of the user
let video = undefined;

// The Handpose model
let handpose = undefined;

// The Current set of predictions
let predictions = [];

// Flubber
let flubber = undefined;

// Pin for index finger
let pin = {
  tip: {
    x: undefined,
    y: undefined,
  },
  head: {
    x: undefined,
    y: undefined,
    size: 10,
  },
};

// State for the game
let state = `loading`;





/*
  Description of preload() goes here
*/
function preload() {

}

/*
  Initializing all the important things needed to make the program
  work here such as the video, the handpose model, the predictions and
  the Flubber object.
*/
function setup() {
  createCanvas(1280,720);

  // Getting Acess to the users webcam
  video = createCapture(VIDEO);
  video.hide();

  // Loading handpose
  handpose = ml5.handpose(video, {flipHorizontal: true}, function () {
    console.log(`Model Loaded`);
    state = `running`;
  });

  // Flubber object
  flubber = {
    x: random(width),
    y: random(height),
    size: 35,
    vx: 15,
    vy: 15,
  };
}

function running(){
  background(0);
  displayFlubber();

  flubber.x += flubber.vx;
  flubber.y += flubber.vy;

  if(flubber.x > width || flubber.x < 0){
    flubber.vx = -flubber.vx;
  }

  if(flubber.y > height || flubber.y < 0){
    flubber.vy = -flubber.vy;
  }

}

function displayFlubber(){
  push();
  fill(0,255,26);
  noStroke();
  ellipse(flubber.x,flubber.y,flubber.size);
  pop();
}

/*
  Description of draw() goes here
*/
function draw() {
  running();
}
