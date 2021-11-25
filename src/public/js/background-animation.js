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

const base = '../assets/images/bg-images/';
const secs = 5;

function backgroundSequence() {
  window.clearTimeout();
  let pos = 0;

  for (let i = 0; i < bgImageArray.length; i++) {
    setTimeout(() => {
      document.getElementById('container').style.backgroundImage = `url(${base}${bgImageArray[pos]})`;

      if ((pos + 1) === bgImageArray.length) {
        setTimeout(() => { backgroundSequence(); }, (secs * 1000));
      } else {
        pos++;
      }
    }, (secs * 1000) * i);
  }
}
backgroundSequence();
