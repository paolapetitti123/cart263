"use strict";

/**************************************************
5.4. Bubble Popper Activity
Paola Petitti

Following Pippin's video for the activity.
**************************************************/

// Webcam of the user
let video = undefined;

// The Handpose model
let handpose = undefined;

// The Current set of predictions
let predictions = [];

/*
Description of setup() goes here.
*/
function setup() {
  createCanvas(640,480);

  // Accessing users webcam
  video = createCanvas(VIDEO);
  video.hide();

  // Loading handpose model
  handpose = ml5.handpose(video,
    {flipHorizontal: true},
    function(){
    console.log(`Model Loaded`);
  });

  // Listen for predictions
  handpose.on(`predict`, function (results) {
    console.log(results);
    predictions = results;
  });
}

/*
Description of draw() goes here.
*/
function draw() {
  background(0);

  if(predictions.length > 0){
    let hand = predictions[0];
    let index = hand.annotations.indexFinger;
    let tip = index[3];
    let base = index[0];
    let tipX = tip[0];
    let tipY = tip[1];
    let baseX = base[0];
    let baseY = base[1];

    push();
    noFill();
    stroke(255,255,255);
    strokeWeight(2);
    line(baseX,baseY,tipX,tipY);
    pop();
  }
}
