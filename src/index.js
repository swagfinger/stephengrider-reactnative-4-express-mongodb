require('./models/User');
require('./models/Track');

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser'); //handle json

const authRoutes = require('./routes/authRoutes');
const trackRoutes = require('./routes/trackRoutes');

const requireAuth = require('./middlewares/requireAuth'); //middleware

const app = express();
app.use(bodyParser.json()); //gives access to req.body
app.use(authRoutes);
app.use(trackRoutes);

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
//get has middleware 'requireAuth'
//accessible only if jwt valid token available
app.get('/', requireAuth, (req, res) => {
  res.send(`your email is ${req.user.email}`);
});

//start server
app.listen(3000, () => {
  console.log('listening on port 3000');
});
