"use strict";

/**************************************************
Where's Sausage Dog Activity?
Paola Petitti

Following along Pippin's video for the first activity.
**************************************************/
const NUM_ANIMAL_IMG = 10;
const NUM_ANIMALS = 100;

let animalImages = [];
let animals = [];

// preload()
// Description of preload
function preload(){
  for (let i = 0; i < NUM_ANIMAL_IMG; i++){
    let animalImage = loadImage(`assets/images/animal${i}`);
    animalImages.push(animalImage);
  }
}

// setup()
// Description of setup() goes here.
function setup() {

}

// draw()
// Description of draw() goes here.
function draw() {

}
