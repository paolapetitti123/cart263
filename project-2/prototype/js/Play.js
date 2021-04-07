class Play extends Phaser.Scene {
  constructor(){
    super({
      key: `play`
    });
  }

  create(){

    this.avatar = this.physics.add.sprite(400,500,`avatar`);
    this.avatar.setCollideWorldBounds(true);
    this.createAnimations();
    this.avatar.play(`avatar-idle`);
    this.createTileMap();


    this.cursors = this.input.keyboard.createCursorKeys();
  }

/*
  Been following this youtube tutorial but tweaking it every so often to the new
  code since some of it is a little outdated:
  https://www.youtube.com/watch?v=uznkhVMbVr8&ab_channel=jestarray
*/
  createTileMap(){
    let mappy = this.add.tilemap(`map`);
    let boat = mappy.addTilesetImage(`boat-01`, `background`);
    let chests = mappy.addTilesetImage(`chests (1)`, `chests`);
    let destructible = mappy.addTilesetImage(`Destructible Objects Sprite Sheet`, `destructible`);
    let furniture1 = mappy.addTilesetImage(`furniture-2-24x24-5x5-sheet`, `furniture1`);
    let furniture2 = mappy.addTilesetImage(`furniture-24x24-5x4-sheet`, `furniture2`);
    let furniture3 = mappy.addTilesetImage(`shrines-altars-24x24-5x4-sheet`, `furniture3`);
    let tilesheet = mappy.addTilesetImage(`tilesheet`, `tilesheet`);
    let barrel = mappy.addTilesetImage(`Barrel`, `barrel`);
    let water = mappy.addTilesetImage(`water`, `water`);


    // layers
    let waterLayer = mappy.createLayer(`Water`, [water]).setDepth(-1);
    let boatLayer = mappy.createLayer(`Boat`, [boat]).setDepth(-1);
    let polesLayer = mappy.createLayer(`Poles`, [furniture1]).setDepth(1);
    let destructibleLayer = mappy.createLayer(`Debris`, [destructible]).setDepth(-1);

    let barrelLayer = mappy.createLayer(`barrel`, [barrel]).setDepth(-1);
    let swordLayer = mappy.createLayer(`Swords`, [furniture2]).setDepth(-1);
    let tableLayer = mappy.createLayer(`Tables`, [furniture2]).setDepth(-1);
    let decoLayer = mappy.createLayer(`Deco`, [furniture1,furniture2]).setDepth(-1);
    let binLayer = mappy.createLayer(`Bin`, [furniture2]).setDepth(-1);
    let flagLayer = mappy.createLayer(`Flag`, [furniture1]).setDepth(-1);
    let chestLayer = mappy.createLayer(`Chest`, [chests]).setDepth(-1);


    // map collisions
    this.physics.add.collider(this.avatar, binLayer);
    this.physics.add.collider(this.avatar, chestLayer);
    this.physics.add.collider(this.avatar, decoLayer);
    this.physics.add.collider(this.avatar, tableLayer);
    this.physics.add.collider(this.avatar, swordLayer);
    this.physics.add.collider(this.avatar, barrelLayer);
    // this.physics.add.collider(this.avatar, polesLayer);

    chestLayer.setCollisionByExclusion(-1,true);
    binLayer.setCollisionByExclusion(-1,true);
    decoLayer.setCollisionByExclusion(-1,true);
    tableLayer.setCollisionByExclusion(-1,true);
    swordLayer.setCollisionByExclusion(-1,true);
    barrelLayer.setCollisionByExclusion(-1,true);
    polesLayer.setCollisionByExclusion(-1,true);


  }


  createAnimations(){
    this.anims.create({
      key: `avatar-moving-up`,
      frames: this.anims.generateFrameNumbers(`avatar`, {
        start: 0,
        end: 8
      }),
      frameRate: 12,
      repeat: -1
    });
    this.anims.create({
      key: `avatar-moving-left`,
      frames: this.anims.generateFrameNumbers(`avatar`, {
        start: 9,
        end: 17
      }),
      frameRate: 12,
      repeat: -1
    });
    this.anims.create({
      key: `avatar-moving-down`,
      frames: this.anims.generateFrameNumbers(`avatar`, {
        start: 18,
        end: 26
      }),
      frameRate: 12,
      repeat: -1
    });
    this.anims.create({
      key: `avatar-moving-right`,
      frames: this.anims.generateFrameNumbers(`avatar`, {
        start: 27,
        end: 35
      }),
      frameRate: 12,
      repeat: -1
    });
    this.anims.create({
      key: `avatar-idle`,
      frames: this.anims.generateFrameNumbers(`avatar`, {
        start: 18,
        end: 18
      }),
      frameRate: 12,
      repeat: -1
    });
  }

  update(){
    this.handleInput();
  }

  handleInput(){
    // Left & right arrow keys
    if(this.cursors.left.isDown){
      this.avatar.setVelocityX(-100);
    }
    else if (this.cursors.right.isDown){
      this.avatar.setVelocityX(100);
    }
    else {
      this.avatar.setVelocityX(0);
    }

    // Up & Down arrow keys
    if(this.cursors.up.isDown){
      this.avatar.setVelocityY(-100);
    }
    else if(this.cursors.down.isDown){
      this.avatar.setVelocityY(100);
    }
    else {
      this.avatar.setVelocityY(0);
    }

    // Changing the animations (L,R,U,D)
    if(this.avatar.body.velocity.x !== 0 || this.avatar.body.velocity.y !== 0){
      if(this.avatar.body.velocity.x < 0){
        this.avatar.play(`avatar-moving-left`, true);
      }
      else if(this.avatar.body.velocity.x > 0){
        this.avatar.play(`avatar-moving-right`, true);
      }
      else if(this.avatar.body.velocity.x < 0 && (this.avatar.body.velocity.y < 0 || this.avatar.body.velocity.y > 0)){
        this.avatar.play(`avatar-moving-left`, true);
      }
      else if(this.avatar.body.velocity.x > 0 && (this.avatar.body.velocity.y < 0 || this.avatar.body.velocity.y > 0)){
        this.avatar.play(`avatar-moving-right`, true);
      }
      if(this.avatar.body.velocity.y < 0){
        this.avatar.play(`avatar-moving-up`,true);
      }
      else if(this.avatar.body.velocity.y > 0){
        this.avatar.play(`avatar-moving-down`,true);
      }
    }
    // Default animation
    else {
      this.avatar.play(`avatar-idle`, true);
    }

  }
}
