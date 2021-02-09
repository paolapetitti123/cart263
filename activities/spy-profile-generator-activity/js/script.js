"use strict";

/**************************************************
4.3. Activity: Spy Profile Generator
Paola Petitti

Following along Pippin's video for this activity.
**************************************************/

let spyProfile = {
  name: `REDACTED`,
  alias: `REDACTED`,
  secretWeapon: `REDACTED`,
  password: `REDACTED`
};

let instrumentData = undefined;
let objectData = undefined;
let tarotData = undefined;

/**
Description of preload()
*/
function preload(){
  tarotData = loadJSON(`https://raw.githubusercontent.com/dariusk/corpora/master/data/divination/tarot_interpretations.json`);
  instrumentData = loadJSON(`https://raw.githubusercontent.com/dariusk/corpora/master/data/music/instruments.json`);
  objectData = loadJSON(`https://raw.githubusercontent.com/dariusk/corpora/master/data/objects/objects.json`);
}


/**
Description of setup()
*/
function setup() {
  createCanvas(windowWidth,windowHeight);
  generateSpyProfile();
}

function generateSpyProfile(){
  // name prompt
  spyProfile.name = prompt(`What's your name?`);

  // random instrument/alias generator
  let instrument = random(instrumentData.instruments);
  spyProfile.alias = `The ${instrument}`;

  // random weapon generator
  spyProfile.secretWeapon = random(objectData.objects);


  // random password generator
  let card = random(tarotData.tarot_interpretations);
  spyProfile.password = random(card.keywords);
}

/**
Description of draw()
*/
function draw() {
  background(0);

  let profile = `** SPY PROFILE! TOP SECRET **

  NAME: ${spyProfile.name}
  ALIAS: ${spyProfile.alias}
  SECRET WEAPON: ${spyProfile.secretWeapon}
  PASSWORD: ${spyProfile.password}`;

  push();
  textFont(`Courier, monospace`);
  textSize(32);
  textAlign(LEFT,TOP);
  fill(0, 255, 0);
  text(profile, 100,100);
  pop();
}
