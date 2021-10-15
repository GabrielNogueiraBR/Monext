/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable no-shadow */
const socket = io();

let count = 0;

function changeDisplayValue(value) {
  $('.testeController').text(value);
  // socket.emit('newDisplayValue', value);
}

$('.button-left').on('click', (event) => {
  count -= 1;
  changeDisplayValue(count);
});

$('.button-big-left').on('click', (event) => {
  count -= 2;
  changeDisplayValue(count);
});

$('.button-right').on('click', (event) => {
  count += 1;
  changeDisplayValue(count);
});

$('.button-big-right').on('click', (event) => {
  count += 2;
  changeDisplayValue(count);
});

$('.button-home').on('click', (event) => {
  count *= 0;
  changeDisplayValue(count);
});

// socket.on('changeDisplayValue', (value) => changeDisplayValue(value));
