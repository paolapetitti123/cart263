"use strict";

/**************************************************
Project 1: Flubber Game
Paola Petitti

For my project, I am going to create a little game based
on the Disney movie Flubber. The functionality will be somewhat
similar to the bubble popper activity as the goal of the game
will be to catch flubber using handpose.

The background images are not mine, I got them off of shutterstock
however Philip (the scientist) & Weebo (the robot) were made by me

Playing / win basement:
https://www.shutterstock.com/image-vector/basement-boiler-washer-stairs-shelf-tools-1077590051

basement if you lose:
https://www.shutterstock.com/image-vector/interior-flooded-basement-boiler-washer-stairs-1078364501

Things to add:
- a timer (if time runs out you lose)
- web storage to keep track of your best time
- fix the visuals once everything else is working

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
    size: 25,
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

  handpose.on(`predict`,function (results){
    predictions = results;
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


/*
  Description of draw() goes here
*/
function draw() {
  running();
}

function running(){
  background(0); // change this to the basement pic
  displayFlubber();

  if(predictions.length > 0){
    updatePin(predictions[0]);

    let distance = dist(pin.tip.x, pin.tip.y, flubber.x, flubber.y);
    if(distance < flubber.size / 2){
      state = `win`;
      winEnding(); // move this to draw once you incorporate the states properly
      // win
    }
    displayPin();
  }

  flubber.x += flubber.vx;
  flubber.y += flubber.vy;

  if(flubber.x > width || flubber.x < 0){
    flubber.vx = -flubber.vx;
  }

  if(flubber.y > height || flubber.y < 0){
    flubber.vy = -flubber.vy;
  }

}

function updatePin(prediction){
  pin.tip.x = prediction.annotations.indexFinger[3][0];
  pin.tip.y = prediction.annotations.indexFinger[3][1];
}

function displayFlubber(){
  push();
  fill(0,255,26);
  noStroke();
  ellipse(flubber.x,flubber.y,flubber.size);
  pop();
}

function displayPin(){
  push();
  noStroke();
  fill(255, 0, 0);
  ellipse(pin.tip.x, pin.tip.y, pin.tip.size);
  pop();
}


function winEnding(){
  push();
  textSize(64);
  textAlign(CENTER, CENTER);
  text(`You win!`, width / 2, height / 2);
  pop();
}
