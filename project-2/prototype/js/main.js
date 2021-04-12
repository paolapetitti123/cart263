"use strict";
/**************************************************
Pirate Game (Project 2)
Paola Petitti

This is the link to the typewriter library I found:
https://github.com/mrvautin/typewrite

Link to the audio for the intro:
https://www.youtube.com/watch?v=eXubmzAgA10&ab_channel=KQENTERTAINMENT

This is a prototype for my final project. This prototype will contain a start screen
where it's actually a html page with jQuery that provides a backstory for the game,
once you get through the backstory you'll be able to play the game.

todo:
- try getting a mini game to appear in a modal box when you hit the
bin layer
  -> the mini game: a where's waldo type game to find the key
- be able to interact with the treasure chests
  -> no key: pop up saying you need a key (either text, alert or modal)
  -> with key: get a modal box with a mini game (maybe a handpose game)
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
let color = 255;

/*
  Creating canvas for modal box mini game
*/
let sketch = function(p) {
  p.setup = function(){
    p.createCanvas(800,400);
  }
  p.draw = function(){
    p.background(color);
  }
  p.mousePressed= function(){
    if (color === 0) {
    color = 255;
  } else {
    color = 0;
  }
  }
};

// setup()
//
// Description of setup() goes here.
function setup() {
  // hiding the dialog text as it shows up outside the modal if i don't
  $(`#intro-dialog`).hide();
  $(`#mini-game-box`).hide();
  // turning autoOpen to false so that the intro modal only opens when the game starts
  $(`#intro-dialog`).dialog({
      autoOpen: false,
      buttons: {
        "GOT IT!": function(){
          $(this).dialog(`close`);
        }
      }
    });
  $(`#mini-game-box`).dialog({
    modal: true,
    height: 500,
    width: 850,
    resizable: false,
    draggable: false,
    autoOpen: false
  });
  // hiding the buttons by default
  $(`#gameButtonContainer`).hide();
  $(`#skip`).hide();

  /*
    When the play button gets pressed, the audio starts playing, the button and
    music player are hidden, the typewriter effects starts in the story div and
    once the voice starts speaking in the audio, that's when the skip button
    fades in and the join us button shows up once the audio is over
  */
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
        { delay: 1500 },
        { type: "<br>" },
        { type: `We're at the starting point of this long journey` },
        { speed: 155 },
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
        { delay: 175 },
        { speed: 135 },
        { select: { from: 0, to: 125 } },
        { speed: 20 },
        { remove: { num: 125, type: "whole" } },
        { type: `But we'll never stop` },
        { type: "<br>" },
        { delay: 700 },
        { type: `Gold, eternal life, ` },
        { delay: 900 },
        { type: `honor, love, fame` },
        { delay: 400 },
        { speed: 105 },
        { select: { from: 0, to: 61 } },
        { speed: 20 },
        { remove: { num: 61, type: "whole" } },
        { type: `It doesn't matter what you dream for` },
        { type: "<br>" },
        { type: `So let me ask you` },
        { delay: 1200 },
        { speed: 100 },
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

    /*
    Once clicked, the story div and buttons are hidden, and the div the join
    us button is in gets deleted so it doesn't show up if you click on the skip
    button instead. Then the game starts.
    */
    $(`#skip`).on(`click`,function(){
      audio.pause();
      $(`#story`).hide();
      $(`#gameButtonContainer`).hide();
      $(`#skip`).hide();
      $(`#gameButton`).hide();
      $(`#gameButtonContainer`).remove();
      let game = new Phaser.Game(config); // starts the game
    });
    /*
      Very similar to the comment above however the gameButtonContainer isn't
      deleted as for this one the button would have already shown up so hidding
      the button is more than enough. Also the audio is finished by then so
      there's no need to pause the audio.
    */
    $(`#gameButton`).on(`click`,function(){
      $(`#story`).hide();
      $(`#gameButtonContainer`).hide();
      $(`#skip`).hide();
      let game = new Phaser.Game(config); // starts the game
    });
  });
}

// function draw(){
//   background(color);
//   color++;
// }
