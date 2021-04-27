class Play extends Phaser.Scene {
  constructor() {
    super({
      key: `play`,
    });
  }

  /*
  Here I add physics to the avatar sprite, turn on colliding for the avatar,
  I then call the createAnimations method and by default leave the avatar in the
  idle animation when no keys are pressed. I proceed to call the createTileMap
  method so that the map I made in Tiled gets displayed. And then I make the modal
  box pop up that has the game instructions.

  In other words all the setup stuff is in this method.
*/
  create() {
    this.avatar = this.physics.add.sprite(400, 500, `avatar`);
    this.avatar.setCollideWorldBounds(true);
    this.createAnimations();
    this.avatar.play(`avatar-idle`);
    this.createTileMap();
    $(`#intro-dialog`).dialog(`open`);
    responsiveVoice.speak(document.getElementById("intro-dialog").textContent,"Australian Male");
    this.cursors = this.input.keyboard.createCursorKeys();

  }

  /*
  Been following this youtube tutorial but tweaking it every so often to new
  code found on the phaser website since some of it is a little outdated:
  https://www.youtube.com/watch?v=uznkhVMbVr8&ab_channel=jestarray

  Try to figure out why the pole layer is showing the debris
*/
  createTileMap() {
    let mappy = this.add.tilemap(`map`);
    let boat = mappy.addTilesetImage(`boat-01`, `background`);
    let chests = mappy.addTilesetImage(`Bronze Chest`, `chests`);
    let bronzeChest = mappy.addTilesetImage(`Bronze Chest`, `bronzeChest`);
    let destructible = mappy.addTilesetImage(
      `Destructible Objects Sprite Sheet`,
      `destructible`
    );
    let furniture1 = mappy.addTilesetImage(
      `furniture-2-24x24-5x5-sheet`,
      `furniture1`
    );
    let furniture2 = mappy.addTilesetImage(
      `furniture-24x24-5x4-sheet`,
      `furniture2`
    );
    let furniture3 = mappy.addTilesetImage(
      `shrines-altars-24x24-5x4-sheet`,
      `furniture3`
    );
    let tilesheet = mappy.addTilesetImage(`tilesheet`, `tilesheet`);
    let barrel = mappy.addTilesetImage(`Barrel`, `barrel`);
    let water = mappy.addTilesetImage(`water`, `water`);

    // layers
    let waterLayer = mappy.createLayer(`Water`, [water]).setDepth(-1);
    let boatLayer = mappy.createLayer(`Boat`, [boat]).setDepth(-1);
    let destructibleLayer = mappy
      .createLayer(`Debris`, [destructible])
      .setDepth(-1);
    let borderLayer = mappy.createLayer(`Border`, [destructible]).setDepth(-1);
    let barrelLayer = mappy.createLayer(`barrel`, [barrel]).setDepth(-1);
    let swordLayer = mappy.createLayer(`Swords`, [furniture2]).setDepth(-1);
    let tableLayer = mappy.createLayer(`Tables`, [furniture2]).setDepth(-1);
    let decoLayer = mappy
      .createLayer(`Deco`, [furniture1, furniture2])
      .setDepth(-1);
    let binLayer = mappy.createLayer(`Bin`, [furniture2]).setDepth(-1);
    let flagLayer = mappy.createLayer(`Flag`, [furniture1]).setDepth(-1);
    let chestLayer = mappy.createLayer(`Chest`, [chests]).setDepth(-1);
    let bronzeChestLayer = mappy.createLayer(`BronzeChest`, [bronzeChest]).setDepth(-1);



    // map collisions with regular tiles
    this.physics.add.collider(
      this.avatar,
      binLayer,
      this.openMiniGame,
      null,
      this
    );
    this.physics.add.collider(this.avatar, chestLayer, this.openDragMiniGame, null, this);
    this.physics.add.collider(this.avatar, bronzeChestLayer, this.openAnnyangMiniGame,null,this);
    this.physics.add.collider(
      this.avatar,
      decoLayer,
      this.openNeuralMiniGame,
      null,
      this
    );
    this.physics.add.collider(this.avatar, tableLayer);
    this.physics.add.collider(this.avatar, swordLayer);
    this.physics.add.collider(this.avatar, barrelLayer);
    this.physics.add.collider(this.avatar, borderLayer);
    // Map collision with object
    // this.physics.add.collider(
    //   this.avatar,
    //   keyLayer,
    //   this.collectKey,
    //   null,
    //   this
    // );

    // This turns the collisions on for the tile layers
    chestLayer.setCollisionByExclusion(-1, true);
    bronzeChestLayer.setCollisionByExclusion(-1, true);
    binLayer.setCollisionByExclusion(-1, true);
    decoLayer.setCollisionByExclusion(-1, true);
    tableLayer.setCollisionByExclusion(-1, true);
    swordLayer.setCollisionByExclusion(-1, true);
    barrelLayer.setCollisionByExclusion(-1, true);
    borderLayer.setCollisionByExclusion(-1, true);
  }

  // collectKey(avatar, key) {
  //   // this is to keep track of whether or not the player collected a key
  //
  //   // Once you hit the key, the key is destroyed & the keyScore gets added 1
  //   key.destroy(key.x, key.y);
  //   keyScore++;
  //   console.log(`Keys: ${keyScore}`);
  // }

  openMiniGame(avatar, binLayer) {
    $(`#mini-game-box`).dialog(`open`); // just testing to see if I can get the modal to open by hitting the bin
    keyGameDialogActive = true;
    if(keyFound == false){
      responsiveVoice.speak(`Thar best be a key somewhere in here`,"Australian Male");
    }
    else if(keyFound == true){
      responsiveVoice.speak(`Stop wastin' time, ye already found the key in here`,"Australian Male");
    }
  }

  openNeuralMiniGame(avatar, decoLayer) {
    $(`#neuralNetwork-mini-game`).dialog(`open`);
    swordDialogActive = true;
    if(neuralKeyFound == false){
      responsiveVoice.speak(`Try cuttin' a whole into the practice dummy, maybe thar's a key inside?`,"Australian Male");
    }
    else if(neuralKeyFound == true){
      responsiveVoice.speak(`Stop wastin' time, ye already found the key in here`,"Australian Male");
    }
  }

  openAnnyangMiniGame(avatar, bronzeChestLayer){
    if(keyScore == 2){
      $(`#treasureChest-mini-game`).dialog(`open`);
      treasureDialogActive = true;
      if(annyangChestOpen == false){
        responsiveVoice.speak(`Ye have 30 seconds to say as many words correctly as they appear on the chest!`,"Australian Male");
      }
      else if(annyangChestOpen == true){
        responsiveVoice.speak(`That loot chest was already opened, let's get a move on to the next one already!`,"Australian Male");
      }
    }
    else if(keyScore == 1 && dragChestOpen == false){
      $(`#treasureChest-mini-game`).dialog(`open`);
      treasureDialogActive = true;
      if(annyangChestOpen == false){
        responsiveVoice.speak(`Ye have 30 seconds to say as many words correctly as they appear on the chest!`,"Australian Male");
      }
      else if(annyangChestOpen == true){
        responsiveVoice.speak(`That loot chest was already opened, let's get a move on to the next one already!`,"Australian Male");
      }
    }
    else if(keyScore == 1 && dragChestOpen == true) {
      $(`#need-keys-dialog`).dialog(`open`);
      responsiveVoice.speak(document.getElementById("need-keys-dialog").textContent,"Australian Male");
    }
    else if(keyScore == 0){
      $(`#need-keys-dialog`).dialog(`open`);
      responsiveVoice.speak(document.getElementById("need-keys-dialog").textContent,"Australian Male");
    }

  }

  openDragMiniGame(avatar, chestLayer){
    if(keyScore == 2){
      $(`#treasureDrag-mini-game`).dialog(`open`);
      dragDialogActive = true;
      if(dragChestOpen == false){
        responsiveVoice.speak(`Find the 8 hidden letters, and drag 'em in the box`, "Australian Male");
      }
      else if(dragChestOpen == true){
        responsiveVoice.speak(`That loot chest was already opened, let's get a move on to the next one already!`,"Australian Male");
      }
    }
    else if(keyScore == 1 && annyangChestOpen == false){
      $(`#treasureDrag-mini-game`).dialog(`open`);
      dragDialogActive = true;
      if(dragChestOpen == false){
        responsiveVoice.speak(`Find the 8 hidden letters, and drag 'em in the box`, "Australian Male");
      }
      else if(dragChestOpen == true){
        responsiveVoice.speak(`That loot chest was already opened, let's get a move on to the next one already!`,"Australian Male");
      }
    }
    else if(keyScore == 1 && annyangChestOpen == true) {
      $(`#need-keys-dialog`).dialog(`open`);
      responsiveVoice.speak(document.getElementById("need-keys-dialog").textContent,"Australian Male");
    }
    else if(keyScore == 0){
      $(`#need-keys-dialog`).dialog(`open`);
      responsiveVoice.speak(document.getElementById("need-keys-dialog").textContent,"Australian Male");
    }
  }


  /*
  Here I create the animations for the avatar walking
*/
  createAnimations() {
    this.anims.create({
      key: `avatar-moving-up`,
      frames: this.anims.generateFrameNumbers(`avatar`, {
        start: 0,
        end: 8,
      }),
      frameRate: 12,
      repeat: -1,
    });
    this.anims.create({
      key: `avatar-moving-left`,
      frames: this.anims.generateFrameNumbers(`avatar`, {
        start: 9,
        end: 17,
      }),
      frameRate: 12,
      repeat: -1,
    });
    this.anims.create({
      key: `avatar-moving-down`,
      frames: this.anims.generateFrameNumbers(`avatar`, {
        start: 18,
        end: 26,
      }),
      frameRate: 12,
      repeat: -1,
    });
    this.anims.create({
      key: `avatar-moving-right`,
      frames: this.anims.generateFrameNumbers(`avatar`, {
        start: 27,
        end: 35,
      }),
      frameRate: 12,
      repeat: -1,
    });
    this.anims.create({
      key: `avatar-idle`,
      frames: this.anims.generateFrameNumbers(`avatar`, {
        start: 18,
        end: 18,
      }),
      frameRate: 12,
      repeat: -1,
    });
  }

  /*
  Constantly checking if the arrow keys are being pressed
*/
  update() {
    this.handleInput();
  }

  /*
  Changes the velocity of the avatar's movements depending on which arrow key
  is being pressed. Also changes the animations depending on which key is being
  pressed.

  To Do:
    - Add an animation for when L/R arrow key is clicked WITH U/D arrow key
*/
  handleInput() {
    // Left & right arrow keys
    if (this.cursors.left.isDown) {
      this.avatar.setVelocityX(-100);
    } else if (this.cursors.right.isDown) {
      this.avatar.setVelocityX(100);
    } else {
      this.avatar.setVelocityX(0);
    }

    // Up & Down arrow keys
    if (this.cursors.up.isDown) {
      this.avatar.setVelocityY(-100);
    } else if (this.cursors.down.isDown) {
      this.avatar.setVelocityY(100);
    } else {
      this.avatar.setVelocityY(0);
    }

    // Changing the animations (L,R,U,D)
    if (
      this.avatar.body.velocity.x !== 0 ||
      this.avatar.body.velocity.y !== 0
    ) {
      if (this.avatar.body.velocity.x < 0) {
        this.avatar.play(`avatar-moving-left`, true);
      } else if (this.avatar.body.velocity.x > 0) {
        this.avatar.play(`avatar-moving-right`, true);
      } else if (
        this.avatar.body.velocity.x < 0 &&
        (this.avatar.body.velocity.y < 0 || this.avatar.body.velocity.y > 0)
      ) {
        this.avatar.play(`avatar-moving-left`, true);
      } else if (
        this.avatar.body.velocity.x > 0 &&
        (this.avatar.body.velocity.y < 0 || this.avatar.body.velocity.y > 0)
      ) {
        this.avatar.play(`avatar-moving-right`, true);
      }
      if (this.avatar.body.velocity.y < 0) {
        this.avatar.play(`avatar-moving-up`, true);
      } else if (this.avatar.body.velocity.y > 0) {
        this.avatar.play(`avatar-moving-down`, true);
      }
    }
    // Default animation
    else {
      this.avatar.play(`avatar-idle`, true);
    }
  }
}
