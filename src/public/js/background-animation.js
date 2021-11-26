/* eslint-disable no-plusplus */
/* eslint-disable no-loop-func */
/* eslint-disable no-undef */
const bgImageArray = [
  'germany.jpeg',
  'brazil.jpg',
  'mexico.jpg',
  'china.jpg',
  'italy.jpg',
  'usa.jpg',
];

// Pattern way to the background images
const base = '../assets/images/bg-images/';
// Interval between image exchange
const secs = 5;

/**
 * Function that does the exchange of images through CSS property 'background-image',
 * exchanging between images declared at vector 'bgImageArray' according to the gap defined in 'secs'
 */
function backgroundSequence() {
  window.clearTimeout();
  let pos = 0;

  // Loop that will go through the images declared at vector 'bgImageArray'
  for (let i = 0; i < bgImageArray.length; i++) {
    // Defining the waiting break to exchange images
    setTimeout(() => {
      document.getElementById('container').style.backgroundImage = `url(${base}${bgImageArray[pos]})`;

      // When getting to the end of the vector, the function is again called and done again (recursion)
      if ((pos + 1) === bgImageArray.length) {
        setTimeout(() => { backgroundSequence(); }, (secs * 1000));
      } else {
        pos++;
      }
    }, (secs * 1000) * i);
  }
}
backgroundSequence();
