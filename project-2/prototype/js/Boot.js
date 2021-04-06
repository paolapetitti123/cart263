class Boot extends Phaser.Scene {
  constructor(){
    super({
      key: `boot`
    });
  }

  preload(){
    this.load.image(`background`, `assets/images/pirateship-01.png`);

    this.load.on(`complete`, () => {
      this.scene.start(`play`);
    });
    
    this.load.audio(`bgMusic`, [`assets/sounds/Im_The_One.mp3`]);
    this.load.spritesheet(`avatar`, `assets/images/avatarTest.png`, {
      frameWidth: 63,
      frameHeight: 60,
      endFrame: 35
    });


  }

  create(){
    let style = {
      fontFamily: 'sans-serif',
      fontSize: `40px`,
      color: '#00000'
    }
    let loadString = `Loading...`;
    this.add.text(100,100,loadString,style);
  }


  update(){

  }
}
