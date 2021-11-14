/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable no-shadow */
const url = `${window.location.protocol}//${window.location.hostname}:${window.location.port}`;
const socket = io(`${url}/controller`);

let transitionCompleted = true;

function sendOffSetController(value) {
  if(transitionCompleted){
    socket.emit('sendOffSetController', value);
    transitionCompleted = false;
  }
}

socket.on('transitionCompleted', () => {
  transitionCompleted = true;
});

document.querySelector('#button-left').addEventListener('click', (event) => {
  sendOffSetController(-1);
});

document.querySelector('#button-big-left').addEventListener('click', (event) => {
  sendOffSetController(-2);
});

document.querySelector('#button-right').addEventListener('click', (event) => {
  sendOffSetController(1);
});

document.querySelector('#button-big-right').addEventListener('click', (event) => {
  sendOffSetController(2);
});

document.querySelector('#button-home').addEventListener('click', (event) => {
  sendOffSetController(0);
  window.location.href = '/home'; // redirect to home page
});
