"use strict";
/**************************************************
Pirate Game (Project 2)
Paola Petitti

Link to the audio for the intro:
https://www.youtube.com/watch?v=eXubmzAgA10&ab_channel=KQENTERTAINMENT

In order for me to get the mini games working inside modal/dialog boxes, I had
to use several instance canvases all parented to their own div (except the main
game canvas) so that they will only be seen when those dialog boxes are triggered
to open.


todo:
- be able to interact with the treasure chests
  -> no key: pop up saying you need a key (either text, alert or modal)
  -> with key: get a modal box with a mini game (maybe a handpose game)
**************************************************/
let phaserConfig = {
  type: Phaser.AUTO,
  width: 1280,
  height: 720,
  physics: {
    default: `arcade`,
  },
  scene: [Boot, Play],
};
let keyScore = 0; // Going to be used for all the mini games on the ship
let chestOpen = 0;

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
    $(`#neuralNetwork-mini-game`).hide();
    $(`#treasureChest-mini-game`).hide();
    $(`#need-keys-dialog`).hide();
    // turning autoOpen to false so that the intro modal only opens when the game starts
    $(`#need-keys-dialog`).dialog({
      autoOpen: false,
      buttons: {
        "ON IT!": function () {
          $(this).dialog(`close`);
        },
      },
    });
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
    $(`#neuralNetwork-mini-game`).dialog({
      modal: true,
      height: 500,
      width: 850,
      resizable: false,
      draggable: false,
      autoOpen: false,
    });
    $(`#treasureChest-mini-game`).dialog({
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
      game = new Phaser.Game(phaserConfig); // starts the game
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
      game = new Phaser.Game(phaserConfig); // starts the game
    };
  };
};
let mainCanvas = new p5(mainGame);

let keyGameDialogActive = false;
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
    if (keyGameDialogActive == true) {
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
  This mini game is relatively simple to play, the user just has to draw a
  circle that the shapeClassifier will recognize with 85% confidence.

  For the shapeclassifier I followed along this tutorial on how to use
  ml5js's neuralNetwork:
  https://www.youtube.com/watch?v=3MqJzMvHE3E&ab_channel=TheCodingTrain
*/
let inputImage;
let swordDialogActive = false;
let swordGame = function (p) {
  p.keyImage = undefined;
  let gameCanvas;
  let win = false;

  let fenceBgImg = undefined;
  let practiceDummyImg = undefined;

  let shapeClassifier;
  let resultsDiv;
  let clearButton;

  p.preload = function () {
    fenceBgImg = p.loadImage(`assets/images/swordMiniGame/background.png`);
    practiceDummyImg = p.loadImage(`assets/images/swordMiniGame/Dummy.png`);
    p.keyImage = p.loadImage(`assets/images/minigame/key.png`);
  };
  p.setup = function () {
    gameCanvas = p.createCanvas(800, 400);
    p.pixelDensity(1);
    let options = {
      task: `imageClassification`,
    };
    shapeClassifier = ml5.neuralNetwork(options);
    const modelDetails = {
      model: `assets/model/model.json`,
      metadata: `assets/model/model_meta.json`,
      weights: `assets/model/model_weights.bin`,
    };
    shapeClassifier.load(modelDetails, p.modelLoaded);
    p.backgroundLoad();
    p.hintShow();
    p.sword();

    clearButton = p.createButton(`Try Again`);
    clearButton.mousePressed(function () {
      p.backgroundLoad();
      p.hintShow();
      p.sword();
    });
    clearButton.style("float", "right");
    resultsDiv = p.createDiv(`loading model`);
    resultsDiv.style("float", "left");
    inputImage = p.createGraphics(64, 64);
  };
  p.draw = function () {
    let circleHeight = p.height / 2 + 25;
    let circleWidth = p.width / 2;
    let circleDiameter = 95;
    let d = p.dist(circleWidth, circleHeight, p.mouseX, p.mouseY);
    if (swordDialogActive == true) {
      if (d < circleDiameter / 1.5 && p.mouseIsPressed && win == false) {
        p.strokeWeight(18);
        p.stroke(0);
        p.line(p.mouseX, p.mouseY, p.pmouseX, p.pmouseY);
        inputImage.background(255);
        inputImage.line(p.mouseX, p.mouseY, p.pmouseX, p.pmouseY);
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
    p.dummyLoad();
    p.circleLoad();
  };
  p.dummyLoad = function () {
    let dummyHeight = p.height / 2 + 8;
    let dummyWidth = p.width / 2;
    p.push();
    p.imageMode(p.CENTER);
    p.image(practiceDummyImg, dummyWidth, dummyHeight);
    p.pop();
  };
  p.hintShow = function () {
    p.push();
    let hint = `Hint: try getting to 85%`;
    p.fill(50);
    p.noStroke();
    p.textSize(15);
    p.textAlign(p.CENTER, p.CENTER);
    p.text(hint, 90, 390);
    p.pop();
  };
  p.sword = function () {
    p.cursor(`assets/images/swordMiniGame/swordCursor.cur`);
  };
  p.classifyImage = function () {
    inputImage.copy(gameCanvas, 0, 0, 800, 400, 0, 0, 64, 64);

    shapeClassifier.classify(
      {
        image: inputImage,
      },
      p.gotResults
    );
  };
  p.gotResults = function (err, results) {
    if (err) {
      console.log(err);
      return;
    }
    let label = results[0].label;
    let confidence = p.nf(100 * results[0].confidence, 2, 0);
    if (win == false) {
      resultsDiv.html(`Match: ${confidence}%`);
    } else if (win == true) {
      resultsDiv.html(`:)`);
    }

    if (confidence >= 85) {
      win = true;
      keyScore++;
      console.log(`Keys: ` + keyScore);
      p.backgroundLoad();
      p.sword();
      p.keyFound();
    }
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
  };
  p.keyFound = function () {
    p.push();
    let message = "You Found The Key!";
    p.fill(0);
    p.noStroke();
    p.textSize(25);
    p.textStyle(p.BOLD);
    p.textAlign(p.CENTER, p.CENTER);
    p.imageMode(p.CENTER);
    p.image(p.keyImage, p.width / 2, p.height / 2 - 100);
    p.text(message, p.width / 2, p.height / 2);
    clearButton.hide();
    p.pop();
  };
};
let swordCanvas = new p5(swordGame, `neuralNetwork-mini-game`);

let treasureDialogActive = false;

let treasureChestGame = function (p) {
  const pirateWords = [
    "ahoy",
    "arg",
    "avast",
    "aye",
    "becalmed",
    "belay",
    "blimey",
    "blow the man down",
    "boom about",
    "bring a spring upon her cable",
    "bucko",
    "careen",
    "chase",
    "code of conduct",
    "come about",
    "crimp",
    "dance the hempen jig",
    "davy jones locker",
    "dead men tell no tales",
    "deadlights",
    "fire in the hole",
    "furl",
    "give no quarter",
    "handsomely",
    "heave down",
    "heave",
    "ho",
    "interloper",
    "jack ketch",
    "knave",
    "lad",
    "lass",
    "letter of marque",
    "list",
    "long clothes",
    "lookout",
    "marooned",
    "matey",
    "me",
    "no prey no pay",
    "overhaul",
    "parley",
    "piracy",
    "pirate",
    "quarter",
    "rapscallion",
    "reef sails",
    "run a shot across the bow",
    "sail ho",
    "scupper that",
    "sea legs",
    "shiver me timbers",
    "show a leg",
    "smartly",
    "strumpet",
    "swashbuckler",
    "take a caulk",
    "to go on account",
    "warp",
    "weigh anchor",
    "wench"
  ];
  let currentWord = ``;
  let currentAnswer = ``;

  let backgroundImg;
  let points = 0;
  let timer = 30;

  let gameState = `start`;
  let instructions = `Ye 'ave 30 seconds t' say as many words correctly
  as they appear on the chest!
  Press Space t' start!`;
  let restartMessage = `Damn ye're goin' t' 'ave t' do better than that,
  try gettin' 5 words in next time.
  Press Space t' try again`;
  let winMessage1 = `Now find that other key 'n go get that other loot
  chest o'er thar open`;
  let winMessage2 = `Now go 'n get the other loot chest o'er thar open`;
  let finalWinMessage = `That's all the loot, let's get out o' here!`;
  p.preload = function () {
    backgroundImg = p.loadImage(`assets/images/annyangMiniGame/ChestTable.png`);
  };
  p.setup = function () {
    p.createCanvas(800, 400);
    if (annyang) {
      let commands = {
        "*pirate": p.guessWord,
      };
      annyang.addCommands(commands);
      annyang.start();

    }
  };
  p.draw = function () {
    if (treasureDialogActive == true) {
      p.background(backgroundImg);
      if (gameState === `start`) {
        p.startScreen();
      } else if (gameState === `game`) {
        p.gameScreen();
      } else if (gameState === `restart`) {
        p.restartScreen();
      } else if (gameState === `end`) {
        p.endScreen();
      }
    }
  };
  p.guessWord = function (pirate) {
    // do something
    currentAnswer = pirate.toLowerCase();
    console.log(currentAnswer);
  };
  p.gameTimer = function () {
    p.textAlign(p.CENTER);
    p.textSize(15);
    p.text(timer, 50, 50);
    if (p.frameCount % 60 == 0 && timer > 0) {
      timer--;
    }
    if (timer == 0) {
      if (points >= 5) {
        gameState = `end`;
        chestOpen++;
      } else {
        gameState = `restart`;
      }
    }
  };
  p.startScreen = function () {
    p.push();
    p.fill(0);
    p.textAlign(p.CENTER);
    p.textSize(25);
    p.textStyle(p.BOLD);
    p.text(instructions, p.width / 2, p.height / 2);
    p.pop();
  };
  p.gameScreen = function () {
    p.gameTimer();
    console.log(currentWord);
    if (currentAnswer == currentWord) {
      // do something
      p.textAlign(p.CENTER);
      p.textSize(25);
      p.textStyle(p.BOLD);
      p.fill(0, 255, 0);
      points++;
      p.newPirateWord();
      // responsiveVoice.speak(`Ye got it!`);
    } else {
      p.textAlign(p.CENTER);
      p.textSize(25);
      p.textStyle(p.BOLD);
      p.fill(0);
    }

    p.text(currentWord, p.width / 2, p.height / 2);
  };
  p.restartScreen = function () {
    p.push();
    p.fill(0);
    p.textAlign(p.CENTER);
    p.textSize(25);
    p.textStyle(p.BOLD);
    p.text(restartMessage, p.width / 2, p.height / 2);
    p.pop();
  };
  p.endScreen = function() {
    if(keyScore == 1 && chestOpen == 1){
      p.push();
      p.fill(0);
      p.textAlign(p.CENTER);
      p.textSize(25);
      p.textStyle(p.BOLD);
      p.text(winMessage1, p.width / 2, p.height / 2);
      p.pop();
    }
    else if(keyScore == 2 && chestOpen == 1){
      p.push();
      p.fill(0);
      p.textAlign(p.CENTER);
      p.textSize(25);
      p.textStyle(p.BOLD);
      p.text(winMessage2, p.width / 2, p.height / 2);
      p.pop();
    }
    else if(keyScore == 2 && chestOpen == 2){
      p.push();
      p.fill(0);
      p.textAlign(p.CENTER);
      p.textSize(25);
      p.textStyle(p.BOLD);
      p.text(finalWinMessage, p.width / 2, p.height / 2);
      p.pop();
    }

  };
  p.newPirateWord = function () {
    currentWord = p.random(pirateWords);
  };
  p.keyPressed = function () {
    if(treasureDialogActive == true){
      if (gameState == `start` && p.keyCode === 32) {
        gameState = `game`;

        p.newPirateWord();
      } else if (gameState === `restart` && p.keyCode === 32) {
        gameState = `game`;
        timer = 30;
        points = 0;
        p.newPirateWord();
      }
    }
  };
};

let treasureCanvas = new p5(treasureChestGame, `treasureChest-mini-game`);
