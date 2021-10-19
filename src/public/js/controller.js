/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable no-shadow */
const socket = io('http://localhost:3000/controller');

let count = 0;

function sendOffset(value) {
  console.log(value);
}

document.querySelector('#button-left').addEventListener('click', (event) => {
  count -= 1;
  changeDisplayValue(count);
});

document.querySelector('#button-big-left').addEventListener('click', (event) => {
  count -= 2;
  changeDisplayValue(count);
});

document.querySelector('#button-right').addEventListener('click', (event) => {
  count += 1;
  changeDisplayValue(count);
});

document.querySelector('#button-big-right').addEventListener('click', (event) => {
  count += 2;
  changeDisplayValue(count);
});

document.querySelector('#button-home').addEventListener('click', (event) => {
  count *= 0;
  changeDisplayValue(count);
});
