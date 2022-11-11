const express = require('express');
const mongoose = require('mongoose');
const User = mongoose.model('User');

const router = express.Router();

router.post('/signup', async (req, res) => {
  // console.log('req.body: ', req.body);

  const { email, password } = req.body;

  try {
    //create new user - it conforms to the User model schema
    const user = new User({ email, password });
    await user.save();
    res.send('you made a post');
  } catch (err) {
    //422 = invalid data
    return res.status(422).send(err.message);
  }
});

module.exports = router;
