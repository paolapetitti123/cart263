"use strict";

/**************************************************
4.2. Web Storage API
Paola Petitti

Following along Web storage api video
**************************************************/
let userData = {
  name: `stranger`
};

// setup()
//
// Description of setup() goes here.
function setup() {
  createCanvas(windowWidth,windowHeight);

  let data = JSON.parse(localStorage.getItem(`web-storage-example`));

  if(data !== null){
    userData.name = data.name;
  }
  else {
    userData.name = prompt(`What's your name?`);
    localStorage.setItem(`web-storage-example`, JSON.stringify(userData));
  }
}

// draw()
//
// Description of draw() goes here.
function draw() {
  background(255);

  push();
  textSize(64);
  textAlign(CENTER,CENTER);
  textStyle(BOLD);
  fill(0);
  text(`hey, ${userData.name}!`,width/2,height/2);
  pop();


}
