class Boot extends Phaser.Scene {
  constructor(){
    super({
      key: `boot`
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

    this.scene.start(`play`);
  }

  update(){

  }
}
