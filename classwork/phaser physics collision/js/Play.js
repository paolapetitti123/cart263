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


    this.walls = this.physics.add.group({
      key: `wall`,
      immovable: true,
      quantity: 24
    });

    this.walls.children.each(function(wall){
      let x = Math.random() * this.sys.canvas.width;
      let y = Math.random() * this.sys.canvas.height;
      wall.setPosition(x,y);
      wall.setTint(0xdd3333);
    },this);


    this.collectables = this.physics.add.group({
      key: `wall`,
      quantity: 100
    });

    this.collectables.children.each(function(collectable){
      let x = Math.random() * this.sys.canvas.width;
      let y = Math.random() * this.sys.canvas.height;
      collectable.setPosition(x,y);
      collectable.setTint(0x33dd33);
    },this);

    this.avatar = this.physics.add.sprite(400,400,`avatar`);
    this.createAnimations();
    this.avatar.play(`avatar-idle`);
    this.avatar.setCollideWorldBounds(true);

    this.physics.add.collider(this.avatar, this.walls);
    this.physics.add.overlap(this.avatar, this.collectables, this.collectItem, null,this);

    this.cursors = this.input.keyboard.createCursorKeys();
  }

  collectItem(avatar, collectable){
    collectable.destroy();
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
