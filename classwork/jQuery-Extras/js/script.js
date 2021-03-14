/**
jQuery Extras
Paola Petitti
*/

"use strict";

$(`.header`).each(function(event) {
  let reverseText = $(this).text().split(``).reverse().join(``);
  $(this).text(reverseText);
});
