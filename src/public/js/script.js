// eslint-disable-next-line no-undef
const socket = io();

socket.on('connect', () => {
  socket.emit('client-connection');
});
