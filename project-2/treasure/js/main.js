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
      longJourneyVideo.size(1280 / 2, 720 / 2);

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
      setTimeout(function () {
        $(`#skip`).fadeOut();
      }, 96000);
      setTimeout(function () {
        $(`#gameButtonContainer`).fadeIn();
      }, 98000);
    });

    /*
    Once clicked, the buttons are hidden, and the div the join us button is in
    gets deleted so it doesn't show up if you click on the skip button instead.
    Then the game starts.
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
  /*
    NOTE: All the code that is commented out was used for training the
    data set/model for the shapeClassifier, however since I don't need
    it running every single time the game loads I commented it out so
    you can see what I did. I could have created an entirely new project
    to do this and kept the saved data however I was following along the tutorial linked below and didn't skip ahead to see that they created two projects for this oops.

    https://www.youtube.com/watch?v=3MqJzMvHE3E&ab_channel=TheCodingTrain
  */
  p.video = undefined;
  // let p.canvas;

  let fenceBgImg = undefined;
  let practiceDummyImg = undefined;


  let circles = [];
  let squares = [];
  let triangles = [];
  let shapeClassifier;
  let inputImage;
  let resultsDiv;
  let weightsData;

  p.preload = function () {
    fenceBgImg = p.loadImage(`assets/images/swordMiniGame/background.png`);
    practiceDummyImg = p.loadImage(`assets/images/swordMiniGame/Dummy.png`);

    // for (let i = 0; i < 100; i++){
    //   let index = p.nf(i+1, 4, 0);
    //   circles[i] = p.loadImage(`assets/data/circle${index}.png`);
    //   squares[i] = p.loadImage(`assets/data/square${index}.png`);
    //   triangles[i] = p.loadImage(`assets/data/triangle${index}.png`);
    // }


  };
  p.setup = function () {
    p.canvas = p.createCanvas(800, 400);
    let options = {
      inputs: [64, 64, 4],
      task: `imageClassification`,
      debug: true
    };
    shapeClassifier = ml5.neuralNetwork(options);
    const modelDetails = {
      model: `assets/model/model.json`,
      metadata: `assets/model/model_meta.json`,
      weights: `assets/model/model.weights.bin`
    };
    p.backgroundLoad();
    p.dummyLoad();
    p.circleLoad();
    inputImage = p.createGraphics(64, 64);
    shapeClassifier.load(modelDetails, p.modelLoaded);

    //
    // for(let i = 0; i < circles.length; i++){
    //   shapeClassifier.addData({image: circles[i]},{label: `circle`});
    //   shapeClassifier.addData({image: squares[i]},{label: `square`});
    //   shapeClassifier.addData({image: triangles[i]},{label: `triangle`});
    // }
    // shapeClassifier.normalizeData();
    // shapeClassifier.train({epochs: 50},p.finishedTraining);


  };
  p.draw = function () {
    if (dialogActive == true) {
      p.sword();
      let circleHeight = p.height / 2 + 25;
      let circleWidth = p.width / 2;
      let circleDiameter = 95;
      let d = p.dist(circleWidth, circleHeight, p.mouseX, p.mouseY);
      if (d < circleDiameter / 2) {
        if (p.mouseIsPressed) {
          p.strokeWeight(8);
          p.line(p.mouseX, p.mouseY, p.pmouseX, p.pmouseY);
        }
      }
    }
  };

  p.modelLoaded = function () {
    console.log("model is ready!");
    p.classifyImage();
  };
  p.backgroundLoad = function () {
    p.push();
    p.imageMode(p.CORNER);
    p.image(fenceBgImg, 0, 0);
    p.pop();
  };
  p.dummyLoad = function () {
    let dummyHeight = p.height / 2 + 8;
    let dummyWidth = p.width / 2;
    p.push();
    p.imageMode(p.CENTER);
    p.image(practiceDummyImg, dummyWidth, dummyHeight);
    p.pop();
  };
  p.sword = function () {
    p.cursor(`assets/images/swordMiniGame/swordCursor.cur`);
  };
  p.classifyImage = function () {
    inputImage.copy(p.canvas, 0, 0, 400, 400, 0, 0, 64, 64);
  //image(inputImage, 0, 0);
  shapeClassifier.classify(
    {
      image: inputImage
    },
    p.gotResults
  );

    // inputImage.copy(canvas, 0, 0, 800, 400, 0, 0, 64, 64);
    // shapeClassifier.classify({image: inputImage},p.gotResults);
  };
  p.gotResults = function (err, results) {
    if (err) {
      console.log(err);
      return;
    }
      let label = results[0].label;
      let confidence = p.nf(100 * results[0].confidence, 2, 0);
      let shapeResult = `${label}: ${confidence}%`;
      p.textSize(20);
      p.fill(0);
      p.text(shapeResult, 20, 20);
    p.classifyImage();
  };
  p.circleLoad = function () {
    // Circle that the user needs to draw
    let circleHeight = p.height / 2 + 25;
    let circleWidth = p.width / 2;
    let circleDiameter = 95;
    p.push();
    p.strokeWeight(15);
    p.stroke(255, 0, 0, 85);
    p.fill(255, 255, 255, 0);
    p.ellipse(circleWidth, circleHeight, circleDiameter, circleDiameter);
    p.pop();
    // calculate distance between sword and circle
    // once overlapping, start detecting what shape is drawn
    // if circle (+90% confidence) -> win mini game
  };


  // p.finishedTraining = function() {
  //   console.log(`Training is Finished!!`);
  //   shapeClassifier.save();
  // };
};

let swordCanvas = new p5(swordGame, `posenet-mini-game`);
