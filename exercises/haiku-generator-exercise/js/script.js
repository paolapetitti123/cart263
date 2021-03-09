/**
Haiku Generator
Paola Petitti

Does what you think it would by the title.
*/

"use strict";
// Arrays for the haiku lines
let fiveSyllableLines = [
  `O, to be a tree`,
  `The cat does not know`,
  `We are all forests`,
  `You have done your best`,
  `They are all gone now`
];
let sevenSyllableLines = [
  `Say the things left unsaid`,
  `Never believe the wind's lies`,
  `The autumn stretches its legs`,
  `Nothing can satisfy you`,
  `They will not come back again`
];
let titleLine = [
  `Sword of Victory`,
  `Danger`,
  `Quasi Una Fantasia`,
  `Checkmate`,
  `Catching Fire`
];


// Text related variable declarations
let line1 = random(fiveSyllableLines);
let line2 = random(sevenSyllableLines);
let line3 = random(fiveSyllableLines);
let haikuTitle = random(titleLine);

// Getting the elements from the HTML
let line1P = document.getElementById(`line-1`);
let line2P = document.getElementById(`line-2`);
let line3P = document.getElementById(`line-3`);
let h1Title = document.getElementById(`title`);

// Setting the text to the appropriate variables.
line1P.innerText = line1;
line2P.innerText = line2;
line3P.innerText = line3;
h1Title.innerText = haikuTitle;

// adding click event listenters to the text to change when clicked.
line1P.addEventListener(`click`, lineClicked);
line2P.addEventListener(`click`, lineClicked);
line3P.addEventListener(`click`, lineClicked);

// button to change the background
let button = document.getElementById(`background-button`);
let textVisible = document.getElementById("haiku");
textVisible.style.display = "none";

/*
  This event listener checks what the title of the haiku is,
  then according to the title it changes the background color, text color
  and adds tiled gif that loops in the background while also displaying
  the text
*/
button.addEventListener(`click`,function(event) {
  textVisible.style.display = "block";
  if(haikuTitle === `Quasi Una Fantasia`){
    document.body.background = "assets/images/cherryblossom.gif";
    document.body.style[`background-color`] = `#b3fffb`;
  }
  else if(haikuTitle === `Sword of Victory`){
    document.body.background = "assets/images/sword.gif";
    document.body.style[`background-color`] = `#000000`;
    document.body.style[`color`] = `#ffffff`;
  }
  else if(haikuTitle === `Danger`){
    document.body.background = "assets/images/danger.gif";
    document.body.style[`background-color`] = `#eb8c34`;
    document.body.style[`color`] = `#ffffff`;
  }
  else if(haikuTitle === `Checkmate`){
    document.body.background = "assets/images/chess.gif";
    document.body.style[`background-color`] = `#000000`;
    document.body.style[`color`] = `#ffffff`;
  }
  else if(haikuTitle === `Catching Fire`){
    document.body.background = "assets/images/fire.gif";
    document.body.style[`background-color`] = `#000000`;
    document.body.style[`color`] = `#ffffff`;
  }
});

// If a line is clicked, the fadeout function is called
function lineClicked(event){
  fadeOut(event.target, 1);
}

// lowers the opacity of the line you clicked and makes a new line fade in
function fadeOut(element, opacity) {
  opacity -= 0.01;
  element.style[`opacity`] = opacity;
  if(opacity > 0){
    requestAnimationFrame(function(){
      fadeOut(element, opacity);
    });
  }
  else {
    setNewLine(element);
    fadeIn(element,0);
  }
}

// Gets the new line to fade in by increasing the opacity
function fadeIn(element, opacity) {
  opacity += 0.01;
  element.style[`opacity`] = opacity;
  if(opacity < 1){
    requestAnimationFrame(function(){
      fadeIn(element, opacity);
    });
  }
  else {
    // well come back here
  }
}

// Changes the line of text you clicked on
function setNewLine(element) {
  if(element === line1P || element === line3P) {
    element.innerText = random(fiveSyllableLines);
  }
  else if(element === line2P){
    element.innerText = random(sevenSyllableLines);
  }
}

// returns a random number of the array that got sent over.
function random(array) {
  let index = Math.floor(Math.random() * array.length);
  return array[index];
}
