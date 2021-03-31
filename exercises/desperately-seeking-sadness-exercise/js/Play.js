class Play extends Phaser.Scene {
  constructor(){
    super({
      key: `play`
    });
  }

  create(){
    // clown horn
    let clownSound = this.sound.add(`clownHorn`);

    // Creating the avatar
    this.avatar = this.physics.add.sprite(400,300,`avatar`);
    this.avatar.setCollideWorldBounds(true);

    let x = Math.random() * this.sys.canvas.width;
    let y = Math.random() * this.sys.canvas.height;
    this.sadness = this.physics.add.sprite(x,y,`thumbsDown`);
    this.sadness.setCollideWorldBounds(true);

    this.happiness = this.physics.add.group({
      key: `thumbsUp`,
      quantity: 50,
      bounceX: 1,
      bounceY: 1,
      collideWorldBounds: true,
      dragX: 50,
      dragY: 50
    });

    this.happiness.setVelocityX(-1,10);
    this.happiness.setVelocityY(-1,10);

    this.clown = this.physics.add.group({
      key: `clown`,
      quantity: 10,
      bounceX: 0.5,
      bounceY: 0.5,
      collideWorldBounds: true,
      dragX: 50,
      dragY: 50
    });

    Phaser.Actions.RandomRectangle(this.happiness.getChildren(), this.physics.world.bounds);
    Phaser.Actions.RandomRectangle(this.clown.getChildren(), this.physics.world.bounds);

    this.physics.add.overlap(this.avatar, this.sadness, this.getSad, null, this);
    this.physics.add.overlap(this.avatar, this.clown, this.getClown, null, this);
    this.physics.add.collider(this.avatar, this.happiness);
    this.physics.add.collider(this.happiness, this.happiness);
    this.physics.add.collider(this.happiness, this.clown);
    this.physics.add.collider(this.sadness, this.happiness);
    this.physics.add.collider(this.sadness, this.clown);


    this.cursors = this.input.keyboard.createCursorKeys();
  }
  // This function allows the user to collect the clown emojis and they are
  // immediately moved to a new location.
  getSad(avatar, sadness){
    let x = Math.random() * this.sys.canvas.width;
    let y = Math.random() * this.sys.canvas.height;
    this.sadness.setPosition(x,y);
  }

  // This function allows the user to collect the clown emojis and they are
  // immediately destroyed.
  getClown(avatar, clown){
    let clownSound = this.sound.add(`clownHorn`);
    clown.destroy();
    clownSound.play();
  }

  update(){
    if(this.cursors.left.isDown){
      this.avatar.setAngularVelocity(-150);
    }
    else if(this.cursors.right.isDown){
      this.avatar.setAngularVelocity(150);
    }
    else {
      this.avatar.setAngularVelocity(0);
    }
    if(this.cursors.up.isDown){
      this.physics.velocityFromRotation(this.avatar.rotation, 600, this.avatar.body.acceleration);
    }
    else{
      this.avatar.setAcceleration(0);
    }


  }
}
