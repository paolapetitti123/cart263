"use strict";

/**************************************************
Slamina Exercise
Paola Petitti

Adding onto the Slamina activity.
**************************************************/
// Animal Names List/Array Variables
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

// Game State variables
let gameState = `start`;
let introInstructions = `
You have 30 seconds to name as many animals as you can.
Press Enter to start!`;
let gamePoints = 0;
let timer = 30;


// setup()
//
// Canvas gets created, annyang gets initialized so that the user can guess
// the animal names and then the text size, style and alignment are initialized
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
// Adds a pink background, and adds different states for the game
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
  console.log(gameState);
}

// rpvAnimal()
//
// rpvAnimal means responsiveVoice Animal, this gets RPV to say an animal name
// in reverse whenever it is called
function rpvAnimal(){
  currentAnimal = random(animals);

  let reverseAnimal = reverseString(currentAnimal);

  responsiveVoice.speak(reverseAnimal);
}

// guessAnimal()
//
// this turns the users answer into all lowercase to match the animal list array
function guessAnimal(animal){
  currentAnswer = animal.toLowerCase();
}


// keyPressed()
//
// This function changes the state from start to game and also from end to start
// if the user wants to play again. It also restarts the timer if you want to replay.
function keyPressed(){
  if(gameState === `start` && keyCode === ENTER){
    gameState = `game`;
    rpvAnimal();
  }
  if(gameState === `end` && keyCode === ENTER){
    console.log("IM HERE");
    gameState = `game`;
    timer = 30;
    gamePoints = 0;
    rpvAnimal();
  }
}

// reverseString()
//
// This function reverses the animal names by splitting the word up by letter
// and rewritting them backwards so the RPV can read it backwards.
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

// startScreen()
//
// This function provides the start game message to let users know how to start
// and how long they have
function startScreen(){
  fill(0);
  text(introInstructions, width/2,height/2);
}

// gameTimer()
//
// This function adds a timer to the game that lasts 30 seconds and makes the
// game end once the 30 seconds are up.
function gameTimer(){
  textAlign(CENTER);
  textSize(25);
  text(timer, 50,50);
  if(frameCount % 60 == 0 && timer > 0){
    timer--;
  }
  if(timer == 0){
    gameState = `end`;
  }
}

// gameScreen()
//
// This starts the timer, and checks to see if the user is getting the right
// answer or not, once they get the right answer then they get a point and
// the next animal name gets said.
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

// endScreen()
//
// This function gives the user the end screen with the number of points they
// accumulated throughout the game and tells the user they can play again.
function endScreen(){
  let endMessage = `You got ${gamePoints} right!
  Good job!
  Press Enter to try again!`;
  fill(0);
  text(endMessage, width/2,height/2);
}
