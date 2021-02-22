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
- web storage to keep track of your time
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
let state = `intro`;

// Background images
let basementClearImg = undefined;
let basementFloodImg = undefined;

// baseball glove to replace pin
let gloveImg = undefined;

// Philip
let philipImg = undefined;
let philipSadImg = undefined;

// timer
let timer = 10;
let oldTime = undefined;
let timeSave = {
  time: undefined
};

// intro text
let instructions =
`Please help me catch flubber!
Use your hand to catch it before it escapes!`;

/*
  All the pictures used in the game get initialized here.
*/
function preload() {
  basementClearImg = loadImage(`assets/images/basement_clear.jpg`);
  basementFloodImg = loadImage(`assets/images/basement_flood.jpg`);
  gloveImg = loadImage(`assets/images/baseball_glove.png`);
  philipImg = loadImage(`assets/images/philip.png`);
  philipSadImg = loadImage(`assets/images/philipSad.png`);
}

/*
  Initializing all the important things needed to make the program
  work here such as the video, the handpose model, the predictions and
  the Flubber object, as well as webstorage to save your time for the next time
  you play.
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

  let data = JSON.parse(localStorage.getItem(`flubber-timer-score`));
  if(data !== null){
    oldTime = data.time;
  }
  else {
    oldTime = 0;
  }

}


/*
  The draw function allows for the different states to take place throughout
  the program.
*/
function draw() {
  if (state === `intro`){
    introScreen();
  }
  else if(state === `running`){
    running();
  }
  else if(state === `win`){
    winEnding();
  }
  else if(state === `lose`){
    loseEnding();
  }
}

/*
  This function allows for the game to start running by starting the game timer,
  getting handpose to work with the predictions, gets flubber to bounce around and
  checks to see if you 'catch' flubber.
*/
function running(){
  defaultBackground();
  gameTimer();
  displayFlubber();

  /*
    If handpose detects there is a hand, this calculates the distance between
    the tip of a finger and flubber as well as displaying the baseball glove pin
  */
  if(predictions.length > 0){
    updatePin(predictions[0]);

    let distance = dist(pin.tip.x, pin.tip.y, flubber.x, flubber.y);
    if(distance < flubber.size / 2){
      let caughtTime = 15 - timer;
      timeSave.time = `${caughtTime}`;
      localStorage.setItem(`flubber-timer-score`, JSON.stringify(timeSave));
      state = `win`;
    }
    displayGlove();
  }

  flubberMovement();
}

/*
  This function allows for the flubber ball to move and bounce off the borders
  of the canvas
*/
function flubberMovement(){
  flubber.x += flubber.vx;
  flubber.y += flubber.vy;

  if(flubber.x > width || flubber.x < 0){
    flubber.vx = -flubber.vx;
  }

  if(flubber.y > height || flubber.y < 0){
    flubber.vy = -flubber.vy;
  }
}


/*
  This function takes the prediction from handpose and grabs the indexFinger
  point to assign it to the correct pin object, and it does this throughout
  the entire program.
*/
function updatePin(prediction){
  pin.tip.x = prediction.annotations.indexFinger[3][0];
  pin.tip.y = prediction.annotations.indexFinger[3][1];
}

/*
  This function just displays a green circle to represent flubber
*/
function displayFlubber(){
  push();
  fill(0,255,26);
  noStroke();
  ellipse(flubber.x,flubber.y,flubber.size);
  pop();
}

/*
  This function displays the baseball glove that you can move with the tip of
  your index finger to catch flubber.
*/
function displayGlove(){
  push();
  noStroke();
  imageMode(CENTER);
  image(gloveImg, pin.tip.x, pin.tip.y, pin.tip.size, pin.tip.size);
  pop();
}

/*
  This function adds a timer to the game that runs for 15 seconds while showing
  the countdown in the top left hand corner of the canvas, once the timer hits 0
  it ends the game and changes the state to lose.
*/
function gameTimer(){
  textAlign(CENTER);
  textSize(25);
  text(timer, 50,50);
  if(frameCount % 60 == 0 && timer > 0){
    timer--;
  }
  if(timer == 0){
    state = `lose`;
  }
}

/*
  Since many of my states & functions needed the same background with Philip in
  the same location, I made this function to reduce rewriting it multiple times
*/
function defaultBackground(){
  push();
  imageMode(CORNER);
  image(basementClearImg, 0,0);
  pop();

  push();
  imageMode(CENTER);
  image(philipImg,100, height - 175, 125/1.5,500/1.5);
  pop();
}

/*
  This functions call the defaultBackground function and shows the instructions
  for the game while handpose/ml5js is loading.
*/
function introScreen(){
  defaultBackground();

  push();
  textSize(32);
  fill(0);
  textAlign(CENTER,CENTER)
  text(instructions, width/2, height/2);
  pop();

}

/*
  This function first creates the 3 different messages you can get if you win,
  the default one just showing the time it took to catch flubber, now if you
  play a second time & catch flubber, the function checks if your last time was
  better or worse (through webstorage) and tells you the difference
*/
function winEnding(){

  // Different messages for whether your last time playing was faster or slower
  let betterTime = `
  You caught flubber in ${timeSave.time} seconds!
  That was ${oldTime - timeSave.time} seconds faster than the last time!`;
  let slowerTime = `
  You caught flubber in ${timeSave.time} seconds!
  That was ${timeSave.time - oldTime} seconds slower than the last time!`;
  let defaultTime = `
  You caught flubber in ${timeSave.time} seconds!
  Try again to beat your current time!`;
  push();
  textSize(32);
  textAlign(CENTER, CENTER);
  if(oldTime !== 0){
    if(oldTime > timeSave.time){
      text(betterTime, width / 2, height / 2);
    }
    else if(oldTime < timeSave.time){
      text(slowerTime,width/2, height/2);
    }
  }
  else {
    text(defaultTime,width/2, height/2);
  }
  pop();


}

/*
  The first thing the function does if you lose is delete the flubber-time-score
  webstorage item, since you did not catch flubber, it wouldn't make sense to
  save the time it took for you to lose flubber. Then it just moves philip to the
  stairs to avoid being in water and tells you that flubber got away.
*/
function loseEnding(){
  localStorage.removeItem(`flubber-timer-score`);
  push();
  imageMode(CORNER);
  image(basementFloodImg, 0,0);
  pop();

  push();
  imageMode(CENTER);
  image(philipSadImg,300, height - 315, 125/2,500/2);
  pop();

  push();
  textSize(64);
  textAlign(CENTER, CENTER);
  text(`Flubber got away!`, width / 2, height / 2);
  pop();
}
