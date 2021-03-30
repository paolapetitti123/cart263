class Play extends Phaser.Scene {
  constructor(){
    super({
      key: `play`
    });
  }

  create(){
    let style = {
      fontFamily: 'sans-serif',
      fontSize: `40px`,
      color: '#ffffff'
    }
    let gameDescription = `Look a Sprite and Image!`;
    this.add.text(150,100,gameDescription,style);
    this.wall = this.add.image(400,300,`wall`);
    this.wall.setTint(0xdd3333);

    this.avatar = this.add.sprite(300,300,`avatar`);
    this.createAnimations();
    this.avatar.play(`avatar-idle`);
  }

  createAnimations(){
    this.anims.create({
      key: `avatar-moving`,
      frames: this.anims.generateFrameNumbers(`avatar`,{
        start: 0,
        end: 6
      }),
      frameRate: 12,
      repeat: -1
    });
    this.anims.create({
      key: `avatar-idle`,
      frames: this.anims.generateFrameNumbers(`avatar`,{
        start: 0,
        end: 0
      }),
      frameRate: 12,
      repeat: 0
    });
  }

  update(){

  }

}
