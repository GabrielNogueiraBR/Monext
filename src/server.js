const server = require('express')();

server.get('/', (req, res) => {
  res.send('Hello World');
});

server.listen(3000);
