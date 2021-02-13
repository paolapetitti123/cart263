"use strict";

/**************************************************
4.3. Exercise: Spy Profile Generator
Paola Petitti
**************************************************/
let alarmSound = undefined;

let spyProfile = {
  name: undefined,
  alias: undefined,
  secretWeapon: undefined,
  password: undefined,
};

let instrumentData = undefined;
let objectData = undefined;
let tarotData = undefined;

let state = undefined;
/**
Description of preload()
*/
function preload() {
  tarotData = loadJSON(
    `https://raw.githubusercontent.com/dariusk/corpora/master/data/divination/tarot_interpretations.json`
  );
  instrumentData = loadJSON(
    `https://raw.githubusercontent.com/dariusk/corpora/master/data/music/instruments.json`
  );
  objectData = loadJSON(
    `https://raw.githubusercontent.com/dariusk/corpora/master/data/objects/objects.json`
  );

  alarmSound = loadSound(`assets/sounds/alarm.wav`);
}

/**
Description of setup()
*/
function setup() {
  createCanvas(windowWidth, windowHeight);

  let data = JSON.parse(localStorage.getItem(`spy-profile-data`));
  if (data !== null) {
    let password = prompt(`ENTER PASSWORD`);

    if (password === data.password) {
      spyProfile.name = data.name;
      spyProfile.alias = data.alias;
      spyProfile.secretWeapon = data.secretWeapon;
      spyProfile.password = data.password;
      state = `profileActive`;
    } else {
      state = `profileNotFound`;
    }
  } else {
    state = `profileActive`;
    generateSpyProfile();
  }
}

function generateSpyProfile() {
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

  // Saving profile to local storage
  localStorage.setItem(`spy-profile-data`, JSON.stringify(spyProfile));
}

/**
Description of draw()
*/
function draw() {
  background(0);

  if (state === `profileActive`) {
    activeProfile();
  } else if (state === `profileDeactivated`) {
    deactivatedProfile();
  } else if (state === `profileNotFound`) {
    profileNotFound();
  }
}

function activeProfile() {
  let profile = `** SPY PROFILE! TOP SECRET **

  NAME: ${spyProfile.name}
  ALIAS: ${spyProfile.alias}
  SECRET WEAPON: ${spyProfile.secretWeapon}
  PASSWORD: ${spyProfile.password}

  Press 'c' to delete profile
  Press 'Enter' to regenerate profile
  `;

  push();
  textFont(`Courier, monospace`);
  textSize(32);
  textAlign(LEFT, TOP);
  fill(0, 255, 0);
  text(profile, 100, 100);
  pop();
}

function deactivatedProfile() {
  let profileDeleted = `** SPY PROFILE! TOP SECRET **

  NAME: ${spyProfile.name}
  ALIAS: ${spyProfile.alias}
  SECRET WEAPON: ${spyProfile.secretWeapon}
  PASSWORD: ${spyProfile.password}

  PROFILE DELETED PLEASE REFRESH PAGE
  `;

  push();
  textFont(`Courier, monospace`);
  textSize(32);
  textAlign(LEFT, TOP);
  fill(0, 255, 0);
  text(profileDeleted, 100, 100);
  pop();
}

function profileNotFound() {
  let notFound = `** INTRUDER! INTRUDER! **

  ** PROFILE HAS BEEN DELETED **

  ** PLEASE REFRESH PAGE **
  `;

  localStorage.removeItem(`spy-profile-data`);
  push();
  textFont(`Courier, monospace`);
  textSize(32);
  textAlign(LEFT, TOP);
  fill(0, 255, 0);
  text(notFound, 100, 100);
  pop();
}

function keyPressed() {
  if (key === "c" && state == `profileActive`) {
    localStorage.removeItem(`spy-profile-data`);
    state = `profileDeactivated`;
  }
  if (keyCode === ENTER && state === `profileActive`) {
    localStorage.removeItem(`spy-profile-data`);
    regenerateSpyProfile();
  }
  if (state === `profileNotFound`) {
    if (!alarmSound.isPlaying()) {
      alarmSound.play();
    }
  }
}

function mousePressed() {
  if (state === `profileNotFound`) {
    if (!alarmSound.isPlaying()) {
      alarmSound.play();
    }
  }
}

function regenerateSpyProfile() {
  // random instrument/alias generator
  let instrument = random(instrumentData.instruments);
  spyProfile.alias = `The ${instrument}`;

  // random weapon generator
  spyProfile.secretWeapon = random(objectData.objects);

  // random password generator
  let card = random(tarotData.tarot_interpretations);
  spyProfile.password = random(card.keywords);

  // Saving profile to local storage
  localStorage.setItem(`spy-profile-data`, JSON.stringify(spyProfile));
}
