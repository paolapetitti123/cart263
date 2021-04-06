class Play extends Phaser.Scene {
  constructor(){
    super({
      key: `play`
    });
  }

  create(){
    this.background = this.add.image(640,360,`background`);


    this.avatar = this.add.sprite(400,500,`avatar`).setScale(2.5,2.5);
    this.createAnimations();
    this.avatar.play(`avatar-idle`);
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
      key: `avatar-moving-left `,
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
    });this.anims.create({
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

  }
}
