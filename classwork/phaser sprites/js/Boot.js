class Boot extends Phaser.Scene {
  constructor(){
    super({
      key: `boot`
    });
  }

  preload(){
    this.load.image(`wall`,`assets/images/wall.png`);

    this.load.on(`complete`, () => {
      this.scene.start(`play`);
    });
    this.load.spritesheet(`avatar`,`assets/images/avatar.png`, {
      frameWidth: 32,
      frameHeight: 32,
      endFrame: 6
    });
  }

  create(){
    let style = {
      fontFamily: 'sans-serif',
      fontSize: `40px`,
      color: '#ffffff'
    }
    let loadString = `Loading...`;
    this.add.text(100,100,loadString,style);
  }

  update(){

  }
}
