/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable no-shadow */
const url = `${window.location.protocol}//${window.location.hostname}:${window.location.port}`;
const socket = io(`${url}/controller`);

let transitionCompleted = true;

/**
 * Function responsible to send an offset to socket server using
 * socket to emit this event. The event only be send when the controller
 * is able to send a new transition.
 *
 * @param {int} value Offset to be send on socket event.
 *
 * @author Gabriel Nogueira
 */
function sendOffSetController(value) {
  if (transitionCompleted) {
    socket.emit('sendOffSetController', value);
    transitionCompleted = false;
  }
}

// When socket server send the information about transition completed on all pages
socket.on('transitionCompleted', () => {
  // Enabling the controller to send a new offset (transition)
  transitionCompleted = true;
});

// Creating an event to listen click on button left (<)
document.querySelector('#button-left').addEventListener('click', (event) => {
  sendOffSetController(-1);
});

// Creating an event to listen click on button big left (<<)
document.querySelector('#button-big-left').addEventListener('click', (event) => {
  sendOffSetController(-2);
});

// Creating an event to listen click on button right (>)
document.querySelector('#button-right').addEventListener('click', (event) => {
  sendOffSetController(1);
});

// Creating an event to listen click on button big right (>>)
document.querySelector('#button-big-right').addEventListener('click', (event) => {
  sendOffSetController(2);
});

// Creating an event to listen click on button home
document.querySelector('#button-home').addEventListener('click', (event) => {
  // Reset offset of controller to inicial country of instance page
  sendOffSetController(0);
  // Redirec to home page
  window.location.href = '/home';
});
