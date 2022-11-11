const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = mongoose.model('User');

module.exports = (req, res, next) => {
  //attempt to authenticate user
  //header must include jwt
  //express changes headers with capitals to lowercase "Authorization"
  //authorization === 'Bearer ndjsofijsdoifjsdoifj' ie. 'Bearer token'
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).send({ error: 'you must be logged in' });
  }

  const token = authorization.replace('Bearer ', '');
  //validate token...
  //1st arg is token to validate,
  //2nd is secret key,
  //3rd argument is callback function after validation on token
  jwt.verify(token, 'MY_SECRET_KEY', async (err, payload) => {
    if (err) {
      return res.status(401).send({ error: 'you must be logged in.' });
    }

    // payload is whatever is put in the jwt on creation
    const { userId } = payload;

    //use userId to lookup user on mongodb
    const user = await User.findById(userId);

    //assign user to req
    req.user = user;

    //go onto next middleware
    next();
  });
};
