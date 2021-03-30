/**
Desperately Seeking Sadness Activity
Paola Petitti

Following along the video for the activity!
*/

"use strict";

let config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {default:`arcade`},
  scene: [Boot,Play]
};

let game = new Phaser.Game(config);
