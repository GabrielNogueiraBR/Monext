const { http } = require('./http');
require('./api/websocket/socketServer');

http.listen(3000, () => {
  console.log('listening on *:3000');
});
