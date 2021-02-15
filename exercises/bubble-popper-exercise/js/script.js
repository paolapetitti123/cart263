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

/*
Description of setup() goes here.
*/
function setup() {
  createCanvas(640, 480);

  // Accessing users webcam
  video = createCapture(VIDEO);
  video.hide();

  // Loading handpose model
  handpose = ml5.handpose(video, { flipHorizontal: true }, function() {
    console.log(`Model Loaded`);
  });

  // Listen for predictions
  handpose.on(`predict`, function (results) {
    console.log(results);
    predictions = results;
  });

  // Our bubble
  bubble = {
    x: random(width),
    y: height,
    size: 100,
    vx: 0,
    vy: -2,
  };
}

/*
Description of draw() goes here.
*/
function draw() {
  background(0);

  if (predictions.length > 0) {
    // Getting the x & y coordinates of the tip and base of your index finger
    let hand = predictions[0];
    let index = hand.annotations.indexFinger;
    let tip = index[3];
    let base = index[0];
    let tipX = tip[0];
    let tipY = tip[1];
    let baseX = base[0];
    let baseY = base[1];

    //Drawing the line for the pin
    push();
    noFill();
    stroke(255, 255, 255);
    strokeWeight(2);
    line(baseX, baseY, tipX, tipY);
    pop();

    // Drawing the end of the pin
    push();
    noStroke();
    fill(255, 0, 0);
    ellipse(baseX, baseY, 20);
    pop();

    // check bubble popping
    let d = dist(tipX, tipY, bubble.x, bubble.y);
    if (d < bubble.size / 2) {
      bubble.x = random(width);
      bubble.y = height;
    }
  }

  // Movement of the bubble
  bubble.x += bubble.vx;
  bubble.y += bubble.vy;

  if (bubble.y < 0) {
    bubble.x = random(width);
    bubble.y = height;
  }

  push();
  fill(200, 0, 0);
  noStroke();
  ellipse(bubble.x, bubble.y, bubble.size);
  pop();
}
