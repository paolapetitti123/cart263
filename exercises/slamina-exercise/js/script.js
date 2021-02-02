"use strict";

/**************************************************
Slamina Exercise
Paola Petitti

Adding onto the Slamina activity.
**************************************************/
// Animal Names List/Array
const animals = [
      "aardvark",
      "alligator",
      "alpaca",
      "antelope",
      "ape",
      "armadillo",
      "baboon",
      "badger",
      "bat",
      "bear",
      "beaver",
      "bison",
      "boar",
      "buffalo",
      "bull",
      "camel",
      "canary",
      "capybara",
      "cat",
      "chameleon",
      "cheetah",
      "chimpanzee",
      "chinchilla",
      "chipmunk",
      "cougar",
      "cow",
      "coyote",
      "crocodile",
      "crow",
      "deer",
      "dingo",
      "dog",
      "donkey",
      "dromedary",
      "elephant",
      "elk",
      "ewe",
      "ferret",
      "finch",
      "fish",
      "fox",
      "frog",
      "gazelle",
      "gila monster",
      "giraffe",
      "gnu",
      "goat",
      "gopher",
      "gorilla",
      "grizzly bear",
      "ground hog",
      "guinea pig",
      "hamster",
      "hedgehog",
      "hippopotamus",
      "hog",
      "horse",
      "hyena",
      "ibex",
      "iguana",
      "impala",
      "jackal",
      "jaguar",
      "kangaroo",
      "koala",
      "lamb",
      "lemur",
      "leopard",
      "lion",
      "lizard",
      "llama",
      "lynx",
      "mandrill",
      "marmoset",
      "mink",
      "mole",
      "mongoose",
      "monkey",
      "moose",
      "mountain goat",
      "mouse",
      "mule",
      "muskrat",
      "mustang",
      "mynah bird",
      "newt",
      "ocelot",
      "opossum",
      "orangutan",
      "oryx",
      "otter",
      "ox",
      "panda",
      "panther",
      "parakeet",
      "parrot",
      "pig",
      "platypus",
      "polar bear",
      "porcupine",
      "porpoise",
      "prairie dog",
      "puma",
      "rabbit",
      "raccoon",
      "ram",
      "rat",
      "reindeer",
      "reptile",
      "rhinoceros",
      "salamander",
      "seal",
      "sheep",
      "shrew",
      "silver fox",
      "skunk",
      "sloth",
      "snake",
      "squirrel",
      "tapir",
      "tiger",
      "toad",
      "turtle",
      "walrus",
      "warthog",
      "weasel",
      "whale",
      "wildcat",
      "wolf",
      "wolverine",
      "wombat",
      "woodchuck",
      "yak",
      "zebra"
    ];
let currentAnimal = ``;
let currentAnswer = ``;

let gameState = `start`;

let introInstructions = `You have 30 seconds to name as many animals as you can.
Press Enter to start!`;

let gamePoints = 0;
let timer = 30;


// setup()
//
// Description of setup() goes here.
function setup() {
  createCanvas(windowWidth,windowHeight);
  if (annyang){
    let commands = {
      '*animal': guessAnimal
    };
    annyang.addCommands(commands);
    annyang.start();

    textSize(32);
    textStyle(BOLD);
    textAlign(CENTER, CENTER);
  }
}

// draw()
//
// Description of draw() goes here.
function draw() {
  background(255,100,100);

  if(gameState === `start`){
    startScreen();
  }
  else if(gameState === `game`){
    gameScreen();
  }
  else if(gameState === `end`){
    endScreen();
  }
}


function rpvAnimal(){
  currentAnimal = random(animals);

  let reverseAnimal = reverseString(currentAnimal);

  responsiveVoice.speak(reverseAnimal);
}

function guessAnimal(animal){
  currentAnswer = animal.toLowerCase();
}

function keyPressed(){
  if(gameState === `start` && keyCode === ENTER){
    gameState = `game`;
    rpvAnimal();
  }
  if(gameState === `end` && keyCode === ENTER){
    gameState = `game`;
    timer = 30;
    rpvAnimal();
  }
}


function reverseString(string) {
  // Split the string into an array of characters
  let characters = string.split('');
  // Reverse the array of characters
  let reverseCharacters = characters.reverse();
  // Join the array of characters back into a string
  let result = reverseCharacters.join('');
  // Return the result
  return result;
}

function startScreen(){
  fill(0);
  text(introInstructions, width/2,height/2);
}

function gameScreen(){
  gameTimer();
  console.log(currentAnimal);

  if(currentAnswer === currentAnimal){
    fill(0,255,0);
    gamePoints += 1;
    console.log(gamePoints);
    rpvAnimal();
  }
  else {
    fill(255,0,0);
  }
  text(currentAnswer, width/2,height/2);

}

function endScreen(){
  let endMessage = `You got ${gamePoints} right!
  Good job!
  Press Enter to try again!`;
  fill(0);
  text(endMessage, width/2,height/2);
}


function gameTimer(){
  textAlign(CENTER);
  textSize(25);
  text(timer, 50,50);
  if(frameCount % 60 == 0 && timer > 0){
    timer--;
  }

  setTimeout(function(){
    gameState = `end`;
  }, 30000);
}
