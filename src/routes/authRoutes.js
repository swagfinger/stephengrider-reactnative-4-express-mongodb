const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = mongoose.model('User');

const router = express.Router();

router.post('/signup', async (req, res) => {
  // console.log('req.body: ', req.body);

  const { email, password } = req.body;

  try {
    //create new user - it conforms to the User model schema
    const user = new User({ email, password });
    await user.save();

    //put into sign({}} what we want to put into token
    const token = jwt.sign({ userId: user._id }, 'MY_SECRET_KEY');
    res.send({ token });
    // res.send('you made a post');
  } catch (err) {
    //422 = invalid data
    return res.status(422).send(err.message);
  }
});

module.exports = router;
