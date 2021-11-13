/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable no-shadow */
const url = `${window.location.protocol}//${window.location.hostname}:${window.location.port}`;
const socket = io(`${url}/controller`);

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
  window.location.href = '/home'; // redirect to home page
});
