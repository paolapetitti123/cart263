"use strict";
/**************************************************
Pirate Game (Project 2)
Paola Petitti

Link to the audio for the intro:
https://www.youtube.com/watch?v=eXubmzAgA10&ab_channel=KQENTERTAINMENT

Link to the audio in game:
https://www.youtube.com/watch?v=g8bLC2ItJ10

In order for me to get the mini games working inside modal/dialog boxes, I had
to use several instance canvases all parented to their own div (except the main
game canvas) so that they will only be seen when those dialog boxes are triggered
to open. In order to win the game you must get all the keys and open all the
treasure chests. Every chest has it's own mini game as do the items on the ship
you need to interact with in order to get the keys for the chests.

Note the sound effects I bought from storyblocks and the images/art on the boat
are all completely free/free to use assets coming from itch.io 

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
    $(`#treasureDrag-mini-game`).hide();
    $(`#poemContainer`).hide();
    $(`#keyPicture`).hide();
    $(`#keySlot`).hide();
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
    $(`#treasureDrag-mini-game`).dialog({
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
let keyFound = false;
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
      keyFound = true;
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
let neuralKeyFound = false;
let swordGame = function (p) {
  p.keyImage = undefined;
  let gameCanvas;
  let win = false;

  let fenceBgImg = undefined;
  let practiceDummyImg = undefined;

  let shapeClassifier;
  let resultsDiv;
  let clearButton;

  /*
  All the images for this instance canvas are loaded here.
  */
  p.preload = function () {
    fenceBgImg = p.loadImage(`assets/images/swordMiniGame/background.png`);
    practiceDummyImg = p.loadImage(`assets/images/swordMiniGame/Dummy.png`);
    p.keyImage = p.loadImage(`assets/images/minigame/key.png`);
  };
  /*
  The instance canvas gets created here, the pixelDensity gets set to 1
  that way every computer screen should be able to play the game, then I start
  the shapeClassifier code that I was following along (as I mentioned earlier).
  As well as load the background, sword cursor and hint
  */
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
  /*
    Here I essentially create a section on the canvas were the user can actively
    draw in as oposed to getting the entire canvas and so long as you haven't won
    the mini game yet, you can draw in that section.
  */
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

/*
Checks if the model for shapeClassifier is ready
*/
  p.modelLoaded = function () {
    console.log("model is ready!");
    p.classifyImage();
  };
  /*
  Loads the background
  */
  p.backgroundLoad = function () {
    p.push();
    p.imageMode(p.CORNER);
    p.image(fenceBgImg, 0, 0);
    p.pop();
    p.dummyLoad();
    p.circleLoad();
  };
  /*
  Loads the dummy image
  */
  p.dummyLoad = function () {
    let dummyHeight = p.height / 2 + 8;
    let dummyWidth = p.width / 2;
    p.push();
    p.imageMode(p.CENTER);
    p.image(practiceDummyImg, dummyWidth, dummyHeight);
    p.pop();
  };
  /*
  Loads the hint at the bottom left
  */
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
  /*
    Changes the cursor to a sword for this minigame
  */
  p.sword = function () {
    p.cursor(`assets/images/swordMiniGame/swordCursor.cur`);
  };

  /*
    And here is where all the shape classifying magic happens, i essentially make
    a copy of the canvas using createGraphics as you saw eariler but I shrink it to
    a 64x64 image and I send that over to the shapeClassifier
  */
  p.classifyImage = function () {
    inputImage.copy(gameCanvas, 0, 0, 800, 400, 0, 0, 64, 64);

    shapeClassifier.classify(
      {
        image: inputImage,
      },
      p.gotResults
    );
  };
  /*
  The confidence of the drawing is constantly being updated in the bottom left corner
  of the canvas and Igf the confidence of the drawing = 85, then you win the game
  */
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
      neuralKeyFound = true;
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
  /*
    If you win then you get a message that pops up and you can continue on
    with the game.
  */
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

/*
  Attaching the sword game canvas I just made onto the dialog
*/
let swordCanvas = new p5(swordGame, `neuralNetwork-mini-game`);

let treasureDialogActive = false;
let annyangChestOpen = false;

/*
  The functionality of this minigame is similar to the slamina excerise we had
  to do except that I do not reverse the words and you do not get to hear them
  with the responsiveVoice, instead you have to say as many words as quickly as
  possible to at least get 5 words in.

  I would have loved to add the responsivevoice to this minigame but I kept getting
  very bizzare glitches where the responsivevoice only started playing if I opened
  a new tab.

  Also the array of pirateWords I created myself as i couldn't find one so I just
  googled pirate words and made one with what I could find.
*/
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
    "give no quarter",
    "handsomely",
    "heave",
    "ho",
    "interloper",
    "jack ketch",
    "knave",
    "lad",
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
    "wench",
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
  let restartMessage = `Damn ye're goin' to have to do better than that,
  try gettin' 5 words in next time.
  Press Space t' try again`;
  let winMessage1 = `Now find that other key 'n go get that other loot
  chest over thar open`;
  let winMessage2 = `Now go 'n get the other loot chest over thar open`;
  let finalWinMessage = `That's all the loot, let's get out o' here!`;

  let winSound;

  p.preload = function () {
    backgroundImg = p.loadImage(`assets/images/annyangMiniGame/ChestTable.png`);
    winSound = p.loadSound(`assets/sounds/coins-drop-pirate.mp3`);
  };
  /*
  Setting up annyang for the game
  */
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
  /*
  The different states setup
  */
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
  /*
    changing the answers all to lower case
  */
  p.guessWord = function (pirate) {
    currentAnswer = pirate.toLowerCase();
    console.log(currentAnswer);
  };
  /*
  Added timer for the game with the ability to restart the game if needed
  */
  p.gameTimer = function () {
    p.textAlign(p.CENTER);
    p.textSize(15);
    p.text(timer, 50, 50);
    if (p.frameCount % 60 == 0 && timer > 0) {
      timer--;
    }
    if (timer == 0) {
      if (points >= 5) {
        annyang.pause();
        gameState = `end`;
        chestOpen++;
        annyangChestOpen = true;
        winSound.play();
      } else {
        gameState = `restart`;
        currentWord = ` `;
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
  /*
  Keeps track of the points as you get words right and puts up a new word when
  you do get one right.
  */
  p.gameScreen = function () {
    p.gameTimer();
    console.log(currentWord);
    if (currentAnswer == currentWord) {
      p.textAlign(p.CENTER);
      p.textSize(25);
      p.textStyle(p.BOLD);
      p.fill(0, 255, 0);
      points++;
      p.newPirateWord();
    } else {
      p.textAlign(p.CENTER);
      p.textSize(25);
      p.textStyle(p.BOLD);
      p.fill(0);
    }
    p.text(currentWord, p.width / 2, p.height / 2);
    p.text(`Words: ${points}`, 700, 50);
  };
  /*
  If you happen to not get 5 words right, then you see the restart screen
  */
  p.restartScreen = function () {
    p.push();
    p.fill(0);
    p.textAlign(p.CENTER);
    p.textSize(25);
    p.textStyle(p.BOLD);
    p.text(restartMessage, p.width / 2, p.height / 2);
    p.pop();
  };
  /*
  If you get 5 words right, then you see the end screen and depending on how many
  keys and chests you've opened the message differs.
  */
  p.endScreen = function () {
    p.fill(0);
    p.textAlign(p.CENTER);
    p.textSize(25);
    p.textStyle(p.BOLD);
    if (keyScore == 1 && chestOpen == 1) {
      p.push();
      p.text(winMessage1, p.width / 2, p.height / 2);
      p.pop();
    } else if (keyScore == 2 && chestOpen == 1) {
      p.push();
      p.text(winMessage2, p.width / 2, p.height / 2);
      p.pop();
    } else if (keyScore == 2 && chestOpen == 2) {
      p.push();
      p.text(finalWinMessage, p.width / 2, p.height / 2);
      p.pop();
    }
  };
  p.newPirateWord = function () {
    currentWord = p.random(pirateWords);
  };
  /*
    Checking which keys are pressed during which states.
  */
  p.keyPressed = function () {
    if (treasureDialogActive == true) {
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

let dragDialogActive = false;
let dragChestOpen = false;

/*
  Similar to the secret code exercise we did, this one has a verse from the group
  ATEEZ's song Pirate King and you have to find the secret letters, and drop them into
  the answer box. The secret word has to be treasure other wise you restart and get a
  very snarky comment from the responsivevoice. I did some CSS work to make the text
  appear ontop of the canvas.

  Following that a key image shows up and you can drag it into the new answer box
  on the key hole in the image and then you win this mini game.
*/
let dragTresureGame = function (p) {
  let winMessage1 = `Now find that other key 'n go get that other loot
  chest over thar open`;
  let winMessage2 = `Now go 'n get the other loot chest over thar open`;
  let finalWinMessage = `That's all the loot, let's get out o' here!`;
  let backgroundImg;
  let winSound;
  let letterCount = 0;
  let totalLetter = 8;

  p.preload = function () {
    backgroundImg = p.loadImage(
      `assets/images/treasureMiniGame/ChestNoTable.png`
    );
    winSound = p.loadSound(`assets/sounds/coins-drop-pirate.mp3`);
  };
  /*
  I just create the canvas here.
  */
  p.setup = function () {
    p.createCanvas(800, 400);
  };
  /*
    I check if the dialog is opened first, then make the background show up,
    then the div container the verse is in and I call the hiddenMessageShow
    function so the secret code stuff can start. Once that's done I add
    droppable to the keySlot div so the keyImage can be dragged into it when
    they appear.
  */
  p.draw = function () {
    if (dragDialogActive == true) {

      p.background(backgroundImg);
      $(`#poemContainer`).show();

      p.hiddenMessageShow();

      $(`#keySlot`).droppable({
        drop: function (event, ui) {
          ui.draggable.remove();
          $(this).hide();
          winSound.play();
          chestOpen++;
          dragChestOpen = true;
          console.log(chestOpen);
          p.gameWin();
        },
      });
    }
  };
  /*
    Here you get another snarky comment from responsivevoice guy when the key
    image is done shaking and you can drag the key into the key hole.
  */
  p.keyDrag = function () {
    $(`#keyPicture`).on(`mouseover`, function (event) {
      $(this).draggable();
    });
    responsiveVoice.speak(`Well wha' are ye waitin' for open the chest!`, "Australian Male");
  };
  /*
    Here I essentially do exactly what we do in the secret code exercise, I add
    the found class, make it droppable and make sure it gets cloned.
  */
  p.hiddenMessageShow = function () {
    $(`.secret`).one(`mouseover`, function (event) {
      $(this).addClass(`found`, 500);
      $(this).draggable({
        helper: `clone`,
      });
    });
    p.answerBoxShow();
  };
  /*
    Here I essentially do exactly what we do in the secret code exercise, I add
    droppable to the answer div except I do not disable draggable as I need it
    if the user has to restart.
  */
  p.answerBoxShow = function () {
    $(`#answer`).droppable({
      drop: function (event, ui) {
        let character = ui.draggable.text();
        $(this).append(character);
        ui.draggable.removeClass(`found`);
        letterCount++;

        if ($(this).text() === `treasure` && letterCount == totalLetter) {
          $(`#poem`).hide();
          $(this).hide();
          $(`#keyPicture`).show();
          $(`#keyPicture`).effect({
            effect: `shake`,
            duration: 2000,
            times: 15,
            distance: 10,
            complete: p.keyDrag,
          });
          $(`#keySlot`).show();
        } else if (
          $(this).text() !== "treasure" &&
          letterCount == totalLetter
        ) {
          $(this).text(``);
          $(this).effect({
            effect: `shake`,
            duration: 2000,
            times: 15,
            distance: 10,
          });
          responsiveVoice.speak(`Come on even I could tell the answer was treasure, try again`, "Australian Male");
          letterCount = 0;
          p.hiddenMessageShowTry2();
        }
      },
    });
  };
  /*
    In case the user has to restart it's the code from before all over again.
  */
  p.hiddenMessageShowTry2 = function(){
    $(`.secret`).one(`mouseover`, function (event) {
      $(this).addClass(`found`, 500);
      $(this).draggable({
        helper: `clone`,
      });
    });

    $(`#answer`).droppable({
      drop: function (event, ui) {
        let character2 = ui.draggable.text();
        $(this).append(character2);
        ui.draggable.removeClass(`found`);
        letterCount++;

        if ($(this).text() === `treasure` && letterCount == totalLetter) {
          $(`#poem`).hide();
          $(this).hide();
          $(`#keyPicture`).show();
          $(`#keyPicture`).effect({
            effect: `shake`,
            duration: 2000,
            times: 15,
            distance: 10,
            complete: p.keyDrag,
          });
          $(`#keySlot`).show();
        }
      },
    });
  };

  /*
    If the user wins the game you get one of three messages
  */
  p.gameWin = function(){
    $(`#keySlot`).hide();
    $(`#poem`).show();
    if (keyScore == 1 && chestOpen == 1) {
      p.push();
      $(`#poem`).text(winMessage1);
      responsiveVoice.speak(winMessage1, "Australian Male");
      p.pop();
    } else if (keyScore == 2 && chestOpen == 1) {
      p.push();
      $(`#poem`).text(winMessage2);
      responsiveVoice.speak(winMessage2, "Australian Male");
      p.pop();
    } else if (keyScore == 2 && chestOpen == 2) {
      p.push();
      $(`#poem`).text(finalWinMessage);
      responsiveVoice.speak(finalWinMessage, "Australian Male");
      p.pop();

    }
  };

};

let dragTreasureCanvas = new p5(dragTresureGame, `treasureDrag-mini-game`);
