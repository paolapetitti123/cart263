"use strict";

/**************************************************
Project 1: Flubber Game
Paola Petitti

For my project, I am going to create a little game based
on the Disney movie Flubber. The functionality will be somewhat
similar to the bubble popper activity as the goal of the game
will be to catch flubber using handpose.

The background images and glove are not mine, I got them off of shutterstock
however Philip (the scientist) & Weebo (the robot) were made by me

Playing / win basement:
https://www.shutterstock.com/image-vector/basement-boiler-washer-stairs-shelf-tools-1077590051

basement if you lose:
https://www.shutterstock.com/image-vector/interior-flooded-basement-boiler-washer-stairs-1078364501

baseball glove:
https://www.freepik.com/free-vector/bundle-baseball-icons_5984920.htm#page=1&query=baseball%20glove&position=0

Things to add:
- intro screen with instructions 
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
    size: 40,
  },
};

// State for the game
let state = `loading`;

// Background images
let basementClearImg = undefined;
let basementFloodImg = undefined;

// baseball glove to replace pin
let gloveImg = undefined;

/*
  Description of preload() goes here
*/
function preload() {
  basementClearImg = loadImage(`assets/images/basement_clear.jpg`);
  basementFloodImg = loadImage(`assets/images/basement_flood.jpg`);
  gloveImg = loadImage(`assets/images/baseball_glove.png`);
}

/*
  Initializing all the important things needed to make the program
  work here such as the video, the handpose model, the predictions and
  the Flubber object.
*/
function setup() {
  createCanvas(979,487);

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
  if(state === `loading`){
    loading();
  }
  else if(state === `running`){
    running();
  }
  else if(state === `win`){
    winEnding();
  }
}

function running(){
  background(0); // change this to the basement pic
  imageMode(CORNER);
  image(basementClearImg, 0,0);
  displayFlubber();

  if(predictions.length > 0){
    updatePin(predictions[0]);

    let distance = dist(pin.tip.x, pin.tip.y, flubber.x, flubber.y);
    if(distance < flubber.size / 2){
      state = `win`;
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
  //fill(255, 0, 0);
  imageMode(CENTER);
  image(gloveImg, pin.tip.x, pin.tip.y, pin.tip.size, pin.tip.size);
  //ellipse(pin.tip.x, pin.tip.y, pin.tip.size);
  pop();
}

function loading() {
  push();
  imageMode(CORNER);
  image(basementClearImg, 0,0);
  textSize(64);
  textAlign(CENTER, CENTER);
  text(`Loading...`, width / 2, height / 2);
  pop();
}

function winEnding(){
  push();
  textSize(64);
  textAlign(CENTER, CENTER);
  text(`You win!`, width / 2, height / 2);
  pop();
}
