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

}
