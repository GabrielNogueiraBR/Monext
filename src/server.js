const express = require('express');
const path = require('path');

// eslint-disable-next-line no-underscore-dangle
const dirname = path.resolve();
const app = express();
const port = 3000;

app.use(express.static(`${dirname}/src/views`));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server is running on http:localhost:${port}`);
});
