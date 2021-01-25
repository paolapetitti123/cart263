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


let sausageDogImg = undefined;
let sausageDog = undefined;
let sausageDogBark = undefined;

let state = `start`;
let timer = 30;

// preload()
// Description of preload
function preload(){
  for (let i = 0; i < NUM_ANIMAL_IMG; i++){
    let animalImage = loadImage(`assets/images/animal${i}.png`);
    animalImages.push(animalImage);
  }

  sausageDogImg = loadImage(`assets/images/sausage-dog.png`);
  sausageDogBark = loadSound(`assets/sounds/bark.wav`);
}

// setup()
// Description of setup() goes here.
function setup() {
  createCanvas(windowWidth,windowHeight);
  createDog();
  createAnimals();
}

// draw()
// Description of draw() goes here.
function draw() {
  background(255,50,150);

  if(state === `start`){
    intro();
  }
  else if(state === `game`){
    game();
  }
  else if(state === `win`){
    winEnding();
  }
  else if(state === `lose`){
    loseEnding();
  }
}

function game(){
  for(let i = 0; i < animals.length; i++){
    animals[i].update();
  }
  sausageDog.update();
  textAlign(CENTER);
  textSize(25);
  text(timer, 50,50);

  if(frameCount % 60 == 0 && timer > 0 && sausageDog.found == false){
    timer--;
  }
  setTimeout(function(){
    state = `lose`;
  }, 30000);
}


function mousePressed(){
  sausageDog.mousePressed();


  if(sausageDog.found && state === `game`){
    sausageDogBark.play();
    setTimeout(function(){
      state = `win`;
    }, 5000);
  }
}

// Creating the animals
function createAnimals(){
  for(let i = 0; i < NUM_ANIMALS; i++){
    let x = random(0,width);
    let y = random(0, height);
    let animalImg = random(animalImages);
    let animal = new Animal(x, y, animalImg);
    animals.push(animal);
  }
}

function createDog(){
  let x = random(0, width);
  let y = random(0, height);
  sausageDog = new SausageDog(x, y, sausageDogImg);
}

function keyPressed(){
  if (state === `start` && keyCode === ENTER){
    state = `game`;
  }
}

function intro(){
  textSize(50);
  textAlign(CENTER);
  textFont(`monospace`);
  fill(0);
  text(`Press Enter to Play`,width / 2, height / 2);
}

function winEnding(){
  textSize(50);
  textAlign(CENTER);
  textFont(`monospace`);
  fill(0);
  text(`You Win!`,width / 2, height / 2);
}

function loseEnding(){
  textSize(50);
  textAlign(CENTER);
  textFont(`monospace`);
  fill(0);
  text(`You Lose!`,width / 2, height / 2);
}
