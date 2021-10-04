const express = require('express');
const path = require('path');

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

const port = 3000;

app.use(express.static(path.join(__dirname, '/public')));
app.set('views', path.join(__dirname, '/public', '/views'));
app.engine('html', require('ejs').renderFile);

app.set('view engine', 'html');

app.use('/', (req, res) => {
  res.render('index.html');
});
app.get('/controller', (req, res) => {
  res.render('controller.html');
});

io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);
});

app.listen(port, () => {
  console.log(`Server listening on *:${port}`);
});
