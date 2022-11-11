const express = require('express');

const app = express();

//router route
app.get('/', (req, res) => {
  res.send('hello world!');
});

//start server
app.listen(3000, () => {
  console.log('listening on port 3000');
});
