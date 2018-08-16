const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

// /create a Schema
const userSchema = new Schema({
  username: {
    type: String,
    required: [true, 'username cant be empty'],
  },
  password: {
    type: String,
    required: [true, 'pa cant be empty'],
  },
  accessLevel: {
    type: Number,
    min: 0,
    max: 2,
    default: 0,
  },
});

userSchema.pre('save', function pre(next) {
  return bcrypt.hash(this.password, 5)
    .then((hash) => {
      this.password = hash;
      return next();
    })
    .catch((err) => {
      next(err);
    });
});

userSchema.methods.checkPassword = function checkPassword(newPass) {
  return bcrypt.compare(newPass, this.password);
};

// export a model
module.exports = mongoose.model('user', userSchema);
