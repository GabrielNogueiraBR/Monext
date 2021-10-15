const { http } = require('./http');
require('./api/websocket/country');
require('dotenv').config();

const port = process.env.PORT || 3000;

http.listen(port, () => {
  console.log(`listening on *:${port}`);
});
