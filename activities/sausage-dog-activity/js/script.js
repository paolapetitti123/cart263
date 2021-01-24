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
  createCanvas(windowWidth,windowHeight);

  // Creating the animals
  for(let i = 0; i < NUM_ANIMALS; i++){
    let x = random(0,width);
    let y = random(0, height);
    let animalImg = random(animalImages);
    let animal = new Animal(x, y, animalImg);
    animals.push(animal);
  }
}

// draw()
// Description of draw() goes here.
function draw() {
  background(255,255,0);

  for(let i = 0; i < animals.length; i++){
    animals[i].update();
  }
}
