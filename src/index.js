const express = require('express');
const { default: mongoose } = require('mongoose');

const app = express();

const mongoUri =
  'mongodb://swagfinger:HfMcI3h8Enmrg8mA@ac-rqobmv0-shard-00-00.1hy8hpl.mongodb.net:27017,ac-rqobmv0-shard-00-01.1hy8hpl.mongodb.net:27017,ac-rqobmv0-shard-00-02.1hy8hpl.mongodb.net:27017/?ssl=true&replicaSet=atlas-x6rdeg-shard-0&authSource=admin&retryWrites=true&w=majority';

mongoose.connect(mongoUri); //as of mongoose 6
mongoose.connection.on('connected', () => {
  console.log('connected to mongo instance');
});
mongoose.connection.on('error', (err) => {
  console.error('error connecting to mongo', err);
});

//router route
app.get('/', (req, res) => {
  res.send('hello world!');
});

//start server
app.listen(3000, () => {
  console.log('listening on port 3000');
});
