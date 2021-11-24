const { http } = require('./http');
require('./api/websocket/socketServer');

// Look for port in the environment variables and as a fallback we have port 3000
const port = process.env.PORT || 3000;

// Server will listen on the port defined in line 5 and will listen for requests
http.listen(port, () => {
  console.log('listening on *:', port);
});

module.exports = http;
