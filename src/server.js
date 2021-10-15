const { http } = require('./http');
require('./api/websocket/country');

const port = process.env.PORT || 3000;

http.listen(port, () => {
  console.log(`listening on *:${port}`);
});
