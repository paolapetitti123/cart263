"use strict";
/**************************************************
Pirate Game (Project 2)
Paola Petitti

This is the link to the typewriter library I found:
https://github.com/mrvautin/typewrite

Link to the audio for the intro:
https://www.youtube.com/watch?v=eXubmzAgA10&ab_channel=KQENTERTAINMENT


todo:
- Add canvas to decoLayer box
  -> The game will be using Posenet or Handpose (ml5)
    - First finish the design in Illustrator
    - The game will have the user with their hand/arm follow along the circle/X
      to 'cut' open the dummy and you'll get a key from that.
- be able to interact with the treasure chests
  -> no key: pop up saying you need a key (either text, alert or modal)
  -> with key: get a modal box with a mini game (maybe a handpose game)
**************************************************/
let config = {
  type: Phaser.AUTO,
  width: 1280,
  height: 720,
  physics: {
    default: `arcade`,
  },
  scene: [Boot, Play],
};
let keyScore = 0; // Going to be used for all the mini games on the ship


let mainGame = function (p) {
  let audio = new Audio(`assets/sounds/Intro_Long_Journey.mp3`);
  let game;
  p.setup = function () {
    $(`#intro-dialog`).hide();
    $(`#mini-game-box`).hide();
    $(`#posenet-mini-game`).hide();
    // turning autoOpen to false so that the intro modal only opens when the game starts
    $(`#intro-dialog`).dialog({
      autoOpen: false,
      buttons: {
        "GOT IT!": function () {
          $(this).dialog(`close`);
        },
      },
    });
    $(`#mini-game-box`).dialog({
      modal: true,
      height: 500,
      width: 850,
      resizable: false,
      draggable: false,
      autoOpen: false,
    });
    $(`#posenet-mini-game`).dialog({
      modal: true,
      height: 500,
      width: 850,
      resizable: false,
      draggable: false,
      autoOpen: false,
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
      if (!audio.play()) {
        audio.play();
      }
      // audio.play();
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
    });

    /*
    Once clicked, the story div and buttons are hidden, and the div the join
    us button is in gets deleted so it doesn't show up if you click on the skip
    button instead. Then the game starts.
    */
    let skipButton = document.getElementById(`skip`);
    skipButton.onclick = function () {
      audio.pause();
      $(`#story`).hide();
      $(`#gameButtonContainer`).remove();
      $(`#skip`).hide();
      game = new Phaser.Game(config); // starts the game
    };
    /*
      Very similar to the comment above however the gameButtonContainer isn't
      deleted as for this one the button would have already shown up so hidding
      the button is more than enough. Also the audio is finished by then so
      there's no need to pause the audio.
    */
    let gameButton = document.getElementById(`gameButton`);
    gameButton.onclick = function () {
      $(`#story`).hide();
      $(`#gameButtonContainer`).hide();
      $(`#skip`).hide();
      game = new Phaser.Game(config); // starts the game
    };
  };
};
let mainCanvas = new p5(mainGame);


let keyGame = function (p) {
  const NUM_PIRATE_ITEMS_IMG = 9;
  const NUM_PIRATE_ITEMS = 72;
  let pirateItemsImages = [];
  let pirateItems = [];

  p.keyImage = undefined;
  let key = undefined;


  let binImg = undefined;

  p.preload = function () {
    for (let i = 0; i < NUM_PIRATE_ITEMS_IMG; i++) {
      let pirateItemsImage = p.loadImage(
        `assets/images/minigame/pirateItem${i}.png`
      );
      pirateItemsImages.push(pirateItemsImage);
    }

    p.keyImage = p.loadImage(`assets/images/minigame/key.png`);
    binImg = p.loadImage(`assets/images/binBackground-01.png`);
  };

  p.setup = function () {
    p.createCanvas(800, 400);

    // creating the keys
    p.x1 = p.random(30, p.width - 50);
    p.y1 = p.random(30, p.height - 50);
    key = new Key(p,p.x1, p.y1, p.keyImage);

    // creating the items
    for (let i = 0; i < NUM_PIRATE_ITEMS; i++) {
      p.x = p.random(30, p.width - 50);
      p.y = p.random(30, p.height - 50);
      p.pirateImg = p.random(pirateItemsImages);
      p.item = new Item(p,p.x, p.y, p.pirateImg);
      pirateItems.push(p.item);
    }
  };
  p.draw = function () {
    // creating the background image
    p.push();
    p.imageMode(p.CORNER);
    p.image(binImg, 0, 0);
    p.pop();

    // getting the items & key to appear
    for (let i = 0; i < pirateItems.length; i++) {
      pirateItems[i].update();
    }
    if (key.active) {
      key.update();
    }
  };

  // checking if the mouse clicked on the key
  p.mousePressed = function() {
    if(key.mousePressed()){
      console.log("TOUCHING");
    }
    key.mousePressed();

    if (key.found && key.active) {
      keyScore++;
      console.log(keyScore);
    }
  };
};

// creating the instance canvas for the mini game
let keyCanvas = new p5(keyGame, `mini-game-box`);


let swordGame = function (p){};

let swordCanvas = new p5(swordGame, `posenet-mini-game`);
