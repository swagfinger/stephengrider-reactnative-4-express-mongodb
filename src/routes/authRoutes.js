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

//anytime someone tries to signin,
router.post('/signin', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(422).send({ error: 'must provide email and password' });
  }

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(422).send({ error: 'Invalid password or email' });
  }

  try {
    await user.comparePassword(password); //if successfully compared passwords
    const token = jwt.sign({ userId: user._id }, 'MY_SECRET_KEY');
    res.send({ token });
  } catch (err) {
    return res.status(422).send({ error: 'Invalid password or email' });
  }
});

module.exports = router;
