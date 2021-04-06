class Play extends Phaser.Scene {
  constructor(){
    super({
      key: `play`
    });
  }

  create(){
    this.background = this.add.image(640,360,`background`);


    // this.avatar = this.add.sprite(300,300,`avatar`);
    // this.createAnimations();
    // this.avatar.play(`avatar-idle`);
  }

  createAnimations(){
    this.anims.create({
      key: `avatar-moving-up`,
      frame: this.anims.generateFrameNumbers(`avatar`, {
        start: 0,
        end: 8
      }),
      frameRate: 12,
      repeat: -1
    });
    this.anims.create({
      key: `avatar-moving-left `,
      frame: this.anims.generateFrameNumbers(`avatar`, {
        start: 9,
        end: 17
      }),
      frameRate: 12,
      repeat: -1
    });
    this.anims.create({
      key: `avatar-moving-down`,
      frame: this.anims.generateFrameNumbers(`avatar`, {
        start: 18,
        end: 26
      }),
      frameRate: 12,
      repeat: -1
    });this.anims.create({
      key: `avatar-moving-right`,
      frame: this.anims.generateFrameNumbers(`avatar`, {
        start: 27,
        end: 35
      }),
      frameRate: 12,
      repeat: -1
    });
    this.anims.create({
      key: `avatar-idle`,
      frame: this.anims.generateFrameNumbers(`avatar`, {
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
