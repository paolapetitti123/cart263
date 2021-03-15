"use strict";
// import Typewriter from 'typewriter-effect/dist/core';
/**************************************************
Hidden Object Game Prototype (Project 2)
Paola Petitti

This is a prototype for my final project. This prototype will contain a start screen
where it's actually a html page with jQuery that provides a backstory for the game,
once you get through the backstory you'll be able to play the game. For this prototype
there won't be many objects to find, I'm merely going to get the functionality working.
**************************************************/
let counter = 0;
let titleTxt = `TREASURE`;
let speed = 500;
let i = 0;
let j = 0;

const textDisplay = document.getElementById('title');
const phrases = [
  'People want it',
  'People dream about it',
  'It can be different to every individual',
  'It can complete us',
  'Or it can destroy us',
  'And it can change the world',
  `People call it 'treasure'`,
  `The sound of wind blowing from the horizon`,
  `The warmth of the sun hitting the ocean waves`,
  `The vibration of sand beating like the hearts of youth`,
  `We're at the starting point of this long journey`,
  `The freezing winds may make us shiver`,
  `The heat of the sun may make us thirsty`,
  `The vibrations of the sand may swallow us`,
  `But we'll never stop`,
  `Gold, eternal life, honor, love, fame`,
  `It doesn't matter what you dream for`,
  `So let me ask you`,
  `What is your treasure?`,
  `Will you join us?`];


$(document).ready(function(){
  $(`#story`).typewrite({
    actions: [
      {delay: 11500},
      {type: 'People want it'},
      {type: '<br>'},
      {delay: 2000},
      {type: 'People dream about it'},
      {speed: 25},
      {select: {from: 0, to: 38}},
      {remove: {num: 38, type: 'whole'}}
    ]
  });
});


// setup()
//
// Description of setup() goes here.
function setup() {
  $(`#musicPlayer`).hide();
}

// draw()
//
// Description of draw() goes here.
function draw() {

}
