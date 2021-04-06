"use strict";
/**************************************************
Hidden Object Game Prototype (Project 2)
Paola Petitti

This is the link to the typewriter library I found:
https://github.com/mrvautin/typewrite

Link to the audio for the intro:
https://www.youtube.com/watch?v=eXubmzAgA10&ab_channel=KQENTERTAINMENT

This is a prototype for my final project. This prototype will contain a start screen
where it's actually a html page with jQuery that provides a backstory for the game,
once you get through the backstory you'll be able to play the game. For this prototype
there won't be many objects to find, I'm merely going to get the functionality working.

todo:
in terms of visuals for the intro:
- make it look like a terminal
**************************************************/
let config = {
  type: Phaser.AUTO,
  width: 1280,
  height: 720,
  physics: {
    default: `arcade`
  },
  scene: [Boot,Play]
};
// let game = new Phaser.Game(config);



// let bgImg = undefined;
// let bgMusic = undefined;
//
//
// function preload(){
//   bgImg = loadImage(`assets/images/pirateship-01.png`);
//   bgMusic = loadSound(`assets/sounds/Im_The_One.mp3`);
// }

// setup()
//
// Description of setup() goes here.
function setup() {
  // createCanvas(0,0);
  $(`#gameButtonContainer`).hide();
  $(`#skip`).hide();
  $("#playerButton").on(`click`, function (event) {
    let audio = new Audio(`assets/sounds/Intro_Long_Journey.mp3`);
    audio.play();
    $(this).hide();
    $(`#musicPlayer`).hide();
    $(`#story`).typewrite({
      cursor: "_",
      actions: [
        { delay: 11500 },
        { type: "People want it" },
        { type: "<br>" },
        { delay: 2000 },
        { type: "People dream about it" },
        { speed: 20 },
        { select: { from: 0, to: 38 } },
        { remove: { num: 38, type: "whole" } },
        { speed: 20 },
        { type: "It can be different to every individual" },
        { speed: 10 },
        { select: { from: 0, to: 39 } },
        { remove: { num: 39, type: "whole" } },
        { speed: 20 },
        { type: "It can complete us" },
        { delay: 1700 },
        { type: "<br>" },
        { type: "Or it can destroy us" },
        { delay: 1700 },
        { type: "<br>" },
        { type: "And it can change the world" },
        { speed: 35 },
        { select: { from: 0, to: 73 } },
        { remove: { num: 73, type: "whole" } },
        { speed: 15 },
        { type: "People call it" },
        { delay: 1700 },
        { remove: { num: 14, type: "stepped" } },
        { type: "TREASURE" },
        { delay: 8500 },
        { remove: { num: 8, type: "stepped" } },
        { speed: 20 },
        { type: `The sound of wind blowing from the horizon` },
        { type: "<br>" },
        { delay: 1500 },
        { type: `The warmth of the sun hitting the ocean waves` },
        { type: "<br>" },
        { delay: 1500 },
        { type: `The vibration of sand beating like the hearts of youth` },
        { delay: 1400 },
        { type: "<br>" },
        { type: `We're at the starting point of this long journey` },
        { speed: 185 },
        { select: { from: 0, to: 201 } },
        { speed: 20 },
        { remove: { num: 201, type: "whole" } },
        { type: `The freezing winds may make us shiver` },
        { type: "<br>" },
        { delay: 400 },
        { type: `The heat of the sun may make us thirsty` },
        { type: "<br>" },
        { delay: 400 },
        { type: `The vibrations of the sand may swallow us` },
        { delay: 185 },
        { speed: 185 },
        { select: { from: 0, to: 125 } },
        { speed: 20 },
        { remove: { num: 125, type: "whole" } },
        { type: `But we'll never stop` },
        { type: "<br>" },
        { delay: 400 },
        { type: `Gold, eternal life, ` },
        { delay: 700 },
        { type: `honor, love, fame` },
        { delay: 400 },
        { speed: 105 },
        { select: { from: 0, to: 61 } },
        { speed: 20 },
        { remove: { num: 61, type: "whole" } },
        { type: `It doesn't matter what you dream for` },
        { type: "<br>" },
        { type: `So let me ask you` },
        { delay: 1000 },
        { speed: 155 },
        { select: { from: 0, to: 57 } },
        { speed: 20 },
        { remove: { num: 57, type: "whole" } },
        { type: `What ` },
        { delay: 500 },
        { type: `is ` },
        { delay: 500 },
        { type: `your ` },
        { delay: 500 },
        { type: `treasure?` },
        { delay: 9000 },
        { remove: { num: 22, type: "stepped" } },
        { type: `Will You Join Us?` },
      ],
    });
    setTimeout(function () {
      $(`#gameButtonContainer`).fadeIn();
    }, 98000);
    setTimeout(function () {
      $(`#skip`).fadeIn();
    }, 11000);
    $(`#skip`).on(`click`,function(){
      audio.pause();
      $(`#story`).hide();
      $(`#gameButtonContainer`).hide();
      $(`#skip`).hide();
      let game = new Phaser.Game(config);
    });
    $(`#gameButton`).on(`click`,function(){
      $(`#story`).hide();
      $(`#gameButtonContainer`).hide();
      $(`#skip`).hide();
      let game = new Phaser.Game(config);
    });
  });
}
