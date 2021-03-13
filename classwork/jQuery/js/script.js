/**
Following along jQuery video
Paola Petitti
*/

"use strict";

// Get the <h1> element by its id and store it in a variable
let $mainHeading = $(`#main-heading`);
// Set its color property using the .css() method
$(`#main-heading`).css({
  "color": `#339966`,
  "font-size": `5rem`,
  "font-family": `Helvetica, sans-serif`,
  "background-color": `#000000`
});

/// This code causes jQuery to search for every element matching .header once
// let $headers = $(`.header`);
// $headers.css(`color`,`red`);
// $headers.css(`background-color`,`black`);
// $headers.css(`font-size`,`3rem`);


// Get the current text in the span
let spanText = $(`#example-span`).text();
// Reverse it
let reverseSpanText = spanText.split(``).reverse().join(``);
// Set the span's text to the reversed version
$(`#example-span`).text(reverseSpanText);

// Get the HTML content of the span
let spanHTML = $(`#example-span`).html();
// Set the HTML content of the span as the original content wrapped in a <strong> tag
$(`#example-span`).html(`<strong>${spanHTML}</strong>`);

$(`#main-heading`).attr(`contenteditable`, `true`);

if ($(`#thicc-link`).attr(`href`) === `https://thi.cc`) {
  $(`#thicc-link`).text(`thicc, thicc link`);
}


// Create a <p> element
let $newP = $(`<p></p>`);
// Set the text inside the new <p> element so it has something to say!
$newP.text(`Hot off the presses!`);
// Add it to the second section (selected by id)
$(`#second-section`).append($newP);

// removes the heading
$(`#main-heading`).remove();
