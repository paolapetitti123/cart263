class Boot extends Phaser.Scene {
  constructor() {
    super({
      key: `boot`
    });
  }

  preload(){
    // Loading Assets
    this.load.image(`avatar`, `assets/images/avatar.png`);
    this.load.image(`thumbsDown`, `assets/images/thumbsdown.png`);
    this.load.image(`thumbsUp`, `assets/images/thumbs-up.png`);

    this.load.on(`complete`, () => {
      this.scene.start(`play`);
    });
  }

  create(){

  }

  update(){

  }
}
