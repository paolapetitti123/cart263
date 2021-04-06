class Boot extends Phaser.Scene {
  constructor(){
    super({
      key: `boot`
    });
  }

  preload(){
    this.load.image(`background`, `assets/images/pirateship-01.png`);
    this.load.audio(`bgMusic`, [`assets/sounds/Im_The_One.mp3`]);
    this.load.spritesheet(`avatar`, `assets/images/avatar.png`, {
      rameWidth: 32,
      frameHeight: 32,
      endFrame: 35
    });
    this.load.on(`complete`, () => {
      this.scene.start(`play`);
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
