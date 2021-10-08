/* eslint-disable no-console */
const express = require('express');
const path = require('path');

const app = express();
const http = require('http');

const server = http.createServer(app);
const { Server } = require('socket.io');

const io = new Server(server);

const port = 3000;

app.use(express.static(path.join(__dirname, '/public')));
app.set('views', path.join(__dirname, '/public', '/views'));
app.engine('html', require('ejs').renderFile);

app.get('/', (req, res) => {
  res.render('index.html');
});

app.get('/controller', (req, res) => {
  res.render('controller.html');
});

io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on('client-connection', (args) => {
    console.log(args);
  });

  socket.on('envia-para-servidor', (args) => {
    socket.broadcast.emit('send-control', args);
  });
});

server.listen(port, () => {
  console.log('listening on *:3000');
});
