const { io } = require('../../http');

io.on('client-connection', (args) => {
  console.log(args);
});

io.on('envia-para-servidor', (args) => {
  io.broadcast.emit('send-control', args);
});
