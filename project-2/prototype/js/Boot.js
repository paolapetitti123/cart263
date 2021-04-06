class Boot extends Phaser.Scene {
  constructor(){
    super({
      key: `boot`
    });
  }

  preload(){
    this.load.image(`background`, `assets/images/pirateship-01.png`);


    this.load.audio(`bgMusic`, [`assets/sounds/Im_The_One.mp3`]);
    // this.load.spritesheet(`avatar`, `assets/images/avatar.png`, {
    //   frameWidth: 64,
    //   frameHeight: 64,
    //   endFrame: 35
    // });

    this.load.on(`complete`, () => {
      this.scene.start(`play`);
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
