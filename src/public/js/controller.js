/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable no-shadow */
const socket = io('http://localhost:3000/controller');

let count = 0;

function sendOffSetController(value) {
  console.log(`offSetController: ${count}`);
  console.log(`moviment: ${value}`);
  socket.emit('sendOffSetController', value);
}

document.querySelector('#button-left').addEventListener('click', (event) => {
  count -= 1;
  sendOffSetController(-1);
});

document.querySelector('#button-big-left').addEventListener('click', (event) => {
  count -= 2;
  sendOffSetController(-2);
});

document.querySelector('#button-right').addEventListener('click', (event) => {
  count += 1;
  sendOffSetController(1);
});

document.querySelector('#button-big-right').addEventListener('click', (event) => {
  count += 2;
  sendOffSetController(2);
});

document.querySelector('#button-home').addEventListener('click', (event) => {
  count *= 0;
  sendOffSetController(0);
});
