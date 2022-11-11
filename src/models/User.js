const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

//function will run before saving to database
//function(){} allows reference to 'this'
userSchema.pre('save', function (next) {
  const user = this;
  if (!user.isModified('password')) {
    //if password is not modified... just move on
    return next();
  }

  //10 is reference to how complex SALT will be
  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return next(err);
    }

    //here there is a SALT
    //SALT is used to prevent rainbow attack
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) {
        return next(err);
      }

      //update user password
      user.password = hash;
      next();
    });
  });
});

//password trying to log in with
userSchema.methods.comparePassword = function (candidatePassword) {
  const user = this;

  return new Promise((resolve, reject) => {
    bcrypt.compare(candidatePassword, user.password, (err, isMatch) => {
      if (err) {
        return reject(err);
      }

      if (!isMatch) {
        return reject(false); //passwords do not match up
      }

      //if pass both if tests,
      resolve(true);
    });
  });
};

mongoose.model('User', userSchema);
