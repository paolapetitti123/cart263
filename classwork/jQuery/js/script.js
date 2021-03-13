/**
Following along jQuery video
Paola Petitti
*/

"use strict";

// Get the <h1> element by its id and store it in a variable
let $mainHeading = $(`#main-heading`);
// Set its color property using the .css() method
$mainHeading.css(`color`, `#339966`);


/// This code causes jQuery to search for every element matching .header once
let $headers = $(`.header`);
$headers.css(`color`,`red`);
$headers.css(`background-color`,`black`);
$headers.css(`font-size`,`3rem`);
