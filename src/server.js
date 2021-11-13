const { http } = require('./http');
require('./api/websocket/socketServer');

const port = process.env.PORT || 3000;

http.listen(port, () => {
  console.log('listening on *:', port);
});

module.exports = http;
