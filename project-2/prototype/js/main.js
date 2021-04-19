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
  let audio1 = new Audio(`assets/sounds/Intro_Long_Journey.mp3`);
  let game;
  let longJourneyVideo;
  let introVideo = document.getElementById(`introVideo`);
  let timer = null;
  p.setup = function () {
    longJourneyVideo = p.createVideo(`assets/videos/Intro_Long_Journey.mp4`);
    longJourneyVideo.hide();
    $(`#introVideo`).hide();
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
      When the play button gets pressed, the audio & video starts playing, the
      button and music player are hidden, the video starts and once the voice
      starts speaking in the audio, that's when the skip button fades in and
      fades out right before the join us button fades in  once the video is over
    */
    $("#playerButton").on(`click`, function (event) {

      longJourneyVideo.size(1280/2,720/2);

      if (!audio1.play()) {
        audio1.play();
      }
      $(this).hide();
      $(`#musicPlayer`).hide();
      longJourneyVideo.show();
      p.imageMode(p.CENTER);
      longJourneyVideo.play();

      setTimeout(function () {
        $(`#skip`).fadeIn();
      }, 11000);
      setTimeout(function (){
        $(`#skip`).fadeOut();
      },96000);
      setTimeout(function () {
        $(`#gameButtonContainer`).fadeIn();
      }, 98000);

    });

    /*
    Once clicked, the story div and buttons are hidden, and the div the join
    us button is in gets deleted so it doesn't show up if you click on the skip
    button instead. Then the game starts.
    */
    let skipButton = document.getElementById(`skip`);
    skipButton.onclick = function () {
      audio1.pause();
      longJourneyVideo.hide();
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
      longJourneyVideo.hide();
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
    key = new Key(p, p.x1, p.y1, p.keyImage);

    // creating the items
    for (let i = 0; i < NUM_PIRATE_ITEMS; i++) {
      p.x = p.random(30, p.width - 50);
      p.y = p.random(30, p.height - 50);
      p.pirateImg = p.random(pirateItemsImages);
      p.item = new Item(p, p.x, p.y, p.pirateImg);
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
  p.mousePressed = function () {
    if (key.mousePressed()) {
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

/*
  To get started I'm following along this tutorial to at the very least have
  PoseNet set up.
  https://www.youtube.com/watch?v=OIo-DIOkNVg&ab_channel=TheCodingTrain

  To Do:
  - add background and dummy object
  - get the game to detect which hand is raised (L/R)
  - display the sword in the right direction depending on the hand raised first
  - add a circle or X on the target dummy that the player has to trace with the sword
  - Once that's done, a key is given
*/

let dialogActive = false;
let swordGame = function (p) {
  p.video = undefined;
  let poseNet = undefined;
  let predictions = [];

  let fenceBgImg = undefined;
  let practiceDummyImg = undefined;
  let swordImg = undefined;
  p.preload = function () {
    fenceBgImg = p.loadImage(`assets/images/swordMiniGame/background.png`);
    swordImg = p.loadImage(`assets/images/swordMiniGame/Sword-01.png`);
    practiceDummyImg = p.loadImage(`assets/images/swordMiniGame/Dummy.png`);
  };
  p.setup = function () {
    p.createCanvas(800, 400);
  };
  p.draw = function () {
    if(dialogActive == true && poseNet == undefined){
      // p.video.play();
      p.video = p.createCapture(p.VIDEO);
      p.video.hide();
      poseNet = ml5.poseNet(p.video, p.modelLoaded);
    }
    p.backgroundLoad();
  };
  p.modelLoaded = function () {
    console.log("poseNet is ready!");
  };
  p.backgroundLoad = function() {
    p.push();
    p.imageMode(p.CORNER);
    p.image(fenceBgImg, 0, 0);
    p.pop();
  };
};

let swordCanvas = new p5(swordGame, `posenet-mini-game`);
