class Play extends Phaser.Scene {
  constructor(){
    super({
      key: `play`
    });
  }

  create(){
    this.background = this.add.image(640,360,`background`);


    this.avatar = this.physics.add.sprite(400,500,`avatar`).setScale(2.5,2.5);
    this.avatar.setCollideWorldBounds(true);
    this.createAnimations();
    this.avatar.play(`avatar-idle`);

    this.cursors = this.input.keyboard.createCursorKeys();
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
