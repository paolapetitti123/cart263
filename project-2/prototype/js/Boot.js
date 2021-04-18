class Boot extends Phaser.Scene {
  constructor(){
    super({
      key: `boot`
    });
  }

/*
  Loading all the images, spritesheets, audio and the tilemap json file
*/
  preload(){
    this.load.image(`background`, `assets/images/boat-01.png`);
    this.load.image(`furniture1`, `assets/images/furniture-2-24x24-5x5-sheet.png`);
    this.load.image(`furniture2`, `assets/images/furniture-24x24-5x4-sheet.png`);
    this.load.image(`furniture3`, `assets/images/shrines-altars-24x24-5x4-sheet.png`);
    this.load.image(`tileSheet`, `assets/images/tilesheet.png`);
    this.load.image(`chests`, `assets/images/chests (1).png`);
    this.load.image(`destructible`, `assets/images/Destructible Objects Sprite Sheet.png`);
    this.load.image(`barrel`, `assets/images/Barrel.png`);
    this.load.image(`water`, `assets/images/water.png`);
    this.load.image(`key`, `assets/images/PP4_Prancheta 1.png`);

    this.load.tilemapTiledJSON(`map`, `assets/maps/boat.json`);
    this.load.on(`complete`, () => {
      this.scene.start(`play`);
    });

    this.load.audio(`bgMusic`, [`assets/sounds/Im_The_One.mp3`]);
    this.load.spritesheet(`avatar`, `assets/images/avatarSheet.png`, {
      frameWidth: 63,
      frameHeight: 60,
      endFrame: 35
    });

    


  }

/*
  This is supposed to show a loading message, gotta figure out what I'm doing
  wrong here.
*/
  create(){
    let style = {
      fontFamily: 'sans-serif',
      fontSize: `40px`,
      color: '#ffffff'
    }
    let loadString = `Loading...`;
    this.add.text(640,360,loadString,style);
  }


  update(){

  }
}
