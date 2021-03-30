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
    this.wall = this.physics.add.image(400,300,`wall`);
    this.wall.setTint(0xdd3333);

    this.avatar = this.physics.add.sprite(300,300,`avatar`);
    this.createAnimations();
    this.avatar.play(`avatar-idle`);
    this.avatar.setCollideWorldBounds(true);

    this.cursors = this.input.keyboard.createCursorKeys();
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
    this.avatar.setVelocity(0);

    if(this.cursors.left.isDown){
      this.avatar.setVelocityX(-300);
    }
    else if(this.cursors.right.isDown){
      this.avatar.setVelocityX(300);
    }

    if(this.cursors.up.isDown){
      this.avatar.setVelocityY(-300);
    }
    else if(this.cursors.down.isDown){
      this.avatar.setVelocityY(300);
    }

    if(this.avatar.body.velocity.x !== 0 || this.avatar.body.velocity.y !== 0){
      this.avatar.play(`avatar-moving`, true);
    }
    else {
      this.avatar.play(`avatar-idle`, true);
    }
  }

}
