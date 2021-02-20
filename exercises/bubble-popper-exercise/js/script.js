"use strict";

/**************************************************
5.4. Bubble Popper Exercise
Paola Petitti

Following Pippin's video for the activity.
**************************************************/

// Webcam of the user
let video = undefined;

// The Handpose model
let handpose = undefined;

// The Current set of predictions
let predictions = [];

// The Bubble
let bubble = undefined;

let pin = {
  tip: {
    x: undefined,
    y: undefined,
  },
  head: {
    x: undefined,
    y: undefined,
    size: 20,
  },
};

// The State of the game
let state = `load`;

// The point counter for the game
let points = 0;

// Pop sound
let popSound = undefined;

function preload() {
  popSound = loadSound(`assets/sounds/pop.wav`);
}

/*
Description of setup() goes here.
*/
function setup() {
  createCanvas(640, 480);

  // Accessing users webcam
  video = createCapture(VIDEO);
  video.hide();

  // Loading handpose model
  handpose = ml5.handpose(video, { flipHorizontal: true }, function () {
    console.log(`Model Loaded`);
    state = `run`;
  });

  // Listen for predictions
  handpose.on(`predict`, function (results) {
    predictions = results;
  });

  // Our bubble
  bubble = {
    x: random(width),
    y: height,
    size: 100,
    vx: 0,
    vy: -25,
  };
}

/*
Description of draw() goes here.
*/
function draw() {
  if (state === `load`) {
    loading();
  } else if (state === `run`) {
    running();
  }
}
/*
  This function gets the program to start, it updates the pin location & displays
  it, checks if the pin touches the bubbles, creates and shows the bubble
*/
function running() {
  background(0);

  if (predictions.length > 0) {
    updatePin(predictions[0]);

    let d = dist(pin.tip.x, pin.tip.y, bubble.x, bubble.y);
    if (d < bubble.size / 2) {
      popSound.play();
      points += 1;

      bubbleRestart();
    }
    displayPin();
  }

  // Movement of the bubble
  bubble.x += bubble.vx;
  bubble.y += bubble.vy;

  // Checking if out of bounds
  if (bubble.y < 0) {
    bubbleRestart();
  }

  // Displaying bubble
  push();
  fill(200, 0, 0);
  noStroke();
  ellipse(bubble.x, bubble.y, bubble.size);
  pop();

  // Displaying the points
  push();
  textSize(25);
  fill(255);
  text(points, 50, 50);
  pop();
}

/*
  This functions shows a little loading screen at the start while we wait
  for ML5 to start.
*/
function loading() {
  push();
  textSize(64);
  textAlign(CENTER, CENTER);
  text(`Loading...`, width / 2, height / 2);
  pop();
}

/*
  If you touch the bubble or it gets off screen, it restarts and goes back to
  the bottom.
*/
function bubbleRestart() {
  bubble.x = random(width);
  bubble.y = height;

  bubble.vy -= 5;
}

/*
  This function is constantly updating the location of the pin according to
  handpose
*/
function updatePin(prediction) {
  pin.tip.x = prediction.annotations.indexFinger[3][0];
  pin.tip.y = prediction.annotations.indexFinger[3][1];
  pin.head.x = prediction.annotations.indexFinger[0][0];
  pin.head.y = prediction.annotations.indexFinger[0][1];
}

/*
  This function shows the pin
*/
function displayPin() {
  //Drawing the line for the pin
  push();
  noFill();
  stroke(255, 255, 255);
  strokeWeight(2);
  line(pin.tip.x, pin.tip.y, pin.head.x, pin.head.y);
  pop();

  // Drawing the end of the pin
  push();
  noStroke();
  fill(255, 0, 0);
  ellipse(pin.head.x, pin.head.y, pin.head.size);
  pop();
}
